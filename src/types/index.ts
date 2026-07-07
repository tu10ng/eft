// ============================================
// EFT Progress Sync — TypeScript Type Definitions
// ============================================

/** Quest progress value — v2 timestamped format */
export interface QuestEntry {
  v: boolean
  t: number // Unix ms timestamp
}

/** Full quest progress map: questId → entry */
export type QuestProgressMap = Record<string, QuestEntry>

/** Legacy format: questId → boolean. Detected and normalized at fetch time. */
export type LegacyQuestProgressMap = Record<string, boolean>

/** Normalized progress union */
export type NormalizedQuestProgress = Record<string, { v: boolean; t: number }>

/** A teammate's progress snapshot */
export interface TeammateProgress {
  name: string
  data: NormalizedQuestProgress
}

/** Team progress map: userId → TeammateProgress */
export type TeamProgressMap = Record<string, TeammateProgress>

/** Combined quest status for a single quest (derived) */
export interface CombinedQuestStatus {
  me: boolean | null
  friend: boolean | null
}

/** Filter modes for the quest card view */
export type FilterMode = 'all' | 'friend-done' | 'me-done' | 'neither' | 'both'

/** Sync/realtime connection status */
export type SyncStatus = 'online' | 'offline' | 'syncing' | 'error'

/** Realtime channel connection status */
export type RealtimeConnectionStatus = 'connected' | 'disconnected' | 'timeout' | 'connecting'

/** Supabase Auth User (subset we use) */
export interface EftUser {
  id: string
  displayName: string
}

/** Quest toggle mutation input */
export interface QuestToggle {
  questId: string
  value: boolean
  timestamp: number
}

/** Team info from DB */
export interface TeamInfo {
  id: string
  name: string
  invite_code: string
}

/** Team member with profile */
export interface TeamMember {
  user_id: string
  role: string
  profiles?: {
    display_name: string
  }
}
