# Research Summary — Buildera IT Agency Website

## Stack

**Frontend:** Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + shadcn/ui + Inter font
**Backend:** Laravel 13 + Filament PHP 5 + MySQL 8
**Email:** Resend API via resend/resend-laravel
**Media:** spatie/laravel-medialibrary (WebP conversion)
**Deployment:** Hostinger Business Plan (Node.js + PHP + MySQL, single platform)

## Table Stakes (v1 must-haves)

- Sticky nav + mobile menu + footer
- Tab-based services section with ~24 sub-service detail pages
- Solutions grid with ~18 detail pages
- Industry landing pages (estimated 8-12)
- Lead capture form (contact + honeypot + email notification)
- Discovery call booking via Calendly embed
- Blog, Case Studies, Guides (ISR — admin published)
- Testimonials page
- Per-page SEO meta (generateMetadata + Laravel SEO API)
- GA4 + Clarity analytics (admin-configurable, consent-gated)
- Sitemap.xml + robots.txt (dynamic)
- Admin panel: leads, content CRUD, SEO, settings, analytics tags, nudge/popup/banner

## Architecture Summary

Two-repo setup: `buildera-frontend` (Next.js) and `buildera-backend` (Laravel).

Next.js fetches from Laravel API at build time for static/ISR pages. Lead form POSTs to Laravel with X-API-Key. Admin publishes content → Model Observer fires → RevalidationService calls Next.js `/api/revalidate` → fresh page on next request.

All pages start hardcoded (code-defined), admin control added progressively.

## Watch Out For

1. **Filament v5 API** — Use `Schema::make()` not `Form::make()`. Do NOT install awcodes/tiptap.
2. **Tailwind 4 config** — No `tailwind.config.js`. Everything in `globals.css` via `@theme`.
3. **ISR wiring** — Build Model Observer + RevalidationService in same phase as first content resource.
4. **Content volume** — 54+ static pages. Phase them by type, not all at once.
5. **"use client" budget** — Only forms, tabs, widgets, analytics. Everything else = Server Component.
6. **Hostinger deploy** — `output: "standalone"` + custom server.js + pm2 + postbuild copy script required.
7. **Deployment is end-of-project** — No mid-build deploys. Full build first, deploy once at completion.

## Phase Sequence Recommendation

| Phase | Focus |
|-------|-------|
| 1 | Project setup — repos, env, Next.js + Laravel scaffold, CI skeleton |
| 2 | Backend core — migrations, models, Filament install, API scaffold, lead capture |
| 3 | Frontend core — layout (nav, footer), homepage, shadcn/ui setup |
| 4 | Services & Solutions pages — all hardcoded, tab component, service detail template |
| 5 | Industries + Contact + Booking — industry pages, contact form wired to API, Calendly |
| 6 | Blog, Case Studies, Guides — Filament CRUD + ISR frontend |
| 7 | SEO & Analytics — generateMetadata, structured data, sitemap, admin analytics config |
| 8 | Admin completeness — nudge/popup/banner, newsletter, social/WhatsApp, user management |
| 9 | Performance & Polish — PageSpeed audit, WCAG fixes, cross-browser QA |
| 10 | Deploy prep — Hostinger config, pm2 setup, DNS, final smoke test |
