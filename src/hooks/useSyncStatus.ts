// ============================================
// useSyncStatus — derived sync status for the UI indicator
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
  const isOnline = useIsOnline()

  useEffect(() => {
    if (!isOnline) {
      setSyncStatus('offline')
    } else if (syncStatus === 'offline') {
      setSyncStatus('online')
    }
  }, [isOnline, syncStatus, setSyncStatus])

  return { syncStatus: isOnline ? syncStatus : ('offline' as const) }
}
