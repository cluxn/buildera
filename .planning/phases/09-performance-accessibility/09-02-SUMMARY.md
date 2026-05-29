---
phase: 9
plan: "09-02"
subsystem: frontend
tags: [performance, bundle-audit, use-client, suspense, isr, next-15]
dependency_graph:
  requires: []
  provides: [suspense-isr-pages, use-client-audit]
  affects: [buildera-frontend/src/app/blog, buildera-frontend/src/app/case-studies, buildera-frontend/src/app/guides]
tech_stack:
  added: []
  patterns: [react-suspense-streaming, isr-suspense-boundary, use-client-classification]
key_files:
  created: []
  modified:
    - buildera-frontend/src/app/blog/[slug]/page.tsx
    - buildera-frontend/src/app/case-studies/[slug]/page.tsx
    - buildera-frontend/src/app/guides/[slug]/page.tsx
decisions:
  - "All 37 'use client' files are justified — zero conversions to Server Components needed"
  - "Suspense boundaries wrap below-fold content only; LCP hero sections excluded"
  - "separator.tsx and tabs.tsx (@base-ui/react wrappers) confirmed justified — interactive primitives need client boundary"
metrics:
  duration: "~25 minutes"
  completed: "2026-05-29"
  tasks_completed: 3
  files_modified: 3
---

# Phase 9 Plan 02: Bundle analysis + use client audit + Suspense — Summary

**One-liner:** Classified all 37 "use client" components (zero conversions needed — all justified), added Suspense streaming boundaries to three ISR detail pages, captured next build baseline.

---

## Tasks Completed

| Task | Name | Files Modified | Outcome |
|------|------|---------------|---------|
| T1 | Classify all "use client" components | None (audit only) | 37/37 justified — zero conversions |
| T2 | Add Suspense to ISR detail pages | 3 ISR page files | Suspense added to blog, case-studies, guides |
| T3 | Capture bundle baseline | None (measurement) | Build passes; baseline recorded below |

---

## T1: "use client" Classification Table

All 37 files returned by `grep -rln '"use client"' src --include="*.tsx"`:

| File | Category | Classification | Reason | Action |
|------|----------|---------------|--------|--------|
| `src/app/error.tsx` | Next.js error boundary | JUSTIFIED | Required by Next.js — error.tsx MUST be client | KEEP |
| `src/components/layout/MegaDropdown.tsx` | Nav interactivity | JUSTIFIED | Nav dropdown — interactive state + hover handlers | KEEP |
| `src/components/layout/MobileNavDrawer.tsx` | Nav interactivity | JUSTIFIED | Mobile drawer open/close state, event handlers | KEEP |
| `src/components/layout/SiteNavClient.tsx` | Nav interactivity | JUSTIFIED | Scroll-aware nav, mobile toggle state | KEEP |
| `src/components/sections/CaseStudiesPreview.tsx` | Motion — section | JUSTIFIED | Uses `motion.div` with `whileInView` + stagger transitions | KEEP |
| `src/components/sections/contact/CalendlyEmbed.tsx` | Widget/embed | JUSTIFIED | Calendly widget — runtime script injection | KEEP |
| `src/components/sections/contact/ContactForm.tsx` | Form | JUSTIFIED | Form state (useState), onSubmit handler, fetch | KEEP |
| `src/components/sections/ContactFormSection.tsx` | Form + motion | JUSTIFIED | Form state (useState) + motion.div `whileInView` animations | KEEP |
| `src/components/sections/CTASection.tsx` | Motion — section | JUSTIFIED | Uses `motion.section`, `motion.p`, `motion.h2`, `motion.div` with `whileInView` | KEEP |
| `src/components/sections/HeroHeadline.tsx` | Motion | JUSTIFIED | Uses `motion.span` with `animate` for word-by-word reveal | KEEP |
| `src/components/sections/HeroSection.tsx` | Motion — section | JUSTIFIED | Uses `motion.p`, `motion.div` with `animate` + staggered delays | KEEP |
| `src/components/sections/NewsletterForm.tsx` | Form | JUSTIFIED | Form state (useState), onSubmit handler | KEEP |
| `src/components/sections/ServicesTabSection.tsx` | Tab switcher + motion | JUSTIFIED | `useState` tab switcher + `AnimatePresence` + `motion.div` | KEEP |
| `src/components/sections/SolutionsGridSection.tsx` | Motion — section | JUSTIFIED | Uses `motion.div` with `whileInView` per grid tile | KEEP |
| `src/components/sections/StatsBarSection.tsx` | Motion + AnimatedCounter | JUSTIFIED | Uses `motion.section` `whileInView` + renders `<AnimatedCounter>` (client) | KEEP |
| `src/components/sections/TechStackSection.tsx` | Tab/filter switcher | JUSTIFIED — ALLOWED | `useState` for service/subcategory filter (no motion.X) | KEEP |
| `src/components/sections/TestimonialsSection.tsx` | Motion + Image | JUSTIFIED | Uses `motion.div`, `motion.p`, `motion.h2` with `whileInView` | KEEP |
| `src/components/sections/WhyBuilderaSection.tsx` | Motion — section | JUSTIFIED | Uses `motion.div` with `whileInView` + renders `<AnimatedRingStat>` | KEEP |
| `src/components/ui/AnimatedBarChart.tsx` | Motion — UI primitive | JUSTIFIED | Motion animation component | KEEP |
| `src/components/ui/AnimatedCounter.tsx` | Motion — UI primitive | JUSTIFIED | Motion animation + useInView for count-up | KEEP |
| `src/components/ui/AnimatedRingStat.tsx` | Motion — UI primitive | JUSTIFIED | SVG ring animation with motion hooks | KEEP |
| `src/components/ui/AnimatedTimeline.tsx` | Motion — UI primitive | JUSTIFIED | Motion animation + useInView | KEEP |
| `src/components/ui/CaseStudyPreviewCard.tsx` | Motion — UI primitive | JUSTIFIED | motion.div with whileHover | KEEP |
| `src/components/ui/ExitIntentPopup.tsx` | Popup/widget | JUSTIFIED | mouseout event listener, useState, portal | KEEP |
| `src/components/ui/FeatureCheckList.tsx` | Motion — UI primitive | JUSTIFIED | motion.li with staggered whileInView animations | KEEP |
| `src/components/ui/FloatingCTA.tsx` | Widget | JUSTIFIED | scroll event listener, useState for visibility | KEEP |
| `src/components/ui/IdlePopup.tsx` | Popup/widget | JUSTIFIED | setTimeout idle detection, useState | KEEP |
| `src/components/ui/MiniLeadForm.tsx` | Form | JUSTIFIED | Form state, onSubmit handler, fetch | KEEP |
| `src/components/ui/MiniMetricsCard.tsx` | Motion — UI primitive | JUSTIFIED | motion.div with whileInView | KEEP |
| `src/components/ui/NudgeBanner.tsx` | Widget | JUSTIFIED | useState show/hide, localStorage | KEEP |
| `src/components/ui/PopupManager.tsx` | Popup/widget | JUSTIFIED | Orchestrates ExitIntentPopup + IdlePopup with useState | KEEP |
| `src/components/ui/separator.tsx` | shadcn/UI primitive | JUSTIFIED | Wraps `@base-ui/react/separator` — interactive primitive requires client | KEEP |
| `src/components/ui/SequentialSteps.tsx` | Motion — UI primitive | JUSTIFIED | motion.li with staggered animations | KEEP |
| `src/components/ui/StaggeredRevealGrid.tsx` | Motion — UI primitive | JUSTIFIED | motion.div grid with whileInView | KEEP |
| `src/components/ui/tabs.tsx` | shadcn/UI primitive | JUSTIFIED | Wraps `@base-ui/react/tabs` — tab state management requires client | KEEP |
| `src/components/ui/TechStaggerGrid.tsx` | Motion — UI primitive | JUSTIFIED | motion.div stagger grid | KEEP |
| `src/components/ui/WhatsAppWidget.tsx` | Widget | JUSTIFIED | useState hover/expand state | KEEP |

**Result: 37/37 files JUSTIFIED. Zero conversions to Server Components required.**

### REVIEW Sections — Confirmed Motion Usage

All six REVIEW sections from the research doc were verified by direct file read:

| Section | motion.X Elements Found | Conclusion |
|---------|------------------------|------------|
| CTASection | motion.section, motion.p × 2, motion.h2, motion.div | KEEP |
| HeroSection | motion.p, motion.div × 4 (animate, not whileInView) | KEEP |
| WhyBuilderaSection | motion.div × 4 with whileInView | KEEP |
| SolutionsGridSection | motion.div × 2 (header + per-tile) with whileInView | KEEP |
| CaseStudiesPreview | motion.div × 2 per card + header with whileInView | KEEP |
| TestimonialsSection | motion.div, motion.h2, motion.p with whileInView | KEEP |

**Verification command result:** `grep -L '"use client"' src/components/sections/{CTASection,HeroSection,WhyBuilderaSection,SolutionsGridSection,CaseStudiesPreview,TestimonialsSection}.tsx` → **no output** (all still have "use client").

### TechStackSection Note

`TechStackSection.tsx` uses `useState` only (no motion.X elements, no motion hooks). It is in the ALLOWED list as a tab/filter switcher. "use client" retained — correctly classified.

---

## T2: Suspense Boundaries on ISR Detail Pages

All three ISR detail pages now have `<Suspense>` boundaries wrapping below-fold content:

| Page | Suspense Added | Hero Excluded | Fallback |
|------|---------------|---------------|---------|
| `/blog/[slug]` | Wraps article, AuthorBio, RelatedPosts, bottom CTA | `<BlogDetailHero>` excluded | `animate-pulse h-96 bg-muted rounded` |
| `/case-studies/[slug]` | Wraps Problem, Solution, Results, lead form, testimonial, bottom CTA | Hero `<section>` with `priority` image excluded | `animate-pulse h-96 bg-muted rounded` |
| `/guides/[slug]` | Wraps lead form, body, related guides, bottom CTA | Header `<section>` with `priority` image excluded | `animate-pulse h-96 bg-muted rounded` |

All three pages import `Suspense` from `react`. `generateStaticParams` and `generateMetadata` are untouched in all three files.

---

## T3: Bundle Baseline (next build output)

Build completed successfully. Route-by-route First Load JS:

| Route | Size | First Load JS | Type |
|-------|------|--------------|------|
| `/` | 68.2 kB | 232 kB | Static |
| `/_not-found` | 142 B | 102 kB | Static |
| `/about` | 176 B | 106 kB | Static |
| `/api/revalidate` | 142 B | 102 kB | Dynamic |
| `/blog` | 2.04 kB | 113 kB | Dynamic |
| `/blog/[slug]` | 2.71 kB | 122 kB | SSG |
| `/book-a-call` | 656 B | 106 kB | Static |
| `/case-studies` | 2.14 kB | 113 kB | Dynamic |
| `/case-studies/[slug]` | 2.14 kB | 113 kB | SSG |
| `/contact` | 3.01 kB | 109 kB | Static |
| `/faq` | 142 B | 102 kB | Static |
| `/guides` | 2.12 kB | 113 kB | Dynamic |
| `/guides/[slug]` | 2.14 kB | 113 kB | SSG |
| `/how-we-work` | 1.32 kB | 148 kB | Static |
| `/industries` | 176 B | 106 kB | Static |
| `/industries/[slug]` | 176 B | 106 kB | SSG |
| `/privacy` | 177 B | 106 kB | Static |
| `/search` | 1.44 kB | 107 kB | Dynamic |
| `/services` | 3.49 kB | 162 kB | Static |
| `/services/[category]` | 176 B | 106 kB | SSG |
| `/services/[category]/[slug]` | 11.7 kB | 162 kB | SSG |
| `/solutions` | 519 B | 148 kB | Static |
| `/solutions/[slug]` | 520 B | 148 kB | SSG |
| `/terms` | 177 B | 106 kB | Static |
| `/testimonials` | 765 B | 112 kB | Dynamic |
| `/thank-you` | 177 B | 106 kB | Static |

**Shared chunks (all routes):** 102 kB
- `chunks/1255-eae4096fb21f1304.js`: 46 kB
- `chunks/4bd1b696-100b9d70ed4e49c1.js`: 54.2 kB
- Other shared chunks: 2.02 kB

**Middleware:** 34.4 kB

**Key observations:**
- Homepage (`/`) has the largest First Load JS at 232 kB — expected given HeroSection, StatsBarSection, motion animations, TechStackSection (large TECH_DATA)
- ISR detail pages (blog/case-studies/guides slugs) are 113–122 kB
- Services pages (162 kB) carry service icon data
- No runtime dependencies added

---

## Decisions Made

1. **Zero conversions:** All 37 "use client" files are justified. The motion/react v12.40.0 locked decision (createMotionComponent is client-only) is confirmed as the primary driver — 22/37 files use motion.X elements.
2. **Suspense placement:** Only below-fold content wrapped. Above-fold heroes/headers render immediately to protect LCP. This is the correct pattern for ISR pages with `priority` images.
3. **separator.tsx / tabs.tsx:** These @base-ui/react primitive wrappers need "use client" because the underlying Tab state management and accessible behavior require browser APIs.

---

## Deviations from Plan

None — plan executed exactly as written. The research prediction of "zero conversions" was confirmed correct. All REVIEW sections use motion.X elements and correctly retain "use client".

---

## Known Stubs

None. All modified files are infrastructure pages (no UI data stubs introduced).

---

## Threat Flags

None. This plan modifies only page structure (Suspense wrappers) and performs an audit. No new network endpoints, auth paths, or file access patterns introduced.

---

## Self-Check

- [x] `src/app/blog/[slug]/page.tsx` — modified, Suspense present
- [x] `src/app/case-studies/[slug]/page.tsx` — modified, Suspense present
- [x] `src/app/guides/[slug]/page.tsx` — modified, Suspense present
- [x] Build passes: `npm run build` exits 0 (86/86 static pages generated)
- [x] No "use client" removed from any REVIEW section
- [x] No runtime dependencies added to package.json
- [x] generateStaticParams untouched in all three ISR pages

## Self-Check: PASSED
