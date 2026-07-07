# 使用中文思考

# 不要考虑兼容性

# 不要"先简单实现", 必须根据当前代码和业务场景, 采用架构最优方案, 提升用户体验

# 每次需求做完或者问题修复后, 都要更新CLAUDE.md, 记录和你对项目的更深的理解.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (port 5173)
npm run build     # TypeScript check + Vite production build to dist/
npm run lint      # Run oxlint (TypeScript linter)
npm run preview   # Preview production build locally
```

## Project overview

Escape from Tarkov (EFT) quest progress tracker. The app embeds a quest tree page from eftarkov.com (~745KB single HTML file) and adds a React overlay for Supabase-based cloud sync, team management, and teammate progress comparison.

## Architecture: hybrid HTML + React overlay

This is **not** a pure React SPA. The original EFT quest tree is a standalone HTML page (`index.html`) with its own jQuery scripts, SVG rendering, and imperative DOM manipulation. React is layered **on top** as an enhancement:

- **`src/main.tsx`** creates a React root at the bottom of `<body>` — it does not take over the full page.
- **`src/App.tsx`** renders three things into this root:
  - `SyncPanel` — login/register, team CRUD, invite codes, filter bar (fixed-position panel at bottom-right)
  - `QuestPillBridge` — scans the DOM for `.myButton` elements (quest cards from the original page), hides them, and renders React `DualPill` components next to them via **React Portals**
  - `TeamDashboard` — comparison modal
- The public directory contains the original page assets: `public/global.js`, `public/tree.html`, `public/web_205.html`, `public/xiaoguo.js`, etc. These run independently of React.

## Data flow

```
Original DOM (.myButton)  ←→  QuestPillBridge (portals)  ←→  DualPill
                                                               ↓ useMyProgress (TanStack Query)
                                                               ↓ useTeamProgress (TanStack Query)
                                                               ↓ useToggleQuest (optimistic mutation)
                                                               ↓
                                                          supabase client
                                                    (PostgREST + Realtime WS)
```

### State management split

- **Server state** → **TanStack Query** (`@tanstack/react-query`): quest progress (`useMyProgress`, `useToggleQuest`), team info/progress (`useTeamInfo`, `useTeamProgress`). Persisted to IndexedDB for offline support via `idb-keyval`. Stale time: 30s for my progress, 15s for team progress.
- **UI state** → **Zustand** (`src/stores/uiStore.ts`): current user, teamId, filter mode, dashboard open/close, sync status indicator.

### Quest data format

V2 timestamped format (legacy boolean format is normalized at fetch time):

```json
{ "questId": { "v": true, "t": 1750000000000 } }
```

`useToggleQuest` uses **optimistic updates** — the UI toggles immediately, with rollback on failure.

## Supabase backend

Project ref: `ywzdjijjeqeyevhrudrf`. The Supabase MCP tools in `.mcp.json` can execute SQL, manage migrations, and check logs against this project.

### Database tables (see `supabase/migrations/`)

| Table | Purpose |
|---|---|
| `profiles` | Auto-created on signup via trigger `handle_new_user()` |
| `teams` | Teams with `invite_code` |
| `team_members` | Junction table, composite PK (`team_id, user_id`) |
| `quest_progress` | One row per user, `quest_data` is JSONB |

### RLS model

- `quest_progress`: users can SELECT their own + teammates' rows; only INSERT/UPDATE their own
- `teams`: members can SELECT their team; any authenticated user can INSERT
- `team_members`: members can SELECT their team roster; INSERT allowed for team owner OR self-join

### Realtime

Quest changes broadcast via `supabase_realtime` publication on `quest_progress`. `useRealtime` subscribes to these changes and incrementally updates the TanStack Query cache, with a 10s polling fallback when WebSocket is disconnected.

## Key patterns

- **Portals over DOM mutation**: `QuestPillBridge` uses `MutationObserver` + timed scans (1s, 3s, 5s) to find `.myButton` elements since they're loaded by deferred scripts. Always mount pills in new containers next to the original buttons — never remove the originals (external scripts may reference them).
- **Optimistic mutations with rollback**: `useToggleQuest` snapshots the previous query cache, applies the update immediately, and rolls back on error.
- **Realtime + polling duality**: WebSocket subscription for live updates; when disconnected, falls back to `refetchInterval: 10_000` on `useTeamProgress`.
- **No routing**: This is a single-page app with a modal overlay for the dashboard.

## Architecture decisions & gotchas

### queryFn must be pure
TanStack Query's `queryFn` must be a **pure function** — no side effects like setting Zustand state. `useTeamInfo` previously called `setTeamId()` inside `queryFn`, which is wrong because:
- React StrictMode double-invokes queryFn, causing duplicate side effects
- Query retries would re-execute the side effect
- Breaks the separation between data fetching and state management

**Fix**: Use `useEffect` to sync `query.data.teamId` → Zustand `setTeamId`. The `useEffect` runs only when the query result actually changes, not on every retry/StrictMode invocation.

### SyncStatus has two independent sources
`useSyncStatus` (browser online/offline) and `useRealtime` (WebSocket connection) both write to the same `syncStatus` Zustand field. The coordination rule:
- Browser offline → always `'offline'` (overrides everything)
- Browser online + realtime connected → `'online'`
- Browser online + realtime disconnected → stays `'offline'` (realtime sets it)
- Not logged in → `'offline'`

`useRealtime` now explicitly sets `syncStatus = 'offline'` on `CHANNEL_ERROR` / `TIMED_OUT` / `CLOSED`, and `useSyncStatus` only transitions to `'online'` when `realtimeStatus === 'connected'`.

### QuestPillBridge cleanup
When the component unmounts (e.g., hot reload in dev), created containers must be removed and original `.myButton` elements' `display: none` must be restored. Track both `portals` (containers) and `originals` (buttons) in refs, and clean up in the effect's return function.

### Filter implementation
Filter buttons (全部/仅好友完成/仅我完成/都没做/都完成) set `currentFilter` in Zustand. Each `DualPill` instance reads `currentFilter`, computes whether the quest matches via `matchesFilter()`, then walks up the DOM (`btn.closest('g')`) to find the quest card wrapper and toggle its `display` style. This keeps filter logic co-located with each pill rather than in a central controller.

### TanStack Query: stable function references matter
`useAuth` returns `login` and `logout` — these should be wrapped in `useCallback` so that components depending on them (e.g., `SyncPanel.handleLogin`) don't get new function references every render. Zustand selectors like `useUIStore((s) => s.setUser)` return stable references, so including them in `useCallback` deps is safe.

### Error boundary for overlay resilience
The React overlay is a separate root from the main page. If any overlay component crashes, it takes down the entire overlay. `ErrorBoundary` in `App.tsx` catches render errors and shows a fallback panel with a retry button, keeping the main quest tree page functional.
