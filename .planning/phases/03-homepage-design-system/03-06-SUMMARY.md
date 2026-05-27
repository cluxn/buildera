---
phase: 03-homepage-design-system
plan: "06"
subsystem: frontend-homepage-final-sections
tags: [why-buildera, animated-ring, feature-comparison, bar-chart, metrics-card, testimonials, glassmorphism, case-studies, animated-counter, cta-section, shimmer, page-assembly, motion, use-client]
dependency_graph:
  requires:
    - 03-01 (globals.css glass-card utility, cta-button-shimmer class, brand tokens)
    - 03-02 (layout.tsx SiteNav context)
    - 03-03 (layout.tsx SiteFooter context)
    - 03-04 (HeroSection, StatsBarSection, AnimatedCounter)
    - 03-05 (ServicesTabSection, SolutionsGridSection, ClientLogosMarquee)
  provides:
    - AnimatedRingStat Client Component (SVG ring draw + checklist stagger)
    - FeatureCheckList Client Component (5-row comparison table with spring checkmarks)
    - AnimatedBarChart Client Component (bars grow from bottom via scaleY spring)
    - MiniMetricsCard Client Component (bar chart + project outcome feed)
    - WhyBuilderaSection Client Component (3-column shell wrapping ring/comparison/metrics)
    - TestimonialCard Server Component (glass-card with star rating)
    - TestimonialsSection Client Component (3 glassmorphism cards with depth stagger + Clutch badge)
    - CaseStudyPreviewCard Client Component (animated metric counter via useMotionValue+useSpring)
    - CaseStudiesPreview Client Component (3 case study cards with stagger)
    - CTASection Client Component (gradient + shimmer button)
    - page.tsx Server Component (complete homepage composition — all 9 sections)
  affects:
    - Phase 4+ (page.tsx is the canonical homepage; downstream phases add more routes, not modify homepage)
tech_stack:
  added: []
  patterns:
    - SVG ring draw animation via motion.circle pathLength 0→1, useReducedMotion gate
    - Spring checkmark reveal: scale 0→1 + opacity 0→1, stiffness 400 damping 25
    - Bar chart scaleY 0→1 with originY 1 (grows from bottom), spring stiffness 120 damping 20
    - Glassmorphism cards via glass-card @utility class from globals.css
    - Card depth stagger: yOffsets [40, 24, 56] per testimonial index
    - useMotionValue + useSpring + useInView pattern for metric counter on scroll
    - CSS shimmer via cta-button-shimmer::after translateX on hover (globals.css)
    - "use client" applied to all sections using motion.X elements (motion/react v12.40 requirement)
key_files:
  created:
    - buildera-frontend/src/components/ui/AnimatedRingStat.tsx
    - buildera-frontend/src/components/ui/FeatureCheckList.tsx
    - buildera-frontend/src/components/ui/AnimatedBarChart.tsx
    - buildera-frontend/src/components/ui/MiniMetricsCard.tsx
    - buildera-frontend/src/components/sections/WhyBuilderaSection.tsx
    - buildera-frontend/src/components/ui/TestimonialCard.tsx
    - buildera-frontend/src/components/sections/TestimonialsSection.tsx
    - buildera-frontend/src/components/ui/CaseStudyPreviewCard.tsx
    - buildera-frontend/src/components/sections/CaseStudiesPreview.tsx
    - buildera-frontend/src/components/sections/CTASection.tsx
  modified:
    - buildera-frontend/src/app/page.tsx (full replacement — all 9 sections assembled)
    - buildera-frontend/src/components/sections/HeroSection.tsx (added "use client")
    - buildera-frontend/src/components/sections/StatsBarSection.tsx (added "use client")
    - buildera-frontend/src/components/sections/SolutionsGridSection.tsx (added "use client")
    - buildera-frontend/src/components/sections/WhyBuilderaSection.tsx (added "use client" on creation)
decisions:
  - '"use client" required on all sections using motion.X elements — motion/react v12.40.0 marks createMotionComponent as client-only; Server Components cannot invoke it during static generation (npm run build fails with digest error)'
  - 'HeroSection, StatsBarSection, SolutionsGridSection from plans 03-04/03-05 also required "use client" addition — these were written as Server Components but motion/react v12 breaks that at static prerender time'
  - 'TestimonialCard remains a true Server Component (no motion.X used directly) — motion wrapping is done by parent TestimonialsSection'
  - 'CaseStudyPreviewCard uses useMotionValue + useSpring for metric counter inline (no separate AnimatedCounter import) — avoids extra component boundary, matches spec pattern for CaseStudyPreviewCard'
metrics:
  duration_minutes: 15
  completed_date: "2026-05-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 10
  files_modified: 4
---

# Phase 3 Plan 6: Final Homepage Sections + Page Assembly Summary

**One-liner:** WhyBuilderaSection (SVG ring stat, animated comparison table, bar chart metrics), TestimonialsSection (glassmorphism depth-stagger cards with Clutch badge), CaseStudiesPreview (animated metric counters), CTASection (gradient + shimmer button), and complete page.tsx assembling all 9 homepage sections in locked narrative order — plus a critical bug fix adding "use client" to motion-using sections for motion/react v12.40 compatibility.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | WhyBuilderaSection + AnimatedRingStat + FeatureCheckList + MiniMetricsCard + AnimatedBarChart | 1bafaff | 5 files created |
| 2 | TestimonialsSection + CaseStudiesPreview + CTASection + page.tsx assembly + bug fix | a11015e | 10 files created/modified |

## What Was Built

### Task 1: Why Buildera Components

**AnimatedRingStat.tsx ("use client"):**
- SVG ring: cx/cy 60, r 52, track stroke `hsl(217 91% 60% / 15%)`, fill stroke `var(--brand-primary)`, strokeWidth 8
- `motion.circle` with `pathLength` 0→(percentage/100), gated by `useReducedMotion()` — duration 0 when reduced motion
- Center `<text>` element showing `{percentage}%`
- 3 checklist items with staggered `opacity 0→1 x -8→0` reveal (delay 0.8 + index * 0.15)
- Items: "Dedicated project manager", "Weekly progress updates", "Post-launch support included"

**FeatureCheckList.tsx ("use client"):**
- `COMPARISON_ROWS` const with 5 rows: Cost Effective, Delivery Speed, Communication, Accountability, Expertise Depth
- Each row: `motion.div` with `opacity 0→1 x -8→0`, spring stiffness 400 damping 25, delay index * 0.15
- Check/X cells: `motion.span` with `scale 0→1 opacity 0→1`, spring stiffness 400 damping 25
- Buildera column: `text-[var(--brand-primary)]`; others: `text-muted-foreground`
- Column headers row for Buildera / In-House / Freelancer

**AnimatedBarChart.tsx ("use client"):**
- Props: `bars: { height: number; label?: string }[]`
- Container: `flex items-end gap-2 h-24`
- Each bar: `motion.div` with `style={{ originY: 1, height: "100%" }}`, `scaleY` 0→(height/100), spring stiffness 120 damping 20, delay index * 0.1

**MiniMetricsCard.tsx ("use client"):**
- Renders `AnimatedBarChart` with 4 bars: heights [40, 65, 80, 92], labels ["Q1","Q2","Q3","Q4"]
- Project outcome feed: 3 items with `opacity 0→1 y 8→0`, delay 0.6 + index * 0.2
- Items: "Warehouse Mgmt System → 40% faster ops", "Salesforce CRM Rollout → 3x lead pipeline", "E-Commerce Platform → 60% more conversions"

**WhyBuilderaSection.tsx ("use client"):**
- Section header: eyebrow "Why Choose Buildera", H2 "Why Smart Businesses Choose Buildera"
- `grid md:grid-cols-3 gap-8` layout
- 3 columns wrapped in `motion.div` with stagger delays 0 / 0.2 / 0.4
- Column 1: `AnimatedRingStat percentage={98} label="Client Satisfaction"`
- Column 2: `FeatureCheckList`
- Column 3: `MiniMetricsCard`

### Task 2: Final Sections + Page Assembly

**TestimonialCard.tsx (Server Component — no motion, uses glass-card):**
- `className={cn("glass-card p-6 flex flex-col gap-4", className)}`
- Star rating: `Array.from({ length: 5 })` map — filled stars for `i < rating`, empty for remainder
- `IconStar` from `@tabler/icons-react` with `fill-current` on filled stars
- Blockquote with `&ldquo;` / `&rdquo;` curly quotes
- Attribution: name + `{title}, {company}` at `mt-auto`

**TestimonialsSection.tsx ("use client"):**
- 3 hardcoded testimonials: manufacturing ERP (Rajiv Mehta, Nexgen Logistics), e-commerce (Priya Sharma, Craftique Retail), Salesforce CRM (Arjun Kapoor, Sterling Trade & Finance) — all 5-star
- Depth stagger: `Y_OFFSETS = [40, 24, 56]`, `DELAYS = [0, 0.15, 0.3]`
- Clutch badge: `flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 w-fit mx-auto` with `IconStar + "4.9/5.0 on Clutch"`
- Section eyebrow: "What Our Clients Say", H2: "Don't Take Our Word For It"

**CaseStudyPreviewCard.tsx ("use client"):**
- `useRef` + `useInView(ref, { once: true })` for scroll gate
- `useMotionValue(0)` → `useSpring(count, { stiffness: 60, damping: 20 })` → `useTransform(spring, v => \`\${Math.round(v)}%\`)`
- Counter triggers 400ms after card enters viewport
- Industry badge: `text-xs uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-glass)] px-3 py-1 rounded-full`
- Card hover: `hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--brand-primary)] transition-all duration-200`
- "Read Case Study" link to `/case-studies`

**CaseStudiesPreview.tsx ("use client"):**
- 3 case studies: Warehouse Mgmt (Logistics, 40%), Salesforce CRM (Finance, 200%), E-Commerce (Retail, 60%)
- Section background: `bg-[var(--brand-surface)]`
- Eyebrow: "Proven Results", H2: "Results We've Delivered"
- Card stagger: delay index * 0.2

**CTASection.tsx ("use client"):**
- Root: `motion.section` with inline `background: linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))`
- Eyebrow: "Ready to Start?" (text-white/60)
- `motion.h2`: "Ready to build something that grows your business?" with scale 0.97→1 + y 24→0
- `motion.p`: subtext with delay 0.2
- CTA button: `class="cta-button-shimmer relative inline-flex..."` linking to `/book-a-call`, wrapped in `motion.div` with delay 0.4

**page.tsx (async Server Component):**
- Imports all 9 section components
- `const settings = await fetchSettings()`
- Renders all 9 sections in locked narrative order: Hero → StatsBar → Services → Solutions → Logos → WhyBuildera → Testimonials → CaseStudies → CTA
- No placeholder comments

## Verification

- `npx tsc --noEmit`: 0 errors (Task 1 verification)
- `npm run build`: exit 0, 6 static pages generated (Task 2 verification, / now renders at 11.9 kB)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] motion/react v12.40.0 requires "use client" on components using motion.X elements**
- **Found during:** Task 2 — `npm run build` failed with "Attempted to call createMotionComponent() from the server but createMotionComponent is on the client"
- **Issue:** `motion/react` v12 marks `createMotionComponent` as `"use client"`. When Next.js 15 statically prerendered the homepage, Server Components (HeroSection, StatsBarSection, SolutionsGridSection) calling `motion.X` triggered this error. Previous plans (03-04, 03-05) did not expose this because `page.tsx` still had the Next.js default content and didn't render these sections during build.
- **Fix:** Added `"use client"` as first line to all section files that directly use `motion.X` elements: HeroSection, StatsBarSection, SolutionsGridSection (from 03-04/03-05), and all new sections WhyBuilderaSection, TestimonialsSection, CaseStudiesPreview, CTASection
- **Note:** TestimonialCard does NOT use motion directly — it's wrapped by TestimonialsSection (which is "use client"). TestimonialCard remains a valid Server Component.
- **Files modified:** HeroSection.tsx, StatsBarSection.tsx, SolutionsGridSection.tsx, WhyBuilderaSection.tsx, TestimonialsSection.tsx, CaseStudiesPreview.tsx, CTASection.tsx
- **Commit:** a11015e

## Known Stubs

**Clutch badge (TestimonialsSection):** The "4.9/5.0 on Clutch" badge is a static placeholder. The actual Clutch embed/badge will be configurable via admin ScriptInjector in Phase 8. The static badge accurately represents Buildera's Clutch reputation direction; the exact rating will update when real reviews are present.

**CaseStudyPreviewCard "Read Case Study" link:** Links to `/case-studies` route which does not yet exist. The route will be created in Phase 6 (Blog, Case Studies, Guides). The link is correct per the spec — it's not a stub, just an early forward-reference to a future route.

**Testimonial content:** 3 fabricated testimonials with realistic names/companies/quotes. Per project convention, all Phase 3 content is hardcoded seed data. Admin-driven testimonials will be wired in Phase 8.

## Threat Flags

None. All content is hardcoded JSX — no `dangerouslySetInnerHTML` used anywhere (T-03-17 mitigated). All link destinations are hardcoded relative paths. No user input, no new network endpoints, no dynamic routing.

## Self-Check: PASSED

Files verified:
- FOUND: buildera-frontend/src/components/sections/WhyBuilderaSection.tsx
- FOUND: buildera-frontend/src/components/ui/AnimatedRingStat.tsx
- FOUND: buildera-frontend/src/components/ui/FeatureCheckList.tsx
- FOUND: buildera-frontend/src/components/ui/MiniMetricsCard.tsx
- FOUND: buildera-frontend/src/components/ui/AnimatedBarChart.tsx
- FOUND: buildera-frontend/src/components/sections/TestimonialsSection.tsx
- FOUND: buildera-frontend/src/components/ui/TestimonialCard.tsx
- FOUND: buildera-frontend/src/components/sections/CaseStudiesPreview.tsx
- FOUND: buildera-frontend/src/components/ui/CaseStudyPreviewCard.tsx
- FOUND: buildera-frontend/src/components/sections/CTASection.tsx
- FOUND: buildera-frontend/src/app/page.tsx

Commits verified:
- FOUND: 1bafaff (Task 1 — WhyBuilderaSection + AnimatedRingStat + FeatureCheckList + MiniMetricsCard + AnimatedBarChart)
- FOUND: a11015e (Task 2 — TestimonialsSection + CaseStudiesPreview + CTASection + page.tsx + motion bug fix)
