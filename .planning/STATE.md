---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: ready_to_execute
last_updated: "2026-06-10T10:52:17.191Z"
progress:
  total_phases: 10
  completed_phases: 8
  total_plans: 46
  completed_plans: 45
  percent: 80
---

# Buildera — Project State

## Project Reference

See: `.planning/PROJECT.md` (updated 2026-05-26)

**Core value:** A decision-maker lands on buildera.co — cold or warm — immediately understands what Buildera builds, finds their specific problem reflected in the services/solutions, and books a discovery call.

**Current focus:** Phase 06 — content (blog, case studies, guides)

## Phase Status

| Phase | Name | Status |
|-------|------|--------|
| 1 | Project Foundation | 📋 Planned (4 plans, 3 waves) |
| 2 | Backend Core | ✅ Complete (5/5 plans done) |
| 3 | Homepage & Design System | ✅ Complete (6/6 plans done) |
| 4 | Services & Solutions Pages | ✅ Complete (6/6 plans done) |
| 5 | Industries, Trust Pages & Lead Capture | ✅ Complete (5/5 plans done) |
| 6 | Content — Blog, Case Studies, Guides | 📋 Planned (5 plans, 3 waves) |
| 7 | SEO, Analytics & Search | 📋 Planned (5 plans, 2 waves) |
| 8 | Admin Completeness & Reliability | 📋 Planned (5 plans, 3 waves) |
| 9 | Performance & Accessibility | ⬜ Not started |
| 10 | Deploy Preparation | ⬜ Not started |

## Key Decisions Locked

- Stack: Next.js 15 + MySQL-direct (mysql2) — no Laravel, no PHP, no Filament
- UI: shadcn/ui + Tailwind 4 + Inter font + Blue/White palette
- Deploy: Hostinger (Node.js + PHP + MySQL) — full build first, deploy once at end
- Content: Hardcoded pages first, admin control added progressively
- No mid-project deploys
- Setting::get($key, $default) for all settings reads — 1hr cache via Cache::remember
- Filament v5 Page $view is non-static; $navigationGroup is string|UnitEnum|null (not ?string)
- canAccessPanel() returns true for all authenticated users; Shield handles resource-level RBAC
- scopePublished() enforces is_published=true AND (published_at IS NULL OR published_at <= NOW()) on all content models
- SeoMeta table uses title/description columns (not seo_title/seo_description); NavItem uses opens_new_tab (not opens_in_new_tab)
- All public GET API controllers are standalone (no base class); 14 no-auth routes registered in api.php
- ApiKeyMiddleware uses hash_equals() for timing-safe X-API-Key validation; registered as 'api.key' alias
- POST /api/leads: api.key + throttle:5,60 + honeypot + 24hr duplicate detection + queued jobs (Resend + n8n)
- Filament v5: $navigationGroup must be string|UnitEnum|null; $navigationIcon must be string|BackedEnum|null
- Jobs dispatch only for non-duplicate leads; FireLeadWebhookJob is no-op when N8N URL is empty
- POST /api/subscribers: throttle:3,60, no api.key; re-subscribe generates fresh unsubscribe_token; old token invalidated
- AuditLogObserver wraps created()/updated() in try/catch — audit DB failure never propagates to main request
- FireNewsletterWebhookJob uses array payload (not model) — consistent with FireLeadWebhookJob pattern
- Brand tokens placed in :root (not @theme) — consumed via var(--brand-*) arbitrary value syntax in Tailwind classes
- Typography scale added to @layer base (8 roles: Display/h1-h4/body-lg/body/label/caption) per D-27
- fetchFromApi options cast as RequestInit — Next.js extends RequestInit with next.tags at runtime
- SETTINGS_FALLBACK exported for use in downstream Server Components without API dependency
- SERVICES_MENU typed as readonly ServiceMenuItem[] and exported from SiteNav.tsx for reuse in ServicesTabSection (plan 03-05)
- MegaDropdown rendered inside SiteNavClient client tree (receives props, no data fetching) — avoids "use client" boundary issues
- Work/Resources panels show hardcoded fallback links when API returns empty array — prevents empty nav panels at build time
- SiteFooter uses Promise.all for parallel fetch of footerLinks + settings — both have .catch() fallbacks, footer never crashes
- Social icons in SiteFooter render only when settings URL is non-empty string — no empty icon anchors
- Newsletter form action="#" is intentional Phase 3 visual stub — POST /api/subscribers wiring deferred to Phase 5 plan 05-04
- Button asChild pattern not available in @base-ui/react Button — hero CTAs implemented as styled Link elements directly
- parseInt fallback (|| defaultValue) applied to StatsBarSection stat values — mitigates T-03-10 NaN render
- ServicesTabSection defines own SERVICES_DATA with icon component refs and descriptions (not re-imported from SiteNav SERVICES_MENU) — nav menu needs string slugs only; tab section needs icon components + sub-service descriptions
- ServiceCard uses CSS hover (not motion whileHover) — parent ServicesTabSection already handles card enter animations; transition-all duration-200 provides smooth hover
- ClientLogosMarquee logos rendered twice via JSX spread ([...LOGOS, ...LOGOS]) for seamless CSS marquee loop (no JS duplication)
- motion/react v12.40.0 requires "use client" on all components that use motion.X elements — createMotionComponent is marked client-only; Server Components cannot call it during static generation

## Artifacts

| Artifact | Path | Status |
|----------|------|--------|
| Project context | `.planning/PROJECT.md` | ✓ Done |
| Config | `.planning/config.json` | ✓ Done |
| Stack research | `.planning/research/STACK.md` | ✓ Done |
| Features research | `.planning/research/FEATURES.md` | ✓ Done |
| Architecture research | `.planning/research/ARCHITECTURE.md` | ✓ Done |
| Pitfalls research | `.planning/research/PITFALLS.md` | ✓ Done |
| Research summary | `.planning/research/SUMMARY.md` | ✓ Done |
| Requirements | `.planning/REQUIREMENTS.md` | ✓ Done |
| Roadmap | `.planning/ROADMAP.md` | ✓ Done |
