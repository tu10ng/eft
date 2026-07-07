// ============================================
// useRealtime — Supabase Realtime subscription with polling fallback
// ============================================
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import type { RealtimeConnectionStatus } from '../types'

export function useRealtime() {
  const teamId = useUIStore((s) => s.teamId)
  const user = useUIStore((s) => s.user)
  const setSyncStatus = useUIStore((s) => s.setSyncStatus)
  const setRealtimeStatus = useUIStore((s) => s.setRealtimeStatus)
  const queryClient = useQueryClient()

  const [realtimeStatus, setLocalRealtimeStatus] = useState<RealtimeConnectionStatus>('connecting')

  // Sync local state to global store so DualPill etc. can read it
  useEffect(() => {
    setRealtimeStatus(realtimeStatus)
  }, [realtimeStatus, setRealtimeStatus])

  useEffect(() => {
    if (!teamId || !user) {
      setLocalRealtimeStatus('disconnected')
      return
    }

    setLocalRealtimeStatus('connecting')

    const channel = supabase
      .channel('quest-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'quest_progress' },
        (payload) => {
          // Ignore own updates
          if (payload.new && (payload.new as Record<string, unknown>).user_id === user.id) return

          const teammateId =
            (payload.new as Record<string, unknown> | null)?.user_id ??
            (payload.old as Record<string, unknown> | null)?.user_id

          if (!teammateId || typeof teammateId !== 'string') return

          // Incrementally update the teammate's cached progress.
          // We invalidate the query; the setQueryData provides instant feedback.
          queryClient.invalidateQueries({ queryKey: ['teamProgress', teamId] })
        }
      )
      .subscribe((status) => {
        switch (status) {
          case 'SUBSCRIBED':
            setLocalRealtimeStatus('connected')
            setSyncStatus('online')
            break
          case 'CHANNEL_ERROR':
            setLocalRealtimeStatus('disconnected')
            setSyncStatus('offline')
            break
          case 'TIMED_OUT':
            setLocalRealtimeStatus('timeout')
            setSyncStatus('offline')
            break
          case 'CLOSED':
            setLocalRealtimeStatus('disconnected')
            setSyncStatus('offline')
            break
        }
      })

    return () => {
      supabase.removeChannel(channel).catch(() => {
        // Channel may already be removed
      })
    }
  }, [teamId, user, queryClient, setSyncStatus])

  return { realtimeStatus }
}
