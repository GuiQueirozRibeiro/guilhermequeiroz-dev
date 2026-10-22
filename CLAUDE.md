# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # dev server (Next.js, localhost:3000)
npm run build     # production build
npm run start     # serve production build locally
npm run lint      # ESLint
```

## Architecture

Portfolio built with **Next.js 16 (App Router)**, React 19, TypeScript, Tailwind CSS. SSR/SSG per route — not a client-only SPA, and routing is native file-based routing under `src/app/`, not hash-based.

See **`docs/ARCHITECTURE.md`** for the full breakdown (routing, state, data layer, sections, theming) and **`docs/SEO.md`** for how metadata/indexing is implemented. Quick orientation:

- **Entry/root layout:** `src/app/layout.tsx` — global `<head>`/metadata, theme-init script, JSON-LD `Person`, GA4.
- **Client shell:** `src/app/app-shell.tsx` — holds `lang`/`theme`/easter-egg state via Context (`useAppShell()`), wraps every route.
- **Routes:** `src/app/page.tsx` (home), `src/app/project/[id]/page.tsx` (per-project page with its own `generateMetadata()`).
- **Data layer:** `src/data/*.ts` (`PROJECTS`, `COMPANIES`, `SERVICES`, `STACK`, `HIGHLIGHTS`) is the source of truth for content, typed by `src/types.ts`. `src/i18n.tsx` holds pt/en UI strings (`I18N`), selected via `I18N[lang]` and passed as the `t` prop to every section.
- **SEO:** `src/lib/seo.ts` centralizes `SITE_URL`/`PERSON`/`resolveOgImage()`; `src/app/robots.ts` and `src/app/sitemap.ts` are native App Router conventions generating `/robots.txt` and `/sitemap.xml`.
- **UI primitives:** `src/ui.tsx`, section components in `src/sections/` (re-exported via `src/sections/index.ts`), reusable visual components in `src/components/`.
- **Theming:** CSS custom properties in `globals.css`, toggled via `data-theme` on `<html>`, initialized pre-hydration by an inline script in `layout.tsx` to avoid a flash of the wrong theme.

**Edit mode (Claude Design integration):** `AppShell` listens for `postMessage` events to toggle the `<Tweaks>` panel. The `TWEAK_DEFAULTS` block in `src/app/app-shell.tsx` is bounded by `/*EDITMODE-BEGIN*/.../*EDITMODE-END*/` sentinels that Claude Design mutates directly.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
