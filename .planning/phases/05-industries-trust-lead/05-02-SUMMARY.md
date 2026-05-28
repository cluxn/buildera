---
plan: "05-02"
phase: 5
subsystem: frontend
tags: [trust-pages, about, faq, privacy, terms, animated-timeline, json-ld]
dependency_graph:
  requires: []
  provides:
    - "About Us page at /about"
    - "How We Work page at /how-we-work with AnimatedTimeline"
    - "FAQ page at /faq with JSON-LD schema"
    - "Privacy Policy at /privacy"
    - "Terms of Service at /terms"
  affects:
    - "buildera-frontend/src/app"
    - "buildera-frontend/src/components/sections/trust"
    - "buildera-frontend/src/components/ui/AnimatedTimeline.tsx"
tech_stack:
  added: []
  patterns:
    - "AnimatedTimeline: useInView + motion/react stagger (use client leaf pattern)"
    - "FAQPage JSON-LD: dangerouslySetInnerHTML with JSON.stringify (all hardcoded — XSS-safe)"
    - "2-column accordion FAQ layout via base-ui Accordion (SSR-compatible, no use client)"
    - "Gradient CTA reused from IndustryCta pattern"
key_files:
  created:
    - buildera-frontend/src/app/about/page.tsx
    - buildera-frontend/src/app/how-we-work/page.tsx
    - buildera-frontend/src/app/faq/page.tsx
    - buildera-frontend/src/app/privacy/page.tsx
    - buildera-frontend/src/app/terms/page.tsx
    - buildera-frontend/src/components/sections/trust/AboutHero.tsx
    - buildera-frontend/src/components/sections/trust/ValuesSection.tsx
    - buildera-frontend/src/components/sections/trust/TeamSection.tsx
    - buildera-frontend/src/components/sections/trust/AboutCta.tsx
    - buildera-frontend/src/components/sections/trust/ProcessTimeline.tsx
    - buildera-frontend/src/components/sections/trust/ProcessCta.tsx
    - buildera-frontend/src/components/sections/trust/FaqAccordion.tsx
    - buildera-frontend/src/components/ui/AnimatedTimeline.tsx
  modified: []
decisions:
  - "Used @base-ui/react Accordion (already installed) instead of shadcn Accordion — plan said shadcn but codebase uses base-ui; API incompatible with type='single' collapsible props"
  - "2-column FAQ implemented as two separate Accordion roots (6 items each) rather than a single accordion with CSS columns — base-ui accordion uses value arrays, CSS column splitting would break accordion logic"
  - "JSON-LD schema placed inline in page body (not Next.js Script) — dangerouslySetInnerHTML with JSON.stringify is XSS-safe since all content is hardcoded, and avoids client-side Script overhead"
metrics:
  duration: "~18 minutes"
  completed_date: "2026-05-28"
  tasks_completed: 4
  files_created: 13
  files_modified: 0
---

# Phase 5 Plan 02: Trust Pages Summary

**One-liner:** 5 trust/credibility pages (About, How We Work, FAQ, Privacy, Terms) with animated process timeline, 2-column accordion FAQ, FAQPage JSON-LD, and gradient CTAs throughout.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 05-02-01 | About Us page — hero, values, team, CTA | a0156ca | AboutHero, ValuesSection, TeamSection, AboutCta, about/page.tsx |
| 05-02-02 | How We Work page — animated 6-step timeline | 006d100 | AnimatedTimeline, ProcessTimeline, ProcessCta, how-we-work/page.tsx |
| 05-02-03 | FAQ page with accordion + JSON-LD schema | d9b6a69 | FaqAccordion, faq/page.tsx |
| 05-02-04 | Privacy Policy + Terms of Service pages | 1a30e07 | privacy/page.tsx, terms/page.tsx |

## Implementation Notes

### About Us (/about)
- Copy-only hero with `hero-orb-1 / hero-orb-2` classes for visual consistency with homepage
- Trust badge strip: 150+ Projects | 50+ Active Clients | 6 Service Lines
- 4-value grid (Client First, No Bullshit Timelines, Built to Last, You Own Everything)
- 3 team cards with `IconUser` placeholder avatars — awaiting real photos from client
- Gradient CTA with Clutch trust signal (4.9/5 rating, 150+ projects, 98% retention)

### How We Work (/how-we-work)
- `AnimatedTimeline.tsx` is the only `"use client"` component in this plan
- `ProcessTimeline.tsx` is a pure Server Component shell — imports AnimatedTimeline as a client leaf
- All 6 steps have phase label, duration badge, and deliverable chips
- `useReducedMotion()` guard prevents animation for accessibility

### FAQ (/faq)
- 12 FAQ items split into two separate Accordion roots (6 left, 6 right) in `lg:grid-cols-2`
- `FAQ_ITEMS` exported from `FaqAccordion.tsx` for schema reuse in `faq/page.tsx`
- `FAQPage` JSON-LD injected via `<script dangerouslySetInnerHTML>` — XSS-safe (hardcoded data only)
- Page reuses `AboutCta` gradient CTA component

### Privacy / Terms
- Both are plain Server Components with no client code
- Prose styled with inline Tailwind classes (no typography plugin required)
- `text-muted-foreground` for body, `text-xl font-semibold` for h2 headings

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Accordion API mismatch — shadcn vs base-ui**
- **Found during:** Task 05-02-03
- **Issue:** Plan specified `shadcn Accordion type="single" collapsible` but the codebase uses `@base-ui/react/accordion` (not shadcn). The base-ui API uses `value` arrays and does not accept `type` or `collapsible` props.
- **Fix:** Used the existing `@base-ui/react` Accordion API (same pattern as ServiceFaq.tsx) without `type`/`collapsible` props. Two separate Accordion roots (one per column) preserve independent open/close behavior.
- **Files modified:** `FaqAccordion.tsx`
- **Commit:** d9b6a69

## Known Stubs

| Stub | File | Reason |
|------|------|--------|
| Team member names/bios are placeholders | `TeamSection.tsx` | Client has not provided real team bios — placeholder cards ready for content swap |
| Team avatar images | `TeamSection.tsx` | `IconUser` placeholder used — awaiting real photos from client |

## Threat Surface Scan

All threat model items addressed:
- **T-05-02-01 (XSS — FAQ JSON-LD):** Mitigated. `JSON.stringify` encodes output; all FAQ content is hardcoded strings with no user input.
- **T-05-02-02 (PII — Team section):** Accepted. Only placeholder team bios — no real employee PII included.

No new threat surface introduced beyond the plan's threat model.

## Verification

- `npx tsc --noEmit` passes with zero errors
- All 5 pages created at correct routes: /about, /how-we-work, /faq, /privacy, /terms
- Only `AnimatedTimeline.tsx` has `"use client"` — all page shells and section components are Server Components
- `AnimatedTimeline.tsx` imports from `"motion/react"` (not `"framer-motion"`)
- `FAQ_ITEMS` exported from `FaqAccordion.tsx` for JSON-LD reuse
- Every page ends with a path to `/book-a-call`

## Self-Check: PASSED

- [x] a0156ca exists: About Us page commit
- [x] 006d100 exists: How We Work page commit
- [x] d9b6a69 exists: FAQ page commit
- [x] 1a30e07 exists: Privacy/Terms commit
- [x] All 13 files created
- [x] TypeScript: no errors
