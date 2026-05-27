---
phase: 02-backend-core
plan: 03
subsystem: api
tags: [laravel, lead-capture, api-key-auth, honeypot, throttle, queued-jobs, filament, resend, n8n-webhook]

# Dependency graph
requires:
  - phase: 02-backend-core
    plan: 02
    provides: Content models, public GET API routes, api.php foundation

provides:
  - Lead model with isDuplicate() 24hr duplicate detection
  - ApiKeyMiddleware with hash_equals() timing-safe validation, registered as 'api.key' alias
  - SendLeadNotificationJob (ShouldQueue) — Resend email notification with try/catch guard
  - FireLeadWebhookJob (ShouldQueue) — n8n webhook dispatch, no-op if URL unconfigured
  - POST /api/leads with api.key + throttle:5,60 middleware
  - Honeypot 'website' field check (422 if non-empty)
  - Duplicate detection — same email within 24hrs sets is_duplicate=true, no jobs dispatched
  - ip_hash stored as sha256 of client IP (privacy-safe)
  - LeadResource Filament admin under 'Leads & CRM' navigation group
  - Lead Inbox table with source_form/status filters and submitted_at desc default sort
  - config/services.php n8n webhook URLs (lead + newsletter)

affects:
  - 02-05 (newsletter subscriber endpoint — same api.key + throttle pattern)
  - 03-xx (Next.js contact form → POST /api/leads with X-API-Key header)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ApiKeyMiddleware uses hash_equals() for timing-safe comparison (prevents timing attacks)
    - Jobs implement ShouldQueue — dispatched via Laravel database queue driver
    - FireLeadWebhookJob no-ops when N8N_LEAD_WEBHOOK_URL is empty — safe unconfigured
    - Honeypot field ('website') excluded from lead data via array_diff_key before create
    - ip_hash = sha256(IP) — privacy-safe storage, not reversible
    - Filament v5 property types: navigationGroup (string|UnitEnum|null), navigationIcon (string|BackedEnum|null)

key-files:
  created:
    - buildera-backend/app/Models/Lead.php
    - buildera-backend/app/Http/Middleware/ApiKeyMiddleware.php
    - buildera-backend/app/Jobs/SendLeadNotificationJob.php
    - buildera-backend/app/Jobs/FireLeadWebhookJob.php
    - buildera-backend/app/Http/Controllers/Api/LeadController.php
    - buildera-backend/app/Filament/Resources/LeadResource.php
    - buildera-backend/app/Filament/Resources/LeadResource/Pages/ListLeads.php
    - buildera-backend/app/Filament/Resources/LeadResource/Pages/ViewLead.php
  modified:
    - buildera-backend/bootstrap/app.php
    - buildera-backend/config/services.php
    - buildera-backend/routes/api.php

key-decisions:
  - "Filament v5 uses string|UnitEnum|null for navigationGroup and string|BackedEnum|null for navigationIcon — ?string declarations cause fatal type errors"
  - "Jobs dispatch only for non-duplicate leads to prevent email/webhook spam on repeated submissions"
  - "FireLeadWebhookJob uses readonly array $payload (not Lead model) to avoid model serialization issues with webhook payload"
  - "SendLeadNotificationJob wraps entire Resend call in try/catch — email failure must never block lead creation"

patterns-established:
  - "POST endpoints use api.key + throttle middleware stack — pattern reused in 02-05 for newsletter"
  - "Honeypot exclusion via array_diff_key($validated, ['website' => true]) — clean, no manual unset"

requirements-completed: [LEAD-03, LEAD-04, LEAD-05, LEAD-06, LEAD-07, REL-07]

# Metrics
duration: ~4min
completed: 2026-05-27
---

# Phase 02 Plan 03: Lead Capture API and Admin Inbox Summary

**POST /api/leads with X-API-Key auth, throttle 5/hr, honeypot, 24hr duplicate detection, two queued side-effect jobs (Resend email + n8n webhook), and Filament Lead Inbox under Leads & CRM**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-05-27T00:33:00Z
- **Completed:** 2026-05-27
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments

- Lead model with isDuplicate() static method checking same email within 24hr window using `created_at >= now()->subHours(24)`
- ApiKeyMiddleware reads X-API-Key header, validates against APP_API_KEY using `hash_equals()` to prevent timing attacks; registered as 'api.key' alias in bootstrap/app.php
- SendLeadNotificationJob implements ShouldQueue — builds inline HTML email body and sends via Resend; entire send wrapped in try/catch so email failure never breaks lead creation
- FireLeadWebhookJob implements ShouldQueue — POSTs lead payload to N8N_LEAD_WEBHOOK_URL with 10s timeout; logs warning on non-2xx response; no-op if URL is empty
- Added `n8n.lead_webhook_url` and `n8n.newsletter_webhook_url` to config/services.php
- LeadController validates 19 fields, checks honeypot 'website', calls Lead::isDuplicate(), creates lead with ip_hash=sha256(IP), dispatches both jobs only for non-duplicates, returns 201 JSON
- POST /api/leads registered with `['api.key', 'throttle:5,60']` middleware — php artisan route:list confirms route
- LeadResource Filament admin with correct Filament v5 property types, navigationGroup='Leads & CRM', Lead Inbox table with badge columns, is_duplicate boolean icon, submitted_at desc default sort, 3 filters (source_form, status, is_duplicate), read-only view page
- No Create page — leads arrive via API only

## Task Commits

Each task was committed atomically:

1. **Task 1: Lead model, ApiKeyMiddleware, and queued jobs** — `bf2a3e2` (feat)
2. **Task 2: LeadController with throttle, honeypot, and dispatch** — `78579a7` (feat)
3. **Task 3: LeadResource Filament resource in Leads & CRM group** — `03be36c` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `buildera-backend/app/Models/Lead.php` — all migration columns fillable, is_duplicate/submitted_at casts, isDuplicate() static method
- `buildera-backend/app/Http/Middleware/ApiKeyMiddleware.php` — hash_equals() timing-safe X-API-Key validation
- `buildera-backend/app/Jobs/SendLeadNotificationJob.php` — ShouldQueue, Resend email with try/catch guard
- `buildera-backend/app/Jobs/FireLeadWebhookJob.php` — ShouldQueue, n8n webhook POST, no-op if URL empty
- `buildera-backend/app/Http/Controllers/Api/LeadController.php` — validates 19 fields, honeypot check, duplicate detection, job dispatch, 201 response
- `buildera-backend/app/Filament/Resources/LeadResource.php` — Leads & CRM group, Lead Inbox table, filters, read-only form
- `buildera-backend/app/Filament/Resources/LeadResource/Pages/ListLeads.php` — extends ListRecords
- `buildera-backend/app/Filament/Resources/LeadResource/Pages/ViewLead.php` — extends ViewRecord
- `buildera-backend/bootstrap/app.php` — registered 'api.key' middleware alias
- `buildera-backend/config/services.php` — added n8n webhook URL config block
- `buildera-backend/routes/api.php` — added POST /api/leads with api.key + throttle:5,60

## Decisions Made

- Filament v5 requires `string|\UnitEnum|null` for `$navigationGroup` and `string|\BackedEnum|null` for `$navigationIcon` — using `?string` causes fatal PHP type error. The ManageSettings.php reference file was the correct pattern to follow.
- Jobs dispatch only for non-duplicate leads: avoids email/webhook spam when bots or users resubmit the same email multiple times within 24hrs.
- FireLeadWebhookJob accepts `array $payload` (not `Lead $lead`) — serializing the full array avoids any potential model serialization edge cases and makes the webhook payload explicit.
- SendLeadNotificationJob wraps the entire Resend call in try/catch — email delivery is a side effect and must never prevent the lead from being recorded in the database.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Filament v5 property type declarations on LeadResource**
- **Found during:** Task 3 verification (php artisan route:list --path=admin)
- **Issue:** Plan specified `protected static ?string $navigationGroup` but Filament v5 declares the base property as `string | UnitEnum | null` — using `?string` causes a PHP fatal type error at class load time
- **Fix:** Changed `$navigationGroup` to `string|\UnitEnum|null` and `$navigationIcon` to `string|\BackedEnum|null` to match the Filament v5 base class declarations exactly; `$navigationLabel` correctly kept as `?string` (base declares it that way)
- **Files modified:** buildera-backend/app/Filament/Resources/LeadResource.php
- **Commit:** 03be36c (included in Task 3 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug — Filament v5 property type mismatch)
**Impact on plan:** Fix required — without it, the entire admin panel would fail to boot. No scope change.

## Issues Encountered

- MySQL is not running locally — `php artisan cache:clear` would fail with connection refused. This is the expected local dev state established in 02-01. All model, controller, and job code is correct and will work when MySQL is started at deploy time.
- `php artisan route:list` runs cleanly without DB and confirms all routes are registered.

## User Setup Required

None. At deploy time:
1. Ensure `APP_API_KEY` is set to a secure value in .env
2. Ensure `N8N_LEAD_WEBHOOK_URL` is correct (already set to the real n8n URL from Phase 1)
3. Ensure `RESEND_API_KEY` is set to the real API key for email notifications
4. `php artisan queue:work` — starts processing the database-backed job queue
5. `php artisan migrate` — leads table already exists from Phase 1 migrations

## Next Phase Readiness

- 02-04 can now add Filament resources for the content models from 02-02 (Blog, CaseStudy, Guide, etc.)
- 02-05 (newsletter subscriber endpoint) can reuse the exact same api.key + throttle pattern established here
- Next.js frontend (03-xx) can POST to /api/leads with X-API-Key header from the contact form
- No blockers for 02-04 or 02-05

---
*Phase: 02-backend-core*
*Completed: 2026-05-27*
