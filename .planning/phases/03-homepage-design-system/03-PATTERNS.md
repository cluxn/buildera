# Phase 3: Homepage & Design System — Pattern Map

**Mapped:** 2026-05-27
**Files analyzed:** 22 new files + 3 modified files
**Analogs found:** 6 / 25 (codebase is sparse — all analogs from the 6 existing files; remainder use spec-defined patterns)

---

## Codebase State Note

The `buildera-frontend` codebase contains exactly 6 source files with reusable patterns:
- `src/app/globals.css` — Tailwind 4 `@theme inline` block + `:root` CSS token structure
- `src/app/layout.tsx` — `next/font/google` Inter setup + `html`/`body` wrapper pattern
- `src/lib/api.ts` — `fetchFromApi<T>()` generic fetch stub + `ApiError` class
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/components/ui/button.tsx` — shadcn base-nova pattern: `@base-ui/react` primitive + `cva()` variants + `cn()`
- `src/app/api/revalidate/route.ts` — Next.js API route pattern + HMAC auth + typed request/response

All 22 new components have no direct existing analog in the codebase. Pattern assignments reference the closest file by role, then fall back to spec-verified patterns from `03-RESEARCH.md` and `03-UI-SPEC.md`.

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/app/globals.css` | config | — | `src/app/globals.css` (self — extend) | exact |
| `src/app/layout.tsx` | config | — | `src/app/layout.tsx` (self — extend) | exact |
| `src/lib/api.ts` | utility | request-response | `src/lib/api.ts` (self — extend) | exact |
| `src/components/layout/SiteNav.tsx` | component (Server shell) | request-response (SSG) | `src/app/layout.tsx` | role-partial |
| `src/components/layout/SiteNavClient.tsx` | component (Client) | event-driven | `src/app/error.tsx` (`"use client"` pattern) | role-partial |
| `src/components/layout/MegaDropdown.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-partial |
| `src/components/layout/MobileNavDrawer.tsx` | component (Client) | event-driven | `src/app/error.tsx` (`"use client"` pattern) | role-partial |
| `src/components/layout/SiteFooter.tsx` | component (Server) | request-response (SSG) | `src/app/layout.tsx` | role-partial |
| `src/app/page.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/sections/HeroSection.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/sections/HeroHeadline.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-match |
| `src/components/sections/StatsBadgeStrip.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/sections/StatsBarSection.tsx` | component (Server shell) | request-response (SSG) | `src/app/layout.tsx` | role-partial |
| `src/components/ui/AnimatedCounter.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/sections/ServicesTabSection.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/ui/ServiceCard.tsx` | component (Server) | transform | `src/components/ui/button.tsx` | role-partial |
| `src/components/sections/SolutionsGridSection.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/ui/SolutionTile.tsx` | component (Server) | transform | `src/components/ui/button.tsx` | role-partial |
| `src/components/sections/ClientLogosMarquee.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/sections/WhyBuilderaSection.tsx` | component (Server shell) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/ui/AnimatedRingStat.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/ui/FeatureCheckList.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/ui/MiniMetricsCard.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/ui/AnimatedBarChart.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/sections/TestimonialsSection.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/ui/TestimonialCard.tsx` | component (Server) | transform | `src/components/ui/button.tsx` | role-partial |
| `src/components/sections/CaseStudiesPreview.tsx` | component (Server shell) | transform | `src/app/not-found.tsx` | role-match |
| `src/components/ui/CaseStudyPreviewCard.tsx` | component (Client) | event-driven | `src/app/error.tsx` | role-partial |
| `src/components/sections/CTASection.tsx` | component (Server) | transform | `src/app/not-found.tsx` | role-match |

---

## Shared Patterns

These cross-cutting patterns apply to ALL files in Phase 3. Read this section first before any per-file section.

### SP-1: Import Path Alias (`@/`)

**Source:** `src/components/ui/button.tsx` line 3, `src/app/layout.tsx` line 3
**Apply to:** Every new `.tsx` and `.ts` file

```typescript
// Always use @/ alias — never relative paths like ../../lib/utils
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"
```

The `@/` alias maps to `src/`. Confirmed active in `tsconfig.json` (standard Next.js 15 App Router scaffold).

---

### SP-2: `cn()` for All Class Composition

**Source:** `src/lib/utils.ts` lines 1-6, consumed in `src/components/ui/button.tsx` line 3
**Apply to:** Every component that constructs className strings conditionally

```typescript
import { cn } from "@/lib/utils"

// Correct — handles Tailwind class conflicts via tailwind-merge
className={cn("base-class", condition && "conditional-class", className)}

// Never do string concatenation or template literals for class composition
```

---

### SP-3: `"use client"` Boundary — Declaration and Import Rules

**Source:** `src/app/error.tsx` line 1 (the one existing `"use client"` file)
**Apply to:** `SiteNavClient`, `MobileNavDrawer`, `HeroHeadline`, `AnimatedCounter`, `ServicesTabSection`, `AnimatedRingStat`, `FeatureCheckList`, `MiniMetricsCard`, `AnimatedBarChart`, `CaseStudyPreviewCard`

```typescript
// ALWAYS the very first line — before any imports
"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "motion/react"
```

**Critical rules extracted from RESEARCH.md Pitfalls 3 and 4:**
- Never import `src/lib/api.ts` fetch helpers inside a `"use client"` component
- `motion.div` with static props (`initial`, `whileInView`, `viewport`, `transition`) does NOT require `"use client"` — only hooks do
- Server Component shells pass fetched data down as props to client children

---

### SP-4: motion Import Path

**Source:** `next.config.ts` line 14 (`optimizePackageImports: ["motion"]`), CLAUDE.md
**Apply to:** Every component using animation

```typescript
// CORRECT — always this import path
import { motion, AnimatePresence } from "motion/react"
import { useMotionValue, useSpring, useTransform, useInView, useReducedMotion } from "motion/react"

// NEVER use this — even though framer-motion is in node_modules as a transitive dep
// import { motion } from "framer-motion"  ← WRONG
```

---

### SP-5: Tabler Icons — Never Lucide

**Source:** `next.config.ts` line 14 (`optimizePackageImports: ["@tabler/icons-react"]`), CLAUDE.md
**Apply to:** Every component using icons

```typescript
// CORRECT
import { IconWorldWww, IconCloud, IconCode, IconChevronDown, IconX, IconMenu2 } from "@tabler/icons-react"

// NEVER — even after shadcn install auto-imports it
// import { ChevronDown } from "lucide-react"  ← WRONG
```

Icon equivalents for shadcn auto-imports (RESEARCH.md Pitfall 5):
- `ChevronDown` → `IconChevronDown`
- `X` → `IconX`
- `Menu` → `IconMenu2`
- `Check` → `IconCheck`
- `Star` → `IconStar`

---

### SP-6: Brand Token Consumption — Arbitrary Value Syntax

**Source:** RESEARCH.md Pitfall 8, `03-CONTEXT.md` D-08
**Apply to:** Every component referencing brand colors

```typescript
// CORRECT — brand tokens are in :root, not @theme, so no utility class shorthand
className="bg-[var(--brand-primary)] text-white"
className="border-[var(--brand-glass)]"
className="bg-[var(--brand-surface)]"

// WRONG — these utility classes do not exist (tokens not in @theme)
// className="bg-brand-primary"  ← WRONG
```

The one exception: `--primary` is already in `:root` AND mapped through shadcn's `--color-primary` in `@theme inline`, so `bg-primary` works for the shadcn primary. Brand tokens (`--brand-*`) only work via `var()` arbitrary values.

---

### SP-7: Scroll-Triggered Reveal — Base Pattern

**Source:** `03-UI-SPEC.md` Animation Contract, `03-RESEARCH.md` Code Examples (Scroll-Triggered Section Reveal)
**Apply to:** All Server Component sections and Server Component card grids

```tsx
// Works in Server Components — static props only, no hooks
import { motion } from "motion/react"

// Base reveal on any section wrapper or card
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {children}
</motion.div>

// Grid stagger — add per-card delay
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
>
```

---

### SP-8: fetchFromApi Pattern — Typed Helpers with Fallback

**Source:** `src/lib/api.ts` lines 1-20 (the only fetch infrastructure)
**Apply to:** `fetchNavItems()`, `fetchFooterLinks()`, `fetchSettings()` — all new helpers in `api.ts`

```typescript
// Pattern: wrap fetchFromApi<T> with typed return + ISR cache tag + .catch fallback
// fetchFromApi<T> signature: (path: string, options?: RequestInit) => Promise<T>

export async function fetchNavItems(): Promise<NavItem[]> {
  return fetchFromApi<NavItem[]>('/api/nav-items', {
    next: { tags: ['nav-items'] }
  }).catch(() => [])
  // .catch(() => fallback) is REQUIRED — API is not available at dev build time
}
```

The `options` parameter accepts `RequestInit` which in Next.js 15 is extended with `{ next: { tags: string[] } }` for ISR cache tagging.

---

### SP-9: Glassmorphism Utility Classes

**Source:** `03-UI-SPEC.md` Glassmorphism Utility Contract, `03-CONTEXT.md` D-10
**Apply to:** `SiteNavClient` (scroll-triggered), `TestimonialCard`, stat cards, hero badge strip

```css
/* Two distinct glass styles — do not mix them up */

/* Card glass (for testimonial cards, stat cards, badge strip): */
/* class="glass-card" — defined as @utility in globals.css */
background: var(--brand-glass);          /* hsl(217 91% 60% / 8%) */
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid hsl(217 91% 60% / 15%);
border-radius: var(--radius-lg);

/* Nav glass (scroll-triggered, distinct): */
/* class="glass-nav" — defined as @utility in globals.css */
background: hsl(0 0% 100% / 80%);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-bottom: 1px solid var(--brand-glass);
```

Both `-webkit-backdrop-filter` and `backdrop-filter` are required for Safari compatibility (RESEARCH.md State of the Art).

---

### SP-10: Section Layout Shell Pattern

**Source:** `src/app/not-found.tsx` lines 4-8, typography from `03-UI-SPEC.md`
**Apply to:** All section components

```tsx
// Section shell structure used by not-found.tsx as the simplest existing page-level component
// Adapt for homepage sections:

export default function SectionName() {
  return (
    <section className="py-16 lg:py-24 bg-background">       {/* or bg-[var(--brand-surface)] per D-12 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Eyebrow label */}
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
          Eyebrow Text
        </p>
        {/* Section H2 */}
        <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
          Section Heading
        </h2>
        {/* Content */}
      </div>
    </section>
  )
}
```

---

## Pattern Assignments

### 1. `src/app/globals.css` (config, extend existing)

**Analog:** `src/app/globals.css` (self — lines 1-130 are the base to extend)

**What exists (lines 1-49) — `@theme inline` block:**
```css
@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-sans);    /* ← LINE 10: THE BUG — self-referential */
  --font-mono: var(--font-geist-mono);
  --font-heading: var(--font-sans);
  /* ... shadcn color mappings ... */
  --radius-lg: var(--radius);
}
```

**Fix required on line 10 (03-01 blocker per RESEARCH.md Pitfall 2):**
```css
/* BEFORE (broken): */
--font-sans: var(--font-sans);

/* AFTER (correct): */
--font-sans: var(--font-inter);
/* --font-inter is injected by next/font via className={inter.variable} on <html> in layout.tsx */
```

**What exists (lines 51-84) — `:root` block to extend AFTER line 84:**
```css
:root {
  /* existing shadcn tokens end at line 84 */
  --radius: 0.625rem;
  --sidebar-ring: oklch(0.708 0 0);
  /* ADD BELOW: 7 brand tokens per D-08 */
}
```

**Brand tokens to add to `:root` (after existing shadcn tokens, before closing `}`):**
```css
/* Brand tokens — Phase 3+ (D-08) */
--brand-primary: hsl(217 91% 60%);
--brand-primary-dark: hsl(217 91% 45%);
--brand-primary-light: hsl(217 91% 75%);
--brand-gradient-from: hsl(217 91% 60%);
--brand-gradient-to: hsl(242 75% 40%);
--brand-surface: hsl(217 60% 97%);
--brand-glass: hsl(217 91% 60% / 8%);
```

**Dark mode tokens to add inside `.dark {}` block (lines 86-118), after existing dark tokens:**
```css
/* Brand tokens dark mode (D-09) */
--brand-primary: hsl(217 91% 65%);
--brand-primary-dark: hsl(217 91% 55%);
--brand-primary-light: hsl(217 91% 80%);
--brand-surface: hsl(217 30% 12%);
--brand-glass: hsl(217 91% 65% / 12%);
/* --brand-gradient-from and --brand-gradient-to unchanged in dark mode */
```

**New `@utility` blocks to add AFTER the `@layer base` block (after line 130):**
```css
/* Glassmorphism utilities (D-10) */
@utility glass-card {
  background: var(--brand-glass);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid hsl(217 91% 60% / 15%);
  border-radius: var(--radius-lg);
}

@utility glass-nav {
  background: hsl(0 0% 100% / 80%);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--brand-glass);
}

/* Hero orb animations (D-02) */
@keyframes orb-float {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(20px, -30px) scale(1.05); }
}

.hero-orb-1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, hsl(217 91% 60% / 40%), transparent 70%);
  filter: blur(80px);
  position: absolute; top: -100px; right: -100px;
  animation: orb-float 8s ease-in-out infinite alternate;
  pointer-events: none; z-index: 0;
}

.hero-orb-2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, hsl(242 75% 40% / 35%), transparent 70%);
  filter: blur(100px);
  position: absolute; bottom: -80px; left: -80px;
  animation: orb-float 10s ease-in-out infinite alternate-reverse;
  pointer-events: none; z-index: 0;
}

/* Hero SVG illustration animation (D-06) */
@keyframes svg-pulse {
  0%   { transform: translateY(0px); }
  100% { transform: translateY(-12px); }
}
.hero-illustration {
  animation: svg-pulse 6s ease-in-out infinite alternate;
}

/* Client logos marquee (D-23) */
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.logo-item {
  filter: grayscale(100%) opacity(0.6);
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.logo-item:hover {
  filter: grayscale(0%) opacity(1);
}

/* Bottom CTA gradient pulse (HOME-07) */
@keyframes gradient-pulse {
  0%, 100% { opacity: 0.85; }
  50%       { opacity: 1; }
}

/* CTA button shimmer (HOME-07) */
.cta-button-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: none;
  pointer-events: none;
}

.cta-button-shimmer:hover::after {
  transform: translateX(100%);
  transition: transform 0.5s ease;
}
```

---

### 2. `src/app/layout.tsx` (config, extend existing)

**Analog:** `src/app/layout.tsx` lines 1-27 (self)

**Current file (lines 1-27) — keep everything, add two items:**
```tsx
// Existing — keep unchanged:
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
// <html lang="en" className={inter.variable}>   ← this is correct; inter.variable = "--font-inter"
```

**Add to layout.tsx (two additions):**
1. Import and render `SiteNav` before `{children}`
2. Import and render `SiteFooter` after `{children}`
3. Add `<a href="#main-content">` skip link before `SiteNav` (NAV-08)
4. Add `id="main-content"` to the `<main>` wrapper around `{children}`

```tsx
// After existing imports, add:
import { SiteNav } from "@/components/layout/SiteNav"
import { SiteFooter } from "@/components/layout/SiteFooter"

// Body becomes:
<body className="antialiased">
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-[var(--brand-primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
  >
    Skip to content
  </a>
  <SiteNav />
  <main id="main-content">{children}</main>
  <SiteFooter />
</body>
```

---

### 3. `src/lib/api.ts` (utility, request-response — extend existing)

**Analog:** `src/lib/api.ts` lines 1-20 (self — the `fetchFromApi<T>` pattern to extend)

**Existing pattern to copy for all new helpers (lines 11-20):**
```typescript
// Existing fetchFromApi signature — all new helpers delegate to this:
export async function fetchFromApi<T>(
  path: string,
  options?: RequestInit,   // RequestInit is extended by Next.js with { next: { tags: [] } }
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);
  if (!res.ok) {
    throw new ApiError(res.status, res.statusText);  // ApiError defined lines 1-9
  }
  return res.json() as Promise<T>;
}
```

**New type definitions to add (prepend before new helpers):**
```typescript
export interface NavItem {
  id: number
  label: string
  url: string
  group: 'solutions' | 'work' | 'resources'
  display_order: number
}

export interface FooterLink {
  id: number
  label: string
  url: string
  column: 'services' | 'solutions' | 'company' | 'resources'
  display_order: number
}

export interface Settings {
  company_name: string
  email: string
  phone: string
  address: string
  calendly_url: string
  whatsapp_number: string
  whatsapp_enabled: boolean
  linkedin_url: string
  instagram_url: string
  twitter_url: string
  footer_tagline: string
  stat_projects: string
  stat_clients: string
  stat_years: string
  stat_satisfaction: string
}

const SETTINGS_FALLBACK: Settings = {
  company_name: 'Buildera',
  email: 'info@buildera.co',
  phone: '+91 82994 06767',
  address: '117/Q/457/10A Indrapuri Sharda Nagar, Kanpur 208025',
  calendly_url: '',
  whatsapp_number: '+918299406767',
  whatsapp_enabled: false,
  linkedin_url: '',
  instagram_url: '',
  twitter_url: '',
  footer_tagline: 'Building technology that grows businesses.',
  stat_projects: '150',
  stat_clients: '50',
  stat_years: '6',
  stat_satisfaction: '98',
}
```

**New helper functions to append (each follows the same .catch(() => fallback) pattern):**
```typescript
export async function fetchNavItems(): Promise<NavItem[]> {
  return fetchFromApi<NavItem[]>('/api/nav-items', {
    next: { tags: ['nav-items'] }
  }).catch(() => [])
}

export async function fetchFooterLinks(): Promise<FooterLink[]> {
  return fetchFromApi<FooterLink[]>('/api/footer-links', {
    next: { tags: ['footer-links'] }
  }).catch(() => [])
}

export async function fetchSettings(): Promise<Settings> {
  return fetchFromApi<Settings>('/api/settings', {
    next: { tags: ['settings'] }
  }).catch(() => SETTINGS_FALLBACK)
}
```

---

### 4. `src/components/layout/SiteNav.tsx` (Server Component shell, request-response SSG)

**Analog:** `src/app/layout.tsx` (closest existing Server Component that wraps child components)

**Server shell pattern (from layout.tsx lines 17-27):**
```tsx
// Server Component — no "use client", no hooks, no browser APIs
// Fetches data at build time and passes to client children as props
import { fetchNavItems } from "@/lib/api"
import { SiteNavClient } from "./SiteNavClient"

// Hardcoded menu (D-17 — never from API)
const SERVICES_MENU = [
  { category: "Website Development", icon: "IconWorldWww", slug: "website-development",
    subServices: ["Custom Websites", "E-Commerce", "App Development", "PWA"] },
  { category: "Salesforce Development", icon: "IconCloud", slug: "salesforce-development",
    subServices: ["CRM", "Marketing Cloud", "Service Cloud", "Commerce Cloud", "Experience Cloud"] },
  { category: "DevOps Development", icon: "IconSettings", slug: "devops-development",
    subServices: ["Cloud Infrastructure", "CI/CD Pipeline", "Cloud Mgmt", "Server Monitoring"] },
  { category: "AI Agent Development", icon: "IconRobot", slug: "ai-agent-development",
    subServices: ["AI Agent Dev", "Custom API Integration", "Business Optimization", "AI Chatbots"] },
  { category: "Software Development", icon: "IconCode", slug: "software-development",
    subServices: ["ERP", "CRM Dev", "SaaS", "MVP Development"] },
  { category: "Hire a Developer", icon: "IconUsers", slug: "hire-a-developer",
    subServices: ["Dedicated Teams", "Flexible Engagement", "End-to-End Support"] },
] as const

export async function SiteNav() {
  const navItems = await fetchNavItems()   // SSG fetch; fallback = [] on API failure
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <SiteNavClient servicesMenu={SERVICES_MENU} navItems={navItems} />
    </header>
  )
}
```

**Key constraint:** `SiteNav` is `async` (Server Component) and calls `fetchNavItems()` directly. The client scroll/hover behavior is split into `SiteNavClient`.

---

### 5. `src/components/layout/SiteNavClient.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (the only existing `"use client"` component)

**`"use client"` + scroll listener pattern (from error.tsx structure + D-15 spec):**
```tsx
"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
// NEVER import fetchNavItems here — data comes via props from SiteNav.tsx (Server shell)

interface Props {
  servicesMenu: typeof SERVICES_MENU  // typed const passed from server shell
  navItems: NavItem[]
}

export function SiteNavClient({ servicesMenu, navItems }: Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "w-full transition-all duration-300",
        isScrolled ? "glass-nav" : "bg-transparent"
        // glass-nav utility defined in globals.css (SP-9)
      )}
    >
      {/* nav content */}
    </nav>
  )
}
```

**Dropdown hover pattern (D-13 — 150ms open delay):**
```tsx
// Use CSS hover delay, not JS timeout, for 150ms open delay
// On the trigger button:
onMouseEnter={() => setActiveDropdown(item.id)}
onMouseLeave={() => setActiveDropdown(null)}

// On the dropdown panel container:
style={{ transitionDelay: isOpen ? '150ms' : '0ms' }}
```

---

### 6. `src/components/layout/MobileNavDrawer.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` pattern with state)

**Full-screen overlay pattern (D-16):**
```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { IconX, IconChevronDown } from "@tabler/icons-react"  // NOT lucide-react
import { cn } from "@/lib/utils"

export function MobileNavDrawer({ isOpen, onClose, servicesMenu, navItems }: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          {/* Drawer — slides from right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-background z-50 flex flex-col"
          >
            {/* Header: X left, Logo right */}
            {/* Accordion groups */}
            {/* Pinned CTA at bottom */}
            <div className="mt-auto p-4 border-t border-border">
              <a
                href="/book-a-call"
                className="block w-full text-center bg-[var(--brand-primary)] text-white py-3 rounded-lg font-medium min-h-[48px]"
              >
                Book a Free Call
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

---

### 7. `src/components/layout/SiteFooter.tsx` (Server Component, request-response SSG)

**Analog:** `src/app/layout.tsx` (Server Component data fetch pattern)

**Server Component with two fetches pattern:**
```tsx
// Server Component — async, two parallel fetches
import { fetchFooterLinks, fetchSettings } from "@/lib/api"
import { IconBrandLinkedin, IconBrandTwitter, IconBrandInstagram } from "@tabler/icons-react"

export async function SiteFooter() {
  // Parallel fetches — both resolve before render
  const [footerLinks, settings] = await Promise.all([
    fetchFooterLinks(),   // fallback: [] — hardcoded links used
    fetchSettings(),      // fallback: SETTINGS_FALLBACK — hardcoded contact info used
  ])

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        {/* Multi-column grid */}
        {/* Social icons from settings.linkedin_url etc. */}
        {/* Newsletter strip */}
        {/* Legal + attribution */}
        <p className="text-xs text-slate-500">
          Developed and managed by{" "}
          <a href="https://buildera.co" rel="nofollow" className="hover:text-white transition-colors">
            Buildera Technologies LLP
          </a>
        </p>
      </div>
    </footer>
  )
}
```

**`Promise.all` pattern** — avoids waterfall; both fetches run in parallel. Both have `.catch()` fallbacks so the footer never crashes.

---

### 8. `src/app/page.tsx` (Server Component, transform — full replacement)

**Analog:** `src/app/not-found.tsx` (simplest existing Server Component page)

**Homepage composition pattern:**
```tsx
// Full replacement of the Next.js default page.tsx
// Server Component — no "use client"
// Composes all section components in locked narrative order (UI-SPEC.md Section Backgrounds table)

import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBarSection } from "@/components/sections/StatsBarSection"
// ... all section imports ...
import { fetchSettings } from "@/lib/api"

export default async function HomePage() {
  const settings = await fetchSettings()   // shared across StatsBar + other sections

  return (
    <>
      <HeroSection />                          {/* bg-background white */}
      <StatsBarSection settings={settings} />  {/* bg-[var(--brand-primary)] */}
      <ServicesTabSection />                   {/* bg-background white */}
      <SolutionsGridSection />                 {/* bg-[var(--brand-surface)] */}
      <ClientLogosMarquee />                   {/* bg-background white */}
      <WhyBuilderaSection />                   {/* bg-background white */}
      <TestimonialsSection />                  {/* bg-background white */}
      <CaseStudiesPreview />                   {/* bg-[var(--brand-surface)] */}
      <CTASection />                           {/* gradient bg */}
    </>
  )
}
```

Section order is locked per UI-SPEC.md UX Storytelling section. Do not reorder.

---

### 9. `src/components/sections/HeroSection.tsx` (Server Component shell)

**Analog:** `src/app/not-found.tsx` (Server Component with structured layout, lines 3-19)

**2-column hero shell pattern (D-05, D-07):**
```tsx
// Server Component shell — contains HeroHeadline [use client] child
import { HeroHeadline } from "./HeroHeadline"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Decorative orbs — pure CSS, no JS (D-02) */}
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <HeroHeadline />                {/* [use client] — word-by-word reveal */}
            {/* Sub-headline, CTAs, badge strip — server-rendered, motion delay props only */}
          </div>
          {/* Right column: SVG illustration */}
          <div className="hero-illustration hidden lg:flex items-center justify-center">
            {/* Inline SVG — no external image file (D-06) */}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### 10. `src/components/sections/HeroHeadline.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` file structure)

**Word-by-word reveal pattern (D-03):**
```tsx
"use client"

import { motion } from "motion/react"

const HEADLINE = "We Build What Your Business Needs to Grow"
const words = HEADLINE.split(" ")

export function HeroHeadline() {
  return (
    <h1 className="text-[2.5rem] lg:text-[3.75rem] font-bold tracking-tight text-foreground leading-[1.1]">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  )
}
```

**Note:** Uses `animate` (mount-triggered), NOT `whileInView` — hero is above fold, so viewport detection is unnecessary and would break the immediate reveal (D-03).

---

### 11. `src/components/sections/StatsBarSection.tsx` (Server shell + Client Counter children)

**Analog:** `src/app/layout.tsx` (Server Component shell that wraps client children with props)

**Server shell passes target values to AnimatedCounter (avoids API call in Client Component):**
```tsx
// Server Component — receives settings from page.tsx via props
import { AnimatedCounter } from "@/components/ui/AnimatedCounter"
import type { Settings } from "@/lib/api"

interface Props {
  settings: Settings
}

export function StatsBarSection({ settings }: Props) {
  const stats = [
    { target: parseInt(settings.stat_projects), suffix: "+", label: "Projects Delivered" },
    { target: parseInt(settings.stat_clients), suffix: "+", label: "Happy Clients" },
    { target: parseInt(settings.stat_years), suffix: "+", label: "Years Experience" },
    { target: parseInt(settings.stat_satisfaction), suffix: "%", label: "Client Satisfaction" },
  ]

  return (
    <motion.section
      className="bg-[var(--brand-primary)] py-12"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter target={stat.target} suffix={stat.suffix} delay={index * 0.2} />
              <p className="text-sm font-medium text-white/80 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
```

---

### 12. `src/components/ui/AnimatedCounter.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` structure + props interface)

**Counter animation pattern (RESEARCH.md Code Examples, lines 480-512):**
```tsx
"use client"

import { useEffect, useRef } from "react"
import { useMotionValue, useSpring, useTransform, useInView, useReducedMotion, motion } from "motion/react"

interface Props {
  target: number
  suffix?: string   // e.g. "+" or "%"
  delay?: number    // stagger delay in seconds
}

export function AnimatedCounter({ target, suffix = "", delay = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  const count = useMotionValue(0)
  const spring = useSpring(count, { stiffness: 60, damping: 20 })
  const rounded = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      if (prefersReducedMotion) {
        count.set(target)
      } else {
        setTimeout(() => count.set(target), delay * 1000)
      }
    }
  }, [isInView, prefersReducedMotion])
  // count, target, delay intentionally not in deps — motion values are not state

  return (
    <motion.span
      ref={ref}
      className="text-[3.75rem] font-bold text-white"
    >
      {rounded}
    </motion.span>
  )
}
```

**RESEARCH.md Pitfall 9 warning:** `useInView` gate is required — do NOT call `count.set(target)` without checking `isInView` first.

---

### 13. `src/components/sections/ServicesTabSection.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` with `useState`)

**AnimatePresence tab switcher pattern (RESEARCH.md Code Examples, lines 540-589):**
```tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

// SERVICES_MENU hardcoded here (D-17) — copy exact const from SiteNav.tsx
// Do NOT fetch from API

export function ServicesTabSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Tab bar */}
        <div className="relative flex gap-2 overflow-x-auto snap-x pb-2 mb-8">
          {SERVICES_MENU.map((service, i) => (
            <button
              key={service.slug}
              onClick={() => setActiveTab(i)}
              className={cn(
                "relative px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap snap-start min-h-[48px] transition-colors",
                activeTab === i
                  ? "text-[var(--brand-primary)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {service.category}
              {/* Sliding underline using layoutId */}
              {activeTab === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--brand-primary)]"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Card grid with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}                    // key MUST change on tab switch (RESEARCH.md Pitfall 6)
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15, ease: "easeIn" }}
          >
            {SERVICES_MENU[activeTab].subServices.map((sub, index) => (
              <motion.div
                key={sub}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}
              >
                <ServiceCard name={sub} slug={SERVICES_MENU[activeTab].slug} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
```

---

### 14. `src/components/ui/ServiceCard.tsx` (Server Component, transform)

**Analog:** `src/components/ui/button.tsx` (Server-compatible UI component with props interface + `cn()`)

**Card pattern copying button.tsx structure (lines 43-56):**
```tsx
// Server Component — no "use client"
import { cn } from "@/lib/utils"
// Icon imported by name and passed as prop from parent (server-safe)

interface Props {
  name: string
  slug: string          // parent service slug for URL construction
  description?: string
  className?: string
}

export function ServiceCard({ name, slug, description, className }: Props) {
  return (
    <motion.a
      href={`/services/${slug}`}
      className={cn(
        "flex flex-col gap-3 p-4 rounded-lg border border-border bg-card",
        "hover:shadow-[0_0_0_2px_var(--brand-primary)]",  // D-20 hover border glow
        "transition-all duration-200",
        className
      )}
      whileHover={{ y: -4 }}               // D-26 hover lift
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Tabler icon — brand blue, top-left (D-20) */}
      <p className="font-semibold text-foreground text-sm">{name}</p>
      {description && (
        <p className="text-muted-foreground text-xs line-clamp-1">{description}</p>
      )}
      <span className="text-xs font-medium text-[var(--brand-primary)] mt-auto">
        Learn More →
      </span>
    </motion.a>
  )
}
```

---

### 15. `src/components/sections/SolutionsGridSection.tsx` (Server Component, transform)

**Analog:** `src/app/not-found.tsx` (Server Component with structured content)

**4-column grid with diagonal stagger (D-22, UI-SPEC.md Section 4 animation):**
```tsx
// Server Component — stagger via index prop math, no hooks
import { motion } from "motion/react"

// 18 solutions — hardcoded in Phase 3 (no API endpoint for solutions yet in Phase 3)
const SOLUTIONS = [ /* 18 solution objects: { name, slug, icon } */ ]

export function SolutionsGridSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section heading with scroll reveal (SP-7) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
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
                  delay: (colIndex + rowIndex) * 0.05,   // diagonal cascade (UI-SPEC.md Section 4)
                  duration: 0.35,
                  ease: "easeOut"
                }}
              >
                <SolutionTile solution={solution} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
```

---

### 16. `src/components/sections/ClientLogosMarquee.tsx` (Server Component, transform)

**Analog:** `src/app/not-found.tsx` (Server Component, static render)

**Pure CSS marquee — zero JS pattern (D-23, UI-SPEC.md Section 5):**
```tsx
// Server Component — pure CSS animation via globals.css .marquee-track class
// Logos duplicated in JSX (not JS) for seamless loop

const LOGOS = [
  /* 6-8 placeholder SVG logo objects */
]

export function ClientLogosMarquee() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="marquee-track">  {/* CSS animation class from globals.css */}
        {/* Logos rendered twice — CSS marquee needs duplication */}
        {[...LOGOS, ...LOGOS].map((logo, index) => (
          <div key={index} className="logo-item mx-8 flex-shrink-0">
            {logo.svg}
          </div>
        ))}
      </div>
    </section>
  )
}
```

**No `motion` import in this file.** Pure CSS handles the animation. `marquee-track` and `logo-item` classes defined in globals.css.

---

### 17. `src/components/sections/TestimonialsSection.tsx` (Server Component, transform)

**Analog:** `src/app/not-found.tsx` (Server Component with structured layout)

**Glassmorphism card depth stagger (UI-SPEC.md Section 7):**
```tsx
// Server Component — motion.div with static props works here (SP-7)
const TESTIMONIALS = [
  /* 3 hardcoded testimonials in Phase 3 — API-driven in Phase 8 */
]
const Y_OFFSETS = [40, 24, 56]    // different depths simulate card stack
const DELAYS = [0, 0.15, 0.3]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: Y_OFFSETS[index] }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: DELAYS[index], duration: 0.6, ease: "easeOut" }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 18. `src/components/ui/TestimonialCard.tsx` (Server Component, transform)

**Analog:** `src/components/ui/button.tsx` (UI component with props interface + `cn()`, lines 43-58)

**Glassmorphism card pattern (SP-9):**
```tsx
// Server Component — glassmorphism styling via glass-card utility class
import { cn } from "@/lib/utils"
import { IconStar } from "@tabler/icons-react"

export function TestimonialCard({ testimonial, className }: Props) {
  return (
    <div className={cn("glass-card p-6 flex flex-col gap-4", className)}>
      {/* Star rating */}
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar key={i} className="size-4 text-[var(--brand-primary)] fill-current" />
        ))}
      </div>
      {/* Quote */}
      <blockquote className="text-foreground text-base leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      {/* Attribution */}
      <div className="mt-auto">
        <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
        <p className="text-xs text-muted-foreground">{testimonial.company}</p>
      </div>
    </div>
  )
}
```

---

### 19. `src/components/sections/WhyBuilderaSection.tsx` (Server shell, transform)

**Analog:** `src/app/layout.tsx` (Server Component that composes client children)

**3-column shell passing no data (all content hardcoded in client children):**
```tsx
// Server Component shell — wraps 3 distinct client component columns
import { AnimatedRingStat } from "@/components/ui/AnimatedRingStat"
import { FeatureCheckList } from "@/components/ui/FeatureCheckList"
import { MiniMetricsCard } from "@/components/ui/MiniMetricsCard"

export function WhyBuilderaSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section heading */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Each column enters with base reveal + 0.2s stagger (UI-SPEC.md Section 6) */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0, duration: 0.5 }}>
            <AnimatedRingStat percentage={98} label="Client Satisfaction" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}>
            <FeatureCheckList />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}>
            <MiniMetricsCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

---

### 20. `src/components/ui/AnimatedRingStat.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` structure)

**SVG ring draw pattern (RESEARCH.md Code Examples, lines 699-732):**
```tsx
"use client"

import { motion, useReducedMotion } from "motion/react"

interface Props {
  percentage: number    // 0-100
  label: string
}

export function AnimatedRingStat({ percentage, label }: Props) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {/* Track ring */}
        <circle cx="60" cy="60" r="52" fill="none"
          stroke="hsl(217 91% 60% / 15%)" strokeWidth="8" />
        {/* Animated fill ring */}
        <motion.circle
          cx="60" cy="60" r="52"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="326.7"  /* 2π × 52 */
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: prefersReducedMotion ? 1 : percentage / 100, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut", delay: 0.3 }}
          style={{ rotate: -90, transformOrigin: "60px 60px" }}
        />
        {/* Center percentage text */}
        <text x="60" y="60" textAnchor="middle" dominantBaseline="central"
          className="text-2xl font-bold fill-foreground">
          {percentage}%
        </text>
      </svg>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  )
}
```

---

### 21. `src/components/ui/FeatureCheckList.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` with motion)

**Staggered checkmark spring pattern (UI-SPEC.md Section 6 Column 2):**
```tsx
"use client"

import { motion } from "motion/react"
import { IconCheck, IconX } from "@tabler/icons-react"

const COMPARISON_ROWS = [
  { feature: "Cost Effective",   buildera: true,  inHouse: false, freelancer: true },
  { feature: "Delivery Speed",   buildera: true,  inHouse: false, freelancer: false },
  { feature: "Communication",    buildera: true,  inHouse: false, freelancer: true },
  { feature: "Accountability",   buildera: true,  inHouse: true,  freelancer: false },
  { feature: "Expertise Depth",  buildera: true,  inHouse: true,  freelancer: false },
]

export function FeatureCheckList() {
  return (
    <div className="flex flex-col gap-4 p-6 rounded-lg border border-border bg-card">
      <h3 className="font-semibold text-foreground">Buildera vs. the alternatives</h3>
      {COMPARISON_ROWS.map((row, index) => (
        <motion.div
          key={row.feature}
          className="grid grid-cols-4 gap-2 items-center text-sm"
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 400, damping: 25 }}
        >
          <span className="text-muted-foreground col-span-1">{row.feature}</span>
          {/* Each check animates scale 0→1 (UI-SPEC.md Section 6 Column 2) */}
          {[row.buildera, row.inHouse, row.freelancer].map((val, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 + i * 0.05, type: "spring", stiffness: 400, damping: 25 }}
              className={val ? "text-[var(--brand-primary)]" : "text-muted-foreground"}
            >
              {val ? <IconCheck className="size-4" /> : <IconX className="size-4" />}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}
```

---

### 22. `src/components/ui/AnimatedBarChart.tsx` (Client Component, event-driven)

**Analog:** `src/app/error.tsx` (`"use client"` structure)

**Spring bars scaleY 0→1 pattern (UI-SPEC.md Section 6 Column 3):**
```tsx
"use client"

import { motion } from "motion/react"

interface Props {
  bars: { height: number; label?: string }[]  // height: 0-100 (percentage of max)
}

export function AnimatedBarChart({ bars }: Props) {
  return (
    <div className="flex items-end gap-2 h-24">
      {bars.map((bar, index) => (
        <div key={index} className="flex flex-col items-center gap-1 flex-1">
          <motion.div
            className="w-full bg-[var(--brand-primary)] rounded-t"
            style={{ originY: 1 }}              // grows from bottom (UI-SPEC.md Section 6)
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: bar.height / 100 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 120, damping: 20 }}
          />
          {bar.label && <span className="text-[10px] text-muted-foreground">{bar.label}</span>}
        </div>
      ))}
    </div>
  )
}
```

---

### 23. `src/components/sections/CTASection.tsx` (Server Component, transform)

**Analog:** `src/app/not-found.tsx` (Server Component with static content + link)

**Gradient + shimmer CTA pattern (UI-SPEC.md Section 9):**
```tsx
// Server Component — CSS gradient + shimmer via globals.css .cta-button-shimmer class
export function CTASection() {
  return (
    <motion.section
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))"
      }}
      // Gradient pulse via CSS on container:
      // animate: handled by globals.css .cta-section keyframe — add class
    >
      <div className="container mx-auto px-4 max-w-7xl text-center">
        <motion.h2
          className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Ready to build something that grows your business?
        </motion.h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Book a free 30-minute discovery call. No pressure, no pitch deck — just a conversation about what you need.
        </p>
        {/* Shimmer button — position:relative required for ::after shimmer */}
        <a
          href="/book-a-call"
          className="cta-button-shimmer relative inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-colors"
        >
          Book a Free Discovery Call
        </a>
      </div>
    </motion.section>
  )
}
```

---

## No Analog Found

No files in the Phase 3 scope lack a workable analog — all analogs are the 6 existing source files re-applied by role. However, the following are greenfield-first implementations with no close role match (planner should use spec patterns directly):

| File | Role | Reason |
|------|------|---------|
| `src/components/ui/MiniMetricsCard.tsx` | Client (bar chart + feed) | Composite component combining `AnimatedBarChart` + scrolling project feed — no analog; compose from `AnimatedBarChart` + stagger pattern from `FeatureCheckList` |
| `src/components/ui/CaseStudyPreviewCard.tsx` | Client (metric counter card) | Card with embedded counter — combine `AnimatedCounter` counter pattern with card shell from `TestimonialCard` |
| `src/components/layout/MegaDropdown.tsx` | Server (dropdown panel) | No dropdown/flyout component exists; compose from section shell pattern (SP-10) |

---

## Metadata

**Analog search scope:** `buildera-frontend/src/` — all 11 existing source files scanned
**Files scanned:** 11 (6 `.tsx`, 5 `.ts`)
**Pattern extraction date:** 2026-05-27

**Critical architectural warnings for planner:**
1. **Line 10 of `globals.css`** — `--font-sans: var(--font-sans)` is a self-referential bug that must be fixed in plan 03-01 before any other task. Inter will not activate until this is fixed.
2. **`lucide-react` after shadcn installs** — After each `npx shadcn add`, immediately inspect the installed file for `lucide` imports and replace with Tabler equivalents.
3. **Server/Client data boundary** — `fetchNavItems()`, `fetchFooterLinks()`, `fetchSettings()` are called ONLY in Server Components. Client components receive data exclusively via props.
4. **`--brand-*` token syntax** — All brand tokens use `var(--brand-*)` arbitrary value syntax in Tailwind classes (e.g., `bg-[var(--brand-primary)]`), NOT shorthand utility classes like `bg-brand-primary`.
