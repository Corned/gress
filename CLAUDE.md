# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the repo root via `make`:

| Command | Description |
|---|---|
| `make dev` | Run client and server in parallel (dev mode) |
| `make dev-client` | Nuxt dev server only (`bun run dev` in `client/`) |
| `make dev-server` | Go dev server only (`go run main.go` in `server/`) |
| `make build` | Build both client (Nuxt static gen) and server (Go binary) |
| `make install` | Install all dependencies (bun + go mod) |
| `make clean` | Remove build artifacts |

Client uses **bun** as the package manager. Server uses Go 1.25.

## Architecture

**gress** is an Overwatch 2 scrim tracker — a Nuxt 4 SPA served by a Go/Gin backend as static files.

```
client/   → Nuxt 4 + Vue 3 + TypeScript + Tailwind CSS 4 + Nuxt UI 4
server/   → Go 1.25 + Gin (serves /public, SPA fallback routing)
```

The build pipeline (`make build-client`) runs `bun run generate` to produce a static site, which gets copied into `server/public/`. The Go server then serves everything from that directory with SPA fallback.

**Current state:** Auth (Battle.net) and database (MongoDB driver imported, `db/` empty) are not yet implemented. The login button navigates directly to `/dashboard`.

### Client structure

- `app/pages/` — `index.vue` (landing), `dashboard.vue` (main app), `entry.vue` (scrim entry), `about.vue`
- `app/components/` — shared UI components
- `app/lib/` — utility functions
- `app/assets/` — global CSS, fonts (Google Sans, Rubik)
- `nuxt.config.ts` — uses `@nuxt/ui`, `@nuxt/content`, `@nuxt/image`, `@nuxt/eslint`

### Design system

- **Colors:** Zinc only — no other Tailwind color palette
- **Typography:** Google Sans for UI, Rubik for display/headings
- **Hover states:** No shadows — use background/border color changes instead
- **Navigation:** Prefer `NuxtLink` over `useRouter().push()`

### Deployment

Deployed to Render via `render.yaml`. Build runs `./deploy.sh`, start command is `./server/app`. Requires a `server/.env` with `PORT` and `MONGODB_URI`.
