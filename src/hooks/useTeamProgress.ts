// ============================================
// useTeamProgress — fetch teammate quest data
// Also provides team CRUD helpers
// ============================================
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import { normalizeQuestData } from './useMyProgress'
import type { TeamProgressMap } from '../types'

/**
 * Hook: fetch my team info (teamId, invite code, members)
 */
export function useTeamInfo() {
  const user = useUIStore((s) => s.user)
  const setTeamId = useUIStore((s) => s.setTeamId)

  return useQuery({
    queryKey: ['teamInfo', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('team_id, teams(name, invite_code)')
        .eq('user_id', user!.id)
        .maybeSingle()

      if (error) throw error

      const teamId = data?.team_id ?? null
      if (teamId) setTeamId(teamId)

      return {
        teamId,
        teamName: (data?.teams as unknown as { name?: string })?.name ?? null,
        inviteCode: (data?.teams as unknown as { invite_code?: string })?.invite_code ?? null,
      }
    },
    enabled: !!user,
    staleTime: 60_000,
    retry: 2,
  })
}

/**
 * Hook: fetch teammates' quest progress
 */
export function useTeamProgress(realtimeStatus: string) {
  const teamId = useUIStore((s) => s.teamId)
  const user = useUIStore((s) => s.user)

  return useQuery({
    queryKey: ['teamProgress', teamId],
    queryFn: async (): Promise<TeamProgressMap> => {
      if (!teamId) return {}

      // Fetch team members
      const { data: members } = await supabase
        .from('team_members')
        .select('user_id')
        .eq('team_id', teamId)

      const userIds = (members ?? [])
        .map((m) => m.user_id)
        .filter((uid) => uid !== user?.id)

      if (userIds.length === 0) return {}

      // Fetch progress for all teammates
      const { data: progress } = await supabase
        .from('quest_progress')
        .select('user_id, quest_data')
        .in('user_id', userIds)

      // Fetch profile names
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, display_name')
        .in('id', userIds)

      const nameMap: Record<string, string> = {}
      profiles?.forEach((p) => {
        nameMap[p.id] = p.display_name
      })

      const result: TeamProgressMap = {}
      progress?.forEach((p) => {
        result[p.user_id] = {
          name: nameMap[p.user_id] ?? 'Unknown',
          data: normalizeQuestData((p.quest_data as Record<string, unknown>) ?? {}),
        }
      })

      return result
    },
    enabled: !!teamId && !!user,
    staleTime: 15_000,
    // Fallback polling when realtime is disconnected
    refetchInterval: realtimeStatus === 'disconnected' ? 10_000 : false,
    retry: 2,
  })
}

/**
 * Create a new team
 */
export async function createTeam(name: string, userId: string): Promise<{ teamId: string; code: string }> {
  const code = generateInviteCode()

  const { data: team, error: teamError } = await supabase
    .from('teams')
    .insert({ name, invite_code: code, created_by: userId })
    .select()
    .single()

  if (teamError) throw teamError

  const { error: memberError } = await supabase.from('team_members').insert({
    team_id: team.id,
    user_id: userId,
    role: 'owner',
  })

  if (memberError) throw memberError

  return { teamId: team.id, code }
}

/**
 * Join an existing team by invite code
 */
export async function joinTeam(code: string, userId: string): Promise<string> {
  const { data: team, error } = await supabase
    .from('teams')
    .select('id, name')
    .eq('invite_code', code.toUpperCase().trim())
    .single()

  if (error || !team) throw new Error('未找到该小队，请检查邀请码')

  // Check if already a member
  const { data: existing } = await supabase
    .from('team_members')
    .select('*')
    .eq('team_id', team.id)
    .eq('user_id', userId)
    .maybeSingle()

  if (!existing) {
    const { error: joinError } = await supabase.from('team_members').insert({
      team_id: team.id,
      user_id: userId,
      role: 'member',
    })
    if (joinError) throw joinError
  }

  return team.id
}

/**
 * Leave the current team
 */
export async function leaveTeam(teamId: string, userId: string): Promise<void> {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('team_id', teamId)
    .eq('user_id', userId)

  if (error) throw error
}

function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
    if (i === 2) code += '-'
  }
  return code
}
