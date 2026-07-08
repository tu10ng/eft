// ============================================
// QuestTreeFlow — React Flow quest tree container
// Renders the full quest tree with pan/zoom, search, and filtering
// ============================================
import { useMemo, useState, useCallback } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  StraightEdge,
  useReactFlow,
  Background,
} from '@xyflow/react'
import type { Node, Edge } from '@xyflow/react'
import { QuestNodeMemo } from './QuestNode'
import type { QuestNodeData } from './QuestNode'
import { useMyProgress } from '../hooks/useMyProgress'
import { useTeamProgress } from '../hooks/useTeamProgress'
import { useUIStore } from '../stores/uiStore'
import type { FilterMode, NormalizedQuestProgress } from '../types'

import questNodesRaw from '../data/quest-nodes.json'
import questEdgesRaw from '../data/quest-edges.json'

/** Raw quest node from extracted JSON (before progress injection) */
interface RawQuestNode {
  id: string
  x: number; y: number; width: number; height: number
  trader: string; title: string; description: string
  levelReq: string; linkUrl: string
  kappaImg: string; kappaTitle: string
  traderIcon: string; traderTitle: string
  isHighlight: boolean
}

interface RawQuestEdge {
  id: string; source: string; target: string; type: string; comment: string
}

const typedNodes = questNodesRaw as unknown as RawQuestNode[]
const typedEdges = questEdgesRaw as unknown as RawQuestEdge[]

const nodeTypes = { quest: QuestNodeMemo }
const edgeTypes = { straight: StraightEdge }

const EDGE_COLORS: Record<string, string> = {
  line: '#409EFF',
  line1: '#FF0000',
  line2: '#00b285',
}

/** Inner component — has access to ReactFlow context via useReactFlow() */
function TreeContent() {
  const { fitView } = useReactFlow()
  const myProgress = useMyProgress()
  const realtimeStatus = useUIStore((s) => s.realtimeStatus)
  const currentFilter = useUIStore((s) => s.currentFilter) as FilterMode
  const teamProgress = useTeamProgress(realtimeStatus)

  const [searchTerm, setSearchTerm] = useState('')
  const [matchIndex, setMatchIndex] = useState(0)

  // Compute progress lookup map once
  const progressMap = useMemo(() => {
    const map = new Map<string, { meDone: boolean | null; friendDone: boolean | null }>()
    const myData: NormalizedQuestProgress = myProgress.data ?? {}
    const teamData = teamProgress.data ?? {}
    const teammateIds = Object.keys(teamData)

    for (const [qid, entry] of Object.entries(myData)) {
      const existing = map.get(qid) ?? { meDone: null, friendDone: null }
      existing.meDone = entry.v
      map.set(qid, existing)
    }

    for (const tId of teammateIds) {
      const tData = teamData[tId]?.data ?? {}
      for (const [qid, entry] of Object.entries(tData)) {
        const existing = map.get(qid) ?? { meDone: null, friendDone: null }
        existing.friendDone = entry.v === true ? true : entry.v === false ? false : null
        map.set(qid, existing)
      }
    }

    return map
  }, [myProgress.data, teamProgress.data])

  // Inject progress data into nodes
  const nodesWithProgress: Node<QuestNodeData>[] = useMemo(() =>
    typedNodes.map((n) => {
      const prog = progressMap.get(n.id)
      const data: QuestNodeData = {
        ...n,
        meDone: prog?.meDone ?? null,
        friendDone: prog?.friendDone ?? null,
      }
      return {
        id: n.id,
        type: 'quest' as const,
        position: { x: n.x, y: n.y },
        style: { width: n.width, minHeight: n.height },
        data,
      }
    }),
  [progressMap])

  // Apply filter
  const visibleNodes = useMemo(() => {
    if (currentFilter === 'all') return nodesWithProgress
    return nodesWithProgress.filter((n) => {
      const { meDone, friendDone } = n.data
      switch (currentFilter) {
        case 'me-done': return meDone === true
        case 'friend-done': return friendDone === true
        case 'neither': return !meDone && !friendDone
        case 'both': return meDone && friendDone
        default: return true
      }
    })
  }, [nodesWithProgress, currentFilter])

  // Edge styles with colors
  const styledEdges: Edge[] = useMemo(() =>
    typedEdges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      type: 'straight' as const,
      style: {
        stroke: EDGE_COLORS[e.type] ?? '#409EFF',
        strokeWidth: 6,
      },
    })),
  [])

  // Search handler
  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) return
    const matches = nodesWithProgress.filter((n) =>
      n.data.title?.includes(searchTerm) ||
      n.data.description?.includes(searchTerm)
    )
    if (matches.length === 0) return

    const idx = matchIndex % matches.length
    fitView({
      nodes: [{ id: matches[idx].id }],
      duration: 800,
      maxZoom: 1.0,
    })
    setMatchIndex((prev) => prev + 1)
  }, [searchTerm, matchIndex, nodesWithProgress, fitView])

  return (
    <div className="quests-map-container" style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
      <ReactFlow
        nodes={visibleNodes}
        edges={styledEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        nodeDragThreshold={4}
        noDragClassName="nodrag"
        panOnDrag={true}
        minZoom={0.1}
        maxZoom={1.0}
        defaultViewport={{ x: 172, y: 260, zoom: 0.1 }}
        onlyRenderVisibleElements
        fitView={false}
      >
        <Background color="#333" gap={100} size={1} />
      </ReactFlow>

      {/* Search bar — fixed position, same as original */}
      <div style={{
        position: 'fixed',
        left: '129px',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        bottom: '236px',
        background: 'var(--background, #1a1a2e)',
        padding: '10px',
        border: '1px solid var(--classC, #555)',
        borderRadius: '4px',
      }}>
        <input
          type="text"
          placeholder="输入任务名称搜索..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setMatchIndex(0) }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch() }}
          style={{ width: '113px', padding: '8px' }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '8px 15px',
            marginLeft: '5px',
            background: '#409EFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          搜索
        </button>
      </div>
    </div>
  )
}

export function QuestTreeFlow() {
  return (
    <ReactFlowProvider>
      <TreeContent />
    </ReactFlowProvider>
  )
}
