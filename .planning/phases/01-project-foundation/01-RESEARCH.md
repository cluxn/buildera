# Phase 1: Project Foundation — Research

**Researched:** 2026-05-26
**Domain:** Next.js 15 + Laravel 13 + Filament 5 scaffolding, database schema design, deploy infrastructure
**Confidence:** HIGH

---

## Summary

Phase 1 establishes both repositories from scratch: `buildera-frontend` (Next.js 15, Tailwind 4, shadcn/ui) and `buildera-backend` (Laravel 13, Filament 5, MySQL). The goal is zero friction from Phase 2 onwards — every subsequent phase should be able to install packages and write code without revisiting scaffold decisions.

The most important discovery for planning is that **npm `latest` now resolves to Next.js 16**, not 15. All install commands must pin `next@15` explicitly or `create-next-app` will scaffold a v16 project. The second critical finding is that **`spatie/laravel-sitemap` v8 requires PHP 8.4**, while the Hostinger server will likely run PHP 8.3 (the installed version). Use `spatie/laravel-sitemap:^7.0` which added Laravel 13 support in v7.4.0 and supports PHP 8.2+.

`bezhansalleh/filament-shield` v4.2.0 is confirmed compatible with both Filament 4.x and 5.x. All other required packages are verified against their registries and have legitimate GitHub source repos.

**Primary recommendation:** Scaffold both repos sequentially. Frontend first (Next.js + Tailwind 4 + shadcn/ui in one command), backend second (Laravel + Filament 5 install + all Spatie packages in one composer require), then create all migrations in order, then wire health check + error stubs.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| FOUND-01 | Frontend repo scaffolded with Next.js 15, TypeScript, Tailwind 4, shadcn/ui, Inter font | Scaffold via `create-next-app@15` with `--typescript --tailwind` flags; shadcn init handles CSS var bridge for Tailwind 4; Inter via `next/font/google` |
| FOUND-02 | Backend repo scaffolded with Laravel 13, Filament PHP 5, MySQL | `composer create-project laravel/laravel` then `composer require filament/filament:"^5.0" -W` then `php artisan filament:install --panels` |
| FOUND-03 | Environment variables defined for both repos | `.env.example` pattern with all variables documented; Laravel reads from `.env`, Next.js reads `NEXT_PUBLIC_*` at build time |
| FOUND-04 | Next.js configured with `output: "standalone"`, custom server.js, pm2 ecosystem.config.js | `output: 'standalone'` in `next.config.ts`; postbuild copy script for `public/` and `.next/static/`; `ecosystem.config.js` references `.next/standalone/server.js` |
| FOUND-05 | Laravel API CORS configured to allow buildera.co origin only | Built-in Laravel CORS via `config/cors.php`; `allowed_origins` set from `FRONTEND_URL` env var; no third-party package needed since Laravel 9.2 |
| INFRA-01 | Database indexes on `leads.created_at`, `leads.email`, `leads.source_form`, `blog_posts.published_at`, `blog_posts.slug`, `case_studies.industry` | Added as `->index()` modifiers in migration column definitions |
| INFRA-02 | Health check endpoint `GET /api/health` returns `{ status: "ok", db: "ok", timestamp }` | Simple Laravel route in `api.php`; DB check via `DB::connection()->getPdo()` wrapped in try/catch |
| INFRA-03 | Custom Next.js `not-found.tsx` and `error.tsx` with navigation back to homepage | Next.js App Router file conventions; `not-found.tsx` at `app/` root; `error.tsx` must be a Client Component |
</phase_requirements>

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Frontend scaffold + routing | Frontend Server (Next.js) | — | App Router owns all page routing |
| Database schema + migrations | Database / Storage | — | All MySQL schema decisions made here in Phase 1 |
| Admin panel scaffold | API / Backend (Filament) | — | Filament mounts on Laravel, no frontend involvement |
| CORS enforcement | API / Backend | — | Laravel config/cors.php controls allowed origins |
| Deploy output | Frontend Server (standalone) | — | `output: standalone` + pm2 = Node.js process manager on Hostinger |
| Environment config | API / Backend + Frontend Server | — | Two separate `.env.example` files, one per repo |
| Health check | API / Backend | — | Laravel route returning DB ping result |
| Error pages | Frontend Server | — | Next.js file conventions (`not-found.tsx`, `error.tsx`) |

---

## Standard Stack

### Frontend Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 15.5.18 | App Router framework | Project constraint; v16 is `latest` so must pin explicitly |
| react | 19.2.6 | UI rendering | Bundled with Next.js 15 |
| react-dom | 19.2.6 | DOM rendering | Bundled with Next.js 15 |
| typescript | 5.x (auto) | Type safety | Project constraint |
| tailwindcss | 4.3.0 | Utility CSS | Project constraint; v4 ships with no config file |
| tw-animate-css | 1.4.0 | Animation utilities for Tailwind 4 | Required by shadcn/ui Tailwind 4 setup |
| shadcn (CLI) | 4.8.0 | Component scaffolding CLI | Handles Tailwind 4 init; components go in `src/components/ui/` |
| motion | 12.40.0 | Animations | Project constraint; import from `motion/react` NOT `framer-motion` |
| @tabler/icons-react | 3.44.0 | Icons | Project constraint; must be in `optimizePackageImports` |
| clsx | 2.1.1 | Conditional class names | Standard shadcn/ui dependency |
| tailwind-merge | 3.6.0 | Merge Tailwind classes safely | Standard shadcn/ui dependency |

[VERIFIED: npm registry] — all packages confirmed via `npm view` with GitHub source repos verified.

### Backend Core
| Package | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| laravel/laravel | 13.x | PHP framework skeleton | Project constraint |
| filament/filament | ^5.0 (v5.6.5 latest) | Admin panel | Project constraint; v5.6+ required for Laravel 13 compat |
| bezhansalleh/filament-shield | ^4.0 (v4.2.0 latest) | RBAC: Owner/Editor/Viewer | Project constraint; v4 supports Filament 4+5 |
| spatie/laravel-medialibrary | ^11.0 (v11.22.1 latest) | Image uploads with alt text | Project constraint; supports Laravel 13 |
| spatie/laravel-sluggable | ^4.0 (v4.0.2 latest) | Auto-slugs | Project constraint; supports Laravel 12+13, PHP ^8.3 |
| spatie/laravel-sitemap | ^7.0 (v7.4.0+ for L13) | XML sitemap | Project constraint; **use v7 not v8** — v8 requires PHP 8.4 |
| resend/resend-laravel | ^1.0 (v1.4.0 latest) | Transactional email | Project constraint; supports Laravel 10-13 |

[VERIFIED: npm registry / Packagist] — all packages confirmed via Packagist with version requirements verified.

> **Critical version note:** `spatie/laravel-sitemap` v8.x requires PHP 8.4. The project runs PHP 8.3. Pin to `^7.0` — Laravel 13 support was added in v7.4.0 (released 2026-02-21). [CITED: github.com/spatie/laravel-sitemap releases]

### Frontend Installation Commands

```bash
# Step 1: Scaffold — MUST pin to @15 because npm latest = Next.js 16
npx create-next-app@15 buildera-frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack

# Step 2: Install remaining packages
cd buildera-frontend
npm install motion@12.40.0 @tabler/icons-react@3.44.0 clsx tailwind-merge tw-animate-css

# Step 3: Initialize shadcn/ui (handles Tailwind 4 CSS var bridge automatically)
npx shadcn@latest init
```

> **Note on create-next-app flags:** `--no-turbopack` keeps webpack as dev bundler for maximum Hostinger compatibility. Turbopack is fine for development but `next build` always uses webpack; the flag only affects `next dev`. This is optional — Turbopack is the default and works correctly.

### Backend Installation Commands

```bash
# Step 1: Create Laravel 13 project
composer create-project laravel/laravel buildera-backend

# Step 2: Install Filament 5 (the -W flag allows dependency updates)
cd buildera-backend
composer require filament/filament:"^5.0" -W

# Step 3: Scaffold Filament admin panel (enter "admin" when prompted for panel ID)
php artisan filament:install --panels

# Step 4: Install all other required packages
composer require \
  bezhansalleh/filament-shield \
  spatie/laravel-medialibrary:"^11.0" \
  spatie/laravel-sluggable:"^4.0" \
  "spatie/laravel-sitemap:^7.0" \
  resend/resend-laravel

# Step 5: Publish medialibrary migration and config
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-migrations"
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="medialibrary-config"

# Step 6: Publish CORS config
php artisan config:publish cors
```

---

## Package Legitimacy Audit

> slopcheck was installed (v0.6.1) but cannot be invoked as a CLI command on this system — falls back to registry verification.

| Package | Registry | Age | Source Repo | Disposition |
|---------|----------|-----|-------------|-------------|
| next@15.5.18 | npm | 8+ yrs (2016) | github.com/vercel/next.js | Approved |
| react@19.2.6 | npm | 10+ yrs (2013) | github.com/facebook/react | Approved |
| tailwindcss@4.3.0 | npm | 7+ yrs | github.com/tailwindlabs/tailwindcss | Approved |
| motion@12.40.0 | npm | 5+ yrs | github.com/motiondivision/motion | Approved |
| @tabler/icons-react@3.44.0 | npm | 5+ yrs | github.com/tabler/tabler-icons | Approved |
| clsx@2.1.1 | npm | 7+ yrs | github.com/lukeed/clsx | Approved |
| tailwind-merge@3.6.0 | npm | 3+ yrs | github.com/dcastil/tailwind-merge | Approved |
| tw-animate-css@1.4.0 | npm | ~2 yrs | github.com/Wombosvideo/tw-animate-css | Approved |
| shadcn@4.8.0 | npm | 3+ yrs | github.com/shadcn-ui/ui | Approved |
| filament/filament@5.6.5 | Packagist | 5+ yrs | github.com/filamentphp/filament | Approved |
| bezhansalleh/filament-shield@4.2.0 | Packagist | 4+ yrs | github.com/bezhanSalleh/filament-shield | Approved |
| spatie/laravel-medialibrary@11.22.1 | Packagist | 9+ yrs | github.com/spatie/laravel-medialibrary | Approved |
| spatie/laravel-sluggable@4.0.2 | Packagist | 8+ yrs | github.com/spatie/laravel-sluggable | Approved |
| spatie/laravel-sitemap@7.x | Packagist | 8+ yrs | github.com/spatie/laravel-sitemap | Approved (pin ^7.0) |
| resend/resend-laravel@1.4.0 | Packagist | 2+ yrs | github.com/resendlabs/resend-laravel | Approved |

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

*slopcheck CLI was unavailable for automated scan — all packages above are tagged [VERIFIED: npm registry / Packagist] based on manual registry verification of version, age, download counts, and GitHub source repos.*

---

## Architecture Patterns

### System Architecture Diagram

```
[Hostinger Node.js]                    [Hostinger PHP]
  buildera.co                            api.buildera.co
       │                                       │
  pm2 → server.js                     php-fpm → Laravel 13
  .next/standalone/                         │
       │                              ┌─────┴──────────────┐
  Static pages ──────────────────────►│  GET /api/*        │
  (build-time fetch)                  │  (no auth)         │
       │                              │                    │
  ISR pages ──── revalidateTag ───────►│  POST /api/leads   │
  (blog, case studies, guides)        │  (X-API-Key)       │
       │                              │                    │
  Client components ──────────────────►│  POST /api/revalidate │
  (lead forms, Calendly)              │  (HMAC secret)     │
                                      └────────┬───────────┘
                                               │
                                       Filament Admin
                                       /admin (session auth)
                                               │
                                           MySQL 8
                                       + Spatie Media (local disk)
```

### Recommended Project Structure

**Frontend (`buildera-frontend/`):**
```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout — inter font, analytics wrapper
│   ├── page.tsx               # Homepage
│   ├── not-found.tsx          # Custom 404 (Phase 1)
│   ├── error.tsx              # Custom 500 — "use client" required
│   └── api/
│       └── revalidate/
│           └── route.ts       # ISR purge endpoint
├── components/
│   └── ui/                    # shadcn/ui output directory
├── lib/
│   ├── api.ts                 # All typed fetch helpers
│   └── utils.ts               # cn(), formatDate()
└── types/
    └── index.ts               # Shared TS interfaces
```

**Backend (`buildera-backend/`):**
```
app/
├── Filament/
│   ├── Pages/                 # ManageSettings (Phase 2)
│   └── Resources/             # All resources (Phase 2+)
├── Http/
│   ├── Controllers/Api/       # One controller per resource
│   └── Middleware/            # ApiKeyMiddleware (Phase 2)
├── Models/                    # Eloquent models
└── Providers/
    └── Filament/
        └── AdminPanelProvider.php  # Generated by filament:install
database/
└── migrations/                # All schema migrations (Phase 1)
```

### Pattern 1: Tailwind 4 + shadcn/ui globals.css Structure

**What:** All Tailwind configuration lives in `globals.css` via `@theme`. No `tailwind.config.js`.
**When to use:** Always — this is the required pattern for Tailwind 4.

```css
/* Source: ui.shadcn.com/docs/tailwind-v4 */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* Add Buildera brand blue palette here */
}

:root {
  --background: hsl(0 0% 100%);
  --foreground: hsl(222.2 84% 4.9%);
  --primary: hsl(217 91% 60%);   /* Buildera blue — Phase 3 defines full palette */
  /* ...shadcn/ui CSS variables generated by shadcn init... */
}
```

### Pattern 2: Next.js 15 Standalone + pm2 Config

**What:** `output: 'standalone'` produces a self-contained `.next/standalone/` folder. Postbuild step copies `public/` and `.next/static/` into it. pm2 starts `server.js`.
**When to use:** Required for Hostinger Node.js deployment.

```typescript
// Source: nextjs.org/docs/app/api-reference/config/next-config-js/output
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.buildera.co' },
    ],
  },
  experimental: {
    optimizePackageImports: ['@tabler/icons-react', 'motion'],
  },
}

export default nextConfig
```

```json
// ecosystem.config.js (pm2)
// Source: community pattern — verified via nextjs.org standalone docs
module.exports = {
  apps: [{
    name: 'buildera-frontend',
    script: '.next/standalone/server.js',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000,
      HOSTNAME: '0.0.0.0',
    },
  }],
}
```

**Postbuild copy script (`scripts/postbuild.js`):**
```javascript
const fs = require('fs')
const path = require('path')

// Next.js standalone does NOT copy public/ or .next/static/ automatically
// Must be done after build
fs.cpSync('public', '.next/standalone/public', { recursive: true })
fs.cpSync('.next/static', '.next/standalone/.next/static', { recursive: true })
```

Add to `package.json`:
```json
{
  "scripts": {
    "build": "next build && node scripts/postbuild.js"
  }
}
```

### Pattern 3: Laravel CORS for Next.js

**What:** Laravel 13 has built-in CORS via `config/cors.php`. No third-party package needed.
**When to use:** Always — configure via env var, not hardcoded domain.

```php
// Source: Laravel 13 docs (laravel.com/docs/13.x)
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['GET', 'POST', 'OPTIONS'],
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['Content-Type', 'X-API-Key', 'X-Revalidate-Secret', 'Accept'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
```

> **Security note:** Cannot use `allowed_origins => ['*']` when `supports_credentials` is true. For this API (no cookies, X-API-Key header), `supports_credentials: false` is correct and `'*'` is safe for public GET endpoints — but specific domain is more correct for production.

### Pattern 4: Laravel 13 Migration Structure

**What:** All Phase 1 models need their migrations created. Content models require `slug`, `is_published`, `published_at`, `seo_*` fields per CLAUDE.md.

```php
// Source: laravel.com/docs/13.x/migrations — [VERIFIED]
// Example: blog_posts migration skeleton
Schema::create('blog_posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique()->index();  // INFRA-01 index
    $table->text('excerpt')->nullable();
    $table->longText('body')->nullable();
    $table->string('status')->default('draft'); // draft|published|archived
    $table->boolean('is_published')->default(false);
    $table->timestamp('published_at')->nullable()->index(); // INFRA-01 index
    // SEO fields (every content model needs these per CLAUDE.md)
    $table->string('seo_title')->nullable();
    $table->text('seo_description')->nullable();
    $table->string('seo_og_image')->nullable();
    $table->timestamps();
    $table->softDeletes();
});
```

### Pattern 5: Filament 5 Admin Panel Setup

**What:** `AdminPanelProvider.php` configures panel ID, path, auth, and navigation groups.

```php
// Source: filamentphp.com/docs + project experience with Filament 5 API
// app/Providers/Filament/AdminPanelProvider.php
public function panel(Panel $panel): Panel
{
    return $panel
        ->default()
        ->id('admin')
        ->path('admin')
        ->login()
        ->colors(['primary' => Color::Blue])
        ->navigationGroups([
            'Leads & CRM',
            'Content',
            'Website',
            'SEO & Analytics',
            'Settings',
        ]);
}
```

**Filament v5 API — critical rules (from CLAUDE.md):**
- Forms: `Schema::make()` — NOT `Form::make()`
- Tables: `Table::make()` 
- Do NOT install `awcodes/filament-tiptap-editor` — use native `RichEditor::make()`
- These rules apply from Phase 2 onwards when first Filament Resource is built

### Anti-Patterns to Avoid

- **`npx create-next-app@latest`** — resolves to v16 as of May 2026. Always use `create-next-app@15`.
- **`spatie/laravel-sitemap:^8.0`** — requires PHP 8.4. Use `^7.0` for PHP 8.3 compatibility.
- **`tailwind.config.js` for Tailwind 4** — does not exist. All config goes in `globals.css` via `@theme`.
- **Missing postbuild copy** — `next build` with `output: standalone` does NOT copy `public/` or `.next/static/`. Forgetting this step means the pm2 server has no static assets.
- **`import { motion } from 'framer-motion'`** — wrong package name. Use `import { motion } from 'motion/react'`.
- **Database queue not migrated** — `QUEUE_CONNECTION=database` requires `jobs` and `job_batches` tables. Laravel 13 includes these migrations by default but they must be run.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Image uploads + alt text | Custom upload handler | spatie/laravel-medialibrary | Handles conversions, collections, S3 migration path |
| Auto-slugs on content models | `Str::slug()` on every save | spatie/laravel-sluggable | Unique collision handling, regeneration on rename |
| XML sitemap generation | Custom sitemap builder | spatie/laravel-sitemap | Handles pagination, change frequency, priority, last mod |
| CORS headers | Custom middleware | Laravel built-in (`config/cors.php`) | Handles preflight, multiple origins, security edge cases |
| pm2 process management | Shell scripts / cron | pm2 ecosystem.config.js | Auto-restart, log rotation, cluster mode |
| Admin panel RBAC | Custom role system | bezhansalleh/filament-shield | Integrates with spatie/laravel-permission, synced to resources |
| Transactional email | SMTP manual config | resend/resend-laravel | Handles retries, delivery tracking, Laravel Mail API |
| Standalone static file serving | nginx config | postbuild copy script | `server.js` auto-serves `public/` and `.next/static/` when copied correctly |

---

## Common Pitfalls

### Pitfall 1: npm latest resolves to Next.js 16

**What goes wrong:** Running `npx create-next-app@latest` scaffolds Next.js 16 instead of 15. The project spec says 15.x — v16 has breaking changes to the App Router API.
**Why it happens:** npm `latest` dist-tag moved to v16.2.6 as of 2026. `backport` tag = `15.5.18`.
**How to avoid:** Always use `create-next-app@15` or `create-next-app@15.5.18`. Also pin `"next": "^15.0.0"` in `package.json` to prevent accidental upgrades.
**Warning signs:** `package.json` shows `"next": "^16"` after scaffold.

### Pitfall 2: spatie/laravel-sitemap v8 PHP 8.4 requirement

**What goes wrong:** `composer require spatie/laravel-sitemap` installs v8.1.0, which fails on PHP 8.3 with "Your PHP version (8.3.31) does not satisfy that requirement."
**Why it happens:** Packagist installs the latest version matching constraints unless pinned. v8.0.0 (March 2026) bumped PHP requirement to `^8.4`.
**How to avoid:** Pin `"spatie/laravel-sitemap": "^7.0"` in `composer.json`. v7.4.0 added Laravel 13 support (PHP 8.2+).
**Warning signs:** Composer error about PHP version during install.

### Pitfall 3: Standalone build missing static assets

**What goes wrong:** `pm2` starts `server.js` correctly but CSS, JS chunks, and images all 404.
**Why it happens:** `next build` with `output: 'standalone'` creates `.next/standalone/server.js` but explicitly does NOT copy `public/` or `.next/static/` — the docs say "these should ideally be handled by a CDN." On Hostinger with no CDN, you must copy them manually.
**How to avoid:** Add a `postbuild.js` script that runs after `next build` and copies both directories into `.next/standalone/`.
**Warning signs:** Site loads blank page with network tab showing 404s on all asset requests.

### Pitfall 4: shadcn/ui init on Tailwind 4 — CLI validation quirk

**What goes wrong:** `npx shadcn@latest init` fails to validate Tailwind CSS installation after Tailwind 4 update due to absence of `tailwind.config.js`.
**Why it happens:** Older versions of the shadcn CLI checked for `tailwind.config.js` existence. Current CLI (4.8.0) handles Tailwind 4 correctly with `@theme inline` in globals.css.
**How to avoid:** Use `shadcn@latest` (currently 4.8.0) which has native Tailwind 4 support. Do NOT downgrade Tailwind to v3.
**Warning signs:** "No Tailwind CSS config found" error from shadcn CLI.

### Pitfall 5: CORS preflight blocking lead form POST

**What goes wrong:** Lead form submission from Next.js frontend is blocked with CORS error in browser console.
**Why it happens:** `POST /api/leads` uses a non-standard header (`X-API-Key`). Browsers send an `OPTIONS` preflight request for non-simple requests. If Laravel CORS middleware isn't applied to the `api` routes, preflight returns 404.
**How to avoid:** Ensure `'paths' => ['api/*']` in `config/cors.php`. Confirm Laravel CORS middleware runs before other middleware in the stack. Include `X-API-Key` in `allowed_headers`.
**Warning signs:** Browser shows "Response to preflight request doesn't pass access control check."

### Pitfall 6: Database queue tables missing

**What goes wrong:** Jobs dispatched to the queue fail silently or throw "Table 'jobs' not found."
**Why it happens:** `QUEUE_CONNECTION=database` requires `jobs`, `job_batches`, and `failed_jobs` tables. Laravel 13 includes default migrations for these at `0001_01_01_000002_create_jobs_table.php` — but they only exist if the migration was not deleted.
**How to avoid:** After `composer create-project`, verify these migrations exist before running `php artisan migrate`. If missing, run `php artisan make:queue-table`.
**Warning signs:** Queue worker starts but exits with SQL error on first dispatched job.

### Pitfall 7: Filament AdminPanelProvider not registered

**What goes wrong:** `/admin` returns 404 after `filament:install --panels`.
**Why it happens:** Laravel 13 uses `bootstrap/providers.php` for service provider registration (not `config/app.php` like Laravel 10). The `filament:install` command should auto-register, but manual installs may miss this.
**How to avoid:** After `php artisan filament:install --panels`, verify `App\Providers\Filament\AdminPanelProvider::class` appears in `bootstrap/providers.php`.
**Warning signs:** `/admin` 404 or "class not found" error in Laravel log.

---

## Database Schema Design (Plan 01-03)

Full migration list for all models. Each migration should be a separate file in the correct order.

**Migration sequence (dependency order):**

1. `create_users_table` — already exists from Laravel scaffold
2. `create_jobs_table` — already exists from Laravel scaffold
3. `create_cache_table` — already exists from Laravel scaffold
4. `create_authors_table`
5. `create_categories_table`
6. `create_tags_table`
7. `create_blog_posts_table` — depends on authors, categories, tags (via pivot tables)
8. `create_blog_post_category_table` — pivot
9. `create_blog_post_tag_table` — pivot
10. `create_case_studies_table`
11. `create_guides_table`
12. `create_testimonials_table`
13. `create_leads_table` — **INFRA-01 indexes required**
14. `create_newsletter_subscribers_table`
15. `create_settings_table`
16. `create_seo_metas_table`
17. `create_redirects_table`
18. `create_nav_items_table`
19. `create_footer_links_table`
20. `create_audit_logs_table`
21. `media` — published by spatie/laravel-medialibrary vendor:publish

**Key field patterns per CLAUDE.md:**

Every content model (`blog_posts`, `case_studies`, `guides`, `testimonials`) must have:
- `slug` (string, unique, indexed) — auto-generated by spatie/laravel-sluggable
- `is_published` (boolean, default false)
- `published_at` (timestamp, nullable)
- `seo_title` (string, nullable)
- `seo_description` (text, nullable)
- `seo_og_image` (string, nullable)

**INFRA-01 required indexes:**
```php
// In leads migration
$table->index('created_at');
$table->index('email');
$table->index('source_form');

// In blog_posts migration
$table->index('published_at');
$table->string('slug')->unique()->index(); // unique() already adds index

// In case_studies migration  
$table->index('industry');
```

**`leads` table key fields:**
```php
$table->id();
$table->string('name');
$table->string('email')->index();
$table->string('phone')->nullable();
$table->string('company')->nullable();
$table->string('service_interest')->nullable();
$table->text('message')->nullable();
$table->string('source_form')->index();        // INFRA-01
$table->string('source_page')->nullable();
$table->string('utm_source')->nullable();
$table->string('utm_medium')->nullable();
$table->string('utm_campaign')->nullable();
$table->string('utm_first_source')->nullable();
$table->string('ip_hash')->nullable();         // hashed for GDPR
$table->string('timezone')->nullable();
$table->boolean('is_duplicate')->default(false);
$table->string('status')->default('new');      // new|contacted|qualified|closed
$table->timestamps()->index();                  // created_at indexed per INFRA-01
```

---

## Code Examples

### Next.js Environment Validation on Boot

```typescript
// Source: Next.js community pattern — [ASSUMED] exact implementation
// src/lib/env.ts — validates required env vars at startup
const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
] as const

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
}

export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? '',
  revalidateSecret: process.env.NEXTJS_REVALIDATE_SECRET ?? '',
}
```

### Laravel Health Check Route

```php
// Source: Laravel docs pattern — [ASSUMED] exact implementation
// routes/api.php
Route::get('/health', function () {
    $dbStatus = 'ok';
    try {
        DB::connection()->getPdo();
    } catch (\Exception $e) {
        $dbStatus = 'error';
    }

    return response()->json([
        'status' => $dbStatus === 'ok' ? 'ok' : 'degraded',
        'db' => $dbStatus,
        'timestamp' => now()->toIso8601String(),
    ], $dbStatus === 'ok' ? 200 : 503);
});
```

### Next.js Custom Error Pages

```tsx
// Source: nextjs.org/docs/app/api-reference/file-conventions/not-found
// src/app/not-found.tsx — Server Component (default)
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>Could not find the requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}

// src/app/error.tsx — MUST be a Client Component
'use client'
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None for Phase 1 — scaffolding/config verification is manual CLI checks |
| Config file | none |
| Quick run command | `npm run dev` (frontend) / `php artisan serve` (backend) |
| Full suite command | N/A — Phase 1 has no unit-testable logic |

### Phase Requirements — Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| FOUND-01 | Frontend dev server starts | smoke | `npm run dev` — visit localhost:3000 | Manual visual check |
| FOUND-02 | Backend artisan serves | smoke | `php artisan serve` — visit localhost:8000/api/health | INFRA-02 doubles as scaffold test |
| FOUND-03 | .env.example complete | manual | `diff .env .env.example` — all keys present | Manual review |
| FOUND-04 | Standalone build produces server.js | smoke | `npm run build && ls .next/standalone/server.js` | Pass/fail on file existence |
| FOUND-05 | CORS allows localhost:3000, blocks others | manual | Browser: fetch from localhost:3000 to :8000/api/health — check response headers | Manual |
| INFRA-01 | All indexes exist | smoke | `php artisan migrate:fresh && php artisan tinker --execute="DB::select('SHOW INDEX FROM leads')"` | Manual verify |
| INFRA-02 | Health check returns 200 | smoke | `curl http://localhost:8000/api/health` | Automated |
| INFRA-03 | 404 page renders with nav link | smoke | Visit `/nonexistent-route` in browser | Manual |

### Success Criteria (from ROADMAP.md)

1. `npm run dev` starts frontend with no errors
2. `php artisan serve` starts backend, `/api/health` returns `{ status: "ok" }`
3. All migrations run clean on fresh MySQL database
4. Both repos committed with proper `.gitignore`, `.env.example`

### Wave 0 Gaps

No test framework is needed for Phase 1. Verification is purely via CLI smoke checks:
- `php artisan migrate:fresh` — verifies all migrations are valid SQL
- `npm run build` — verifies TypeScript compiles and Next.js builds
- `node .next/standalone/server.js` — verifies standalone output is runnable
- `curl /api/health` — verifies Laravel routes and DB connection

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `tailwind.config.js` | `@theme {}` in `globals.css` | Tailwind 4 (Mar 2025) | No config file — all theme vars in CSS |
| `import { motion } from 'framer-motion'` | `import { motion } from 'motion/react'` | motion v11 (2024) | Package renamed; framer-motion is a legacy alias |
| `Form::make()` in Filament | `Schema::make()` | Filament v5 (2025) | Breaking API change — old tutorials will fail |
| `config/app.php` providers array | `bootstrap/providers.php` | Laravel 11 (2024) | Service providers registered differently |
| `next/font/google` with config | `next/font/google` with `variable` prop | Next.js 13+ | Same API, but used with CSS variable in Tailwind 4 |
| `next start` on server | `node .next/standalone/server.js` with pm2 | Next.js 12+ | Standalone mode removes node_modules requirement |

**Deprecated/outdated:**
- `awcodes/filament-tiptap-editor`: Deprecated for Filament v5+ — use native `RichEditor::make()`.
- `fruitcake/laravel-cors`: Third-party CORS package — Laravel has built-in CORS since v9.2; no longer needed.
- `next.config.js`: Still works but project should use `next.config.ts` (TypeScript config).
- `webpack` as dev bundler: Turbopack is default in Next.js 15 for dev; `next build` still uses webpack for production.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Frontend scaffold, npm | ✓ | v23.10.0 | — |
| npm | Package install | ✓ | v11.2.0 | — |
| PHP | Backend scaffold | ✓ | 8.3.31 | — |
| Composer | PHP packages | ✓ | 2.9.8 | — |
| pm2 | Process management | ✓ | found at /npm/pm2 | — |
| MySQL CLI | Migration verification | ✗ | — | Use `php artisan migrate:fresh` |
| Git | Version control | [ASSUMED] | unknown | — |

**Missing dependencies with no fallback:** None blocking scaffold work. MySQL CLI not in PATH but `php artisan` commands handle all DB interactions.

**Note on Node.js version:** Node.js 23.10.0 exceeds Next.js 15 minimum (20.9 LTS). This is fine for local development. Hostinger's Node.js environment is [ASSUMED] to support Node.js 20+; verify at deploy time (Phase 10).

---

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No (Phase 1 is scaffold only) | — |
| V3 Session Management | No | — |
| V4 Access Control | No | — |
| V5 Input Validation | No (Phase 1 has no user input) | — |
| V6 Cryptography | No | — |

**Phase 1 security considerations:**
- `.env` files must be in `.gitignore` — both repos
- `.env.example` must not contain real credentials — document placeholders only
- `APP_KEY` generated via `php artisan key:generate` — never commit a real key
- `CORS allowed_origins` should use env var, never hardcode `buildera.co` in source files

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Hostinger Node.js hosting supports Node.js 20+ | Environment Availability | pm2/standalone may not work on Node.js < 18; verify at deploy |
| A2 | Hostinger PHP hosting supports PHP 8.3 | Environment Availability | spatie/laravel-sluggable v4 requires PHP ^8.3; would need earlier version |
| A3 | MySQL version on Hostinger is 8.0+ | Database schema | FULLTEXT index syntax used in Phase 7 search requires MySQL 8; Phase 1 standard indexes work on MySQL 5.7+ |
| A4 | `create-next-app@15` scaffold generates `src/` directory by default with `--src-dir` flag | Standard Stack | If flag not supported in older 15.x CLI, directory layout may differ |
| A5 | `npm latest` pointing to Next.js 16 is the current state at planning time | Critical version note | If Vercel backports, v16 may become `backport` instead; always verify with `npm view next dist-tags` before scaffold |

---

## Open Questions (RESOLVED)

1. **Hostinger PHP version**
   - What we know: Local environment has PHP 8.3.31
   - What's unclear: Does Hostinger Business Plan offer PHP 8.3 in their Node.js+PHP combo hosting?
   - RESOLVED: Assumed PHP 8.3 (matches local env). Plans pin `spatie/laravel-sitemap:^7.0` to avoid PHP 8.4 dependency regardless. Final verification deferred to Phase 10 deploy prep.

2. **MySQL version on Hostinger**
   - What we know: Hostinger Business Plan includes MySQL; exact version unverified
   - What's unclear: MySQL 5.7 vs 8.0 — matters for Phase 7 FULLTEXT search
   - RESOLVED: Phase 1 migrations use standard column types compatible with MySQL 5.7+. Phase 7 will verify MySQL version before adding FULLTEXT indexes.

3. **shadcn/ui init — interactive vs flags**
   - What we know: `npx shadcn@latest init` prompts interactively
   - What's unclear: Full non-interactive flag list for CI/scripted setup
   - RESOLVED: Run interactively during scaffold (one-time setup). Plan 01-01 documents the expected prompts and answers in the action step.

---

## Sources

### Primary (HIGH confidence)
- `nextjs.org/docs/app/api-reference/config/next-config-js/output` — standalone output, server.js, postbuild copy pattern
- `nextjs.org/docs/app/getting-started/installation` — create-next-app commands, version 16.2.6 docs
- `ui.shadcn.com/docs/tailwind-v4` — Tailwind v4 globals.css setup, @theme inline
- `filamentphp.com/docs/5.x` — Filament 5 install commands, Schema::make() API
- `packagist.org/packages/spatie/laravel-medialibrary` — v11.22.1, Laravel 13 compat
- `packagist.org/packages/spatie/laravel-sluggable` — v4.0.2, PHP ^8.3, Laravel 13
- `packagist.org/packages/spatie/laravel-sitemap` — v8 requires PHP 8.4; v7.4.0 has Laravel 13 support
- `packagist.org/packages/resend/resend-laravel` — v1.4.0, Laravel 10-13
- `packagist.org/packages/bezhansalleh/filament-shield` — v4.2.0, Filament ^4.0|^5.0
- npm registry — `npm view` for all JS packages: next, react, tailwindcss, motion, @tabler/icons-react, clsx, tailwind-merge, tw-animate-css, shadcn

### Secondary (MEDIUM confidence)
- WebSearch results: Laravel 13 CORS config/cors.php pattern, verified against Laravel docs
- WebSearch results: pm2 ecosystem.config.js Next.js standalone pattern, consistent across multiple deployment guides
- github.com/spatie/laravel-sitemap CHANGELOG — v7.4.0 Laravel 13 support, v8.0.0 PHP 8.4 requirement

### Tertiary (LOW confidence)
- `A1-A5` in Assumptions Log — Hostinger server capabilities not directly verified

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified via registry with versions and GitHub source repos
- Architecture: HIGH — based on Next.js and Laravel official docs, consistent with CLAUDE.md constraints
- Pitfalls: HIGH — npm latest = v16 is a fact; sitemap PHP 8.4 is a fact; both confirmed via registry
- Database schema: MEDIUM — field designs based on REQUIREMENTS.md analysis; exact column types are standard Laravel but full schema wasn't validated against a running DB

**Research date:** 2026-05-26
**Valid until:** 2026-06-25 (30 days — framework versions may release patches; check `npm view next@15 dist-tags` before scaffold)
