// ============================================
// TeamDashboard — teammate progress comparison modal
// ============================================
import { useMemo } from 'react'
import { useUIStore } from '../stores/uiStore'
import { useMyProgress } from '../hooks/useMyProgress'
import { useTeamProgress } from '../hooks/useTeamProgress'

interface TeamDashboardProps {
  realtimeStatus: string
}

export function TeamDashboard({ realtimeStatus }: TeamDashboardProps) {
  const dashboardOpen = useUIStore((s) => s.dashboardOpen)
  const toggleDashboard = useUIStore((s) => s.toggleDashboard)
  const { data: myProgress } = useMyProgress()
  const { data: teamProgress } = useTeamProgress(realtimeStatus)

  const stats = useMemo(() => {
    if (!myProgress) return null
    const myCompleted = Object.values(myProgress).filter((e) => e.v).length
    const myTotal = Object.keys(myProgress).length

    const teammateStats: Array<{
      userId: string
      name: string
      completed: number
      total: number
      pct: number
      bothDone: number
      onlyMe: number
      onlyFriend: number
      neither: number
    }> = []

    if (teamProgress) {
      for (const [uid, info] of Object.entries(teamProgress)) {
        const completed = Object.values(info.data).filter((e) => e.v).length
        const total = Object.keys(info.data).length
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0

        let bothDone = 0,
          onlyMe = 0,
          onlyFriend = 0,
          neither = 0
        for (const qid of Object.keys(info.data)) {
          const friendDone = info.data[qid]?.v === true
          const meDone = myProgress[qid]?.v === true
          if (meDone && friendDone) bothDone++
          else if (meDone && !friendDone) onlyMe++
          else if (!meDone && friendDone) onlyFriend++
          else neither++
        }

        teammateStats.push({ userId: uid, name: info.name, completed, total, pct, bothDone, onlyMe, onlyFriend, neither })
      }
    }

    return { myCompleted, myTotal, teammateStats }
  }, [myProgress, teamProgress])

  if (!dashboardOpen) return null

  return (
    <div id="eft-modal" style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={{ margin: 0, color: '#fff' }}>📊 队友进度对比</h3>
          <button onClick={toggleDashboard} style={closeBtnStyle}>&times;</button>
        </div>

        <div style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          {stats && (
            <div style={{ marginBottom: 12, padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
              <strong>👤 我的进度</strong>
              <div style={{ fontSize: 12, color: '#aaa' }}>
                已完成: <span style={{ color: '#4CAF50' }}>{stats.myCompleted}</span> / {stats.myTotal}{' '}
                ({stats.myTotal > 0 ? Math.round((stats.myCompleted / stats.myTotal) * 100) : 0}%)
              </div>
            </div>
          )}

          {stats?.teammateStats.map((ts) => (
            <div key={ts.userId} style={{ marginBottom: 12, padding: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4 }}>
              <strong>👥 {ts.name}</strong>
              <div style={{ fontSize: 12, color: '#aaa' }}>
                已完成: <span style={{ color: '#2196F3' }}>{ts.completed}</span> / {ts.total} ({ts.pct}%)
              </div>
              <div style={{ background: '#333', height: 4, borderRadius: 2, margin: '4px 0' }}>
                <div style={{ background: '#2196F3', height: 4, width: `${ts.pct}%`, borderRadius: 2 }} />
              </div>
              <div style={{ fontSize: 11, marginTop: 6 }}>
                🟢 都完成: <strong>{ts.bothDone}</strong> | 🟡 仅我: <strong>{ts.onlyMe}</strong> | 🔵 仅{ts.name}:{' '}
                <strong>{ts.onlyFriend}</strong> | ⚫ 都没做: <strong>{ts.neither}</strong>
              </div>
            </div>
          ))}

          <div style={{ fontSize: 11, color: '#888', marginTop: 8, padding: 8, borderTop: '1px solid #333' }}>
            💡 提示: 在任务树上每张卡片会显示两颗药丸<br />
            　 🟢 绿色边框 = 两人都完成<br />
            　 🟡 黄色边框 = 只有你完成了<br />
            　 🔵 蓝色边框 = 只有好友完成了<br />
            　 使用下方的筛选按钮可以只看特定状态的任务
          </div>
        </div>

        <button onClick={toggleDashboard} style={modalCloseBtnStyle}>关闭</button>
      </div>
    </div>
  )
}

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  background: 'rgba(0,0,0,0.7)', zIndex: 99999,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

const modalContentStyle: React.CSSProperties = {
  background: 'var(--background, #1a1a2e)',
  border: '1px solid #555', borderRadius: 8,
  padding: 20, maxWidth: 550, width: '90%',
}

const modalHeaderStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between',
  alignItems: 'center', marginBottom: 12,
}

const closeBtnStyle: React.CSSProperties = {
  background: 'none', border: 'none', color: '#aaa',
  fontSize: 20, cursor: 'pointer',
}

const modalCloseBtnStyle: React.CSSProperties = {
  marginTop: 12, padding: '6px 16px', background: '#666',
  color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer',
}
