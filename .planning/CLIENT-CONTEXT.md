# Buildera — Client-Provided Context

**Captured:** 2026-05-26

---

## Admin Panel Credentials (Seeder)

| Field | Value |
|-------|-------|
| Name | Vinay |
| Designation / Title | Founder |
| Email | info@digipexel.com |
| Password | Vinay@12345 |

> Used in Phase 2 database seeder for the default admin user. Password must be hashed via `bcrypt()` in the seeder — never stored plain.

---

## Company Contact Details

| Field | Value |
|-------|-------|
| Phone | +91-82994 06767 |
| Email | info@buildera.co |
| Address | 117/Q/457/10A Indrapuri, Sharda Nagar, Kanpur — Pincode 208025 |
| Google Maps | Executor to find embed code for: "117/Q/457/10A Indrapuri Sharda Nagar Kanpur 208025" |

> Used on: Contact Us page (Phase 5), Footer (Phase 3), About Us page (Phase 5).

---

## Footer Attribution

Add this line at the bottom of the site footer (outside main footer columns):

> Developed and managed by [Buildera Technologies LLP](https://buildera.co) — with `rel="nofollow"` on the link.

HTML: `<a href="https://buildera.co" rel="nofollow">Buildera Technologies LLP</a>`

---

## SEO Requirements

- Every page must have unique `<title>` and `<meta description>` — pulled from admin or hardcoded fallbacks
- Sitemap at `/sitemap.xml` listing all published pages (blog, case studies, guides, services, solutions, industries)
- `robots.txt` allowing all crawlers
- Structured data: Organization + WebSite on homepage, Service on service/solution pages, FAQPage on FAQ, BlogPosting on blog posts, BreadcrumbList on all deep pages
- Local SEO signals on homepage + contact page (NAP — Name, Address, Phone)
- These are all covered in Phase 7 (SEO, Analytics & Search)

---

## Previous Clients (Case Studies Seed Data)

Use these as the basis for seeded case studies. All details are approximate — make them look genuine based on the nature of each client.

| Client | Category | Notes |
|--------|----------|-------|
| Saharsh Packaging | Software Development | Packaging company — likely inventory/order management software |
| Ease My Hotel | SaaS | Hotel management SaaS platform |
| Shivaansh / Equi Brief | SaaS (MVP) | MVP development — equity/brief management tool |
| Insurance Management — PV Krishnan | Software Development | Insurance policy/client management system |
| Aroma Monk | Website Development | Perfume & essential oil manufacturer — B2B and B2C e-commerce site. Perfume/essential oil brand. |
| SRJ | Website Development | PHE (Plate Heat Exchanger) plates & gasket manufacturer — B2B industrial |
| Barrel Books | SaaS | Indian liquor shop stock management — replaces paper registers with digital stock tracking, purchases, transfers, daily reports. URL: barrelbooks.com |
| GNC Exports | Website Development | Industrial fabrics & technical textiles manufacturer — B2B global export. URL: gncexports.in |

**Seeding guidance (Phase 6):**
- Use client names but fabricate realistic project details, results metrics, and testimonials
- Aroma Monk: focus on B2B/B2C e-commerce, product catalogue, wholesale inquiry
- SRJ: industrial B2B, product catalogue, inquiry form
- Barrel Books: SaaS dashboard, daily stock tracking, multi-location reports
- GNC Exports: product showcase, export compliance, inquiry form
- Ease My Hotel: hotel dashboard, booking management, revenue tracking
- No real images available — use placeholder images with descriptive alt text

---

## Phase Applicability

| Item | Applies To |
|------|------------|
| Admin seeder (Vinay) | Phase 2 (Backend Core — user seeder) |
| Contact details | Phase 3 (Footer), Phase 5 (Contact page) |
| Footer nofollow attribution | Phase 3 (SiteFooter component) |
| SEO optimization | Phase 7 (SEO, Analytics & Search) |
| Sitemap | Phase 7 |
| Client case studies | Phase 6 (Content seed data) |
