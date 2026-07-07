// ============================================
// SyncIndicator — colored dot showing sync status
//   Green  = online, synced
//   Yellow = syncing
//   Red    = offline
//   Gray   = not logged in
// ============================================
import { useSyncStatus } from '../hooks/useSyncStatus'
import { useUIStore } from '../stores/uiStore'

export function SyncIndicator() {
  const { syncStatus } = useSyncStatus()
  const user = useUIStore((s) => s.user)

  if (!user) {
    return (
      <span style={{ color: '#888', fontSize: 11 }}>⚫ 未登录</span>
    )
  }

  const config: Record<string, { color: string; dot: string; label: string }> = {
    online: { color: '#4CAF50', dot: '🟢', label: '在线' },
    syncing: { color: '#FFC107', dot: '🟡', label: '同步中...' },
    offline: { color: '#f44336', dot: '🔴', label: '离线' },
    error: { color: '#f44336', dot: '🔴', label: '同步错误' },
  }

  const status = config[syncStatus] ?? config.offline

  return (
    <span style={{ color: status.color, fontSize: 11, marginLeft: 8 }}>
      {status.dot} {status.label}
    </span>
  )
}
