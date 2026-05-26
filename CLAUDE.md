# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**Buildera — IT Company Website**

Buildera is an IT services company website (buildera.co) targeting SMB decision-makers. The site markets 6 service lines (Website Dev, Salesforce Dev, DevOps Dev, AI Agent Dev, Software Dev, Hire a Developer), ~18 solutions, and industry-specific pages. Primary goal: convert visitors into booked discovery calls.

**Core Value:** A decision-maker lands on buildera.co — cold or warm — immediately understands what Buildera builds, finds their specific problem in the services/solutions, and books a discovery call.

### Constraints

- **Tech Stack**: Next.js 15 App Router (frontend) + Laravel 13 + Filament PHP 5 (backend) + MySQL — do not change
- **UI System**: shadcn/ui + Tailwind CSS 4 + Inter font + Blue/White brand palette
- **Hosting**: Hostinger (Node.js for Next.js, PHP for Laravel, MySQL) — deploy once at project completion
- **Repositories**: Two local codebases — `buildera-frontend` and `buildera-backend`; **no GitHub**; built locally, handed to client as deploy-ready code; client uploads to Hostinger after handoff
- **Booking**: Calendly embed (free tier)
- **Email**: Resend API via `resend/resend-laravel`
- **Analytics**: GA4 + Clarity — injected via admin ScriptInjector, never hardcoded
- **No mid-project deploys** — full build first, deploy everything manually at the end
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

### Frontend (`buildera-frontend`)

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

### Backend (`buildera-backend`)

| Tech | Version | Notes |
|------|---------|-------|
| Laravel | 13.x | PHP 8.3+ required |
| Filament PHP | 5.x | v5.6+ for Laravel 13 compat. Use `Schema::make()` NOT `Form::make()` |
| spatie/laravel-medialibrary | 11.x | Image uploads with alt text; local disk (S3 migration is v2) |
| spatie/laravel-sluggable | 4.x | Auto-slugs on content models |
| spatie/laravel-sitemap | 7.x | XML sitemap generation |
| resend/resend-laravel | 1.x | Transactional email |
| bezhansalleh/filament-shield | 4.x | RBAC: Owner / Editor / Viewer roles |

**Filament v5 API rules (critical — v3 docs will break things):**
- Forms: `Schema::make()` not `Form::make()`
- Tables: `Table::make()`
- Do NOT install `awcodes/filament-tiptap-editor` — use native `RichEditor::make()`
- Navigation groups: Leads & CRM / Content / Website / SEO & Analytics / Settings

**API design:**
- All public GET endpoints: no auth, consumed by Next.js at build time + ISR
- `POST /api/leads`: X-API-Key header + throttle 5/hr + honeypot
- `POST /api/subscribers`: rate limit 3/hr
- `POST /api/revalidate`: HMAC secret header → triggers `revalidateTag` in Next.js
- Queue all side effects (email, revalidation, sitemap) — database queue driver

**`is_published` enforcement:**
Every content API endpoint filters `WHERE is_published = true AND (published_at IS NULL OR published_at <= NOW())`. Unpublished items never reach the frontend or sitemap.
<!-- GSD:stack-end -->

<!-- GSD:architecture-start source:research/ARCHITECTURE.md -->
## Architecture

### Data Flow

```
Next.js (buildera.co)
  └── fetchSettings() → GET /api/settings [build time, cached]
  └── generateStaticParams → GET /api/services, /api/solutions, /api/industries [build]
  └── ISR pages → GET /api/blog-posts/{slug} [revalidateTag on admin save]
  └── Lead form → POST /api/leads [runtime, X-API-Key]
  └── Revalidation → POST /api/revalidate [from Laravel Observer]

Laravel (api.buildera.co or /api proxy)
  └── Model Observer fires on content save
  └── → Dispatches RevalidationJob (queued)
  └── → RevalidationJob POSTs to Next.js /api/revalidate
  └── → Next.js purges cache tag, fresh page served on next request
```

### Key Integration Points

- **`src/lib/api.ts`** — all typed fetch helpers; never throws; returns typed fallbacks
- **`NEXT_PUBLIC_API_URL`** — backend base URL; required in all fetch calls
- **`NEXT_PUBLIC_API_KEY`** — used only for `POST /api/leads` X-API-Key header
- **`NEXTJS_REVALIDATE_SECRET`** — HMAC secret for ISR revalidation endpoint
- **`APP_API_KEY`** — Laravel validates this on lead submissions
- **`NEXTJS_REVALIDATE_URL`** — Laravel sends revalidation POSTs here

### Admin Panel Groups (Filament)

1. **Leads & CRM** — Unified Lead Inbox, Newsletter Subscribers
2. **Content** — Blog Posts, Case Studies, Guides, Testimonials, Authors, Categories/Tags
3. **Website** — Page Content, Nav Items, Footer Links, Popup Manager, Partner Badges, Technologies
4. **SEO & Analytics** — SEO Metadata, Analytics Scripts, Sitemap, Redirects
5. **Settings** — General Settings (company/social/WhatsApp/Calendly), User Management, Audit Log

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

- All fetch functions in `src/lib/api.ts` — never inline fetch in components
- Server Components fetch at render time; no `useEffect` for data fetching
- All lead form submissions tagged with `source_form` field identifying origin
- Filament resources: always add `is_published` toggle + `published_at` date picker
- Queue jobs for: email notifications, ISR revalidation, sitemap regeneration
- Never hardcode analytics IDs — always read from Settings API
- `Setting::get('key', $default)` for all settings reads in Laravel (1hr cache built-in)
- Every content model has: `slug` (auto via sluggable), `is_published`, `published_at`, `seo_*` fields
<!-- GSD:conventions-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Use these entry points for all work:
- `/gsd-quick` — small fixes, doc updates, ad-hoc tasks
- `/gsd-debug` — investigation and bug fixing
- `/gsd-execute-phase` — planned phase work

Do not make direct repo edits outside a GSD workflow unless explicitly asked to bypass it.
<!-- GSD:workflow-end -->
