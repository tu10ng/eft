// ============================================
// Zustand UI store — client-side UI state only
// Server state is managed by TanStack Query
// ============================================
import { create } from 'zustand'
import type { EftUser, FilterMode, RealtimeConnectionStatus, SyncStatus } from '../types'

interface UIState {
  // Auth
  user: EftUser | null
  setUser: (user: EftUser | null) => void

  // Teammate (auto-resolved from nickname mapping)
  teammateId: string | null
  setTeammateId: (teammateId: string | null) => void

  // Filter
  currentFilter: FilterMode
  setFilter: (mode: FilterMode) => void

  // Dashboard modal
  dashboardOpen: boolean
  toggleDashboard: () => void

  // Sync status (for indicator UI)
  syncStatus: SyncStatus
  setSyncStatus: (status: SyncStatus) => void

  // Realtime connection status (shared across components)
  realtimeStatus: RealtimeConnectionStatus
  setRealtimeStatus: (status: RealtimeConnectionStatus) => void
}

export const useUIStore = create<UIState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  teammateId: null,
  setTeammateId: (teammateId) => set({ teammateId }),

  currentFilter: 'all',
  setFilter: (currentFilter) => set({ currentFilter }),

  dashboardOpen: false,
  toggleDashboard: () => set((s) => ({ dashboardOpen: !s.dashboardOpen })),

  syncStatus: 'offline',
  setSyncStatus: (syncStatus) => set({ syncStatus }),

  realtimeStatus: 'disconnected',
  setRealtimeStatus: (realtimeStatus) => set({ realtimeStatus }),
}))
