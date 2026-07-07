// ============================================
// SyncPanel — login/logout, team management UI
// Renders into the existing .eft-sync-panel area
// ============================================
import { useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { useUIStore } from '../stores/uiStore'
import { useTeamInfo, createTeam, joinTeam, leaveTeam } from '../hooks/useTeamProgress'
import { SyncIndicator } from './SyncIndicator'
import { FilterBar } from './FilterBar'

export function SyncPanel() {
  const { user, login, logout } = useAuth()
  const teamId = useUIStore((s) => s.teamId)
  const setTeamId = useUIStore((s) => s.setTeamId)
  const toggleDashboard = useUIStore((s) => s.toggleDashboard)
  const { data: teamInfo, refetch: refetchTeamInfo } = useTeamInfo()
  const queryClient = useQueryClient()

  // Login form state
  const [email, setEmail] = useState(localStorage.getItem('eft_session_email') ?? '')
  const [password, setPassword] = useState('')
  const [teamName, setTeamName] = useState('')
  const [inviteCode, setInviteCode] = useState('')

  const handleLogin = useCallback(
    async (isRegister: boolean) => {
      if (!email.trim() || !password) {
        toast.error('请输入邮箱和密码')
        return
      }
      try {
        const result = await login(email.trim(), password, isRegister)
        if (result.needsConfirmation) {
          toast.success('注册成功！请检查邮箱验证链接，然后登录。')
        } else {
          localStorage.setItem('eft_session_email', email.trim())
          toast.success('登录成功')
        }
      } catch (err: unknown) {
        toast.error(`操作失败: ${err instanceof Error ? err.message : '未知错误'}`)
      }
    },
    [email, password, login]
  )

  const handleLogout = useCallback(async () => {
    await logout()
    localStorage.removeItem('eft_session_email')
    queryClient.clear()
    toast.success('已退出登录')
  }, [logout, queryClient])

  const handleCreateTeam = useCallback(async () => {
    if (!teamName.trim()) {
      toast.error('请输入小队名称')
      return
    }
    if (!user) return
    try {
      const { code } = await createTeam(teamName.trim(), user.id)
      setTeamId(null) // Will be set by refetchTeamInfo
      await refetchTeamInfo()
      toast.success(`小队创建成功！邀请码: ${code}`)
    } catch (err: unknown) {
      toast.error(`创建失败: ${err instanceof Error ? err.message : '未知错误'}`)
    }
  }, [teamName, user, setTeamId, refetchTeamInfo])

  const handleJoinTeam = useCallback(async () => {
    if (!inviteCode.trim()) {
      toast.error('请输入邀请码')
      return
    }
    if (!user) return
    try {
      await joinTeam(inviteCode.trim(), user.id)
      await refetchTeamInfo()
      queryClient.invalidateQueries({ queryKey: ['teamProgress'] })
      toast.success('成功加入小队')
    } catch (err: unknown) {
      toast.error(`加入失败: ${err instanceof Error ? err.message : '未知错误'}`)
    }
  }, [inviteCode, user, refetchTeamInfo, queryClient])

  const handleLeaveTeam = useCallback(async () => {
    if (!teamId || !user) return
    if (!confirm('确定要离开小队吗？')) return
    try {
      await leaveTeam(teamId, user.id)
      setTeamId(null)
      queryClient.clear()
      toast.success('已离开小队')
    } catch (err: unknown) {
      toast.error(`离开失败: ${err instanceof Error ? err.message : '未知错误'}`)
    }
  }, [teamId, user, setTeamId, queryClient])

  return (
    <div
      className="eft-sync-panel"
      style={{
        position: 'fixed', right: 10, bottom: 10, zIndex: 99999, pointerEvents: 'auto',
        background: 'var(--background,#1a1a2e)', padding: 10,
        border: '1px solid #409EFF', borderRadius: 8, maxWidth: 280,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <strong style={{ color: '#409EFF' }}>好友同步</strong>
        <span className="eft-sync-user-area" style={{ fontSize: 12 }}>
          {user ? (
            <>
              <span style={{ color: '#7ae378' }}>✓ {user.email}</span>
              <button onClick={handleLogout} style={{ marginLeft: 10, padding: '2px 8px' }}>退出</button>
            </>
          ) : null}
          <SyncIndicator />
        </span>
      </div>

      {!user ? (
        <div style={{ fontSize: 12 }}>
          <input
            type="email" placeholder="邮箱" value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: 120, padding: '2px 5px', display: 'block', marginBottom: 4 }}
          />
          <input
            type="password" placeholder="密码" value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: 80, padding: '2px 5px', display: 'block', marginBottom: 4 }}
          />
          <button onClick={() => handleLogin(false)} style={{ padding: '2px 8px', marginRight: 4 }}>登录</button>
          <button onClick={() => handleLogin(true)} style={{ padding: '2px 8px' }}>注册</button>
        </div>
      ) : teamId ? (
        <div className="eft-sync-team-area" style={{ fontSize: 12 }}>
          {teamInfo?.teamName && (
            <div style={{ fontSize: 13, marginBottom: 4 }}>
              👥 小队: <strong>{teamInfo.teamName}</strong>
            </div>
          )}
          {teamInfo?.inviteCode && (
            <div style={{ fontSize: 12, color: '#aaa', marginBottom: 4 }}>
              📋 邀请码: <strong style={{ color: '#FFC107' }}>{teamInfo.inviteCode}</strong>
            </div>
          )}
          <button
            onClick={handleLeaveTeam}
            style={{ padding: '2px 8px', fontSize: 12, background: '#f44336', color: '#fff', border: 'none', borderRadius: 3 }}
          >
            离开小队
          </button>
          <button
            onClick={toggleDashboard}
            style={{ padding: '2px 8px', fontSize: 12, marginLeft: 4, background: '#409EFF', color: '#fff', border: 'none', borderRadius: 3 }}
          >
            查看队友进度
          </button>
        </div>
      ) : (
        <div className="eft-sync-team-area" style={{ fontSize: 12 }}>
          <div style={{ marginBottom: 6 }}>
            <input
              type="text" placeholder="小队名称" value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              style={{ width: 100, padding: '2px 5px' }}
            />
            <button onClick={handleCreateTeam} style={{ padding: '2px 8px', marginLeft: 4, background: '#4CAF50', color: '#fff', border: 'none', borderRadius: 3 }}>
              创建小队
            </button>
          </div>
          <div>
            <input
              type="text" placeholder="输入邀请码" value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              style={{ width: 100, padding: '2px 5px' }}
            />
            <button onClick={handleJoinTeam} style={{ padding: '2px 8px', marginLeft: 4, background: '#2196F3', color: '#fff', border: 'none', borderRadius: 3 }}>
              加入小队
            </button>
          </div>
        </div>
      )}

      {/* Filter bar — inside the panel */}
      {user && teamId ? <FilterBar /> : null}

      {/* Stats area */}
      {user && teamId ? <div id="eft-team-stats" style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }} /> : null}
    </div>
  )
}
