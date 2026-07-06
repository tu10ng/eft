// ============================================
// EFT Progress Sync — Supabase 同步层
// 在原有 localStorage 基础上加了云端同步 + 小队共享
// ============================================

(function() {
  'use strict';

  // ---------- 配置（部署时替换为你的 Supabase 信息）----------
  const SUPABASE_URL = 'https://ywzdjijjeqeyevhrudrf.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3emRqaWpqZXFleWV2aHJ1ZHJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNDQzOTYsImV4cCI6MjA5ODkyMDM5Nn0.6YbjRFX0iLhVTk8GFPI3_RK44Bu_A6J5Zg-DQIPQpvk';

  // ---------- 初始化 ----------
  let supabase = null;
  let currentUser = null;
  let currentTeamId = null;
  let syncTimeout = null;

  function initSupabase() {
    /* 先显示登录 UI */
    var savedEmail = localStorage.getItem("eft_session_email");
    showLoginUI(savedEmail || "");
    /* SDK 就绪后初始化 */
    if (typeof supabase !== "undefined" && supabase.createClient) {
      supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      checkSession();
      console.log("[Sync] Supabase initialized");
    } else {
      setTimeout(initSupabase, 2000);
    }
  }
  }

  // ---------- 认证 ----------
  async function checkSession() {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      currentUser = data.session.user;
      showLoggedInUI();
      await loadTeamInfo();
      pullFromCloud();
    } else {
      // 检查 localStorage 中的 session
      const saved = localStorage.getItem('eft_session_email');
      if (saved) {
        showLoginUI(saved);
      } else {
        showLoginUI();
      }
    }
  }

  async function login(email, password, isRegister) {
    try {
      let result;
      if (isRegister) {
        result = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: email.split('@')[0] } }
        });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      if (result.error) throw result.error;

      if (isRegister && result.data.user && !result.data.session) {
        alert('注册成功！请检查邮箱验证链接，然后登录。' +
          '\n(如果 Supabase 关闭了邮箱验证，直接登录即可)');
        return;
      }

      currentUser = result.data.user;
      localStorage.setItem('eft_session_email', email);
      hideLoginUI();
      showLoggedInUI();
      await loadTeamInfo();
      pullFromCloud();

      // 同步本地数据到云端
      pushToCloud();
    } catch (err) {
      alert('操作失败: ' + err.message);
      console.error('[Sync] Auth error:', err);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    currentUser = null;
    currentTeamId = null;
    localStorage.removeItem('eft_session_email');
    showLoginUI();
    document.querySelector('.eft-sync-team-area').innerHTML = '';
  }

  // ---------- 数据同步 ----------

  // 从 localStorage 读取当前进度
  function getLocalProgress() {
    try {
      const raw = localStorage.getItem('buttonStatus');
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  // 推送到云端（debounced)
  function pushToCloud() {
    if (!currentUser) return;

    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
      const questData = getLocalProgress();
      try {
        await supabase.from('quest_progress').upsert({
          user_id: currentUser.id,
          quest_data: questData,
          updated_at: new Date().toISOString()
        });
        console.log('[Sync] Pushed to cloud:', Object.keys(questData).length, 'quests');
      } catch (err) {
        console.error('[Sync] Push failed:', err);
      }
    }, 1000); // 1秒防抖
  }

  // 从云端拉取
  async function pullFromCloud() {
    if (!currentUser) return;

    try {
      // 拉取自己的数据
      const { data: myData, error } = await supabase
        .from('quest_progress')
        .select('quest_data')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (error) throw error;

      if (myData && myData.quest_data) {
        const local = getLocalProgress();
        const cloud = myData.quest_data;

        // 合并：更新(云端新于本地)优先
        const merged = { ...local, ...cloud };
        localStorage.setItem('buttonStatus', JSON.stringify(merged));
        console.log('[Sync] Pulled from cloud:', Object.keys(merged).length, 'quests');

        // 刷新页面上的按钮状态
        refreshAllButtons();
      }
    } catch (err) {
      console.error('[Sync] Pull failed:', err);
    }
  }

  // 拉取队友数据
  async function pullTeamProgress() {
    if (!currentTeamId) return {};

    try {
      const { data: members } = await supabase
        .from('team_members')
        .select('user_id')
        .eq('team_id', currentTeamId);

      if (!members || members.length === 0) return {};

      const userIds = members.map(m => m.user_id).filter(uid => uid !== currentUser.id);
      if (userIds.length === 0) return {};

      const { data: progress } = await supabase
        .from('quest_progress')
        .select('user_id, quest_data')
        .in('user_id', userIds);

      // 同时获取 profiles
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name')
        .in('id', userIds);

      const nameMap = {};
      if (profiles) {
        profiles.forEach(p => { nameMap[p.id] = p.display_name; });
      }

      const result = {};
      if (progress) {
        progress.forEach(p => {
          result[p.user_id] = {
            name: nameMap[p.user_id] || 'Unknown',
            data: p.quest_data || {}
          };
        });
      }
      return result;
    } catch (err) {
      console.error('[Sync] Team pull failed:', err);
      return {};
    }
  }

  // 监听 Supabase Realtime
  function subscribeToChanges() {
    if (!currentUser) return;

    supabase
      .channel('quest-changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'quest_progress' },
        (payload) => {
          // 忽略自己的更新（本地已经处理）
          if (payload.new && payload.new.user_id === currentUser.id) return;

          console.log('[Sync] Realtime update from teammate:', payload.new?.user_id);
          // 如果有团队仪表盘，刷新之
          if (typeof refreshTeamDashboard === 'function') {
            refreshTeamDashboard();
          }
        }
      )
      .subscribe();

    console.log('[Sync] Subscribed to realtime changes');
  }

  // ---------- 小队管理 ----------

  async function createTeam(name) {
    if (!currentUser) return;
    const code = generateInviteCode();

    try {
      const { data, error } = await supabase
        .from('teams')
        .insert({
          name: name,
          invite_code: code,
          created_by: currentUser.id
        })
        .select()
        .single();

      if (error) throw error;

      // 把创建者加入小队
      await supabase.from('team_members').insert({
        team_id: data.id,
        user_id: currentUser.id,
        role: 'owner'
      });

      currentTeamId = data.id;
      await loadTeamInfo();
      subscribeToChanges();
      alert('小队创建成功！邀请码: ' + code + '\n分享给好友即可加入');
    } catch (err) {
      alert('创建小队失败: ' + err.message);
    }
  }

  async function joinTeam(code) {
    if (!currentUser) return;

    try {
      const { data: team, error } = await supabase
        .from('teams')
        .select('id, name')
        .eq('invite_code', code.toUpperCase().trim())
        .single();

      if (error || !team) {
        alert('未找到该小队，请检查邀请码');
        return;
      }

      // 检查是否已在队中
      const { data: existing } = await supabase
        .from('team_members')
        .select('*')
        .eq('team_id', team.id)
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (existing) {
        alert('你已经在这个小队中了！');
        currentTeamId = team.id;
      } else {
        const { error: joinErr } = await supabase
          .from('team_members')
          .insert({
            team_id: team.id,
            user_id: currentUser.id,
            role: 'member'
          });

        if (joinErr) throw joinErr;
        currentTeamId = team.id;
        alert('成功加入小队: ' + team.name);
      }

      await loadTeamInfo();
      subscribeToChanges();
    } catch (err) {
      alert('加入小队失败: ' + err.message);
    }
  }

  async function leaveTeam() {
    if (!currentTeamId || !currentUser) return;
    if (!confirm('确定要离开小队吗？')) return;

    await supabase
      .from('team_members')
      .delete()
      .eq('team_id', currentTeamId)
      .eq('user_id', currentUser.id);

    currentTeamId = null;
    await loadTeamInfo();
    alert('已离开小队');
  }

  async function loadTeamInfo() {
    if (!currentUser) return;

    try {
      const { data } = await supabase
        .from('team_members')
        .select('team_id, teams(name, invite_code)')
        .eq('user_id', currentUser.id)
        .maybeSingle();

      if (data && data.team_id) {
        currentTeamId = data.team_id;
      }
      renderTeamUI();
    } catch (err) {
      console.error('[Sync] Team info load failed:', err);
    }
  }

  // ---------- UI ----------

  function showLoggedInUI() {
    const area = document.querySelector('.eft-sync-user-area');
    if (!area) return;
    area.innerHTML = `
      <span style="color:#7ae378;">✓ ${currentUser.email}</span>
      <button onclick="window._eftSync.logout()" style="margin-left:10px;padding:2px 8px;">退出</button>
    `;
  }

  function showLoginUI(email) {
    const area = document.querySelector('.eft-sync-user-area');
    if (!area) return;
    area.innerHTML = `
      <input type="email" id="eft-login-email" placeholder="邮箱" value="${email || ''}" style="width:120px;padding:2px 5px;" />
      <input type="password" id="eft-login-password" placeholder="密码" style="width:80px;padding:2px 5px;margin-left:4px;" />
      <button onclick="window._eftSync._login(false)" style="padding:2px 8px;margin-left:4px;">登录</button>
      <button onclick="window._eftSync._login(true)" style="padding:2px 8px;margin-left:2px;">注册</button>
    `;
  }

  function hideLoginUI() {
    // handled by showLoggedInUI
  }

  function renderTeamUI() {
    const area = document.querySelector('.eft-sync-team-area');
    if (!area) return;

    if (currentTeamId) {
      // 已在队伍中
      supabase.from('team_members')
        .select('user_id, role, profiles(display_name)')
        .eq('team_id', currentTeamId)
        .then(({ data }) => {
          const members = data || [];
          const memberNames = members.map(m =>
            m.profiles?.display_name || 'Unknown' + (m.role === 'owner' ? ' (队长)' : '')
          ).join(', ');

          supabase.from('teams')
            .select('invite_code')
            .eq('id', currentTeamId)
            .single()
            .then(({ data: team }) => {
              area.innerHTML = `
                <div style="font-size:13px;margin-bottom:4px;">
                  👥 小队成员 (${members.length}): ${memberNames}
                </div>
                <div style="font-size:12px;color:#aaa;margin-bottom:4px;">
                  📋 邀请码: <strong style="color:#FFC107;">${team?.invite_code || ''}</strong>
                </div>
                <button onclick="window._eftSync.leaveTeam()" style="padding:2px 8px;font-size:12px;background:#f44336;color:#fff;border:none;border-radius:3px;">离开小队</button>
                <button onclick="window._eftSync.showTeamDashboard()" style="padding:2px 8px;font-size:12px;margin-left:4px;background:#409EFF;color:#fff;border:none;border-radius:3px;">查看队友进度</button>
              `;
            });
        });
    } else {
      area.innerHTML = `
        <div style="margin-bottom:6px;">
          <input type="text" id="eft-team-name" placeholder="小队名称" style="width:100px;padding:2px 5px;" />
          <button onclick="window._eftSync.createTeamForUI()" style="padding:2px 8px;margin-left:4px;background:#4CAF50;color:#fff;border:none;border-radius:3px;">创建小队</button>
        </div>
        <div>
          <input type="text" id="eft-invite-code" placeholder="输入邀请码" style="width:100px;padding:2px 5px;" />
          <button onclick="window._eftSync.joinTeamForUI()" style="padding:2px 8px;margin-left:4px;background:#2196F3;color:#fff;border:none;border-radius:3px;">加入小队</button>
        </div>
      `;
    }
  }

  // 团队仪表盘弹窗
  async function showTeamDashboard() {
    const teamProgress = await pullTeamProgress();
    const teammateIds = Object.keys(teamProgress);

    if (teammateIds.length === 0) {
      alert('还没有队友数据');
      return;
    }

    let html = '<div style="max-height:60vh;overflow-y:auto;">';
    html += '<table style="width:100%;border-collapse:collapse;font-size:13px;">';
    html += '<tr><th style="text-align:left;padding:4px;border-bottom:1px solid #555;">队友</th><th style="text-align:right;padding:4px;border-bottom:1px solid #555;">已完成任务</th></tr>';

    for (const [uid, info] of Object.entries(teamProgress)) {
      const completed = Object.values(info.data).filter(v => v === true).length;
      const total = Object.keys(info.data).length;
      const pct = total > 0 ? Math.round(completed / total * 100) : 0;
      html += `<tr>
        <td style="padding:4px;border-bottom:1px solid #333;">${info.name}</td>
        <td style="text-align:right;padding:4px;border-bottom:1px solid #333;">
          ${completed} / ${total} (${pct}%)
          <div style="background:#333;height:4px;border-radius:2px;margin-top:2px;">
            <div style="background:#4CAF50;height:4px;width:${pct}%;border-radius:2px;"></div>
          </div>
        </td>
      </tr>`;
    }

    html += '</table></div>';

    // 简单弹窗
    showModal('📊 队友进度', html);
  }

  function showModal(title, bodyHtml) {
    const existing = document.getElementById('eft-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'eft-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:99999;display:flex;align-items:center;justify-content:center;';
    modal.innerHTML = `
      <div style="background:var(--background, #1a1a2e);border:1px solid #555;border-radius:8px;padding:20px;max-width:500px;width:90%;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <h3 style="margin:0;color:#fff;">${title}</h3>
          <button onclick="document.getElementById('eft-modal').remove()" style="background:none;border:none;color:#aaa;font-size:20px;cursor:pointer;">&times;</button>
        </div>
        ${bodyHtml}
        <button onclick="document.getElementById('eft-modal').remove()" style="margin-top:12px;padding:6px 16px;background:#666;color:#fff;border:none;border-radius:4px;cursor:pointer;">关闭</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ---------- 钩子：拦截 quest toggle ----------

  // 监听原有按钮点击，在 localStorage 写入后自动同步到云端
  function installSyncHook() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.myButton');
      if (!btn) return;

      // 等原逻辑执行完（localStorage 已写入）后再推送到云端
      setTimeout(() => {
        if (currentUser) {
          pushToCloud();
        }
      }, 100);
    });
  }

  // 刷新页面上所有按钮（从 localStorage 重新读取）
  function refreshAllButtons() {
    const progress = getLocalProgress();
    document.querySelectorAll('.myButton').forEach(function(btn) {
      const status = progress[btn.id];
      if (status !== undefined) {
        btn.setAttribute('data-status', String(status));
        btn.textContent = status ? '已完成' : '未完成';
        btn.style.backgroundColor = status ? 'green' : 'red';
      }
    });

    // 也刷新统计数
    if (typeof updateButtonCount === 'function') {
      updateButtonCount();
    }
  }

  // ---------- 工具函数 ----------

  function generateInviteCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // 去掉容易混淆的字符
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
      if (i === 2) code += '-';
    }
    return code;
  }

  // ---------- UI 辅助函数（暴露给 onclick）----------

  function _login(isRegister) {
    const email = document.getElementById('eft-login-email').value.trim();
    const password = document.getElementById('eft-login-password').value;
    if (!email || !password) {
      alert('请输入邮箱和密码');
      return;
    }
    login(email, password, isRegister);
  }

  function createTeamForUI() {
    const name = document.getElementById('eft-team-name').value.trim();
    if (!name) {
      alert('请输入小队名称');
      return;
    }
    createTeam(name);
  }

  function joinTeamForUI() {
    const code = document.getElementById('eft-invite-code').value.trim();
    if (!code) {
      alert('请输入邀请码');
      return;
    }
    joinTeam(code);
  }

  // ---------- 导出公共 API ----------
  window._eftSync = {
    login: _login,
    logout: logout,
    _login: _login,
    createTeamForUI: createTeamForUI,
    joinTeamForUI: joinTeamForUI,
    leaveTeam: leaveTeam,
    showTeamDashboard: showTeamDashboard
  };

  // ---------- 启动 ----------
  document.addEventListener('DOMContentLoaded', function() {
    initSupabase();
    installSyncHook();
  });

})();
