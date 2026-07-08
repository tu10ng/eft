# 使用中文思考

# 不要考虑兼容性

# 不要"先简单实现", 必须根据当前代码和业务场景, 采用架构最优方案, 提升用户体验

# 每次需求做完或者问题修复后, 都要更新CLAUDE.md, 记录和你对项目的更深的理解.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (port 3456)
npm run build     # TypeScript check + Vite production build to dist/
npm run lint      # Run oxlint (TypeScript linter)
npm run preview   # Preview production build locally
npm run extract   # Re-extract quest data from original HTML -> src/data/*.json
```

## Project overview

Escape from Tarkov (EFT) quest progress tracker. The quest tree is rendered with **React Flow (@xyflow/react)**, replacing the previous 745KB static HTML SVG. React now owns the full page -- no more DOM scanning, Portal bridges, or hybrid architecture. Supabase-based cloud sync, team management, and teammate progress comparison. Exactly 2 users (玩家1, 玩家2) -- teammate pairing is automatic via nickname mapping.

## Deployment

Hosted on **GitHub Pages** at `https://tu10ng.github.io/eft/`. Automatic deployment via GitHub Actions on push to `master` (`.github/workflows/deploy.yml`).

- **Why GitHub Pages instead of Vercel**: Vercel's `*.vercel.app` domains are blocked by the GFW in China. GitHub Pages' `*.github.io` domains are accessible.
- **Vite `base`** is set to `/eft/` because the site is served from a subdirectory, not the apex domain.
- Supabase backend is unaffected -- the frontend connects directly to Supabase regardless of where it's hosted.

## Architecture: React Flow SPA

The quest tree is rendered entirely by React Flow. The previous hybrid approach (static HTML SVG + React overlay) has been fully replaced:

- **`index.html`** is a minimal Vite entry (~800B). No inline SVG, no legacy scripts.
- **`src/main.tsx`** renders the React app into `#root`, taking over the full page.
- **`src/App.tsx`** renders:
  - `QuestTreeFlow` -- React Flow container with 548 quest nodes, 230 edges, pan/zoom, search, and filtering
  - `SyncPanel` -- nickname-only login, filter bar, dashboard toggle (fixed-position panel at bottom-right)
  - `TeamDashboard` -- comparison modal
- Quest data source: `src/data/quest-nodes.json` (548 quest nodes) + `src/data/quest-edges.json` (230 edges), extracted from original HTML at build time via `scripts/extract-quest-data.mjs`

## Data flow

```
QuestTreeFlow (React Flow)
  ├── useMyProgress (TanStack Query) ---- Supabase --> my quest progress
  ├── useTeamProgress (TanStack Query) --- Supabase --> teammate progress
  ├── progressMap (useMemo) -------------- merges my + friend --> Map<questId, {meDone, friendDone}>
  └── nodes[].data ----------------------- injected into each QuestNode
                                              ↓
                                         QuestNode (React Flow custom node)
                                              ↓
                                         DualPill (pure UI, receives meDone/friendDone as props)
                                              ↓ useToggleQuest (optimistic mutation)
                                              ↓
                                         supabase client
                                       (PostgREST + Realtime WS)

Auth flow (no email/password from user):
  SyncPanel (click nickname) -> POST to Edge Function -> gets session -> setSession() -> authenticated
```

### Key architectural change from v3 (bridge layer eliminated)

- **Old**: `QuestPillBridge` scanned DOM for `.myButton` elements via MutationObserver + timed scans, created portal containers, hid original buttons, then rendered DualPill via React Portal
- **New**: DualPill renders directly inside each React Flow custom node. No DOM scanning, no portals, no MutationObserver. Progress data flows from parent -> nodes[] -> props.
- **Performance**: Previously 559 x 2 = 1118 TanStack Query observers. Now 2 observers total (1 useMyProgress + 1 useTeamProgress in QuestTreeFlow), with progress pre-computed via useMemo and passed down.

### State management split

- **Server state** -> **TanStack Query** (`@tanstack/react-query`): quest progress (`useMyProgress`, `useToggleQuest`), teammate progress (`useTeamProgress`). Persisted to IndexedDB for offline support via `idb-keyval`. Stale time: 30s for my progress, 15s for teammate progress.
- **UI state** -> **Zustand** (`src/stores/uiStore.ts`): current user, teammateId (auto-resolved at login), filter mode, dashboard open/close, sync status indicator.

### Quest data format

V2 timestamped format (legacy boolean format is normalized at fetch time):

```json
{ "questId": { "v": true, "t": 1750000000000 } }
```

`useToggleQuest` uses **optimistic updates** -- the UI toggles immediately, with rollback on failure.

## React Flow quest tree

### QuestNode (custom node component)

Each quest card is a React Flow custom node (`QuestNodeMemo`). The component renders the EXACT same DOM structure as the original SVG foreignObject HTML:
- Same class names (`quests-map-card`, `quests-map-card__header`, `_prapor`, etc.)
- Same CSS from `web_205.css` (scoped under `.quests-map-container`)
- Links have `className="nodrag"` to prevent React Flow from intercepting clicks
- DualPill buttons also wrapped in `nodrag`
- `React.memo` with custom comparator: only re-renders when `meDone`, `friendDone`, or `isHighlight` changes

### QuestNodeData type

```typescript
interface QuestNodeData {
  id: string
  x: number; y: number; width: number; height: number
  trader: string           // "_prapor" | "_therapist" | ...
  title: string
  description: string      // may contain <br/> tags
  levelReq: string
  linkUrl: string           // "/news/[id].html"
  kappaImg: string; kappaTitle: string
  traderIcon: string; traderTitle: string
  isHighlight: boolean
  meDone?: boolean | null     // injected at runtime by QuestTreeFlow
  friendDone?: boolean | null // injected at runtime by QuestTreeFlow
}
```

### QuestTreeFlow (React Flow container)

- Wraps in `ReactFlowProvider` then renders `TreeContent` (inner component has access to `useReactFlow()`)
- Configures: `nodeDragThreshold={4}`, `noDragClassName="nodrag"`, `panOnDrag={true}`, `minZoom={0.1}`, `maxZoom={1.0}`, `defaultViewport={{ x: 172, y: 260, zoom: 0.1 }}`
- Enables `onlyRenderVisibleElements` for viewport culling
- Filter: `useMemo` filters `nodes` array by Zustand `currentFilter` (all / me-done / friend-done / neither / both)
- Search: `fitView({ nodes: [{ id }], duration: 800, maxZoom: 1.0 })` replaces old custom animation
- Progress: `useMemo` pre-computes a `Map<questId, {meDone, friendDone}>` from Supabase data, injects into each node's `data` field

### Edge connections

Edges use React Flow's `StraightEdge` type with color coding:
- `line` (blue, 225 edges): `stroke: '#409EFF'`
- `line1` (red, 5 edges): `stroke: '#FF0000'`
- `line2` (green, 6 edges): `stroke: '#00b285'`

230 edges matched via geometric proximity algorithm in `scripts/extract-quest-data.mjs`. ~62 long-distance edges unmatched (21%) -- toleratable for initial release.

### CSS: quest-card.css

Extracted ~130 lines from `web_205.css` (card-related rules only). Scoped under `.quests-map-container` for 1:1 compatibility. React Flow wrapper has `className="quests-map-container"` so all rules apply.

**5 CSS compatibility issues handled:**
1. `.quests-map-container` prefix -- added to React Flow wrapper div
2. `width: 100%` on `.quests-map-card` -- fixed by explicit `style={{ width: 350, minHeight: 230 }}` on each node
3. `.quests-map-trader-card__image>img` (direct child selector) -- QuestTraderNode keeps flat DOM
4. `._margin` classes -- not used in current data, handled in extraction if needed
5. `.quests-map-card__tooltip` z-index -- added `.react-flow__node { overflow: visible !important }`

## MCP servers (`.mcp.json`)

| Server | Type | Purpose |
|---|---|---|
| `supabase` | HTTP | SQL queries, migrations, logs for Supabase project `ywzdjijjeqeyevhrudrf` |

## Supabase backend

Project ref: `ywzdjijjeqeyevhrudrf`. Supabase credentials are hardcoded in `src/lib/supabase.ts` (anon key is public by design).

### Database tables (see `supabase/migrations/`)

| Table | Purpose |
|---|---|
| `profiles` | Auto-created on signup via trigger `handle_new_user()` |
| `teams` | Deprecated -- no longer used by frontend (kept for data retention) |
| `team_members` | Deprecated -- no longer used by frontend (kept for data retention) |
| `quest_progress` | One row per user, `quest_data` is JSONB |

### Auth: nickname-only login (no email / no password)

Users do **not** see or type email/password anywhere. The login UI shows two nickname buttons ("玩家1", "玩家2"). Clicking a nickname calls a Supabase Edge Function (`nickname-auth`) that:
1. Maps nickname -> internal email (e.g. `p1@eft.internal`)
2. Ensures the Supabase Auth user exists (lazy-create with `admin.createUser()` if first login)
3. Signs in with a server-side-only password and returns the session tokens
4. Client calls `supabase.auth.setSession()` with the returned tokens

Key points:
- The internal password (`eft-nickname-auth-9251b3f8`) exists ONLY in the Edge Function source code (server-side, never reaches the browser)
- Internal emails (`p1@eft.internal`, `p2@eft.internal`) are hidden from users -- they see only nicknames
- `EftUser` type stores `{ id, displayName }` -- no `email` field
- Edge Function: `supabase/functions/nickname-auth/index.ts`, deployed with `verify_jwt: false`
- URL: `https://ywzdjijjeqeyevhrudrf.supabase.co/functions/v1/nickname-auth`
- On auth state change, `useAuth` queries `profiles.display_name`, sets `EftUser.displayName`, then auto-resolves the teammate's UUID via nickname mapping (玩家1<->玩家2) and stores it as `teammateId` in Zustand

### Teammate resolution (no team/squad needed)

Since the system has exactly 2 users, teammate pairing is automatic:
1. On login, `useAuth` reads `user.displayName` (玩家1 or 玩家2)
2. Maps to the other nickname via hardcoded dictionary: `{ '玩家1': '玩家2', '玩家2': '玩家1' }`
3. Queries `profiles` table: `SELECT id WHERE display_name = 对方昵称`
4. Stores result as `teammateId` in Zustand
5. `useTeamProgress` uses `teammateId` directly to fetch the other player's quest data
6. If the other player hasn't logged in yet (no profile row), `teammateId` stays null and the friend pill shows "暂无好友数据"

### RLS model

- `quest_progress`: any authenticated user can SELECT (migration 003); only INSERT/UPDATE their own
- `teams` / `team_members`: policies still exist but frontend no longer accesses these tables

### Realtime

Quest changes broadcast via `supabase_realtime` publication on `quest_progress`. `useRealtime` subscribes to these changes and incrementally updates the TanStack Query cache, with a 10s polling fallback when WebSocket is disconnected.

## Key patterns

- **Custom React Flow nodes over Portals**: QuestNode renders DualPill directly inline. No DOM scanning, no MutationObserver, no portal containers. `nodrag` class on links and buttons prevents React Flow from intercepting clicks.
- **Pre-computed progress via useMemo**: Instead of 548 x 2 = 1096 individual TanStack Query observers, QuestTreeFlow computes a single `progressMap` and injects progress into `nodes[].data`. QuestNode reads from props, DualPill receives `meDone`/`friendDone` as props.
- **Filter via nodes array**: Instead of DOM traversal (`btn.closest('g')` + `style.display`), filter is applied by `useMemo` on the nodes array. React Flow automatically re-renders.
- **Search via fitView**: Replaces custom two-phase `requestAnimationFrame` animation. `fitView({ nodes: [{ id }], duration: 800, maxZoom: 1.0 })` handles smooth pan/zoom.
- **Optimistic mutations with rollback**: `useToggleQuest` snapshots the previous query cache, applies the update immediately, and rolls back on error.
- **Realtime + polling duality**: WebSocket subscription for live updates; when disconnected, falls back to `refetchInterval: 10_000` on `useTeamProgress`.
- **No routing**: This is a single-page app with a modal overlay for the dashboard.

## Architecture decisions & gotchas

### Quest data extraction

`scripts/extract-quest-data.mjs` parses the original `index.html` (from git history) to extract quest nodes and edges. Run `npm run extract` to regenerate `src/data/quest-nodes.json` and `src/data/quest-edges.json`. The current index.html is a minimal Vite entry -- DO NOT run extract on the new one (it will output 0 nodes).

### Edge matching limitation

230/292 edges matched (78.8%). Unmatched edges are long-distance connections where the nearest-node proximity algorithm picks the wrong card. These can be manually corrected by editing `src/data/quest-edges.json` based on the line comments in the original HTML (e.g., `/* Prapor-窃听风暴 */`).

### SyncStatus has two independent sources

`useSyncStatus` (browser online/offline) and `useRealtime` (WebSocket connection) both write to the same `syncStatus` Zustand field. The coordination rule:
- Browser offline -> always `'offline'` (overrides everything)
- Browser online + realtime connected -> `'online'`
- Browser online + realtime disconnected -> stays `'offline'` (realtime sets it)
- Not logged in -> `'offline'`

### Filter implementation (React Flow)

Filter buttons (全部/仅好友完成/仅我完成/都没做/都完成) set `currentFilter` in Zustand. `QuestTreeFlow` reads `currentFilter` and filters the nodes array via `useMemo`. React Flow automatically shows/hides nodes. No DOM traversal needed.

### TanStack Query: stable function references matter

`useAuth` returns `login` and `logout` -- these should be wrapped in `useCallback` so that components depending on them (e.g., `SyncPanel.handleLogin`) don't get new function references every render. Zustand selectors like `useUIStore((s) => s.setUser)` return stable references, so including them in `useCallback` deps is safe.

### Error boundary for overlay resilience

The React overlay is a separate root from the main page. If any overlay component crashes, it takes down the entire overlay. `ErrorBoundary` in `App.tsx` catches render errors and shows a fallback panel with a retry button, keeping the main quest tree page functional.

### GitHub Pages subdirectory: `base: '/eft/'`

Vite's `base` is set to `/eft/` so that all asset paths (JS bundles, CSS, images) are prefixed correctly for the GitHub Pages project site URL (`tu10ng.github.io/eft/`). Without this, assets would 404 because the browser resolves `/assets/...` relative to `tu10ng.github.io` instead of `tu10ng.github.io/eft/`.

### Vercel -> GitHub Pages migration

Originally deployed on Vercel. Switched to GitHub Pages because `*.vercel.app` domains are blocked by the GFW in China. The Vercel project (`tu10ngs-projects/eft`) and `vercel.json` still exist but are no longer the primary deployment target. GitHub Actions handles CI/CD now -- push to master triggers `.github/workflows/deploy.yml`.
