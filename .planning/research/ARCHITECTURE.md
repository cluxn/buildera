# Architecture Research — Buildera IT Agency Website

## System Overview

```
[Visitor Browser]
      │
      ▼
[Next.js 15 App — buildera.co]
  ├── Static pages (prebuilt at deploy)
  ├── ISR pages (blog, case studies, guides — revalidated on admin save)
  └── Client components (lead form, booking embed, analytics)
      │
      ▼ (API calls — build time + ISR revalidation)
[Laravel 13 API — api.buildera.co or buildera.co/api via proxy]
  ├── Public GET endpoints (no auth)
  ├── POST /api/leads (X-API-Key + throttle)
  ├── POST /api/subscribers
  └── POST /api/revalidate (HMAC secret — triggers Next.js cache purge)
      │
      ▼
[Filament Admin — buildera.co/admin]
  ├── Content management (blog, case studies, guides, services, solutions, industries)
  ├── Lead management
  ├── SEO metadata
  ├── Settings (analytics, social, nudge, banners)
  └── User management (roles via filament-shield)
      │
      ▼
[MySQL 8 + Spatie Media Library storage]
```

## Frontend Directory Structure

```
buildera-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout — nav, footer, analytics, settings fetch
│   │   ├── page.tsx                  # Homepage
│   │   ├── services/
│   │   │   ├── page.tsx              # Services overview
│   │   │   └── [category]/
│   │   │       ├── page.tsx          # Service category page
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # Sub-service detail page
│   │   ├── solutions/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── industries/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── guides/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── book-a-call/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   ├── sitemap.ts                # Dynamic sitemap from API
│   │   ├── robots.ts
│   │   ├── not-found.tsx
│   │   └── api/
│   │       └── revalidate/route.ts   # ISR cache purge endpoint
│   ├── components/
│   │   ├── layout/                   # SiteNav, SiteFooter, NudgeBanner, FloatingCTA
│   │   ├── sections/                 # Page-level sections (Hero, ServicesGrid, etc.)
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── analytics/                # GA4, Clarity, ScriptInjector, UTMCapture
│   │   └── forms/                    # ContactForm, NewsletterForm
│   ├── lib/
│   │   ├── api.ts                    # Typed fetch helpers for Laravel API
│   │   └── utils.ts                  # cn(), formatDate(), etc.
│   └── types/                        # Shared TypeScript interfaces
```

## Backend Directory Structure

```
buildera-backend/
├── app/
│   ├── Filament/
│   │   ├── Resources/                # BlogPostResource, CaseStudyResource, etc.
│   │   ├── Pages/                    # ManageSettings, ManageSeo
│   │   └── Widgets/                  # Dashboard stats
│   ├── Http/
│   │   ├── Controllers/Api/          # One controller per resource
│   │   └── Middleware/               # ApiKeyMiddleware
│   ├── Models/                       # BlogPost, CaseStudy, Lead, etc.
│   ├── Observers/                    # Trigger ISR revalidation on model save
│   └── Services/                     # RevalidationService, EmailService
├── database/
│   └── migrations/
└── routes/
    ├── api.php                        # All public + keyed API routes
    └── web.php                        # Filament mounts here
```

## Data Flow: ISR Revalidation

```
Admin saves blog post in Filament
        │
        ▼
Model Observer fires (BlogPost::saved)
        │
        ▼
RevalidationService::purge('blog-post-{slug}')
        │  POST /api/revalidate {tag: 'blog-post-{slug}'}
        │  Header: X-Revalidate-Secret
        ▼
Next.js Route Handler — revalidateTag(tag, { expire: 0 })
        │
        ▼
Next.js serves fresh page on next request
```

## Data Flow: Lead Capture

```
Visitor submits Contact form
        │  POST /api/leads
        │  Header: X-API-Key
        ▼
Laravel — ApiKeyMiddleware validates key
        │
        ▼
ThrottleRequests — 5 per IP per hour
        │
        ▼
LeadController::store() — validates, creates Lead record
        │
        ▼
Lead email notification → Resend API → owner inbox
        │
        ▼
Lead visible in Filament LeadResource
```

## Build Order (Suggested)

1. **Phase 1: Project foundation** — monorepo setup, env, CI skeleton, deploy pipeline
2. **Phase 2: Backend core** — Laravel + Filament install, migrations, core models, API scaffold
3. **Phase 3: Frontend core** — Next.js + shadcn/ui + layout (nav, footer), homepage skeleton
4. **Phase 4: Services & Solutions** — all service/solution pages (hardcoded), tab component
5. **Phase 5: Lead capture** — contact form, Calendly embed, WhatsApp widget, thank you
6. **Phase 6: Content pages** — Blog, Case Studies, Guides (ISR + Filament CRUD)
7. **Phase 7: Industry pages** — templated industry pages
8. **Phase 8: SEO & Analytics** — sitemap, structured data, meta, analytics tags via admin
9. **Phase 9: Admin completeness** — nudge/popup/banner, newsletter, social, user management
10. **Phase 10: Performance & polish** — PageSpeed audit, WCAG fixes, final QA

## Component Patterns

### Server Components (default)
All page-level components, navigation, footer — zero client JS for static content

### Client Components (`"use client"`)
- Lead/contact forms (useState, form handlers)
- Booking embed (Calendly/Cal.com)
- Tab switcher for services section
- WhatsApp widget
- Nudge/popup/banner (client-side logic)
- Cookie consent
- Analytics components (ConsentGatedGA4, UTMCapture)

### Static vs Dynamic
- Service/solution/industry pages: `generateStaticParams` — all slugs prerendered at build
- Blog/case studies/guides: ISR via `revalidateTag` — fresh on admin publish
- Homepage: static prerender, `use cache` directive for settings
