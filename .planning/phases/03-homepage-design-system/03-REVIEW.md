---
phase: 03-homepage-design-system
reviewed: 2026-05-27T11:09:42Z
depth: standard
files_reviewed: 34
files_reviewed_list:
  - buildera-frontend/src/app/error.tsx
  - buildera-frontend/src/app/globals.css
  - buildera-frontend/src/app/layout.tsx
  - buildera-frontend/src/app/not-found.tsx
  - buildera-frontend/src/app/page.tsx
  - buildera-frontend/src/components/layout/MegaDropdown.tsx
  - buildera-frontend/src/components/layout/MobileNavDrawer.tsx
  - buildera-frontend/src/components/layout/SiteFooter.tsx
  - buildera-frontend/src/components/layout/SiteNav.tsx
  - buildera-frontend/src/components/layout/SiteNavClient.tsx
  - buildera-frontend/src/components/sections/CTASection.tsx
  - buildera-frontend/src/components/sections/CaseStudiesPreview.tsx
  - buildera-frontend/src/components/sections/ClientLogosMarquee.tsx
  - buildera-frontend/src/components/sections/HeroHeadline.tsx
  - buildera-frontend/src/components/sections/HeroSection.tsx
  - buildera-frontend/src/components/sections/ServicesTabSection.tsx
  - buildera-frontend/src/components/sections/SolutionsGridSection.tsx
  - buildera-frontend/src/components/sections/StatsBadgeStrip.tsx
  - buildera-frontend/src/components/sections/StatsBarSection.tsx
  - buildera-frontend/src/components/sections/TestimonialsSection.tsx
  - buildera-frontend/src/components/sections/WhyBuilderaSection.tsx
  - buildera-frontend/src/components/ui/AnimatedBarChart.tsx
  - buildera-frontend/src/components/ui/AnimatedCounter.tsx
  - buildera-frontend/src/components/ui/AnimatedRingStat.tsx
  - buildera-frontend/src/components/ui/CaseStudyPreviewCard.tsx
  - buildera-frontend/src/components/ui/FeatureCheckList.tsx
  - buildera-frontend/src/components/ui/MiniMetricsCard.tsx
  - buildera-frontend/src/components/ui/ServiceCard.tsx
  - buildera-frontend/src/components/ui/SolutionTile.tsx
  - buildera-frontend/src/components/ui/TestimonialCard.tsx
  - buildera-frontend/src/components/ui/badge.tsx
  - buildera-frontend/src/components/ui/card.tsx
  - buildera-frontend/src/components/ui/separator.tsx
  - buildera-frontend/src/components/ui/tabs.tsx
  - buildera-frontend/src/lib/api.ts
findings:
  critical: 5
  warning: 9
  info: 5
  total: 19
status: issues_found
---

# Phase 03: Code Review Report

**Reviewed:** 2026-05-27T11:09:42Z
**Depth:** standard
**Files Reviewed:** 34
**Status:** issues_found

## Summary

This phase delivers the homepage design system: global CSS tokens, the site nav (server shell + client interaction layer), footer, all homepage sections, and a suite of shared UI primitives. The architecture is mostly sound — server/client split is respected, motion imports are correct (`motion/react`), icons use `@tabler/icons-react`, and fetch helpers are centralised in `api.ts`.

Five blockers were found: a crash-path in `fetchFromApi` that leaks the raw API URL into client error messages; an `env.ts` module-load crash that kills every SSR render when `NEXT_PUBLIC_API_URL` is missing; a hard-coded phone/address in the public `SETTINGS_FALLBACK` constant; a `ServiceCard` that ignores its own `slug` prop (dead prop, broken link target); and an unguarded `Y_OFFSETS[index]` array access in `TestimonialsSection` that will throw if the testimonials array ever grows beyond 3 items.

Nine warnings cover: the newsletter form silently swallowing submissions (no disabled state, no feedback); a missing `aria-controls` / `aria-expanded` pairing in the desktop nav buttons; `MegaDropdown` being imported as a Server Component while using `motion/AnimatePresence`; `AnimatedCounter` leaking a stale `setTimeout` handle on unmount; an off-by-one stagger formula in `SolutionsGridSection` that produces non-linear delays; duplicate sub-service URL generation in two separate files that can drift out of sync; `CaseStudyPreviewCard` metric counter always showing `%` suffix regardless of actual unit; `ClientLogosMarquee` using array index as React key on a doubled array; and the `glass-nav` utility missing dark-mode overrides, leaving the nav invisible on dark backgrounds.

---

## Critical Issues

### CR-01: `fetchFromApi` throws unhandled errors — API URL leaks into client error boundaries

**File:** `buildera-frontend/src/lib/api.ts:16-19`
**Issue:** `fetchFromApi` throws `ApiError` on non-2xx responses. Network failures (`fetch` rejects) also propagate as uncaught exceptions. In `layout.tsx`, `SiteNav` and `SiteFooter` call `fetchNavItems()` / `fetchFooterLinks()` / `fetchSettings()` directly — those three callers do have `.catch(() => fallback)`. However, `fetchFromApi` is exported as a public helper and is described in `CLAUDE.md` as "never throws; returns typed fallbacks". The current implementation does the opposite: it throws unconditionally. Any future caller that forgets `.catch()` — including any page component added in Phase 4+ — will produce an unhandled rejection that Next.js converts into a full-page error, leaking the raw `res.statusText` string (which can contain internal server messages) into the error boundary rendered to the client.

The deeper structural problem is that `res.json()` on line 19 is not awaited in a try/catch, so a malformed JSON response from the Laravel API will produce an uncaught `SyntaxError` that bypasses the `ApiError` wrapper entirely and is not caught by callers that only guard against `ApiError`.

**Fix:**
```typescript
export async function fetchFromApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);
  if (!res.ok) {
    throw new ApiError(res.status, `API request failed: ${path}`); // never echo statusText
  }
  try {
    return await res.json() as T;
  } catch {
    throw new ApiError(res.status, `Invalid JSON from: ${path}`);
  }
}
```

---

### CR-02: `env.ts` throws at module load — crashes every SSR render when env var is absent

**File:** `buildera-frontend/src/lib/env.ts:1-3`
**Issue:** `layout.tsx` imports `@/lib/env` at line 3. If `NEXT_PUBLIC_API_URL` is not set (e.g., during CI, staging, or a developer's first checkout), the `throw new Error(...)` executes at module evaluation time, before any React rendering occurs. This crashes the Next.js process entirely — not just the route, but the whole worker — and the developer sees a confusing Node.js startup error rather than a helpful build-time message. This is also a problem during `next build` because the module is evaluated during the server bundle step, making the entire build fail with no useful output.

Furthermore, `env.ts` exports a typed `env` object but `layout.tsx` only imports it for the side-effect (the throw). Nothing in the reviewed files consumes `env.apiUrl`, `env.apiKey`, or `env.revalidateSecret` — `api.ts` reads `process.env.NEXT_PUBLIC_API_URL` directly. The module is therefore providing a validation side-effect but no actual runtime value, making the contract fragile.

**Fix:** Move the validation to `next.config.ts` using the `env` config key or a proper build-time check. If runtime validation is required, use a function that fails gracefully and logs rather than a top-level throw:
```typescript
// src/lib/env.ts
function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) {
    console.error(`[env] Missing required env var: ${key}`);
    // Return empty string so SSR degrades rather than crashes
    return "";
  }
  return val;
}

export const env = {
  apiUrl: requireEnv("NEXT_PUBLIC_API_URL"),
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
  revalidateSecret: process.env.NEXTJS_REVALIDATE_SECRET ?? "",
};
```

---

### CR-03: Real company contact details hardcoded in public fallback constant

**File:** `buildera-frontend/src/lib/api.ts:56-72`
**Issue:** `SETTINGS_FALLBACK` contains a real phone number (`+91 82994 06767`), a real email address (`info@buildera.co`), and a real physical address (`117/Q/457/10A Indrapuri Sharda Nagar, Kanpur 208025`). This constant is used verbatim when the backend API is unreachable — which will happen during any SSG/ISR build run before the Laravel backend is deployed. These values are baked into the static HTML of every built page and served publicly, meaning they are indexed by search engines regardless of what the CMS eventually stores. If the client ever changes their phone number or address in the CMS, the old values remain embedded in every statically-generated page until the next full rebuild. The phone number is also in two slightly different formats (`+91 82994 06767` vs `+918299406767`) which will break `tel:` link normalisation.

**Fix:** Replace real contact data with empty strings as fallback. The template must handle empty-string rendering gracefully (which the footer already does with conditional rendering on `settings.phone` etc.):
```typescript
export const SETTINGS_FALLBACK: Settings = {
  company_name: 'Buildera',
  email: '',
  phone: '',
  address: '',
  calendly_url: '',
  whatsapp_number: '',
  whatsapp_enabled: false,
  linkedin_url: '',
  instagram_url: '',
  twitter_url: '',
  footer_tagline: 'Building technology that grows businesses.',
  stat_projects: '150',
  stat_clients: '50',
  stat_years: '6',
  stat_satisfaction: '98',
}
```

---

### CR-04: `ServiceCard` ignores its own `slug` prop — all sub-service cards link to parent service page

**File:** `buildera-frontend/src/components/ui/ServiceCard.tsx:13`
**Issue:** The component signature accepts a `slug` prop (line 13) and the `ServicesTabSection` passes both `slug` and `parentSlug` (line 265-269 of `ServicesTabSection.tsx`). However, `ServiceCard` only uses `parentSlug` when constructing the `href` on line 15: `href={`/services/${parentSlug}`}`. The `slug` prop is accepted but never used — it is a dead prop. Every sub-service card in the Services tab (e.g. "Custom Websites", "E-Commerce") links to `/services/website-development` instead of the correct `/services/website-development/custom-websites`. Visitors clicking "Learn More" on any sub-service are taken to the category overview rather than the specific sub-service page, which breaks the conversion funnel.

**Fix:**
```typescript
// ServiceCard.tsx line 15
href={`/services/${parentSlug}/${slug}`}
```

---

### CR-05: Out-of-bounds array access in `TestimonialsSection` — crash when testimonials count > 3

**File:** `buildera-frontend/src/components/sections/TestimonialsSection.tsx:63-70`
**Issue:** `Y_OFFSETS` and `DELAYS` are fixed-length arrays of 3 elements (lines 37-38). The `map` on line 63 accesses `Y_OFFSETS[index]` and `DELAYS[index]` by index. If `TESTIMONIALS` is ever extended to 4 or more entries (the most natural maintenance task), `Y_OFFSETS[3]` returns `undefined`. Passing `undefined` as the initial `y` value to a motion `whileInView` animation does not throw immediately, but it produces a `NaN` CSS value that breaks the animation for all subsequent items. If the array is eventually populated from the API rather than the hardcoded constant (the intent per project architecture), the crash vector becomes uncontrollable.

**Fix:** Either guard the access or derive offset/delay from the index algorithmically:
```typescript
// Replace fixed arrays with a generator
const getYOffset = (i: number) => [40, 24, 56][i] ?? 24
const getDelay  = (i: number) => i * 0.15
```

---

## Warnings

### WR-01: Newsletter form silently discards submission — no loading state, no user feedback

**File:** `buildera-frontend/src/components/layout/SiteFooter.tsx:210-236`
**Issue:** The footer newsletter form uses `action="#"` (intentional Phase 3 stub per comment on line 200) but the submit button is not disabled and there is no `aria-live` region or visual indicator to tell the user nothing happened. A user who submits the form sees no response at all — no error, no success message, no spinner. This is tolerable as a visual stub but the button must be disabled or the form must prevent default to avoid confusing users who test the form before Phase 5 wiring. More critically, the form has no `required` attribute on the email input and no client-side validation, meaning a blank submission produces no feedback.

**Fix:** Mark the email input `required` and disable the submit button or add a `disabled` attribute until the real endpoint is wired:
```tsx
<input type="email" name="email" required ... />
<button type="submit" disabled className={cn(..., "disabled:opacity-50 disabled:cursor-not-allowed")}>
  Coming Soon
</button>
```

---

### WR-02: Desktop nav buttons missing `aria-controls` — accordion contract broken for screen readers

**File:** `buildera-frontend/src/components/layout/SiteNavClient.tsx:79-93`
**Issue:** The desktop nav buttons that trigger the mega dropdown (the `NAV_PANELS.map` buttons) have no `aria-expanded` attribute and no `aria-controls` attribute pointing to the dropdown panel. Screen reader users cannot determine whether a nav item is expanded or which panel it controls. The `MegaDropdown` component also has no `id` attribute to serve as the `aria-controls` target. This means the desktop nav is functionally inaccessible for keyboard/screen-reader users despite the mobile drawer correctly implementing `role="dialog"` and `aria-modal`.

**Fix:**
```tsx
// SiteNavClient.tsx — add aria-expanded to each nav button
<button
  aria-expanded={activeDropdown === panel}
  aria-controls={`mega-dropdown-${panel.toLowerCase()}`}
  ...
>

// MegaDropdown.tsx — add matching id
<motion.div id={`mega-dropdown-${activePanel?.toLowerCase()}`} ...>
```

---

### WR-03: `MegaDropdown` uses `motion/AnimatePresence` but has no `"use client"` directive

**File:** `buildera-frontend/src/components/layout/MegaDropdown.tsx:1-11`
**Issue:** `MegaDropdown` imports `motion` and `AnimatePresence` from `motion/react` (line 10) without a `"use client"` directive. It is rendered by `SiteNavClient` which is already a client component, so React's client boundary propagation means this works at runtime today. However, it violates the explicit project convention (CLAUDE.md: `"use client" ONLY on: forms, tab switcher, popups/widgets, analytics components`) in a way that creates a maintenance hazard: if `MegaDropdown` is ever moved or referenced from a Server Component, it will throw at build time. The missing directive is a silent dependency on call-site context.

**Fix:** Add `"use client"` at line 1 of `MegaDropdown.tsx`.

---

### WR-04: `AnimatedCounter` leaks `setTimeout` handle on component unmount

**File:** `buildera-frontend/src/components/ui/AnimatedCounter.tsx:28-38`
**Issue:** Inside the `useEffect`, `setTimeout(() => count.set(target), delay * 1000)` is called when `isInView` becomes true. The timeout ID is never captured and never cleared in the effect's cleanup function. If the component unmounts before the timeout fires (e.g., the user navigates away within the delay window), `count.set(target)` executes on an unmounted motion value. While motion values are not React state and do not cause the "Can't perform state update on unmounted component" warning, the stale timeout still executes wasted work and can interact with future remounts of the same component (e.g., React Strict Mode's double-invoke behavior).

**Fix:**
```typescript
useEffect(() => {
  if (!isInView) return;
  if (prefersReducedMotion) {
    count.set(target);
    return;
  }
  const id = setTimeout(() => count.set(target), delay * 1000);
  return () => clearTimeout(id);
}, [isInView, prefersReducedMotion]);
```

---

### WR-05: `AnimatedRingStat` uses hardcoded `pathLength` when `prefersReducedMotion` is true

**File:** `buildera-frontend/src/components/ui/AnimatedRingStat.tsx:44-45`
**Issue:** When `prefersReducedMotion` is true, `pathLength` is set to `1` (full circle) regardless of the `percentage` prop. A ring stat showing 40% satisfaction would immediately snap to a full 100% ring for users who prefer reduced motion. The fix for reduced motion should be to skip animation and render at the correct final value, not to override the value with 100%.

**Fix:**
```tsx
whileInView={{
  pathLength: percentage / 100,  // always use correct value
  opacity: 1,
}}
transition={{
  duration: prefersReducedMotion ? 0 : 1.5,
  ease: "easeInOut",
  delay: prefersReducedMotion ? 0 : 0.3,
}}
```

---

### WR-06: Sub-service URL slug generation duplicated between `MegaDropdown` and `MobileNavDrawer` — can silently drift

**File:** `buildera-frontend/src/components/layout/MegaDropdown.tsx:74` and `buildera-frontend/src/components/layout/MobileNavDrawer.tsx:129`
**Issue:** Both components independently generate sub-service href slugs using `.toLowerCase().replace(/\s+/g, "-")`. The `SERVICES_MENU` in `SiteNav.tsx` stores sub-service names as plain strings (e.g., `"CI/CD Pipeline"`, `"Cloud Mgmt"`). The current transformation produces `/services/devops-development/ci/cd-pipeline` for "CI/CD Pipeline" because the regex only replaces spaces, not forward-slashes or other special characters. The resulting URL contains a literal `/cd-pipeline` path segment that will 404. The same slug generation in two separate files means fixing one does not fix the other.

**Fix:** Move slug generation to a shared utility and handle non-alphanumeric characters:
```typescript
// lib/utils.ts
export function toSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
```
Then replace both inline `.toLowerCase().replace(/\s+/g, "-")` calls with `toSlug(sub)`.

---

### WR-07: `CaseStudyPreviewCard` counter always appends `%` regardless of metric type

**File:** `buildera-frontend/src/components/ui/CaseStudyPreviewCard.tsx:26`
**Issue:** `rounded` is defined as `` `${Math.round(v)}%` `` on line 26 — the `%` is hardcoded. The card's `metricLabel` prop describes the unit semantically (e.g., "increase in lead pipeline") but the displayed value always shows `200%` rather than just `200` for non-percentage metrics. The case study with `metricValue: 200` and `metricLabel: "increase in lead pipeline"` currently renders as "200% increase in lead pipeline", which is misleading and inaccurate (the label already implies the scale). When this data moves to the API, different metrics will require different suffixes.

**Fix:** Accept an optional `metricSuffix` prop defaulting to `"%"` and use it in the transform, or simply remove the hardcoded suffix:
```typescript
const rounded = useTransform(spring, (v) => `${Math.round(v)}${metricSuffix ?? ""}`)
```

---

### WR-08: `ClientLogosMarquee` uses array index as React key on a doubled array

**File:** `buildera-frontend/src/components/sections/ClientLogosMarquee.tsx:92-99`
**Issue:** The marquee duplicates the `LOGOS` array with `[...LOGOS, ...LOGOS]` and then uses `index` as the React `key`. This means the second set of logos has keys 8–15, which only avoids key collision by coincidence of the array length. If `LOGOS` is resized, the second set keys start at the new length, still numeric-index, which is fragile. More importantly, using array index as key on a rendered list that has no stable identity (the list never reorders, but the component rationale says it should be animated) means React cannot reconcile items correctly if the list ever changes at runtime. The correct key is the logo name.

**Fix:**
```tsx
{[...LOGOS, ...LOGOS].map((logo, index) => (
  <div key={`${logo.name}-${index}`} ...>
```
Using `${logo.name}-${index}` ensures uniqueness across the duplicated set while preserving stable identity.

---

### WR-09: `glass-nav` CSS utility has no dark-mode variant — nav becomes invisible on dark backgrounds

**File:** `buildera-frontend/src/app/globals.css:219-224`
**Issue:** The `glass-nav` utility sets `background: hsl(0 0% 100% / 80%)` — white at 80% opacity. The `.dark` class token block in `globals.css` (lines 94–133) does not override this value for dark mode. When the site is viewed in dark mode and the user scrolls (triggering `glass-nav` class on the nav), the nav bar renders as a near-white translucent stripe over a dark background. The dark-mode brand tokens block (lines 126-132) explicitly notes that `--brand-gradient-from` and `--brand-gradient-to` are unchanged, but makes no mention of `glass-nav`, indicating this omission is unintentional.

**Fix:** Add a dark-mode override inside the `@utility glass-nav` block or the `.dark` rule:
```css
@utility glass-nav {
  background: hsl(0 0% 100% / 80%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--brand-glass);
}

.dark .glass-nav {
  background: hsl(0 0% 10% / 85%);
}
```

---

## Info

### IN-01: `error.tsx` renders raw `error.message` to users — can expose internal error details

**File:** `buildera-frontend/src/app/error.tsx:21-23`
**Issue:** The error boundary renders `{error.message}` directly. In production, unhandled errors thrown from server components (e.g., database errors surfaced through the API) can contain stack traces, SQL fragments, or internal API paths. Next.js sanitises some error messages in production builds, but `ApiError` messages constructed from `res.statusText` (which can be server-defined) would pass through. This is a defence-in-depth concern: the error page should show a generic message and optionally log `error.message` to a monitoring service rather than displaying it.

**Fix:** Replace the conditional `error.message` display with a static user-facing string. Log the actual message to the console (or a future error tracking service) instead.

---

### IN-02: `SiteFooter` computes `currentYear` at render time — mismatches static generation

**File:** `buildera-frontend/src/components/layout/SiteFooter.tsx:89`
**Issue:** `const currentYear = new Date().getFullYear()` is evaluated at SSG build time. If the site is built in December 2026 and the cached page is served in January 2027, the footer still shows "2026". For a purely static site with no periodic rebuild, this can persist for the full year. This is a known trade-off for static sites, but it should be acknowledged. If ISR or a scheduled rebuild is not in place, the copyright year will stale.

**Fix:** Either accept this limitation and note it in comments, or wrap the footer in a minimal `"use client"` subcomponent that renders only the year dynamically. Alternatively, configure a nightly revalidation for the layout.

---

### IN-03: `ServicesTabSection` and `SolutionsGridSection` "Explore All" links use `<a>` instead of `next/link`

**File:** `buildera-frontend/src/components/sections/ServicesTabSection.tsx:281` and `buildera-frontend/src/components/sections/SolutionsGridSection.tsx:99`
**Issue:** Both sections use a plain `<a href="...">` for their "Explore All Services" and "View All Solutions" footer links. Per project convention and Next.js best practice, internal navigation should use `<Link>` from `next/link` to enable client-side navigation and prefetching. Using `<a>` forces a full page reload.

**Fix:** Replace both `<a>` tags with `<Link href="...">` from `next/link`.

---

### IN-04: `AnimatedRingStat` has hardcoded `strokeDasharray="326.7"` that is only correct for `r=52`

**File:** `buildera-frontend/src/components/ui/AnimatedRingStat.tsx:41`
**Issue:** The `strokeDasharray` value `326.7` is the circumference of a circle with `r=52` (2π × 52 ≈ 326.73). This value is hardcoded as a magic number. If the SVG viewBox or radius is changed for responsive resizing or a design update, the animation will be incorrect. The `pathLength` motion API (which is already used on the same element) renders `strokeDasharray` redundant — `motion.circle` with `pathLength` normalises the dash calculation automatically. The hardcoded value fights against `pathLength`.

**Fix:** Remove `strokeDasharray="326.7"` entirely. When using motion's `pathLength` prop, the library manages the dash calculation:
```tsx
<motion.circle
  cx="60" cy="60" r="52"
  fill="none"
  stroke="var(--brand-primary)"
  strokeWidth="8"
  strokeLinecap="round"
  // Remove strokeDasharray — pathLength handles it
  initial={{ pathLength: 0, opacity: 0 }}
  ...
/>
```

---

### IN-05: `FeatureCheckList` column header grid uses empty string `""` as React key

**File:** `buildera-frontend/src/components/ui/FeatureCheckList.tsx:21-23`
**Issue:** `COLUMN_HEADERS` is `["", "Buildera", "In-House", "Freelancer"]` and each header is rendered with `key={header}`. The first element has `key=""`, which is a valid but problematic React key — React may warn about this in development builds, and if the empty-string header is ever duplicated it will silently reuse the same DOM node. Use the index as key here since the list is static and will never reorder.

**Fix:**
```tsx
{COLUMN_HEADERS.map((header, i) => (
  <span key={i} ...>{header}</span>
))}
```

---

_Reviewed: 2026-05-27T11:09:42Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
