// ============================================
// useMyProgress — useQuery (pull) + useMutation (push with optimistic update)
// ============================================
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import type { NormalizedQuestProgress, QuestToggle } from '../types'

/**
 * Normalize quest data from cloud (supports legacy boolean format and v2 {v,t} format)
 */
export function normalizeQuestData(raw: Record<string, unknown>): NormalizedQuestProgress {
  const result: NormalizedQuestProgress = {}
  for (const [key, val] of Object.entries(raw)) {
    if (typeof val === 'boolean') {
      result[key] = { v: val, t: Date.now() }
    } else if (val && typeof val === 'object' && 'v' in val) {
      const obj = val as Record<string, unknown>
      result[key] = {
        v: Boolean(obj.v),
        t: typeof obj.t === 'number' ? obj.t : typeof obj.t === 'string' ? new Date(obj.t).getTime() : Date.now(),
      }
    }
  }
  return result
}

/**
 * Serialize quest data for cloud storage (v2 format)
 */
export function serializeQuestData(data: NormalizedQuestProgress): Record<string, { v: boolean; t: number }> {
  return data
}

/**
 * Hook: fetch my quest progress
 */
export function useMyProgress() {
  const user = useUIStore((s) => s.user)

  return useQuery({
    queryKey: ['myProgress', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quest_progress')
        .select('quest_data')
        .eq('user_id', user!.id)
        .maybeSingle()

      if (error) throw error
      return normalizeQuestData((data?.quest_data as Record<string, unknown>) ?? {})
    },
    enabled: !!user,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
  })
}

/**
 * Hook: toggle quest (optimistic mutation)
 */
export function useToggleQuest() {
  const queryClient = useQueryClient()
  const user = useUIStore((s) => s.user)

  return useMutation({
    mutationFn: async ({ questId, value, timestamp }: QuestToggle) => {
      // If not logged in, still allow local toggle — just skip cloud sync
      if (!user) return { questId, value, timestamp }

      // Build the full quest_data object for upsert
      const current = queryClient.getQueryData<NormalizedQuestProgress>(['myProgress', user.id]) ?? {}
      const updated = { ...current, [questId]: { v: value, t: timestamp } }

      const { error } = await supabase.from('quest_progress').upsert({
        user_id: user.id,
        quest_data: serializeQuestData(updated),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })

      if (error) throw error
      return { questId, value, timestamp }
    },

    onMutate: async ({ questId, value, timestamp }) => {
      // Cancel outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['myProgress', user?.id] })

      // Snapshot previous value for rollback
      const previous = queryClient.getQueryData<NormalizedQuestProgress>(['myProgress', user?.id])

      // Optimistically update
      queryClient.setQueryData<NormalizedQuestProgress>(['myProgress', user?.id], (old) => ({
        ...(old ?? {}),
        [questId]: { v: value, t: timestamp },
      }))

      return { previous }
    },

    onError: (_err, _vars, context) => {
      // Rollback on failure
      if (context?.previous) {
        queryClient.setQueryData(['myProgress', user?.id], context.previous)
      }
      toast.error('同步失败，已回退本地修改')
    },

    onSettled: () => {
      // Always refetch from server to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['myProgress', user?.id] })
    },
  })
}
