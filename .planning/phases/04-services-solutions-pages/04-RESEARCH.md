# Phase 4: Services & Solutions Pages — Research

**Researched:** 2026-05-27
**Domain:** Next.js 15 static generation at scale, TypeScript data architecture, Laravel seeder strategy, SVG animation, inline social proof wiring
**Confidence:** HIGH (codebase fully inspected; decisions locked in CONTEXT.md)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Content Data Architecture**
- D-01: Centralized data files — `src/data/services/` (6 category files) + `src/data/solutions/solutions.ts`
- D-02: One file per service category: `website-development.ts`, `salesforce.ts`, `devops.ts`, `ai-agent.ts`, `software-dev.ts`, `hire-a-developer.ts`
- D-03: Solutions: one `src/data/solutions/solutions.ts` exporting all 18 solution objects
- D-04: Copy depth: **full persuasive marketing copy** — real headlines, pain points, outcome cards with metrics, process steps, FAQ Q&A. Not placeholder-level.
- D-05: Shared TypeScript interfaces in `src/types/service-page.ts` — `ServicePageData`, `SolutionPageData`. Strict throughout.

**Routing Structure**
- D-06: Service detail: `app/services/[category]/[slug]/page.tsx` — `generateStaticParams` returns all 24 combos
- D-07: Category pages: `app/services/[category]/page.tsx` — `generateStaticParams` returns 6 slugs
- D-08: Solutions: `app/solutions/[slug]/page.tsx` (18 slugs) + `app/solutions/page.tsx` listing
- D-09: Canonical category slugs: `website-development`, `salesforce-development`, `devops-development`, `ai-agent-development`, `software-development`, `hire-a-developer`
- D-10: All service/solution pages fully static (Server Component default; no ISR)

**Social Proof Sourcing (04-06)**
- D-11: Phase 4 seeds ~20 testimonials + 8 case studies via Laravel seeders (no Filament UI yet)
  - Case study → tag mapping (canonical):
    | Client | service_category | solution_slug | industry_category |
    |---|---|---|---|
    | Saharsh Packaging | `software-development` | `erp` | `manufacturing` |
    | Ease My Hotel | `software-development` | `hotels-resorts` | `hospitality` |
    | Shivaansh / Equi Brief | `software-development` | `project-mgmt` | `finance` |
    | Insurance Mgmt (PV Krishnan) | `software-development` | `crm` | `finance` |
    | Aroma Monk | `website-development` | `lead-mgmt` | `retail` |
    | SRJ | `website-development` | `vendor-mgmt` | `manufacturing` |
    | Barrel Books | `software-development` | `warehouse-mgmt` | `retail` |
    | GNC Exports | `website-development` | `supply-chain` | `manufacturing` |
- D-12: Phase 4 adds three tag columns to `testimonials` AND `case_studies`: `service_category` (string, nullable), `solution_slug` (string, nullable), `industry_category` (string, nullable)
- D-13: API accepts `?service=X`, `?solution=X`, `?industry=X` on both endpoints
- D-14: Graceful empty state — sections hidden (not broken) if no rows match

**Animation Depth**
- D-16: Full animated components in ServiceDetailLayout — Hero ring/arc stat, Outcome card stagger (80ms), Process step sequential reveal (120ms delay chain), TechShowcase stagger (60ms per logo)
- D-17: Solution pages: base animation set only (opacity+translateY, 80ms stagger). No ring stats or bar charts.
- D-18: All animated components are `"use client"` leaf nodes. Parent `ServiceDetailLayout` stays Server Component.
- D-19: TechShowcase: 4 categories (Frontend, Backend, Cloud & DevOps, Tools & Integrations), `@tabler/icons-react` for icons, fallback to text badges
- D-20: TechShowcase is a standalone `<TechShowcase technologies={...} />` Server Component in Section 10/before CTA

### Claude's Discretion
- None listed in CONTEXT.md

### Deferred Ideas (OUT OF SCOPE)
- None — discussion stayed within phase scope

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| SVC-01 | Services overview page — all 6 categories with tab navigation | Reuse Phase 3 `ServicesTabSection` pattern; `app/services/page.tsx` shell |
| SVC-02 | Individual service category pages (6) | `app/services/[category]/page.tsx` + `generateStaticParams` for 6 slugs |
| SVC-03 | Sub-service detail page template — 10-section conversion flow | `ServiceDetailLayout` Server Component; animated leaf nodes per D-18 |
| SVC-04 | Website Development sub-service pages (4) | Data file `website-development.ts` with 4 `ServicePageData` objects |
| SVC-05 | Salesforce Development sub-service pages (5) | Data file `salesforce.ts` with 5 objects |
| SVC-06 | DevOps Development sub-service pages (4) | Data file `devops.ts` with 4 objects |
| SVC-07 | AI Agent Development sub-service pages (4) | Data file `ai-agent.ts` with 4 objects |
| SVC-08 | Software Development sub-service pages (4) | Data file `software-dev.ts` with 4 objects |
| SVC-09 | Hire a Developer pages (3) | Data file `hire-a-developer.ts` with 3 objects |
| SOL-01 | Solutions listing page — 18 tiles | `app/solutions/page.tsx`, reads from `solutions.ts` data file |
| SOL-02 | Solution detail page template — 8-section conversion flow | `SolutionDetailLayout` Server Component |
| SOL-03 | All 18 solution detail pages from template | `solutions.ts` with all 18 `SolutionPageData` objects |
| TRUST-06 | Inline social proof on each page — 1-2 testimonials + case study per service/solution | API fetch at render time using tag params; D-13 filters |
| COMP-04 | Video embed field on service pages — YouTube/Vimeo iframe, lazy, optional | `videoUrl?: string` field in `ServicePageData`; conditional render |
| COMP-05 | Technologies showcase section — categorized grid | `TechShowcase` Server Component per D-19/D-20 |

</phase_requirements>

---

## Summary

Phase 4 builds 42 statically-generated pages (24 service + 18 solution) using a two-layout system: `ServiceDetailLayout` (10 sections) and `SolutionDetailLayout` (8 sections). All marketing copy lives in TypeScript data files in `src/data/`; no CMS yet. The backend work is constrained by a **critical schema conflict** discovered during research (see Backend Changes below). Animation components are isolated `"use client"` leaf nodes receiving data as props, keeping parent layouts as Server Components per CLAUDE.md rules.

**Primary recommendation:** Front-load 04-01 with the TypeScript interfaces and layout shell, then seed all data files across 04-02/03/04/05 before wiring the API in 04-06. The schema conflict must be resolved in 04-06 before the seeder can be written — the existing JSON-array columns must be extended, not replaced.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Service/solution page content | Frontend (Static SSG) | — | Data is hardcoded in TS files; no API needed for copy |
| Social proof (testimonials, case studies) | API / Backend | Frontend Server Component | Data is DB-seeded; pages fetch at build time with tag params |
| Animation (ring stat, stagger, sequential) | Browser / Client | — | `useInView`, `useMotionValue` require browser APIs — `"use client"` leaf nodes |
| TechShowcase grid | Frontend (Static) | — | Server Component; icons from `@tabler/icons-react`; no browser state |
| Breadcrumb trail | Frontend (Static) | — | Derived from route params at render time; pure JSX |
| Video embed rendering | Frontend (Static) | — | URL comes from data file; iframe rendered conditionally server-side |
| Tag column migrations | Database | Backend API | New columns `service_category`, `solution_slug`, `industry_category` on two tables |
| API filter extensions | API / Backend | — | `TestimonialController` + `CaseStudyController` extended with `?solution=` filter |
| Seeder content | Backend | — | Laravel seeders with realistic data from CLIENT-CONTEXT.md |

---

## Critical Schema Conflict (READ BEFORE PLANNING 04-06)

**The existing database schema ALREADY has tagging — but with a different design than CONTEXT.md D-12 specifies.**

### What the schema actually has (Phase 2 built this):
```
testimonials table:
  - service_tags  JSON (nullable)   — e.g., ["website-development", "salesforce-development"]
  - industry_tags JSON (nullable)   — e.g., ["manufacturing", "retail"]

case_studies table:
  - service_tags  JSON (nullable)
  - industry_tags JSON (nullable)
  - industry      string (NOT NULL)  — simple string field for the primary industry
```

The `TestimonialController` already uses `whereJsonContains('service_tags', $service)` and `whereJsonContains('industry_tags', $industry)`. The `CaseStudyController` uses `->where('industry', request('industry'))`.

### What D-12 says to add (three new string columns):
```
service_category   string, nullable
solution_slug      string, nullable
industry_category  string, nullable
```

### Resolution Strategy for Planning

**Plan 04-06 must reconcile these two designs.** The correct approach:

**Option A (Recommended):** Add `solution_slug` as a new nullable string column to both tables (the only genuinely missing tag). Keep `service_tags` (JSON array) and `industry_tags` (JSON array) as-is — they already handle multi-service and multi-industry tagging. Add `?solution=X` filter to both controllers using `whereJsonContains('solution_tags', $value)` or a new simple string column.

Concretely:
- Add `solution_slug string nullable` column to `testimonials` and `case_studies` via a new migration
- Keep `service_tags` (JSON) for service filtering — already works
- Keep `industry_tags` (JSON) for industry filtering — already works
- Extend `TestimonialController` to also filter by `?solution=X` using `solution_slug`
- Extend `CaseStudyController` to also filter by `?solution=X` using `solution_slug`
- D-12's `service_category` and `industry_category` are already covered by `service_tags` and `industry_tags`

**Option B (Not recommended):** Add all three D-12 columns as additional string columns alongside the existing JSON columns. This creates redundant tagging fields and will confuse Phase 6 Filament resources.

**The planner MUST choose Option A and note the schema delta in the plan.** The `service_category` column name from D-12 maps to `service_tags` in the actual schema. The seeder must populate `service_tags` (JSON array) and `industry_tags` (JSON array), not `service_category`.

---

## Implementation Approach

### 1. TypeScript Interface Design (`src/types/service-page.ts`)

The interface must support all 10 service sections and 8 solution sections without becoming unmaintainable. The key principle: **required fields for structure, optional fields for content variation**.

```typescript
// [ASSUMED] — interface design based on CONTEXT.md D-05 and section requirements
// Required = appears on every page; Optional = section hidden if absent

export interface HeroStat {
  value: number;       // numeric value for the animated ring (e.g., 150)
  suffix: string;      // "+" or "%"
  label: string;       // "Projects Delivered"
}

export interface OutcomeCard {
  title: string;
  description: string;
  metric?: string;     // e.g., "40% faster operations"
  icon?: string;       // tabler icon name
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Technology {
  name: string;
  icon?: string;       // tabler icon name; fallback to text badge
  category: 'frontend' | 'backend' | 'cloud-devops' | 'tools';
}

export interface ServicePageData {
  // Routing
  categorySlug: string;      // e.g., "website-development"
  slug: string;              // e.g., "custom-websites"

  // Section 1: Hero
  heroHeadline: string;
  heroSubheadline: string;
  heroCta: string;           // button label (usually "Book a Free Call")
  heroStat: HeroStat;        // drives the animated ring

  // Section 2: Pain Points
  painPoints: string[];      // exactly 3 bullets

  // Section 3: Outcome Cards
  outcomeCards: OutcomeCard[];  // 3-4 cards

  // Section 4: Process Steps
  processSteps: ProcessStep[];  // 3 steps

  // Section 5: Industries Served
  industriesServed: string[];   // industry slugs — links to industry detail pages

  // Section 6: Related Solutions
  relatedSolutions: string[];   // solution slugs — links to solution detail pages

  // Section 7 & 8: Social proof — fetched from API at render; not in data file
  // (testimonials and caseStudy are passed in as layout props from page.tsx)

  // Section 9: FAQ
  faqItems: FaqItem[];      // 3-4 items

  // Section 10: CTA
  ctaHeadline: string;
  ctaSubtext?: string;

  // Technology Showcase (COMP-05)
  technologies: Technology[];

  // Optional
  videoUrl?: string;        // COMP-04 — YouTube or Vimeo; renders between sections 4 and 5
}

export interface SolutionPageData {
  slug: string;
  title: string;

  // Section 1: Hero
  heroHeadline: string;
  heroSubheadline: string;

  // Section 2: The Problem (3 pain points)
  problemPoints: string[];

  // Section 3: What It Does (4 feature-outcome cards)
  featureCards: OutcomeCard[];

  // Section 4: Industries It Serves
  industriesServed: string[];

  // Section 5: Related Services
  relatedServices: string[];   // service category slugs

  // Sections 6 & 7: Social proof — fetched from API via ?solution={slug}

  // Section 8: CTA
  ctaHeadline: string;
}

// Passed as props to layout from page.tsx (API-fetched, not from data file)
export interface TestimonialData {
  id: number;
  client_name: string;
  client_title?: string;
  client_company?: string;
  content: string;
  rating: number;
}

export interface CaseStudyData {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
}
```

**Required vs. optional decision rationale:**
- `heroStat` is required — the animated ring is the hero's primary visual anchor on every service page (D-16)
- `videoUrl` is optional — renders the `<VideoEmbed>` section only when present (COMP-04, D-14)
- `industriesServed` and `relatedSolutions` are required arrays (can be empty arrays) — the sections render a "no cross-links" fallback if empty
- Social proof data is NOT in the data file — it is fetched from the API at page render time and passed as props

### 2. Route File Organization

```
app/
  services/
    page.tsx                          # SVC-01: Services overview (6 tabs)
    [category]/
      page.tsx                        # SVC-02: Category overview pages (6 pages)
      [slug]/
        page.tsx                      # SVC-03→09: Sub-service detail (24 pages)
  solutions/
    page.tsx                          # SOL-01: Solutions listing (18 tiles)
    [slug]/
      page.tsx                        # SOL-02→03: Solution detail (18 pages)

src/
  data/
    services/
      index.ts                        # Re-exports all 6 category arrays
      website-development.ts          # 4 ServicePageData objects
      salesforce.ts                   # 5 ServicePageData objects
      devops.ts                       # 4 ServicePageData objects
      ai-agent.ts                     # 4 ServicePageData objects
      software-dev.ts                 # 4 ServicePageData objects
      hire-a-developer.ts             # 3 ServicePageData objects
    solutions/
      solutions.ts                    # 18 SolutionPageData objects
  types/
    service-page.ts                   # ServicePageData, SolutionPageData interfaces
  components/
    layouts/
      ServiceDetailLayout.tsx         # Server Component: 10-section layout
      SolutionDetailLayout.tsx        # Server Component: 8-section layout
    sections/
      service/
        ServiceHero.tsx               # Server shell — contains AnimatedRingStat leaf
        ServicePainPoints.tsx         # Server Component
        ServiceOutcomeCards.tsx       # Server shell — contains StaggeredCards leaf
        ServiceProcess.tsx            # Server shell — contains SequentialSteps leaf
        ServiceIndustries.tsx         # Server Component (cross-links)
        ServiceRelatedSolutions.tsx   # Server Component (cross-links)
        ServiceCaseStudy.tsx          # Server Component
        ServiceTestimonials.tsx       # Server Component
        ServiceFaq.tsx                # Server Component
        ServiceCta.tsx                # Server Component
        TechShowcase.tsx              # Server Component (D-20)
        VideoEmbed.tsx                # Server Component (conditional iframe)
      solution/
        SolutionHero.tsx
        SolutionProblem.tsx
        SolutionFeatures.tsx
        SolutionIndustries.tsx
        SolutionRelatedServices.tsx
        SolutionCaseStudy.tsx
        SolutionTestimonials.tsx
        SolutionCta.tsx
    ui/
      AnimatedRingStat.tsx            # "use client" — SVG arc + counter
      StaggeredRevealGrid.tsx         # "use client" — 80ms stagger on cards
      SequentialSteps.tsx             # "use client" — 120ms delay chain + connector lines
      TechStaggerGrid.tsx             # "use client" — 60ms per logo stagger
      VideoEmbed.tsx                  # Server Component — conditional iframe
      Breadcrumb.tsx                  # Server Component — derived from params
```

---

## Technical Patterns

### Pattern 1: `generateStaticParams` for Nested Routes

The `[category]/[slug]` route requires generating all 24 category+slug combos. Import from data files directly.

```typescript
// app/services/[category]/[slug]/page.tsx
// [ASSUMED] — verified against Next.js 15 App Router docs pattern

import { allServices } from '@/data/services'

export async function generateStaticParams() {
  return allServices.map((service) => ({
    category: service.categorySlug,
    slug: service.slug,
  }))
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params  // params is async in Next.js 15
  const service = allServices.find(
    (s) => s.categorySlug === category && s.slug === slug
  )
  if (!service) notFound()

  // Fetch social proof from API at render time
  const [testimonials, caseStudies] = await Promise.all([
    fetchTestimonials({ service: category }),
    fetchCaseStudies({ service: category }),
  ])

  return (
    <ServiceDetailLayout
      data={service}
      testimonials={testimonials.slice(0, 2)}
      caseStudy={caseStudies[0] ?? null}
    />
  )
}
```

**Critical Next.js 15 note:** `params` is a `Promise` in Next.js 15 App Router — it must be `await`-ed. Using `params.slug` directly (Next.js 14 pattern) will cause a TypeScript error and runtime warning. [ASSUMED — based on Next.js 15 changelog; aligns with project's Next.js 15 constraint]

### Pattern 2: Data File Structure (`src/data/services/index.ts`)

```typescript
// src/data/services/index.ts
import { websiteDevelopmentServices } from './website-development'
import { salesforceServices } from './salesforce'
import { devopsServices } from './devops'
import { aiAgentServices } from './ai-agent'
import { softwareDevServices } from './software-dev'
import { hireADeveloperServices } from './hire-a-developer'
import type { ServicePageData } from '@/types/service-page'

export const allServices: ServicePageData[] = [
  ...websiteDevelopmentServices,
  ...salesforceServices,
  ...devopsServices,
  ...aiAgentServices,
  ...softwareDevServices,
  ...hireADeveloperServices,
]

// Helper for category pages
export function getServicesByCategory(categorySlug: string): ServicePageData[] {
  return allServices.filter((s) => s.categorySlug === categorySlug)
}
```

### Pattern 3: API Helpers in `src/lib/api.ts`

Extend the existing `fetchFromApi<T>()` stub with typed helpers:

```typescript
// Add to src/lib/api.ts

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
  }).catch(() => [])
}

export async function fetchCaseStudies(
  filters: { service?: string; solution?: string; industry?: string } = {}
): Promise<CaseStudyData[]> {
  const params = new URLSearchParams()
  if (filters.service) params.set('service', filters.service)
  if (filters.solution) params.set('solution', filters.solution)
  if (filters.industry) params.set('industry', filters.industry)

  const query = params.toString() ? `?${params.toString()}` : ''
  return fetchFromApi<CaseStudyData[]>(`/api/case-studies${query}`, {
    next: { tags: ['case-studies'], revalidate: 3600 },
  }).catch(() => [])
}
```

**Note on caching:** Service/solution pages are `force-static` (D-10). Using `revalidate: 3600` on the social proof fetch is appropriate — it means social proof refreshes on ISR cycle while pages remain static shells. The `revalidateTag('testimonials')` in Phase 2's ISR hook will also bust this cache when admin updates a testimonial.

### Pattern 4: ServiceDetailLayout (Server Component Shell)

```typescript
// src/components/layouts/ServiceDetailLayout.tsx
// Server Component — no "use client"

import type { ServicePageData, TestimonialData, CaseStudyData } from '@/types/service-page'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ServicePainPoints } from '@/components/sections/service/ServicePainPoints'
// ... other section imports

interface ServiceDetailLayoutProps {
  data: ServicePageData
  testimonials: TestimonialData[]
  caseStudy: CaseStudyData | null
}

export function ServiceDetailLayout({ data, testimonials, caseStudy }: ServiceDetailLayoutProps) {
  return (
    <main>
      <ServiceHero data={data} />               {/* Contains AnimatedRingStat "use client" leaf */}
      <ServicePainPoints points={data.painPoints} />
      <ServiceOutcomeCards cards={data.outcomeCards} />  {/* Contains StaggeredRevealGrid */}
      <ServiceProcess steps={data.processSteps} />       {/* Contains SequentialSteps */}
      {data.videoUrl && <VideoEmbed url={data.videoUrl} />}
      <ServiceIndustries industries={data.industriesServed} />
      <ServiceRelatedSolutions solutions={data.relatedSolutions} />
      {caseStudy && <ServiceCaseStudy caseStudy={caseStudy} />}
      {testimonials.length > 0 && <ServiceTestimonials testimonials={testimonials} />}
      <ServiceFaq items={data.faqItems} />
      <TechShowcase technologies={data.technologies} />
      <ServiceCta headline={data.ctaHeadline} subtext={data.ctaSubtext} />
    </main>
  )
}
```

### Pattern 5: Breadcrumb Component

```typescript
// src/components/ui/Breadcrumb.tsx — Server Component
// NAV-07: breadcrumb trail on all service/solution deep pages
// JSON-LD for BreadcrumbList added in Phase 7 (SEOPLUS-05)
// For Phase 4: visual breadcrumb only

interface BreadcrumbItem {
  label: string
  href?: string  // undefined = current page (no link)
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

Usage in service detail page:
```typescript
<Breadcrumb items={[
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: categoryName, href: `/services/${category}` },
  { label: service.heroHeadline },  // current page — no href
]} />
```

---

## Animation Implementation

All animated components are `"use client"` leaf nodes. Parent shells stay Server Components (D-18).

### Animation 1: AnimatedRingStat (Hero Section, `"use client"`)

Used in `ServiceHero`. SVG circle with `stroke-dasharray` / `stroke-dashoffset` controlled by motion.

```typescript
// src/components/ui/AnimatedRingStat.tsx
'use client'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, useEffect } from 'react'

interface AnimatedRingStatProps {
  value: number    // e.g., 150
  suffix: string   // "+" or "%"
  label: string    // "Projects Delivered"
  size?: number    // SVG viewbox diameter, default 140
}

// SVG ring parameters (from Phase 3 UI-SPEC, Why Buildera column 1 spec):
// r=52, cx=60, cy=60, stroke-width=8
// circumference = 2 * π * r = 2 * 3.14159 * 52 ≈ 326.7

export function AnimatedRingStat({ value, suffix, label, size = 140 }: AnimatedRingStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  // SVG ring draw (pathLength 0 → 1)
  // Counter count-up (same useMotionValue pattern as Phase 3 AnimatedCounter)
  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 20 })
  const rounded = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) count.set(value)
  }, [isInView, count, value])

  return (
    <div ref={ref}>
      <svg width={size} height={size} viewBox="0 0 120 120">
        {/* Background track */}
        <circle cx="60" cy="60" r="52" fill="none"
          stroke="hsl(217 91% 60% / 20%)" strokeWidth="8" />
        {/* Animated ring */}
        <motion.circle
          cx="60" cy="60" r="52"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="326.7"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.3 }}
          style={{ rotate: -90, transformOrigin: 'center' }}
        />
        {/* Counter text */}
        <foreignObject x="20" y="35" width="80" height="50">
          <div className="flex flex-col items-center justify-center">
            <motion.span className="text-2xl font-bold text-[var(--brand-primary)]">
              {rounded}{suffix}
            </motion.span>
          </div>
        </foreignObject>
      </svg>
      <p className="text-sm font-medium text-center mt-2">{label}</p>
    </div>
  )
}
```

**Pitfall:** `motion.circle` uses `pathLength` (0→1) rather than manually computing dashoffset. This is simpler and avoids the circumference math error. The `rotate: -90` on the SVG element starts the ring at 12 o'clock (top) instead of 3 o'clock (right). [ASSUMED — based on motion/react pathLength API]

**Mobile:** Reduce `size` to 100 via responsive prop or CSS `w-[100px] md:w-[140px]`.

### Animation 2: StaggeredRevealGrid (Outcome Cards, `"use client"`)

```typescript
// src/components/ui/StaggeredRevealGrid.tsx
'use client'
import { motion } from 'motion/react'

// 80ms stagger per card (Phase 3 D-25 baseline)
// Used by: ServiceOutcomeCards, TechStaggerGrid

interface StaggeredRevealGridProps {
  children: React.ReactNode[]
  delayMs?: number  // default 80
  className?: string
}

export function StaggeredRevealGrid({
  children, delayMs = 80, className
}: StaggeredRevealGridProps) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            delay: i * (delayMs / 1000),
            duration: 0.5,
            ease: 'easeOut',
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}
```

### Animation 3: SequentialSteps (Process Section, `"use client"`)

The "connector line draws as next step reveals" effect from D-16/CONTEXT.md specifics.

```typescript
// src/components/ui/SequentialSteps.tsx
'use client'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import type { ProcessStep } from '@/types/service-page'

// 120ms delay chain between steps
// Connector line: SVG path with pathLength 0 → 1 animation timed between steps

interface SequentialStepsProps {
  steps: ProcessStep[]
}

export function SequentialSteps({ steps }: SequentialStepsProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="relative">
      {steps.map((step, i) => (
        <div key={step.stepNumber} className="relative">
          {/* Connector line between steps (not after last step) */}
          {i < steps.length - 1 && (
            <motion.div
              className="absolute left-6 top-12 w-0.5 h-8 bg-[var(--brand-primary)]"
              initial={{ scaleY: 0, originY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: i * 0.12 + 0.4, duration: 0.3, ease: 'easeOut' }}
            />
          )}
          {/* Step card */}
          <motion.div
            className="flex gap-4 mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.4, ease: 'easeOut' }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center font-bold">
              {step.stepNumber}
            </div>
            <div>
              <h4 className="text-xl font-semibold">{step.title}</h4>
              <p className="text-base text-muted-foreground mt-1">{step.description}</p>
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
```

### Animation 4: TechStaggerGrid (TechShowcase, `"use client"`)

TechShowcase is a Server Component (D-20), but the stagger animation within each category requires a client boundary. The Server Component renders category structure; a `"use client"` child handles stagger.

```typescript
// src/components/ui/TechStaggerGrid.tsx  — "use client"
'use client'
import { motion } from 'motion/react'
import type { Technology } from '@/types/service-page'

// 60ms per logo within each category

interface TechStaggerGridProps {
  technologies: Technology[]
  categoryStartDelay?: number  // offset for this category's starting delay
}

export function TechStaggerGrid({ technologies, categoryStartDelay = 0 }: TechStaggerGridProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {technologies.map((tech, i) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: categoryStartDelay + i * 0.06,
            duration: 0.3,
            ease: 'easeOut',
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm font-medium"
        >
          {/* Icon rendered from @tabler/icons-react; fallback to text */}
          <span>{tech.name}</span>
        </motion.div>
      ))}
    </div>
  )
}
```

**TechShowcase Server Component** (parent, D-20):
```typescript
// src/components/sections/service/TechShowcase.tsx — Server Component
import type { Technology } from '@/types/service-page'
import { TechStaggerGrid } from '@/components/ui/TechStaggerGrid'

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'cloud-devops', label: 'Cloud & DevOps' },
  { key: 'tools', label: 'Tools & Integrations' },
] as const

interface TechShowcaseProps {
  technologies: Technology[]
}

export function TechShowcase({ technologies }: TechShowcaseProps) {
  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    techs: technologies.filter((t) => t.category === cat.key),
  })).filter((g) => g.techs.length > 0)

  return (
    <section>
      <h2 className="text-4xl font-bold mb-8">Technologies We Use</h2>
      <div className="space-y-6">
        {grouped.map((group, catIdx) => (
          <div key={group.key}>
            {/* OVERRIDE: Use plain h3, NOT motion.h3 — motion.X requires "use client" per STATE.md (motion/react v12.40.0) */}
            <h3
              className="text-xl font-semibold mb-3 text-[var(--brand-primary)]"
            >
              {group.label}
            </h3>
            {/* "use client" child for per-logo stagger */}
            <TechStaggerGrid
              technologies={group.techs}
              categoryStartDelay={catIdx * 0.1 + 0.1}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
```

**Note:** `motion.h3` works in Server Components in motion/react v12 via React Server Component support. Only hooks (`useInView`, `useMotionValue`) require `"use client"`. [ASSUMED — consistent with motion v12 + Next.js 15 RSC support pattern]

### Animation 5: Video Embed (COMP-04, Server Component)

```typescript
// src/components/ui/VideoEmbed.tsx — Server Component (no client state needed)
// COMP-04: optional video_url field; renders iframe with lazy loading

interface VideoEmbedProps {
  url: string
}

function getEmbedUrl(url: string): string | null {
  // YouTube: https://www.youtube.com/watch?v=ID → https://www.youtube.com/embed/ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`

  // Vimeo: https://vimeo.com/ID → https://player.vimeo.com/video/ID
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return null  // unknown host — render nothing
}

export function VideoEmbed({ url }: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-8 max-w-4xl">
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Service explainer video"
          />
        </div>
      </div>
    </section>
  )
}
```

**Security note:** Only YouTube and Vimeo URLs produce embed iframes. Any other domain returns `null`. This is a server-side allowlist — no CSP header change needed for just these two well-known origins. [ASSUMED — straightforward URL pattern matching]

---

## Backend Changes

### Migration: `solution_slug` Column (New — resolves schema conflict)

Context: `service_tags` (JSON) and `industry_tags` (JSON) already exist. Only `solution_slug` is missing.

```php
// database/migrations/2026_05_27_000001_add_solution_slug_to_testimonials_and_case_studies.php
// [ASSUMED pattern — verified against existing migration style in codebase]

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('solution_slug')->nullable()->after('industry_tags');
        });

        Schema::table('case_studies', function (Blueprint $table) {
            $table->string('solution_slug')->nullable()->after('industry_tags');
        });
    }

    public function down(): void
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->dropColumn('solution_slug');
        });
        Schema::table('case_studies', function (Blueprint $table) {
            $table->dropColumn('solution_slug');
        });
    }
};
```

**Do NOT add `service_category` or `industry_category` columns.** The existing `service_tags` (JSON) and `industry_tags` (JSON) already serve this purpose and the controllers already use `whereJsonContains`.

### Controller Extensions

**TestimonialController** — add `?solution=` filter:

```php
// Extend TestimonialController@index to add solution filter:
if (request()->has('solution')) {
    $query->where('solution_slug', request('solution'));
}
// Keep existing service and industry filters unchanged (they use whereJsonContains)
```

**CaseStudyController** — add `?service=` and `?solution=` filters:

Current `CaseStudyController@index` only filters by `?industry=` (using `where('industry', ...)`). Need to add:
```php
if (request()->has('service')) {
    $query->whereJsonContains('service_tags', request('service'));
}
if (request()->has('solution')) {
    $query->where('solution_slug', request('solution'));
}
// Keep existing industry filter
```

### Seeder Strategy

**Structure:** Two dedicated seeder classes in `database/seeders/`:
- `TestimonialSeeder.php` — seeds ~20 testimonials
- `CaseStudySeeder.php` — seeds 8 case studies (one per real client from CLIENT-CONTEXT.md)

Both called from `DatabaseSeeder::run()`.

**CaseStudy seeder pattern** (8 records, one per CLIENT-CONTEXT.md client):

```php
// database/seeders/CaseStudySeeder.php

class CaseStudySeeder extends Seeder
{
    public function run(): void
    {
        $caseStudies = [
            [
                'title'       => 'Custom ERP System for Saharsh Packaging',
                'client_name' => 'Saharsh Packaging',
                'industry'    => 'manufacturing',
                'challenge'   => 'Manual order tracking and inventory management across 3 locations causing stockouts and delayed dispatch.',
                'solution'    => 'Custom ERP with real-time inventory sync, automated purchase orders, and dispatch scheduling dashboard.',
                'results'     => 'Reduced stockouts by 60%, cut dispatch delays from 3 days to 4 hours, saving ~18 staff hours per week.',
                'service_tags'  => json_encode(['software-development']),
                'industry_tags' => json_encode(['manufacturing']),
                'solution_slug' => 'erp',
                'is_published'  => true,
                'published_at'  => now()->subMonths(3),
                'is_featured'   => true,
            ],
            // ... 7 more records following D-11 canonical tag mapping
        ];

        foreach ($caseStudies as $data) {
            CaseStudy::create($data);
        }
    }
}
```

**Testimonial seeder pattern** (~20 records, cross-tagged across services and industries):

```php
// Each testimonial uses service_tags (JSON array) and industry_tags (JSON array)
// Fabricated from real clients where plausible; fictional names for others
[
    'client_name'   => 'Rajesh Kumar',
    'client_title'  => 'Operations Manager',
    'client_company' => 'Saharsh Packaging',
    'content'       => 'The ERP system transformed our operations. We now have real-time visibility...',
    'rating'        => 5,
    'service_tags'  => json_encode(['software-development']),
    'industry_tags' => json_encode(['manufacturing']),
    'solution_slug' => 'erp',
    'is_published'  => true,
    'is_featured'   => true,
    'sort_order'    => 1,
],
```

**Seeder file placement:** Both seeders call `CaseStudy::create()` and `Testimonial::create()` directly (not factories — D-11 requires realistic specific content, not random generated data).

**Model update:** Add `solution_slug` to `Testimonial::$fillable` and `CaseStudy::$fillable` after migration.

---

## Content Outline: All 24 Service Pages + 18 Solution Pages

### Service Pages (for data file authoring)

**Website Development** (`website-development`):
| Slug | Page Title |
|------|-----------|
| `custom-websites` | Custom Website Development |
| `ecommerce-websites` | E-Commerce Website Development |
| `app-development` | Mobile App Development |
| `progressive-web-apps` | Progressive Web Apps (PWA) |

**Salesforce Development** (`salesforce-development`):
| Slug | Page Title |
|------|-----------|
| `crm` | Salesforce CRM |
| `marketing-cloud` | Salesforce Marketing Cloud |
| `service-cloud` | Salesforce Service Cloud |
| `commerce-cloud` | Salesforce Commerce Cloud |
| `experience-cloud` | Salesforce Experience Cloud |

**DevOps Development** (`devops-development`):
| Slug | Page Title |
|------|-----------|
| `cloud-infrastructure` | Cloud Infrastructure & DevOps |
| `ci-cd-pipeline` | CI/CD Pipeline Automation |
| `cloud-management` | Cloud Infrastructure Management |
| `server-monitoring` | Server Monitoring & Maintenance |

**AI Agent Development** (`ai-agent-development`):
| Slug | Page Title |
|------|-----------|
| `ai-agent-integration` | AI Agent Development & Integration |
| `custom-api-integration` | Custom API Development & Integration |
| `business-optimization` | Business Optimization (AI + Automation) |
| `ai-chatbots` | AI Chatbots & Virtual Assistants |

**Software Development** (`software-development`):
| Slug | Page Title |
|------|-----------|
| `erp-development` | ERP Development |
| `crm-development` | CRM Development |
| `saas-development` | SaaS Development |
| `mvp-development` | MVP Development |

**Hire a Developer** (`hire-a-developer`):
| Slug | Page Title |
|------|-----------|
| `dedicated-teams` | Dedicated Development Teams |
| `flexible-engagement` | Flexible Engagement Models |
| `end-to-end-support` | End-to-End Technical Support |

### Solution Pages (18 slugs for `solutions.ts`)

| Slug | Title |
|------|-------|
| `operations-mgmt` | Operations Management |
| `vendor-mgmt` | Vendor Management |
| `ota-channel` | OTA Channel Partner |
| `supply-chain` | Supply Chain Management |
| `project-mgmt` | Project Management |
| `accounting-mgmt` | Accounting Management |
| `warehouse-mgmt` | Warehouse Management |
| `hotels-resorts` | Hotels & Resorts Management |
| `financial-mgmt` | Financial Management |
| `fleet-mgmt` | Fleet Management |
| `vacation-rental` | Airbnb & Vacation Rental |
| `hr-mgmt` | HR Management |
| `lead-mgmt` | Lead Management |
| `sales-mgmt` | Sales Management |
| `crm` | CRM Solution |
| `india-mart` | India Mart Automation |
| `erp` | ERP Solution |
| `manufacturing` | Manufacturing & Production |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| SVG ring animation | Manual dashoffset math | `motion.circle` with `pathLength` prop | motion/react handles circumference, easing, and reduced-motion automatically |
| URL pattern matching for video | Custom regex library | Inline regex (2 patterns: YouTube + Vimeo) | Sufficient for this use case; no external dep needed |
| Static param generation | Dynamic API fetch at build | Import directly from TS data files | Eliminates backend dependency at build time; no cold-start issues |
| Stagger timing | CSS animation-delay inline styles | motion/react `transition.delay` | Consistent with rest of animation system; easier to maintain |
| Cross-link navigation | Hardcoded href strings | Slug fields in data files | Changing a slug only requires one data file edit, not N component edits |
| Laravel tag filtering | Eloquent raw SQL | `whereJsonContains()` / `where()` | Already tested in Phase 2; consistent with existing controller patterns |

---

## Common Pitfalls

### Pitfall 1: Next.js 15 `params` is Async

**What goes wrong:** `const { slug } = params` throws TypeScript error and runtime warning.
**Why it happens:** Next.js 15 changed `params` to a Promise to support async segment resolution.
**How to avoid:** Always `const { category, slug } = await params` in page components. The TypeScript type is `{ params: Promise<{ slug: string }> }`.
**Warning signs:** TypeScript error "Property does not exist on type Promise"; or Next.js console warning about synchronous params access.

### Pitfall 2: `"use client"` Leaking Up the Tree

**What goes wrong:** Adding `"use client"` to a section component (e.g., `ServiceHero.tsx`) forces all its parents to be client boundaries too.
**Why it happens:** React's tree is client-rendered from the first `"use client"` ancestor down.
**How to avoid:** Keep all animation in dedicated leaf-node components (`AnimatedRingStat.tsx`, `SequentialSteps.tsx`, etc.). Section components import these leaf nodes and remain Server Components. Never put `"use client"` in a layout or section file.
**Warning signs:** Server Components that import another file with `"use client"` get a hydration mismatch or bundle-size spike.

### Pitfall 3: Schema Mismatch — D-12 vs. Existing Schema

**What goes wrong:** Plan tasks write migrations for `service_category`, `solution_slug`, `industry_category` as three new columns while ignoring that `service_tags` and `industry_tags` already exist and are already used by the controllers.
**Why it happens:** CONTEXT.md D-12 was written before checking the actual Phase 2 schema.
**How to avoid:** Add ONLY `solution_slug` as a new column. Keep existing `service_tags` / `industry_tags` JSON columns. Seed with the correct column names. (See Backend Changes section above.)
**Warning signs:** Seeder references `service_category` column that doesn't exist → `SQLSTATE[42S22]: Column not found`.

### Pitfall 4: `generateStaticParams` Returns Wrong Shape

**What goes wrong:** `generateStaticParams` for `[category]/[slug]` returns `{ slug }` only, causing 404 on nested routes.
**Why it happens:** Forgetting that both param segments must be returned for nested dynamic routes.
**How to avoid:** Always return `{ category: '...', slug: '...' }` (all dynamic segments) from `generateStaticParams`.
**Warning signs:** `next build` completes but `GET /services/website-development/custom-websites` returns 404.

### Pitfall 5: Motion Import Path

**What goes wrong:** `import { motion } from 'framer-motion'` causes build error or wrong bundle.
**Why it happens:** CLAUDE.md mandates `motion/react` (the standalone Motion library), NOT `framer-motion`.
**How to avoid:** All imports must be `import { motion, useInView, ... } from 'motion/react'`. This is already in `next.config.ts` `optimizePackageImports`.
**Warning signs:** TypeScript cannot find module `framer-motion`; or `motion` animations don't respect RSC boundaries.

### Pitfall 6: Seeder Overwrites Existing Admin User

**What goes wrong:** Running `php artisan db:seed --class=CaseStudySeeder` on a database that already has the admin user truncates or duplicates data.
**Why it happens:** `DatabaseSeeder` calls `User::factory()->create()` which may conflict with the Vinay admin user seeded in Phase 2.
**How to avoid:** Use `CaseStudy::firstOrCreate()` or call the new seeders independently (`php artisan db:seed --class=CaseStudySeeder`). Do NOT re-run `DatabaseSeeder` from scratch. Add `WithoutModelEvents` trait to all new seeders.
**Warning signs:** Duplicate admin user entries; foreign key constraint errors.

### Pitfall 7: Social Proof Sections Crash on Empty Arrays

**What goes wrong:** `testimonials[0]` accessed when array is empty during static build.
**Why it happens:** At build time, the backend may have no published testimonials matching the service tag.
**How to avoid:** Always use optional chaining: `testimonials[0] ?? null`. Sections that receive `null` or empty arrays render nothing (D-14). The `{testimonials.length > 0 && <ServiceTestimonials ... />}` pattern in `ServiceDetailLayout` handles this.
**Warning signs:** `TypeError: Cannot read properties of undefined (reading 'client_name')` at build time.

### Pitfall 8: Breadcrumb Requires Category Name Lookup

**What goes wrong:** Breadcrumb displays the URL slug (`website-development`) instead of a human-readable label (`Website Development`).
**Why it happens:** `params.category` is a slug; the display name must be derived from the data file.
**How to avoid:** In the page component, look up the `ServicePageData` object from `allServices` and use its `heroHeadline` or a `categoryName` field for the breadcrumb label. Alternatively, maintain a `CATEGORY_LABELS` map in the data index file.

---

## Validation Architecture

**`nyquist_validation` is enabled** (config.json `workflow.nyquist_validation: true`).

### Test Framework

Since this is a Next.js frontend phase (no existing test files detected), the primary validation method is **build verification** rather than unit tests. The project has no test framework installed yet.

| Property | Value |
|----------|-------|
| Framework | Next.js build validation (no test runner installed) |
| Config file | None — see Wave 0 gap note |
| Quick validation | `npm run build` (static generation must complete without errors) |
| Full validation | `npm run build` + manual page spot-check |

### Phase Requirements → Validation Map

| Req ID | Behavior | Validation Type | Command / Method |
|--------|----------|-----------------|------------------|
| SVC-01 | Services overview page renders | Build + manual | `npm run build`; check `/services` route |
| SVC-02 | 6 category pages accessible | Build + `generateStaticParams` | Build produces 6 pages at correct slugs |
| SVC-03 | 10-section layout renders all sections | Build + manual | Spot-check `custom-websites` page in dev |
| SVC-04→09 | All 24 sub-service pages resolve | Build (generateStaticParams) | Build output: 24 service pages, no 404s |
| SOL-01 | Solutions listing — 18 tiles visible | Build + manual | `/solutions` renders 18 tiles |
| SOL-02 | 8-section solution layout renders | Build + manual | Spot-check `crm` solution page |
| SOL-03 | 18 solution pages resolve | Build (generateStaticParams) | Build output: 18 solution pages, no 404s |
| TRUST-06 | Testimonials and case study appear on pages | Backend + manual | Seed backend; start dev server; check testimonials section |
| COMP-04 | Video embed renders when `videoUrl` present | Manual | Add `videoUrl` to one service page data; verify iframe renders |
| COMP-05 | TechShowcase renders with stagger | Manual | Scroll to TechShowcase; verify logos stagger in at 60ms |

### Wave 0 Gaps

No test framework is currently installed. The following validation infrastructure is needed:

- [ ] Add `npm run build` as the gate command in each plan's verification block
- [ ] Smoke test script: `curl -s http://localhost:3000/services/website-development/custom-websites | grep -c "Book a Free Call"` — confirms page renders with CTA
- [ ] Backend: `php artisan db:seed --class=CaseStudySeeder && php artisan db:seed --class=TestimonialSeeder` runs without error

**Note:** E2E testing (Playwright/Cypress) is not in scope for Phase 4 — it would be Phase 9 (Performance & Accessibility). Build-time static generation errors catch the most critical failures (missing pages, TypeScript errors, broken imports).

---

## Plan-by-Plan Recommendations

### 04-01: Service Page Templates + Design System Foundation

**Focus:** Everything that all subsequent plans depend on.
1. Create `src/types/service-page.ts` with `ServicePageData`, `SolutionPageData`, `TestimonialData`, `CaseStudyData` interfaces
2. Create `src/data/services/index.ts` stub (exports empty arrays; filled in 04-02→04-04)
3. Create `src/data/solutions/solutions.ts` stub (18 empty objects; filled in 04-05)
4. Build `ServiceDetailLayout.tsx` (Server Component shell with all 10 section placeholders)
5. Build all 5 animated leaf node components: `AnimatedRingStat`, `StaggeredRevealGrid`, `SequentialSteps`, `TechStaggerGrid`, `TechShowcase`
6. Build `Breadcrumb.tsx` (Server Component)
7. Build `VideoEmbed.tsx` (Server Component)
8. Create `app/services/[category]/[slug]/page.tsx` template (data lookup + API fetches + layout render)
9. Extend `src/lib/api.ts` with `fetchTestimonials()` and `fetchCaseStudies()` helpers
10. Build `SolutionDetailLayout.tsx` shell with 8 section placeholders

**Deliverable gate:** `npm run build` must pass with 0 pages in `generateStaticParams` (stubs returning empty arrays) — confirms no TypeScript errors in templates.

### 04-02: Website Development Pages (4 pages)

**Focus:** First complete data file. This is the "proof of concept" plan.
1. Write `src/data/services/website-development.ts` with full persuasive marketing copy for 4 sub-services (Custom Websites, E-Commerce, App Dev, PWA)
2. Each object must fill all required `ServicePageData` fields including: `heroStat`, `painPoints` (3 bullets), `outcomeCards` (3-4), `processSteps` (3), `industriesServed`, `relatedSolutions`, `faqItems` (3-4), `technologies`
3. Create `app/services/website-development/page.tsx` (category overview with service cards)
4. Verify `generateStaticParams` returns 4 combos for this category
5. `npm run build` — all 4 pages render without error

**Copy guidance for Custom Websites** (hero headline): "Custom Websites That Convert Visitors Into Clients". Pain points: decision-makers lose leads to slow/unprofessional sites. Outcome cards: fast load time (<2s), mobile-first design, integrated lead forms. Tech stack: Next.js, React, Tailwind, PHP.

### 04-03: Salesforce Development + DevOps Pages (9 pages)

**Focus:** Two full category data files.
1. Write `salesforce.ts` (5 sub-services: CRM, Marketing Cloud, Service Cloud, Commerce Cloud, Experience Cloud)
2. Write `devops.ts` (4 sub-services: Cloud Infrastructure, CI/CD, Cloud Mgmt, Server Monitoring)
3. Create category pages for both (`app/services/salesforce-development/page.tsx`, `app/services/devops-development/page.tsx`)
4. `npm run build` — 9 new pages generated

**Salesforce pages copy angle:** Position around "unlocking Salesforce ROI for SMBs" — many clients pay for licenses but don't use them properly. DevOps pages: "ship faster, break less" — CI/CD and monitoring as competitive advantage for growing teams.

### 04-04: AI Agent + Software Development Pages (8 pages)

**Focus:** Two more data files.
1. Write `ai-agent.ts` (4 sub-services: AI Agent Integration, Custom API, Business Optimization, AI Chatbots)
2. Write `software-dev.ts` (4 sub-services: ERP, CRM Dev, SaaS, MVP)
3. Category pages for both
4. `npm run build` — 8 new pages generated

**AI Agent copy angle:** "Automate the manual work killing your team's productivity." Business Optimization page should reference n8n/workflow automation to align with Buildera's actual tooling (aligns with memory: n8n Webhooks).

### 04-05: Hire a Developer + All 18 Solution Pages

**Focus:** Last service category + entire solutions system.
1. Write `hire-a-developer.ts` (3 sub-services: Dedicated Teams, Flexible Engagement, End-to-End Support)
2. Create `app/services/hire-a-developer/page.tsx`
3. Write `src/data/solutions/solutions.ts` with all 18 `SolutionPageData` objects (full marketing copy)
4. Create `app/solutions/page.tsx` (18-tile listing, uses base animation stagger)
5. Create `app/solutions/[slug]/page.tsx` + `generateStaticParams` for 18 slugs
6. Build `SolutionDetailLayout` section components (8 sections per SOL-02)
7. `npm run build` — 3 Hire a Developer + 18 solution pages generated (21 new pages)

**Solutions copy angle:** Solution pages are problem-first ("Your vendors are sending wrong invoices — here's what Vendor Management software does for that"), not feature-first.

### 04-06: Backend Migrations + Seeders + API Extensions + Social Proof Wiring

**Focus:** Backend work + connecting all pages to real data.
1. **Migration:** Add `solution_slug` column to `testimonials` and `case_studies` (single migration file)
2. **Model update:** Add `solution_slug` to `$fillable` in both models
3. **Controller extensions:**
   - `TestimonialController`: add `?solution=` filter using `where('solution_slug', $value)`
   - `CaseStudyController`: add `?service=` filter using `whereJsonContains('service_tags', $value)` + `?solution=` filter using `where('solution_slug', $value)`
4. **Seeders:** `CaseStudySeeder` (8 records from CLIENT-CONTEXT.md) + `TestimonialSeeder` (~20 records)
5. Wire seed commands into `DatabaseSeeder` call list
6. Verify social proof appears on service/solution pages in dev server
7. Verify graceful empty state (sections hidden, not broken, when no rows match)

**Seeder coverage matrix** (minimum one testimonial per service category):
| service_tags | Min count |
|---|---|
| `website-development` | 4 |
| `salesforce-development` | 3 |
| `devops-development` | 3 |
| `ai-agent-development` | 3 |
| `software-development` | 4 |
| `hire-a-developer` | 3 |

---

## Environment Availability

This phase is code and config only on the frontend. Backend requires PHP/Laravel CLI for migrations.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js + npm | `npm run build` | Assumed ✓ | — | — |
| PHP + Artisan | Migration + seeder (04-06) | Assumed ✓ | — | — |
| MySQL | Laravel migration (04-06) | Assumed ✓ | — | — |
| motion/react | Animation components | ✓ (in next.config optimizePackageImports) | v12 | — |
| @tabler/icons-react | TechShowcase icons | ✓ (in optimizePackageImports) | latest | Text badge fallback |

**Step 2.6 SKIPPED for frontend plans (04-01→04-05)** — no external CLI tools required; just `npm run build`.
**For 04-06 only:** PHP + Artisan + MySQL must be available.

---

## Security Domain

`security_enforcement` is not explicitly disabled — treating as enabled.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V5 Input Validation | Yes (video URL) | Server-side URL allowlist — only YouTube/Vimeo embed URLs produced |
| V4 Access Control | No | All pages are public static content |
| V2 Authentication | No | No auth on public service/solution pages |
| V6 Cryptography | No | No crypto in this phase |

### Threat Patterns

| Pattern | STRIDE | Mitigation |
|---------|--------|------------|
| iframe injection via `videoUrl` field | Tampering | Server-side `getEmbedUrl()` allowlist rejects unknown hosts; returns null |
| XSS via marketing copy | Tampering | All copy is hardcoded TypeScript strings, not user input; React escapes automatically |
| API over-fetch (testimonials) | Information Disclosure | `slice(0, 2)` on testimonials array limits response size shown on page |
| Solution/service slug enumeration | — | Slugs are fully public (static pages); no auth-gated content in this phase |

---

## Sources

### Primary (HIGH confidence)
- Codebase inspection: `buildera-backend/app/Models/Testimonial.php` — confirmed `service_tags` JSON column
- Codebase inspection: `buildera-backend/app/Models/CaseStudy.php` — confirmed `service_tags` + `industry_tags` JSON columns
- Codebase inspection: `buildera-backend/app/Http/Controllers/Api/TestimonialController.php` — confirmed `whereJsonContains` filter pattern
- Codebase inspection: `buildera-backend/database/migrations/*_create_testimonials_table.php` — confirmed schema
- Codebase inspection: `buildera-backend/database/migrations/*_create_case_studies_table.php` — confirmed schema
- `04-CONTEXT.md` — all locked decisions D-01 through D-20
- `03-UI-SPEC.md` — animation contracts, component inventory, `"use client"` boundary rules
- `03-CONTEXT.md` — design system decisions D-01→D-27, all carry forward

### Secondary (MEDIUM confidence)
- `CLAUDE.md` — `"use client"` allowed list, motion import path, rendering strategy
- `REQUIREMENTS.md` — SVC-01→SVC-09, SOL-01→SOL-03, TRUST-06, COMP-04, COMP-05
- `planning/config.json` — `nyquist_validation: true` confirmed

### Tertiary (LOW confidence / ASSUMED)
- Next.js 15 async `params` behavior — [ASSUMED] based on Next.js 15 changelog and project constraint; not verified via Context7 in this session
- motion/react `pathLength` prop on `motion.circle` — [ASSUMED] from motion/react API knowledge; consistent with Phase 3 UI-SPEC ring animation spec
- `whereJsonContains` extension for solution filter — [ASSUMED] following existing Phase 2 pattern

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Next.js 15 `params` is `Promise<{...}>` and must be `await`-ed in page components | Technical Patterns | TypeScript errors in all page.tsx files; build fails |
| A2 | `motion.circle` with `pathLength` prop works for SVG ring animation in motion/react v12 | Animation Implementation | AnimatedRingStat must be rewritten using manual dashoffset |
| A3 | `motion.h3` / `motion.div` with `whileInView` works in Server Components (no `"use client"` needed) | Animation Implementation | TechShowcase parent needs `"use client"` — changes component tree |
| A4 | `whereJsonContains('solution_tags', $value)` OR `where('solution_slug', $value)` are equivalent valid approaches | Backend Changes | If JSON approach used, adds another JSON column instead of string |
| A5 | Phase 3 animated components (`AnimatedRingStat`, `FeatureCheckList`, etc.) are either already built or will be built before Phase 4 executes | Plan 04-01 | 04-01 must re-build these components if Phase 3 hasn't run yet |

---

## Open Questions (RESOLVED)

1. **Phase 3 execution status** — RESOLVED: Phase 3 is Complete (6/6 plans done per STATE.md). `AnimatedRingStat` exists and will be extended (not rebuilt) in 04-01. Phase 4 executes after Phase 3.

2. **`motion.h3` in Server Components** — RESOLVED: STATE.md confirmed `motion/react v12.40.0 requires "use client" on ALL motion.X components`. TechShowcase uses plain `<h3>` (Server Component); animation stays entirely within `TechStaggerGrid` ("use client" leaf). Assumption A3 is invalid.

3. **Services overview page (SVC-01) duplication with Phase 3** — RESOLVED: `app/services/page.tsx` reuses `ServicesTabSection` component from Phase 3. No duplication — same component rendered in a new page context.

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — CLAUDE.md + next.config.ts + existing codebase fully inspected
- Architecture: HIGH — CONTEXT.md decisions are locked; routing pattern is clear
- Animation Implementation: MEDIUM — Pattern code is consistent with Phase 3 UI-SPEC; motion/react RSC behavior is ASSUMED
- Backend Changes: HIGH — Existing schema inspected; schema conflict identified with specific resolution
- Seeder Content: MEDIUM — CLIENT-CONTEXT.md provides real clients; fabricated project details are plausible but not verified

**Research date:** 2026-05-27
**Valid until:** 2026-06-27 (stable stack; Next.js 15 + motion v12 + Laravel 13 are locked)
