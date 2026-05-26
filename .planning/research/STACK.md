# Stack Research — Buildera IT Agency Website

## Recommended Stack (2025/2026)

| Technology | Version | Notes |
|------------|---------|-------|
| Next.js | 15.x | App Router, Turbopack default, React 19 |
| React | 19.x | Stable, bundled with Next.js 15 |
| TypeScript | 5.x | Required throughout |
| Tailwind CSS | 4.x | Vite-based config, no tailwind.config.js |
| shadcn/ui | latest | Copy-paste components over Radix UI primitives |
| Laravel | 13.x | PHP 8.3+ required, released March 2026 |
| Filament PHP | 5.x | v5.6+ for Laravel 13 compatibility |
| PHP | 8.3 minimum | 8.4 preferred |
| MySQL | 8.0+ | Hostinger Business Plan included |
| Node.js | 20.9 LTS | Next.js 15 minimum |

## Frontend Architecture

### Rendering Strategy

| Page Type | Strategy | Rationale |
|-----------|----------|-----------|
| Homepage, About, Contact | Static (prerendered) | Pure marketing, maximum performance |
| Service detail pages (~24) | Static + generateStaticParams | Known slugs, prerender all at build |
| Solution detail pages (~18) | Static + generateStaticParams | Same as services |
| Industry pages | Static + generateStaticParams | Finite known set |
| Blog posts | ISR (revalidateTag) | Admin-published content |
| Case Studies | ISR (revalidateTag) | Admin-published content |
| Guides | ISR (revalidateTag) | Admin-published content |
| Sitemap / robots | Route Handler (generateSitemaps) | Dynamic, reflects published content |

### Key Frontend Libraries

| Library | Purpose |
|---------|---------|
| `shadcn/ui` | Base component system — Button, Card, Dialog, Sheet, etc. |
| `next/font` | Self-hosted Inter, zero layout shift |
| `next/image` | Automatic WebP/AVIF, lazy load, CLS prevention |
| `@tabler/icons-react` | Consistent icon set, tree-shakeable with optimizePackageImports |
| `motion` (Framer Motion v11+) | Hero animations, scroll-triggered reveals |
| `clsx` + `tailwind-merge` | Conditional class merging |
| `axios` | Lead form POST to Laravel API |
| `swr` or `@tanstack/react-query` | Client-side data fetching where needed |
| `@calcom/embed-react` or Calendly | Discovery call booking embed |

### shadcn/ui Integration Notes
- Install with `npx shadcn@latest init` — sets up `components/ui/` directory
- Uses CSS variables for theming — override in `globals.css` for Buildera blue/white palette
- Radix UI primitives underneath — accessible by default
- Tailwind 4 compatible with `tw-animate-css` for animations

## Backend Architecture

### Laravel Scope
- REST API consumed by Next.js at build time and runtime
- Filament admin panel at `/admin`
- Lead capture and management
- Newsletter subscribers
- Content management (blog, case studies, guides)
- SEO metadata per page
- Settings (analytics tags, social links, nudge banners)
- Sitemap generation via spatie/laravel-sitemap

### Key Laravel Packages

| Package | Purpose |
|---------|---------|
| `filament/filament` 5.x | Admin panel |
| `bezhansalleh/filament-shield` | RBAC roles (Owner/Editor/Viewer) |
| `spatie/laravel-medialibrary` | Image uploads, WebP conversion |
| `spatie/laravel-sluggable` | Auto-slugs for blog/case studies/guides |
| `spatie/laravel-sitemap` | XML sitemap generation |
| `resend/resend-laravel` | Transactional email (lead notifications) |

## API Design

### Public GET (no auth, consumed by Next.js at build time)
```
GET /api/settings
GET /api/blog-posts
GET /api/blog-posts/{slug}
GET /api/case-studies
GET /api/case-studies/{slug}
GET /api/guides
GET /api/guides/{slug}
GET /api/testimonials
GET /api/services
GET /api/services/{slug}
GET /api/solutions
GET /api/solutions/{slug}
GET /api/industries
GET /api/industries/{slug}
GET /api/seo/{type}/{slug}
GET /api/redirects
```

### Write endpoints (X-API-Key auth)
```
POST /api/leads           — X-API-Key + honeypot + throttle
POST /api/subscribers     — newsletter opt-in
POST /api/revalidate      — ISR cache purge (from Filament on save)
```

## What NOT to Use

| Technology | Avoid Because |
|------------|--------------|
| Next.js Pages Router | Legacy — App Router only |
| Laravel 12 | End of support August 2026 |
| JWT / tymon/jwt-auth | No authenticated public users |
| Redis | Not on Hostinger Business Plan |
| GraphQL | 10+ endpoints don't need it |
| WordPress | Cannot achieve the required UX/performance |
| Webpack (switching back) | Turbopack is stable default in Next.js 15 |
| framer-motion package | Renamed to `motion` — use `motion` directly |
| awcodes/filament-tiptap-editor | Deprecated for Filament v5+ — use native RichEditor |
| Hardcoded analytics scripts | All tracking via Laravel settings API + next/script |
