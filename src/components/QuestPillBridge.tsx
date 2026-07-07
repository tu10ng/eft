// ============================================
// QuestPillBridge — scans DOM for .myButton elements
// and renders DualPill components via React Portals
// ============================================
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DualPill } from './DualPill'

export function QuestPillBridge() {
  const portals = useRef<Map<string, HTMLElement>>(new Map())
  // Track original buttons for cleanup — restore their display on unmount
  const originals = useRef<Map<string, HTMLElement>>(new Map())
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    function mountPill(btn: HTMLElement) {
      const questId = btn.id
      if (!questId || portals.current.has(questId)) return

      // Create container for our React portal
      const container = document.createElement('div')
      container.className = 'eft-dual-pill-container'
      container.style.cssText = 'display:contents;' // Don't affect layout

      // Hide original button but keep it in DOM (external scripts may reference it)
      btn.style.display = 'none'

      // Insert container next to button
      btn.parentNode?.insertBefore(container, btn)

      portals.current.set(questId, container)
      originals.current.set(questId, btn)
      forceUpdate((n) => n + 1)
    }

    // Initial scan — but buttons may not exist yet (loaded by deferred scripts)
    const scan = () => {
      document.querySelectorAll<HTMLElement>('.myButton').forEach((btn) => mountPill(btn))
    }

    // Scan immediately
    scan()

    // Also scan after a delay (deferred scripts)
    const t1 = setTimeout(scan, 1000)
    const t2 = setTimeout(scan, 3000)
    const t3 = setTimeout(scan, 5000)

    // MutationObserver for dynamically added buttons
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node instanceof HTMLElement) {
            if (node.classList?.contains('myButton')) mountPill(node)
            node.querySelectorAll?.<HTMLElement>('.myButton').forEach((btn) => mountPill(btn))
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      observer.disconnect()

      // Cleanup: remove created containers and restore original buttons
      portals.current.forEach((container, questId) => {
        container.remove()
        const btn = originals.current.get(questId)
        if (btn) btn.style.display = ''
      })
      portals.current.clear()
      originals.current.clear()
    }
  }, [])

  return (
    <>
      {Array.from(portals.current.entries()).map(([questId, container]) =>
        createPortal(<DualPill questId={questId} />, container, questId)
      )}
    </>
  )
}
