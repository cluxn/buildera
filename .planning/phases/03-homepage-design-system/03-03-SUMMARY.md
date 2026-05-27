---
phase: 03-homepage-design-system
plan: "03"
subsystem: frontend-footer
tags: [footer, server-component, api, social-icons, newsletter-stub, multi-column, layout]
dependency_graph:
  requires:
    - 03-01 (globals.css brand tokens, fetchFooterLinks, fetchSettings, FooterLink + Settings interfaces, Separator component)
    - 03-02 (layout.tsx with skip-to-content + SiteNav already wired)
  provides:
    - SiteFooter server component (exports SiteFooter)
    - Multi-column footer with parallel API data fetch
    - Social icons conditional on settings URLs
    - Newsletter strip visual stub (action="#" — POST /api/subscribers deferred to Phase 5 plan 05-04)
    - layout.tsx updated — footer visible on all pages
  affects:
    - All Phase 3-10 pages inherit SiteFooter via layout.tsx
    - Phase 5 plan 05-04 will wire newsletter form to POST /api/subscribers
    - Phase 8 delivers Filament FooterLink admin resource (NAV-06 partial)
tech_stack:
  added: []
  patterns:
    - Async Server Component with Promise.all parallel fetch (fetchFooterLinks + fetchSettings)
    - Hardcoded column fallback links — used when API returns empty (same pattern as SiteNav Work/Resources panels)
    - Conditional social icon rendering — only renders icon anchor when settings URL is non-empty
    - Newsletter form action="#" intentional stub — Phase 3 visual only, not wired to API
key_files:
  created:
    - buildera-frontend/src/components/layout/SiteFooter.tsx
  modified:
    - buildera-frontend/src/app/layout.tsx
decisions:
  - "SiteFooter uses Promise.all to fetch footerLinks and settings in parallel — avoids waterfall, both have .catch() fallbacks built into helpers"
  - "Social icons section wrapped in conditional — renders only when at least one settings URL is non-empty string"
  - "Newsletter form uses action='#' per plan spec — intentional Phase 3 stub; POST /api/subscribers wired in Phase 5 plan 05-04"
  - "Hardcoded fallback links used when API footerLinks array is empty — prevents empty footer columns at build time when backend is not yet running"
metrics:
  duration_minutes: 12
  completed_date: "2026-05-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 1
---

# Phase 3 Plan 3: SiteFooter Component Summary

**One-liner:** Async Server Component footer with Promise.all parallel fetch of footer links and settings, 5-column grid layout, conditional social icons from settings API, newsletter opt-in strip (action="#" Phase 3 stub), hardcoded column fallbacks, attribution line with rel="nofollow", wired into layout.tsx for site-wide visibility.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create SiteFooter component with all sections | 67a2215 | SiteFooter.tsx |
| 2 | Wire SiteFooter into layout.tsx | 8069f0b | layout.tsx |

## What Was Built

### Task 1: SiteFooter Component

**SiteFooter.tsx (async Server Component — no "use client"):**

- Calls `Promise.all([fetchFooterLinks(), fetchSettings()])` — parallel fetches, both fail-safe via `.catch()` fallbacks in the helpers
- Defines `HARDCODED_FOOTER_LINKS` const covering all 4 columns with correct slugs:
  - Services: 6 service pages
  - Solutions: 6 solutions + "View All Solutions" link
  - Company: About, How We Work, Case Studies, Testimonials, FAQ
  - Resources: Blog, Guides, Contact Us, Book a Call, Privacy Policy, Terms
- When API returns footerLinks, groups them by `column` field and sorts by `display_order`; otherwise uses hardcoded fallback
- **Layout structure (bg-slate-900 text-slate-300):**
  1. Top section (py-16): `grid-cols-1 lg:grid-cols-5` — brand info col + 4 link columns
     - Col 1: Buildera text logo (font-bold text-xl text-white), footer_tagline from settings, phone/email/address contact links
     - Cols 2-5: Services, Solutions, Company, Resources with `uppercase tracking-wider text-white` headings and `text-slate-400 hover:text-white` link items
  2. Social icons row (conditional): renders LinkedIn/Twitter/Instagram only when `settings.linkedin_url`/`twitter_url`/`instagram_url` is truthy. Each opens in new tab with `noopener noreferrer`. Icon size: size-5. Min touch target: `min-h-[48px]`.
  3. Separator (`bg-slate-700`)
  4. Newsletter strip: responsive flex, left heading+description, right email input + Get Updates button. Input: `bg-slate-800 border-slate-700` with focus ring. Button: `bg-[var(--brand-primary)]`. Both `min-h-[48px]`.
  5. Separator (`bg-slate-700`)
  6. Bottom bar: copyright (dynamic year via `new Date().getFullYear()`) + company_name from settings; legal links (Privacy Policy, Terms) separated by middot
  7. Attribution: `text-xs text-slate-500 text-center pb-4` with `<a href="https://buildera.co" rel="nofollow">Buildera Technologies LLP</a>`

**Tabler icons used:** `IconBrandLinkedin`, `IconBrandTwitter`, `IconBrandInstagram` — no lucide-react imports.

### Task 2: layout.tsx Integration

- Added `import { SiteFooter } from "@/components/layout/SiteFooter"` to layout.tsx
- Rendered `<SiteFooter />` after `<main id="main-content">{children}</main>`, before closing `</body>` tag
- Final body order: skip-to-content link → SiteNav → main#main-content → SiteFooter
- `npm run build` exits 0, 6 static pages generated

## Verification

- `npx tsc --noEmit`: passed (0 errors)
- `npm run build`: exit 0, 6 static pages generated, no warnings

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

| Stub | File | Line | Reason |
|------|------|------|--------|
| Newsletter form `action="#"` (no submit handler) | SiteFooter.tsx | ~139 | Intentional Phase 3 visual stub per plan spec — POST /api/subscribers wiring deferred to Phase 5 plan 05-04 |

The newsletter form renders correctly as a UI element. It does not submit data. This is explicitly documented in the plan's `must_haves.truths` and does not prevent the plan's goal from being achieved (footer renders with all required sections).

## Threat Flags

None. FooterLink.url values rendered via next/link Link component (handles routing internally, not raw href injection). Settings social URLs rendered as plain href values on anchor elements — admin-controlled content. Newsletter form does not submit to any endpoint in Phase 3. Attribution link is hardcoded, not user-modifiable. No new network endpoints or auth paths introduced.

## Self-Check: PASSED

Files verified:
- FOUND: buildera-frontend/src/components/layout/SiteFooter.tsx
- FOUND: buildera-frontend/src/app/layout.tsx

Commits verified:
- FOUND: 67a2215 (Task 1)
- FOUND: 8069f0b (Task 2)
