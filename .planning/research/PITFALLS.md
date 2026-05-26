# Pitfalls Research — Buildera IT Agency Website

## Critical Pitfalls

### 1. Content Volume Underestimation
**Warning signs:** Treating 24 service pages as "just pages" in one phase
**Problem:** ~24 sub-service + ~18 solution + ~12 industry pages = ~54 content-heavy pages. Each needs unique copy, SEO meta, structured sections. Building them all in one phase will stall.
**Prevention:** Phase service/solution/industry pages separately. Start with a reusable page template, then fill content. Hardcode first — don't wait for admin CMS to be ready.
**Phase:** Phase 4-5

### 2. ISR Revalidation Not Wired to Admin
**Warning signs:** Admin publishes blog post, site still shows old content
**Problem:** If the Model Observer + RevalidationService isn't built alongside Filament resources, editors will be confused by stale content and lose trust in the admin.
**Prevention:** Build revalidation service in the same phase as the first Filament content resource. Test the full loop: save in admin → Next.js cache purged → fresh page served.
**Phase:** Phase 6

### 3. Filament v5 API Changes
**Warning signs:** `Schema::make()` vs `Form::make()`, `$table` vs `$schema`, Filament v3 docs giving 500 errors
**Problem:** Filament v5 (for Laravel 13) has breaking changes from v3/v4. Most tutorials and StackOverflow answers are for older versions.
**Prevention:** Always use Filament v5 API: `Schema::make()` for forms, `Table::make()` for tables, `Infolist::make()` for view pages. Do NOT install `awcodes/filament-tiptap-editor` — use native `RichEditor::make()`.
**Phase:** Phase 2 onwards

### 4. Next.js 15 `use cache` vs `next: { tags }` Confusion
**Warning signs:** Revalidation not working, stale data after purge
**Problem:** Next.js 15 has two caching APIs: old `{ next: { tags } }` fetch option and new `use cache` directive. They don't interoperate cleanly.
**Prevention:** Use `{ next: { tags: ['tag-name'] } }` on fetch calls consistently. Use `revalidateTag(tag, { expire: 0 })` in route handlers. The two-argument form is required in Next.js 16.
**Phase:** Phase 3 onwards

### 5. Tailwind 4 Config Incompatibility
**Warning signs:** `tailwind.config.js` not found, PostCSS errors, custom colors not applied
**Problem:** Tailwind CSS v4 completely removes `tailwind.config.js` — everything moves to `globals.css` via `@theme` directive. Old tutorials won't work.
**Prevention:** Define custom colors, fonts, and spacing inside `globals.css` using `@theme { --color-primary: #... }`. Use `@import "tailwindcss"` at top. No config file needed.
**Phase:** Phase 3

### 6. shadcn/ui + Tailwind 4 Compatibility
**Warning signs:** Components not styled, CSS variables not applied
**Problem:** shadcn/ui uses CSS variables for theming. With Tailwind 4, ensure the CSS variable bridge is set up in globals.css.
**Prevention:** Run `npx shadcn@latest init` which handles Tailwind 4 setup automatically. Use `tw-animate-css` for animation utilities.
**Phase:** Phase 3

### 7. Too Many "use client" Components
**Warning signs:** Large JS bundle, poor PageSpeed score
**Problem:** Over-using `"use client"` on page sections destroys Server Component benefits and tanks mobile PageSpeed.
**Prevention:** Only these need `"use client"`: form components, tab switcher, popups/widgets, analytics. Everything else (hero, service cards, testimonials, etc.) must stay Server Components.
**Phase:** Phase 3-5

### 8. SEO Meta Not Per-Page
**Warning signs:** All pages have the same title/description
**Problem:** With 100+ pages, generic SEO kills organic search potential. Each service/solution/industry page must have unique title, meta description, and structured data.
**Prevention:** Build `generateMetadata` into every page template from the start. Wire to Laravel SEO API for admin-editable meta. Don't defer SEO to a "later phase" — bake it into the page template from day one.
**Phase:** Phase 3-4

### 9. Mobile Performance on Content-Heavy Pages
**Warning signs:** PageSpeed below 85 on mobile despite optimizations
**Problem:** Service pages with many cards, icons, and images will be slow on mobile without proper optimization.
**Prevention:** Use `next/image` with `sizes` prop on every image. Add `priority` only to above-fold images. Lazy-load icons below fold. Use `optimizePackageImports` for `@tabler/icons-react`.
**Phase:** Phase 10 (but prevent throughout)

### 10. Admin Panel Scope Creep
**Warning signs:** Every page needs its own Filament resource immediately
**Problem:** Building full admin control for all 60+ page types in one phase is impossible. Hardcoding first is the right call — but there must be a clear plan for when admin control gets added.
**Prevention:** Phase admin features strictly. Phase 2: core models only (leads, blog, settings). Phase 6+: add content resources progressively. Document which pages are hardcoded vs admin-driven in each phase.
**Phase:** Phase 2, 6, 9

### 11. CORS and API Key Exposure
**Warning signs:** API calls blocked in browser console; API key visible in client bundle
**Problem:** `NEXT_PUBLIC_API_KEY` is visible to anyone who reads the browser source. CORS misconfiguration breaks lead form submissions.
**Prevention:** `X-API-Key` is acceptable for lead form (public-facing, rate-limited) — but never put admin credentials in frontend. Configure CORS in Laravel to allow buildera.co origin only.
**Phase:** Phase 2-3

### 12. Hostinger Node.js Limitations
**Warning signs:** Next.js standalone mode not working; `pm2` process not persisting
**Problem:** Hostinger Business Plan Node.js hosting has quirks: must use `output: "standalone"` in next.config.ts, custom server.js for pm2, and specific port configuration.
**Prevention:** Use `ecosystem.config.js` for pm2. Build postbuild script that copies `public/` and `.next/static/` into `.next/standalone/`. Test deploy pipeline before content work begins.
**Phase:** Phase 1
