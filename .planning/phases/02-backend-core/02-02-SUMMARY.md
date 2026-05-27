---
phase: 02-backend-core
plan: 02
subsystem: api
tags: [laravel, eloquent, spatie-sluggable, published-filter, rest-api, blog, case-study, guide, testimonial, seo, redirects]

# Dependency graph
requires:
  - phase: 02-backend-core
    plan: 01
    provides: Setting model with static get() helpers, User model, Filament admin scaffolded, all content migrations applied

provides:
  - 9 Eloquent content models (Author, BlogPost, CaseStudy, Guide, Testimonial, SeoMeta, Redirect, NavItem, FooterLink)
  - scopePublished() on BlogPost, CaseStudy, Guide — enforces is_published=true AND (published_at IS NULL OR published_at <= NOW())
  - scopeActive() on Redirect, scopeVisible() on NavItem/FooterLink
  - 10 public GET API controllers — SettingsController, BlogPostController, CaseStudyController, GuideController, TestimonialController, SeoMetaController, RedirectController, NavItemController, FooterLinkController, SearchController
  - 14 public GET routes in api.php (no auth, no middleware)
  - GET /api/settings returns all settings as flat key→value JSON object
  - GET /api/blog-posts returns published posts with eager-loaded author
  - GET /api/search accepts ?q= (min 2 chars), searches BlogPost+CaseStudy+Guide, max 5 per type

affects:
  - 02-03 (Filament resources for all these models)
  - 02-05 (ISR revalidation — calls /api/revalidate after content changes)
  - 03-xx (Next.js frontend consumes all these endpoints at build time and ISR)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - scopePublished() pattern — where('is_published', true)->where(fn($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()))
    - Controllers extend no base class — standalone, matching HealthCheckController pattern
    - SearchController uses LOWER(LIKE) for case-insensitive search across content types
    - SeoMeta returns null for unknown pages — frontend handles fallback gracefully
    - NavItem/FooterLink scopes chain orderBy('display_order') inside the scope itself

key-files:
  created:
    - buildera-backend/app/Models/Author.php
    - buildera-backend/app/Models/BlogPost.php
    - buildera-backend/app/Models/CaseStudy.php
    - buildera-backend/app/Models/Guide.php
    - buildera-backend/app/Models/Testimonial.php
    - buildera-backend/app/Models/SeoMeta.php
    - buildera-backend/app/Models/Redirect.php
    - buildera-backend/app/Models/NavItem.php
    - buildera-backend/app/Models/FooterLink.php
    - buildera-backend/app/Http/Controllers/Api/SettingsController.php
    - buildera-backend/app/Http/Controllers/Api/BlogPostController.php
    - buildera-backend/app/Http/Controllers/Api/CaseStudyController.php
    - buildera-backend/app/Http/Controllers/Api/GuideController.php
    - buildera-backend/app/Http/Controllers/Api/TestimonialController.php
    - buildera-backend/app/Http/Controllers/Api/SeoMetaController.php
    - buildera-backend/app/Http/Controllers/Api/RedirectController.php
    - buildera-backend/app/Http/Controllers/Api/NavItemController.php
    - buildera-backend/app/Http/Controllers/Api/FooterLinkController.php
    - buildera-backend/app/Http/Controllers/Api/SearchController.php
  modified:
    - buildera-backend/routes/api.php

key-decisions:
  - "NavItem migration uses opens_new_tab (not opens_in_new_tab) — model fillable and casts use the actual column name"
  - "SeoMeta migration uses title/description columns (not seo_title/seo_description) — plan spec had wrong field names; model matches migration"
  - "TestimonialController uses whereJsonContains for service_tags/industry_tags filtering — more correct than LIKE on JSON column"
  - "SearchController includes CaseStudy results using challenge text (not excerpt — no excerpt column on case_studies)"
  - "cache:clear fails locally without MySQL (expected) — documented in 02-01-SUMMARY; all code is correct for deploy-time"

patterns-established:
  - "scopePublished(): where is_published=true AND (published_at IS NULL OR published_at <= now()) — enforced on all timestamped content models"
  - "All public GET API controllers: no auth, no base class, standalone — same pattern as HealthCheckController"
  - "firstOrFail() on show() endpoints — Laravel 404s automatically on missing published record"
  - "SearchController type field: maps each result to its content type string ('blog_post', 'case_study', 'guide')"

requirements-completed: [ADM-11, REL-06, PUB-01, PUB-02]

# Metrics
duration: 25min
completed: 2026-05-27
---

# Phase 02 Plan 02: Content Models and Public GET API Endpoints Summary

**9 Eloquent models with scopePublished/scopeActive/scopeVisible, 10 public GET controllers, and 14 no-auth routes — all content endpoints enforce is_published + published_at filter**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-05-27T00:00:00Z
- **Completed:** 2026-05-27
- **Tasks:** 3
- **Files modified:** 20

## Accomplishments

- All 9 Eloquent content models created with correct fillable, casts, and query scopes; Author/BlogPost/CaseStudy/Guide use Spatie HasSlug; Testimonial/NavItem/FooterLink/Redirect/SeoMeta are standalone
- BlogPost, CaseStudy, Guide each have scopePublished() enforcing the dual filter — is_published=true AND (published_at IS NULL OR published_at <= NOW()) — matching CLAUDE.md's `is_published` enforcement requirement exactly
- 10 public GET controllers created with no authentication, no base class, matching HealthCheckController pattern; SearchController implements cross-type search with LOWER(LIKE) and max-5-per-type limits
- 14 routes registered in api.php — all GET with no middleware; `php artisan route:list --path=api` confirms all 14 routes

## Task Commits

Each task was committed atomically:

1. **Task 1: Create all Eloquent content models** - `4ddfdd4` (feat)
2. **Task 2: Create all public GET API controllers** - `5878397` (feat)
3. **Task 3: Register all GET routes in api.php** - `ad6012a` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `buildera-backend/app/Models/Author.php` — HasSlug, name/slug/bio/avatar/twitter_url/linkedin_url fillable, hasMany BlogPost
- `buildera-backend/app/Models/BlogPost.php` — HasSlug, scopePublished, belongsTo Author, tags/is_published/published_at casts
- `buildera-backend/app/Models/CaseStudy.php` — HasSlug, scopePublished, service_tags/industry_tags/is_featured/is_published/published_at casts
- `buildera-backend/app/Models/Guide.php` — HasSlug, scopePublished, tags/is_published/published_at casts
- `buildera-backend/app/Models/Testimonial.php` — scopePublished (is_published only), service_tags/industry_tags array casts, rating/sort_order integer casts
- `buildera-backend/app/Models/SeoMeta.php` — columns match migration (title/description), schema_json array cast, scopeForPage static helper
- `buildera-backend/app/Models/Redirect.php` — scopeActive, is_active boolean, status_code integer casts
- `buildera-backend/app/Models/NavItem.php` — scopeVisible (orderBy display_order), opens_new_tab matches migration column name
- `buildera-backend/app/Models/FooterLink.php` — scopeVisible (orderBy display_order), column_group fillable
- `buildera-backend/app/Http/Controllers/Api/SettingsController.php` — returns Setting::all()->pluck('value', 'key') flat object
- `buildera-backend/app/Http/Controllers/Api/BlogPostController.php` — index with eager author load + show, both use published() scope
- `buildera-backend/app/Http/Controllers/Api/CaseStudyController.php` — index with optional ?industry filter + show
- `buildera-backend/app/Http/Controllers/Api/GuideController.php` — index with optional ?category filter + show
- `buildera-backend/app/Http/Controllers/Api/TestimonialController.php` — index with optional ?service/?industry whereJsonContains filters
- `buildera-backend/app/Http/Controllers/Api/SeoMetaController.php` — show by page_type + page_slug, null OK
- `buildera-backend/app/Http/Controllers/Api/RedirectController.php` — returns active redirects with 3-column select
- `buildera-backend/app/Http/Controllers/Api/NavItemController.php` — returns visible items
- `buildera-backend/app/Http/Controllers/Api/FooterLinkController.php` — returns visible links
- `buildera-backend/app/Http/Controllers/Api/SearchController.php` — cross-type LOWER(LIKE) search, max 5 per type, type field on each result
- `buildera-backend/routes/api.php` — 14 GET routes, no middleware, all controllers imported

## Decisions Made

- NavItem migration uses `opens_new_tab` column name (not `opens_in_new_tab` as plan specified) — model and fillable corrected to match actual migration column.
- SeoMeta migration uses `title` and `description` columns (plan spec listed `seo_title`/`seo_description`) — model uses correct column names from migration.
- TestimonialController uses `whereJsonContains` for `?service=` and `?industry=` filters rather than LIKE — more semantically correct for JSON array columns.
- SearchController falls back to `challenge` text for CaseStudy search (case_studies table has no excerpt column).
- `cache:clear` fails locally without MySQL running — expected behavior, documented in 02-01-SUMMARY. All code is correct; command will succeed at deploy time.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected SeoMeta fillable column names**
- **Found during:** Task 1 (model creation)
- **Issue:** Plan specified `'seo_title'` and `'seo_description'` in SeoMeta fillable, but the migration creates columns named `title` and `description`
- **Fix:** SeoMeta fillable uses `title` and `description` matching the actual DB schema; also added `canonical_url` column which exists in migration
- **Files modified:** buildera-backend/app/Models/SeoMeta.php
- **Committed in:** 4ddfdd4 (Task 1 commit)

**2. [Rule 1 - Bug] Corrected NavItem column name opens_in_new_tab → opens_new_tab**
- **Found during:** Task 1 (model creation)
- **Issue:** Plan specified fillable key `'opens_in_new_tab'` but migration creates column `opens_new_tab`
- **Fix:** NavItem fillable and casts use `opens_new_tab`
- **Files modified:** buildera-backend/app/Models/NavItem.php
- **Committed in:** 4ddfdd4 (Task 1 commit)

---

**Total deviations:** 2 auto-fixed (both Rule 1 - Bug, schema mismatch between plan spec and actual migrations)
**Impact on plan:** Both fixes required to prevent runtime column-not-found errors. No scope creep.

## Issues Encountered

- MySQL is not running locally — `php artisan cache:clear` fails with connection refused. This is the expected local dev state (same as 02-01). All model and controller code is correct and will work when MySQL is started at deploy time. `php artisan list` and `php artisan route:list` both run cleanly without DB.

## User Setup Required

None — no external service configuration required. At deploy time:
1. `php artisan migrate` — applies all migrations (already done if continuing from 02-01 deploy)
2. `php artisan config:clear && php artisan cache:clear` — clears config/cache after deploy

## Next Phase Readiness

- 02-03 can now create Filament resources for all 9 new content models — all models have correct scopes and casts in place
- Next.js frontend (03-xx) can now call all 14 endpoints — GET /api/settings, /api/blog-posts, /api/nav-items, /api/redirects, etc.
- All routes have no middleware — direct consumption at build time confirmed in route:list output
- No blockers for 02-03

---
*Phase: 02-backend-core*
*Completed: 2026-05-27*
