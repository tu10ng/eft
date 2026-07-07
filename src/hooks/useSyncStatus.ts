// ============================================
// useSyncStatus — derived sync status for the UI indicator
//
// Sync status is determined by three factors:
//   1. Browser online/offline (navigator.onLine)
//   2. Realtime WebSocket connection (managed by useRealtime)
//   3. Auth state (managed by useAuth)
//
// This hook ensures browser offline always overrides to 'offline',
// but respects realtime status when browser is online.
// ============================================
import { useEffect, useState } from 'react'
import { useUIStore } from '../stores/uiStore'

function useIsOnline(): boolean {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return online
}

export function useSyncStatus() {
  const syncStatus = useUIStore((s) => s.syncStatus)
  const setSyncStatus = useUIStore((s) => s.setSyncStatus)
  const realtimeStatus = useUIStore((s) => s.realtimeStatus)
  const user = useUIStore((s) => s.user)
  const isOnline = useIsOnline()

  useEffect(() => {
    if (!isOnline) {
      setSyncStatus('offline')
    } else if (!user) {
      setSyncStatus('offline')
    } else if (syncStatus === 'offline' && realtimeStatus === 'connected') {
      // Only transition to online when realtime confirms connection
      setSyncStatus('online')
    }
  }, [isOnline, syncStatus, setSyncStatus, realtimeStatus, user])

  return { syncStatus: isOnline && user ? syncStatus : ('offline' as const) }
}
