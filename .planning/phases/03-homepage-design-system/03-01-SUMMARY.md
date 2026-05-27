---
phase: 03-homepage-design-system
plan: "01"
subsystem: frontend-design-system
tags: [design-system, css, tokens, typography, glassmorphism, animations, api, accessibility]
dependency_graph:
  requires: []
  provides:
    - globals.css brand tokens (--brand-primary, --brand-gradient-*, --brand-surface, --brand-glass)
    - glassmorphism utilities (glass-card, glass-nav)
    - full Inter typography scale (@layer base h1-h4 + utility classes)
    - CSS keyframe animations (orb-float, svg-pulse, marquee, gradient-pulse, cta-button-shimmer)
    - shadcn Badge, Card, Tabs, Separator components
    - fetchNavItems, fetchFooterLinks, fetchSettings typed API helpers
    - skip-to-content accessibility link
    - NavItem, FooterLink, Settings interfaces + SETTINGS_FALLBACK
  affects:
    - All Phase 3 plans (03-02 through 03-06) inherit these tokens and utilities
    - All Phase 4-10 plans inherit the design system foundation
tech_stack:
  added: []
  patterns:
    - Tailwind 4 @utility directive for glassmorphism utilities
    - @layer base for typography scale (avoids Tailwind specificity conflicts)
    - fetchFromApi<T> + .catch() fallback pattern for all API helpers
    - ISR cache tagging with next: { tags: [...] }
    - sr-only + focus:not-sr-only skip-to-content accessibility pattern
key_files:
  created:
    - buildera-frontend/src/components/ui/badge.tsx
    - buildera-frontend/src/components/ui/card.tsx
    - buildera-frontend/src/components/ui/tabs.tsx
    - buildera-frontend/src/components/ui/separator.tsx
  modified:
    - buildera-frontend/src/app/globals.css
    - buildera-frontend/src/app/layout.tsx
    - buildera-frontend/src/lib/api.ts
    - buildera-frontend/src/app/not-found.tsx
    - buildera-frontend/src/app/error.tsx
decisions:
  - "Brand tokens placed in :root (not @theme) — consumed via var() arbitrary value syntax in Tailwind classes"
  - "Typography scale added to @layer base to avoid Tailwind specificity conflicts with utility classes"
  - "SETTINGS_FALLBACK exported (not const-only) for use in downstream Server Components without API calls"
  - "fetchFromApi options typed as RequestInit with 'as RequestInit' cast — Next.js extends RequestInit with next.tags at runtime"
  - "SiteNav and SiteFooter NOT imported in layout.tsx yet — those components don't exist until 03-02/03-03"
metrics:
  duration_minutes: 25
  completed_date: "2026-05-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 5
---

# Phase 3 Plan 1: Design System Foundation Summary

**One-liner:** Inter font wired via --font-inter, 7 brand tokens + dark mode overrides, glassmorphism utilities, 8-role typography scale, 4 keyframe animation systems, 4 shadcn components, and 3 typed API fetch helpers with ISR cache tagging.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Install shadcn components + fix globals.css with complete design system + typography scale | 119adfe | globals.css, badge.tsx, card.tsx, tabs.tsx, separator.tsx |
| 2 | Add API helpers to api.ts + update layout.tsx + update error pages | c2b21f2 | api.ts, layout.tsx, not-found.tsx, error.tsx |

## What Was Built

### Task 1: Design System Foundation in globals.css

**Font fix (D-11):** Changed `--font-sans: var(--font-sans)` (circular self-reference bug on line 10) to `--font-sans: var(--font-inter)`. Inter now renders as the global typeface instead of falling back to system sans-serif.

**Brand tokens (D-08):** Added 7 tokens to `:root`:
- `--brand-primary: hsl(217 91% 60%)` — the core brand blue
- `--brand-primary-dark`, `--brand-primary-light` — shade variants
- `--brand-gradient-from`, `--brand-gradient-to` — CTA gradient endpoints
- `--brand-surface: hsl(217 60% 97%)` — very light blue section backgrounds
- `--brand-glass: hsl(217 91% 60% / 8%)` — glassmorphism fill

**Dark mode tokens (D-09):** Added matching overrides to `.dark` block with lightened values for legibility in dark mode.

**Typography scale (D-27):** Full 8-role Inter hierarchy added to `@layer base`:
- Display: 3.75rem / 700 / lh 1.1
- h1/.text-h1: 3rem / 700 / lh 1.1
- h2/.text-h2: 2.25rem / 700 / lh 1.2
- h3/.text-h3: 1.5rem / 600 / lh 1.3
- h4/.text-h4: 1.25rem / 600 / lh 1.4
- .text-body-lg: 1.125rem / 400 / lh 1.6
- body/.text-body: 1rem / 400 / lh 1.6
- .text-label: 0.875rem / 500 / lh 1.4
- .text-caption: 0.75rem / 400 / lh 1.4

**Glassmorphism utilities (D-10):** Two `@utility` classes:
- `glass-card`: brand glass background + blur(12px) + 1px blue border
- `glass-nav`: white/80% background + blur(12px) + brand glass border-bottom

**Animations:** Four keyframe systems:
- `orb-float` + `.hero-orb-1/.hero-orb-2` — floating gradient blobs (8-10s alternate)
- `svg-pulse` + `.hero-illustration` — SVG float animation (6s)
- `marquee` + `.marquee-track/.logo-item` — infinite client logo scroll (30s)
- `gradient-pulse` — opacity pulse for CTA section background
- `.cta-button-shimmer::after` — shimmer effect on CTA button hover

**shadcn components installed (style: base-nova, using @base-ui/react primitives):**
- badge.tsx — Badge with cva variants
- card.tsx — Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter
- tabs.tsx — Tabs, TabsList, TabsTrigger, TabsContent
- separator.tsx — Separator

None of the 4 installed components had lucide-react imports (all use @base-ui/react).

### Task 2: API Helpers, Layout Updates, Error Pages

**api.ts extensions:** Added 3 interfaces (NavItem, FooterLink, Settings) and SETTINGS_FALLBACK constant with Buildera contact details from CLIENT-CONTEXT.md. Added 3 typed fetch helpers:
- `fetchNavItems()` — GET /api/nav-items, tags: ['nav-items'], fallback: []
- `fetchFooterLinks()` — GET /api/footer-links, tags: ['footer-links'], fallback: []
- `fetchSettings()` — GET /api/settings, tags: ['settings'], fallback: SETTINGS_FALLBACK

**layout.tsx:** Added skip-to-content accessibility link (sr-only, visible on Tab focus, brand-primary background). Wrapped children in `<main id="main-content">` landmark element.

**not-found.tsx:** Updated with brand design system styling — eyebrow "404" label, h1 "Page not found", links to /, /services, /contact.

**error.tsx:** Updated with brand design system styling — h1 "Something went wrong", Button component for reset(), links to / and /services.

## Verification

- `npx tsc --noEmit`: passed (0 errors)
- `npm run build`: passed (exit 0, 6 static pages generated)
- No lucide-react imports in any of the 4 shadcn components

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — this plan is a design system foundation (CSS, types, utilities). No data rendering that could produce empty UI.

## Threat Flags

None. All changes are static build artifacts (CSS, TypeScript interfaces, fallback constants with public contact info). No new network endpoints or auth paths introduced.

## Self-Check: PASSED

All files found:
- FOUND: buildera-frontend/src/app/globals.css
- FOUND: buildera-frontend/src/app/layout.tsx
- FOUND: buildera-frontend/src/lib/api.ts
- FOUND: buildera-frontend/src/app/not-found.tsx
- FOUND: buildera-frontend/src/app/error.tsx
- FOUND: buildera-frontend/src/components/ui/badge.tsx
- FOUND: buildera-frontend/src/components/ui/card.tsx
- FOUND: buildera-frontend/src/components/ui/tabs.tsx
- FOUND: buildera-frontend/src/components/ui/separator.tsx

Commits verified:
- FOUND: 119adfe (Task 1)
- FOUND: c2b21f2 (Task 2)
