---
phase: 05-industries-trust-lead
plan: "05-03"
subsystem: ui
tags: [nextjs, react, lead-capture, calendly, contact-form, thank-you]

# Dependency graph
requires:
  - phase: 02-backend-core
    provides: POST /api/leads endpoint with X-API-Key, throttle, honeypot, 24hr duplicate detection
  - phase: 03-homepage-design-system
    provides: Breadcrumb UI component, brand CSS variables, btn-primary class, hero-orb classes
provides:
  - Contact Us page with form wired to POST /api/leads (source_form=contact-page)
  - Book a Call page with Calendly iframe embed (reads calendly_url from settings)
  - Thank You confirmation page (noindexed, WhatsApp shortcut, next-step cards)
  - ContactForm client component with honeypot, UTM passthrough, 422/429 error handling
  - CalendlyEmbed client component with empty-URL fallback
affects:
  - 05-04 (newsletter form — same form pattern; ContactForm is the canonical lead-form reference)
  - 06-content (case studies and blog pages linked from Thank You "while you wait" section)
  - 07-seo (thank-you page has robots noindex — must not be overridden by SEO admin panel)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - ContactForm reads NEXT_PUBLIC_API_URL/NEXT_PUBLIC_API_KEY from process.env in client component (safe — NEXT_PUBLIC_ prefix exposes to browser)
    - UTM params captured in useRef (not useState) to avoid flicker on mount
    - Honeypot field rendered hidden (className="hidden") with tabIndex=-1 and aria-hidden="true"; submitted in payload so backend drop logic runs
    - Calendly embed via direct iframe with query-param injection (not Calendly JS SDK)
    - CalendlyEmbed shows inline fallback when settings.calendly_url is empty string
    - Thank You page uses robots: { index: false, follow: false } in Metadata object for noindex

key-files:
  created:
    - buildera-frontend/src/components/sections/contact/ContactHero.tsx
    - buildera-frontend/src/components/sections/contact/ContactInfo.tsx
    - buildera-frontend/src/components/sections/contact/ContactForm.tsx
    - buildera-frontend/src/components/sections/contact/CalendlyEmbed.tsx
    - buildera-frontend/src/app/contact/page.tsx
    - buildera-frontend/src/app/book-a-call/page.tsx
    - buildera-frontend/src/app/thank-you/page.tsx
  modified: []

key-decisions:
  - "ContactForm uses useRef for UTM params (not useState) — avoids re-render flicker on URL param capture in useEffect"
  - "Calendly embedded via iframe with query params (not Calendly JS SDK) — no external script dependency, simpler fallback"
  - "Thank You page has robots noindex via Metadata object — prevents search engine indexing of confirmation page"
  - "WhatsApp link on Thank You page only renders when settings.whatsapp_number is non-empty string"
  - "ContactInfo email is hardcoded info@buildera.co per plan spec — Settings email not required for Phase 5"

patterns-established:
  - "Lead form pattern: ContactForm is canonical — use as reference for other forms (newsletter, inline CTAs)"
  - "Error handling: 201 redirect, 422 duplicate message, 429 rate-limit message, catch-all generic message"
  - "Honeypot pattern: hidden input rendered in DOM, submitted in payload, backend drops silently if non-empty"

requirements-completed: [LEAD-01, LEAD-02, LEAD-08, LEAD-09, LEAD-10]

# Metrics
duration: 20min
completed: 2026-05-28
---

# Phase 5 Plan 03: Lead Conversion Pages Summary

**Contact form wired to POST /api/leads with honeypot + UTM passthrough, Calendly iframe embed with empty-URL fallback, and noindexed Thank You page with next-step navigation**

## Performance

- **Duration:** 20 min
- **Started:** 2026-05-28T00:00:00Z
- **Completed:** 2026-05-28T00:20:00Z
- **Tasks:** 3
- **Files modified:** 7 created

## Accomplishments
- Full contact page with hero orbs, 3-column info strip (email/WhatsApp/location), 5-column desktop grid form layout, response guarantee card
- ContactForm client component: POST /api/leads with X-API-Key header, source_form='contact-page', honeypot, UTM capture via useRef, status-aware error messages, loading spinner
- Calendly iframe embed with fallback message when calendly_url is empty; Book a Call page with "What to Expect" 3-card grid
- Thank You page: noindexed, success icon, response guarantee badge, 3 "while you wait" navigation cards, conditional WhatsApp link

## Task Commits

Each task was committed atomically:

1. **Task 05-03-01: Contact Us page — hero, info strip, form** - `b0f4670` (feat)
2. **Task 05-03-02: Book a Call page — Calendly embed** - `78ea2fb` (feat)
3. **Task 05-03-03: Thank You confirmation page** - `a47192e` (feat)

## Files Created/Modified
- `buildera-frontend/src/components/sections/contact/ContactHero.tsx` - Server Component; hero orbs, eyebrow badge, trust strip
- `buildera-frontend/src/components/sections/contact/ContactInfo.tsx` - Server Component; 3-card email/WhatsApp/location grid
- `buildera-frontend/src/components/sections/contact/ContactForm.tsx` - "use client"; full form wired to POST /api/leads; honeypot; UTM refs; error handling
- `buildera-frontend/src/components/sections/contact/CalendlyEmbed.tsx` - "use client"; iframe embed; empty-URL fallback
- `buildera-frontend/src/app/contact/page.tsx` - async Server Component; fetches settings; 5-column desktop layout
- `buildera-frontend/src/app/book-a-call/page.tsx` - async Server Component; fetches settings; CalendlyEmbed + What to Expect cards
- `buildera-frontend/src/app/thank-you/page.tsx` - async Server Component; noindex metadata; success state; conditional WhatsApp link

## Decisions Made
- UTM params stored in useRef (not useState) to prevent re-render flicker when captured on mount via useEffect
- Calendly embed via direct iframe rather than Calendly JS SDK — eliminates external script dependency and simplifies fallback
- Thank You page robots metadata via `{ index: false, follow: false }` in Metadata object — standard Next.js 15 pattern
- ContactInfo email hardcoded to info@buildera.co per plan specification (Settings email field not required for Phase 5)
- WhatsApp link on Thank You page conditionally rendered only when `settings.whatsapp_number` is non-empty

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## Threat Surface Scan

No new threat surface beyond what is documented in the plan's threat model. All mitigations applied:
- T-05-03-01 (Injection): All ContactForm fields are string values passed to JSON.stringify — no eval or dynamic SQL
- T-05-03-05 (XSS/CalendlyEmbed): calendlyUrl comes from admin settings API, not user input; no innerHTML used

## Known Stubs

None — all three pages are fully wired:
- ContactForm POSTs to live backend endpoint
- CalendlyEmbed reads calendly_url from settings (shows fallback when empty — intentional)
- Thank You page WhatsApp link reads from settings

## User Setup Required
None — no external service configuration required beyond what Phase 2 already established (NEXT_PUBLIC_API_URL, NEXT_PUBLIC_API_KEY in .env.local). Admin must set `calendly_url` in Settings panel for the Calendly widget to show on /book-a-call.

## Next Phase Readiness
- Lead capture flow is complete: visitor → /contact → form submit → POST /api/leads → /thank-you
- Book a Call flow ready pending admin setting `calendly_url` in Filament settings panel
- 05-04 (newsletter form) can reference ContactForm as the canonical client-form pattern

---
*Phase: 05-industries-trust-lead*
*Completed: 2026-05-28*
