// ============================================
// Zustand UI store — client-side UI state only
// Server state is managed by TanStack Query
// ============================================
import { create } from 'zustand'
import type { EftUser, FilterMode, SyncStatus } from '../types'

interface UIState {
  // Auth
  user: EftUser | null
  setUser: (user: EftUser | null) => void

  // Team
  teamId: string | null
  setTeamId: (teamId: string | null) => void

  // Filter
  currentFilter: FilterMode
  setFilter: (mode: FilterMode) => void

  // Dashboard modal
  dashboardOpen: boolean
  toggleDashboard: () => void

  // Sync status (for indicator UI)
  syncStatus: SyncStatus
  setSyncStatus: (status: SyncStatus) => void
}

export const useUIStore = create<UIState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  teamId: null,
  setTeamId: (teamId) => set({ teamId }),

  currentFilter: 'all',
  setFilter: (currentFilter) => set({ currentFilter }),

  dashboardOpen: false,
  toggleDashboard: () => set((s) => ({ dashboardOpen: !s.dashboardOpen })),

  syncStatus: 'offline',
  setSyncStatus: (syncStatus) => set({ syncStatus }),
}))
