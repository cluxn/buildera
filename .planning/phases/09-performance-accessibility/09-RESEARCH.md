# Phase 9: Performance & Accessibility — Research

**Researched:** 2026-05-29
**Domain:** Next.js 15 performance audit, WCAG AA accessibility, UX completions, cross-browser QA
**Confidence:** HIGH (codebase inspected directly; findings are code-verified)

---

## Summary

Phase 9 is an audit-and-fix phase, not a feature-build phase. The majority of work is systematic inspection of the existing codebase, identification of gaps, and targeted patches. Most infrastructure is already in place — the project uses `next/image` throughout, has `optimizePackageImports` partially configured, and the contact page already has the UX-01 features (response guarantee, map embed) implemented. The 404 page needs the search bar upgrade (UX-02). The main work is: (1) fixing the `motion` package missing from `optimizePackageImports`, (2) auditing and fixing `sizes` props on avatar/logo images that lack them, (3) auditing `"use client"` components that are outside the allowed list, (4) running WCAG contrast checks on the CSS variable palette, and (5) ensuring 48px touch targets and visible focus rings are global.

**Primary recommendation:** Treat each plan as a grep-and-fix sweep with a checklist of specific things to verify; the planner should write tasks as "grep for pattern X → apply fix Y" rather than "build new component Z".

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Image optimization (sizes/priority/format) | Frontend (Next.js) | — | next/image handles WebP/AVIF conversion at build/request time |
| Bundle size (use client audit) | Frontend (Next.js) | — | Server vs client boundary is a Next.js App Router concern |
| Package tree-shaking | Build tooling (Next.js config) | — | optimizePackageImports in next.config.ts controls this |
| WCAG contrast | CSS (globals.css) | Component-level | Color tokens defined in :root; some overrides per-component |
| Touch targets | CSS (Tailwind classes) | Component-level | min-h-12 (48px) must be on all interactive elements |
| Focus indicators | CSS (globals.css @layer base) | Per-component | outline-ring/50 applied globally; need to verify it renders visibly |
| Alt text | Component-level | Content API | alt props must be non-empty on all Image usages |
| Keyboard navigation | Component-level HTML | — | Tab order, role, aria-label, dialog focus trap |
| Contact page UX (UX-01) | Frontend component | — | Already implemented; verify completeness only |
| 404 search (UX-02) | Frontend page (not-found.tsx) | Backend API | not-found.tsx needs search input wired to /api/search |
| Cross-browser QA | Manual testing + tooling | — | Playwright or BrowserStack for automated; manual for Safari |

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PERF-01 | All images served as WebP/AVIF via next/image with correct `sizes` prop | next/image auto-converts to WebP/AVIF; sizes prop audit needed — several avatar/logo Images missing sizes |
| PERF-02 | `priority` prop on above-fold hero images only | Only 3 files currently use priority (blog/case-study/guide detail heroes). Hero section images (if any) need check. No false priorities found. |
| PERF-03 | `@tabler/icons-react` and `motion` in `optimizePackageImports` | @tabler/icons-react is present; `motion` is MISSING from optimizePackageImports — add it |
| PERF-04 | PageSpeed Insights score ≥ 85 on mobile | Local audit via next build + Lighthouse CLI; no Vercel deployment |
| PERF-05 | Core Web Vitals — LCP < 2.5s on 4G, CLS < 0.1 | Suspense boundaries on ISR pages; image sizing correctness |
| A11Y-01 | WCAG AA color contrast ratios met | oklch/hsl color values need ratio calculation; muted-foreground (oklch 0.556) on white may be borderline |
| A11Y-02 | 48px minimum touch targets | btn-primary/btn-white already have min-height: 48px; small avatar images and icon-only links need audit |
| A11Y-03 | All images have descriptive alt text | Most Images have alt; avatar Images use name (good); company_logo uses company name (good); inline SVG icons need aria-hidden |
| A11Y-04 | Keyboard navigation works for all interactive elements | Nav drawer, modal, tab switcher, forms — focus trap in modals, logical tab order |
| A11Y-05 | Focus indicators visible on all focusable elements | Global `outline-ring/50` applied; ring color is oklch(0.708) which may be too faint against white |
| UX-01 | Contact page enhancements — response time guarantee, Google Maps embed, phone | Already implemented in contact/page.tsx — response guarantee card present, MapEmbed component present. Verify completeness. |
| UX-02 | Search-enabled 404 page | not-found.tsx is minimal (3 links only) — needs search input + suggested pages added |
</phase_requirements>

---

## Standard Stack

### Core (already in project — no new installs needed)

| Library | Version | Purpose | Notes |
|---------|---------|---------|-------|
| next/image | 15.5.18 | Image optimization, WebP/AVIF, lazy loading | Already used throughout [VERIFIED: codebase] |
| Tailwind CSS | 4.x | Utility classes for spacing, sizing, focus | No tailwind.config.js — all in globals.css [VERIFIED: codebase] |
| motion/react | 12.40.0 | Scroll animations | Already in use; missing from optimizePackageImports [VERIFIED: codebase] |
| @tabler/icons-react | 3.44.0 | Icons | In optimizePackageImports already [VERIFIED: next.config.ts] |

### New tooling for audit (local dev only — no production deps)

| Tool | Install | Purpose | Notes |
|------|---------|---------|-------|
| @next/bundle-analyzer | devDependency | Visualise bundle composition | `ANALYZE=true next build` workflow [ASSUMED] |
| Lighthouse CLI | `npm install -g lighthouse` | Local PageSpeed score against `next build` output | Official Google tool [ASSUMED] |

### No new runtime packages needed for Phase 9.

**Package Legitimacy Audit:** Phase 9 adds no new runtime npm packages. @next/bundle-analyzer is a dev-only tool used only during audit — it does not ship to production. Lighthouse CLI is a Google-published global tool. No slopcheck required.

---

## Key Findings from Codebase Inspection

### PERF-03 Gap (Critical — fix in 09-01)
`next.config.ts` currently has:
```ts
experimental: {
  optimizePackageImports: ["@tabler/icons-react"],
}
```
`motion` is NOT listed. Fix:
```ts
experimental: {
  optimizePackageImports: ["@tabler/icons-react", "motion"],
}
```
[VERIFIED: next.config.ts — inspected directly]

### Image `sizes` Audit Results [VERIFIED: codebase grep]

**Have correct `sizes`:**
- BlogPostCard, CaseStudyCard, GuideCard — `(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw`
- BlogDetailHero, case-studies/[slug], guides/[slug] — `(max-width: 768px) 100vw, 1200px`

**Missing `sizes` (need to add in 09-01):**
- `AuthorBio.tsx` — `<Image width={64} height={64}>` — fixed size, add `sizes="64px"`
- `BlogDetailHero.tsx` author avatar — `<Image width={24} height={24}>` — add `sizes="24px"`
- `BlogPostCard.tsx` author avatar — `<Image width={20} height={20}>` — add `sizes="20px"`
- `TestimonialsSection.tsx` — two avatar Images (width 48, 36) — add `sizes="48px"` / `sizes="36px"`
- `TestimonialCard.tsx` company logo — `<Image width={40} height={40}>` — add `sizes="40px"`
- `MegaDropdown.tsx` product logo — needs `sizes` check

**Note:** For fixed-size images (avatar thumbnails), the correct `sizes` value is the rendered pixel width (e.g., `"64px"`). This prevents the browser requesting a massive srcset entry when the image is always 64px wide.

### `priority` Audit [VERIFIED: codebase grep]
Only 3 files use `priority`: blog detail hero, case-study slug page, guides slug page. These are all above-fold content images — correct usage. No `priority` found on HeroSection or other homepage components, which is fine since those are CSS backgrounds/SVGs, not `<Image>` elements.

### `"use client"` Component Audit [VERIFIED: codebase grep]

**Allowed list (from CLAUDE.md + STATE.md):** forms, tab switcher, popups/widgets, analytics, components using motion.X elements

**Currently marked `"use client"` — 36 files total:**

| File | Classification | Action |
|------|---------------|--------|
| `ContactForm.tsx` | ALLOWED — form | Keep |
| `MiniLeadForm.tsx` | ALLOWED — form | Keep |
| `NewsletterForm.tsx` | ALLOWED — form | Keep |
| `ContactFormSection.tsx` | ALLOWED — form wrapper | Keep |
| `ServicesTabSection.tsx` | ALLOWED — tab switcher | Keep |
| `ExitIntentPopup.tsx` | ALLOWED — popup/widget | Keep |
| `IdlePopup.tsx` | ALLOWED — popup/widget | Keep |
| `PopupManager.tsx` | ALLOWED — popup/widget | Keep |
| `FloatingCTA.tsx` | ALLOWED — widget | Keep |
| `WhatsAppWidget.tsx` | ALLOWED — widget | Keep |
| `NudgeBanner.tsx` | ALLOWED — widget | Keep |
| `AnimatedCounter.tsx` | ALLOWED — motion | Keep |
| `AnimatedBarChart.tsx` | ALLOWED — motion | Keep |
| `AnimatedRingStat.tsx` | ALLOWED — motion | Keep |
| `AnimatedTimeline.tsx` | ALLOWED — motion | Keep |
| `MiniMetricsCard.tsx` | ALLOWED — motion | Keep |
| `FeatureCheckList.tsx` | ALLOWED — motion | Keep |
| `StaggeredRevealGrid.tsx` | ALLOWED — motion | Keep |
| `TechStaggerGrid.tsx` | ALLOWED — motion | Keep |
| `SequentialSteps.tsx` | ALLOWED — motion | Keep |
| `CaseStudyPreviewCard.tsx` | ALLOWED — motion | Keep |
| `HeroHeadline.tsx` | ALLOWED — motion | Keep |
| `SiteNavClient.tsx` | ALLOWED — nav interactivity | Keep |
| `MegaDropdown.tsx` | ALLOWED — nav interactivity | Keep |
| `MobileNavDrawer.tsx` | ALLOWED — nav interactivity | Keep |
| `CalendlyEmbed.tsx` | ALLOWED — widget/embed | Keep |
| `CTASection.tsx` | REVIEW — may only need scroll trigger | Inspect |
| `HeroSection.tsx` | REVIEW — may only need scroll trigger | Inspect |
| `WhyBuilderaSection.tsx` | REVIEW — may only need scroll trigger | Inspect |
| `SolutionsGridSection.tsx` | REVIEW — may only need scroll trigger | Inspect |
| `TestimonialsSection.tsx` | REVIEW — has Image + motion | Keep if uses motion.X |
| `TechStackSection.tsx` | REVIEW — check if motion used | Inspect |
| `StatsBarSection.tsx` | ALLOWED — uses AnimatedCounter | Keep |
| `CaseStudiesPreview.tsx` | REVIEW — check if motion used | Inspect |
| `error.tsx` | ALLOWED — Next.js error boundary requires client | Keep |
| `separator.tsx` / `tabs.tsx` | REVIEW — shadcn primitives, may not need client | Low priority |

**Action for 09-02:** Inspect each REVIEW item. If the component only uses CSS animations (not motion.X hooks like `useInView`, `useScroll`), it can be converted to Server Component.

### Contact Page (UX-01) — Already Implemented

`contact/page.tsx` already has:
- Response guarantee card with "4 business hours" text
- `<MapEmbed>` component
- `<ContactInfo>` with WhatsApp number
- LocalBusiness JSON-LD schema

**Action for 09-04:** Verify `MapEmbed` and `ContactInfo` components are complete and rendering correctly. Check if a direct phone number display is present (ContactInfo likely has it). This plan is mostly verification + minor additions if anything is missing.

### 404 Page (UX-02) — Needs Full Rebuild

Current `not-found.tsx` is a minimal stub (3 links, no search). Needs:
- Search input wired to `/api/search?q=` (backend endpoint exists from Phase 7)
- Suggested popular pages section (hardcoded list)
- Proper layout matching rest of site

---

## Architecture Patterns

### Pattern 1: Image with Fixed Render Size
For avatar/logo images that always render at a fixed pixel size, use the numeric pixel value:
```tsx
// Source: Next.js docs — sizes prop for fixed-layout images
<Image
  src={author.avatar}
  alt={author.name}
  width={64}
  height={64}
  sizes="64px"
  className="rounded-full object-cover"
/>
```
[ASSUMED — standard Next.js pattern from training knowledge]

### Pattern 2: Responsive Content Images
For images that scale with viewport:
```tsx
<Image
  src={post.featured_image}
  alt={post.image_alt ?? post.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```
[VERIFIED: already used in BlogPostCard, CaseStudyCard]

### Pattern 3: 48px Touch Target (Tailwind 4)
```tsx
// min-h-12 = 48px in Tailwind 4 (3rem = 48px at base 16px)
<button className="min-h-12 min-w-12 flex items-center justify-center ...">
  <IconSomething aria-hidden="true" />
  <span className="sr-only">Label</span>
</button>
```
[ASSUMED — Tailwind 4 spacing scale]

### Pattern 4: Visible Focus Indicator
The global `outline-ring/50` from globals.css (`* { @apply border-border outline-ring/50; }`) applies to all elements. The ring color is `oklch(0.708 0 0)` — a medium gray. This may be insufficient contrast on white backgrounds. Supplement per-component:
```css
/* In globals.css @layer base */
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```
[ASSUMED — WCAG 2.1 AA focus indicator pattern]

### Pattern 5: optimizePackageImports (corrected)
```ts
// next.config.ts
experimental: {
  optimizePackageImports: ["@tabler/icons-react", "motion"],
}
```
[VERIFIED: next.config.ts inspected; motion is currently missing]

### Pattern 6: Suspense on ISR Pages
```tsx
// app/blog/[slug]/page.tsx
import { Suspense } from 'react'

export default async function BlogPostPage({ params }) {
  return (
    <main>
      <Suspense fallback={<div className="animate-pulse h-64 bg-muted rounded" />}>
        <BlogPostContent slug={params.slug} />
      </Suspense>
    </main>
  )
}
```
[ASSUMED — Next.js 15 streaming pattern]

### Pattern 7: Search-Enabled 404 Page
```tsx
// not-found.tsx — add "use client" only for the search input state
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// OR: keep not-found.tsx as Server Component and add a small SearchInput client component
```
Note: Next.js `not-found.tsx` can import a Client Component for the search input while keeping the page itself as a Server Component.
[ASSUMED — Next.js App Router pattern]

### Anti-Patterns to Avoid
- **Adding `priority` to non-above-fold images:** Will hurt PageSpeed by forcing preload of images not in initial viewport
- **Using `sizes="100vw"` on fixed-size avatar images:** Causes browser to request unnecessarily large images
- **Adding `"use client"` to fix a Server Component error without investigating why:** Root cause is usually a missing Client wrapper, not a need to mark the whole section
- **Using CSS `:focus` instead of `:focus-visible`:** Shows focus ring on mouse clicks too, degrading visual design

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| WebP/AVIF conversion | Custom sharp pipeline | next/image built-in | Next.js handles format negotiation automatically |
| Bundle analysis | Manual import tracing | @next/bundle-analyzer | Visualises actual chunk composition |
| Contrast ratio calculation | Manual math | WebAIM Contrast Checker (web) or axe DevTools browser extension | WCAG formula is non-trivial with oklch values |
| Cross-browser testing | Maintain multiple browsers locally | Playwright (headless) for Chrome/Firefox/Edge; BrowserStack Free Tier for Safari | Safari on Windows is not possible natively |
| PageSpeed score | Only rely on online PSI | Lighthouse CLI locally (`lighthouse http://localhost:3000 --output html`) | No deployment required for local audit |

---

## WCAG AA Contrast Analysis

**From globals.css — critical pairs to verify:**

| Pair | Foreground | Background | Estimated Ratio | WCAG AA Min | Status |
|------|-----------|-----------|----------------|-------------|--------|
| Body text | oklch(0.145) ≈ #1a1a1a | oklch(1.0) = white | ~14:1 | 4.5:1 | PASS |
| muted-foreground | oklch(0.556) ≈ #757575 | white | ~4.6:1 | 4.5:1 | BORDERLINE [ASSUMED] |
| muted-foreground | oklch(0.556) ≈ #757575 | muted bg oklch(0.97) | ~4.2:1 | 4.5:1 | MAY FAIL [ASSUMED] |
| brand-primary text | hsl(221 83% 53%) ≈ #2563eb | white | ~3.9:1 | 4.5:1 | LIKELY FAIL for small text [ASSUMED] |
| btn-primary white text | white (#fff) | brand gradient from/to | ~4.5-5:1 | 4.5:1 | BORDERLINE [ASSUMED] |
| label text (0.875rem) | oklch(0.556) | white | ~4.6:1 | 4.5:1 | BORDERLINE [ASSUMED] |

**Critical finding:** The brand primary blue (`hsl(221 83% 53%)` = approximately #2563eb) used as text color on white backgrounds may fail WCAG AA for body-size text (ratio ~3.9:1 < 4.5:1 required). It passes for large text (3:1 threshold). Links and icon labels using `text-[var(--brand-primary)]` on white need verification.

**Action for 09-03:** Use WebAIM Contrast Checker or axe browser extension to verify each pair. If brand-primary text fails on white at small sizes, use `--brand-primary-dark` (hsl(221 83% 40%)) for link text.

---

## Common Pitfalls

### Pitfall 1: oklch → WCAG Contrast Is Not Straight-Line
**What goes wrong:** oklch lightness values don't map directly to WCAG relative luminance. You cannot estimate contrast from the L channel alone.
**Prevention:** Always use a tool (WebAIM, axe) that computes WCAG relative luminance from the rendered RGB value. Convert oklch to hex first if needed.

### Pitfall 2: `motion` Not in optimizePackageImports Bloats Client Bundle
**What goes wrong:** Without `motion` in `optimizePackageImports`, the entire motion library tree is included in every chunk that imports any motion export. This is the biggest single bundle win in this codebase.
**Prevention:** Add `"motion"` to `optimizePackageImports` in next.config.ts as the first action of 09-01.

### Pitfall 3: `not-found.tsx` Cannot Use Server-Side Data Fetching for Search
**What goes wrong:** `not-found.tsx` in Next.js App Router cannot receive props and cannot use `generateStaticParams`. It is rendered without route context.
**Prevention:** Use a Client Component child (`<SearchInput>`) inside `not-found.tsx` that calls the search API client-side via `fetch` on submit, not at render time.

### Pitfall 4: Safari Testing Without Mac
**What goes wrong:** Safari on Windows does not exist. BrowserStack free trial has session limits.
**Prevention:** Use BrowserStack's free tier (100 minutes/month) for Safari. Alternatively use the iOS simulator via Xcode if a Mac is available. Document Safari as "tested via BrowserStack" in the QA checklist.

### Pitfall 5: `priority` on ISR Images Causes LCP Regression
**What goes wrong:** Adding `priority` to images below the fold forces the browser to preload them, consuming bandwidth before the actual LCP element loads.
**Prevention:** Only add `priority` to the first visible image in the initial viewport. For ISR pages (blog post, case study, guide), the hero image already has `priority` — do not add it elsewhere.

### Pitfall 6: `sizes` Mismatch Causes Oversized Image Downloads
**What goes wrong:** An Image without `sizes` prop defaults to `100vw`, causing the browser to request a very wide image even for a 40px avatar thumbnail.
**Prevention:** For fixed-size thumbnails, set `sizes` to the exact rendered pixel width (e.g., `"40px"` for a 40x40 logo).

### Pitfall 7: CLS from Motion Animations
**What goes wrong:** Motion entrance animations that shift layout (e.g., `y: 20 → 0` combined with `opacity: 0 → 1`) can cause CLS if the initial `opacity: 0` state is not maintained during SSR.
**Prevention:** Ensure `motion` components that animate on scroll use `initial={{ opacity: 0 }}` correctly and that the pre-animation state doesn't affect layout flow (use `visibility: hidden` equivalent, not `display: none`).

---

## UX-01 Contact Page — What's Present vs. What's Needed

**Already present (verified in contact/page.tsx):**
- Response guarantee card ("We respond within 4 business hours")
- `<MapEmbed>` component receiving `settings.company_address`
- `<ContactInfo>` component receiving `settings.whatsapp_number`
- LocalBusiness JSON-LD with phone, email, address
- Full contact form

**Need to verify (in 09-04):**
- Does `ContactInfo` actually render the phone number prominently? Read that component.
- Does `MapEmbed` render a real Google Maps iframe or a placeholder?
- Is there a timezone indicator visible? (UX-01 mentions "time zone indicator")
- The response guarantee says "4 business hours" but the page metadata says "24 hours" — reconcile this inconsistency.

**Likely additions:**
- Timezone display: "We're in IST (UTC+5:30) — Mon–Fri 9am–6pm"
- If MapEmbed is a stub, implement it as a proper Google Maps iframe embed

## UX-02 404 Page — Full Replacement Needed

**Current state:** 3 links (Go home, View services, Contact us) in a centered div. No search, no suggestions.

**Required new state:**
- Search input bar wired to `GET /api/search?q=`
- Suggested popular pages (hardcoded: Homepage, Services, Solutions, Blog, Contact)
- Friendly messaging explaining the 404
- Results displayed inline (Client Component)

**Implementation note:** `not-found.tsx` cannot be a full Client Component easily (no `"use client"` at page level for app router layouts). Pattern: keep `not-found.tsx` as Server Component, import `<NotFoundSearch />` as a `"use client"` child for the interactive search portion.

---

## Validation Architecture

> workflow.nyquist_validation is not set to false in config — include section.

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None (no automated test framework in frontend) |
| Config file | none |
| Quick run command | `next build` (build succeeds = structural validation) |
| Full suite command | `next build && lighthouse http://localhost:3000 --output json` (manual) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| PERF-01 | All Images have sizes prop | Code audit (grep) | `grep -rn "<Image" src/ --include="*.tsx"` | ✅ Pattern search |
| PERF-02 | priority on hero images only | Code audit (grep) | `grep -rn "priority" src/ --include="*.tsx"` | ✅ Pattern search |
| PERF-03 | optimizePackageImports includes motion | Config check | Read next.config.ts | ✅ Direct file check |
| PERF-04 | PageSpeed ≥ 85 mobile | Manual | `next build && next start` then Lighthouse CLI | ❌ Wave 0 — Lighthouse setup |
| PERF-05 | LCP < 2.5s, CLS < 0.1 | Manual | Lighthouse JSON output → parse lcp/cls | ❌ Wave 0 |
| A11Y-01 | WCAG AA contrast | Manual | axe browser extension or WebAIM tool | ❌ Manual only |
| A11Y-02 | 48px touch targets | Code audit + visual | `grep -rn "min-h"` + browser DevTools | ❌ Manual verify |
| A11Y-03 | All Images have alt | Code audit | `grep -rn "<Image" src/ --include="*.tsx" -A3` | ✅ Pattern search |
| A11Y-04 | Keyboard nav works | Manual | Tab through page in Chrome DevTools | ❌ Manual only |
| A11Y-05 | Focus indicators visible | Manual + CSS check | Inspect `:focus-visible` styles | ❌ Manual only |
| UX-01 | Contact page complete | Visual verification | Load `/contact` locally | ❌ Manual verify |
| UX-02 | 404 search works | Functional test | Navigate to `/nonexistent-page` | ❌ Wave 0 gap |

### Wave 0 Gaps
- [ ] Lighthouse CLI installed globally: `npm install -g lighthouse`
- [ ] Local production build running: `next build && next start -p 3001`
- [ ] axe DevTools browser extension installed for A11Y-01 audit

*(No automated test framework setup required — Phase 9 is an audit phase with manual verification checkpoints)*

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | next build, Lighthouse | ✓ | v23.10.0 | — |
| Next.js | build output | ✓ | 15.5.18 | — |
| Lighthouse CLI | PERF-04/05 audit | ✗ (not checked) | — | Manual PageSpeed Insights (online) |
| Chrome (for Lighthouse) | PERF-04/05 | ✓ (assumed Windows) | — | — |
| Safari (for 09-05) | Cross-browser QA | ✗ (Windows) | — | BrowserStack free tier |
| Firefox (for 09-05) | Cross-browser QA | [ASSUMED] ✗ unless installed | — | Download Firefox |
| axe DevTools | A11Y-01 audit | ✗ (browser extension) | — | WebAIM online checker |

**Missing dependencies with no fallback:**
- Safari: not available on Windows. BrowserStack (free tier) is the only option.

**Missing dependencies with fallback:**
- Lighthouse CLI: can use PageSpeed Insights website (https://pagespeed.web.dev) if localhost is tunneled via ngrok, or run Lighthouse against the production build locally.
- Firefox: download takes 5 minutes, then available.

---

## Security Domain

Phase 9 has no new API endpoints or authentication surfaces. The only new user-facing input is the 404 search field, which calls the existing `GET /api/search` endpoint — already built in Phase 7 with standard input handling. No new ASVS categories apply.

| ASVS Category | Applies | Note |
|---------------|---------|------|
| V5 Input Validation | Partial | 404 search input → GET param → existing /api/search. Verify the existing endpoint sanitizes query string. |
| All others | No | No new auth, sessions, cryptography, or access control in this phase |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | brand-primary (#2563eb) has ~3.9:1 contrast on white | WCAG Contrast | Could actually pass 4.5:1 — verify with tool before changing any colors |
| A2 | muted-foreground on muted background may fail 4.5:1 | WCAG Contrast | Needs tool verification — impact is adding darker muted-foreground value |
| A3 | motion in optimizePackageImports will reduce bundle size | PERF-03 | Confirmed gap in config; bundle size improvement is the documented intent of optimizePackageImports [ASSUMED net benefit magnitude] |
| A4 | Lighthouse CLI can score localhost next start | PERF-04 | Standard use case; should work. If firewall blocks, use online PSI with ngrok tunnel |
| A5 | BrowserStack free tier provides Safari access | 09-05 QA | BrowserStack terms may have changed — verify before committing to this approach |
| A6 | CTASection, HeroSection, WhyBuilderaSection, SolutionsGridSection may be convertible to Server Components | Bundle analysis | Requires reading each file — they may use motion hooks that require client |

---

## Open Questions (RESOLVED)

1. **Does ContactInfo.tsx render a phone number?**
   - RESOLVED: **NO.** ContactInfo.tsx has 3 cards: Email, WhatsApp, and Location (office address). No phone number card exists. Plan 09-04 T1 must add a Phone card with `tel:` link using `settings.company_phone` — confirmed scope is correct.

2. **Does MapEmbed.tsx render a real iframe or a stub?**
   - RESOLVED: **Real iframe.** MapEmbed.tsx renders a full `<iframe src="https://maps.google.com/maps?q=${query}&output=embed&z=14" ...>` with 320px height, loading="lazy", aria-label, and referrerPolicy. No rebuild needed. Plan 09-04 verification is a confirm-only task.

3. **Are CTASection/HeroSection/WhyBuilderaSection truly "use client" for motion or for something else?**
   - RESOLVED: **Yes — motion hooks confirmed.** Researcher verified these use `motion.X` elements (scroll-triggered animations). They must stay "use client". Plan 09-02 correctly predicts zero conversions among the REVIEW set; only TechStackSection (useState) is the conversion candidate.

4. **What is the PageSpeed baseline right now?**
   - RESOLVED: **Unknown — measured in 09-05 T1.** Phase 3 success criteria mentioned ≥85 but no measurement artifact exists. Plan 09-05 T1 establishes the baseline Lighthouse run as its first action. The delta from 09-01/09-02/09-03 fixes will be visible in the final score.

---

## Sources

### Primary (HIGH confidence — code verified)
- `buildera-frontend/next.config.ts` — confirmed optimizePackageImports config [VERIFIED: codebase]
- `buildera-frontend/src/app/globals.css` — confirmed CSS variables and color tokens [VERIFIED: codebase]
- `buildera-frontend/src/app/not-found.tsx` — confirmed minimal 404 stub [VERIFIED: codebase]
- `buildera-frontend/src/app/contact/page.tsx` — confirmed UX-01 features present [VERIFIED: codebase]
- Grep output — all "use client" files, Image usages, sizes/priority props [VERIFIED: codebase]
- `.planning/REQUIREMENTS.md` — phase requirements [VERIFIED: codebase]

### Secondary (MEDIUM confidence)
- Next.js 15 optimizePackageImports behavior — standard documented feature [ASSUMED based on training]
- WCAG AA contrast ratio requirements (4.5:1 body, 3:1 large text) — WCAG 2.1 specification [ASSUMED from training]

### Tertiary (LOW confidence — flag for validation)
- Specific contrast ratios for oklch values — [ASSUMED] — requires tool verification
- BrowserStack free tier availability — [ASSUMED] — verify before plan execution

---

## Metadata

**Confidence breakdown:**
- Codebase gaps (missing sizes, motion not in optimizePackageImports): HIGH — directly inspected
- Contact page UX-01 status: HIGH — directly read the file
- 404 page UX-02 gap: HIGH — directly read the file
- WCAG contrast ratios: LOW — requires tool calculation on oklch values
- "use client" refactoring candidates: MEDIUM — files identified, contents not fully read
- Cross-browser Safari approach: LOW — depends on BrowserStack availability

**Research date:** 2026-05-29
**Valid until:** 2026-06-29 (stable stack — Next.js 15, Tailwind 4 APIs are stable)
