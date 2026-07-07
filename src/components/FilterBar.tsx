// ============================================
// FilterBar — filter buttons for quest completion status
// ============================================
import { useUIStore } from '../stores/uiStore'
import type { FilterMode } from '../types'

const FILTERS: { mode: FilterMode; label: string }[] = [
  { mode: 'all', label: '全部' },
  { mode: 'friend-done', label: '仅好友完成' },
  { mode: 'me-done', label: '仅我完成' },
  { mode: 'neither', label: '都没做' },
  { mode: 'both', label: '都完成' },
]

export function FilterBar() {
  const currentFilter = useUIStore((s) => s.currentFilter)
  const setFilter = useUIStore((s) => s.setFilter)

  return (
    <div className="eft-filter-bar" id="eft-filter-bar">
      <span style={{ fontSize: 11, color: '#aaa', marginRight: 4 }}>筛选:</span>
      {FILTERS.map((f) => (
        <button
          key={f.mode}
          className={`eft-filter-btn${currentFilter === f.mode ? ' eft-filter-active' : ''}`}
          data-filter={f.mode}
          onClick={() => setFilter(f.mode)}
        >
          {f.label}
        </button>
      ))}
    </div>
  )
}
