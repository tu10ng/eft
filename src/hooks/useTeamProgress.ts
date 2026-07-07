// ============================================
// useTeamProgress — fetch teammate quest progress
// 队友由昵称映射自动解析，无需小队机制
// ============================================
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import { normalizeQuestData } from './useMyProgress'
import type { TeamProgressMap } from '../types'

/**
 * Hook: fetch teammate's quest progress
 * 直接用 teammateId（登录时自动解析），不再通过 team_members 表
 */
export function useTeamProgress(realtimeStatus: string) {
  const teammateId = useUIStore((s) => s.teammateId)
  const user = useUIStore((s) => s.user)

  return useQuery({
    queryKey: ['teamProgress', teammateId],
    queryFn: async (): Promise<TeamProgressMap> => {
      if (!teammateId || !user) return {}

      // 直接查队友的 quest_progress
      const { data: progressRow } = await supabase
        .from('quest_progress')
        .select('quest_data')
        .eq('user_id', teammateId)
        .maybeSingle()

      // 查队友的 display_name
      const { data: profile } = await supabase
        .from('profiles')
        .select('display_name')
        .eq('id', teammateId)
        .single()

      if (!progressRow) return {}

      return {
        [teammateId]: {
          name: profile?.display_name ?? '好友',
          data: normalizeQuestData((progressRow.quest_data as Record<string, unknown>) ?? {}),
        },
      }
    },
    enabled: !!teammateId && !!user,
    staleTime: 15_000,
    // Fallback polling when realtime is disconnected
    refetchInterval: realtimeStatus === 'disconnected' ? 10_000 : false,
    retry: 2,
  })
}
