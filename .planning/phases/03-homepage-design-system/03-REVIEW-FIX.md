---
phase: 03-homepage-design-system
fixed_at: 2026-05-27T11:30:00Z
review_path: .planning/phases/03-homepage-design-system/03-REVIEW.md
iteration: 1
findings_in_scope: 14
fixed: 14
skipped: 0
status: all_fixed
---

# Phase 03: Code Review Fix Report

**Fixed at:** 2026-05-27T11:30:00Z
**Source review:** .planning/phases/03-homepage-design-system/03-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 14 (5 Critical, 9 Warning)
- Fixed: 14
- Skipped: 0

Build verification: `npm run build` passed — compiled successfully, all 6 static pages generated, no TypeScript errors, no lint errors.

## Fixed Issues

### CR-01: `fetchFromApi` throws unhandled errors — API URL leaks into client error boundaries

**Files modified:** `buildera-frontend/src/lib/api.ts`
**Commit:** fe19886
**Applied fix:** Replaced `throw new ApiError(res.status, res.statusText)` with `throw new ApiError(res.status, \`API request failed: ${path}\`)` to avoid leaking server-defined statusText. Wrapped `res.json()` in a try/catch that throws a clean `ApiError` with `\`Invalid JSON from: ${path}\`` on parse failure.

---

### CR-02: `env.ts` throws at module load — crashes every SSR render when env var is absent

**Files modified:** `buildera-frontend/src/lib/env.ts`
**Commit:** 16f2606
**Applied fix:** Replaced the top-level `if (!NEXT_PUBLIC_API_URL) throw` with a `requireEnv()` helper function that logs a `console.error` and returns `""` rather than throwing. This allows SSR to degrade gracefully and allows `next build` to complete without crashing when the env var is absent.

---

### CR-03: Real company contact details hardcoded in public fallback constant

**Files modified:** `buildera-frontend/src/lib/api.ts`
**Commit:** fe19886 (combined with CR-01 — both changes in api.ts)
**Applied fix:** Replaced `email: 'info@buildera.co'`, `phone: '+91 82994 06767'`, `address: '117/Q/457/10A ...'`, and `whatsapp_number: '+918299406767'` in `SETTINGS_FALLBACK` with empty strings `''`. The footer's conditional rendering already handles empty-string contacts gracefully.

---

### CR-04: `ServiceCard` ignores its own `slug` prop — all sub-service cards link to parent service page

**Files modified:** `buildera-frontend/src/components/ui/ServiceCard.tsx`
**Commit:** 188d6d5
**Applied fix:** Added `slug` to the destructured props in the component function signature, and changed `href={\`/services/${parentSlug}\`}` to `href={\`/services/${parentSlug}/${slug}\`}` so sub-service cards link to the correct deep URL.

---

### CR-05: Out-of-bounds array access in `TestimonialsSection` — crash when testimonials count > 3

**Files modified:** `buildera-frontend/src/components/sections/TestimonialsSection.tsx`
**Commit:** 80ccf69
**Applied fix:** Removed fixed-length `Y_OFFSETS` and `DELAYS` arrays. Replaced with two generator functions: `getYOffset(i)` that uses `[40, 24, 56][i] ?? 24` (defaults to 24 for index >= 3) and `getDelay(i)` that computes `i * 0.15`. Both are safe for any array length.

---

### WR-01: Newsletter form silently discards submission — no loading state, no user feedback

**Files modified:** `buildera-frontend/src/components/layout/SiteFooter.tsx`
**Commit:** ac817a4
**Applied fix:** Added `required` attribute to the email input. Replaced the submit button with a `disabled` button labelled "Coming Soon" with `disabled:opacity-50 disabled:cursor-not-allowed` styles. The `hover:bg-[var(--brand-primary-dark)]` hover style was also removed from the disabled button since it serves no purpose when disabled.

---

### WR-02: Desktop nav buttons missing `aria-controls` — accordion contract broken for screen readers

**Files modified:** `buildera-frontend/src/components/layout/SiteNavClient.tsx`, `buildera-frontend/src/components/layout/MegaDropdown.tsx`
**Commit:** 9893639
**Applied fix:** Added `aria-expanded={activeDropdown === panel}` and `aria-controls={\`mega-dropdown-${panel.toLowerCase()}\`}` to each desktop nav button in `SiteNavClient`. Added matching `id={\`mega-dropdown-${activePanel?.toLowerCase()}\`}` to the `motion.div` root in `MegaDropdown`.

---

### WR-03: `MegaDropdown` uses `motion/AnimatePresence` but has no `"use client"` directive

**Files modified:** `buildera-frontend/src/components/layout/MegaDropdown.tsx`
**Commit:** 9893639 (combined with WR-02 — both changes in MegaDropdown.tsx)
**Applied fix:** Added `"use client"` directive as the first line of `MegaDropdown.tsx`. This makes the client boundary explicit regardless of call-site context.

---

### WR-04: `AnimatedCounter` leaks `setTimeout` handle on component unmount

**Files modified:** `buildera-frontend/src/components/ui/AnimatedCounter.tsx`
**Commit:** 3f5f446
**Applied fix:** Refactored the `useEffect` body to use an early return when `!isInView`, capture the timeout ID with `const id = setTimeout(...)`, and return `() => clearTimeout(id)` as the cleanup function. The reduced-motion early return path was also clarified with an explicit `return` after `count.set(target)`.

---

### WR-05: `AnimatedRingStat` uses hardcoded `pathLength` when `prefersReducedMotion` is true

**Files modified:** `buildera-frontend/src/components/ui/AnimatedRingStat.tsx`
**Commit:** e3053b1
**Applied fix:** Changed `pathLength: prefersReducedMotion ? 1 : percentage / 100` to `pathLength: percentage / 100` so the ring always snaps to the correct percentage. Also zeroed `delay` when `prefersReducedMotion` is true (previously the delay was always 0.3 even for reduced-motion).

---

### WR-06: Sub-service URL slug generation duplicated between `MegaDropdown` and `MobileNavDrawer`

**Files modified:** `buildera-frontend/src/lib/utils.ts`, `buildera-frontend/src/components/layout/MegaDropdown.tsx`, `buildera-frontend/src/components/layout/MobileNavDrawer.tsx`
**Commit:** 9b09fd9
**Applied fix:** Added `toSlug(str: string): string` to `src/lib/utils.ts` — it lowercases, replaces any sequence of non-alphanumeric characters with `-`, and strips leading/trailing hyphens. Replaced both inline `.toLowerCase().replace(/\s+/g, "-")` calls in `MegaDropdown` and `MobileNavDrawer` with `toSlug(sub)`. This handles service names containing `/` (e.g. "CI/CD Pipeline") correctly.

---

### WR-07: `CaseStudyPreviewCard` counter always appends `%` regardless of metric type

**Files modified:** `buildera-frontend/src/components/ui/CaseStudyPreviewCard.tsx`, `buildera-frontend/src/components/sections/CaseStudiesPreview.tsx`
**Commit:** d6415e1
**Applied fix:** Added optional `metricSuffix?: string` prop to `CaseStudyPreviewCard` and changed the transform to `` `${Math.round(v)}${metricSuffix ?? ""}` ``. Updated `CaseStudiesPreview` to add `metricSuffix: "%"` to each of the three existing case study data objects and pass `metricSuffix={study.metricSuffix}` to the card.

---

### WR-08: `ClientLogosMarquee` uses array index as React key on a doubled array

**Files modified:** `buildera-frontend/src/components/sections/ClientLogosMarquee.tsx`
**Commit:** 606c209
**Applied fix:** Changed `key={index}` to `key={\`${logo.name}-${index}\`}`. This guarantees key uniqueness across the duplicated set (first set: `Nexova-0`…`Orbisen-7`, second set: `Nexova-8`…`Orbisen-15`) while using a stable, meaningful identifier.

---

### WR-09: `glass-nav` CSS utility has no dark-mode variant — nav becomes invisible on dark backgrounds

**Files modified:** `buildera-frontend/src/app/globals.css`
**Commit:** 371a20c
**Applied fix:** Added `.dark .glass-nav { background: hsl(0 0% 10% / 85%); }` immediately after the `@utility glass-nav` block. This overrides the white background with a near-black semi-transparent value when the `.dark` class is active.

---

_Fixed: 2026-05-27T11:30:00Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
