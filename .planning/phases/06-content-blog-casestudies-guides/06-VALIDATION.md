---
phase: 6
slug: content-blog-casestudies-guides
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-05-28
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | PHPUnit 12.5.x (backend) + TypeScript compiler (frontend) |
| **Config file** | `buildera-backend/phpunit.xml` |
| **Quick run command** | `php artisan test --filter=BlogPost` (backend); `npx tsc --noEmit` (frontend) |
| **Full suite command** | `php artisan test` (backend); `npm run build` (frontend) |
| **Estimated runtime** | ~30 seconds (backend), ~60 seconds (frontend build) |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit` (frontend); `php artisan route:list --path=api` (backend)
- **After every plan wave:** Run `npm run build` (frontend full build); `php artisan test` (backend)
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 90 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | ADM-04, REL-01 | — | N/A | smoke | `php artisan route:list --path=api` | ❌ W0 | ⬜ pending |
| 06-01-02 | 01 | 1 | ADM-08 | — | N/A | smoke | `php artisan route:list --path=api` | ❌ W0 | ⬜ pending |
| 06-02-01 | 02 | 1 | ADM-05 | — | N/A | smoke | `php artisan route:list --path=api` | ❌ W0 | ⬜ pending |
| 06-02-02 | 02 | 1 | ADM-06 | — | N/A | smoke | `php artisan route:list --path=api` | ❌ W0 | ⬜ pending |
| 06-02-03 | 02 | 1 | ADM-07 | — | N/A | smoke | `php artisan route:list --path=api` | ❌ W0 | ⬜ pending |
| 06-03-01 | 03 | 2 | CONT-01 | — | N/A | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 06-03-02 | 03 | 2 | CONT-02 | — | N/A | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 06-03-03 | 03 | 2 | CONT-08 | — | N/A | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 06-04-01 | 04 | 2 | CONT-03, CONT-04 | — | N/A | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 06-04-02 | 04 | 2 | CONT-05, CONT-06 | — | N/A | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 06-04-03 | 04 | 2 | CONT-07 | — | N/A | smoke (build) | `npm run build` | ❌ W0 | ⬜ pending |
| 06-04-04 | 04 | 2 | ADM-17, REL-06 | — | published_at enforced | unit | `php artisan test --filter=BlogPostController` | ❌ W0 | ⬜ pending |
| 06-05-01 | 05 | 3 | SEED-01 | — | N/A | manual | `php artisan db:seed` | ❌ W0 | ⬜ pending |
| 06-05-02 | 05 | 3 | SEED-02 | — | N/A | manual | `php artisan db:seed` | ❌ W0 | ⬜ pending |
| 06-05-03 | 05 | 3 | SEED-03 | — | N/A | manual | `php artisan db:seed` | ❌ W0 | ⬜ pending |
| 06-05-04 | 05 | 3 | SEED-04 | — | N/A | manual | `php artisan db:seed` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/Feature/BlogPostApiTest.php` — covers REL-06 (published_at enforcement on GET /api/blog-posts)
- [ ] `tests/Feature/ContentPaginationTest.php` — covers CONT-01 (12/page pagination, category filter)

*Frontend validation uses TypeScript compiler + `npm run build` — no additional test files needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Filament BlogPost saves with image, slug auto-generates, ISR fires | ADM-04, ADM-17 | Requires live Filament UI + running queue worker | Create post in /admin, check slug, check queue job dispatched |
| Seed data looks genuinely real and relevant | SEED-01 → SEED-04 | Subjective quality check | Run `php artisan db:seed`, review seeded posts/studies/guides in Filament |
| Mini lead form submits at scroll hotspot | CONT-02, CONT-04 | Requires browser scroll interaction | Load /blog/[slug], scroll to ~33%, submit mini form, verify lead in admin |
| ISR revalidation updates page after Filament save | ADM-17 | Requires running Next.js + queue worker | Edit blog post in Filament, check Next.js page refreshes within 5s |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 90s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
