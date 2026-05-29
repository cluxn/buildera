---
plan: 08-03
title: "Redirect Manager — Filament Resource & Next.js Middleware"
status: complete
completed_at: "2026-05-29"
---

# Summary: Plan 08-03

## What Was Built

Created RedirectResource Filament admin panel and Next.js middleware for server-side redirect application.

## Key Changes

### RedirectResource.php + Pages
- RedirectResource in "SEO & Analytics" navigation group, icon heroicon-o-arrow-path
- Form: source_path (unique), destination_path, status_code (301/302 Select), is_active toggle
- Table: source_path, destination_path, status_code (badge, green=301/yellow=302), is_active, hit_count, updated_at — sorted newest first
- Full CRUD: ListRedirects, CreateRedirect, EditRedirect pages

### buildera-frontend/src/middleware.ts
- Module-level redirect cache with 5-minute TTL to avoid per-request API calls
- Fetches `NEXT_PUBLIC_API_URL/api/redirects` with `cache: 'no-store'`
- Applies matching redirect via NextResponse.redirect() with correct status code
- Supports both absolute URLs and relative paths for destination
- On API failure, returns stale cache or empty — never breaks navigation
- Matcher excludes: _next/static, _next/image, favicon.ico, api/ paths

## Self-Check: PASSED

- RedirectResource: source_path enforces uniqueness, hit_count shown in table
- Middleware: async, 5-min cache, safe fallback, no-store fetch
