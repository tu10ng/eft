// ============================================
// useAuth — authentication state + login/logout/signUp
// ============================================
import { useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useUIStore } from '../stores/uiStore'
import { queryClient } from '../lib/queryClient'

export function useAuth() {
  const user = useUIStore((s) => s.user)
  const setUser = useUIStore((s) => s.setUser)
  const setTeamId = useUIStore((s) => s.setTeamId)
  const setSyncStatus = useUIStore((s) => s.setSyncStatus)

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? '' })
        setSyncStatus('online')
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email ?? '' })
        setSyncStatus('online')
      } else {
        setUser(null)
        setTeamId(null)
        setSyncStatus('offline')
        queryClient.clear()
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser, setTeamId, setSyncStatus])

  const login = useCallback(async (email: string, password: string, isRegister = false) => {
    if (isRegister) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: email.split('@')[0] } },
      })
      if (error) throw error
      return { needsConfirmation: !data.session }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return { needsConfirmation: false }
  }, [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setTeamId(null)
    queryClient.clear()
    setSyncStatus('offline')
  }, [setUser, setTeamId, setSyncStatus])

  return { user, login, logout }
}
