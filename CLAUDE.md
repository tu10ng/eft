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
```

## Project overview

Escape from Tarkov (EFT) quest progress tracker. The app embeds a quest tree page from eftarkov.com (~745KB single HTML file) and adds a React overlay for Supabase-based cloud sync and dual-player progress comparison. Exactly 2 users (玩家1, 玩家2) — teammate pairing is automatic via nickname mapping, no team/squad creation needed.

## Deployment

Hosted on **GitHub Pages** at `https://tu10ng.github.io/eft/`. Automatic deployment via GitHub Actions on push to `master` (`.github/workflows/deploy.yml`).

- **Why GitHub Pages instead of Vercel**: Vercel's `*.vercel.app` domains are blocked by the GFW in China. GitHub Pages' `*.github.io` domains are accessible.
- **Vite `base`** is set to `/eft/` because the site is served from a subdirectory, not the apex domain.
- Supabase backend is unaffected — the frontend connects directly to Supabase regardless of where it's hosted.

## Architecture: hybrid HTML + React overlay

This is **not** a pure React SPA. The original EFT quest tree is a standalone HTML page (`index.html`) with its own jQuery scripts, SVG rendering, and imperative DOM manipulation. React is layered **on top** as an enhancement:

- **`src/main.tsx`** creates a React root at the bottom of `<body>` — it does not take over the full page.
- **`src/App.tsx`** renders three things into this root:
  - `SyncPanel` — nickname-only login (no email/password), filter bar, dashboard toggle (fixed-position panel at bottom-right)
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

Auth flow (no email/password from user):
  SyncPanel (click nickname) → POST to Edge Function → gets session → setSession() → authenticated
```

### State management split

- **Server state** → **TanStack Query** (`@tanstack/react-query`): quest progress (`useMyProgress`, `useToggleQuest`), teammate progress (`useTeamProgress`). Persisted to IndexedDB for offline support via `idb-keyval`. Stale time: 30s for my progress, 15s for teammate progress.
- **UI state** → **Zustand** (`src/stores/uiStore.ts`): current user, teammateId (auto-resolved at login), filter mode, dashboard open/close, sync status indicator.

### Quest data format

V2 timestamped format (legacy boolean format is normalized at fetch time):

```json
{ "questId": { "v": true, "t": 1750000000000 } }
```

`useToggleQuest` uses **optimistic updates** — the UI toggles immediately, with rollback on failure.

## MCP servers (`.mcp.json`)

| Server | Type | Purpose |
|---|---|---|
| `supabase` | HTTP | SQL queries, migrations, logs for Supabase project `ywzdjijjeqeyevhrudrf` |

Additional MCP servers (Vercel, GitHub) can be added as needed for deployment or repo management tasks.

## Supabase backend

Project ref: `ywzdjijjeqeyevhrudrf`. Supabase credentials are hardcoded in `src/lib/supabase.ts` (anon key is public by design).

### Database tables (see `supabase/migrations/`)

| Table | Purpose |
|---|---|
| `profiles` | Auto-created on signup via trigger `handle_new_user()` |
| `teams` | Deprecated — no longer used by frontend (kept for data retention) |
| `team_members` | Deprecated — no longer used by frontend (kept for data retention) |
| `quest_progress` | One row per user, `quest_data` is JSONB |

### Auth: nickname-only login (no email / no password)

Users do **not** see or type email/password anywhere. The login UI shows two nickname buttons ("玩家1", "玩家2"). Clicking a nickname calls a Supabase Edge Function (`nickname-auth`) that:
1. Maps nickname → internal email (e.g. `p1@eft.internal`)
2. Ensures the Supabase Auth user exists (lazy-create with `admin.createUser()` if first login)
3. Signs in with a server-side-only password and returns the session tokens
4. Client calls `supabase.auth.setSession()` with the returned tokens

Key points:
- The internal password (`eft-nickname-auth-9251b3f8`) exists ONLY in the Edge Function source code (server-side, never reaches the browser)
- Internal emails (`p1@eft.internal`, `p2@eft.internal`) are hidden from users — they see only nicknames
- `EftUser` type stores `{ id, displayName }` — no `email` field
- Edge Function: `supabase/functions/nickname-auth/index.ts`, deployed with `verify_jwt: false`
- URL: `https://ywzdjijjeqeyevhrudrf.supabase.co/functions/v1/nickname-auth`
- On auth state change, `useAuth` queries `profiles.display_name`, sets `EftUser.displayName`, then auto-resolves the teammate's UUID via nickname mapping (玩家1↔玩家2) and stores it as `teammateId` in Zustand

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

- **Portals over DOM mutation**: `QuestPillBridge` uses `MutationObserver` + timed scans (1s, 3s, 5s) to find `.myButton` elements since they're loaded by deferred scripts. Always mount pills in new containers next to the original buttons — never remove the originals (external scripts may reference them).
- **Optimistic mutations with rollback**: `useToggleQuest` snapshots the previous query cache, applies the update immediately, and rolls back on error.
- **Realtime + polling duality**: WebSocket subscription for live updates; when disconnected, falls back to `refetchInterval: 10_000` on `useTeamProgress`.
- **No routing**: This is a single-page app with a modal overlay for the dashboard.

## Architecture decisions & gotchas

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

### GitHub Pages subdirectory: `base: '/eft/'`
Vite's `base` is set to `/eft/` so that all asset paths (JS bundles, CSS, images) are prefixed correctly for the GitHub Pages project site URL (`tu10ng.github.io/eft/`). Without this, assets would 404 because the browser resolves `/assets/...` relative to `tu10ng.github.io` instead of `tu10ng.github.io/eft/`.

This only affects Vite-injected assets (the React bundle). Legacy scripts in the quest tree HTML use relative paths (`./js/...`) which resolve correctly regardless.

### Vercel → GitHub Pages migration
Originally deployed on Vercel. Switched to GitHub Pages because `*.vercel.app` domains are blocked by the GFW in China. The Vercel project (`tu10ngs-projects/eft`) and `vercel.json` still exist but are no longer the primary deployment target. GitHub Actions handles CI/CD now — push to master triggers `.github/workflows/deploy.yml`.
