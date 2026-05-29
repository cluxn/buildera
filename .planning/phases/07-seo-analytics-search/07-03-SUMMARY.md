---
plan: "07-03"
phase: 7
status: complete
completed_at: "2026-05-29"
requirements_addressed:
  - SEO-03
  - SEO-04
  - SEOPLUS-02
  - ADM-16
---

# 07-03: Sitemap, Robots, LocalBusiness JSON-LD, Sitemap Action

## What Was Built

**`src/app/sitemap.ts`:** Dynamic Next.js App Router sitemap covering all 60+ static paths (homepage, services, solutions, industries, content list pages) plus ISR-fetched blog posts, case studies, and guides from the API. Uses `revalidate: 3600` on dynamic fetches. Priority 1.0 on homepage, 0.9 on service detail pages, 0.8 on others.

**`src/app/robots.ts`:** Disallows `/admin/` and `/api/`, allows all other paths, points to sitemap.xml.

**`src/components/ui/JsonLd.tsx`:** Reusable server-side JSON-LD script renderer. No `use client`. Accepts `data` as Record or array, renders `<script type="application/ld+json">`.

**Homepage JSON-LD:** Organization + WebSite + LocalBusiness schemas rendered on homepage. Organization includes contactPoint and sameAs social links. WebSite includes SearchAction pointing to `/search?q=`. LocalBusiness includes telephone, email, address from settings.

**Contact page JSON-LD:** LocalBusiness schema rendered on contact page.

**SeoMetaResource — Regenerate Sitemap action:** Header action button dispatches RevalidationJob for `blog_posts`, `case_studies`, `guides` tags to refresh sitemap data.

## Self-Check: PASSED

- sitemap.ts exports default async function returning MetadataRoute.Sitemap
- robots.ts disallows /admin/ and /api/
- JsonLd has no "use client"
- Organization + WebSite + LocalBusiness JSON-LD present on homepage
- LocalBusiness JSON-LD present on contact page
- SeoMetaResource has "Regenerate Sitemap" header action
