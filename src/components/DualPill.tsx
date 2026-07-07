// ============================================
// DualPill — dual progress pill (me + friend) for a single quest
// Rendered via React Portal into the SVG foreignObject area
// ============================================
import { useCallback, useEffect, useMemo } from 'react'
import { useMyProgress, useToggleQuest } from '../hooks/useMyProgress'
import { useTeamProgress } from '../hooks/useTeamProgress'
import { useUIStore } from '../stores/uiStore'
import type { CombinedQuestStatus, FilterMode } from '../types'

interface DualPillProps {
  questId: string
}

/** Determine if a quest matches the current filter */
function matchesFilter(mode: FilterMode, status: CombinedQuestStatus): boolean {
  switch (mode) {
    case 'all':
      return true
    case 'friend-done':
      return status.friend === true
    case 'me-done':
      return status.me === true
    case 'neither':
      return status.me === false && status.friend === false
    case 'both':
      return status.me === true && status.friend === true
  }
}

export function DualPill({ questId }: DualPillProps) {
  const { data: myProgress } = useMyProgress()
  const { mutate: toggleQuest } = useToggleQuest()
  const realtimeStatus = useUIStore((s) => s.realtimeStatus)
  const currentFilter = useUIStore((s) => s.currentFilter)
  const { data: teamProgress } = useTeamProgress(realtimeStatus)

  const combined = useMemo((): CombinedQuestStatus => {
    const me = myProgress?.[questId]?.v ?? null
    const teammateIds = Object.keys(teamProgress ?? {})
    let friend: boolean | null = null
    if (teammateIds.length > 0) {
      const val = teamProgress?.[teammateIds[0]]?.data?.[questId]?.v
      friend = val === true ? true : val === false ? false : null
    }
    return { me, friend }
  }, [myProgress, teamProgress, questId])

  // Apply filter to the quest card wrapper in the original DOM
  useEffect(() => {
    const btn = document.getElementById(questId)
    // Walk up from the button to find the quest card group (<g> element in SVG)
    const card = btn?.closest('g')
    if (!card) return

    const visible = matchesFilter(currentFilter, combined)
    ;(card as SVGElement).style.display = visible ? '' : 'none'
  }, [questId, currentFilter, combined])

  const handleToggleMe = useCallback(() => {
    const current = myProgress?.[questId]?.v ?? false
    toggleQuest({ questId, value: !current, timestamp: Date.now() })
  }, [questId, myProgress, toggleQuest])

  const hasTeammate = Object.keys(teamProgress ?? {}).length > 0

  return (
    <div className="eft-dual-bar" data-quest-id={questId}>
      <button
        className={`eft-pill eft-pill-me ${pillClass(combined.me)}`}
        data-player="me"
        title="点击切换我的进度"
        onClick={handleToggleMe}
      >
        {pillLabel('我', combined.me)}
      </button>
      <button
        className={`eft-pill eft-pill-friend ${pillClass(combined.friend)}`}
        data-player="friend"
        disabled
        title={combined.friend === true ? '好友已完成' : combined.friend === false ? '好友未完成' : '暂无好友数据'}
        style={{ display: hasTeammate ? '' : 'none' }}
      >
        {pillLabel('友', combined.friend)}
      </button>
    </div>
  )
}

function pillClass(status: boolean | null): string {
  if (status === true) return 'eft-done'
  if (status === false) return 'eft-undone'
  return 'eft-unknown'
}

function pillLabel(label: string, status: boolean | null): string {
  if (status === true) return `${label} ✓`
  if (status === false) return `${label} ✗`
  return `${label} ?`
}
