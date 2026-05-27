# Buildera — Project Roadmap

**10 phases** | **~135 requirements** | Full build → deploy at end

---

## Phase 1: Project Foundation
**Goal:** Both repositories scaffolded, environments configured, and deploy infrastructure ready — zero friction from Phase 2 onwards.

**Requirements:** FOUND-01 → FOUND-05, INFRA-01 → INFRA-03

**Plans:**
- 01-01: Scaffold buildera-frontend (Next.js 15, TypeScript, Tailwind 4, shadcn/ui, Inter, next.config.ts with standalone output, pm2 ecosystem.config.js)
- 01-02: Scaffold buildera-backend (Laravel 13, Filament PHP 5, MySQL migrations skeleton, .env.example, CORS config)
- 01-03: Database schema — all migrations for leads, blog_posts, case_studies, guides, testimonials, authors, settings, seo_metas, redirects, nav_items, footer_links, newsletter_subscribers, audit_logs, media; all indexes (INFRA-01)
- 01-04: Health check endpoint, error page stubs (not-found.tsx, error.tsx), environment validation on boot

**Success Criteria:**
1. `npm run dev` starts frontend with no errors
2. `php artisan serve` starts backend, `/api/health` returns `{ status: "ok" }`
3. All migrations run clean on fresh MySQL database
4. Both repos committed with proper .gitignore, .env.example

---

## Phase 2: Backend Core
**Goal:** All Laravel API endpoints live, Filament admin accessible, lead capture working end-to-end, reliability foundations in place.

**Requirements:** ADM-01, ADM-11, ADM-17 (scaffold), LEAD-03 → LEAD-07, REL-05 → REL-08, PUB-01 → PUB-02

**Plans:**
- 02-01: Filament install + 5 navigation groups (Leads & CRM / Content / Website / SEO & Analytics / Settings); ManageSettings page with all company/social/WhatsApp/Calendly fields; filament-shield RBAC (Owner/Editor/Viewer) ✓ DONE
- 02-02: All public GET API controllers (Settings, BlogPost, CaseStudy, Guide, Testimonial, Service, Solution, Industry, SeoMeta, Redirects, Search, NavItems, FooterLinks); `is_published` filter on all content endpoints; `published_at <= NOW()` enforcement (REL-06) ✓ DONE
- 02-03: Lead capture — `POST /api/leads` with ApiKeyMiddleware, throttle (5/hr), honeypot validation, duplicate detection (REL-03), lead stored with source_form + UTM + IP; Resend email notification dispatched as queued job (REL-07) ✓ DONE
- 02-04: Newsletter — `POST /api/subscribers`, rate limit (REL-05), unsubscribe endpoint with signed token (REL-04); queued jobs for all side effects; database queue driver; audit log observers (REL-08) ✓ DONE
- 02-05: ISR revalidation route handler scaffold (`POST /api/revalidate`, HMAC secret); Model observers wired to fire revalidation on every content save (ADM-17)

**Success Criteria:**
1. `GET /api/settings` returns settings JSON
2. `POST /api/leads` creates lead, fires email, rejects duplicates, throttles at limit 6
3. Filament `/admin` loads with all 5 nav groups, no ungrouped resources
4. `is_published = false` items excluded from all API responses
5. Queue worker processes jobs without errors

---

## Phase 3: Homepage & Design System
**Goal:** Site nav, footer, homepage complete with full motion design system — the site looks and feels like a premium modern IT company from day one.

**Requirements:** NAV-01 → NAV-08, HOME-01 → HOME-07, COMP-02, COMP-03, COMP-06, DESIGN-01 → DESIGN-08, INFRA-03

**Plans:**
- 03-01: Design system — Tailwind 4 `@theme` CSS variables (brand blue palette, gradients, shadows, radius); shadcn/ui init; global motion config (`motion` v12 scroll-triggered variants); glassmorphism utility classes; Inter font; globals.css complete
- 03-02: SiteNav — sticky frosted-glass header, 4-group mega dropdown (Services/Solutions/Work/Resources), logo, "Book a Call" CTA; populated from `GET /api/nav-items`; mobile full-screen overlay drawer with accordion groups
- 03-03: SiteFooter — multi-column layout, social icons, newsletter opt-in strip, legal links; populated from `GET /api/footer-links`; NAV-06 (admin-editable)
- 03-04: Homepage — Hero (animated gradient bg, word-reveal headline, parallax scroll, primary + secondary CTA, social proof stat); Stats bar with animated counters; seeded sample stats
- 03-05: Homepage — Services tab section (animated tab switcher, staggered card reveals, hover glow); Solutions grid (scroll-triggered stagger); Client logos marquee (seeded sample logos, COMP-02)
- 03-06: Homepage — Testimonials section (glassmorphism cards, COMP-03 Clutch badge); Case studies preview (3 cards); "Why Buildera" differentiation section (COMP-06); bottom CTA section

**Success Criteria:**
1. Homepage scores ≥ 85 PageSpeed mobile at this stage
2. Mega nav renders all 4 groups, populates from API, works on mobile
3. Scroll animations trigger correctly; no layout shift (CLS < 0.1)
4. Stats bar counters animate on scroll-into-view
5. All homepage sections render with seeded sample content looking genuine

---

## Phase 4: Services & Solutions Pages
**Goal:** All ~24 sub-service detail pages and ~18 solution detail pages built, hardcoded, with conversion-optimised section flow and relevant sample content.

**Requirements:** SVC-01 → SVC-09, SOL-01 → SOL-03, TRUST-06, COMP-04, COMP-05

**Plans:**
- 04-01: Service page templates — reusable `ServiceDetailLayout` component implementing 10-section conversion flow (hero → pain points → outcome cards → process → industries served → related solutions → case study → testimonials → FAQ → CTA); Technology showcase component (COMP-05)
- 04-02: Website Development pages — category page + 4 sub-service detail pages (Custom Websites, E-Commerce, App Development, PWA); all seeded with relevant persuasive copy, sample case study, relevant testimonials
- 04-03: Salesforce + DevOps pages — Salesforce category (5 sub-service pages) + DevOps category (4 sub-service pages); seeded copy
- 04-04: AI Agent + Software Development pages — AI Agent (4 pages) + Software Dev (4 pages); seeded copy
- 04-05: Hire a Developer pages (3 pages); Solutions listing page + `SolutionDetailLayout` (8-section flow); all 18 solution detail pages with relevant industry cross-links and seeded copy (SOL-01 → SOL-03)
- 04-06: Inline social proof wiring — each service/solution detail page pulls 1-2 testimonials tagged to that service + 1-2 related case studies from API (TRUST-06); video embed field rendered if `video_url` present (COMP-04)

**Success Criteria:**
1. All 24 sub-service pages and 18 solution pages accessible via correct slugs
2. `generateStaticParams` prebuilds all pages at build time — no 404s
3. Each page shows relevant testimonials and a case study (seeded)
4. Industry ↔ Solution ↔ Service cross-links navigate correctly
5. Mobile layouts correct on all pages

---

## Phase 5: Industries, Trust Pages & Lead Capture
**Goal:** All industry pages live, all trust/credibility pages complete, every lead capture touchpoint wired — visitor can book a call or submit from any page.

**Requirements:** IND-01 → IND-03, LEAD-01 → LEAD-02, LEAD-08 → LEAD-14, TRUST-01 → TRUST-05, COMP-07 (cookie consent partial), COMP-08, COMP-09

**Plans:**
- 05-01: Industry pages — `IndustryDetailLayout` (8-section conversion flow); all 8 industry pages (Manufacturing, Retail/E-Commerce, Hospitality, Logistics, Finance, Healthcare, Real Estate, Professional Services) with seeded relevant solutions, case studies, testimonials, industry-specific stats
- 05-02: Trust pages — About Us (team section with placeholder photos), How We Work (animated 6-step process timeline), FAQ page with FAQ schema; Privacy Policy + Terms (TRUST-01 → TRUST-05)
- 05-03: Contact Us page (full form wired to API, Google Maps embed, response guarantee, WhatsApp button); Book a Call page (Calendly embed); Thank You page; all `source_form` tags correct (LEAD-08 → LEAD-10)
- 05-04: Mini lead form component (reusable, used at ~33% and ~66% scroll in blog/guide/case study); WhatsApp widget (admin toggle); Floating CTA button (admin toggle); all wired to `POST /api/leads` with correct `source_form` (LEAD-11 → LEAD-12)
- 05-05: Exit-intent popup + Idle popup — session-throttled, admin-configurable content, mini lead form or CTA button; NudgeBanner (admin-configurable, date-gated) (LEAD-13 → LEAD-14)

**Success Criteria:**
1. All 8 industry pages load with seeded content looking genuine
2. Contact form submits lead successfully, thank-you redirect works
3. Calendly embed loads on /book-a-call
4. Exit popup fires on mouse-leave, does not re-fire in same session
5. Floating CTA + WhatsApp widget toggle correctly from admin

---

## Phase 6: Content — Blog, Case Studies, Guides
**Goal:** Blog, Case Studies, and Guides live with ISR, full Filament CRUD, seed data, and conversion-optimised in-content lead capture.

**Requirements:** CONT-01 → CONT-08, ADM-04 → ADM-09, ADM-17, REL-01, REL-06, SEED-01 → SEED-04

**Plans:**
- 06-01: Filament content resources — BlogPost (with category/tag relation, RichEditor, author, featured image + alt text, published_at, SEO fields, is_published toggle); Author resource; Category + Tag management (REL-01)
- 06-02: Filament CaseStudy + Guide resources — full CRUD with all fields specified in ADM-05/ADM-06; Testimonial resource (ADM-07) with service + industry tag fields and featured toggle; all resources in Content nav group
- 06-03: Blog frontend — list page (category filter tabs, 12/page pagination, ISR); blog post detail page with conversion flow (mini lead form at ~33%, newsletter block at ~50%, CTA banner at ~66%, full CTA at 100%, related posts, author bio)
- 06-04: Case Studies + Guides frontend — list pages with filter; detail pages with conversion flow matching CONT-04/CONT-06; all ISR via revalidateTag; Mini lead form component placed at scroll hotspots
- 06-05: Seed data — 4 blog posts, 4 case studies, 4 guides, 8 testimonials seeded via Laravel seeders; all content genuine-looking, relevant to Buildera's services, industry-specific (SEED-01 → SEED-04)

**Success Criteria:**
1. Publishing a blog post in Filament triggers ISR, updated post appears on site within seconds
2. Blog list filters by category correctly
3. Mini lead form at scroll hotspots submits with correct `source_form` tag
4. All 4 seeded blog posts, case studies, guides visible and looking genuine
5. Testimonial tagged to "Salesforce" appears on Salesforce service pages

---

## Phase 7: SEO, Analytics & Search
**Goal:** Every page SEO-complete, all structured data in place, analytics configured via admin, site search working, internal cross-linking complete.

**Requirements:** SEO-01 → SEO-06, SEOPLUS-01 → SEOPLUS-05, ANA-01 → ANA-05, ADM-12 → ADM-14, SCALE-01, SCALE-02

**Plans:**
- 07-01: Per-page SEO — `generateMetadata` on every page pulling from `GET /api/seo/{type}/{slug}`; Filament SEO resource (ADM-14); canonical URLs; OG images; default fallbacks when admin hasn't set page-specific meta
- 07-02: Structured data — `Organization` + `WebSite` on homepage; `Service` JSON-LD on all service/solution pages (SEOPLUS-03); `FAQPage` on /faq + homepage FAQ section (SEOPLUS-04); `BlogPosting` on blog posts; `BreadcrumbList` on all deep pages (SEOPLUS-05, NAV-07)
- 07-03: Sitemap + robots — dynamic `sitemap.ts` including all published pages (blog, case studies, guides, services, solutions, industries); `robots.ts`; Filament sitemap regeneration action (ADM-16); local SEO signals on homepage + contact page (SEOPLUS-02)
- 07-04: Analytics — GA4 consent-gated (ANA-01); Clarity + pixels via ScriptInjector (ANA-02, ANA-05); UTM first/last-touch capture on lead submission (ANA-03); granular cookie consent banner — Essential / Analytics / Marketing tiers (COMP-07); Filament Analytics & Scripts admin page (ADM-12, ADM-13)
- 07-05: Pillar page architecture — service category pages upgraded to long-form pillar pages (2000+ words) with cluster blog post links (SEOPLUS-01); frontend search — `GET /api/search` endpoint + `/search` results page (SCALE-01); internal cross-linking via relation fields on all content models (SCALE-02)

**Success Criteria:**
1. Every page has unique title tag + meta description from admin or hardcoded fallback
2. Google Rich Results Test passes for FAQPage, BreadcrumbList, Service schemas
3. sitemap.xml lists all published pages; robots.txt correct
4. GA4 only fires after analytics consent accepted
5. `/search?q=salesforce` returns relevant blog/service/case study results

---

## Phase 8: Admin Completeness & Reliability
**Goal:** Admin panel fully operational — nav/footer editor, redirect manager, audit log, partner badges, all Filament resources complete and tested.

**Requirements:** ADM-02 → ADM-03, ADM-10, ADM-15 → ADM-16, REL-02 → REL-04, COMP-01, NAV-05, NAV-06, SEED-05, SEED-06

**Plans:**
- 08-01: Unified Lead Inbox — LeadResource with all filter options (source_form, status, date, service interest), duplicate badge, status pipeline, notes field; Newsletter Subscribers resource with CSV export (ADM-02, ADM-03)
- 08-02: Nav + Footer editors — NavItem and FooterLink Filament resources with drag-reorder, is_visible toggle, parent group assignment; frontend nav + footer re-fetch from API (NAV-05, NAV-06)
- 08-03: Redirect Manager — RedirectResource (source, destination, 301/302, active); Next.js middleware reads `GET /api/redirects` and applies server-side (REL-02); newsletter unsubscribe endpoint with signed token live (REL-04)
- 08-04: Partner badges resource — COMP-01 (name, logo, link, category, display_order, is_visible); seeded with 6 sample partner badges (SEED-05); Technologies showcase resource; Popup Manager (ADM-10)
- 08-05: Audit log resource — Owner-only, shows who changed what and when across all resources (REL-08); Sitemap management page with regenerate action and last-generated timestamp (ADM-15, ADM-16); SEED-06 — final copy pass on all hardcoded service/solution/industry pages

**Success Criteria:**
1. All leads from all form sources appear in unified inbox with correct source_form tag
2. Removing a nav item in Filament removes it from site nav without code deploy
3. Adding a redirect in Filament causes old URL to 301 to new URL within seconds
4. Audit log shows create/update/delete events for blog post CRUD
5. Partner badge logos display on homepage, manageable from admin

---

## Phase 9: Performance & Accessibility
**Goal:** PageSpeed ≥ 85 mobile, all Core Web Vitals pass, WCAG AA met — site is fast and accessible on any device.

**Requirements:** PERF-01 → PERF-05, A11Y-01 → A11Y-05, UX-01, UX-02

**Plans:**
- 09-01: Image audit — every `<Image>` has correct `sizes` prop, `priority` only on above-fold, all uploads served as WebP/AVIF; `optimizePackageImports` verified for `@tabler/icons-react` and `motion`
- 09-02: Bundle analysis — `next build` output checked; any `"use client"` component outside allowed list (forms, tabs, widgets, analytics) refactored to Server Component; Suspense boundaries on ISR pages
- 09-03: WCAG AA audit — contrast ratios checked across all colour combinations; 48px touch targets on all mobile interactive elements; all images have alt text; keyboard nav tested on nav, forms, modals; focus indicators visible
- 09-04: Contact page enhancements (UX-01 — response time guarantee, Google Maps embed, phone); Search-enabled 404 page (UX-02 — search bar + suggested pages)
- 09-05: Cross-browser + cross-device QA — Chrome, Firefox, Safari, Edge; iPhone SE (smallest mobile), iPad, 1080p desktop; animations perform smoothly; no layout breaks

**Success Criteria:**
1. PageSpeed Insights mobile score ≥ 85 on homepage, service detail page, blog post
2. LCP < 2.5s on simulated 4G; CLS < 0.1 on all pages
3. WCAG contrast checker passes on all text/background pairs
4. All images have alt text; keyboard tab order logical on all pages
5. Site renders correctly on iPhone SE, iPad, and 1920px desktop

---

## Phase 10: Deploy Preparation & Handoff
**Goal:** Deliver a self-contained, deploy-ready package — client uploads to Hostinger and it works first time with no guesswork.

**Requirements:** FOUND-04, HAND-01 → HAND-07, final QA

**Plans:**
- 10-01: Environment audit — `grep -r "localhost"` and `grep -r "127.0.0.1"` across entire codebase; fix every hardcoded local value; verify every config value reads from `.env`; complete both `.env.example` files with documentation for every variable (HAND-01, HAND-02)
- 10-02: Frontend deploy prep — verify `output: "standalone"`, postbuild copy script working, `ecosystem.config.js` for pm2 correct; run `next build` with production-style env values; include pre-built `.next/standalone/` in handoff (HAND-06)
- 10-03: Backend deploy prep — `composer install --no-dev`, `php artisan optimize`; export full DB dump with migrations + seed data as `buildera_production.sql`; include `storage/app/public/` folder with all media; verify all file references use `Storage::url()` (HAND-03, HAND-04, HAND-07)
- 10-04: `HANDOFF.md` — complete step-by-step deploy guide covering MySQL import, `.env` setup, `composer install`, `php artisan key:generate`, `storage:link`, Node.js config, pm2 start; smoke test checklist included (HAND-05)
- 10-05: Final smoke test — run through `HANDOFF.md` steps locally simulating production env vars; verify all pages load, lead form submits + email fires, Filament admin works, ISR revalidation works, sitemap valid, PageSpeed final check

**Success Criteria:**
1. `grep -r "localhost"` returns zero results outside `.env.example` files
2. `.env.example` documents every variable — a developer with no prior context can fill it in
3. `buildera_production.sql` imports cleanly and seeds all sample data
4. `HANDOFF.md` followed start-to-finish with fresh env vars — site works without any code changes
5. PageSpeed ≥ 85 mobile on final build

---

## Requirement Coverage

| Section | Count | Phases |
|---------|-------|--------|
| FOUND | 5 | 1 |
| NAV | 8 | 3, 8 |
| HOME | 7 | 3 |
| SVC | 9 | 4 |
| SOL | 3 | 4 |
| IND | 3 | 5 |
| LEAD | 14 | 2, 5 |
| CONT | 8 | 6 |
| ADM | 17 | 2, 6, 8 |
| SEO | 6 | 7 |
| ANA | 5 | 7 |
| PERF | 5 | 9 |
| A11Y | 5 | 9 |
| TRUST | 6 | 4, 5 |
| REL | 8 | 2, 8 |
| COMP | 7 | 3, 4, 7, 8 |
| SEOPLUS | 5 | 7 |
| DESIGN | 8 | 3 |
| PUB | 2 | 2 |
| SCALE | 2 | 7 |
| UX | 2 | 9 |
| SEED | 6 | 5, 6, 8 |
| INFRA | 3 | 1 |
| **Total** | **~138** | 10 phases |
