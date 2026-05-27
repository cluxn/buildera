---
phase: 4
slug: services-solutions-pages
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-27
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Next.js build validation (no test runner installed in project) |
| **Config file** | none — build-level validation only |
| **Quick run command** | `npm run build` (in buildera-frontend/) |
| **Full suite command** | `npm run build` + manual spot-check of 3 pages |
| **Estimated runtime** | ~60–90 seconds |

---

## Sampling Rate

- **After every task commit:** TypeScript check passes (`npm run build` or `npx tsc --noEmit`)
- **After every plan wave:** Run `npm run build` — static generation must complete with 0 errors
- **Before `/gsd:verify-work`:** Full build + manual spot-check of service + solution + social proof pages
- **Max feedback latency:** 90 seconds (build) / 5 minutes (manual spot-check)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|--------|
| 04-01-01 | 01 | 1 | SVC-03 | — | N/A | build | `npm run build` | ⬜ pending |
| 04-01-02 | 01 | 1 | SVC-03, COMP-05 | — | N/A | build | `npx tsc --noEmit` | ⬜ pending |
| 04-01-03 | 01 | 1 | SVC-01, SVC-02 | — | N/A | build | `npm run build` | ⬜ pending |
| 04-02-01 | 02 | 2 | SVC-04 | — | N/A | build | `npm run build` | ⬜ pending |
| 04-03-01 | 03 | 2 | SVC-05, SVC-06 | — | N/A | build | `npm run build` | ⬜ pending |
| 04-04-01 | 04 | 2 | SVC-07, SVC-08 | — | N/A | build | `npm run build` | ⬜ pending |
| 04-05-01 | 05 | 3 | SVC-09, SOL-01, SOL-02, SOL-03 | — | N/A | build | `npm run build` | ⬜ pending |
| 04-06-01 | 06 | 4 | TRUST-06 | T-04-01 | `getEmbedUrl()` returns null for non-YouTube/Vimeo URLs | manual | manual dev-server check | ⬜ pending |
| 04-06-02 | 06 | 4 | COMP-04 | T-04-01 | iframe only for YouTube/Vimeo allowlist | manual | manual dev-server check | ⬜ pending |
| 04-06-03 | 06 | 4 | TRUST-06 | — | N/A | CLI | `php artisan db:seed --class=CaseStudySeeder && php artisan db:seed --class=TestimonialSeeder` | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

No test framework installation required — project uses `npm run build` as the primary validation gate.

The following stubs are needed in Wave 1 (04-01) before other plans can validate:

- [ ] `src/types/service-page.ts` — TypeScript interfaces (`ServicePageData`, `SolutionPageData`, `TestimonialData`, `CaseStudyData`)
- [ ] `src/data/services/index.ts` — stub returning empty arrays (enables `npm run build` to pass before data files are filled)
- [ ] `src/data/solutions/solutions.ts` — stub returning empty array

*If stubs return empty arrays, `generateStaticParams` returns zero pages — build passes with no pages generated. Each subsequent data file fills in pages incrementally.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Testimonials appear on service detail page | TRUST-06 | Requires seeded backend + running dev server | Start backend + frontend dev servers; visit `/services/website-development/custom-websites`; verify testimonials section renders with 1-2 entries |
| Case study appears on service detail page | TRUST-06 | Requires seeded backend + running dev server | Same page as above; verify case study section renders with client name + results |
| Video embed renders for YouTube URL | COMP-04 | Requires visual inspection | Set `videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'` on one service page data; verify iframe renders between process and industries sections |
| Video embed hidden when `videoUrl` absent | COMP-04 | Visual regression | Verify section is absent on pages without `videoUrl` field |
| Stagger animation triggers on scroll | COMP-05, DESIGN-07 | Requires browser | Scroll to TechShowcase; verify logos appear in staggered sequence (60ms per logo) |
| Ring stat animates on scroll into view | DESIGN-06 | Requires browser | Scroll to service hero; verify ring draws and counter counts up |
| Sequential steps animate in order | DESIGN-07 | Requires browser | Scroll to process section; verify each step reveals with connector line drawing |
| Breadcrumb trail shows correct hierarchy | NAV-07 | Visual check | Visit `/services/website-development/custom-websites`; verify breadcrumb shows `Home > Services > Website Development > Custom Website Development` |
| Graceful empty state — no crash on zero testimonials | TRUST-06 | Build-time check | Page must render without error even if testimonials API returns empty array |

---

## Threat-Specific Verifications

| Threat | Vector | Verification |
|--------|--------|-------------|
| T-04-01: iframe injection via `videoUrl` | Data file `videoUrl` field accepts arbitrary string | `getEmbedUrl('https://evil.com/xss')` must return `null`; verify with manual test in dev |
| T-04-02: XSS via marketing copy | TypeScript strings rendered in JSX | React auto-escapes; no `dangerouslySetInnerHTML` used — confirm no exceptions in code review |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify (build) or documented manual verification
- [ ] Sampling continuity: every plan wave ends with `npm run build`
- [ ] Wave 0 stubs (type interfaces + data file stubs) are 04-01's first deliverable
- [ ] No watch-mode flags used in build commands
- [ ] Feedback latency < 90 seconds per build
- [ ] `nyquist_compliant: true` set in frontmatter when sign-off is complete

**Approval:** pending
