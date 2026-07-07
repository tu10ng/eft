// ============================================
// SyncPanel — login/logout, filter bar, dashboard toggle
// 双人自动配对，无需小队创建/加入流程
// ============================================
import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import { useUIStore } from '../stores/uiStore'
import { SyncIndicator } from './SyncIndicator'
import { FilterBar } from './FilterBar'

export function SyncPanel() {
  const { user, loginByNickname, logout } = useAuth()
  const toggleDashboard = useUIStore((s) => s.toggleDashboard)

  // Login state — 记住上次选的昵称
  const [loadingNickname, setLoadingNickname] = useState<string | null>(null)

  const handleNicknameLogin = useCallback(
    async (nickname: string) => {
      setLoadingNickname(nickname)
      try {
        await loginByNickname(nickname)
        localStorage.setItem('eft_session_nickname', nickname)
        toast.success(`欢迎，${nickname}`)
      } catch (err: unknown) {
        toast.error(`登录失败: ${err instanceof Error ? err.message : '未知错误'}`)
      } finally {
        setLoadingNickname(null)
      }
    },
    [loginByNickname]
  )

  const handleLogout = useCallback(async () => {
    await logout()
    localStorage.removeItem('eft_session_nickname')
    toast.success('已退出登录')
  }, [logout])

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
              <span style={{ color: '#7ae378' }}>✓ {user.displayName}</span>
              <button onClick={handleLogout} style={{ marginLeft: 10, padding: '2px 8px' }}>退出</button>
            </>
          ) : null}
          <SyncIndicator />
        </span>
      </div>

      {!user ? (
        <div style={{ fontSize: 12, textAlign: 'center' }}>
          <div style={{ marginBottom: 8, color: '#aaa' }}>选择你的身份：</div>
          {(['玩家1', '玩家2'] as const).map((nickname) => (
            <button
              key={nickname}
              onClick={() => handleNicknameLogin(nickname)}
              disabled={loadingNickname !== null}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 12px',
                marginBottom: 6,
                background: loadingNickname === nickname
                  ? '#555'
                  : 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)',
                color: loadingNickname === nickname ? '#999' : '#409EFF',
                border: '1px solid #409EFF',
                borderRadius: 6,
                cursor: loadingNickname ? 'not-allowed' : 'pointer',
                fontSize: 14,
                transition: 'all 0.2s',
              }}
            >
              {loadingNickname === nickname ? '登录中...' : `👤 ${nickname}`}
            </button>
          ))}
        </div>
      ) : (
        <div className="eft-sync-team-area" style={{ fontSize: 12 }}>
          <button
            onClick={toggleDashboard}
            style={{ padding: '2px 8px', fontSize: 12, background: '#409EFF', color: '#fff', border: 'none', borderRadius: 3 }}
          >
            查看好友进度
          </button>
        </div>
      )}

      {/* Filter bar — visible when logged in */}
      {user ? <FilterBar /> : null}

      {/* Stats area */}
      {user ? <div id="eft-team-stats" style={{ fontSize: 12, lineHeight: 1.6, marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(255,255,255,0.1)' }} /> : null}
    </div>
  )
}
