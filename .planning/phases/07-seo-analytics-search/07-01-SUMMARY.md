---
plan: "07-01"
phase: 7
status: complete
completed_at: "2026-05-29"
requirements_addressed:
  - SEO-01
  - SEO-02
  - SEO-06
  - ADM-14
---

# 07-01: SEO Metadata — Admin + Helper + All Pages

## What Was Built

**SeoMetaResource (Filament):** Full CRUD for per-page SEO records under the "SEO & Analytics" navigation group. Uses `Schema::make()` (Filament v5 API). Fields: page_type select, page_slug, title (70 char), description (160 char), canonical_url, og_image, robots. Registered SeoMeta in ContentObserver so saving a record dispatches revalidation.

**`src/lib/seo.ts`:** `generateSeoMetadata(type, slug, fallback)` helper — fetches SEO record from `/api/seo/{type}/{slug}` and settings in parallel, builds full Next.js `Metadata` object with title, description, canonical, robots, openGraph, twitter.

**`src/lib/api.ts` additions:** `fetchSeoMeta()`, `SeoMeta` interface, and analytics + SEO default fields on the `Settings` type (`default_seo_title`, `default_seo_description`, `og_image`).

**All pages have `generateMetadata`:**
- Static pages: homepage, about, contact, faq, how-we-work, book-a-call, thank-you, privacy, terms, services, solutions, industries
- Dynamic pages: services/[category], services/[category]/[slug], solutions/[slug], industries/[slug]
- Content list pages: blog, case-studies, guides (list pages — replaced static exports)
- Content detail pages: blog/[slug], case-studies/[slug], guides/[slug] (already had generateMetadata from Phase 6)

## Key Decisions

- Canonical URLs derived from `NEXT_PUBLIC_SITE_URL` + path — never hardcoded domain
- OG image falls back to `/og-image.png` when neither the SEO record nor settings provide one
- Missing/unpublished SeoMeta records never throw — all errors return null and fall through to hardcoded fallbacks
- layout.tsx metadata uses title template pattern: `{ default: 'Buildera', template: '%s | Buildera' }`

## Self-Check: PASSED

- SeoMetaResource uses `Schema::make()` — zero `Form::make()` instances
- `$navigationGroup = 'SEO & Analytics'`
- AppServiceProvider registers `SeoMeta::observe(ContentObserver::class)`
- `src/lib/seo.ts` exports `generateSeoMetadata`
- All page files have either `generateMetadata` function or `metadata` export
