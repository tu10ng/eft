// ============================================
// DualPill — dual progress pill (me + friend) for a single quest
// Pure UI component — progress data comes from parent via props
// ============================================
import { useCallback } from 'react'
import { useToggleQuest } from '../hooks/useMyProgress'

interface DualPillProps {
  questId: string
  meDone: boolean | null
  friendDone: boolean | null
}

export function DualPill({ questId, meDone, friendDone }: DualPillProps) {
  const { mutate: toggleQuest } = useToggleQuest()

  const handleToggleMe = useCallback(() => {
    toggleQuest({ questId, value: !meDone, timestamp: Date.now() })
  }, [questId, meDone, toggleQuest])

  const hasTeammate = friendDone !== null

  return (
    <div className="eft-dual-bar" data-quest-id={questId}>
      <button
        className={`eft-pill eft-pill-me ${pillClass(meDone)}`}
        data-player="me"
        title="点击切换我的进度"
        onClick={handleToggleMe}
      >
        {pillLabel('我', meDone)}
      </button>
      <button
        className={`eft-pill eft-pill-friend ${pillClass(friendDone)}`}
        data-player="friend"
        disabled
        title={friendDone === true ? '好友已完成' : friendDone === false ? '好友未完成' : '暂无好友数据'}
        style={{ display: hasTeammate ? '' : 'none' }}
      >
        {pillLabel('友', friendDone)}
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
