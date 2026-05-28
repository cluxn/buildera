# Phase 6: Content — Blog, Case Studies, Guides — Pattern Map

**Mapped:** 2026-05-28
**Files analyzed:** 28 new/modified files
**Analogs found:** 27 / 28 (1 has no exact analog — CategoryFilterTabs)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `app/Filament/Resources/BlogPostResource.php` | resource | CRUD | `app/Filament/Resources/LeadResource.php` | role-match |
| `app/Filament/Resources/BlogPostResource/Pages/ListBlogPosts.php` | page | CRUD | `app/Filament/Resources/LeadResource/Pages/ListLeads.php` | exact |
| `app/Filament/Resources/BlogPostResource/Pages/CreateBlogPost.php` | page | CRUD | `app/Filament/Resources/LeadResource/Pages/ListLeads.php` | role-match |
| `app/Filament/Resources/BlogPostResource/Pages/EditBlogPost.php` | page | CRUD | `app/Filament/Resources/LeadResource/Pages/ViewLead.php` | role-match |
| `app/Filament/Resources/AuthorResource.php` | resource | CRUD | `app/Filament/Resources/NewsletterSubscriberResource.php` | role-match |
| `app/Filament/Resources/CategoryResource.php` | resource | CRUD | `app/Filament/Resources/NewsletterSubscriberResource.php` | role-match |
| `app/Filament/Resources/CaseStudyResource.php` | resource | CRUD | `app/Filament/Resources/LeadResource.php` | role-match |
| `app/Filament/Resources/GuideResource.php` | resource | CRUD | `app/Filament/Resources/LeadResource.php` | role-match |
| `app/Filament/Resources/TestimonialResource.php` | resource | CRUD | `app/Filament/Resources/NewsletterSubscriberResource.php` | role-match |
| `app/Models/Category.php` | model | CRUD | `app/Models/Author.php` | exact |
| `app/Http/Controllers/Api/BlogPostController.php` | controller | request-response | `app/Http/Controllers/Api/CaseStudyController.php` | exact |
| `app/Http/Controllers/Api/GuideController.php` | controller | request-response | `app/Http/Controllers/Api/CaseStudyController.php` | exact |
| `app/Http/Controllers/Api/TestimonialController.php` | controller | request-response | `app/Http/Controllers/Api/TestimonialController.php` | exact (update only) |
| `database/migrations/xxxx_create_categories_table.php` | migration | CRUD | `database/migrations/2026_01_01_000010_create_authors_table.php` | exact |
| `database/migrations/xxxx_add_key_metrics_to_case_studies.php` | migration | CRUD | `database/migrations/2026_05_27_000001_add_solution_slug_to_testimonials_and_case_studies.php` | exact |
| `database/migrations/xxxx_add_role_to_authors.php` | migration | CRUD | `database/migrations/2026_05_27_000001_add_solution_slug_to_testimonials_and_case_studies.php` | exact |
| `database/seeders/BlogPostSeeder.php` | seeder | batch | `database/seeders/CaseStudySeeder.php` | exact |
| `database/seeders/CaseStudySeeder.php` | seeder | batch | `database/seeders/CaseStudySeeder.php` | exact (extend) |
| `database/seeders/GuideSeeder.php` | seeder | batch | `database/seeders/CaseStudySeeder.php` | exact |
| `database/seeders/TestimonialContentSeeder.php` | seeder | batch | `database/seeders/TestimonialSeeder.php` | exact (extend) |
| `src/lib/api.ts` | utility | request-response | `src/lib/api.ts` | exact (extend) |
| `src/types/content.ts` | utility | — | `src/types/service-page.ts` | role-match |
| `src/app/blog/page.tsx` | page | request-response | `src/app/industries/page.tsx` | role-match |
| `src/app/blog/[slug]/page.tsx` | page | request-response | `src/app/services/[category]/[slug]/page.tsx` | exact |
| `src/app/case-studies/page.tsx` | page | request-response | `src/app/industries/page.tsx` | role-match |
| `src/app/case-studies/[slug]/page.tsx` | page | request-response | `src/app/services/[category]/[slug]/page.tsx` | exact |
| `src/app/guides/page.tsx` | page | request-response | `src/app/industries/page.tsx` | role-match |
| `src/app/guides/[slug]/page.tsx` | page | request-response | `src/app/services/[category]/[slug]/page.tsx` | exact |
| `src/app/testimonials/page.tsx` | page | request-response | `src/app/industries/page.tsx` | role-match |
| `src/components/sections/blog/BlogPostCard.tsx` | component | — | `src/components/ui/CaseStudyPreviewCard.tsx` | role-match |
| `src/components/sections/blog/BlogPostBody.tsx` | component | — | `src/components/sections/service/ServicePainPoints.tsx` | partial |
| `src/components/sections/blog/AuthorBio.tsx` | component | — | `src/components/sections/trust/TeamSection.tsx` | partial |
| `src/components/sections/blog/RelatedPosts.tsx` | component | — | `src/components/sections/CaseStudiesPreview.tsx` | role-match |
| `src/components/sections/content/CategoryFilterTabs.tsx` | component | event-driven | none | no-analog |
| `src/components/sections/content/ContentCTABanner.tsx` | component | — | `src/components/sections/service/ServiceMidCta.tsx` | exact |
| `src/components/sections/content/CaseStudyCard.tsx` | component | — | `src/components/ui/CaseStudyPreviewCard.tsx` | exact |
| `src/components/sections/content/CaseStudyMetrics.tsx` | component | — | `src/components/ui/MiniMetricsCard.tsx` | role-match |
| `src/components/sections/content/GuideCard.tsx` | component | — | `src/components/ui/CaseStudyPreviewCard.tsx` | role-match |
| `src/components/sections/content/TestimonialsGrid.tsx` | component | event-driven | `src/components/ui/TestimonialCard.tsx` | role-match |

---

## Pattern Assignments

---

### `app/Filament/Resources/BlogPostResource.php` (resource, CRUD)

**Analog:** `app/Filament/Resources/LeadResource.php`

**Imports pattern** (lines 1–19):
```php
<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use App\Models\Author;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
```

**Navigation group and icon pattern** (LeadResource.php lines 22–28):
```php
protected static ?string $model = BlogPost::class;

protected static string|\UnitEnum|null $navigationGroup = 'Content';

protected static ?string $navigationLabel = 'Blog Posts';

protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-newspaper';

protected static ?int $navigationSort = 1;
```

**Form schema pattern** (LeadResource.php lines 36–56, adapted for BlogPost):
```php
public static function form(Schema $schema): Schema
{
    return $schema->components([
        // All field definitions go directly inside components([])
        // Use Schema::make() — NOT Form::make() (Filament v5 breaking change)
        TextInput::make('title')->required(),
        TextInput::make('slug')->required()->unique(ignoreRecord: true),
        // ... more fields
    ]);
}
```

**Table definition pattern** (LeadResource.php lines 58–99):
```php
public static function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('title')->searchable()->sortable(),
            TextColumn::make('category')->badge()->sortable(),
            IconColumn::make('is_published')->boolean(),
            TextColumn::make('published_at')->dateTime()->sortable(),
        ])
        ->defaultSort('published_at', 'desc')
        ->filters([
            SelectFilter::make('is_published')->options(['1' => 'Published', '0' => 'Draft']),
        ]);
}
```

**Pages registration pattern — content resources use Create + Edit (unlike Lead which uses View only)** (LeadResource.php lines 107–113):
```php
public static function getPages(): array
{
    return [
        'index'  => Pages\ListBlogPosts::route('/'),
        'create' => Pages\CreateBlogPost::route('/create'),
        'edit'   => Pages\EditBlogPost::route('/{record}/edit'),
    ];
}
```

**Key Filament v5 rules confirmed from LeadResource.php:**
- `$navigationGroup` type: `string|\UnitEnum|null` — NOT `?string`
- `$navigationIcon` type: `string|\BackedEnum|null` — NOT `?string`
- `Schema::make()` passed as param to `form(Schema $schema)` — NOT `Form::make()`
- All fields go inside `$schema->components([...])`

---

### `app/Filament/Resources/BlogPostResource/Pages/ListBlogPosts.php` (page)

**Analog:** `app/Filament/Resources/LeadResource/Pages/ListLeads.php` (lines 1–11)

**Exact pattern to copy:**
```php
<?php

namespace App\Filament\Resources\BlogPostResource\Pages;

use App\Filament\Resources\BlogPostResource;
use Filament\Resources\Pages\ListRecords;

class ListBlogPosts extends ListRecords
{
    protected static string $resource = BlogPostResource::class;
}
```

---

### `app/Filament/Resources/BlogPostResource/Pages/CreateBlogPost.php` (page)

**Analog:** Same namespace pattern — replace `ListRecords` with `CreateRecord`:
```php
<?php

namespace App\Filament\Resources\BlogPostResource\Pages;

use App\Filament\Resources\BlogPostResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBlogPost extends CreateRecord
{
    protected static string $resource = BlogPostResource::class;
}
```

---

### `app/Filament\Resources/BlogPostResource/Pages/EditBlogPost.php` (page)

**Analog:** Replace with `EditRecord`:
```php
<?php

namespace App\Filament\Resources\BlogPostResource\Pages;

use App\Filament\Resources\BlogPostResource;
use Filament\Resources\Pages\EditRecord;

class EditBlogPost extends EditRecord
{
    protected static string $resource = BlogPostResource::class;
}
```

---

### `app/Filament/Resources/AuthorResource.php` (resource, CRUD)

**Analog:** `app/Filament/Resources/NewsletterSubscriberResource.php`

**Navigation group** (NewsletterSubscriberResource.php lines 17–25):
```php
protected static string|\UnitEnum|null $navigationGroup = 'Content';
protected static ?string $navigationLabel = 'Authors';
protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-user-circle';
protected static ?int $navigationSort = 4;
```

**Form fields** — Author model has: `name`, `slug`, `bio`, `avatar`, `twitter_url`, `linkedin_url`. A `role` column needs to be added via migration first. Fields pattern follows NewsletterSubscriberResource form (lines 30–39) but all fields are editable (not disabled):
```php
public static function form(Schema $schema): Schema
{
    return $schema->components([
        TextInput::make('name')->required(),
        TextInput::make('slug')->required()->unique(ignoreRecord: true),
        TextInput::make('role')->nullable()->label('Title / Role'),
        Textarea::make('bio')->rows(4)->nullable(),
        FileUpload::make('avatar')->image()->disk('public')->directory('authors')->nullable(),
        TextInput::make('linkedin_url')->url()->nullable(),
        TextInput::make('twitter_url')->url()->nullable(),
    ]);
}
```

---

### `app/Filament/Resources/CategoryResource.php` (resource, CRUD)

**Analog:** `app/Filament/Resources/NewsletterSubscriberResource.php`

Simple 3-field resource — name, slug, type. Pattern is identical to NewsletterSubscriberResource but with editable fields and Create/Edit pages:
```php
protected static string|\UnitEnum|null $navigationGroup = 'Content';
protected static ?string $navigationLabel = 'Categories';
protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-tag';
protected static ?int $navigationSort = 5;

public static function form(Schema $schema): Schema
{
    return $schema->components([
        TextInput::make('name')->required(),
        TextInput::make('slug')->required()->unique(ignoreRecord: true),
        Select::make('type')->options(['blog' => 'Blog', 'guide' => 'Guide'])->required(),
    ]);
}
```

---

### `app/Models/Category.php` (model, CRUD)

**Analog:** `app/Models/Author.php` (lines 1–34) — same `HasSlug` trait pattern, no `scopePublished` needed

**Exact pattern to copy from Author.php:**
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasSlug;

    protected $fillable = ['name', 'slug', 'type'];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
}
```

---

### `app/Models/BlogPost.php` — reading time accessor addition (model, CRUD)

**Analog:** `app/Models/BlogPost.php` (existing file — extend only)

**Add to existing BlogPost model** (after line 58):
```php
protected $appends = ['reading_time'];

public function getReadingTimeAttribute(): int
{
    $wordCount = str_word_count(strip_tags($this->body ?? ''));
    return max(1, (int) ceil($wordCount / 200)); // 200 wpm average
}
```

**Note:** `blog_posts` table has no `reading_time` column (confirmed in migration). Accessor appends it to every API response automatically.

---

### `app/Http/Controllers/Api/BlogPostController.php` — update existing (controller, request-response)

**Analog:** `app/Http/Controllers/Api/CaseStudyController.php` (lines 1–35)

**Current state** (lines 10–23 — existing BlogPostController):
```php
public function index(): JsonResponse
{
    $posts = BlogPost::with('author')->published()->latest('published_at')->get();
    return response()->json($posts);
}
```

**Required update — add `?category` filter + `?page` pagination** (pattern from CaseStudyController lines 14–27):
```php
public function index(): JsonResponse
{
    $query = BlogPost::with('author')->published()->latest('published_at');

    if (request()->has('category')) {
        $query->where('category', request('category'));
    }

    return response()->json($query->paginate(12));
}

public function show(string $slug): JsonResponse
{
    $post = BlogPost::with('author')->published()->where('slug', $slug)->firstOrFail();
    return response()->json($post);
}
```

**Key:** Switch from `.get()` to `.paginate(12)` — returns `{ data: [], total, per_page, current_page, last_page }`.

---

### `app/Http/Controllers/Api/CaseStudyController.php` — update existing (controller, request-response)

**Analog:** `app/Http/Controllers/Api/CaseStudyController.php` (lines 1–35 — self-analog)

**Current `index()` uses `.get()`. Add `.paginate(12)` same as BlogPostController above.** Existing `?industry`, `?service`, `?solution` filters are already correct — only add `?page` support via `paginate(12)`.

---

### `app/Http/Controllers/Api/GuideController.php` — update existing (controller, request-response)

**Analog:** `app/Http/Controllers/Api/CaseStudyController.php` (lines 14–27) — `?category` filter already exists; add `.paginate(12)`.

**Current GuideController** (lines 9–19 — existing):
```php
public function index(): JsonResponse
{
    $query = Guide::published()->latest('published_at');
    if (request()->has('category')) {
        $query->where('category', request('category'));
    }
    return response()->json($query->get());
}
```

**Change `.get()` to `.paginate(12)` only.**

---

### Database migrations — add columns (migration, CRUD)

**Analog:** `database/migrations/2026_05_27_000001_add_solution_slug_to_testimonials_and_case_studies.php`

Read this file for the `Schema::table()` addColumn pattern. New migrations to create:

**`xxxx_add_key_metrics_to_case_studies.php`:**
```php
public function up(): void
{
    Schema::table('case_studies', function (Blueprint $table) {
        $table->json('key_metrics')->nullable()->after('results');
    });
}

public function down(): void
{
    Schema::table('case_studies', function (Blueprint $table) {
        $table->dropColumn('key_metrics');
    });
}
```

**`xxxx_add_role_to_authors.php`:**
```php
public function up(): void
{
    Schema::table('authors', function (Blueprint $table) {
        $table->string('role')->nullable()->after('bio');
    });
}
```

**`xxxx_create_categories_table.php`** — copy from `2026_01_01_000010_create_authors_table.php`:
```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('slug')->unique()->index();
    $table->string('type', 20)->default('blog'); // 'blog' | 'guide'
    $table->timestamps();
});
```

---

### `database/seeders/BlogPostSeeder.php` (seeder, batch)

**Analog:** `database/seeders/CaseStudySeeder.php` (lines 1–158) — most direct analog

**Exact structural pattern to copy:**
```php
<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\BlogPost;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $author = Author::firstOrCreate(
            ['slug' => 'buildera-team'],
            ['name' => 'Buildera Team', 'bio' => 'The Buildera engineering and strategy team.', 'avatar' => null]
        );

        $posts = [
            [
                'title'        => '...',
                'slug'         => '...',         // always provide explicit slug
                'excerpt'      => '...',
                'body'         => '<p>...</p>',  // full HTML body
                'category'     => 'ai-automation',
                'tags'         => ['AI', 'Automation'],
                'is_published' => true,
                'published_at' => now()->subDays(7),
                'status'       => 'published',
                'featured_image' => null,
                'featured_image_alt' => null,
            ],
            // 3 more posts
        ];

        foreach ($posts as $postData) {
            BlogPost::updateOrCreate(
                ['slug' => $postData['slug']],
                array_merge($postData, ['author_id' => $author->id])
            );
        }
    }
}
```

**Key differences from CaseStudySeeder:**
- Use `updateOrCreate` (not `create`) to be idempotent on re-runs
- `WithoutModelEvents` trait prevents observer from firing during seeding
- `author_id` merged at `updateOrCreate` call, not in the data array

---

### `database/seeders/TestimonialContentSeeder.php` (seeder, batch)

**Analog:** `database/seeders/TestimonialSeeder.php` (lines 1–293)

**Key columns confirmed from migration** (2026_01_01_000014_create_testimonials_table.php):
- `service_tags` (JSON array) — NOT `service_category`
- `industry_tags` (JSON array)
- `sort_order` (integer) — NOT `display_order`
- `client_photo` (string) — NOT `avatar`
- `content` — the quote text field

**Exact data shape from TestimonialSeeder.php lines 17–29:**
```php
[
    'client_name'    => 'Name Here',
    'client_title'   => 'Job Title',
    'client_company' => 'Company Name',
    'content'        => 'Testimonial quote text...',
    'rating'         => 5,
    'service_tags'   => ['website-development'],  // JSON array — string slugs
    'industry_tags'  => ['retail'],               // JSON array — string slugs
    'solution_slug'  => null,
    'is_featured'    => true,
    'is_published'   => true,
    'sort_order'     => 21,  // Continue from existing seeder's max sort_order (20)
],
```

---

### `database/seeders/DatabaseSeeder.php` — update to add new seeders (seeder)

**Analog:** `database/seeders/DatabaseSeeder.php` (lines 25–27)

**Extend the existing `call()` chain:**
```php
$this->call(SettingsSeeder::class);
$this->call(CaseStudySeeder::class);
$this->call(TestimonialSeeder::class);
// Phase 6 additions:
$this->call(BlogPostSeeder::class);
$this->call(GuideSeeder::class);
$this->call(TestimonialContentSeeder::class);
```

---

### `src/lib/api.ts` — extend with blog/guide fetch helpers (utility, request-response)

**Analog:** `src/lib/api.ts` (lines 97–122 — `fetchTestimonials` and `fetchCaseStudies` functions)

**Exact pattern to replicate** (lines 99–109):
```typescript
export async function fetchTestimonials(
  filters: { service?: string; solution?: string; industry?: string } = {}
): Promise<TestimonialData[]> {
  const params = new URLSearchParams()
  if (filters.service) params.set('service', filters.service)
  if (filters.solution) params.set('solution', filters.solution)
  if (filters.industry) params.set('industry', filters.industry)
  const query = params.toString() ? `?${params.toString()}` : ''
  return fetchFromApi<TestimonialData[]>(`/api/testimonials${query}`, {
    next: { tags: ['testimonials'], revalidate: 3600 },
  } as RequestInit).catch(() => [])
}
```

**New helpers to add following this exact pattern:**
```typescript
// Add PaginatedResponse type (from RESEARCH.md)
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  per_page: number
  current_page: number
  last_page: number
}

// fetchBlogPosts — returns paginated, uses 'blog_posts' ISR tag
export async function fetchBlogPosts(
  filters: { category?: string; page?: number } = {}
): Promise<PaginatedResponse<BlogPostListItem>> {
  const params = new URLSearchParams()
  if (filters.category) params.set('category', filters.category)
  if (filters.page && filters.page > 1) params.set('page', String(filters.page))
  const query = params.toString() ? `?${params.toString()}` : ''
  return fetchFromApi<PaginatedResponse<BlogPostListItem>>(`/api/blog-posts${query}`, {
    next: { tags: ['blog_posts'], revalidate: 3600 },
  } as RequestInit).catch(() => ({ data: [], total: 0, per_page: 12, current_page: 1, last_page: 1 }))
}
```

**ISR tag names to use** (from RESEARCH.md ContentObserver map):
- Blog posts: `'blog_posts'`
- Case studies: `'case_studies'`
- Guides: `'guides'`
- Testimonials: `'testimonials'`

---

### `src/types/content.ts` (new types file, utility)

**Analog:** `src/types/service-page.ts` (lines 1–111)

**Pattern:** Export named interfaces. Import them in api.ts with `import type { BlogPostListItem, ... } from '@/types/content'`. Use the same field naming convention as existing types (`snake_case` to match Laravel API output).

**Confirmed field names from models/migrations:**
- `BlogPost`: `id`, `title`, `slug`, `excerpt`, `body`, `featured_image`, `featured_image_alt`, `author_id`, `category`, `tags` (array), `status`, `is_published`, `published_at`, `seo_title`, `seo_description`, `seo_og_image`, `views` + appended `reading_time`
- `CaseStudy`: `id`, `title`, `slug`, `client_name`, `industry`, `challenge`, `solution`, `results`, `featured_image`, `featured_image_alt`, `service_tags` (array), `industry_tags` (array), `solution_slug`, `is_featured`, `is_published`, `published_at` + migration addition `key_metrics` (JSON)
- `Guide`: `id`, `title`, `slug`, `excerpt`, `body`, `featured_image`, `featured_image_alt`, `category`, `tags` (array), `is_published`, `published_at`, `seo_title`, `seo_description`, `seo_og_image`
- `Author` (in API response): `name`, `avatar`, `bio`, `linkedin_url`, `twitter_url`, `role` (added via migration)

---

### `src/app/blog/page.tsx` (list page, request-response)

**Analog:** `src/app/services/[category]/[slug]/page.tsx` (lines 1–37) + `src/app/industries/page.tsx` (lines 95–163)

**Params pattern** (services slug page lines 10–16):
```typescript
// List pages receive searchParams (not params) — Promise in Next.js 15
interface Props {
  searchParams: Promise<{ category?: string; page?: string }>
}

export default async function BlogPage({ searchParams }: Props) {
  const { category, page } = await searchParams
  // ...
}
```

**ISR export** — add above the default export:
```typescript
export const revalidate = 3600
```

**generateStaticParams is NOT used on list pages** — only on detail pages. List pages are ISR with `revalidate = 3600`.

**Import and data fetch pattern** (services slug page lines 4, 25–28):
```typescript
import { fetchBlogPosts } from '@/lib/api'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

// Inside the component:
const posts = await fetchBlogPosts({ category, page: page ? parseInt(page) : 1 })
```

**Section/card layout** follows `src/app/industries/page.tsx` lines 121–146:
```typescript
<section className="py-20 bg-[var(--brand-surface)]">
  <div className="container mx-auto px-8 max-w-7xl">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.data.map(post => <BlogPostCard key={post.id} post={post} />)}
    </div>
  </div>
</section>
```

**Breadcrumb usage** (industries [slug] page lines 21–28):
```typescript
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ]}
/>
```

---

### `src/app/blog/[slug]/page.tsx` (detail page, request-response)

**Analog:** `src/app/services/[category]/[slug]/page.tsx` (lines 1–37) — closest exact match

**Complete pattern** (services slug page):
```typescript
import { notFound } from 'next/navigation'
import { fetchBlogPost, fetchBlogPosts } from '@/lib/api'

export async function generateStaticParams() {
  const posts = await fetchBlogPosts()
  return posts.data.map(post => ({ slug: post.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params           // MUST await params in Next.js 15 App Router
  const post = await fetchBlogPost(slug)
  if (!post) notFound()

  return (
    <>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
      {/* sections here */}
    </>
  )
}
```

**Critical rule from STATE.md:** `params` is a `Promise<{...}>` in Next.js 15 App Router — always `await params` before destructuring. Confirmed in `services/[category]/[slug]/page.tsx` line 16: `const { category, slug } = await params`.

**Parallel fetch pattern** when detail page needs related content (services slug page lines 25–28):
```typescript
const [post, relatedPosts] = await Promise.all([
  fetchBlogPost(slug),
  fetchBlogPosts({ category: '...' }),
])
```

---

### `src/app/case-studies/[slug]/page.tsx` and `src/app/guides/[slug]/page.tsx`

**Analog:** `src/app/solutions/[slug]/page.tsx` (lines 1–32) — same single-param slug pattern

**Pattern is identical to blog [slug] page above** — substitute `fetchCaseStudy`/`fetchGuide` for `fetchBlogPost`. `generateStaticParams` fetches all slugs at build time. `notFound()` for missing slugs.

---

### `src/components/sections/blog/BlogPostCard.tsx` (component)

**Analog:** `src/components/ui/CaseStudyPreviewCard.tsx` (lines 1–67)

**Card structural pattern** (CaseStudyPreviewCard lines 41–67):
```typescript
// Server Component (no "use client") — no animated counters needed
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  post: BlogPostListItem
}

export function BlogPostCard({ post }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col gap-4 p-0 rounded-xl border border-border bg-background hover:border-[var(--brand-primary)] hover:shadow-md transition-all overflow-hidden"
    >
      {post.featured_image && (
        <Image
          src={post.featured_image}
          alt={post.featured_image_alt ?? post.title}
          width={600}
          height={360}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-48 object-cover"
        />
      )}
      {/* Badge pattern from CaseStudyPreviewCard line 48 */}
      <span className="text-xs font-medium uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full w-fit mx-4">
        {post.category}
      </span>
      <h3 className="text-base font-semibold text-foreground px-4 group-hover:text-[var(--brand-primary)] transition-colors">
        {post.title}
      </h3>
      {/* ... excerpt, author, date, reading_time */}
    </Link>
  )
}
```

**Image rule from CLAUDE.md:** Every `next/image` must have `sizes` prop. `priority` only on above-fold hero images — NOT on list card images.

---

### `src/components/sections/content/ContentCTABanner.tsx` (component)

**Analog:** `src/components/sections/service/ServiceMidCta.tsx` (lines 1–33) — exact structural match

**Full pattern to copy** (ServiceMidCta.tsx — entire file):
```typescript
// Server Component — no "use client" needed
import Link from 'next/link'

export function ContentCTABanner() {
  return (
    <section
      className="py-16"
      style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
    >
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
              Free Consultation
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-white/80 mt-2 max-w-lg text-base">
              Book a free 30-minute discovery call...
            </p>
          </div>
          <Link
            href="/book-a-call"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[var(--brand-primary)] font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            Book a Free Call
          </Link>
        </div>
      </div>
    </section>
  )
}
```

---

### `src/components/sections/content/CaseStudyCard.tsx` (component)

**Analog:** `src/components/ui/CaseStudyPreviewCard.tsx` (lines 1–67)

**CaseStudyPreviewCard** uses animated counters (`"use client"`). The new `CaseStudyCard` for list pages should be a Server Component. Use the visual structure from CaseStudyPreviewCard (badge, title, metric, description, link) but without `motion` imports — static values only.

**Badge pattern** (CaseStudyPreviewCard line 47–50):
```typescript
<span className="text-xs font-medium uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full w-fit">
  {industry}
</span>
```

**Hover pattern** (CaseStudyPreviewCard line 42–44):
```typescript
className="rounded-lg p-6 flex flex-col gap-4 hover:-translate-y-1 hover:shadow-[0_0_0_2px_var(--brand-primary)] transition-all duration-200"
```

---

### `src/components/sections/content/TestimonialsGrid.tsx` (component, event-driven)

**Analog:** `src/components/ui/TestimonialCard.tsx` (lines 1–38) — use as the card inside the grid

**TestimonialsGrid itself is `"use client"`** (filter state for service category). Pattern follows ContactForm.tsx (lines 1–3):
```typescript
"use client"

import { useState } from 'react'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

interface Props {
  testimonials: TestimonialData[]
}

export function TestimonialsGrid({ testimonials }: Props) {
  const [activeService, setActiveService] = useState<string | null>(null)
  const filtered = activeService
    ? testimonials.filter(t => t.service_tags?.includes(activeService))
    : testimonials

  return (
    <div>
      {/* filter buttons */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {filtered.map(t => (
          <div key={t.id} className="break-inside-avoid mb-6">
            <TestimonialCard
              quote={t.content}
              name={t.client_name}
              title={t.client_title ?? ''}
              company={t.client_company ?? ''}
              rating={t.rating}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
```

**TestimonialCard props** (TestimonialCard.tsx lines 3–12): `quote`, `name`, `title`, `company`, `rating`, `className?`. The `content` field in API maps to `quote` prop.

**CSS masonry:** `columns-1 md:columns-2 lg:columns-3 gap-6` with `break-inside-avoid` on each card — no JS masonry library needed.

---

### `src/components/sections/content/CategoryFilterTabs.tsx` (component, event-driven)

**Analog:** None in codebase — first client URL-navigation component.

**Reference pattern from RESEARCH.md** (Pattern 6, lines 700–742):
```typescript
"use client"
import { useRouter, usePathname } from 'next/navigation'

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
        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
          !activeCategory
            ? 'bg-[var(--brand-primary)] text-white'
            : 'bg-background border border-border hover:border-[var(--brand-primary)]'
        }`}
      >
        All
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => handleCategoryChange(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition ${
            activeCategory === cat
              ? 'bg-[var(--brand-primary)] text-white'
              : 'bg-background border border-border hover:border-[var(--brand-primary)]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
```

**Critical rule:** This component receives `categories` and `activeCategory` as props from the Server Component page. It calls `router.push()` — NOT `useState` for filter data. The Server Component page re-renders on URL change and passes new `activeCategory` down.

---

## Shared Patterns

### ISR Cache Tags
**Source:** `src/lib/api.ts` (lines 106–109, confirmed pattern)
**Apply to:** All content fetch helpers in api.ts

```typescript
// Pattern: cast options as RequestInit; use next.tags for ISR tag registration
return fetchFromApi<T>(`/api/blog-posts${query}`, {
  next: { tags: ['blog_posts'], revalidate: 3600 },
} as RequestInit).catch(() => fallbackValue)
```

Tag-to-model mapping (from RESEARCH.md ContentObserver — already wired in Phase 2):
- `'blog_posts'` → BlogPost saves
- `'case_studies'` → CaseStudy saves
- `'guides'` → Guide saves
- `'testimonials'` → Testimonial saves

### `scopePublished()` Enforcement
**Source:** `app/Models/BlogPost.php` (lines 53–57), `app/Models/CaseStudy.php` (lines 49–54), `app/Models/Guide.php` (lines 42–47)
**Apply to:** All API controller queries

```php
// Every published scope uses this exact pattern:
public function scopePublished(Builder $query): void
{
    $query->where('is_published', true)
        ->where(fn (Builder $q) => $q->whereNull('published_at')
            ->orWhere('published_at', '<=', now()));
}
```

**Testimonial model** (app/Models/Testimonial.php lines 32–35) uses a simpler scope — no `published_at` column:
```php
public function scopePublished(Builder $query): void
{
    $query->where('is_published', true);
}
```

### `HasSlug` Trait Pattern
**Source:** `app/Models/Author.php` (lines 6–9, 24–31), `app/Models/BlogPost.php` (lines 6–9, 41–46)
**Apply to:** Category model; any new model with a `slug` column

```php
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Category extends Model
{
    use HasSlug;

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }
}
```

### Motion Import Pattern
**Source:** `src/components/sections/CTASection.tsx` (line 3), `src/components/ui/CaseStudyPreviewCard.tsx` (line 4)
**Apply to:** Any new component that uses animations

```typescript
import { motion } from 'motion/react'
// NOT: import { motion } from 'framer-motion'
```

### `"use client"` Boundary Rules
**Source:** CLAUDE.md constraints, confirmed in codebase

**MUST have `"use client"`:**
- `CategoryFilterTabs.tsx` — uses `useRouter`, `usePathname`
- `TestimonialsGrid.tsx` — uses `useState` for filter
- `MiniLeadForm.tsx` (Phase 5 component, already built)
- `NewsletterForm.tsx` (Phase 5 component, already built)

**Must NOT have `"use client"`:**
- `app/blog/page.tsx` — ISR list page
- `app/blog/[slug]/page.tsx` — ISR detail page
- `BlogPostCard.tsx` — static card, Server Component
- `BlogPostBody.tsx` — renders HTML, Server Component
- `AuthorBio.tsx` — static data display, Server Component
- `RelatedPosts.tsx` — static data display, Server Component
- `ContentCTABanner.tsx` — static CTA, Server Component
- `CaseStudyCard.tsx` — static card, Server Component
- `GuideCard.tsx` — static card, Server Component

### Lead Form Submission Pattern
**Source:** `src/components/sections/contact/ContactForm.tsx` (lines 45–93)
**Apply to:** MiniLeadForm (Phase 5, already built) placement in blog/guide detail pages

```typescript
// source_form field identifies form origin — must be set per placement
source_form: 'blog-post-inline',    // blog detail page
source_form: 'guide-post-inline',   // guide detail page
source_form: 'case-study-inline',   // case study detail page
```

Headers pattern (ContactForm.tsx lines 52–55):
```typescript
headers: {
  'Content-Type': 'application/json',
  'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
},
```

### `next/image` Sizes Pattern
**Source:** CLAUDE.md constraint ("All images: next/image with sizes prop")
**Apply to:** BlogPostCard, CaseStudyCard, GuideCard, BlogPostHero, detail page hero images

```typescript
// List card images (3-col grid):
sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"

// Detail page hero images (full width):
sizes="100vw"
priority={true}  // Only on above-fold hero — NOT on list card images
```

### Filter Params Pattern
**Source:** `src/lib/api.ts` (lines 99–109 — `fetchTestimonials`)
**Apply to:** All new list fetch helpers (`fetchBlogPosts`, `fetchCaseStudies` update, `fetchGuides` update)

```typescript
const params = new URLSearchParams()
if (filters.category) params.set('category', filters.category)
if (filters.page && filters.page > 1) params.set('page', String(filters.page))
const query = params.toString() ? `?${params.toString()}` : ''
```

### Seeder Idempotency Pattern
**Source:** `database/seeders/CaseStudySeeder.php` (line 154: `CaseStudy::create($data)`) vs `database/seeders/SettingsSeeder.php` (line 44: `Setting::updateOrCreate(...)`)

**Blog/Guide/Testimonial seeders must use `updateOrCreate`** (not `create`) so they can be re-run without duplicate errors. CaseStudySeeder uses bare `create` — do NOT copy that; use SettingsSeeder's `updateOrCreate` pattern instead:

```php
BlogPost::updateOrCreate(
    ['slug' => $data['slug']],  // match key
    $data                       // update/insert values
);
```

### Filament Navigation Group Assignment
**Source:** `app/Filament/Resources/LeadResource.php` (line 24) and `app/Filament/Resources/NewsletterSubscriberResource.php` (line 19)
**Apply to:** ALL 6 new resources (BlogPost, Author, Category, CaseStudy, Guide, Testimonial)

```php
protected static string|\UnitEnum|null $navigationGroup = 'Content';
```

All 6 Phase 6 resources go in the `'Content'` navigation group. Navigation sort order suggested: BlogPost=1, CaseStudy=2, Guide=3, Testimonial=4, Author=5, Category=6.

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `src/components/sections/content/CategoryFilterTabs.tsx` | component | event-driven | No existing URL-navigation client component in codebase. First use of `useRouter().push()` for searchParams filtering. Use RESEARCH.md Pattern 6 (lines 699–742) as reference. |

---

## Schema Verification Notes

These column names are **confirmed from migration files** — use exactly as shown:

| Model | Column | Migration File | Type |
|-------|--------|----------------|------|
| BlogPost | `tags` | `2026_01_01_000011` | `json` (cast to `array` in model) |
| BlogPost | `is_published` | `2026_01_01_000011` | `boolean` |
| BlogPost | `status` | `2026_01_01_000011` | `string`, default `'draft'` |
| CaseStudy | `service_tags` | `2026_01_01_000012` | `json` (array) |
| CaseStudy | `industry_tags` | `2026_01_01_000012` | `json` (array) |
| CaseStudy | `key_metrics` | NEW MIGRATION NEEDED | `json nullable` |
| Testimonial | `service_tags` | `2026_01_01_000014` | `json` (array) — NOT `service_category` |
| Testimonial | `sort_order` | `2026_01_01_000014` | `integer` — NOT `display_order` |
| Testimonial | `client_photo` | `2026_01_01_000014` | `string` — NOT `avatar` |
| Testimonial | `content` | `2026_01_01_000014` | `text` — the quote field |
| Author | `role` | NEW MIGRATION NEEDED | `string nullable` |

---

## Metadata

**Analog search scope:** `buildera-backend/app/Filament/Resources/`, `buildera-backend/app/Models/`, `buildera-backend/app/Http/Controllers/Api/`, `buildera-backend/database/seeders/`, `buildera-frontend/src/app/`, `buildera-frontend/src/components/`, `buildera-frontend/src/lib/`, `buildera-frontend/src/types/`
**Files scanned:** 48
**Pattern extraction date:** 2026-05-28
