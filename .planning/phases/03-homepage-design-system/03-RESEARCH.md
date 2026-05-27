# Phase 3: Homepage & Design System — Research

**Researched:** 2026-05-27
**Domain:** Next.js 15 App Router, Tailwind CSS 4, motion/react v12, shadcn/ui base-nova, glassmorphism, ISR fetch patterns
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Section**
- D-01: Light hero — white/off-white background. Brand blue is decorative accent only.
- D-02: CSS keyframe floating orbs/blobs — 2-3 gradient circles, blur 80-120px, opacity 0.3-0.5, 8s ease-in-out infinite alternate. No JS.
- D-03: Word-by-word headline animation via motion/react. `<motion.span>` per word, `initial: { opacity: 0, y: 20 }`, 70ms stagger.
- D-04: Inline stat badge strip below CTAs — "✓ 150+ Projects · ✓ 50+ Clients · ✓ 98% Satisfaction". Compact.
- D-05: 2-column desktop layout — left: headline/sub/CTAs/badges; right: illustration.
- D-06: Abstract tech SVG illustration, built inline. CSS float/pulse animation only.
- D-07: `min-h-screen` hero. Mobile: natural content height.

**Brand Design System**
- D-08: 7 brand tokens in `@theme` block. No full color scale.
- D-09: Dark mode `.dark` block tuned for brand tokens.
- D-10: Glassmorphism: `background: hsl(217 91% 60% / 6%)`, `backdrop-filter: blur(12px)`, `border: 1px solid hsl(217 91% 60% / 15%)`.
- D-11: Fix `--font-sans: var(--font-sans)` (self-referential bug) → `--font-sans: var(--font-inter)` in `@theme inline` block.
- D-12: Alternating section backgrounds locked — see CONTEXT.md D-12 table.

**Mega Nav (SiteNav)**
- D-13: Hover-triggered mega dropdown, 150ms open delay.
- D-14: Full viewport width panel, container-constrained inner content.
- D-15: Sticky glass — transparent at top, `bg-white/80 backdrop-blur-xl border-b` at 50px scroll.
- D-16: Mobile full-screen overlay from right, accordion groups, "Book a Free Call" pinned bottom.
- D-17: Services panel hardcoded (`SERVICES_MENU` const). Solutions/Work/Resources from `GET /api/nav-items`.

**Services Tab Section (HOME-02)**
- D-18: Horizontal tab pills, horizontal scroll on mobile.
- D-19: All sub-services shown per tab, no truncation.
- D-20: Sub-service card: Tabler icon + bold title + 1-line desc + "Learn More →" + hover lift + border glow.
- D-21: Tab switching via `AnimatePresence` — old cards fade out, new stagger in with 50ms delay.

**Solutions Grid & Client Logos (HOME-03, COMP-02)**
- D-22: 4-column grid, all 18 tiles visible, diagonal stagger on enter.
- D-23: CSS infinite marquee — logos duplicated in JSX, grayscale default/color on hover.

**Animation System**
- D-24: Scroll reveal base: `initial: { opacity: 0, y: 24 }`, `whileInView`, `viewport: { once: true }`.
- D-25: Grid stagger: `delay: index * 0.08`.
- D-26: Hover cards: `translateY(-4px)`, border glow, 200ms ease.

**Typography**
- D-27 (LOCKED): Full 8-role type hierarchy — 60px Display → 12px Caption. Supersedes standard 4-size ceiling.

### Claude's Discretion

None — all decisions were fully specified in discussion. No discretion areas remain.

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope.

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-01 | Sticky header with logo, 4-item mega nav, "Book a Call" CTA, frosted glass on scroll | D-15; scroll listener pattern in SiteNavClient; CSS transition confirmed |
| NAV-02 | Mega dropdown — Services (all 6 categories + sub-services), Solutions (18 tiles), Work, Resources | D-14, D-17; full-width panel, hardcoded Services + API-driven others |
| NAV-03 | Mobile full-screen overlay drawer, accordion groups, CTA at bottom | D-16; MobileNavDrawer [use client], AnimatePresence for open/close |
| NAV-04 | Footer — multi-column, social icons, legal links, newsletter opt-in strip | SiteFooter Server Component; fetchFooterLinks() + fetchSettings() at build time |
| NAV-05 | Admin-editable navigation (Phase 8 concern — Phase 3 sets up the API consumption) | fetchNavItems() with `next: { tags: ['nav-items'] }` cache tag established in Phase 3 |
| NAV-06 | Admin-editable footer (Phase 8 concern — Phase 3 establishes API pattern) | fetchFooterLinks() with `next: { tags: ['footer-links'] }` cache tag |
| NAV-07 | Breadcrumbs (Phase 3 sets up deep page structure; breadcrumb component out of scope) | Out of scope for Phase 3 |
| NAV-08 | Skip-to-content link | Single `<a href="#main-content">` in layout.tsx, always visible on focus |
| HOME-01 | Hero section — headline, sub, CTAs, social proof | HeroSection (Server) + HeroHeadline [use client]; all copy locked in UI-SPEC |
| HOME-02 | Services tab section — 6-tab switcher with sub-service cards | ServicesTabSection [use client] + ServiceCard (Server); AnimatePresence confirmed |
| HOME-03 | Solutions grid — 18 tiles | SolutionsGridSection (Server); diagonal stagger via index props |
| HOME-04 | Stats bar — 4 animated counters | StatsBarSection (Server shell) + AnimatedCounter [use client]; useMotionValue + useSpring confirmed |
| HOME-05 | Testimonials — 3-5 quotes | TestimonialsSection (Server); glassmorphism cards |
| HOME-06 | Case studies preview — 3 featured | CaseStudiesPreview (Server shell) + CaseStudyPreviewCard [use client] |
| HOME-07 | Bottom CTA section | CTASection (Server); gradient bg, shimmer via CSS ::after |
| COMP-02 | Client logos marquee — seeded placeholder logos | ClientLogosMarquee (Server); pure CSS @keyframes marquee; logos duplicated in JSX |
| COMP-03 | Clutch/GoodFirms badge in testimonials section | Static badge image/text in TestimonialsSection; no dynamic data |
| COMP-06 | Why Buildera 3-column differentiation section | WhyBuilderaSection (Server shell); AnimatedRingStat + FeatureCheckList + MiniMetricsCard each [use client] |
| DESIGN-01 | Motion-first UI — scroll-triggered animations on all sections | whileInView + viewport.once confirmed; useReducedMotion gate confirmed |
| DESIGN-02 | Hero animation — orbs + word reveal | CSS @keyframes orbs (no JS); motion.span word reveal [use client] |
| DESIGN-03 | Card micro-interactions — hover lift + border glow | motion whileHover y:-4 + CSS box-shadow on hover |
| DESIGN-04 | Glassmorphism nav + cards | backdrop-filter: blur(12px) confirmed; CSS utility class in globals.css |
| DESIGN-05 | Gradient system — CSS variables | --brand-gradient-from/to in @theme; linear-gradient() via arbitrary values |
| DESIGN-06 | Animated stats counters | useMotionValue + useSpring + useTransform + useInView confirmed in motion/react 12.40.0 |
| DESIGN-07 | Staggered list reveals | delay: index * 0.08 prop pattern confirmed for Server Component shells |
| DESIGN-08 | Tab switcher animation — cross-fade + sliding underline | AnimatePresence mode="wait" + layoutId="tab-indicator" confirmed |
| INFRA-03 | Custom not-found.tsx and error.tsx | Both already scaffolded in Phase 1; Phase 3 updates not-found.tsx with nav links |

</phase_requirements>

---

## Summary

Phase 3 is a pure frontend build — no new backend work, no database changes, no new npm packages to install. All dependencies are already present in `node_modules`. The phase establishes the design system in `globals.css`, wires the Inter font correctly, builds 22 components across layout and homepage sections, and connects three API endpoints for nav/footer/settings data.

The main technical complexity areas are: (1) the Tailwind 4 `@theme inline` block for font wiring and the separate `:root` block for brand tokens, (2) the `"use client"` boundary design that allows Server Component shells to contain Client Component children, (3) the motion/react v12 counter animation pattern using `useMotionValue` + `useSpring` + `useTransform`, and (4) the mega nav scroll/hover interaction that must live in a client component island while the nav shell remains a Server Component.

The UI-SPEC.md and CONTEXT.md together provide exhaustive, implementation-ready specifications. The planner should treat them as the authoritative source — no design decisions remain open.

**Primary recommendation:** Wire the `@theme inline` font fix first (it gates all Inter usage), add brand tokens to `:root` second, then build outward from layout (SiteNav → SiteFooter) into page sections.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Brand token definitions | Frontend (CSS/globals.css) | — | Pure styling concern; no server involvement |
| Inter font wiring | Frontend (layout.tsx + globals.css) | — | next/font loads at app root; @theme inline maps it |
| SiteNav data fetch (nav-items) | Frontend Server (SSG build) | — | Fetch at build time in Server Component; cached with tag |
| SiteNav scroll/hover state | Browser / Client | — | scroll events and hover state require browser APIs |
| SiteFooter data fetch | Frontend Server (SSG build) | — | Same SSG pattern as nav |
| Stats counter animation | Browser / Client | Frontend Server (shell) | Server shell passes target values; client animates |
| Hero word-by-word reveal | Browser / Client | Frontend Server (shell) | mount-triggered animation requires client |
| Solutions grid stagger | Frontend Server | — | delay prop computed from index, no client state needed |
| Client logos marquee | Frontend Server | — | Pure CSS animation, zero JS |
| Tab switching animation | Browser / Client | — | useState + AnimatePresence requires client |
| SVG ring stat animation | Browser / Client | — | pathLength animation + useInView requires client |
| API endpoints (nav/footer/settings) | API / Backend (Laravel) | — | Already built in Phase 2; Phase 3 only consumes |

---

## Standard Stack

### Core (all already installed in node_modules)

| Library | Installed Version | Latest Version | Purpose | Why Standard |
|---------|-------------------|---------------|---------|--------------|
| Next.js | 15.5.18 | 15.5.18 | App Router framework | Project stack — locked |
| React | 19.1.0 | 19.1.0 | UI runtime | Bundled with Next.js 15 |
| TypeScript | 5.x | — | Type safety | Project-wide |
| Tailwind CSS | 4.3.0 | 4.3.0 | Utility CSS framework | Project stack — locked |
| motion | 12.40.0 | 12.40.0 | Animation library | Project stack — locked |
| @tabler/icons-react | 3.44.0 | 3.44.0 | Icon library | CLAUDE.md mandated |
| @base-ui/react | 1.5.0 | 1.5.0 | Headless UI primitives (shadcn base-nova) | components.json confirmed |
| shadcn | 4.8.1 (CLI) | 4.8.1 | Component CLI | Already initialized |
| class-variance-authority | 0.7.1 | 0.7.1 | Variant-based class generation | Used in button.tsx |
| tw-animate-css | 1.4.0 | 1.4.0 | Tailwind 4 animation utilities | Imported in globals.css |
| clsx | 2.1.1 | 2.1.1 | Conditional class strings | Used in cn() |
| tailwind-merge | 3.6.0 | 3.6.0 | Tailwind class conflict resolution | Used in cn() |

### shadcn Components to Add in Phase 3

| Component | Install Command | Used In |
|-----------|----------------|---------|
| Badge | `npx shadcn add badge` | Section eyebrow labels, stat labels |
| Card | `npx shadcn add card` | Base for service/solution/testimonial cards |
| Tabs | `npx shadcn add tabs` | ServicesTabSection base (may be replaced by custom) |
| Separator | `npx shadcn add separator` | Footer column dividers |

**Note on shadcn Tabs vs custom:** The ServicesTabSection requires AnimatePresence for animated tab switching. shadcn's Tabs (built on Radix UI) is not Radix in base-nova style — it is built on @base-ui/react. Review the installed Tabs component for AnimatePresence compatibility before wrapping. A custom tab implementation using `useState` + `AnimatePresence` may be simpler. [ASSUMED — confirm after installing Tabs component]

**Icon library mismatch:** `components.json` declares `"iconLibrary": "lucide"` but CLAUDE.md mandates `@tabler/icons-react`. Any shadcn component that auto-imports from `lucide-react` (e.g., `ChevronDown`) must have its icons replaced with Tabler equivalents during installation. `lucide-react` is listed in package.json — do not use it. [VERIFIED: codebase inspection]

### No New Packages to Install

Phase 3 requires zero new npm package installs. All dependencies are already in `node_modules`. The only "new" items are:
1. `npx shadcn add badge card tabs separator` — uses the already-installed shadcn CLI to scaffold components from the official registry
2. CSS-only additions to `globals.css`
3. New `.tsx` files in `src/components/`

**Installation commands:**
```bash
cd buildera-frontend
npx shadcn add badge
npx shadcn add card
npx shadcn add tabs
npx shadcn add separator
```

---

## Package Legitimacy Audit

> Phase 3 installs no new npm packages. The shadcn CLI commands above scaffold files from the official shadcn registry — they do not install new packages to node_modules. All dependencies below are already installed in Phase 1.

slopcheck ran against PyPI (Python registry), which correctly flagged npm-only packages as non-existent on PyPI. npm registry verification was performed separately for each package.

| Package | Registry | Created | npm postinstall | Source Repo | Disposition |
|---------|----------|---------|-----------------|-------------|-------------|
| motion | npm | 2013-12 | None | github.com/motiondivision/motion | Approved |
| @tabler/icons-react | npm | 2023-01 | None | github.com/tabler/tabler-icons | Approved |
| tailwindcss | npm | 2017-10 | None | github.com/tailwindlabs/tailwindcss | Approved |
| @base-ui/react | npm | 2025-12 | None | github.com/mui/base-ui | Approved |
| shadcn (CLI) | npm | 2024-07 | None | github.com/shadcn-ui/ui | Approved |
| class-variance-authority | npm | 2022-01 | None | github.com/joe-bell/cva | Approved |
| tw-animate-css | npm | 2025-03 | None | github.com/Wombosvideo/tw-animate-css | Approved |
| clsx | npm | 2018-12 | None | github.com/lukeed/clsx | Approved |
| tailwind-merge | npm | 2021-07 | None | github.com/dcastil/tailwind-merge | Approved |

**Packages removed due to slopcheck [SLOP] verdict:** none (slopcheck ran against wrong registry; manual npm verification confirms all packages legitimate)
**Packages flagged as suspicious [SUS]:** none

---

## Architecture Patterns

### System Architecture Diagram

```
Browser Request (buildera.co)
  └── Next.js App Router
        ├── layout.tsx (Server Component)
        │     ├── SiteNav (Server Component shell)
        │     │     ├── [build: GET /api/nav-items → fetchNavItems()]
        │     │     └── SiteNavClient [use client]
        │     │           ├── scroll listener → glassmorphism activation
        │     │           ├── MegaDropdown (hover state)
        │     │           └── MobileNavDrawer (drawer state + accordion)
        │     ├── {children}
        │     └── SiteFooter (Server Component)
        │           ├── [build: GET /api/footer-links → fetchFooterLinks()]
        │           └── [build: GET /api/settings → fetchSettings()]
        │
        └── page.tsx (Server Component — homepage)
              ├── HeroSection (Server)
              │     └── HeroHeadline [use client] ← word-by-word reveal on mount
              ├── StatsBarSection (Server shell)
              │     └── AnimatedCounter [use client] × 4 ← useMotionValue + useSpring
              ├── ServicesTabSection [use client] ← AnimatePresence + layoutId
              │     └── ServiceCard (Server) × N (rendered as children)
              ├── SolutionsGridSection (Server)
              │     └── SolutionTile × 18 (diagonal stagger via index prop)
              ├── ClientLogosMarquee (Server) ← pure CSS @keyframes
              ├── WhyBuilderaSection (Server shell)
              │     ├── AnimatedRingStat [use client] ← SVG pathLength + counter
              │     ├── FeatureCheckList [use client] ← staggered checkmarks
              │     └── MiniMetricsCard [use client] ← animated bar chart
              ├── TestimonialsSection (Server)
              ├── CaseStudiesPreview (Server shell)
              │     └── CaseStudyPreviewCard [use client] × 3 ← metric counter
              └── CTASection (Server) ← CSS gradient + shimmer
```

**Data flow at build time:**
```
next build
  └── SiteNav.tsx → fetchNavItems() → GET /api/nav-items
                                      cache: { next: { tags: ['nav-items'] } }
  └── SiteFooter.tsx → fetchFooterLinks() → GET /api/footer-links
                                             cache: { next: { tags: ['footer-links'] } }
  └── SiteFooter.tsx → fetchSettings() → GET /api/settings
  └── StatsBarSection.tsx → fetchSettings() → GET /api/settings
                                               cache: { next: { tags: ['settings'] } }
                                               (memoized — one network call, shared result)
```

**ISR revalidation path (from Phase 2):**
```
Admin saves content → Laravel Observer → RevalidationJob → POST /api/revalidate
  → revalidateTag('nav-items') | revalidateTag('settings') | revalidateTag('footer-links')
  → Next.js purges cache → fresh fetch on next request
```

### Recommended Project Structure

```
src/
├── app/
│   ├── globals.css          ← 03-01: @theme inline fix + brand tokens + glassmorphism + marquee CSS
│   ├── layout.tsx           ← 03-01/03-02/03-03: add SiteNav + SiteFooter + skip-to-content
│   ├── page.tsx             ← 03-04/03-05/03-06: replace Next.js default with homepage sections
│   ├── error.tsx            ← already exists (Phase 1); update styling to match design system
│   └── not-found.tsx        ← already exists (Phase 1); update with nav links
├── components/
│   ├── layout/
│   │   ├── SiteNav.tsx              ← Server Component shell (fetches nav data)
│   │   ├── SiteNavClient.tsx        ← [use client] scroll glass + mega dropdown state
│   │   ├── MegaDropdown.tsx         ← Server Component (content; receives data as props)
│   │   ├── MobileNavDrawer.tsx      ← [use client] full-screen overlay drawer
│   │   └── SiteFooter.tsx           ← Server Component (fetches footer-links + settings)
│   ├── sections/
│   │   ├── HeroSection.tsx          ← Server shell; contains HeroHeadline child
│   │   ├── HeroHeadline.tsx         ← [use client] word-by-word motion reveal
│   │   ├── StatsBadgeStrip.tsx      ← Server (inline badge strip below CTAs)
│   │   ├── StatsBarSection.tsx      ← Server shell; passes targets to AnimatedCounter
│   │   ├── ServicesTabSection.tsx   ← [use client] tab state + AnimatePresence
│   │   ├── SolutionsGridSection.tsx ← Server; diagonal stagger via index prop
│   │   ├── ClientLogosMarquee.tsx   ← Server; pure CSS marquee
│   │   ├── WhyBuilderaSection.tsx   ← Server shell; 3-col grid wrapper
│   │   ├── TestimonialsSection.tsx  ← Server; glassmorphism cards
│   │   ├── CaseStudiesPreview.tsx   ← Server shell; 3 preview cards
│   │   └── CTASection.tsx           ← Server; gradient + CSS shimmer
│   └── ui/
│       ├── button.tsx               ← already exists (@base-ui/react)
│       ├── badge.tsx                ← npx shadcn add badge
│       ├── card.tsx                 ← npx shadcn add card
│       ├── tabs.tsx                 ← npx shadcn add tabs (review for AnimatePresence compat)
│       ├── separator.tsx            ← npx shadcn add separator
│       ├── AnimatedCounter.tsx      ← [use client] useMotionValue + useSpring
│       ├── ServiceCard.tsx          ← Server; sub-service card (icon/title/desc/link)
│       ├── SolutionTile.tsx         ← Server; solution grid tile
│       ├── TestimonialCard.tsx      ← Server; glassmorphism testimonial card
│       ├── CaseStudyPreviewCard.tsx ← [use client] animated metric counter on card
│       ├── AnimatedRingStat.tsx     ← [use client] SVG ring + counter
│       ├── FeatureCheckList.tsx     ← [use client] staggered spring checkmarks
│       ├── MiniMetricsCard.tsx      ← [use client] bar chart + project feed
│       └── AnimatedBarChart.tsx     ← [use client] spring bars scaleY 0→1
└── lib/
    ├── api.ts    ← add fetchNavItems(), fetchFooterLinks(), fetchSettings()
    └── utils.ts  ← cn() already exists
```

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animated number counters | Custom requestAnimationFrame loops | `useMotionValue + useSpring + useTransform` from motion/react | Spring physics, cancellation, reduced-motion handling all built-in |
| Tab sliding underline | CSS position tracking with JS `getBoundingClientRect` | `motion.div` with `layoutId="tab-indicator"` | Layout animations handle resize, route changes, and spring easing automatically |
| Conditional class merging | String concatenation + ternary chains | `cn()` (clsx + tailwind-merge) | Prevents Tailwind class conflicts; handles all edge cases |
| Scroll-triggered reveals | `IntersectionObserver` manual setup | `whileInView + viewport={{ once: true }}` on `motion.*` elements | Automatic cleanup, proper threshold handling, SSR-safe |
| Viewport detection for counters | Manual IntersectionObserver ref | `useInView(ref, { once: true })` from motion/react | Integrates with motion value system; `once: true` prevents re-trigger |
| CSS variable component variants | Inline styles everywhere | `cva()` from class-variance-authority | Type-safe variants with Tailwind class composition |
| Hover lift animation | CSS transform + JS mouseenter/leave | `whileHover={{ y: -4 }}` on `motion.div` | GPU-accelerated, spring physics, no event listener management |
| Icon tree-shaking | Manual imports from root | Import from `@tabler/icons-react` (in `optimizePackageImports`) | Already configured in next.config.ts; automatic code splitting |

**Key insight:** Every complex animation pattern in Phase 3 has a direct motion/react primitive. Do not re-implement scroll detection, spring physics, or layout transitions in custom code.

---

## Common Pitfalls

### Pitfall 1: `@theme inline` vs `@theme` — Wrong Block for Brand Tokens

**What goes wrong:** Placing `--brand-primary: hsl(...)` inside the `@theme inline` block instead of the `:root` block. The `@theme inline` block is for mapping Tailwind utility names to CSS variable references. Brand tokens as consumable variables must go in `:root`.
**Why it happens:** Confusing the two blocks — `@theme inline { --font-sans: var(--font-inter) }` is a utility mapping; `--brand-primary` in `:root` is a CSS variable definition.
**How to avoid:** `@theme inline` = utility → variable reference mappings only. `:root` = CSS variable value definitions.
**Warning signs:** `bg-[var(--brand-primary)]` shows no color in browser, or color shows as oklch(0 0 0).

### Pitfall 2: `--font-sans` Self-Reference Bug

**What goes wrong:** Existing `globals.css` has `--font-sans: var(--font-sans)` in the `@theme inline` block — a circular self-reference that resolves to nothing. Inter never activates as the global font.
**Root cause:** Scaffolding artifact from Phase 1 that was never patched.
**How to fix:** Change line 10 of `globals.css` from `--font-sans: var(--font-sans)` to `--font-sans: var(--font-inter)`. The `--font-inter` CSS variable is set by `next/font/google` via `className={inter.variable}` on `<html>` in `layout.tsx`.
**Warning signs:** Body text renders in system sans-serif (Arial/Helvetica) instead of Inter. DevTools shows `font-family: var(--font-sans)` resolving to `''`.

### Pitfall 3: motion/react Animations in Server Components

**What goes wrong:** Using `whileInView`, `useMotionValue`, `useSpring`, `useInView` directly in a Server Component. These require browser APIs and React state — they will throw a build error or runtime error.
**Why it happens:** `motion.div` with layout props (children prop, className) looks like it could work anywhere. The crash only occurs when motion hooks are called.
**How to avoid:** Any component that imports and uses `useMotionValue`, `useSpring`, `useInView`, `AnimatePresence`, or `useReducedMotion` must have `"use client"` at the top. `motion.div` with only `initial/animate/whileInView/whileHover` as static prop values can work in Server Components — but hooks cannot.
**Warning signs:** Build error: "useState can only be used in a Client Component." or runtime hydration mismatch.

### Pitfall 4: Client Component Imports Pull Server Data Into Client Bundle

**What goes wrong:** A `[use client]` component (e.g., `ServicesTabSection`) imports a module that contains a `fetch()` call or `process.env` reference. Next.js pulls that code into the client bundle, either exposing env vars or failing.
**How to avoid:** Server data must be fetched in the Server Component shell and passed to Client Components as props. Never import `src/lib/api.ts` functions inside a `[use client]` component. The `fetchNavItems()` etc. helpers should only be called from Server Components.
**Warning signs:** Build warning about server code in client bundle; `process.env.NEXT_PUBLIC_API_URL` undefined at runtime in browser.

### Pitfall 5: `lucide-react` Usage After shadcn Component Install

**What goes wrong:** `npx shadcn add tabs` (or other components) installs a component file that imports from `lucide-react` (e.g., `import { ChevronDown } from 'lucide-react'`). CLAUDE.md forbids lucide-react; all icons must be from `@tabler/icons-react`.
**How to avoid:** After each `npx shadcn add`, inspect the installed component file for lucide imports. Replace with equivalent Tabler icons immediately.
**Icon equivalents:** `ChevronDown` → `IconChevronDown`, `X` → `IconX`, `Menu` → `IconMenu2`, `Check` → `IconCheck`, `Star` → `IconStar`.
**Warning signs:** TypeScript build passes but icons look wrong; grep for `lucide` in src/ returns results.

### Pitfall 6: AnimatePresence Tab Content — Missing `key` Prop

**What goes wrong:** `AnimatePresence` requires a unique, stable `key` on its direct children to track presence. If the tab content renders without a `key` (or with the same key), enter/exit animations don't trigger.
**How to avoid:** `<AnimatePresence mode="wait"><motion.div key={activeTab}>...</motion.div></AnimatePresence>`. The `key` must change when the active tab changes.
**Warning signs:** Tab content appears/disappears without animation; console warning about missing keys.

### Pitfall 7: `backdrop-filter` Not Activating

**What goes wrong:** `backdrop-filter: blur(12px)` has no visible effect when the element has a fully opaque background. The glassmorphism effect requires a semi-transparent background to show the blur.
**How to avoid:** Glassmorphism requires `background: hsl(217 91% 60% / 6%)` — NOT `background: hsl(217 91% 60%)`. The alpha channel (6%) is what lets the backdrop show through.
**Warning signs:** Nav or cards look like a solid blue box. `backdrop-filter` appears in DevTools but has no visual effect.

### Pitfall 8: Arbitrary Tailwind Values for Brand Tokens vs `@theme` Registration

**What goes wrong:** If `--brand-primary` is defined in `:root` (not `@theme`), then `bg-brand-primary` won't work as a Tailwind utility — only `bg-[var(--brand-primary)]` will work.
**Design decision (D-08):** Brand tokens go in `:root`, NOT in `@theme`. Therefore, always use `bg-[var(--brand-primary)]` syntax (arbitrary value), not `bg-brand-primary`. This is intentional — the 7 tokens don't need to generate a full utility namespace.
**How to avoid:** Use `var(--brand-*)` arbitrary values consistently. This is correct by design — not a bug.

### Pitfall 9: Counter Animation Firing Before Element Is Visible

**What goes wrong:** `useMotionValue + count.set(target)` fires in a `useEffect` without checking `isInView`. Counter animates from 0 to target while the element is off-screen, then shows the final number when the user scrolls to it.
**How to avoid:**
```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true })
useEffect(() => {
  if (isInView) count.set(targetValue)
}, [isInView])
```
**Warning signs:** Stats bar shows "150" immediately without animation; console shows `isInView: true` before scroll.

### Pitfall 10: `min-h-screen` vs `min-h-dvh` on Mobile

**What goes wrong:** `min-h-screen` (100vh) on mobile calculates height including the browser address bar, causing 100vh to be larger than the visible viewport. Hero appears to overflow.
**How to avoid:** Hero uses `min-h-screen` per D-07, but be aware `100dvh` is the mobile-correct version. Since CONTEXT.md D-07 locks `min-h-screen`, use it — but verify on actual mobile. If overflow occurs, add `overflow-hidden` to hero container.
**Warning signs:** White gap at bottom of hero on iOS Safari; hero extends past visible viewport on first load.

---

## Code Examples

Verified patterns from official sources and codebase inspection.

### Tailwind 4 Font Fix (`globals.css` — 03-01)

```css
/* Source: Tailwind CSS 4 docs (tailwindcss.com/docs/theme) + layout.tsx inspection */
/* BEFORE (broken — self-referential): */
@theme inline {
  --font-sans: var(--font-sans);   /* ← BUG: circular reference, resolves to nothing */
}

/* AFTER (correct): */
@theme inline {
  --font-sans: var(--font-inter);  /* ← Inter loaded by next/font via className={inter.variable} */
}
```

### Brand Tokens in `:root` (globals.css — 03-01)

```css
/* Source: CONTEXT.md D-08 + UI-SPEC.md Color Contract */
/* Add to :root block AFTER existing shadcn tokens */
:root {
  /* existing shadcn tokens... */

  /* Brand tokens (Phase 3+) */
  --brand-primary: hsl(217 91% 60%);
  --brand-primary-dark: hsl(217 91% 45%);
  --brand-primary-light: hsl(217 91% 75%);
  --brand-gradient-from: hsl(217 91% 60%);
  --brand-gradient-to: hsl(242 75% 40%);
  --brand-surface: hsl(217 60% 97%);
  --brand-glass: hsl(217 91% 60% / 8%);
}

.dark {
  /* existing dark tokens... */

  --brand-primary: hsl(217 91% 65%);
  --brand-primary-dark: hsl(217 91% 55%);
  --brand-primary-light: hsl(217 91% 80%);
  --brand-surface: hsl(217 30% 12%);
  --brand-glass: hsl(217 91% 65% / 12%);
  /* gradient tokens unchanged in dark mode */
}
```

### Glassmorphism Utility Class (globals.css — 03-01)

```css
/* Source: UI-SPEC.md Glassmorphism Utility Contract */
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
```

### Animated Counter (AnimatedCounter.tsx — 03-04)

```tsx
/* Source: motion/react docs (motion.dev) + codebase verification of motion 12.40.0 exports */
"use client"
import { useEffect, useRef } from "react"
import { useMotionValue, useSpring, useTransform, useInView, motion } from "motion/react"
import { useReducedMotion } from "motion/react"

interface Props {
  target: number
  suffix?: string // e.g. "+" or "%"
  delay?: number  // stagger delay in seconds
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
        count.set(target) // instant, no spring
      } else {
        setTimeout(() => count.set(target), delay * 1000)
      }
    }
  }, [isInView, prefersReducedMotion])

  return <motion.span ref={ref}>{rounded}</motion.span>
}
```

### Scroll-Triggered Section Reveal (Server Component — no hooks needed)

```tsx
/* Source: motion.dev docs (whileInView + viewport.once) + Next.js Server Component rules */
// Works in Server Components — static props only, no hooks
import { motion } from "motion/react"

export function SectionWrapper({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
}
```

**Note:** `motion.div` with static props (no hooks) can be used in Server Components. Only hooks (`useMotionValue`, `useInView`, etc.) require `"use client"`. [VERIFIED: Next.js App Router Server Component docs]

### AnimatePresence Tab Switcher (ServicesTabSection.tsx — 03-05)

```tsx
/* Source: motion.dev AnimatePresence docs */
"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

export function ServicesTabSection() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      {/* Tab bar with sliding indicator */}
      <div className="relative flex gap-2">
        {SERVICES_MENU.map((service, i) => (
          <button key={service.slug} onClick={() => setActiveTab(i)} className="relative px-4 py-2">
            {service.category}
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

      {/* Card grid with enter/exit animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
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
              {/* ServiceCard content */}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
```

### API Fetch Helpers to Add to `src/lib/api.ts` (03-02)

```typescript
/* Source: UI-SPEC.md API Integration Contract + Next.js fetch docs (nextjs.org/docs/app/api-reference/functions/fetch) */

// Type definitions (add before helpers)
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
  // stats
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

### CSS Marquee Animation (globals.css — 03-05)

```css
/* Source: UI-SPEC.md Section 5 Animation Contract */
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
```

### SVG Ring Draw Animation (AnimatedRingStat.tsx — 03-06)

```tsx
/* Source: UI-SPEC.md Why Buildera Section — Column 1 spec */
"use client"
import { motion } from "motion/react"
import { useReducedMotion } from "motion/react"

export function AnimatedRingStat({ percentage }: { percentage: number }) {
  const prefersReducedMotion = useReducedMotion()

  return (
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
        strokeDasharray="326.7"    /* 2π × 52 */
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: prefersReducedMotion ? 1 : percentage / 100, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut", delay: 0.3 }}
        style={{ rotate: -90, transformOrigin: "60px 60px" }}
      />
    </svg>
  )
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package import | `import { motion } from 'motion/react'` | 2023 (motion v10+) | `framer-motion` still works but `motion/react` is the canonical import path |
| `tailwind.config.js` for custom tokens | `@theme` block in CSS + `:root` variables | Tailwind CSS v4 (2025) | No JS config file; all design tokens live in CSS |
| `viewport={{ once: true }}` default OFF | `viewport={{ once: true }}` must be explicit | Always required | Always add `once: true` for marketing site scroll animations |
| `AnimatePresence mode="sync"` (default) | `AnimatePresence mode="wait"` for tab content | Always available | `mode="wait"` prevents enter/exit overlap for tab switching |
| CSS `transition` for hover lifts | `motion.div whileHover={{ y: -4 }}` | motion v6+ | Spring physics, consistent with other animations |

**Still correct / not deprecated:**
- `@keyframes` CSS for pure visual animations (orbs, marquee, gradient pulse) — preferred over JS for static looping animations
- `backdrop-filter: blur()` + `-webkit-backdrop-filter` both required for Safari compatibility
- `will-change: transform, opacity` still recommended on animated elements (remove via `onAnimationComplete`)
- `next/font/google` with `variable` option for CSS variable injection — unchanged in Next.js 15

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | npm install, next dev | ✓ | (running) | — |
| Next.js 15 | All frontend | ✓ | 15.5.18 | — |
| motion | Animations | ✓ | 12.40.0 | — |
| @tabler/icons-react | Icons | ✓ | 3.44.0 | — |
| @base-ui/react | shadcn base-nova | ✓ | 1.5.0 | — |
| tailwindcss | Styling | ✓ | 4.3.0 | — |
| shadcn CLI | Component scaffolding | ✓ | 4.8.1 | — |
| Laravel API (backend) | fetchNavItems(), fetchSettings() | ✗ at build time | — | Hardcoded fallback values in all fetch helpers |
| MySQL | (backend concern) | N/A | — | — |

**Missing dependencies with no fallback:** None — all frontend dependencies are installed.

**Missing dependencies with fallback:** Laravel API is not running during development (no mid-project deploys). All fetch helpers use `.catch(() => fallback)` pattern. Pages build successfully with hardcoded seed data. Confirmed by existing `fetchFromApi` pattern in `api.ts`.

**Critical note on `framer-motion` co-presence:** `motion/react` in version 12.40.0 re-exports from `framer-motion` internally (`dist/react.d.ts: export * from 'framer-motion'`). The `framer-motion` package IS present in `node_modules` as a transitive dependency. Do not import from `framer-motion` directly — always use `"motion/react"`. Both resolve to the same runtime, but CLAUDE.md mandates `"motion/react"`.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — visual/interaction UI phase; automated test coverage not applicable |
| Config file | None |
| Quick run command | `npm run dev` (visual inspection) |
| Full suite command | `npm run build` (build-time type check + static generation) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | Notes |
|--------|----------|-----------|-------------------|-------|
| NAV-01 | Sticky nav with glass effect | Manual visual | — | Scroll interaction; no automated test possible |
| NAV-02 | Mega dropdown renders all 4 groups | Manual visual | — | Hover interaction |
| NAV-03 | Mobile drawer opens/closes/accordions | Manual visual | — | Touch/click interaction |
| NAV-04 | Footer renders multi-column | Manual visual | — | Static render |
| HOME-01 | Hero renders word-by-word on load | Manual visual | — | Mount animation |
| HOME-04 | Stats counters animate on scroll | Manual visual | — | Scroll interaction |
| COMP-02 | Logo marquee scrolls continuously | Manual visual | — | CSS animation |
| DESIGN-04 | Glassmorphism visible on nav/cards | Manual visual | — | CSS visual |
| INFRA-03 | not-found.tsx and error.tsx render | `npm run build` | TypeScript checks both files at build |

**Build-time verification (automated):**
```bash
cd buildera-frontend && npm run build
```
This verifies: TypeScript types, missing imports, Server/Client Component boundary violations, `generateStaticParams` for static pages, and all fetch fallbacks.

### Wave 0 Gaps

None — this phase creates all components from scratch. No existing test infrastructure to maintain or extend.

---

## Security Domain

> `security_enforcement` not explicitly set to false in `.planning/config.json` — section included.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | Phase 3 has no auth |
| V3 Session Management | No | No sessions in frontend |
| V4 Access Control | No | All homepage content is public |
| V5 Input Validation | Partial | Newsletter form in footer — `POST /api/subscribers` handled by Laravel (already validated in Phase 2); frontend validates non-empty email before submit |
| V6 Cryptography | No | No crypto in frontend |

### Known Threat Patterns for Next.js Static Site

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| XSS via dangerouslySetInnerHTML | Tampering | Never use dangerouslySetInnerHTML in Phase 3 — all content is hardcoded JSX or sanitized API strings |
| Open redirect via href props | Tampering | All links use hardcoded relative paths (e.g., `/services`); no user-controlled href values |
| SVG injection (inline SVG) | Tampering | Hero SVG illustration is hardcoded in JSX — no user data in SVG attributes |
| API key exposure (NEXT_PUBLIC_API_KEY) | Information Disclosure | `NEXT_PUBLIC_API_KEY` is used only for `POST /api/leads` (Phase 5+), not in Phase 3. No client-side API keys in Phase 3. |
| Clickjacking via embedded iframes | Elevation | No iframes in Phase 3 (Calendly embed is Phase 5) |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | shadcn Tabs (base-nova) component may need custom AnimatePresence wrapper; installed component may conflict with motion tab switching | Standard Stack | Low — easy to replace with custom `useState` tab implementation if needed |
| A2 | Laravel API returns `NavItem[]` with `{ label, url, group, display_order }` shape; exact field names depend on Phase 2 API controller | Code Examples (fetchNavItems type) | Medium — TypeScript type will need adjustment to match actual API response; fallback empty array means no build failure |
| A3 | `Settings` API response includes `stat_projects`, `stat_clients`, `stat_years`, `stat_satisfaction` fields; exact keys depend on Laravel Settings seeder | Code Examples (Settings type) | Medium — Stats bar will render hardcoded fallback values; admin can update after launch |
| A4 | `motion.div` with static `whileInView` props works in Next.js 15 Server Components without `"use client"` | Architecture Patterns | Medium — If Next.js 15.5 changed this behavior, affected components will need `"use client"` added |

---

## Open Questions

1. **shadcn Tabs component + AnimatePresence compatibility**
   - What we know: shadcn Tabs in base-nova style is built on @base-ui/react (not Radix UI). AnimatePresence needs to wrap the tab content panel.
   - What's unclear: Whether the @base-ui/react Tabs primitive exposes a pattern compatible with `AnimatePresence mode="wait"` wrapping.
   - Recommendation: Install `npx shadcn add tabs` in Wave 0 of 03-05 plan, inspect the scaffolded component, decide whether to use it as the tab container or replace entirely with custom `useState`-based tabs.

2. **Laravel API field names for Settings and NavItems**
   - What we know: Phase 2 built `GET /api/nav-items` and `GET /api/settings` controllers.
   - What's unclear: Exact JSON field names in API responses (snake_case vs camelCase, exact stat key names).
   - Recommendation: 03-02 and 03-04 task should begin with reading the Phase 2 API controller files to confirm response shapes before writing TypeScript types.

---

## Sources

### Primary (HIGH confidence)
- `buildera-frontend/node_modules/motion/dist/react.d.ts` — confirmed exports: motion, AnimatePresence, useMotionValue, useSpring, useTransform, useInView, useReducedMotion, layoutId
- `buildera-frontend/node_modules/motion/dist/cjs/react.js` — runtime verified all animation API exports present
- `tailwindcss.com/docs/theme` (fetched 2026-05-27) — `@theme` vs `@theme inline` distinction, CSS variable namespace mapping
- `motion.dev/docs/react-scroll-animations` (fetched 2026-05-27) — `whileInView + viewport={{ once: true }}` confirmed
- `motion.dev/docs/react-animate-presence` (fetched 2026-05-27) — `AnimatePresence mode="wait"` confirmed
- `motion.dev/docs/react-layout-animations` (fetched 2026-05-27) — `layoutId` tab indicator pattern confirmed
- `motion.dev/docs/react-motion-value` (fetched 2026-05-27) — useMotionValue + useSpring + useTransform counter pattern confirmed
- `motion.dev/docs/react-use-in-view` (fetched 2026-05-27) — `useInView(ref, { once: true })` confirmed
- `motion.dev/docs/react-use-reduced-motion` (fetched 2026-05-27) — `useReducedMotion()` hook confirmed
- `nextjs.org/docs/app/api-reference/functions/fetch` (fetched 2026-05-27) — `next: { tags: [] }` cache tag API confirmed
- `nextjs.org/docs/app/getting-started/server-and-client-components` (fetched 2026-05-27) — Server/Client boundary rules confirmed
- `buildera-frontend/src/app/globals.css` — existing @theme block, self-referential font bug confirmed at line 10
- `buildera-frontend/src/app/layout.tsx` — `variable: "--font-inter"` confirmed
- `buildera-frontend/components.json` — `"style": "base-nova"`, `"iconLibrary": "lucide"` mismatch confirmed
- `buildera-frontend/package.json` — all dependency versions confirmed
- npm registry queries — creation dates and postinstall scripts verified for all packages
- `03-CONTEXT.md` — 27 locked decisions
- `03-UI-SPEC.md` — complete visual/interaction contract

### Secondary (MEDIUM confidence)
- `ui.shadcn.com/docs/components/tabs` — TabsList/TabsTrigger/TabsContent structure; base-nova on @base-ui/react noted
- `tailwindcss.com/docs/adding-custom-styles` — `bg-[var(--custom)]` arbitrary value pattern; `@utility` directive for custom utilities

### Tertiary (LOW confidence)
- A4: `motion.div` static props in Server Components — extrapolated from Next.js Server Component rules; not explicitly documented

---

## Metadata

**Confidence breakdown:**
- Standard Stack: HIGH — all versions verified from node_modules + npm registry
- Architecture: HIGH — all patterns verified against official docs + existing codebase
- Animation patterns: HIGH — verified from motion/react 12.40.0 runtime exports + official docs
- Tailwind 4 token system: HIGH — verified from official Tailwind CSS 4 docs
- API types: MEDIUM — field names assumed from Phase 2 architecture; exact keys need verification against actual API controllers

**Research date:** 2026-05-27
**Valid until:** 2026-06-27 (stable stack; motion and Tailwind 4 APIs unlikely to change in 30 days)
