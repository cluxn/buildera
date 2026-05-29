---
phase: 9
phase_slug: performance-accessibility
date: 2026-05-29
nyquist_validation: true
---

# Phase 9: Performance & Accessibility — Validation Strategy

## Test Framework

| Property | Value |
|----------|-------|
| Framework | None (no automated test framework in frontend) |
| Quick run command | `cd buildera-frontend && npx tsc --noEmit` |
| Build command | `cd buildera-frontend && npm run build` |
| Perf audit command | `next build && next start -p 3001` + Lighthouse CLI |

---

## Requirement → Test Map

| Req ID | Behavior to verify | Test type | Command / method |
|--------|-------------------|-----------|-----------------|
| PERF-01 | All `<Image>` have `sizes` prop | Code audit | `grep -rn "<Image" src/ --include="*.tsx"` — every match must have `sizes=` |
| PERF-02 | `priority` only on above-fold hero images | Code audit | `grep -rn "priority" src/ --include="*.tsx"` — verify max 3 files, all hero page-level |
| PERF-03 | `motion` in `optimizePackageImports` | Config check | Read `next.config.ts` — both `@tabler/icons-react` AND `motion` must be listed |
| PERF-04 | PageSpeed Insights ≥ 85 mobile | Manual Lighthouse | `lighthouse http://localhost:3001 --form-factor=mobile --output=json` → performance score ≥ 0.85 |
| PERF-05 | LCP < 2.5s, CLS < 0.1 | Lighthouse JSON | Parse `audits.largest-contentful-paint.numericValue` < 2500 and `audits.cumulative-layout-shift.numericValue` < 0.1 |
| A11Y-01 | WCAG AA contrast on all text/bg pairs | axe / manual | Run axe DevTools on homepage, service page, contact page — zero contrast errors |
| A11Y-02 | 48px touch targets on mobile interactives | Code + visual | `grep -rn "min-h"` in nav/form/button components; Chrome DevTools device toolbar verify |
| A11Y-03 | All images have descriptive alt text | Code audit | `grep -rn "<Image" src/ --include="*.tsx" -A5` — every match must have non-empty `alt=` |
| A11Y-04 | Keyboard navigation works | Manual | Tab through: nav mega dropdown, mobile drawer, contact form, search — all reachable without mouse |
| A11Y-05 | Focus indicators visible | CSS + visual | `:focus-visible` has `outline-offset` ≥ 2px and ring color contrast ≥ 3:1 against backgrounds |
| UX-01 | Contact page has phone + timezone + response guarantee | Visual | Load `/contact` locally — three cards (Email, WhatsApp, Phone), timezone badge, response copy consistent |
| UX-02 | 404 page has search input wired to `/search` | Functional | Navigate to `/nonexistent-page` — search input renders; typing + submit navigates to `/search?q=...` |

---

## Wave 0 Prerequisites

Before executing any plan:
- [ ] `npm run build` passes in `buildera-frontend/` with zero errors
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] Lighthouse CLI available: `npm install -g lighthouse` (or use online PageSpeed Insights)
- [ ] axe DevTools browser extension installed for A11Y-01 audit

---

## Verification Gates by Plan

| Plan | Gate | Command |
|------|------|---------|
| 09-01 | PERF-01/02/03 | grep audit + next.config.ts read |
| 09-02 | PERF-04/05 partial | `npm run build` succeeds; Suspense boundaries added |
| 09-03 | A11Y-01→05 | axe DevTools zero errors + grep touch targets + focus ring CSS |
| 09-04 | UX-01/02 | Load /contact + navigate to /nonexistent-page |
| 09-05 | PERF-04/05 final | Lighthouse score ≥ 85 mobile; LCP < 2.5s; CLS < 0.1 |

---

## Known Gaps

| Gap | Risk | Mitigation |
|-----|------|-----------|
| Safari not available on Windows | 09-05 cross-browser incomplete | BrowserStack free tier; document in QA report |
| Lighthouse against localhost (not CDN) | Score may differ from production | Run on production after Hostinger deploy in Phase 10 |
| A11Y-01 manual only (no CLI tool) | Contrast gaps may be missed | axe DevTools + WebAIM Contrast Checker on brand palette |
