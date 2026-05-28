# Phase 6: Content — Blog, Case Studies, Guides — Research

**Researched:** 2026-05-28
**Domain:** Filament v5 content resources, Next.js 15 ISR, Laravel Laravel observers, seed data, conversion-optimised content pages
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| CONT-01 | Blog list page — cards with featured image, title, excerpt, author avatar+name, date, reading time, category badge; pagination 12/page; category filter tabs | Frontend section: list page architecture; category filter via searchParams |
| CONT-02 | Blog post detail — hero image, author+date+reading time, full body, mini lead form at ~33%, newsletter block at ~50%, related posts at bottom, author bio, full CTA at 100% | Scroll-hotspot section; MiniLeadForm reuse from 05-04 confirmed |
| CONT-03 | Case Studies list — cards with hero image, client name, industry badge, result stat, problem statement; filter by industry | List page pattern; searchParams filtering |
| CONT-04 | Case Study detail — problem, solution, results metric cards, testimonial quote, mini CTA at ~50%, full CTA at bottom | ISR detail page pattern; metric cards section |
| CONT-05 | Guides list — cards with cover image, title, description, resource type badge; category filter | Same list pattern as CONT-01/CONT-03 |
| CONT-06 | Guide detail — cover image, intro, full body, mini lead form at ~33%, CTA banner at ~66%, related guides, full CTA at 100% | Same detail pattern as CONT-02 |
| CONT-07 | Testimonials page — masonry/grid layout, all testimonials, filterable by service category | Client component for filter state; fetchTestimonials already exists |
| CONT-08 | Newsletter opt-in — appears as inline block inside blog posts at ~50% scroll | NewsletterForm component from Phase 5 reused directly |
| ADM-04 | Blog Post resource — full CRUD, RichEditor, MediaLibrary with alt text, reading time auto-calculated, is_featured, SEO fields | Filament v5 resource pattern; spatie/medialibrary SpatieMediaLibraryFileUpload |
| ADM-05 | Case Study resource — full CRUD, RichEditor for problem/solution/results, key metrics repeatable field, featured toggle, SEO fields | Repeatable field pattern in Filament v5 |
| ADM-06 | Guide resource — full CRUD, resource_type select, external_link or file upload, SEO fields | Filament v5 Select, FileUpload fields |
| ADM-07 | Testimonial resource — quote, client name, title, company, logo upload, star rating, service_category, is_featured, display_order | Spatie MediaLibrary upload; existing testimonials table confirmed |
| ADM-08 | Author resource — name, bio, avatar upload, LinkedIn URL, role/title | MediaLibrary upload; existing authors table confirmed |
| ADM-09 | Page Content resource — manage editable homepage sections as key-value blocks | Named key-value block pattern; extends Setting model or new table |
| ADM-17 | ISR revalidation — ContentObserver already wired in Phase 2 (02-05); fires on every content save | Already complete — no new backend work needed |
| REL-01 | Category and Tag management resource — CRUD for blog/guide categories and tags | Simple string-based taxonomy resource; prevents duplicate slugs |
| REL-06 | published_at <= NOW() enforced — already on all content API controllers from Phase 2 | Already complete — no new backend work needed |
| SEED-01 | 4 sample blog posts — full body, author, featured image, category, tags, reading time | Laravel seeder pattern; Spatie Media seeding approach |
| SEED-02 | 4 sample case studies — client, industry, problem, solution, results with metrics, testimonial quote | Seeder with realistic data matching service tag map |
| SEED-03 | 4 sample guides — full content, cover image, category | Seeder with realistic content |
| SEED-04 | 8 sample testimonials — 2 per major service area, star rating, service+industry tags | Seeder extending Phase 4's existing testimonial data |
</phase_requirements>

---

## Summary

Phase 6 is a data-layer and frontend content phase that connects the already-scaffolded API controllers (built in Phase 2) to full Filament CRUD admin resources, and renders the content through ISR-powered Next.js pages. The ISR pipeline (ContentObserver, RevalidationJob, POST /api/revalidate) was completed in Phase 2 plan 02-05 — this phase only needs to add Filament resource UIs and frontend pages that consume the existing endpoints.

The critical insight is that **most backend infrastructure already exists**: all database migrations are applied (blog_posts, case_studies, guides, testimonials, authors tables all live in production MySQL), all Eloquent models exist with the correct scopePublished() scope, all API controllers exist and return published content. Phase 6 adds Filament resources for admin CRUD, frontend list/detail pages, the conversion-flow components (scroll-hotspot forms), and seed data.

The MiniLeadForm component built in Phase 5 plan 05-04 is the primary reusable component for conversion flow placement. The NewsletterForm component from Phase 5 also slots directly into blog posts at ~50% scroll. Both are already `"use client"` components that POST to the correct endpoints. Category filtering on list pages uses Next.js `searchParams` (URL-driven, no client state needed) — this keeps list pages as Server Components with full ISR cache correctness.

**Primary recommendation:** Build Filament resources (06-01, 06-02) in Wave 1, then frontend list+detail pages (06-03, 06-04) in Wave 2, then seed data (06-05) in Wave 3. Seed data must come last since it depends on Filament resources being available to verify admin CRUD works.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Blog/Case Study/Guide CRUD | API / Backend (Filament) | — | Admin creates/edits; frontend only reads |
| Content API responses | API / Backend (Laravel) | — | Existing GET controllers filter published content |
| ISR cache invalidation | API / Backend (Observer) | Frontend Server (revalidateTag) | Observer fires job; job POSTs to Next.js route handler |
| Blog/Guide/Case Study list pages | Frontend Server (SSR/ISR) | — | Server Components with searchParams-driven category filter |
| Category filter UI | Browser / Client | Frontend Server | Filter state in URL searchParams; filter tab UI is a client island |
| Scroll-depth lead forms | Browser / Client | — | MiniLeadForm is "use client"; placed as isolated leaf nodes in Server Component pages |
| Newsletter inline block | Browser / Client | — | NewsletterForm is "use client"; placed as isolated leaf node |
| Testimonials page filter | Browser / Client | — | Filter state (by service category) needs client state |
| Seed data | API / Backend (Seeder) | — | Laravel seeders with Faker; media seeded via Storage::fake or local placeholder images |
| Author bio | Frontend Server | — | Author relation eagerly loaded on blog post API response |
| Reading time calc | API / Backend | — | Auto-calculated in Filament observer or model accessor |

---

## Standard Stack

### Core (Backend)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| filament/filament | ^5.6 | Admin CRUD resources | Already installed, locked in CLAUDE.md |
| spatie/laravel-medialibrary | ^11.0 | Image uploads with alt text | Already installed; SpatieMediaLibraryFileUpload field in Filament v5 |
| spatie/laravel-sluggable | ^4.0 | Auto-slugs on Author, Category | Already installed; all content models already use it |
| fakerphp/faker | ^1.23 | Realistic seed data | Already in require-dev |

### Core (Frontend)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | ^15.0 | ISR pages, searchParams, generateStaticParams | Locked stack |
| motion/react | ^12.40.0 | Scroll-triggered animations, stagger reveals | Locked stack; established animation system |
| @tabler/icons-react | ^3.44.0 | Icons in blog cards, author bios | Already in optimizePackageImports |

### Supporting (no new installs)

No new packages needed. All required packages are already installed in both repos. [VERIFIED: composer.json and package.json read in session]

---

## Package Legitimacy Audit

> No new packages are installed in Phase 6. All dependencies (filament, spatie/laravel-medialibrary, spatie/laravel-sluggable, motion, @tabler/icons-react) were installed in earlier phases and are already present in composer.json / package.json.

**Packages removed due to slopcheck [SLOP] verdict:** none
**Packages flagged as suspicious [SUS]:** none

---

## Architecture Patterns

### System Architecture Diagram

```
Admin saves BlogPost in Filament
  └── BlogPost::saved() fires ContentObserver
  └── ContentObserver dispatches RevalidationJob(tag: 'blog_posts')
  └── Queue worker picks up job
  └── RevalidationJob POSTs to NEXTJS_REVALIDATE_URL with HMAC
  └── Next.js /api/revalidate verifies HMAC, calls revalidateTag('blog_posts')
  └── Next request to /blog/* purges stale ISR cache
  └── Page regenerated from GET /api/blog-posts/{slug}

Visitor hits /blog
  └── Next.js Server Component (ISR)
  └── fetchBlogPosts(category?, page?) → GET /api/blog-posts?category=X&page=1
  └── Renders list with BlogPostCard components
  └── CategoryFilterTabs (client island) reads ?category from searchParams
  └── Pagination links update URL: /blog?page=2

Visitor hits /blog/{slug}
  └── generateStaticParams returns all published slugs at build time
  └── fetchBlogPost(slug) → GET /api/blog-posts/{slug} with next.tags: ['blog_posts']
  └── Server Component renders: Hero → Body → [~33% MiniLeadForm] → [~50% NewsletterForm] → [~66% CTABanner] → [100% CTASection]
  └── Related posts section fetches GET /api/blog-posts?category=X&limit=3
  └── MiniLeadForm (client island): POSTs to /api/leads, source_form='blog-post-inline'
  └── NewsletterForm (client island): POSTs to /api/subscribers
```

### Recommended Project Structure (additions)

```
buildera-backend/
├── app/
│   ├── Filament/Resources/
│   │   ├── BlogPostResource.php          (+ Pages/)
│   │   ├── AuthorResource.php            (+ Pages/)
│   │   ├── CategoryResource.php          (+ Pages/)
│   │   ├── CaseStudyResource.php         (+ Pages/)
│   │   ├── GuideResource.php             (+ Pages/)
│   │   └── TestimonialResource.php       (+ Pages/)
│   └── Models/
│       └── Category.php                  (new — REL-01 taxonomy)
├── database/
│   ├── migrations/
│   │   └── xxxx_create_categories_table.php  (new — only if categories are a separate model)
│   └── seeders/
│       ├── BlogPostSeeder.php
│       ├── CaseStudySeeder.php
│       ├── GuideSeeder.php
│       └── TestimonialContentSeeder.php

buildera-frontend/src/
├── app/
│   ├── blog/
│   │   ├── page.tsx                      (list — ISR, searchParams category+page)
│   │   └── [slug]/
│   │       └── page.tsx                  (detail — ISR, full conversion flow)
│   ├── case-studies/
│   │   ├── page.tsx                      (list — ISR, searchParams industry)
│   │   └── [slug]/
│   │       └── page.tsx                  (detail — ISR)
│   ├── guides/
│   │   ├── page.tsx                      (list — ISR, searchParams category)
│   │   └── [slug]/
│   │       └── page.tsx                  (detail — ISR)
│   └── testimonials/
│       └── page.tsx                      (full page — client filter)
├── components/
│   ├── sections/blog/
│   │   ├── BlogPostCard.tsx              (Server Component)
│   │   ├── BlogPostBody.tsx              (Server Component — renders body HTML)
│   │   ├── AuthorBio.tsx                 (Server Component)
│   │   └── RelatedPosts.tsx              (Server Component)
│   ├── sections/content/
│   │   ├── CategoryFilterTabs.tsx        ("use client" — reads/sets searchParams)
│   │   ├── ContentCTABanner.tsx          (Server Component — full-width CTA strip)
│   │   ├── CaseStudyCard.tsx             (Server Component)
│   │   ├── CaseStudyMetrics.tsx          (Server Component)
│   │   ├── GuideCard.tsx                 (Server Component)
│   │   └── TestimonialsGrid.tsx          ("use client" — filter by service category)
│   └── ui/
│       └── (MiniLeadForm.tsx already exists from Phase 5)
└── types/
    └── content.ts                        (new — BlogPostItem, CaseStudyItem, GuideItem, AuthorData, etc.)
```

### Pattern 1: ISR List Page with searchParams Category Filter

The category filter on list pages must work **without JavaScript** (SEO requirement) and must not break ISR caching. The correct pattern uses URL searchParams consumed by a Server Component, with a `CategoryFilterTabs` client island that pushes to the router.

```typescript
// Source: Next.js 15 App Router docs — searchParams are available as props on page components
// app/blog/page.tsx — Server Component with ISR
import { fetchBlogPosts } from '@/lib/api'
import { CategoryFilterTabs } from '@/components/sections/content/CategoryFilterTabs'
import { BlogPostCard } from '@/components/sections/blog/BlogPostCard'

interface Props {
  searchParams: Promise<{ category?: string; page?: string }>
}

export const revalidate = 3600 // ISR: regenerate at most once per hour, or on tag purge

export default async function BlogPage({ searchParams }: Props) {
  const { category, page } = await searchParams
  const posts = await fetchBlogPosts({ category, page: page ? parseInt(page) : 1 })
  return (
    <main>
      <CategoryFilterTabs activeCategory={category} />  {/* client island */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.data.map(post => <BlogPostCard key={post.id} post={post} />)}
      </div>
      {/* pagination links */}
    </main>
  )
}
```

**Critical rule:** The `CategoryFilterTabs` client island receives `activeCategory` as a prop (from Server Component) and uses `useRouter().push()` to update URL. It does NOT manage list data — the Server Component refetches on URL change via navigation. [ASSUMED] — pattern inferred from Next.js App Router conventions; verified conceptually against Next.js 15 architecture.

### Pattern 2: ISR Blog Post Detail Page

```typescript
// Source: established pattern from Phase 4 service detail pages
// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetchBlogPosts() // fetches all — no category filter
  return posts.data.map(post => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await fetchBlogPost(slug)  // GET /api/blog-posts/{slug}
  if (!post) notFound()

  return (
    <main>
      {/* 1 - Hero image + title + author + date */}
      {/* ~33% - MiniLeadForm (client island) */}
      <MiniLeadForm sourceForm="blog-post-inline" headline="Get a Free IT Consultation" />
      {/* ~50% - NewsletterForm (client island — reuse from Phase 5) */}
      <NewsletterForm />
      {/* ~66% - ContentCTABanner (Server Component) */}
      <ContentCTABanner />
      {/* 100% - full CTASection + related posts + author bio */}
    </main>
  )
}
```

**Note on `params`:** `params` is a Promise in Next.js 15 App Router — must `await params` before destructuring. This is the established pattern throughout Phase 4 (confirmed in 04-01 plan). [VERIFIED: codebase — buildera-frontend/src/app/services/[category]/[slug]/page.tsx]

### Pattern 3: Filament v5 BlogPost Resource

```php
// Source: established pattern from LeadResource.php and NewsletterSubscriberResource.php
// Uses Schema::make() NOT Form::make() — Filament v5 breaking change (confirmed STATE.md)
namespace App\Filament\Resources;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;
    protected static string|\UnitEnum|null $navigationGroup = 'Content';
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-newspaper';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            // Tabs for organisation
            Tabs::make()->tabs([
                Tab::make('Content')->schema([
                    TextInput::make('title')->required()->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, $set) => $set('slug',
                            \Str::slug($state))),
                    TextInput::make('slug')->required()->unique(ignoreRecord: true),
                    Textarea::make('excerpt')->rows(3)->maxLength(300),
                    RichEditor::make('body')->columnSpanFull(),
                    Select::make('author_id')->relationship('author', 'name')
                        ->searchable()->preload()->nullable(),
                    Select::make('category')->options([/* see categories */])->searchable(),
                    TagsInput::make('tags')->separator(','),
                ]),
                Tab::make('Media')->schema([
                    SpatieMediaLibraryFileUpload::make('featured_image')
                        ->collection('featured_image')
                        ->image()->imageEditor()
                        ->helperText('Recommended: 1200x630px'),
                    TextInput::make('featured_image_alt')->label('Image Alt Text')
                        ->helperText('Describe the image for screen readers and SEO'),
                ]),
                Tab::make('Publishing')->schema([
                    Toggle::make('is_published')->label('Published'),
                    DateTimePicker::make('published_at'),
                    Toggle::make('is_featured'),
                    Select::make('status')->options([
                        'draft' => 'Draft',
                        'published' => 'Published',
                        'archived' => 'Archived',
                    ]),
                ]),
                Tab::make('SEO')->schema([
                    TextInput::make('seo_title')->maxLength(70),
                    Textarea::make('seo_description')->maxLength(160)->rows(3),
                    TextInput::make('seo_og_image'),
                ]),
            ]),
        ]);
    }
}
```

**Key Filament v5 rules (confirmed from codebase):**
- `Schema::make()` not `Form::make()` — confirmed in all existing resources
- `$navigationGroup` typed as `string|\UnitEnum|null` — confirmed in LeadResource.php and NewsletterSubscriberResource.php
- `$navigationIcon` typed as `string|\BackedEnum|null` — confirmed in LeadResource.php
- Use `RichEditor::make()` not awcodes/filament-tiptap-editor — CLAUDE.md constraint
- `SpatieMediaLibraryFileUpload` for image uploads with alt text

### Pattern 4: Reading Time Auto-Calculation

Reading time is not stored in the database schema — the `blog_posts` table has no `reading_time` column. It must be calculated as a model accessor.

```php
// In BlogPost model — add accessor
public function getReadingTimeAttribute(): int
{
    $wordCount = str_word_count(strip_tags($this->body ?? ''));
    return max(1, (int) ceil($wordCount / 200)); // 200 wpm average
}
```

Then cast it as an appended attribute: `protected $appends = ['reading_time'];`

This means the API response automatically includes `reading_time` as an integer (minutes). [ASSUMED] — standard reading-time calculation approach; migration schema confirms no reading_time column.

### Pattern 5: Category Filter via searchParams (no new migration needed)

Blog posts and guides use a plain `category` string column (not a foreign key to a category table). The `CategoryResource` for REL-01 manages a separate `categories` table used as a reference/autocomplete source, but the blog_posts.category column stores the category slug as a string directly.

**Critical decision:** REL-01 says "Category and Tag management resource in Filament — CRUD for blog/guide categories and tags; prevents duplicate/inconsistent taxonomy." The simplest implementation that satisfies this without a migration is a new `categories` table that the Select field in BlogPostResource uses as an options source. The blog_posts table already has a `category` VARCHAR column — no schema change needed.

Categories table migration needed:
```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique();
    $table->string('type'); // 'blog' | 'guide'
    $table->timestamps();
});
```

Blog posts category field then uses: `Select::make('category')->options(Category::where('type','blog')->pluck('name','slug'))` [ASSUMED] — migration needed; no categories table exists in migration list.

### Pattern 6: Case Study Key Metrics — Repeatable Field

ADM-05 requires "key metrics (repeatable field: label + value)". The current `case_studies` table has no `key_metrics` column. This needs either:
1. A new JSON column `key_metrics` added via migration, OR
2. Parse a structured format from the existing `results` text field

Option 1 is cleaner. Migration needed:
```php
Schema::table('case_studies', function (Blueprint $table) {
    $table->json('key_metrics')->nullable()->after('results');
});
```

Filament v5 repeatable field:
```php
Repeater::make('key_metrics')->schema([
    TextInput::make('label')->required()->placeholder('Metric name'),
    TextInput::make('value')->required()->placeholder('e.g. 40%'),
])->columns(2)->maxItems(6),
```
[ASSUMED] — Repeater is the standard Filament v5 component for variable-length structured data; requires JSON column migration.

### Anti-Patterns to Avoid

- **Using `"use client"` on list pages for category filtering:** The list page Server Component must stay a Server Component. Only the tab bar (CategoryFilterTabs) should be a client island. Putting the entire page in "use client" breaks ISR.
- **Fetching blog posts on client with useEffect:** Never fetch content data client-side. All list/detail content fetches happen in Server Components at render time.
- **Hardcoding body HTML with dangerouslySetInnerHTML without sanitization:** RichEditor output may contain user-entered HTML. Use `dangerouslySetInnerHTML` only for the body field, not for author names or other user strings. [ASSUMED] — standard security practice.
- **Overloading the ISR tag granularity:** All blog posts share a single tag `'blog_posts'`. When any post is saved, ALL blog pages using that tag revalidate. This is correct — don't try to create per-slug tags; it defeats the purpose and adds complexity.
- **Media file seeding with Spatie MediaLibrary:** Seeding media via `$model->addMediaFromUrl()` or `$model->addMediaFromDisk()` requires the storage disk to exist and files to be present. Use a simpler approach: seed `featured_image` as a path string and skip MediaLibrary association for seed data. [ASSUMED] — standard seed simplification; proper media association is a post-launch step.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Rich text editing in admin | Custom textarea/WYSIWYG | `RichEditor::make()` from Filament | Handles image embeds, formatting; already in project |
| Image uploads with alt text | Custom file uploader | `SpatieMediaLibraryFileUpload` from spatie/laravel-medialibrary | Handles conversions, storage, alt text; already installed |
| Auto-slugs from title | Custom slug logic | `HasSlug` trait from spatie/laravel-sluggable | Already on all content models |
| ISR cache invalidation | Custom webhook/polling | `revalidateTag()` + ContentObserver already in place | Full pipeline built in Phase 2 plan 02-05 |
| Category filter tabs | Custom client-side filter | URL searchParams + server re-fetch | ISR-compatible; SEO-indexable filtered pages |
| Reading time | External library | Simple word count / 200wpm model accessor | Single accessor; no package needed |
| HTML body sanitization | Custom DOMParser | `strip_tags()` in API response or trusted Filament RichEditor | RichEditor only runs in authenticated admin; no public input |
| Pagination | Custom page logic | Laravel `->paginate(12)` in API controller | Built-in; returns `total`, `per_page`, `current_page` metadata |

---

## ISR Implementation Details

### Cache Tag Mapping (from Phase 2 ContentObserver)

```php
// app/Observers/ContentObserver.php — already wired for these tags:
$map = [
    \App\Models\BlogPost::class    => 'blog_posts',
    \App\Models\CaseStudy::class   => 'case_studies',
    \App\Models\Guide::class       => 'guides',
    \App\Models\Testimonial::class => 'testimonials',
];
```

### Frontend Tag Usage in API Calls

```typescript
// src/lib/api.ts — pattern to follow
fetchFromApi<BlogPost[]>('/api/blog-posts', {
  next: { tags: ['blog_posts'] },
} as RequestInit).catch(() => [])
```

All content fetch helpers must use the matching tag so `revalidateTag('blog_posts')` purges the right pages.

### Pagination in API

The existing `BlogPostController.index()` returns `.get()` (all records). For pagination support (CONT-01 requires 12/page), it must be updated to `.paginate(12)`. Laravel's `paginate()` returns a `LengthAwarePaginator` which serializes to JSON with `data`, `total`, `per_page`, `current_page`, `last_page` keys. The frontend typed response must account for this. [ASSUMED] — standard Laravel paginator; existing controller uses `.get()`; needs update.

---

## Frontend API Additions Needed

Current `src/lib/api.ts` has `fetchTestimonials` and `fetchCaseStudies` but no blog/guide-specific helpers. Phase 6 must add:

```typescript
// New helpers to add to src/lib/api.ts
export interface BlogPostListItem {
  id: number; slug: string; title: string; excerpt: string | null;
  featured_image: string | null; featured_image_alt: string | null;
  category: string | null; tags: string[]; reading_time: number;
  published_at: string; author: { name: string; avatar: string | null } | null;
  is_featured: boolean;
}

export interface BlogPostDetail extends BlogPostListItem {
  body: string | null;
  seo_title: string | null; seo_description: string | null; seo_og_image: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number; per_page: number; current_page: number; last_page: number;
}

export async function fetchBlogPosts(filters?: {
  category?: string; page?: number
}): Promise<PaginatedResponse<BlogPostListItem>> { ... }

export async function fetchBlogPost(slug: string): Promise<BlogPostDetail | null> { ... }

export interface CaseStudyListItem { id: number; slug: string; title: string; client_name: string;
  industry: string; results: string; featured_image: string | null; featured_image_alt: string | null;
  is_published: boolean; }

export interface CaseStudyDetail extends CaseStudyListItem {
  challenge: string; solution: string; key_metrics: { label: string; value: string }[] | null;
  seo_title: string | null; seo_description: string | null;
}

export interface GuideListItem { id: number; slug: string; title: string; excerpt: string | null;
  cover_image: string | null; category: string | null; resource_type: string; }

export interface GuideDetail extends GuideListItem {
  body: string | null;
  seo_title: string | null; seo_description: string | null;
}
```

---

## Scroll-Depth Conversion Flow Architecture

### The Placement Problem

Blog/Guide detail pages are Server Components (for ISR). But `MiniLeadForm` and `NewsletterForm` are `"use client"` components. This is not a conflict — Next.js App Router supports importing client components into Server Components; they become isolated client islands.

**Section ordering for blog post detail (CONT-02):**

```
[1] BlogPostHero      — Server — hero image, title, author, date, reading time
[2] BlogPostBody      — Server — renders first ~33% of content
[3] MiniLeadForm      — Client island — name + email + CTA ("Get a Free Consultation")
[4] BlogPostBodyMid   — Server — next ~17% of content (up to ~50%)
[5] NewsletterForm    — Client island — email + "Subscribe for more insights"
[6] BlogPostBodyEnd   — Server — remaining ~16% (up to ~66%)
[7] ContentCTABanner  — Server — full-width "Ready to build? Book a call" banner
[8] BlogPostBodyFinal — Server — last ~34% of content
[9] CTASection        — Server — full bottom CTA (reuse existing CTASection component)
[10] RelatedPosts     — Server — 3 cards from same category
[11] AuthorBio        — Server — author name, bio, avatar, LinkedIn link
```

**Implementation approach:** Instead of splitting the body into 4 server segments (complex), use CSS positioning. Render the full body in one `BlogPostBody` Server Component, then place conversion elements **after** the body using CSS `order` or use a simpler approach: **static injection based on content length**. The simplest correct approach is:

- Render the full body as one block
- Place `MiniLeadForm` and `NewsletterForm` **after** the body but positioned absolutely into the flow using a fixed-width sidebar sticky wrapper (desktop only, per CONT-02: "Sidebar (desktop) — sticky mini lead form visible while reading")
- For mobile: place them as inline blocks between content sections

The REQUIREMENTS.md "~33% scroll" measurement is a UX target, not a pixel-precise requirement. The planner can decide implementation approach. [ASSUMED] — implementation specifics; REQUIREMENTS.md says "at ~33% scroll depth" without mandating technical implementation.

**Simpler alternative (recommended):** Split the body text at a word boundary roughly 1/3 through, render as two separate HTML segments. The API response `body` is a single HTML string — split client-side in a client component, or server-side by word count.

---

## Common Pitfalls

### Pitfall 1: Category Table vs. String Columns

**What goes wrong:** Phase 6 adds a `CategoryResource` (REL-01), which implies a `categories` table. But `blog_posts.category` and `guides.category` are plain VARCHAR columns, not foreign keys. Creating a foreign key would require a migration that alters existing tables with live seed data.

**Why it happens:** Conflating the admin taxonomy management UI (CategoryResource) with the storage model (string column).

**How to avoid:** Keep `blog_posts.category` and `guides.category` as plain strings. The `categories` table is used only as a managed list — the `Select` field in BlogPostResource queries `Category::pluck('slug')` for options, but the stored value remains a string slug. No foreign key constraint.

**Warning signs:** If the executor creates a `category_id` column migration, stop — this breaks existing seed data.

### Pitfall 2: BlogPostController Returning All Posts (No Pagination)

**What goes wrong:** The current `BlogPostController.index()` method (from Phase 2) returns `.get()` — all published posts. CONT-01 requires 12/page pagination. If the frontend expects `data[]` and `total` keys but gets a flat array, TypeScript will catch it at build time — but only if types are correct.

**Why it happens:** Phase 2 scaffolded a minimal get-all response; pagination wasn't needed until Phase 6.

**How to avoid:** Update `BlogPostController.index()` to use `.paginate(12)` with optional `?category` and `?page` params. Update the typed response interface on the frontend to `PaginatedResponse<BlogPostListItem>`.

**Warning signs:** Frontend builds fine but `/blog?page=2` shows the same 12 posts — pagination URL param is being ignored.

### Pitfall 3: ISR Stale on Admin Publish Toggle

**What goes wrong:** Admin toggles `is_published = true` on a blog post. The ContentObserver fires `RevalidationJob('blog_posts')`. The Next.js page regenerates. But if the `published_at` field is set to a future date, the API controller's `scopePublished()` correctly excludes the post — but the ISR cache was just purged, so the page regenerates to not-show the post. Later, when `published_at` arrives, there's no observer event to trigger revalidation again.

**Why it happens:** ContentObserver fires on `saved()` (model save event), not on scheduled time.

**How to avoid:** Accept this limitation — it's by design in the current architecture. The admin must re-save (or toggle is_published off/on) when the scheduled publish time arrives. Document this in the Filament resource UI via a `helperText` on the `published_at` field: "After setting a future publish date, re-save this record after the scheduled time to trigger cache refresh."

This is a Phase 7/8 enhancement (scheduled revalidation job), not a Phase 6 concern.

### Pitfall 4: RichEditor Output Rendered as Raw HTML

**What goes wrong:** `$post->body` contains HTML like `<p>text</p><img src="..."><ul>...`. Rendering this in a Next.js component requires `dangerouslySetInnerHTML={{ __html: post.body }}`. Without prose styling, the output looks unstyled.

**Why it happens:** RichEditor stores HTML; React doesn't apply default HTML element styling.

**How to avoid:** Wrap the body container with Tailwind Typography prose classes: `<div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[var(--brand-primary)]" dangerouslySetInnerHTML={{ __html: post.body ?? '' }} />`. Note: Tailwind Typography (`@tailwindcss/typography`) is **not currently installed** in the project. Options:
  1. Install `@tailwindcss/typography` — standard Tailwind plugin for prose styling
  2. Hand-roll prose CSS in `globals.css` targeting the `.blog-body` wrapper — feasible for a small set of elements

**Recommendation:** Add `@tailwindcss/typography` to the frontend. It is the standard approach. [ASSUMED] — package not in package.json; recommend installing.

### Pitfall 5: `generateStaticParams` for Blog Posts Fetches All at Build Time

**What goes wrong:** `generateStaticParams` in `app/blog/[slug]/page.tsx` calls the API to get all post slugs. At initial build (with seed data), this returns 4 slugs. Fine. After ISR adds new pages dynamically, Next.js serves them from cache. If the API is down at build time, `generateStaticParams` returns empty array and no pages are prebuilt.

**Why it happens:** Static generation depends on API availability at build time.

**How to avoid:** Use `{ fallback: false }` equivalent in App Router (default behaviour when `generateStaticParams` is defined): unknown slugs return 404. New posts added after build are served via ISR on first request — Next.js 15 App Router handles this correctly. The `notFound()` fallback in the page component is correct. [ASSUMED] — standard Next.js 15 App Router ISR behaviour.

### Pitfall 6: Testimonials Table Missing `service_category` Column

**What goes wrong:** ADM-07 requires a `service_category` field on Testimonials. The `testimonials` table has `service_tags` (JSON array) and `industry_tags` (JSON array) but no `service_category` string column. The Filament TestimonialResource needs to use the existing schema.

**Why it happens:** ADM-07 describes a `service_category` field; the migration uses `service_tags` (plural, JSON).

**How to avoid:** In the TestimonialResource, use `TagsInput::make('service_tags')` (stores as JSON array) and `TagsInput::make('industry_tags')` rather than a single `service_category` Select. The display_order field exists as `sort_order` in the migration. Map correctly: `sort_order` not `display_order`. [VERIFIED: migration file 2026_01_01_000014_create_testimonials_table.php]

### Pitfall 7: Author `role/title` Field Missing from Schema

**What goes wrong:** ADM-08 requires an Author resource with a `role/title` field. The `authors` table has no `role` or `title` column.

```php
// Migration: 2026_01_01_000010_create_authors_table.php
// Columns: id, name, slug, bio, avatar, twitter_url, linkedin_url, timestamps
// NO role or title column
```

**How to avoid:** Either add a migration: `$table->string('role')->nullable()->after('bio');` or store role/title in the `bio` field and document the format. Recommended: add a `role` migration — it's a one-line schema change and the planner should include it.

---

## API Endpoint Updates Needed in Phase 6

| Endpoint | Current State | Phase 6 Change |
|----------|--------------|----------------|
| GET /api/blog-posts | Returns all published, `.get()` | Add `?category=` + `?page=` params, switch to `.paginate(12)`, eager-load author |
| GET /api/blog-posts/{slug} | Returns single post with author | Add `reading_time` accessor, ensure author relation loaded |
| GET /api/case-studies | Returns all, optional `?industry=` filter | Add `?page=` + `.paginate(12)` |
| GET /api/guides | Returns all, optional `?category=` filter | Add `?page=` + `.paginate(12)` |
| GET /api/testimonials | Returns all, optional service/industry filters | Already correct for CONT-07 needs |

---

## Code Examples

### Filament v5 Resource Navigation Group (confirmed pattern)

```php
// Source: buildera-backend/app/Filament/Resources/LeadResource.php (read in session)
protected static string|\UnitEnum|null $navigationGroup = 'Content';  // NOT ?string
protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-newspaper';
```

### SpatieMediaLibraryFileUpload with Alt Text

```php
// Source: Filament v5 + spatie/laravel-medialibrary v11 pattern [ASSUMED — standard usage]
// Must add HasMedia interface + InteractsWithMedia trait to model
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class BlogPost extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')->singleFile();
    }
}

// In Resource form:
SpatieMediaLibraryFileUpload::make('featured_image')
    ->collection('featured_image')
    ->image()
    ->imageEditor()
    ->responsiveImages()
    ->columnSpanFull(),
TextInput::make('featured_image_alt')
    ->label('Featured Image Alt Text')
    ->helperText('Required for accessibility and SEO')
    ->required(fn (Get $get) => filled($get('featured_image'))),
```

**Important note on existing schema:** The `blog_posts`, `case_studies`, `guides` tables have `featured_image` and `featured_image_alt` as plain VARCHAR columns (not using Spatie Media Library's separate `media` table). The plan must decide: use Spatie MediaLibrary (uploads stored in `media` table, model needs `HasMedia` trait) OR use the existing plain string columns (simpler, no model changes).

**Recommendation:** Use the plain string columns for `featured_image` (store a URL/path), and `SpatieMediaLibraryFileUpload` for new uploads but map the result back to the string column. Alternatively, keep it simple: use Filament's `FileUpload::make('featured_image')` which stores a path to the string column directly. The `spatie/laravel-medialibrary` package excels when you need image transformations; for a simple CMS this is overkill. [ASSUMED] — architectural decision; planner should pick `FileUpload::make()` for simplicity since `featured_image` is a plain column.

### Laravel Seeder Pattern for Blog Posts

```php
// Source: established project pattern from SettingsSeeder.php [ASSUMED — standard Laravel]
namespace Database\Seeders;

use App\Models\Author;
use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $author = Author::firstOrCreate(
            ['slug' => 'buildera-team'],
            [
                'name' => 'Buildera Team',
                'bio'  => 'The Buildera engineering and strategy team.',
                'avatar' => null,
            ]
        );

        $posts = [
            [
                'title'        => 'How AI Automation Saved a Mumbai Manufacturer 20 Hours a Week',
                'excerpt'      => 'A mid-size packaging company was spending 20+ hours weekly on manual data entry...',
                'body'         => '<p>...</p>',  // full HTML body
                'category'     => 'ai-automation',
                'tags'         => ['AI', 'Manufacturing', 'Automation'],
                'is_published' => true,
                'published_at' => now()->subDays(7),
                'status'       => 'published',
            ],
            // ... 3 more posts
        ];

        foreach ($posts as $postData) {
            BlogPost::updateOrCreate(
                ['slug' => \Str::slug($postData['title'])],
                array_merge($postData, ['author_id' => $author->id])
            );
        }
    }
}
```

### CategoryFilterTabs Client Component Pattern

```typescript
// "use client" island — reads URL searchParams, pushes route changes
// Source: Next.js 15 App Router useRouter pattern [ASSUMED — standard]
"use client"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Props {
  categories: string[]
  activeCategory?: string
}

export function CategoryFilterTabs({ categories, activeCategory }: Props) {
  const router = useRouter()
  const pathname = usePathname()

  function handleCategoryChange(category: string | undefined) {
    const params = new URLSearchParams()
    if (category) params.set('category', category)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={() => handleCategoryChange(undefined)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${!activeCategory ? 'bg-[var(--brand-primary)] text-white' : 'bg-background border border-border'}`}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCategory === cat ? 'bg-[var(--brand-primary)] text-white' : 'bg-background border border-border hover:border-[var(--brand-primary)]'}`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | Impact |
|--------------|-----------------|--------|
| Filament `Form::make()` | Filament v5: `Schema::make()` | Breaking change confirmed in project STATE.md and existing resources |
| Framer Motion imports | `import { motion } from 'motion/react'` | Confirmed in CLAUDE.md and existing components |
| Blog post ISR pages needing revalidation | ContentObserver + RevalidationJob already wired (Phase 2) | Phase 6 only adds Filament UI; backend pipeline complete |
| Pages Router dynamic routes | App Router: `params: Promise<{...}>` + `await params` | Confirmed in Phase 4 plans and existing service pages |

**Deprecated/outdated:**
- `awcodes/filament-tiptap-editor`: CLAUDE.md explicitly forbids — use `RichEditor::make()` instead
- `Form::make()` in Filament v5: use `Schema::make()` — confirmed in all existing resources

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| MySQL (Hostinger) | All backend models | ✓ | 207.180.252.239 applied | — |
| filament/filament | ADM-04→ADM-09 | ✓ | ^5.6 | — |
| spatie/laravel-medialibrary | Image uploads | ✓ | ^11.0 | FileUpload::make() to string column |
| spatie/laravel-sluggable | Author resource | ✓ | ^4.0 | — |
| fakerphp/faker | Seed data | ✓ | ^1.23 | — |
| motion/react | Frontend animations | ✓ | ^12.40.0 | — |
| @tailwindcss/typography | Blog body prose styling | ✗ | — | Hand-roll .blog-body CSS in globals.css |

**Missing dependencies with no hard fallback:**
- `@tailwindcss/typography` is not installed. Blog body HTML needs styling. Either install the package or add `.prose` CSS rules to `globals.css`.

**Missing dependencies with viable fallback:**
- Spatie MediaLibrary for uploads: fall back to plain `FileUpload::make()` storing path string to existing varchar column.

---

## Validation Architecture

Nyquist validation is enabled (config.json has `nyquist_validation: true`).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | PHPUnit 12.5.x (backend) |
| Config file | buildera-backend/phpunit.xml |
| Quick run command | `php artisan test --filter=BlogPost` |
| Full suite command | `php artisan test` |

Frontend: TypeScript compilation is the primary validation gate (`npx tsc --noEmit`). No Jest/Vitest configured.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CONT-01 | Blog list renders 12/page, category filter works | smoke (build) | `npm run build` | ❌ Wave 0 |
| CONT-02 | Blog detail has mini lead form and newsletter block | smoke (build) | `npm run build` | ❌ Wave 0 |
| ADM-04 | BlogPost resource saves via Filament | manual | Admin UI test | ❌ Wave 0 |
| ADM-17 | ISR fires on content save | manual | Check Next.js logs | ✅ (02-05) |
| REL-06 | published_at filter enforced | unit | `php artisan test --filter=BlogPostController` | ❌ Wave 0 |
| SEED-01→04 | Seed data looks genuine | manual | `php artisan db:seed` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npx tsc --noEmit` (frontend); `php artisan route:list --path=api` (backend)
- **Per wave merge:** `npm run build` (frontend full build); `php artisan test` (backend)
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/Feature/BlogPostApiTest.php` — covers REL-06 (published_at enforcement on GET /api/blog-posts)
- [ ] `tests/Feature/ContentPaginationTest.php` — covers CONT-01 pagination

---

## Security Domain

Security enforcement is enabled (not explicitly false in config).

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | Filament admin uses existing Sanctum session auth |
| V3 Session Management | no | Existing admin session |
| V4 Access Control | yes | filament-shield RBAC — Content group permissions |
| V5 Input Validation | yes | Filament form validation rules; `required()`, `maxLength()`, `url()` on resource fields |
| V6 Cryptography | no | No new crypto in Phase 6 |

### Known Threat Patterns

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via RichEditor body in frontend | Tampering | `dangerouslySetInnerHTML` is acceptable since content comes from authenticated admin, not public input; admin trust boundary |
| Unauthenticated access to Filament resources | Elevation of Privilege | filament-shield RBAC already configured; Content group restricted to Owner + Editor |
| Image upload — arbitrary file execution | Tampering | `FileUpload::make()->image()->acceptedFileTypes(['image/*'])` validates MIME type in Filament; storage disk is `public` (not web-accessible execute path on Hostinger) |
| Slug collision in CategoryResource | Tampering | `->unique(ignoreRecord: true)` on slug TextInput field |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Categories are stored as a new `categories` table (not inline enum) | Pitfall 1, Pattern 5 | Wrong: if categories are enum, no migration needed; simpler to use hardcoded Select options |
| A2 | `case_studies.key_metrics` needs a new JSON migration column | Pattern 6 | Wrong: if planner decides to reuse `results` text field, no migration needed |
| A3 | `authors.role` column needs a new migration | Pitfall 7 | Wrong: if ADM-08 drops role field, no migration needed |
| A4 | `@tailwindcss/typography` is not installed; needed for prose body | Environment | Low risk: either install it or add globals.css prose rules |
| A5 | `BlogPostController` currently uses `.get()` not `.paginate()` | Pitfall 2 | Confirmed via Phase 2 plan text — plan says "get()"; controller file not directly read |
| A6 | Reading time stored as model accessor/appended attribute (no DB column) | Pattern 4 | Confirmed: migration has no reading_time column |
| A7 | Plain `FileUpload::make()` to string column is simpler than full Spatie MediaLibrary integration for Phase 6 | Code Examples | Medium: if MediaLibrary is used, BlogPost/CaseStudy/Guide models need HasMedia trait |
| A8 | Category filter on list pages uses URL searchParams (not client state) | Pattern 1 | Correct approach for ISR; confirmed as standard Next.js 15 App Router pattern |

**If this table is empty:** Not applicable — assumptions exist. Planner should treat A1, A2, A3 as decisions requiring a call before creating tasks.

---

## Open Questions

1. **Category taxonomy storage strategy (A1)**
   - What we know: `blog_posts.category` is a VARCHAR; REL-01 requires admin-managed categories
   - What's unclear: Should categories be a foreign key table with its own migration, or just a managed list with string storage?
   - Recommendation: String storage with a `categories` reference table (no FK constraint). Simple, zero data migration risk.

2. **Key metrics on case studies (A2)**
   - What we know: ADM-05 requires "key metrics (repeatable field: label + value)"; no `key_metrics` column exists
   - What's unclear: Is a new migration needed, or parse from existing `results` text?
   - Recommendation: Add `key_metrics JSON nullable` column via migration. Clean data model.

3. **Author role column (A3)**
   - What we know: `authors` table has no `role` column; ADM-08 requires it
   - What's unclear: Can bio field absorb role/title, or is a separate column needed?
   - Recommendation: Add `role` VARCHAR nullable column via migration.

4. **Blog body prose styling**
   - What we know: `@tailwindcss/typography` not installed; RichEditor produces raw HTML
   - What's unclear: Install plugin or hand-roll CSS?
   - Recommendation: Install `@tailwindcss/typography` via `npm install @tailwindcss/typography --save-dev` and configure in `globals.css`. Standard approach for Tailwind 4.

5. **Testimonial page (CONT-07) — masonry vs grid**
   - What we know: CONT-07 says "masonry or grid layout"; no masonry library installed
   - What's unclear: CSS masonry (`columns-3`) vs JS masonry library?
   - Recommendation: CSS multi-column masonry (`columns-1 md:columns-2 lg:columns-3 gap-6`). No JS library needed; works with all testimonial heights; zero package install. Each card uses `break-inside-avoid`.

---

## Sources

### Primary (HIGH confidence)
- `buildera-backend/composer.json` — all backend package versions read directly in session
- `buildera-frontend/package.json` — all frontend package versions read directly in session
- `buildera-backend/database/migrations/*.php` — all table schemas read directly in session
- `buildera-backend/app/Models/BlogPost.php` — model, casts, scopes confirmed
- `buildera-backend/app/Models/CaseStudy.php` — model, casts, scopes, solution_slug column confirmed
- `buildera-backend/app/Filament/Resources/LeadResource.php` — Filament v5 patterns (Schema::make, navigationGroup type, navigationIcon type) confirmed
- `buildera-backend/app/Observers/ContentObserver.php` (via 02-05 plan) — tag map confirmed
- `buildera-frontend/src/lib/api.ts` — existing fetch helpers, typed interfaces confirmed
- `buildera-frontend/src/app/layout.tsx` — layout structure; Phase 5 widgets not yet mounted (05-04 not complete)
- `.planning/STATE.md` — all locked decisions confirmed
- `CLAUDE.md` — all project constraints confirmed

### Secondary (MEDIUM confidence)
- `.planning/phases/02-backend-core/02-05-PLAN.md` — ISR pipeline architecture; plan text describes ContentObserver implementation
- `.planning/phases/05-industries-trust-lead/05-04-PLAN.md` — MiniLeadForm + NewsletterForm component specs; sourceForm prop pattern confirmed
- `.planning/phases/04-services-solutions-pages/04-01-PLAN.md` — `params: Promise<{...}>` + `await params` pattern; ISR tag usage

### Tertiary (LOW confidence)
- Standard Laravel/Filament/Next.js training knowledge for paginator shape, CSS masonry approach, Repeater field syntax — all tagged [ASSUMED] inline

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed from composer.json + package.json
- Architecture: HIGH — ISR pipeline, model structure, API routes all confirmed from codebase
- Filament v5 patterns: HIGH — confirmed from existing resources in codebase
- Migration needs (categories, key_metrics, author role): MEDIUM — inferred from migration files
- Frontend conversion flow implementation: MEDIUM — pattern established from Phase 4/5; scroll-depth specifics are [ASSUMED]
- Seed data content: MEDIUM — topics and structure from REQUIREMENTS.md; actual content is [ASSUMED]

**Research date:** 2026-05-28
**Valid until:** 2026-06-28 (30 days — stable stack)

---

## Project Constraints (from CLAUDE.md)

The following directives from `CLAUDE.md` apply directly to Phase 6:

1. **Filament v5 only:** `Schema::make()` not `Form::make()`; do NOT install `awcodes/filament-tiptap-editor` — use `RichEditor::make()`
2. **`"use client"` scope:** Only on forms (MiniLeadForm, NewsletterForm, CategoryFilterTabs, TestimonialsGrid), not on content list or detail pages
3. **All API helpers in `src/lib/api.ts`:** Never inline `fetch()` in page components
4. **`motion/react` imports:** `import { motion } from 'motion/react'` — never `framer-motion`
5. **No mid-project deploys:** Build locally, seed data, hand off at Phase 10
6. **No `@tailwindcss/typography` config file** — all Tailwind config in `globals.css` via `@theme` (if installing the typography plugin, configure it in CSS not a config file)
7. **`next/image` with `sizes` prop** on all images in blog cards and detail pages
8. **ISR with `revalidateTag`** — confirmed infrastructure from Phase 2; use matching cache tags
9. **Content type groups in Filament:** All 6 new resources (BlogPost, Author, Category, CaseStudy, Guide, Testimonial) go in the **Content** navigation group
10. **Queue all side effects** — ContentObserver already queues RevalidationJob; no direct HTTP calls in observers
