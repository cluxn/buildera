# Buildera — v1 Requirements

## v1 Requirements

### FOUNDATION (Project Setup)

- [ ] **FOUND-01**: Frontend repo (buildera-frontend) scaffolded with Next.js 15, TypeScript, Tailwind 4, shadcn/ui, Inter font
- [ ] **FOUND-02**: Backend repo (buildera-backend) scaffolded with Laravel 13, Filament PHP 5, MySQL
- [ ] **FOUND-03**: Environment variables defined for both repos (API URL, API key, revalidation secret, Resend key, DB)
- [ ] **FOUND-04**: Next.js configured with `output: "standalone"`, custom server.js, pm2 ecosystem.config.js for Hostinger deploy
- [ ] **FOUND-05**: Laravel API CORS configured to allow buildera.co origin only

### LAYOUT (NAV-*)

- [ ] **NAV-01**: Sticky header — Buildera logo left, 4-item mega nav center, "Book a Call" CTA button right; frosted glass / blur backdrop on scroll
- [ ] **NAV-02**: Mega dropdown — **Services**: grid of all 6 categories each with their sub-service links; **Solutions**: grid of all ~18 solution tiles; **Work**: Industries, About Us, Testimonials, Case Studies, How We Work; **Resources**: Blog, Guides, Contact Us
- [ ] **NAV-03**: Mobile nav — full-screen overlay drawer; accordion-expand per dropdown group; "Book a Call" CTA prominent at bottom
- [ ] **NAV-04**: Footer — multi-column layout (Services, Solutions, Company, Resources columns) + social icons (LinkedIn, Twitter/X, Instagram) + legal links (Privacy, Terms) + WhatsApp link + newsletter opt-in strip
- [ ] **NAV-05**: Admin-editable navigation — Filament NavItem resource: label, URL, parent group, display_order, is_visible toggle; Owner can add/remove/reorder/rename any nav link or dropdown group without code deploy; unpublished pages automatically hidden from nav
- [ ] **NAV-06**: Admin-editable footer — Filament FooterLink resource: label, URL, column group (Services/Solutions/Company/Resources), display_order, is_visible toggle; same CRUD as nav
- [ ] **NAV-07**: Breadcrumbs on all deep pages (service detail, solution detail, blog post, case study, guide, industry); `BreadcrumbList` JSON-LD included
- [ ] **NAV-08**: Skip-to-content link for keyboard/screen-reader accessibility (WCAG AA)

### HOMEPAGE (HOME-*)

- [ ] **HOME-01**: Hero section — headline, sub-headline, primary CTA ("Book a Free Call"), secondary CTA ("View Services"), social proof stat
- [ ] **HOME-02**: Services overview section — 6-tab switcher (Website Dev, Salesforce Dev, DevOps Dev, AI Agent Dev, Software Dev, Hire a Dev) with sub-service cards
- [ ] **HOME-03**: Solutions grid section — scrollable/filterable grid of ~18 solution tiles with links to detail pages
- [ ] **HOME-04**: Stats bar — 4 key numbers (e.g., years experience, projects delivered, clients, satisfaction rate); each stat (label + value) admin-manageable via Settings; seeded with genuine-looking sample values (e.g., "150+ Projects Delivered", "50+ Happy Clients", "6+ Years Experience", "98% Client Satisfaction") that client replaces with real data
- [ ] **HOME-05**: Testimonials section — 3-5 client quotes with name, company, photo
- [ ] **HOME-06**: Case studies preview — 3 featured case studies with headline, industry, results metric
- [ ] **HOME-07**: CTA section — bottom-of-page conversion block with "Book a Free Discovery Call" button

### SERVICES (SVC-*)

- [ ] **SVC-01**: Services overview page — all 6 categories with tab navigation
- [ ] **SVC-02**: Individual service category pages — each of the 6 categories has a dedicated page listing its sub-services
- [ ] **SVC-03**: Sub-service detail page template — conversion-optimised section flow: (1) Hero — problem-led headline + 1-line outcome + CTA; (2) Pain points — 3 bullets of what the SMB is dealing with right now; (3) What we deliver — 3-4 outcome cards (not feature lists); (4) Our process — 3-step simplified How We Work; (5) Industries we serve with this — relevant industry tiles with links; (6) Relevant solutions — 2-3 solution tiles that complement this service; (7) Featured case study — 1 real-looking sample until replaced; (8) Testimonials — 1-2 testimonials tagged to this specific service pulled from Testimonial resource; (9) FAQ — 3-4 questions SMBs actually ask before buying this service; (10) CTA section — "Ready to build? Book a free call"
- [ ] **SVC-04**: Website Development sub-service pages — Custom Websites, E-Commerce Websites, App Development, Progressive Web Apps (4 pages)
- [ ] **SVC-05**: Salesforce Development sub-service pages — CRM, Marketing Cloud, Service Cloud, Commerce Cloud, Experience Cloud (5 pages)
- [ ] **SVC-06**: DevOps Development sub-service pages — Cloud Infrastructure & DevOps, CI/CD Pipeline, Cloud Infrastructure Management, Server Monitoring & Maintenance (4 pages)
- [ ] **SVC-07**: AI Agent Development sub-service pages — AI Agent Dev & Integration, Custom API Dev & Integration, Business Optimization (AI+Automation), AI Chatbots & Virtual Assistants (4 pages)
- [ ] **SVC-08**: Software Development sub-service pages — ERP Development, CRM Development, SaaS Development, MVP Development (4 pages)
- [ ] **SVC-09**: Hire a Developer pages — Dedicated Development Teams, Flexible Engagement Models, End-to-End Technical Support (3 pages)

### SOLUTIONS (SOL-*)

- [ ] **SOL-01**: Solutions listing page — grid of all ~18 solution tiles (name, icon, brief description, link)
- [ ] **SOL-02**: Solution detail page template — conversion flow: (1) Hero — outcome headline + 1-line what it is + CTA; (2) The problem — 3 pain points without this solution; (3) What it does — 4 feature-outcome cards; (4) Industries it serves — relevant industry tiles with links; (5) Related services — 2-3 service tiles; (6) Sample case study — real-looking until replaced; (7) Testimonials tagged to this solution; (8) CTA
- [ ] **SOL-03**: All 18 solution detail pages built from template — Operations Mgmt, Vendor Mgmt, OTA Channel Partner, Supply Chain, Project Mgmt, Accounting Mgmt, Warehouse Mgmt, Hotels & Resorts, Financial Mgmt, Fleet Mgmt, Airbnb & Vacation Rental, HR Mgmt, Lead Mgmt, Sales Mgmt, CRM, India Mart Automation, ERP, Manufacturing/Production

### INDUSTRIES (IND-*)

- [ ] **IND-01**: Industries listing page — grid of industry tiles with links
- [ ] **IND-02**: Industry detail page template — conversion flow: (1) Hero — industry-specific headline + resonant stat + CTA; (2) Challenges this industry faces — 3-4 pain points they immediately recognise; (3) Solutions we've built for this industry — relevant solution tiles with sample context; (4) Services we use — relevant service tiles; (5) Sample case study from this industry; (6) Testimonial tagged to this industry; (7) Tech stack we use; (8) CTA
- [ ] **IND-03**: Individual industry pages built from template (Manufacturing, Retail/E-Commerce, Hospitality, Logistics/Supply Chain, Finance, Healthcare, Real Estate, Professional Services)

### LEAD CAPTURE (LEAD-*)

**All lead forms use the same `POST /api/leads` endpoint — differentiated by `source_form` field:**
- `contact-form` — full contact page form
- `mini-cta` — inline mini form inside blog/guide/case study (at ~33% or ~66% scroll)
- `mini-popup` — exit-intent or idle popup form
- `floating-cta` — floating CTA button form
- `service-cta` — CTA on service/solution/industry detail pages
- `homepage-cta` — homepage bottom CTA section

- [ ] **LEAD-01**: Full contact form — name, email, phone, company, service interest (dropdown of 6 services), message, honeypot field, source_form = "contact-form"
- [ ] **LEAD-02**: Mini lead form (reusable component) — name + email + optional service interest, short headline, submit CTA; used inside blog/guide/case study at conversion hotspots; source_form tagged per placement
- [x] **LEAD-03**: All lead forms submit to `POST /api/leads` with X-API-Key header + honeypot validation
- [x] **LEAD-04**: Lead stored in MySQL with: source_page (URL path), source_form (form type tag), UTM first-touch + last-touch, timezone, IP (hashed), submitted_at
- [x] **LEAD-05**: Email notification to Buildera on every new lead via Resend (includes name, email, service interest, source)
- [ ] **LEAD-06**: Form success states — full form: redirect to /thank-you; mini forms: inline success message (no redirect)
- [x] **LEAD-07**: Throttle: 5 lead submissions per IP per hour (429 response on breach)
- [ ] **LEAD-08**: Contact Us page at `/contact` — full form + company contact info + WhatsApp button + Calendly link
- [ ] **LEAD-09**: Book a Call page at `/book-a-call` — Calendly embed (full-page) + brief "what to expect" copy
- [ ] **LEAD-10**: Thank You page at `/thank-you` — confirmation message, next steps, links back to services/blog
- [ ] **LEAD-11**: WhatsApp click-to-chat widget — floating bottom-right, admin-toggleable, admin-configurable phone number
- [ ] **LEAD-12**: Floating CTA button — fixed position bottom-right (above WhatsApp), admin-toggleable, admin-configurable label + destination URL
- [ ] **LEAD-13**: Exit-intent popup — fires on mouse-leave-viewport; headline + body + mini lead form or CTA button; admin-configurable content + enabled toggle; does not re-fire within same session
- [ ] **LEAD-14**: Idle popup — fires after N seconds of inactivity (admin-configurable); same form/CTA structure as exit popup; session-throttled

### CONTENT (CONT-*)

**Lead capture placement strategy (conversion-optimized):**
- **~33% scroll** — inline mini lead form (name + email + "Get a Free Consultation") embedded mid-content
- **~66% scroll** — mini CTA banner (full-width, contrasting color, one-line headline + button)
- **100% / end of content** — full inline CTA section (book a call + contact form shortcut)
- **Sidebar (desktop)** — sticky mini lead form visible while reading (if layout permits)
- **Exit intent** — popup fires when visitor moves to close/navigate away

- [ ] **CONT-01**: Blog list page — cards with featured image, title, excerpt, author avatar + name, date, reading time, category badge; pagination (12 per page); category filter tabs at top
- [ ] **CONT-02**: Blog post detail page — hero image with alt text, title, author + date + reading time header, full RichEditor body, inline mini lead form at ~33% scroll depth (name + email + CTA), full-width mini CTA banner at ~66%, related posts (3 cards) at bottom, full CTA section at 100%, author bio card at bottom
- [ ] **CONT-03**: Case Studies list page — cards with hero image, client name (or anonymous), industry badge, headline result stat (e.g., "40% faster ops"), brief problem statement; filter by industry
- [ ] **CONT-04**: Case Study detail page — problem section, solution section (with approach steps), results section (metric cards: before/after), testimonial quote block, inline mini CTA at mid-page (~50% scroll), full CTA section at bottom with "Start a Similar Project" button
- [ ] **CONT-05**: Guides/Resources list page — cards with cover image, title, description, resource type badge (Article/Template/Checklist); category filter
- [ ] **CONT-06**: Guide detail page — cover image, intro, full RichEditor body, inline mini lead form at ~33% (name + email + "Get This Delivered"), full-width CTA banner at ~66%, related guides at bottom, full CTA section at 100%
- [ ] **CONT-07**: Testimonials page — masonry or grid layout of all testimonials; each card shows quote, client name, title, company logo, star rating; filterable by service category
- [ ] **CONT-08**: Newsletter opt-in — footer email field + "Subscribe" button → `POST /api/subscribers`; also appears as inline block inside blog posts at ~50% scroll as an alternative to lead form

### ADMIN PANEL (ADM-*)

**Navigation Groups (clean, not cluttered):**
- **Leads & CRM** — Unified Lead Inbox, Newsletter Subscribers, Lead Sources breakdown
- **Content** — Blog Posts, Case Studies, Guides, Testimonials, Authors
- **Website** — Page Content (homepage sections, announcement bar, popups, floating CTA, mini CTAs)
- **SEO & Analytics** — SEO Metadata, Analytics Scripts, Sitemap
- **Settings** — General Settings (company info, social, WhatsApp, Calendly), User Management

- [x] **ADM-01**: Filament admin at `/admin` with Sanctum session auth; navigation organized into 5 groups (Leads & CRM, Content, Website, SEO & Analytics, Settings) — no ungrouped resources
- [ ] **ADM-02**: Unified Lead Inbox — all leads from ALL sources (contact form, mini CTA, mini popup, floating CTA, exit-intent popup, inline blog CTA) land in one table; tagged by `source_form` (contact-form / mini-cta / mini-popup / floating-cta / exit-popup / inline-blog); filterable by source, status, date, service interest
- [ ] **ADM-03**: Newsletter Subscribers resource — separate from leads; email, source_page, subscribed_at, status (active/unsubscribed); bulk export CSV
- [ ] **ADM-04**: Blog Post resource — title, slug (auto), excerpt, body (RichEditor with image embed), category (multi-select), tags, author (relation), featured image (Spatie MediaLibrary with mandatory alt text field), reading time (auto-calculated), published_at, is_featured toggle, SEO fields (title tag, meta desc, OG image), status (draft/published/archived)
- [ ] **ADM-05**: Case Study resource — title, slug, client name, industry (select), hero image with alt text, problem (RichEditor), solution (RichEditor), results (RichEditor), key metrics (repeatable field: label + value), testimonial quote + author (optional), featured toggle, published_at, SEO fields
- [ ] **ADM-06**: Guide resource — title, slug, category, description, body (RichEditor), cover image with alt text, resource type (article/template/checklist/video), external link or file upload, published_at, SEO fields
- [ ] **ADM-07**: Testimonial resource — quote text, client name, job title, company, company logo upload with alt text, star rating (1-5), service category (which service this testimonial is about), is_featured toggle, display_order; all testimonials across the entire site managed here
- [ ] **ADM-08**: Author resource — name, bio, avatar upload with alt text, LinkedIn URL, role/title
- [ ] **ADM-09**: Page Content resource — manage editable sections of homepage (hero headline, hero subtext, stats bar values, CTA section text), announcement/nudge bar, floating CTA text, mini CTA copy — each section as a named key-value block
- [ ] **ADM-10**: Popup Manager — exit-intent popup (headline, body, CTA text, CTA link, image, enabled toggle); idle popup (same fields + trigger delay in seconds); each popup previewed inline before enabling
- [x] **ADM-11**: Settings page (General) — company name, email, phone, address, Calendly URL, WhatsApp number (with widget enable toggle), LinkedIn/Instagram/Twitter/X URLs, footer tagline, footer copyright text
- [ ] **ADM-12**: Analytics & Scripts page — GA4 measurement ID, Clarity project ID, Facebook Pixel ID, LinkedIn Insight tag ID, Google Ads conversion ID, GSC HTML verification tag, custom `<head>` scripts textarea, custom `<body>` scripts textarea
- [ ] **ADM-13**: Nudge/Announcement Banner — text, destination URL, background color picker, start date, end date, enabled toggle; preview shown in admin before enabling
- [ ] **ADM-14**: SEO Metadata resource — per-page records keyed by page type + slug; fields: title tag, meta description, canonical URL, OG title, OG description, OG image upload, robots (index/noindex); covers homepage, service pages, solution pages, industry pages, blog, case studies, guides
- [ ] **ADM-15**: User management — CRUD for admin users with role assignment (Owner / Editor / Viewer via filament-shield); Owner = full access, Editor = content + leads only, Viewer = read-only
- [ ] **ADM-16**: Sitemap management — manual "Regenerate Sitemap" action button, last generated timestamp shown, download link for sitemap.xml
- [x] **ADM-17**: ISR revalidation — on every content save (blog, case study, guide, testimonial, settings, SEO), automatically fire POST to Next.js /api/revalidate with the correct cache tag; log last revalidation time per resource [scaffold: 02-01 wired RBAC/settings; full observers in 02-05]

### SEO (SEO-*)

- [ ] **SEO-01**: `generateMetadata` on every page — title, description, OG tags pulled from Laravel SEO API
- [ ] **SEO-02**: Canonical URLs on all pages
- [ ] **SEO-03**: robots.txt generated at `/robots.ts`
- [ ] **SEO-04**: Sitemap.xml generated at `/sitemap.ts` — includes all published blog posts, case studies, guides, service/solution/industry pages
- [ ] **SEO-05**: JSON-LD structured data on homepage (Organization), blog posts (BlogPosting), case studies (Article)
- [ ] **SEO-06**: Open Graph images configured (default og-image.png, per-post override)

### ANALYTICS (ANA-*)

- [ ] **ANA-01**: GA4 integration — admin-configurable, consent-gated, handles client-side navigation
- [ ] **ANA-02**: Microsoft Clarity — injected via ScriptInjector using admin-stored project ID
- [ ] **ANA-03**: UTM parameter capture — first-touch and last-touch stored with lead submission
- [ ] **ANA-04**: Cookie consent banner — admin-configurable text, accept/decline, GA4 gated behind consent
- [ ] **ANA-05**: Additional tracking pixels (Facebook, LinkedIn, Google Ads) — injected via admin script fields

### PERFORMANCE (PERF-*)

- [ ] **PERF-01**: All images served as WebP/AVIF via next/image with correct `sizes` prop
- [ ] **PERF-02**: `priority` prop on above-fold hero images only
- [ ] **PERF-03**: `@tabler/icons-react` and `motion` in `optimizePackageImports` in next.config.ts
- [ ] **PERF-04**: PageSpeed Insights score ≥ 85 on mobile
- [ ] **PERF-05**: Core Web Vitals — LCP < 2.5s on 4G, CLS < 0.1

### ACCESSIBILITY (A11Y-*)

- [ ] **A11Y-01**: WCAG AA color contrast ratios met across all text/background combinations
- [ ] **A11Y-02**: 48px minimum touch targets on all interactive elements (mobile)
- [ ] **A11Y-03**: All images have descriptive alt text
- [ ] **A11Y-04**: Keyboard navigation works for all interactive elements
- [ ] **A11Y-05**: Focus indicators visible on all focusable elements

### TRUST PAGES (TRUST-*)

- [ ] **TRUST-01**: About Us page — company story, mission, values, team members (name, role, photo, LinkedIn), founding context; builds "who are these people?" confidence
- [ ] **TRUST-02**: How We Work page — 4-6 step engagement process (Discovery → Proposal → Build → QA → Launch → Support); addresses "will this go wrong?" fear
- [ ] **TRUST-03**: FAQ page at `/faq` — answers to: cost range, timeline, team size, technologies, support model, how to get started; also FAQ section embedded on homepage
- [ ] **TRUST-04**: Privacy Policy page at `/privacy-policy` — required for GDPR, cookie consent banner, and user trust
- [ ] **TRUST-05**: Terms of Service page at `/terms` — required for legal compliance
- [ ] **TRUST-06**: Inline social proof on service/solution detail pages — each detail page shows 1-2 relevant testimonials and 1-2 related case studies pulled by service/industry tag (not just on dedicated pages)

### RELIABILITY (REL-*)

- [x] **REL-01**: Category and Tag management resource in Filament — CRUD for blog/guide categories and tags; prevents duplicate/inconsistent taxonomy
- [ ] **REL-02**: Redirect Manager — Filament resource (source path, destination path, type 301/302, active toggle); `GET /api/redirects` endpoint; Next.js middleware reads redirects and applies them — prevents broken URLs when slugs change
- [ ] **REL-03**: Duplicate lead detection — on `POST /api/leads`, if an email already exists in leads table within last 30 days, flag as duplicate in admin (do not block submission; just mark `is_duplicate = true` and link to original); Filament shows duplicate badge in lead inbox
- [x] **REL-04**: Newsletter unsubscribe endpoint — `GET /unsubscribe?token={signed_token}` route; marks subscriber as unsubscribed; required before any newsletter emails are sent (CAN-SPAM / GDPR)
- [x] **REL-05**: Rate limiting on `/api/subscribers` — 3 newsletter signups per IP per hour (same throttle pattern as leads)
- [x] **REL-06**: `published_at <= NOW()` enforced on all content API endpoints — blog posts, case studies, guides only returned if `published_at` is set and not in the future; status must be `published`
- [x] **REL-07**: Queued jobs for side effects — lead email notification, ISR revalidation call, and sitemap regeneration dispatched as queued jobs (database queue driver); prevents lead form timeout if Resend or Next.js is slow
- [x] **REL-08**: Audit log — Filament AuditLog resource records who changed what and when across all resources; visible to Owner role only; uses Laravel model observers

### COMPETITIVE (COMP-*)

- [ ] **COMP-01**: Partner & certification badges section — Salesforce Partner, Google Cloud, Microsoft, AWS, Shopify Partner logos displayed on homepage and About page; Filament resource to manage badge name + logo + link + display_order
- [ ] **COMP-02**: Client logos strip — scrolling marquee of client/partner logos on homepage; seeded with 8-10 sample industry-relevant logos (generic tech/business brand-style logos that look genuine); admin-manageable: logo upload + alt text + link + display_order + is_visible toggle; client replaces with real logos post-launch
- [ ] **COMP-03**: Clutch / GoodFirms / DesignRush review badges — embedded widget or static badge image with rating + review count on homepage hero and contact page; admin-configurable badge URL + rating text
- [ ] **COMP-04**: Video support — YouTube/Vimeo embed field on homepage hero (optional autoplay loop), case study detail pages (video testimonial), service detail pages (explainer video); Filament field: video_url (nullable); frontend renders embed if present
- [ ] **COMP-05**: Technologies showcase section — grid of technology/tool logos (React, Node.js, Python, PHP, AWS, Azure, Salesforce, Shopify, MySQL, etc.); displayed on homepage and a dedicated `/technologies` page; Filament resource: name + logo + category (Frontend/Backend/Cloud/CRM/E-Commerce) + display_order
- [ ] **COMP-06**: "Why Buildera" differentiation section on homepage — addresses the 3-way decision: Buildera vs hiring in-house vs freelancer; structured as feature comparison rows (Cost / Speed / Communication / Accountability / Expertise) with checkmarks/crosses
- [ ] **COMP-07**: Granular cookie consent — two-tier consent (Essential always on; Analytics + Marketing require opt-in); GA4, Clarity, Facebook Pixel, LinkedIn only load after analytics consent is given; consent preference stored in localStorage

### SEO ADVANCED (SEOPLUS-*)

- [ ] **SEOPLUS-01**: Pillar page architecture — each of the 6 service categories has a long-form pillar page (2000+ words covering the full category); cluster blog posts in that category link back to the pillar page; pillar pages get `generateMetadata` with category-level SEO fields from admin
- [ ] **SEOPLUS-02**: Local SEO content — homepage and contact page reference key Indian cities served (Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad, Ahmedabad); city-specific meta signals; Google Business Profile link in footer
- [ ] **SEOPLUS-03**: Service schema structured data — `Service` JSON-LD on every service and solution detail page (name, description, provider, areaServed, serviceType)
- [ ] **SEOPLUS-04**: FAQPage schema — `FAQPage` JSON-LD on `/faq` page and FAQ section on homepage; each Q&A pair included as structured data for Google rich results (FAQ dropdowns in SERP)
- [ ] **SEOPLUS-05**: BreadcrumbList schema — `BreadcrumbList` JSON-LD on all deep pages (service detail, solution detail, blog post, case study, guide, industry page); increases CTR via breadcrumb display in search results

### DESIGN (DESIGN-*)

- [ ] **DESIGN-01**: Motion-first UI — scroll-triggered entrance animations (fade-up, stagger) on all section blocks using `motion` (Framer Motion v12); page transitions on route change; demonstrates Buildera's frontend capability through the site itself
- [ ] **DESIGN-02**: Hero animation — animated gradient background or floating tech-element illustration (SVG/canvas); animated headline word reveal on load; subtle parallax on scroll
- [ ] **DESIGN-03**: Card micro-interactions — hover lift + border glow on all service/solution/industry cards; icon color shift on hover; smooth 200ms transitions throughout
- [ ] **DESIGN-04**: Glassmorphism / frosted-glass accents — nav blur-backdrop, stat cards, testimonial cards use `backdrop-filter: blur` with subtle border; minimal but premium feel
- [ ] **DESIGN-05**: Gradient system — consistent blue gradient palette (from brand primary to deeper blue/indigo); used on CTAs, section backgrounds, badge accents; defined as CSS variables in `@theme`
- [ ] **DESIGN-06**: Animated stats counters — numbers count up when scrolled into view (e.g., "0 → 150+ projects"); reinforces capability perception
- [ ] **DESIGN-07**: Staggered list reveals — service tab content, solution grid, team members animate in with staggered delay; no static dumps of content
- [ ] **DESIGN-08**: Tab switcher animation — services tab content cross-fades / slides on tab change; active tab underline slides with motion

### UX ADVANCED (UX-*)

- [ ] **UX-01**: Contact page enhancements — response time guarantee ("We respond within 4 business hours"), Google Maps embed for office location, direct phone number, time zone indicator
- [ ] **UX-02**: Search-enabled 404 page — `not-found.tsx` includes search input wired to `/api/search`; shows suggested popular pages; rescues visitors from dead links

### PUBLISHING (PUB-*)

- [x] **PUB-01**: Published/unpublished toggle on ALL content types — service pages, solution pages, industry pages, blog posts, case studies, guides, testimonials each have `is_published` boolean; frontend only renders published items; Filament shows status badge and toggle action on every resource
- [x] **PUB-02**: Unpublished items excluded from nav dropdowns, sitemap, and search results — when a service/solution/industry is unpublished, it disappears from mega menu, sitemap.xml, and API responses automatically

### SCALING (SCALE-*)

- [ ] **SCALE-01**: Frontend search — `GET /api/search?q={query}` endpoint on Laravel (MySQL FULLTEXT on title + excerpt + body for blog, case studies, guides); search results page at `/search` on Next.js; minimum viable, upgradeable to Algolia/Typesense later
- [ ] **SCALE-02**: Internal linking — service detail pages link to related solutions and industries; solution detail pages link to relevant services; industry pages link to related services and solutions; implemented via relation fields in content models, not hardcoded

### SEED DATA (SEED-*)

*All seed data must look genuinely real and be relevant to Buildera's actual services. Client replaces with real content post-launch. Managed entirely from admin panel.*

- [ ] **SEED-01**: 4 sample blog posts — topics directly relevant to Buildera's services (e.g., "How AI Automation Saved a Mumbai Manufacturer 20 Hours a Week", "Salesforce CRM vs Custom CRM — Which Is Right for Your Business?", "5 Signs Your Supply Chain Needs a Software Upgrade", "What to Look for When Hiring a Dedicated Development Team"); each with full body, author, featured image, category, tags, reading time
- [ ] **SEED-02**: 4 sample case studies — one per major service area (e.g., Warehouse Management System for a logistics company; Salesforce CRM rollout for a trading firm; Custom E-Commerce platform for a retail SMB; AI automation for a manufacturing operation); each with client (anonymised), industry, problem, solution, results with metrics (e.g., "40% reduction in manual data entry"), testimonial quote
- [ ] **SEED-03**: 4 sample guides — (e.g., "The SMB Owner's Guide to Choosing Business Software", "Salesforce Onboarding Checklist for Small Teams", "DevOps Readiness Checklist for Growing Companies", "How to Brief a Software Development Agency"); each with full content, cover image, category
- [ ] **SEED-04**: 8 sample testimonials — 2 per major service area (Website Dev, Salesforce, AI/Software, DevOps/Hire); each with realistic name, job title, company type (not real companies), star rating, quote that mentions a specific outcome; each tagged to the relevant service + industry so they appear on the correct detail pages
- [ ] **SEED-05**: Sample partner/certification logos — 6 sample partner-style badges (Salesforce Partner, Google Cloud, Microsoft Solution Partner, AWS Partner, Shopify Partner, Meta Business Partner) seeded as SVG/PNG placeholders; client replaces with official certified badges
- [ ] **SEED-06**: All service, solution, and industry pages seeded with real-looking persuasive copy — headlines, pain-point bullets, outcome cards, FAQ answers, and process steps written for SMB decision-makers who scan; copy references specific industries and outcomes (not generic "we deliver quality solutions"); client updates tone/specifics but structure and sample copy are launch-ready

### HANDOFF (HAND-*)

*Prevents the "worked locally, nothing works on server" failure. Every value that differs between local and production must be in `.env` — never hardcoded.*

- [ ] **HAND-01**: Zero hardcoded local values — `NEXT_PUBLIC_API_URL`, `APP_URL`, DB credentials, API keys, Resend key, Calendly URL, revalidation secret must all come from `.env`; `grep -r "localhost"` on final build must return zero results outside `.env.example`
- [ ] **HAND-02**: Complete `.env.example` for both repos — every variable documented with: what it is, where to get it, example format; grouped by category (App, Database, API, Email, Analytics); client fills this in before first deploy
- [ ] **HAND-03**: Database SQL dump included in handoff — `buildera_production.sql` exported from local dev DB with all migrations run and seed data included; client imports this on Hostinger MySQL before starting Laravel
- [ ] **HAND-04**: Media/storage files included — `buildera-backend/storage/app/public/` folder included in handoff zip with all seeded images (logos, team photos, blog featured images); client uploads this to server, runs `php artisan storage:link`
- [ ] **HAND-05**: `HANDOFF.md` document in project root — step-by-step deploy instructions: (1) Create MySQL DB on Hostinger, (2) Import SQL dump, (3) Copy `.env.example` → `.env`, fill all values, (4) Run `composer install --no-dev`, (5) Run `php artisan key:generate`, (6) Run `php artisan storage:link`, (7) Point Node.js to `buildera-frontend/.next/standalone/server.js`, (8) Set Node.js env vars, (9) Start pm2; no step can be skipped
- [ ] **HAND-06**: Frontend built against configurable env — `next build` uses `NEXT_PUBLIC_API_URL` from `.env`; handoff includes both the source code AND a pre-built `.next/standalone/` folder built with placeholder-documented env vars; client can either use pre-built or rebuild after setting their own `.env`
- [ ] **HAND-07**: No absolute local file paths anywhere — all file references use Laravel's `Storage::url()` or `asset()` helpers; all frontend image URLs come from the API response, never hardcoded paths

### INFRASTRUCTURE (INFRA-*)

- [ ] **INFRA-01**: Database indexes — `leads.created_at`, `leads.email`, `leads.source_form`, `blog_posts.published_at`, `blog_posts.slug`, `case_studies.industry` indexed in migrations for query performance
- [ ] **INFRA-02**: Health check endpoint — `GET /api/health` returns `{ status: "ok", db: "ok", timestamp }` — used for uptime monitoring and Hostinger server checks
- [ ] **INFRA-03**: Error pages — custom Next.js `not-found.tsx` (404) and `error.tsx` (500) with navigation back to homepage and key sections; not blank browser errors

---

## v2 Requirements (Deferred)

- Client portal / authenticated project tracking area
- Live chat integration (beyond WhatsApp widget)
- Multi-language / i18n support
- Job board / careers section
- Community / resources hub
- AI chat widget (Intercom-style)
- Advanced CRM pipeline in Filament (beyond lead status tracking)
- API response caching (`Cache::remember()` on Laravel GET endpoints) — add when traffic demands it
- Cloudflare DNS proxy — add when ready to scale infrastructure
- S3/Cloudflare R2 media storage — switch from local disk when moving to multi-server or VPS

---

## Out of Scope

- Custom booking system — Calendly handles this
- E-commerce / payment processing — Buildera doesn't sell products directly
- Redis — not available on Hostinger Business Plan
- JWT auth for public users — no authenticated user area in v1
- WordPress / headless CMS — confirmed stack is Next.js + Laravel
- Mid-project deploys — full build first, deploy once at end
- GitHub / CI/CD pipeline — no version control hosting; client deploys the final codebase to Hostinger themselves after handoff
- ROI calculator — separate lead/guide pages cover this
- Free audit offer — guide pages handle lead magnet function
- Pricing/engagement models page — not appropriate for v1
- Unified resource center (`/resources` hub) — separate Blog/Guides/Case Studies pages are sufficient
- Awards/press section — no awards to display at launch

---

## Traceability

| Phase | Requirements Covered |
|-------|---------------------|
| Phase 1 | FOUND-01 → FOUND-05, INFRA-01 → INFRA-03 |
| Phase 2 | ADM-01, ADM-11, LEAD-03 → LEAD-07, ADM-17 (scaffold), REL-05 → REL-08 |
| Phase 1 | FOUND-01 → FOUND-05, INFRA-01 → INFRA-03 |
| Phase 2 | ADM-01, ADM-11, LEAD-03 → LEAD-07, ADM-17 (scaffold), REL-05 → REL-08, PUB-01 → PUB-02 |
| Phase 3 | NAV-01 → NAV-08, HOME-01 → HOME-07, COMP-02, COMP-03, COMP-06, DESIGN-01 → DESIGN-08 |
| Phase 4 | SVC-01 → SVC-09, SOL-01 → SOL-03, TRUST-06, COMP-04, COMP-05 |
| Phase 5 | IND-01 → IND-03, LEAD-01 → LEAD-02, LEAD-08 → LEAD-14, TRUST-01 → TRUST-05 |
| Phase 6 | CONT-01 → CONT-08, ADM-04 → ADM-09, ADM-17, REL-01, REL-06 |
| Phase 7 | SEO-01 → SEO-06, SEOPLUS-01 → SEOPLUS-05, ANA-01 → ANA-05, ADM-12 → ADM-14, SCALE-01, SCALE-02 |
| Phase 8 | ADM-02 → ADM-03, ADM-10, ADM-15 → ADM-16, REL-02 → REL-04, COMP-01, COMP-07, UX-01, UX-02 |
| Phase 9 | PERF-01 → PERF-05, A11Y-01 → A11Y-05 |
| Phase 10 | FOUND-04 (deploy config), final smoke test |
