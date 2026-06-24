# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # tsc -b && vite build  — this is the typecheck+build gate
npm run lint       # eslint . (lint is enforced; warnings are tolerated, errors are not)
npm run preview    # serve the production build

# Sanity (CLI auth is via `npx sanity login`; config read from root sanity.config.ts/sanity.cli.ts)
npx sanity schema validate                         # validate Studio schemas
npx sanity dataset list
npx sanity cors add http://localhost:<port> --credentials   # needed for Studio/admin auth on a new dev origin
```

There is **no test suite** configured. After changes, the verification gate is `npm run lint && npm run build`.

## Big picture

A Vite + React 19 + React Router 7 + Tailwind v4 + Sanity **single-page app** (no server/SSR). It presents one brand as three distinct "worlds" — **Programming**, **Chef**, **Fun** — plus an authenticated **admin** and an embedded **Sanity Studio**.

- `src/app/App.tsx` — the single route table. Three kinds of top-level routes:
  - `/studio/*` → embedded Sanity Studio, **lazy-loaded, outside the public shell**.
  - `/admin/*` → admin app with its **own auth + layout**, also outside the public shell.
  - everything else → wrapped by `RootLayout` (global nav + footer + theming).
- `src/sections/{programming,chef,fun}/` — each world's pages. Detail routes are **nested** (`/chef/recipes/:slug`, `/fun/games/:slug`, etc.), not a shared `/:slug`.

## Theming (read before touching styles)

Theming is the core architectural mechanism. `src/styles/tokens.css` defines semantic CSS variables (`--bg`, `--surface`, `--text`, `--accent`, `--accent-2/3`, `--primary`, `--muted`, `--border`, `--font-body`) and maps them into Tailwind via `@theme inline`, then **overrides them per `[data-theme="home|programming|chef|fun"]`**. `RootLayout` sets `data-theme` from the first URL segment, so the entire chrome re-skins per world.

**Convention:** build UI with semantic token utilities — `bg-surface`, `text-accent`, `border-border`, `text-primary`, `text-muted` — never hardcoded colors. Components written this way automatically adopt each world's palette. (Chef uses gold-on-black with serif, so CTAs there use `text-black` on `bg-accent`.)

## Sanity data flow

- **Embedded Studio**: app-side config in `src/sanity/config.ts` (env-based ids, `basePath: '/studio'`); root `sanity.config.ts` + `sanity.cli.ts` use **literal** ids for the CLI (kept separate so the CLI doesn't evaluate Vite's `import.meta.env`). Schemas live in `src/sanity/schemaTypes/`.
- **Public reads**: `src/lib/sanity/client.ts` (dataset `production`, `useCdn`) → GROQ strings in `queries.ts` → types in `types.ts`, consumed via the `useSanityQuery` hook.
- **Admin/private data**: a separate **private** dataset (not public-read). `src/lib/sanity/adminClient.ts` builds a token client; `src/admin/auth/` holds the auth context/provider; `src/admin/usePrivateCollection.ts` does CRUD. Private docs (contact/opportunity/note/task) are **schema-less** — created directly via the client, no Studio schema.
- **Auth model**: single user, Sanity API token entered at runtime on `/admin` and kept in `localStorage` (never bundled, never in `.env`). Token requires Editor access to the private dataset.

**Critical:** never import from `src/sanity/schemaTypes/*` into frontend pages — it pulls the entire `sanity` package into the main bundle. Option lists (categories) are deliberately duplicated in `src/lib/sanity/constants.ts` for this reason.

## Cross-cutting conventions

- **SEO**: `src/components/Seo.tsx` relies on **React 19 head hoisting** (renders `<title>`/`<meta>`/`<link>` anywhere; no helmet library). Pass values from Sanity content.
- **Search & tags** span all content types via `src/lib/sanity/contentLink.ts` (`contentLink`/`contentLabel` map a document `_type` → its public route/label).
- **Galleries**: reuse `src/components/galleries/{Lightbox,MasonryGallery}.tsx`.
- **Static profile data** (skills/experience, chef narrative) is intentionally local in `src/sections/*/data.ts`, not in Sanity.
- **Analytics**: `src/lib/analytics.ts` is a no-op unless `VITE_ANALYTICS_ENDPOINT` is set.

## Lint/TS gotchas that will fail the build

- `react-hooks/set-state-in-effect` is an **error**: never call `setState` synchronously in an effect body. Use a lazy `useState(() => …)` initializer or wrap async work in an IIFE so state is set inside callbacks (see `useSanityQuery`, `AdminAuthProvider`).
- `noUnusedLocals`/`noUnusedImports` are on (e.g. no bare `import React`).
- For React Fast Refresh, keep hooks/context in non-component modules separate from provider components (see `src/admin/auth/context.ts` vs `AdminAuthProvider.tsx`).
- Env vars are public (`.env`, committed) except secrets, which go in `.env.local` (git-ignored via `*.local`).
