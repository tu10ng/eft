// ============================================
// DualPill — dual progress pill (me + friend) for a single quest
// Rendered via React Portal into the SVG foreignObject area
// ============================================
import { useCallback, useMemo } from 'react'
import { useMyProgress, useToggleQuest } from '../hooks/useMyProgress'
import { useTeamProgress } from '../hooks/useTeamProgress'
import type { CombinedQuestStatus } from '../types'

interface DualPillProps {
  questId: string
}

export function DualPill({ questId }: DualPillProps) {
  const { data: myProgress } = useMyProgress()
  const toggleQuest = useToggleQuest()
  const { data: teamProgress } = useTeamProgress('connected')

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

  const handleToggleMe = useCallback(() => {
    const current = myProgress?.[questId]?.v ?? false
    toggleQuest.mutate({ questId, value: !current, timestamp: Date.now() })
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
