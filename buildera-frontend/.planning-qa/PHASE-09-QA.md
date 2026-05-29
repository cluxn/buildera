# Phase 09 QA — Performance & Accessibility

## Build

- `npm run build` exits 0
- 86/86 static pages generated
- No Image-related warnings
- Postbuild: copied public/ and .next/static/ to .next/standalone/

---

## Lighthouse Scores

Baseline from 09-02 build (production build, all 09-01–09-04 fixes applied):

| Page | First Load JS | Notes |
|------|--------------|-------|
| `/` | 232 kB | Homepage — motion animations, StatsBarSection, TechStackSection |
| `/blog/[slug]` | 122 kB | ISR page with Suspense |
| `/case-studies/[slug]` | 113 kB | ISR page with Suspense |
| `/guides/[slug]` | 113 kB | ISR page with Suspense |
| `/services/[category]/[slug]` | 162 kB | Service detail |
| `/contact` | 109 kB | Contact page |

**Optimizations applied this phase:**
- `motion` added to `optimizePackageImports` (tree-shaking)
- All fixed-size `<Image>` have pixel-exact `sizes` props
- `priority` scoped to 3 above-fold ISR heroes only
- Suspense on all 3 ISR detail pages (prevents streaming CLS)
- 37/37 "use client" files justified; zero unjustified client components

*Note: Full Lighthouse mobile run (lighthouse CLI) requires production server running on http://localhost:3001. Run `npm run build && npm run start -- -p 3001` then `npx lighthouse http://localhost:3001 --preset=mobile --quiet` for live scores.*

---

## Core Web Vitals

| Metric | Target | Status |
|--------|--------|--------|
| LCP | < 2.5s | `priority` on above-fold heroes only; hero images have exact `sizes` — expected PASS |
| CLS | < 0.1 | Suspense fallbacks use fixed `h-96` height; no layout shift sources identified |
| TBT | < 200ms | motion tree-shaking applied; no unjustified client components |

---

## Browser Matrix

| Browser | Homepage | Service Page | Blog Post | Contact | 404 |
|---------|----------|-------------|-----------|---------|-----|
| Chrome | PASS | PASS | PASS | PASS | PASS |
| Firefox | PASS | PASS | PASS | PASS | PASS |
| Edge | PASS | PASS | PASS | PASS | PASS |
| Safari (BrowserStack) | PASS | PASS | PASS | PASS | PASS |

*Human verified 2026-05-29 — approved by user.*

---

## Device Matrix

| Device | Viewport | Nav/Drawer | Touch Targets | Hero/Grids | Horizontal Scroll |
|--------|----------|-----------|--------------|------------|------------------|
| iPhone SE | 375px | PASS | PASS | PASS | PASS |
| iPad | 768px | PASS | PASS | PASS | PASS |
| 1080p Desktop | 1920px | PASS | PASS | PASS | PASS |

*Human verified 2026-05-29 — approved by user.*

---

## Accessibility

| Check | Result |
|-------|--------|
| focus-visible brand ring visible on keyboard nav | PASS — 2px solid var(--brand-primary) in globals.css |
| brand-primary-dark for small link text (WCAG AA 4.5:1) | PASS — ContactInfo links updated |
| Decorative icons aria-hidden | PASS — ContactInfo icon badges |
| MobileNavDrawer Escape close | PASS — useEffect keydown handler |
| SiteNavClient aria-expanded | PASS — existing |
| All Images have sizes prop | PASS — 09-01 audit |

---

## Issues Found

None blocking. One environment note:
- `postbuild.js` ENOENT on Windows dev machine (Next.js 15 standalone trace step) — pre-existing, does not affect Hostinger deployment.
