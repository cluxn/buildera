# Phase 4: Services & Solutions Pages — Pattern Map

**Mapped:** 2026-05-27
**Files analyzed:** 22 new/modified files
**Analogs found:** 22 / 22

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/types/service-page.ts` | model/types | transform | `src/lib/api.ts` (interfaces block) | role-match |
| `src/data/services/website-development.ts` | data/config | transform | `src/components/sections/ServicesTabSection.tsx` (SERVICES_DATA) | role-match |
| `src/data/services/salesforce.ts` | data/config | transform | `src/components/sections/ServicesTabSection.tsx` (SERVICES_DATA) | role-match |
| `src/data/services/devops.ts` | data/config | transform | `src/components/sections/ServicesTabSection.tsx` (SERVICES_DATA) | role-match |
| `src/data/services/ai-agent.ts` | data/config | transform | `src/components/sections/ServicesTabSection.tsx` (SERVICES_DATA) | role-match |
| `src/data/services/software-dev.ts` | data/config | transform | `src/components/sections/ServicesTabSection.tsx` (SERVICES_DATA) | role-match |
| `src/data/services/hire-a-developer.ts` | data/config | transform | `src/components/sections/ServicesTabSection.tsx` (SERVICES_DATA) | role-match |
| `src/data/services/index.ts` | utility | transform | `src/lib/api.ts` (barrel re-exports) | partial |
| `src/data/solutions/solutions.ts` | data/config | transform | `src/components/sections/SolutionsGridSection.tsx` (SOLUTIONS array) | role-match |
| `src/components/layouts/ServiceDetailLayout.tsx` | layout | request-response | `src/app/page.tsx` (multi-section server component) | exact |
| `src/components/layouts/SolutionDetailLayout.tsx` | layout | request-response | `src/app/page.tsx` (multi-section server component) | exact |
| `src/components/ui/AnimatedRingStat.tsx` | component | event-driven | `src/components/ui/AnimatedRingStat.tsx` (ALREADY EXISTS — extend) | exact |
| `src/components/ui/StaggeredRevealGrid.tsx` | component | event-driven | `src/components/sections/SolutionsGridSection.tsx` (stagger pattern) | role-match |
| `src/components/ui/SequentialSteps.tsx` | component | event-driven | `src/components/ui/FeatureCheckList.tsx` (sequential row motion) | role-match |
| `src/components/ui/TechStaggerGrid.tsx` | component | event-driven | `src/components/ui/FeatureCheckList.tsx` + `SolutionsGridSection.tsx` | role-match |
| `src/components/sections/service/*.tsx` (10 files) | component | request-response | `src/components/sections/CTASection.tsx`, `TestimonialsSection.tsx`, `CaseStudiesPreview.tsx` | exact |
| `src/components/sections/solution/*.tsx` (8 files) | component | request-response | `src/components/sections/CTASection.tsx`, `SolutionsGridSection.tsx` | exact |
| `app/services/[category]/[slug]/page.tsx` | route | request-response | `src/app/page.tsx` (async server component + data fetch) | role-match |
| `app/solutions/[slug]/page.tsx` | route | request-response | `src/app/page.tsx` | role-match |
| `src/lib/api.ts` (extend) | utility | request-response | `src/lib/api.ts` itself (fetchNavItems/fetchSettings pattern) | exact |
| `database/migrations/*_add_solution_slug*.php` | migration | CRUD | `database/migrations/2026_01_01_000014_create_testimonials_table.php` | role-match |
| `database/seeders/CaseStudySeeder.php` | seeder | CRUD | `database/seeders/SettingsSeeder.php` | role-match |
| `database/seeders/TestimonialSeeder.php` | seeder | CRUD | `database/seeders/SettingsSeeder.php` | role-match |
| `app/Http/Controllers/Api/TestimonialController.php` (extend) | controller | request-response | `app/Http/Controllers/Api/TestimonialController.php` itself | exact |
| `app/Http/Controllers/Api/CaseStudyController.php` (extend) | controller | request-response | `app/Http/Controllers/Api/CaseStudyController.php` itself | exact |

---

## Pattern Assignments

### `src/types/service-page.ts` (model/types, transform)

**Analog:** `src/lib/api.ts` (lines 27–77)

**Interface declaration pattern** (lines 27–58 of api.ts):
```typescript
export interface NavItem {
  id: number
  label: string
  url: string
  group: 'solutions' | 'work' | 'resources'
  display_order: number
}

export interface Settings {
  company_name: string
  email: string
  // ... all fields non-optional unless truly nullable
  stat_projects: string
}

export const SETTINGS_FALLBACK: Settings = {
  company_name: 'Buildera',
  // ... typed fallback object matching the interface exactly
}
```

**Key rules from analog:**
- All interfaces use `export interface` (not `type`) — consistent across the codebase
- Union literal types for constrained string fields (e.g., `group: 'solutions' | 'work' | 'resources'`)
- Optional fields marked with `?` only when truly absent (e.g., `client_title?: string`)
- Export a typed fallback constant alongside each API-fetched interface

**Apply to `service-page.ts`:** Define `ServicePageData`, `SolutionPageData`, `TestimonialData`, `CaseStudyData`, `HeroStat`, `OutcomeCard`, `ProcessStep`, `FaqItem`, `Technology` interfaces. `Technology.category` should be a union: `'frontend' | 'backend' | 'cloud-devops' | 'tools'`.

---

### `src/data/services/*.ts` (data/config, transform)

**Analog:** `src/components/sections/ServicesTabSection.tsx` (lines 29–192 — `SERVICES_DATA` constant)

**Static typed data array pattern** (lines 29–55 of ServicesTabSection.tsx):
```typescript
const SERVICES_DATA: ServiceCategory[] = [
  {
    category: "Website Development",
    icon: IconWorldWww,
    slug: "website-development",
    subServices: [
      {
        name: "Custom Websites",
        slug: "custom-websites",
        description: "Tailored websites built from scratch...",
      },
      // ...
    ],
  },
  // ...
]
```

**Key rules from analog:**
- Typed with an explicit interface annotation on the `const` declaration — e.g., `const websiteDevelopmentServices: ServicePageData[]`
- Slugs are kebab-case strings matching URL canonical values (D-09)
- Each sub-service object fills all required fields; optional fields (`videoUrl?`) omitted when not needed
- File exports a named const, not a default export — e.g., `export const websiteDevelopmentServices: ServicePageData[]`

**Note on slug alignment:** The existing `SERVICES_DATA` in `ServicesTabSection.tsx` uses slug `"e-commerce"` for the e-commerce sub-service. CONTEXT.md D-06 and RESEARCH.md's content outline use `"ecommerce-websites"` as the canonical slug. The data files must use the canonical slugs from RESEARCH.md's content outline — these are the source of truth for `generateStaticParams`.

---

### `src/data/services/index.ts` (utility, transform)

**Analog:** `src/lib/api.ts` (re-export + helper function pattern)

**Barrel re-export + helper pattern:**
```typescript
// From api.ts — the "re-export + helper" model:
export async function fetchNavItems(): Promise<NavItem[]> { ... }
export async function fetchFooterLinks(): Promise<FooterLink[]> { ... }
export async function fetchSettings(): Promise<Settings> { ... }
```

**Apply to index.ts:** Named imports from each category file, spread into `allServices: ServicePageData[]`, plus a `getServicesByCategory(slug)` helper. All exports named, no defaults.

---

### `src/data/solutions/solutions.ts` (data/config, transform)

**Analog:** `src/components/sections/SolutionsGridSection.tsx` (lines 26–45 — `SOLUTIONS` array)

**Static solutions array pattern** (lines 26–45):
```typescript
const SOLUTIONS = [
  { name: "Operations Management", slug: "operations-management", icon: <IconBuildingFactory className="size-5" /> },
  { name: "Vendor Management", slug: "vendor-management", icon: <IconTruck className="size-5" /> },
  // ... 18 items
]
```

**Key rules from analog:**
- Array of objects with `slug` as routing key
- Slugs in `SolutionsGridSection.tsx` differ from RESEARCH.md canonical slugs — the RESEARCH.md slugs (e.g., `operations-mgmt`, `vendor-mgmt`) are the canonical source. Data file must use RESEARCH.md slugs, not the homepage grid slugs.
- Export as `export const solutions: SolutionPageData[]` (named, not default)

---

### `src/components/layouts/ServiceDetailLayout.tsx` (layout, request-response)

**Analog:** `src/app/page.tsx` (lines 1–28 — async Server Component composing sections)

**Multi-section server component layout pattern** (page.tsx lines 1–28):
```typescript
import { fetchSettings } from "@/lib/api"
import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBarSection } from "@/components/sections/StatsBarSection"
// ... all section imports

export default async function HomePage() {
  const settings = await fetchSettings()

  return (
    <>
      <HeroSection />
      <StatsBarSection settings={settings} />
      <ServicesTabSection />
      // ...
    </>
  )
}
```

**Key rules from analog:**
- No `"use client"` — pure Server Component
- Props typed via an `interface` declaration above the component function (not inline)
- All section imports at the top; no dynamic imports needed for static sections
- Async data passed as props to sections that need it; animated leaf nodes receive data as plain props

**Apply to ServiceDetailLayout:** Props interface: `{ data: ServicePageData; testimonials: TestimonialData[]; caseStudy: CaseStudyData | null }`. Return `<main>` wrapping 10 section components in order. No `async` keyword on the layout itself — data is fetched in `page.tsx` and passed down.

---

### `src/components/layouts/SolutionDetailLayout.tsx` (layout, request-response)

**Analog:** Same as `ServiceDetailLayout` — `src/app/page.tsx` pattern. Props interface: `{ data: SolutionPageData; testimonials: TestimonialData[]; caseStudy: CaseStudyData | null }`. 8 sections instead of 10. No animated ring stat — base whileInView stagger only (D-17).

---

### `src/components/ui/AnimatedRingStat.tsx` (component, event-driven) — EXTEND EXISTING

**This file ALREADY EXISTS at `src/components/ui/AnimatedRingStat.tsx`.**

**Current implementation** (lines 1–88 — read in full):
- `"use client"` — correct
- `import { motion, useReducedMotion } from "motion/react"` — correct import path
- SVG ring: `cx="60" cy="60" r="52" strokeWidth="8" strokeDasharray="326.7"`
- `motion.circle` with `pathLength: percentage / 100` — `whileInView` (not `useInView` hook)
- `useReducedMotion()` hook used to zero out duration/delay for accessibility
- Currently accepts `{ percentage: number; label: string }` — hardcodes checklist items

**Required change for Phase 4 (D-16):** The interface must be extended to accept `{ value: number; suffix: string; label: string; size?: number }` instead of `{ percentage: number; label: string }`. The ring fill must animate to `pathLength: 1` (always full ring) while a count-up counter in the center shows the numeric value + suffix.

**Counter count-up pattern** — copy from `src/components/ui/AnimatedCounter.tsx` (lines 1–48):
```typescript
import { useEffect, useRef } from "react"
import {
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useReducedMotion,
  motion,
} from "motion/react"

const ref = useRef<HTMLSpanElement>(null)
const isInView = useInView(ref, { once: true })
const prefersReducedMotion = useReducedMotion()

const count = useMotionValue(0)
const spring = useSpring(count, { stiffness: 60, damping: 20 })
const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

useEffect(() => {
  if (!isInView) return;
  if (prefersReducedMotion) { count.set(target); return; }
  const id = setTimeout(() => count.set(target), delay * 1000)
  return () => clearTimeout(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [isInView, prefersReducedMotion])
```

**SVG ring parameters to keep** (from existing AnimatedRingStat lines 22–54):
```typescript
<svg width="120" height="120" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="52" fill="none"
    stroke="hsl(217 91% 60% / 15%)" strokeWidth="8" />
  <motion.circle
    cx="60" cy="60" r="52" fill="none"
    stroke="var(--brand-primary)" strokeWidth="8"
    strokeLinecap="round" strokeDasharray="326.7"
    initial={{ pathLength: 0, opacity: 0 }}
    whileInView={{ pathLength: percentage / 100, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut", delay: prefersReducedMotion ? 0 : 0.3 }}
    style={{ rotate: -90, transformOrigin: "60px 60px" }}
  />
```

**Replace** `pathLength: percentage / 100` with `pathLength: 1` for the hero stat ring (always full circle). Center text uses `<motion.span>{rounded}</motion.span>` (from AnimatedCounter pattern) inside a `<foreignObject>` or replace `<text>` SVG element.

---

### `src/components/ui/StaggeredRevealGrid.tsx` (component, event-driven)

**Analog:** `src/components/sections/SolutionsGridSection.tsx` (lines 72–95 — grid stagger)

**whileInView stagger pattern** (lines 72–95):
```typescript
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {SOLUTIONS.map((solution, index) => {
    const colIndex = index % 4
    const rowIndex = Math.floor(index / 4)
    return (
      <motion.div
        key={solution.slug}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          delay: (colIndex + rowIndex) * 0.05,
          duration: 0.35,
          ease: "easeOut",
        }}
      >
```

**Key rules from analog:**
- `"use client"` directive at top
- `import { motion } from "motion/react"` — not framer-motion
- `whileInView` + `viewport={{ once: true }}` — never `useInView` hook for simple stagger
- `delay: i * (delayMs / 1000)` where `delayMs` is the prop (default 80 per D-16)
- `viewport={{ once: true, margin: "-100px" }}` — consistent margin from existing sections

**StaggeredRevealGrid wraps `React.ReactNode[]` children** and applies the stagger `motion.div` wrapper to each child. `className` prop passes through to the outer container. Children do not need to be motion elements themselves.

---

### `src/components/ui/SequentialSteps.tsx` (component, event-driven)

**Analog:** `src/components/ui/FeatureCheckList.tsx` (lines 30–73 — sequential row motion with delay chain)

**Sequential row animation pattern** (lines 30–72):
```typescript
{COMPARISON_ROWS.map((row, rowIndex) => (
  <motion.div
    key={row.feature}
    className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 items-center text-sm"
    initial={{ opacity: 0, x: -8 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{
      delay: rowIndex * 0.15,
      type: "spring",
      stiffness: 400,
      damping: 25,
    }}
  >
```

**Key rules from analog:**
- `"use client"` at top — the hook pattern here uses `whileInView` directly (no `useInView`)
- Delay chain: `rowIndex * 0.15` — adapt to `i * 0.12` per D-16 (120ms between steps)
- `import { motion } from "motion/react"` — correct import
- `initial={{ opacity: 0, x: -8 }}` for left-slide-in effect — replicate this for process steps

**SequentialSteps additional requirement:** Connector line between steps uses `motion.div` with `scaleY: 0 → 1` timed to draw between step reveals. Use `initial={{ scaleY: 0 }}` + `animate={{ scaleY: 1 }}` with `style={{ transformOrigin: 'top' }}`. This requires a `useInView` hook (not `whileInView`) since the connector must animate relative to container visibility — copy `useInView` pattern from `AnimatedCounter.tsx` lines 21–38.

---

### `src/components/ui/TechStaggerGrid.tsx` (component, event-driven)

**Analog:** `src/components/sections/SolutionsGridSection.tsx` (lines 72–95 — whileInView grid stagger) + `src/components/ui/FeatureCheckList.tsx` (lines 44–68 — scale+opacity entry)

**Scale+opacity stagger pattern for badges** (FeatureCheckList lines 44–68):
```typescript
<motion.span
  key={cellIndex}
  initial={{ scale: 0, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  viewport={{ once: true }}
  transition={{
    delay: rowIndex * 0.15 + cellIndex * 0.05,
    type: "spring",
    stiffness: 400,
    damping: 25,
  }}
>
```

**Key rules from analog:**
- `"use client"` at top
- `initial={{ opacity: 0, scale: 0.9 }}` for tech badge entry (slightly less aggressive than `scale: 0`)
- `whileInView` + `viewport={{ once: true }}` — no container ref needed
- `delay: categoryStartDelay + i * 0.06` per D-16 (60ms per logo, offset per category)
- Badge styling: `flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm font-medium` — matches existing badge patterns in `SolutionTile.tsx`

---

### Service section components: `src/components/sections/service/*.tsx`

**10 components:** `ServiceHero`, `ServicePainPoints`, `ServiceOutcomeCards`, `ServiceProcess`, `ServiceIndustries`, `ServiceRelatedSolutions`, `ServiceCaseStudy`, `ServiceTestimonials`, `ServiceFaq`, `ServiceCta`

**Primary analog for all:** Section structure from `src/components/sections/CTASection.tsx` + `TestimonialsSection.tsx` + `CaseStudiesPreview.tsx`

**Section wrapper pattern** (CTASection.tsx lines 6–63):
```typescript
"use client"  // ONLY on animated sections — Server Component sections omit this

import { motion } from "motion/react"

export function CTASection() {
  return (
    <motion.section
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
```

**Section header pattern** (ServicesTabSection.tsx lines 200–217):
```typescript
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="mb-10"
>
  <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
    What We Build
  </p>
  <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
    Everything Your Business Needs, Built Right
  </h2>
```

**Testimonial card pattern** (TestimonialsSection.tsx lines 149–186 — supporting cards):
```typescript
<motion.div
  key={t.id}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
  className="flex flex-col gap-4 rounded-xl p-6"
  style={{
    background: "hsl(0 0% 100% / 4%)",
    border: "1px solid hsl(0 0% 100% / 8%)",
    backdropFilter: "blur(8px)",
  }}
>
  <StarRow rating={t.rating} />
  <blockquote className="text-sm text-white/75 leading-relaxed flex-1">
    &ldquo;{t.quote}&rdquo;
  </blockquote>
  <div className="flex items-center gap-3 pt-2 border-t border-white/8">
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)]
      flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
      {t.name.charAt(0)}
    </div>
```

**Case study card pattern** (CaseStudiesPreview.tsx lines 57–80):
```typescript
{CASE_STUDIES.map((study, index) => (
  <motion.div
    key={study.id}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2, duration: 0.5, ease: "easeOut" }}
  >
    <CaseStudyPreviewCard ... />
  </motion.div>
))}
```

**Cross-link tile pattern** (ServiceCard.tsx lines 13–56 for ServiceIndustries / ServiceRelatedSolutions):
```typescript
<Link
  href={`/services/${parentSlug}/${slug}`}
  className={cn(
    "group relative flex flex-col gap-4 p-5 rounded-xl bg-card overflow-hidden",
    "border border-border",
    "hover:border-[var(--brand-primary)] hover:-translate-y-1",
    "hover:shadow-[0_8px_30px_hsl(217_91%_60%/18%)]",
    "transition-all duration-250",
  )}
>
```

**`"use client"` rules for service sections:**
- `ServiceHero` — Server Component (contains `AnimatedRingStat` client leaf as child)
- `ServicePainPoints` — Server Component
- `ServiceOutcomeCards` — Server Component (contains `StaggeredRevealGrid` client leaf)
- `ServiceProcess` — Server Component (contains `SequentialSteps` client leaf)
- `ServiceIndustries` — Server Component
- `ServiceRelatedSolutions` — Server Component
- `ServiceCaseStudy` — Server Component
- `ServiceTestimonials` — Server Component (testimonial cards use inline `motion.div` — needs `"use client"`)
- `ServiceFaq` — Server Component (static list)
- `ServiceCta` — Server Component (or `"use client"` if using motion — copy CTASection pattern)

---

### Solution section components: `src/components/sections/solution/*.tsx`

**8 components:** `SolutionHero`, `SolutionProblem`, `SolutionFeatures`, `SolutionIndustries`, `SolutionRelatedServices`, `SolutionCaseStudy`, `SolutionTestimonials`, `SolutionCta`

**Analog:** Same section patterns as service sections. `SolutionHero` is simpler — no ring stat. Use CTASection pattern for `SolutionCta`. Use SolutionsGridSection stagger for `SolutionFeatures` cards (D-17: base animation set only, 80ms stagger).

**Solution page stagger (D-17):**
```typescript
// SolutionsGridSection.tsx lines 76–86 — base stagger:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ delay: (colIndex + rowIndex) * 0.05, duration: 0.35, ease: "easeOut" }}
>
```

---

### `app/services/[category]/[slug]/page.tsx` (route, request-response)

**Analog:** `src/app/page.tsx` (async Server Component + API fetch)

**Async Server Component + data fetch pattern** (page.tsx lines 1–28):
```typescript
import { fetchSettings } from "@/lib/api"
// ...section imports

export default async function HomePage() {
  const settings = await fetchSettings()
  return (
    <>
      <HeroSection />
      <StatsBarSection settings={settings} />
```

**generateStaticParams pattern (Next.js 15):** No existing dynamic routes in the codebase — use RESEARCH.md Pattern 1 as the authoritative source. Critical rule: `params` is `Promise<{ category: string; slug: string }>` in Next.js 15 — must `await params`.

**Apply to service detail page:**
```typescript
import { allServices } from '@/data/services'
import { fetchTestimonials, fetchCaseStudies } from '@/lib/api'
import type { ServicePageData } from '@/types/service-page'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allServices.map((s) => ({ category: s.categorySlug, slug: s.slug }))
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params   // Next.js 15: params is async
  const service = allServices.find((s) => s.categorySlug === category && s.slug === slug)
  if (!service) notFound()

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

---

### `app/solutions/[slug]/page.tsx` (route, request-response)

**Analog:** Same `page.tsx` pattern. Single `[slug]` param. `generateStaticParams` returns 18 slug objects. `params: Promise<{ slug: string }>`.

---

### `src/lib/api.ts` (extend — utility, request-response)

**Analog:** `src/lib/api.ts` itself — `fetchNavItems` / `fetchFooterLinks` / `fetchSettings` pattern (lines 78–94)

**Typed fetch helper pattern** (lines 78–94):
```typescript
export async function fetchNavItems(): Promise<NavItem[]> {
  return fetchFromApi<NavItem[]>('/api/nav-items', {
    next: { tags: ['nav-items'] },
  } as RequestInit).catch(() => [])
}

export async function fetchSettings(): Promise<Settings> {
  return fetchFromApi<Settings>('/api/settings', {
    next: { tags: ['settings'] },
  } as RequestInit).catch(() => SETTINGS_FALLBACK)
}
```

**Key rules from analog:**
- Return type is the typed interface, not `Promise<unknown>`
- `.catch(() => [])` fallback for array returns; `.catch(() => FALLBACK)` for object returns
- `next: { tags: [...] }` cache tag always set — enables ISR invalidation
- `as RequestInit` cast needed because Next.js extends `RequestInit` with `next` property

**New helpers to add:**
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
// Same pattern for fetchCaseStudies → /api/case-studies
```

---

### `database/migrations/*_add_solution_slug_to_testimonials_and_case_studies.php` (migration)

**Analog:** `database/migrations/2026_01_01_000014_create_testimonials_table.php` (lines 1–33)

**Migration class pattern** (full file):
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('testimonials', function (Blueprint $table) {
            $table->id();
            $table->json('service_tags')->nullable();
            $table->json('industry_tags')->nullable();
            // ...
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('testimonials');
    }
};
```

**Apply to add_solution_slug migration:** Use `Schema::table()` (not `Schema::create()`) since tables already exist. Add `$table->string('solution_slug')->nullable()->after('industry_tags')` to both `testimonials` and `case_studies`. `down()` uses `$table->dropColumn('solution_slug')` on both.

**CRITICAL — do not add `service_category` or `industry_category` columns.** The existing `service_tags` (JSON) and `industry_tags` (JSON) already cover these. Only `solution_slug` is missing.

---

### `database/seeders/CaseStudySeeder.php` (seeder, CRUD)

**Analog:** `database/seeders/SettingsSeeder.php` (lines 1–51 — array-of-arrays + loop create pattern)

**Seeder pattern** (SettingsSeeder.php lines 1–51):
```php
<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'company_name', 'value' => 'Buildera', 'group' => 'company'],
            // ...
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'group' => $setting['group']]
            );
        }
    }
}
```

**Key rules from analog:**
- No `use WithoutModelEvents` in SettingsSeeder — but `DatabaseSeeder` has it. New seeders MUST use `WithoutModelEvents` trait (from RESEARCH.md Pitfall 6) to prevent observer side effects during seeding.
- Use `CaseStudy::create($data)` (not `updateOrCreate` — seeder runs once, not idempotent needed, but `firstOrCreate` is safer per RESEARCH.md Pitfall 6)
- `service_tags` and `industry_tags` must be `json_encode([...])` — matching existing column type (JSON)
- `solution_slug` is a plain string — no `json_encode`
- `is_published => true` and `published_at => now()->subMonths(N)` required — matches `is_published` enforcement rule from CLAUDE.md

**CaseStudySeeder column names (from actual schema `2026_01_01_000012_create_case_studies_table.php`):**
- `title`, `slug` (unique), `client_name`, `industry`, `challenge`, `solution`, `results`
- `service_tags` (JSON nullable), `industry_tags` (JSON nullable)
- `solution_slug` (string nullable — added by Phase 4 migration)
- `is_featured`, `is_published`, `published_at`
- `featured_image` (nullable — use null, no real images per D-11)
- `featured_image_alt` (nullable — use descriptive alt text per D-11)

---

### `database/seeders/TestimonialSeeder.php` (seeder, CRUD)

**Analog:** Same as `CaseStudySeeder` — `SettingsSeeder.php` array-loop pattern.

**Testimonial column names (from actual schema `2026_01_01_000014_create_testimonials_table.php`):**
- `client_name`, `client_title` (nullable), `client_company` (nullable), `client_photo` (nullable)
- `content`, `rating` (tinyInteger, default 5)
- `service_tags` (JSON nullable), `industry_tags` (JSON nullable)
- `solution_slug` (string nullable — added by Phase 4 migration)
- `is_featured`, `is_published`, `sort_order`

---

### `app/Http/Controllers/Api/TestimonialController.php` (extend — controller, request-response)

**Analog:** `app/Http/Controllers/Api/TestimonialController.php` itself (lines 1–26 — existing `?service=` + `?industry=` filter pattern)

**Existing filter pattern** (lines 12–23):
```php
public function index(): JsonResponse
{
    $query = Testimonial::published()->orderByDesc('sort_order');

    if (request()->has('service')) {
        $service = request('service');
        $query->whereJsonContains('service_tags', $service);
    }

    if (request()->has('industry')) {
        $industry = request('industry');
        $query->whereJsonContains('industry_tags', $industry);
    }

    return response()->json($query->get());
}
```

**New `?solution=` filter to add** (copy exactly this pattern):
```php
if (request()->has('solution')) {
    $query->where('solution_slug', request('solution'));
}
```

Add this block after the `industry` filter block. `solution_slug` is a plain string column (not JSON), so use `->where()` not `->whereJsonContains()`.

---

### `app/Http/Controllers/Api/CaseStudyController.php` (extend — controller, request-response)

**Analog:** `app/Http/Controllers/Api/CaseStudyController.php` itself (lines 1–27) + `TestimonialController.php` for the `whereJsonContains` pattern

**Current index method** (lines 9–17):
```php
public function index(): JsonResponse
{
    $query = CaseStudy::published()->latest('published_at');

    if (request()->has('industry')) {
        $query->where('industry', request('industry'));
    }

    return response()->json($query->get());
}
```

**New filters to add** (after existing `industry` filter):
```php
if (request()->has('service')) {
    $query->whereJsonContains('service_tags', request('service'));
}

if (request()->has('solution')) {
    $query->where('solution_slug', request('solution'));
}
```

`service_tags` is JSON (use `whereJsonContains`). `solution_slug` is a plain string column (use `where`).

---

## Shared Patterns

### Motion Import Path
**Source:** All existing animated components (`AnimatedRingStat.tsx` line 3, `AnimatedCounter.tsx` line 11, `FeatureCheckList.tsx` line 3)
**Apply to:** All `"use client"` animated components in Phase 4
```typescript
import { motion, useInView, useReducedMotion, useMotionValue, useSpring, useTransform } from "motion/react"
// NOT: import from "framer-motion"
```

### cn() Import
**Source:** `src/lib/utils.ts` line 1, `src/components/ui/ServiceCard.tsx` line 2, `src/components/ui/FeatureCheckList.tsx` line 5
**Apply to:** All components using conditional class composition
```typescript
import { cn } from "@/lib/utils"
```

### Section Container
**Source:** `src/components/sections/ServicesTabSection.tsx` lines 198–200, `SolutionsGridSection.tsx` lines 49–51
**Apply to:** All new section components
```typescript
<section className="py-16 lg:py-24 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Header (eyebrow + h2 + description)
**Source:** `src/components/sections/ServicesTabSection.tsx` lines 200–217
**Apply to:** All new section components that have a heading
```typescript
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="mb-10"
>
  <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
    {eyebrow}
  </p>
  <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">{headline}</h2>
</motion.div>
```

### Hover Card Effect
**Source:** `src/components/ui/ServiceCard.tsx` lines 17–23
**Apply to:** ServiceOutcomeCards, TechShowcase badges, all card grids
```typescript
className={cn(
  "group relative flex flex-col gap-4 p-5 rounded-xl bg-card border border-border",
  "hover:border-[var(--brand-primary)] hover:-translate-y-1",
  "hover:shadow-[0_8px_30px_hsl(217_91%_60%/18%)]",
  "transition-all duration-250",
)}
```

### Brand Gradient Background (CTA sections)
**Source:** `src/components/sections/CTASection.tsx` lines 9–12
**Apply to:** `ServiceCta`, `SolutionCta`
```typescript
style={{ background: "linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))" }}
```

### Published Filter (Laravel controllers)
**Source:** `app/Http/Controllers/Api/TestimonialController.php` line 13, `CaseStudyController.php` line 13
**Apply to:** All API queries in extended controllers
```php
$query = Model::published()->...;   // uses the published() scope — never filter manually
```

### is_published Enforcement (Seeders)
**Source:** CLAUDE.md + existing `CaseStudy` migration — `is_published` + `published_at` required
**Apply to:** All CaseStudySeeder and TestimonialSeeder records
```php
'is_published' => true,
'published_at' => now()->subMonths(3),
```

### WithoutModelEvents Trait (Seeders)
**Source:** `database/seeders/DatabaseSeeder.php` line 8 (`use WithoutModelEvents`)
**Apply to:** `CaseStudySeeder`, `TestimonialSeeder`
```php
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CaseStudySeeder extends Seeder
{
    use WithoutModelEvents;
```

---

## No Analog Found

All files have close analogs in the codebase. No files require falling back to RESEARCH.md patterns exclusively.

However, three patterns have **no existing codebase analog** and must use RESEARCH.md patterns as primary reference:

| File | Role | Reason |
|---|---|---|
| `app/services/[category]/[slug]/page.tsx` — `generateStaticParams` for nested route | route | No nested dynamic routes exist yet; use RESEARCH.md Pattern 1 exactly |
| `src/components/ui/SequentialSteps.tsx` — connector line SVG draw | component | No existing SVG connector animation in codebase; `scaleY: 0→1` pattern must follow RESEARCH.md Animation 3 |
| `src/components/ui/AnimatedRingStat.tsx` — count-up center number | component | Existing `AnimatedRingStat` uses static SVG `<text>` not a count-up; use `AnimatedCounter.tsx` pattern for the motion value counter |

---

## Metadata

**Analog search scope:** `buildera-frontend/src/`, `buildera-backend/app/Http/Controllers/Api/`, `buildera-backend/database/migrations/`, `buildera-backend/database/seeders/`
**Files scanned:** 38
**Pattern extraction date:** 2026-05-27
