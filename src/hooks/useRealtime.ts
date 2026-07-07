// ============================================
// useRealtime — Supabase Realtime subscription with polling fallback
// ============================================
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import type { RealtimeConnectionStatus, NormalizedQuestProgress } from '../types'

export function useRealtime() {
  const teamId = useUIStore((s) => s.teamId)
  const user = useUIStore((s) => s.user)
  const setSyncStatus = useUIStore((s) => s.setSyncStatus)
  const queryClient = useQueryClient()

  const [realtimeStatus, setRealtimeStatus] = useState<RealtimeConnectionStatus>('connecting')

  useEffect(() => {
    if (!teamId || !user) {
      setRealtimeStatus('disconnected')
      return
    }

    setRealtimeStatus('connecting')

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

          // Incrementally update the teammate's cached progress
          const newData =
            (payload.new as Record<string, unknown> | null)?.quest_data ?? null

          queryClient.setQueryData(['teamProgress', teamId], (old: Record<string, unknown> | undefined) => {
            const prev = (old ?? {}) as Record<string, { name: string; data: NormalizedQuestProgress }>
            const entry = prev[teammateId]
            if (!entry) return old // Will trigger a full refetch via invalidate

            return {
              ...prev,
              [teammateId]: {
                ...entry,
                data: newData ? (newData as NormalizedQuestProgress) : {},
              },
            }
          })

          // Also invalidate to ensure consistency
          queryClient.invalidateQueries({ queryKey: ['teamProgress', teamId] })
        }
      )
      .subscribe((status) => {
        switch (status) {
          case 'SUBSCRIBED':
            setRealtimeStatus('connected')
            setSyncStatus('online')
            break
          case 'CHANNEL_ERROR':
            setRealtimeStatus('disconnected')
            break
          case 'TIMED_OUT':
            setRealtimeStatus('timeout')
            break
          case 'CLOSED':
            setRealtimeStatus('disconnected')
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
