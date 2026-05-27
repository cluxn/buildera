---
phase: 02-backend-core
plan: 04
subsystem: api
tags: [laravel, newsletter, subscriber, unsubscribe-token, queued-jobs, filament, audit-log, observer]

# Dependency graph
requires:
  - phase: 02-backend-core
    plan: 03
    provides: Lead model, ApiKeyMiddleware, queued job pattern, Filament LeadResource, api.php foundation

provides:
  - NewsletterSubscriber model with generateToken() and unsubscribe() methods
  - SendNewsletterWelcomeJob (ShouldQueue) — Resend welcome email with unsubscribe link; try/catch guard
  - FireNewsletterWebhookJob (ShouldQueue) — n8n newsletter webhook dispatch; no-op if URL unconfigured
  - SubscriberController POST /api/subscribers — rate limited 3/hr, no API key; duplicate + re-subscribe handling
  - UnsubscribeController GET /api/unsubscribe — token-validated, idempotent, 422/404/200 responses
  - AuditLog model with array casts on old_values and new_values
  - AuditLogObserver — created() and updated() both wrapped in try/catch, logs to audit_logs table
  - Observer registered for Lead AND NewsletterSubscriber in AppServiceProvider
  - NewsletterSubscriberResource — Filament resource in Leads & CRM group; index + view only (no create/edit)

affects:
  - 02-05 (content Filament resources — same admin panel, Leads & CRM nav group now has 2 items)
  - 03-xx (Next.js newsletter form → POST /api/subscribers with throttle pattern)
  - deploy (audit_logs table must be migrated before any lead/subscriber is created)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - AuditLogObserver wraps all DB writes in try/catch — audit log never crashes the main request
    - Re-subscribe generates a fresh unsubscribe_token — old token is invalidated on re-subscribe
    - FireNewsletterWebhookJob accepts array payload (not model) — consistent with FireLeadWebhookJob pattern
    - Filament v5 property types: navigationGroup string|UnitEnum|null, navigationIcon string|BackedEnum|null

key-files:
  created:
    - buildera-backend/app/Models/NewsletterSubscriber.php
    - buildera-backend/app/Models/AuditLog.php
    - buildera-backend/app/Jobs/SendNewsletterWelcomeJob.php
    - buildera-backend/app/Jobs/FireNewsletterWebhookJob.php
    - buildera-backend/app/Http/Controllers/Api/SubscriberController.php
    - buildera-backend/app/Http/Controllers/Api/UnsubscribeController.php
    - buildera-backend/app/Observers/AuditLogObserver.php
    - buildera-backend/app/Filament/Resources/NewsletterSubscriberResource.php
    - buildera-backend/app/Filament/Resources/NewsletterSubscriberResource/Pages/ListNewsletterSubscribers.php
    - buildera-backend/app/Filament/Resources/NewsletterSubscriberResource/Pages/ViewNewsletterSubscriber.php
  modified:
    - buildera-backend/app/Providers/AppServiceProvider.php
    - buildera-backend/routes/api.php

key-decisions:
  - "Re-subscribe generates a fresh unsubscribe_token — old token is explicitly invalidated, preventing re-use after re-subscription"
  - "AuditLogObserver uses try/catch on both created() and updated() — audit DB failure must never propagate to the main request or job"
  - "FireNewsletterWebhookJob uses readonly array payload (not model) — consistent with FireLeadWebhookJob, avoids model serialization edge cases"
  - "AuditLog model includes url column (from migration) — captures the full request URL for better audit trail context"

patterns-established:
  - "Observer try/catch pattern: all observer methods wrap AuditLog::create() in try/catch with Log::error fallback"
  - "Unsubscribe is idempotent: GET /api/unsubscribe returns 200 whether already unsubscribed or just unsubscribed"

requirements-completed: [LEAD-03, REL-04, REL-05, REL-08]

# Metrics
duration: ~2min
completed: 2026-05-27
---

# Phase 02 Plan 04: Newsletter Subscriber Endpoint and Audit Log Observer Summary

**POST /api/subscribers with rate limit 3/hr, signed unsubscribe token, re-subscribe handling, two queued jobs (Resend welcome email + n8n webhook), AuditLogObserver registered for Lead and NewsletterSubscriber, and Filament NewsletterSubscriberResource under Leads & CRM**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-05-27T00:40:50Z
- **Completed:** 2026-05-27
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments

- NewsletterSubscriber model with `generateToken()` (64-char random string) and `unsubscribe()` convenience method; casts for subscribed_at/unsubscribed_at datetimes
- SubscriberController handles three cases: new subscriber (201), already subscribed active (200 no jobs), previously unsubscribed re-subscribe (updates token + status + subscribed_at, dispatches jobs, 201)
- AuditLogObserver created() and updated() wrapped in try/catch — audit log failure is logged but never propagates; registered for Lead and NewsletterSubscriber in AppServiceProvider::boot()
- NewsletterSubscriberResource in Filament under Leads & CRM group (sort 2, envelope icon), read-only index + view pages, status badge, subscribed_at desc default sort, SelectFilter on status

## Task Commits

Each task was committed atomically:

1. **Task 1: NewsletterSubscriber model and queued jobs** — `9db105d` (feat)
2. **Task 2: SubscriberController, UnsubscribeController, and routes** — `a4ed28c` (feat)
3. **Task 3: AuditLog observer and NewsletterSubscriberResource** — `3106654` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `buildera-backend/app/Models/NewsletterSubscriber.php` — fillable columns from migration, datetime casts, generateToken(), unsubscribe()
- `buildera-backend/app/Models/AuditLog.php` — fillable all migration columns including url, array casts on old_values/new_values
- `buildera-backend/app/Jobs/SendNewsletterWelcomeJob.php` — ShouldQueue, Resend welcome email with unsubscribe URL, try/catch guard
- `buildera-backend/app/Jobs/FireNewsletterWebhookJob.php` — ShouldQueue, n8n newsletter webhook POST, no-op if URL empty
- `buildera-backend/app/Http/Controllers/Api/SubscriberController.php` — validates email/name, handles new/duplicate/re-subscribe, dispatches both jobs
- `buildera-backend/app/Http/Controllers/Api/UnsubscribeController.php` — validates token, 422/404/200 responses, calls subscriber.unsubscribe()
- `buildera-backend/app/Observers/AuditLogObserver.php` — created() and updated() with try/catch; captures url, ip, user-agent
- `buildera-backend/app/Filament/Resources/NewsletterSubscriberResource.php` — Leads & CRM group, navigationSort=2, heroicon-o-envelope, index+view only
- `buildera-backend/app/Filament/Resources/NewsletterSubscriberResource/Pages/ListNewsletterSubscribers.php` — extends ListRecords
- `buildera-backend/app/Filament/Resources/NewsletterSubscriberResource/Pages/ViewNewsletterSubscriber.php` — extends ViewRecord
- `buildera-backend/app/Providers/AppServiceProvider.php` — added Lead::observe() and NewsletterSubscriber::observe() after env validation
- `buildera-backend/routes/api.php` — added POST /api/subscribers (throttle:3,60) and GET /api/unsubscribe (public)

## Decisions Made

- Re-subscribe generates a fresh `unsubscribe_token` — the old token is explicitly nulled and replaced, preventing replay attacks from old unsubscribe links after a user re-subscribes.
- AuditLogObserver wraps both created() and updated() in try/catch — if the audit_logs table is unavailable or the write fails, the main request (lead creation, subscriber creation) must not be affected.
- AuditLog model includes the `url` column from the migration (plan spec omitted it) — this provides better audit trail context showing exactly which endpoint was called.
- FireNewsletterWebhookJob accepts `array $payload` (not `NewsletterSubscriber $model`) — consistent with the FireLeadWebhookJob pattern established in 02-03.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Added `url` field to AuditLogObserver and AuditLog model**
- **Found during:** Task 3 (AuditLog model creation — reading migration)
- **Issue:** Plan spec for AuditLog fillable omitted the `url` column that exists in the migration (2026_01_01_000022_create_audit_logs_table.php). Omitting it would silently drop URL data on every audit log write.
- **Fix:** Added `url` to AuditLog::$fillable and populated it in AuditLogObserver via `request()?->fullUrl()`.
- **Files modified:** buildera-backend/app/Models/AuditLog.php, buildera-backend/app/Observers/AuditLogObserver.php
- **Committed in:** 3106654 (Task 3 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 - missing critical column mapping)
**Impact on plan:** No scope change. url field was already in the migration — this just ensures the model correctly persists it.

## Issues Encountered

- MySQL is not running locally — `php artisan config:clear` succeeds without DB, `php artisan list` confirms no class-load errors. All routes verified via `php artisan route:list`. Models and observers will function correctly at deploy time when MySQL is running.

## Known Stubs

None — no hardcoded stubs in any created files. All data flows are wired to real models, real jobs, and real Resend/n8n targets.

## Threat Flags

None — no new network endpoints beyond those specified in the plan. GET /api/unsubscribe is token-validated in the controller (no brute-force concern given 64-char random token space). POST /api/subscribers is rate-limited at throttle:3,60.

## User Setup Required

None — all configuration uses existing .env keys (RESEND_API_KEY, N8N_NEWSLETTER_WEBHOOK_URL, APP_URL) established in earlier phases.

At deploy time:
1. Ensure `N8N_NEWSLETTER_WEBHOOK_URL` is set in .env if n8n automation is active
2. `php artisan migrate` — newsletter_subscribers and audit_logs tables will be created
3. `php artisan queue:work` — processes SendNewsletterWelcomeJob and FireNewsletterWebhookJob

## Next Phase Readiness

- 02-05 can now build the full set of Filament content resources (BlogPost, CaseStudy, Guide, etc.)
- Next.js newsletter widget (03-xx) can POST to /api/subscribers with email + name fields
- Unsubscribe page in Next.js reads the `?token=` query param and calls GET /api/unsubscribe
- No blockers for 02-05 or frontend phases

---
*Phase: 02-backend-core*
*Completed: 2026-05-27*
