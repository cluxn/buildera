---
plan: "07-04"
phase: 7
status: complete
completed_at: "2026-05-29"
---

# 07-04 Summary: Analytics Admin + Cookie Consent Pipeline

## What Was Built

### Backend (Filament Admin)
- **AnalyticsScriptsPage** (`app/Filament/Pages/AnalyticsScriptsPage.php`) — Filament v5 custom page under "SEO & Analytics" navigation group. Two tabs: "Tracking IDs" (GA4, Clarity, Facebook Pixel, LinkedIn Insight, Google Ads) and "Verification & Custom Scripts" (GSC tag, custom head/body scripts). Follows ManageSettings.php pattern exactly with `Schema::make()`.
- **NudgeBannerPage** (`app/Filament/Pages/NudgeBannerPage.php`) — Admin page under "Website" group with toggle, text, link URL, date/time expiry, and background color fields.
- **SettingsSeeder** updated with 8 analytics keys (group: analytics) + 5 nudge banner keys (group: website).

### Frontend
- **CookieConsentBanner** (`src/components/ui/CookieConsentBanner.tsx`) — "use client" GDPR cookie banner with 3 tiers (Essential always-on, Analytics, Marketing). Saves `{ essential: true, analytics, marketing }` to localStorage key `cookie-consent`. Dispatches `cookie-consent-update` CustomEvent. Disappears after consent saved.
- **ScriptInjector** (`src/components/ui/ScriptInjector.tsx`) — "use client" consent-gated script loader. Reads localStorage + listens for `cookie-consent-update` events. GA4 + Clarity fire only on `consent.analytics = true`. Facebook Pixel, LinkedIn Insight, Google Ads fire only on `consent.marketing = true`. GSC verification tag fires unconditionally (no PII).
- **layout.tsx** updated: imports and renders ScriptInjector (with all analytics settings) and CookieConsentBanner. Empty string settings passed as `undefined` to avoid loading scripts without IDs. Metadata title changed to template pattern `"%s | Buildera"`.

### Pre-existing Fix
- **Settings interface** in `api.ts` corrected: `email/phone/address` → `company_email/company_phone/company_address` to match actual API response keys. TypeScript now passes cleanly.

### Verification
- UTM capture already present in LeadController and leads migration (utm_source, utm_medium, utm_campaign, utm_content, utm_term) — ANA-03 verified.
- `npx tsc --noEmit` exits 0.
- SettingsSeeder runs idempotently.

## Key Files Created/Modified
- `buildera-backend/app/Filament/Pages/AnalyticsScriptsPage.php` (created)
- `buildera-backend/resources/views/filament/pages/analytics-scripts.blade.php` (created)
- `buildera-backend/app/Filament/Pages/NudgeBannerPage.php` (created)
- `buildera-backend/resources/views/filament/pages/nudge-banner.blade.php` (created)
- `buildera-backend/database/seeders/SettingsSeeder.php` (updated — +13 settings)
- `buildera-frontend/src/components/ui/CookieConsentBanner.tsx` (created)
- `buildera-frontend/src/components/ui/ScriptInjector.tsx` (created)
- `buildera-frontend/src/app/layout.tsx` (updated — imports + wiring + metadata template)
- `buildera-frontend/src/lib/api.ts` (fixed — Settings interface keys corrected)

## Self-Check: PASSED
- ANA-01: GA4 does NOT fire until analytics consent accepted ✓
- ANA-02: Clarity injected via ScriptInjector on consent ✓
- ANA-03: UTM capture verified in LeadController ✓
- ANA-04/COMP-07: Cookie consent banner with 3 tiers ✓
- ANA-05: FB/LinkedIn/Google Ads pixels fire on marketing consent ✓
- ADM-12: Analytics & Scripts admin page in SEO & Analytics group ✓
- ADM-13: Announcement Banner admin page in Website group ✓
