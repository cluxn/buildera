# Buildera

## What This Is

Buildera is an IT services company website (buildera.co) that markets six core service lines — Website Development, Salesforce Development, DevOps Development, AI Agent Development, Software Development, and Hire a Developer — to SMB decision-makers (business owners, ops leads). The site attracts cold traffic and converts warm prospects into booked discovery calls. It is paired with a full Laravel/Filament admin panel for content, lead, SEO, and settings management.

## Core Value

A decision-maker who lands on buildera.co — cold or warm — immediately understands what Buildera builds, finds their specific problem reflected in the service or solution listed, and books a discovery call.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Homepage with hero, services overview, solutions overview, testimonials, CTAs
- [ ] Services section — 6 categories (tabs), each with 3–5 sub-service detail pages (~24 pages)
- [ ] Solutions section — ~18 solution tiles, each with its own detail page
- [ ] Industry pages — each industry has its own dedicated page
- [ ] Case Studies — list page + individual detail pages
- [ ] Blog — list page + individual post pages
- [ ] Guides — listicle list page + individual guide/template pages
- [ ] Testimonials page
- [ ] Contact Us page with lead capture form → books a discovery call
- [ ] Admin panel — content management for all page types (home, services, solutions, industries, case studies, blog, guides, testimonials)
- [ ] Admin panel — lead management (capture, view, status)
- [ ] Admin panel — newsletter subscriber management
- [ ] Admin panel — SEO management (per-page title, meta description, canonical, robots, OG)
- [ ] Admin panel — user management with roles
- [ ] Admin panel — sitemap generation
- [ ] Admin panel — analytics & tracking tags (GA4, Google Ads, Clarity, Facebook Pixel, LinkedIn Insight)
- [ ] Admin panel — nudge banners, popups, floating CTAs
- [ ] Admin panel — social media links and WhatsApp widget management
- [ ] Admin panel — script injection (head/body custom HTML)
- [ ] ISR revalidation — Next.js cache purge triggered from admin on content save
- [ ] SEO-optimized site — structured data, sitemap.xml, robots.txt, canonical URLs
- [ ] Discovery call booking via Calendly embed

### Out of Scope

- Custom booking system — Calendly free tier handles this
- Redis / job queues beyond database driver — not available on standard hosting
- Multi-language / i18n — English only for v1
- E-commerce / payment processing — not a Buildera offering
- Client portal / authenticated user area — v2

## Context

- Reference design screenshots shared: tab-based services section, grid-based solutions listing, card-based sub-service layout with "Learn More →" links — blue/white color scheme
- Services are hardcoded first (built in code), admin control added progressively
- Strong content depth: ~24 sub-service pages + ~18 solution pages + industry pages + blog/guides/case studies = 60+ total pages
- Target visitor: SMB decision-maker (business owner, ops lead at small/mid-size company)
- Primary conversion action: book a discovery call (Calendly)
- Domain: buildera.co hosted on Hostinger

## Constraints

- **Tech Stack**: Next.js 15 (App Router) frontend + Laravel 13 + Filament PHP 5 backend — confirmed, do not change
- **UI System**: shadcn/ui + Tailwind CSS 4, Inter font, Blue/White brand palette
- **Hosting**: Hostinger — Node.js for Next.js, PHP for Laravel, MySQL included
- **Repositories**: Two local codebases — buildera-frontend and buildera-backend; no GitHub; built locally and handed to client as deploy-ready code; client uploads to Hostinger after handoff
- **Booking**: Calendly embed — free tier
- **Analytics**: GA4 + Microsoft Clarity — injected via admin script panel, not hardcoded
- **Performance**: PageSpeed above 85 mobile, under 2.5s on 4G, all images WebP
- **Accessibility**: WCAG AA minimum — 48px touch targets, contrast ratios met
- **Content strategy**: Pages hardcoded first, admin-driven content added phase by phase

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 15 App Router | Server Components by default, ISR for blog/case studies, static for marketing pages | — Pending |
| Laravel 13 + Filament 5 | Proven pattern from Cluxn; Filament handles complex admin needs out of the box | — Pending |
| shadcn/ui + Tailwind 4 | Copy-paste components, fully brandable, no runtime overhead | — Pending |
| Inter font | Industry-standard for tech companies, excellent legibility across all screen sizes | — Pending |
| Hardcode pages first | Ship fast, add admin control progressively rather than blocking on CMS architecture | — Pending |
| Calendly for booking | Free tier, no custom booking system complexity, reliable embed | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-26 after initialization*
