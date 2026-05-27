---
phase: 02-backend-core
plan: 05
subsystem: api
tags: [laravel, isr, revalidation, hmac, content-observer, nextjs, queued-jobs]

# Dependency graph
requires:
  - phase: 02-backend-core
    plan: 04
    provides: AppServiceProvider observer pattern, queued jobs, BlogPost/CaseStudy/Guide/Testimonial models

provides:
  - RevalidationJob (ShouldQueue) — HMAC-signed POST to Next.js revalidate endpoint; no-op if env missing; re-throws for queue retry
  - ContentObserver — registered for BlogPost, CaseStudy, Guide, Testimonial; fires RevalidationJob on saved/deleted; wraps in try/catch
  - POST /api/revalidate (Laravel) — HMAC-verified with hash_equals(), 401/422/200 responses
  - POST /api/revalidate (Next.js) — crypto.timingSafeEqual HMAC check, calls revalidateTag(tag)
  - NEXTJS_REVALIDATE_SECRET added to required env vars in AppServiceProvider (boot fails if missing)

affects:
  - 03-xx (Next.js content pages use revalidateTag() — cache purged automatically on admin save)
  - deploy (NEXTJS_REVALIDATE_URL and NEXTJS_REVALIDATE_SECRET must be set in both .env files)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ContentObserver try/catch — observer failure must never crash the admin Filament save
    - RevalidationJob re-throws exceptions so queue worker retries with backoff
    - hash_equals() in PHP + crypto.timingSafeEqual() in Node — timing-safe HMAC comparison on both sides
    - Buffer.from(expected).length check before timingSafeEqual prevents length-mismatch panic

key-files:
  created:
    - buildera-backend/app/Jobs/RevalidationJob.php
    - buildera-backend/app/Observers/ContentObserver.php
    - buildera-backend/app/Http/Controllers/Api/RevalidateController.php
    - buildera-frontend/src/app/api/revalidate/route.ts
  modified:
    - buildera-backend/app/Providers/AppServiceProvider.php
    - buildera-backend/routes/api.php

key-decisions:
  - "RevalidationJob uses env() directly (not config()) for NEXTJS_REVALIDATE_URL and NEXTJS_REVALIDATE_SECRET — these are not in a config file, env() is correct here"
  - "ContentObserver uses Throwable (not Exception) catch — catches PHP fatal errors too, preventing any observer crash from surfacing in Filament"
  - "Buffer length check added before timingSafeEqual in Next.js route — timingSafeEqual panics if buffers differ in length, so we guard it with an early-out"
  - "POST /api/revalidate has no throttle middleware — HMAC is the security layer; adding throttle would block legitimate high-frequency revalidations"

# Metrics
duration: ~5min
completed: 2026-05-27
---

# Phase 02 Plan 05: ISR Revalidation Pipeline Summary

**Full ISR pipeline: ContentObserver fires RevalidationJob (HMAC-signed) on admin save; POST /api/revalidate in both Laravel (HMAC verifier) and Next.js (revalidateTag caller) — saving a BlogPost in Filament purges the Next.js cache within seconds**

## Performance

- **Duration:** ~5 min
- **Started:** 2026-05-27T00:46:27Z
- **Completed:** 2026-05-27
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments

- RevalidationJob: HMAC-signs payload with hash_hmac('sha256'), no-op if env vars missing, re-throws Exception for queue retry backoff
- ContentObserver: getTag() maps BlogPost/CaseStudy/Guide/Testimonial to ISR cache tags; saved() and deleted() both fire RevalidationJob; entire methods wrapped in try/catch (Throwable) so observer failure never propagates to Filament admin
- AppServiceProvider: ContentObserver registered for all 4 publishable models; NEXTJS_REVALIDATE_SECRET added to required env vars array (boot fails fast if missing)
- RevalidateController (Laravel): hash_equals() timing-safe HMAC verification, 401 on invalid signature, 422 on missing tag, 200 on success
- POST /api/revalidate route: no middleware (HMAC is the security layer)
- Next.js route.ts: crypto.timingSafeEqual with length guard, calls revalidateTag(tag), 401/422/200 responses
- .env.local created locally (gitignored) with dev-revalidate-secret matching backend .env

## Task Commits

Each task was committed atomically:

1. **Task 1: RevalidationJob and ContentObserver** — `8b12cce` (feat)
2. **Task 2: POST /api/revalidate endpoint with HMAC verification** — `0288d6a` (feat)
3. **Task 3: Frontend revalidation endpoint scaffold** — `e7bc8a9` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `buildera-backend/app/Jobs/RevalidationJob.php` — ShouldQueue, HMAC-signed POST to NEXTJS_REVALIDATE_URL, no-op guard, re-throws for retry
- `buildera-backend/app/Observers/ContentObserver.php` — getTag() map for 4 models, saved/deleted fire RevalidationJob, Throwable try/catch
- `buildera-backend/app/Http/Controllers/Api/RevalidateController.php` — hash_equals() HMAC check, 401/422/200 responses
- `buildera-backend/app/Providers/AppServiceProvider.php` — NEXTJS_REVALIDATE_SECRET in required vars, ContentObserver registered x4
- `buildera-backend/routes/api.php` — POST /api/revalidate added, no middleware
- `buildera-frontend/src/app/api/revalidate/route.ts` — crypto.timingSafeEqual, revalidateTag(tag), 401/422/200

## Decisions Made

- RevalidationJob uses `env()` directly for NEXTJS_REVALIDATE_URL/SECRET — these are not in a config file; `env()` is correct outside of `config/` files.
- ContentObserver catches `Throwable` (not `Exception`) — ensures PHP fatal errors also cannot surface through the observer into the Filament save flow.
- Buffer length check before `crypto.timingSafeEqual()` in Next.js route — Node.js panics with a TypeError if the two Buffers differ in length; the guard converts a potential 500 into a clean 401.
- POST /api/revalidate has no throttle middleware — HMAC signature is the security control; throttle would block legitimate automated revalidations during bulk content saves.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added buffer length guard before timingSafeEqual in Next.js route**
- **Found during:** Task 3 (implementing route.ts)
- **Issue:** Plan specified `crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))` directly. Node.js throws a TypeError if the two buffers have different lengths (e.g., attacker sends a 1-char signature). This would produce a 500 instead of 401.
- **Fix:** Added `signature.length !== expected.length` early-out check before calling timingSafeEqual.
- **Files modified:** buildera-frontend/src/app/api/revalidate/route.ts
- **Committed in:** e7bc8a9 (Task 3 commit)

**2. [Rule 1 - Bug] Used Throwable instead of Exception in ContentObserver**
- **Found during:** Task 1 (implementing ContentObserver)
- **Issue:** Plan specified `\Exception` catch. PHP fatal errors (e.g., class not found) implement `\Throwable` not `\Exception`, so they would escape the catch and crash the Filament save.
- **Fix:** Changed catch clause to `\Throwable $e` for complete coverage.
- **Files modified:** buildera-backend/app/Observers/ContentObserver.php
- **Committed in:** 8b12cce (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (Rule 2 - security correctness, Rule 1 - bug fix)
**Impact on plan:** No scope change. Both fixes improve robustness without changing the API surface.

## Full Phase 2 API Surface (Complete)

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | /api/settings | None | Build-time cache |
| GET | /api/blog-posts | None | ISR |
| GET | /api/blog-posts/{slug} | None | ISR |
| GET | /api/case-studies | None | ISR |
| GET | /api/guides | None | ISR |
| GET | /api/testimonials | None | ISR |
| POST | /api/leads | X-API-Key + throttle:5,60 | Lead capture |
| POST | /api/subscribers | throttle:3,60 | Newsletter |
| GET | /api/unsubscribe | Token param | Idempotent |
| POST | /api/revalidate | HMAC signature | ISR trigger |

## Known Stubs

None — all pipeline components wire to real env vars and real Next.js/queue infrastructure.

## Threat Flags

None — POST /api/revalidate uses timing-safe HMAC on both the Laravel and Next.js sides. No new unauthenticated endpoints introduced.

## User Setup Required

At deploy time:
1. Set `NEXTJS_REVALIDATE_SECRET` in both `buildera-backend/.env` and `buildera-frontend/.env.local` (same value)
2. Set `NEXTJS_REVALIDATE_URL=https://buildera.co/api/revalidate` in `buildera-backend/.env`
3. `php artisan queue:work` must be running — RevalidationJob is queued, not synchronous

## Next Phase Readiness

- Phase 03 (Next.js frontend) can now wire `revalidateTag('blog_posts')` etc. on content fetch calls
- Any admin save in Filament for BlogPost, CaseStudy, Guide, or Testimonial will auto-trigger ISR purge via the queue
- No blockers for remaining backend phases or frontend phases

---
*Phase: 02-backend-core*
*Completed: 2026-05-27*
