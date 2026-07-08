// ============================================
// QuestNode — React Flow custom node for quest cards
// Renders the exact same DOM structure as original foreignObject HTML
// ============================================
import { memo } from 'react'
import type { NodeProps } from '@xyflow/react'
import { Handle, Position } from '@xyflow/react'
import { DualPill } from './DualPill'

/** Quest node data — extracted from index.html at build time */
export interface QuestNodeData {
  id: string
  x: number; y: number; width: number; height: number
  trader: string
  title: string
  description: string
  levelReq: string
  linkUrl: string
  kappaImg: string
  kappaTitle: string
  traderIcon: string
  traderTitle: string
  isHighlight: boolean
  /** Progress — injected by QuestTreeFlow at runtime */
  meDone?: boolean | null
  friendDone?: boolean | null
  /** Allow indexing for React Flow's Record<string, unknown> constraint */
  [key: string]: unknown
}

function QuestNode({ data }: NodeProps & { data: QuestNodeData }) {
  const isCompleted = data.meDone === true

  const cardClass = [
    'quests-map-card',
    data.trader,
    isCompleted && '_completed',
  ].filter(Boolean).join(' ')

  return (
    <div className={`quests-map-card-background${data.isHighlight ? ' is-highlight' : ''}`}>
      <div className={cardClass}>
        {/* Invisible handle for edge connections (center of card) */}
        <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
        <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />

        {/* HEADER: link + icons */}
        <div className="quests-map-card__header">
          <a
            href={data.linkUrl}
            className="quests-map-card__link nodrag"
            target="_blank"
            rel="noreferrer"
          >
            详细攻略
          </a>
          <div className="quests-map-card__icons">
            {data.kappaImg && (
              <div className="quests-map-card__kappa" title={data.kappaTitle}>
                <img src={data.kappaImg} alt="item-req" />
              </div>
            )}
            <div className="quests-map-card__level-req">{data.levelReq}</div>
            {data.traderIcon && (
              <div className="quests-map-card__kappa" title={data.traderTitle}>
                <img src={data.traderIcon} alt="item-req" />
              </div>
            )}
          </div>
        </div>

        {/* TITLE */}
        <div className="quests-map-card__title">{data.title}</div>

        {/* DESCRIPTION */}
        <div
          className="quests-map-card__text"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* PROGRESS PILL — inline, no portals needed */}
        <div className="nodrag">
          <DualPill
            questId={data.id}
            meDone={data.meDone ?? null}
            friendDone={data.friendDone ?? null}
          />
        </div>
      </div>
    </div>
  )
}

export const QuestNodeMemo = memo(QuestNode, (prev, next) =>
  prev.data.meDone === next.data.meDone &&
  prev.data.friendDone === next.data.friendDone &&
  prev.selected === next.selected &&
  prev.data.isHighlight === next.data.isHighlight
)
