# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Buildera — IT Company Website**

Buildera is an IT services company website (buildera.co) targeting SMB decision-makers. The site markets 6 service lines (Website Dev, Salesforce Dev, DevOps Dev, AI Agent Dev, Software Dev, Hire a Developer), ~18 solutions, and industry-specific pages. Primary goal: convert visitors into booked discovery calls.

**Core Value:** A decision-maker lands on buildera.co — cold or warm — immediately understands what Buildera builds, finds their specific problem in the services/solutions, and books a discovery call.

### Constraints

- **Tech Stack**: Next.js 15 App Router + MySQL (direct via mysql2) — **no Laravel, no PHP, no Filament**
- **Admin Panel**: Built-in Next.js admin at `/admin` — JWT sessions, MySQL-direct CRUD, no separate backend
- **UI System**: shadcn/ui + Tailwind CSS 4 + Inter font + Blue/White brand palette
- **Hosting**: Hostinger (Node.js for Next.js, MySQL) — deploy once at project completion
- **Repository**: Single codebase `buildera-frontend`; `buildera-backend` directory is **unused/legacy** — ignore it
- **Booking**: Calendly embed (free tier)
- **Email**: Resend API via `resend` npm package (not Laravel)
- **Analytics**: GA4 + Clarity — injected via admin ScriptInjector (`admin_scripts` table), never hardcoded
- **No mid-project deploys** — full build first, deploy everything manually at the end
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

### Single Codebase (`buildera-frontend`)

Everything lives here — public website + admin panel + API routes + DB layer.

| Tech | Version | Notes |
|------|---------|-------|
| Next.js | 15.x | App Router only. `output: "standalone"` for Hostinger. |
| React | 19.x | Stable, bundled with Next.js 15 |
| TypeScript | 5.x | Strict throughout |
| Tailwind CSS | 4.x | No `tailwind.config.js` — all config in `globals.css` via `@theme` |
| shadcn/ui | latest | Components in `src/components/ui/`; CSS variables for theming |
| motion | 12.x | `import { motion } from 'motion/react'` — NOT `framer-motion` |
| Inter | next/font | Self-hosted, zero layout shift |
| @tabler/icons-react | latest | In `optimizePackageImports` in next.config.ts |
| mysql2 | latest | Direct MySQL connection via `src/db/pool.ts` |
| jose | latest | JWT sessions — `src/backend/auth/session.ts` |
| bcryptjs | latest | Password hashing — `src/backend/auth/hash.ts` |
| resend | latest | Transactional email — `src/backend/email/` |

**Rendering strategy:**
- Homepage, services, solutions, industries → Static (prerendered at build)
- Blog posts, case studies, guides → ISR via `revalidateTag`
- All static content pages → `generateStaticParams` for known slugs
- No Pages Router — App Router only

**Key rules:**
- `"use client"` ONLY on: forms, tab switcher, popups/widgets, analytics components
- Everything else must be Server Components
- All images: `next/image` with `sizes` prop; `priority` only on above-fold hero
- `output: "standalone"` + postbuild copy script + `ecosystem.config.js` for pm2

### Database (`src/db/`)

| Location | Purpose |
|----------|---------|
| `src/db/pool.ts` | MySQL connection pool — reads `DATABASE_URL` env var |
| `src/db/schema.sql` | Full schema — run via `node scripts/db-migrate.mjs` |
| `src/db/admin/*.ts` | DB helpers for admin panel (one file per domain) |
| `scripts/db-migrate.mjs` | Applies schema (CREATE TABLE IF NOT EXISTS — safe to re-run) |
| `scripts/create-admin.mjs` | Creates first SUPER_ADMIN user |

**IMPORTANT — existing MySQL schema note:**
The production MySQL database (207.180.252.239) was originally created by Laravel migrations and has
column names that differ from `schema.sql`. The `src/db/admin/*.ts` helpers use SELECT aliases
to bridge the gap. Key mappings already applied:
- `blog_posts`: `body`→content, `featured_image`→cover_image, `views`→view_count, `seo_title`→meta_title
- `case_studies`: `results`→outcome, `key_metrics`→result_stats, `is_published`→status, `service_tags`→service_category
- `testimonials`: `client_name`→person_name, `content`→quote, `client_photo`→logo_url, `is_published`→visible
- `redirects`: `source_path`→from_path, `destination_path`→to_path, `status_code`→redirect_type, `is_active`→active
- `leads`: `source_form`→source, `service_interest`→role, `ip_hash`→ip_address

### Admin Panel (`/admin`)

**Auth:** JWT cookie (`buildera_session`) via `jose` — `SESSION_SECRET` env var required.

**Sections:**
1. **Content** — Blog, Case Studies, Guides, Testimonials, Media Library, Client Logos, Authors, Categories
2. **Leads** — All Leads, Meetings, Newsletter Subscribers
3. **Marketing** — Popups, Announcement Bar, Nudge, Banners, Mini CTAs, Lead Forms
4. **SEO** — Meta, Robots.txt, Sitemap, Scripts, Redirects, 404 Log
5. **Settings** — General Settings, User Management

**Login credentials (dev):** `admin@buildera.co` / `admin123`

### Environment Variables

```
DATABASE_URL=mysql://buildera:<pass>@207.180.252.239:3306/buildera
SESSION_SECRET=<random-string>
NEXT_PUBLIC_API_URL=http://localhost:3001   # or production URL
NEXT_PUBLIC_API_KEY=<key>                  # for POST /api/leads
NEXTJS_REVALIDATE_SECRET=<secret>
```
<!-- GSD:stack-end -->

<!-- GSD:architecture-start source:research/ARCHITECTURE.md -->
## Architecture

### Data Flow

```
Next.js (buildera.co)
  └── Public pages → src/db/admin/*.ts → MySQL (direct, server-side)
  └── Admin panel → /api/admin/* → src/db/admin/*.ts → MySQL
  └── ISR content → revalidateTag on admin save
  └── Lead form → POST /api/leads → src/db/admin/leads.ts → MySQL
  └── Newsletter → POST /api/subscribers → src/db/admin/subscribers.ts → MySQL
  └── Redirects → src/app/api/redirects → src/db/admin/seo.ts → MySQL
```

**No separate backend.** Everything runs inside Next.js. The `buildera-backend/` directory is legacy (old Laravel code) — do not add or modify files there.

### Key Files

- **`src/db/pool.ts`** — MySQL connection pool singleton
- **`src/db/admin/*.ts`** — all DB query functions; always use these, never inline SQL in components
- **`src/backend/auth/session.ts`** — JWT session create/verify/destroy
- **`src/backend/auth/hash.ts`** — bcrypt password hash/verify
- **`src/lib/api.ts`** — typed fetch helpers for public API routes
- **`src/app/(admin)/`** — admin panel pages (protected by layout session check)
- **`src/app/api/admin/`** — admin API routes (all require session)

### Admin Panel Layout

- `src/app/(admin)/layout.tsx` — verifies session, renders sidebar + header + section tabs
- `src/components/admin/AdminSidebar.tsx` — collapsible sidebar with all nav groups
- `src/components/admin/AdminSectionTabs.tsx` — horizontal tab bar within each section
- `src/components/admin/AdminHeader.tsx` — top bar with user info + logout

### Design System

- Blue/White brand palette — CSS variables in `@theme` block in `globals.css`
- Glassmorphism: `backdrop-filter: blur` + subtle border on nav, stat cards, testimonial cards
- Gradients: primary blue → deeper indigo; used on CTAs, section backgrounds
- Animations: `motion` v12 scroll-triggered reveals on all sections; stagger on grids
- Hover: lift + border glow on all cards; 200ms transitions
- `"use client"` components: forms, tab switcher, analytics, popups/widgets ONLY
<!-- GSD:architecture-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

- All DB queries in `src/db/admin/*.ts` — never inline SQL in pages or API routes
- All public fetch functions in `src/lib/api.ts` — never inline fetch in components
- Server Components fetch at render time; no `useEffect` for data fetching
- All lead form submissions tagged with `source_form` field identifying origin
- Every content model has: `slug`, `is_published`, `published_at`, SEO fields
- Admin API routes (`/api/admin/*`) always call `verifySession()` first — return 401 if null
- Never hardcode analytics IDs — always read from `site_settings` table via `src/db/admin/settings.ts`
- `getAllSettings()` / `getSetting(key)` for all settings reads
<!-- GSD:conventions-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Use these entry points for all work:
- `/gsd-quick` — small fixes, doc updates, ad-hoc tasks
- `/gsd-debug` — investigation and bug fixing
- `/gsd-execute-phase` — planned phase work

Do not make direct repo edits outside a GSD workflow unless explicitly asked to bypass it.
<!-- GSD:workflow-end -->
