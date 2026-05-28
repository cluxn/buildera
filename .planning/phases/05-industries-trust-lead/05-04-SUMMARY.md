---
plan: "05-04"
phase: 5
status: complete
completed: "2026-05-28"
---

# 05-04 Summary — Lead Capture Widgets

## What Was Built

### Task 05-04-01: MiniLeadForm
- `buildera-frontend/src/components/ui/MiniLeadForm.tsx` — "use client" compact 3-field form
- Props: required `sourceForm`, optional `headline`/`subtext`/`ctaLabel`/`className`
- Fields: name (required), email (required), phone (optional), honeypot (hidden)
- On success: form replaced with green confirmation card + link to /book-a-call
- Error handling: 422 → "already have your enquiry", 429 → "too many requests"
- POSTs to POST /api/leads with X-API-Key header and caller-provided sourceForm tag

### Task 05-04-02: WhatsAppWidget + FloatingCTA + NewsletterForm + layout mount
- `buildera-frontend/src/components/ui/WhatsAppWidget.tsx` — "use client"
  - Fetches settings on mount, shows after 3s delay (prevents CLS)
  - Renders null when whatsapp_number is empty or widget is disabled
  - Position: fixed bottom-6 right-6 z-40, green circle button with wa.me link
  - motion/react entrance animation (spring), tooltip on hover
- `buildera-frontend/src/components/ui/FloatingCTA.tsx` — "use client"  
  - Fetches settings, shows after 5s delay
  - Position: fixed bottom-20 right-6 z-40 (stacked above WhatsApp)
  - Pulse ring CSS animation, gradient pill button → /book-a-call
  - motion/react entrance (opacity + y)
- `buildera-frontend/src/components/sections/NewsletterForm.tsx` — "use client"
  - POSTs to POST /api/subscribers with email + source='footer'
  - 422 treated as success ("already subscribed — thank you!")
  - 429 shows friendly error
  - Success state replaces form with confirmation text
- `buildera-frontend/src/components/layout/SiteFooter.tsx` — replaced `action="#"` stub with `<NewsletterForm />`
- `buildera-frontend/src/app/layout.tsx` — added `<WhatsAppWidget />` and `<FloatingCTA />` after `{children}` (before closing `</body>`)

## Key Files

- `buildera-frontend/src/components/ui/MiniLeadForm.tsx` (created)
- `buildera-frontend/src/components/ui/WhatsAppWidget.tsx` (created)
- `buildera-frontend/src/components/ui/FloatingCTA.tsx` (created)
- `buildera-frontend/src/components/sections/NewsletterForm.tsx` (created)
- `buildera-frontend/src/components/layout/SiteFooter.tsx` (modified)
- `buildera-frontend/src/app/layout.tsx` (modified)

## Commits

- `64a66c1` feat(05-04): MiniLeadForm — reusable compact lead form for scroll hotspots
- `5acf012` feat(05-04): WhatsAppWidget, FloatingCTA, NewsletterForm + layout mount

## Deviations

None — all tasks executed as specified in plan.

## Self-Check

- [x] MiniLeadForm.tsx has "use client"
- [x] sourceForm is required prop (no default — prevents silent wrong tagging)
- [x] Honeypot field with aria-hidden + tabIndex=-1 in MiniLeadForm
- [x] WhatsAppWidget renders null when whatsapp_number empty
- [x] FloatingCTA at bottom-20, WhatsApp at bottom-6 (no overlap)
- [x] Both widgets use motion/react (not framer-motion)
- [x] layout.tsx mounts both widgets after children
- [x] NewsletterForm POSTs to /api/subscribers with source='footer'
- [x] SiteFooter remains Server Component (NewsletterForm extracted as separate client file)
- [x] No STATE.md or ROADMAP.md modifications

## Self-Check: PASSED
