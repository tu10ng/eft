// ============================================
// useAuth — 无邮箱无密码的昵称登录
// ============================================
import { useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import { queryClient } from '../lib/queryClient'

const EDGE_FUNCTION_URL =
  'https://ywzdjijjeqeyevhrudrf.supabase.co/functions/v1/nickname-auth'

export function useAuth() {
  const user = useUIStore((s) => s.user)
  const setUser = useUIStore((s) => s.setUser)
  const setTeamId = useUIStore((s) => s.setTeamId)
  const setSyncStatus = useUIStore((s) => s.setSyncStatus)

  // 从 profiles 表获取 display_name
  const fetchDisplayName = useCallback(async (userId: string): Promise<string> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('display_name')
      .eq('id', userId)
      .single()

    if (error || !data) {
      // profiles 行可能还在 trigger 创建中，用 metadata fallback
      const { data: userData } = await supabase.auth.getUser()
      const metaName = userData?.user?.user_metadata?.display_name
      if (metaName && typeof metaName === 'string') return metaName
      return '用户'
    }
    return data.display_name ?? '用户'
  }, [])

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const displayName = await fetchDisplayName(session.user.id)
        setUser({ id: session.user.id, displayName })
        setSyncStatus('online')
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const displayName = await fetchDisplayName(session.user.id)
        setUser({ id: session.user.id, displayName })
        setSyncStatus('online')
      } else {
        setUser(null)
        setTeamId(null)
        setSyncStatus('offline')
        queryClient.clear()
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setTeamId, setSyncStatus, fetchDisplayName])

  // 通过昵称登录（调用 Edge Function）
  const loginByNickname = useCallback(async (nickname: string) => {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error((body as { error?: string }).error ?? `登录失败 (${res.status})`)
    }

    const { session } = await res.json()
    if (!session?.access_token || !session?.refresh_token) {
      throw new Error('Edge Function 未返回有效的 session')
    }

    // 将 session 写入 Supabase 客户端
    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    })
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setTeamId(null)
    queryClient.clear()
    setSyncStatus('offline')
  }, [setUser, setTeamId, setSyncStatus])

  return { user, loginByNickname, logout }
}
