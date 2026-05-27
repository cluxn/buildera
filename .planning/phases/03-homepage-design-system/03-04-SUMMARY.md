---
phase: 03-homepage-design-system
plan: "04"
subsystem: frontend-hero-stats
tags: [hero, animation, word-reveal, css-orbs, svg-illustration, stats-bar, counter, motion, server-components]
dependency_graph:
  requires:
    - 03-01 (globals.css hero-orb-1/hero-orb-2/hero-illustration CSS classes, brand tokens, motion setup)
    - 03-02 (layout.tsx SiteNav wired, dependency context)
    - 03-03 (layout.tsx SiteFooter wired, dependency context)
  provides:
    - HeroSection Server Component shell (2-column layout, CSS orbs, inline SVG illustration, CTAs, badge strip)
    - HeroHeadline Client Component (word-by-word motion.span reveal on mount)
    - StatsBadgeStrip Server Component (3 inline badges with IconCheck)
    - StatsBarSection Server Component shell (blue bar, 4 AnimatedCounter instances)
    - AnimatedCounter Client Component (useMotionValue + useSpring + useInView + reduced-motion support)
  affects:
    - Plan 03-06 (page.tsx assembly imports HeroSection and StatsBarSection)
tech_stack:
  added: []
  patterns:
    - Server Component shell + Client Component child split (HeroSection -> HeroHeadline)
    - Server Component shell + Client Component child split (StatsBarSection -> AnimatedCounter)
    - motion.span animate (not whileInView) for above-fold hero headline reveal
    - useMotionValue + useSpring (stiffness 60 damping 20) + useTransform for count-up animation
    - useInView gate (once: true) prevents count.set before element is visible (Pitfall 9)
    - useReducedMotion check — instant set when user prefers reduced motion
    - Inline SVG illustration with CSS animateOpacity nodes — no external image file (D-06)
key_files:
  created:
    - buildera-frontend/src/components/sections/HeroSection.tsx
    - buildera-frontend/src/components/sections/HeroHeadline.tsx
    - buildera-frontend/src/components/sections/StatsBadgeStrip.tsx
    - buildera-frontend/src/components/sections/StatsBarSection.tsx
    - buildera-frontend/src/components/ui/AnimatedCounter.tsx
  modified: []
decisions:
  - "Button asChild pattern not available in @base-ui/react Button — CTAs implemented as styled Link elements directly (inline-flex rounded-lg with brand-primary bg) to preserve type safety and avoid prop mismatch"
  - "parseInt fallback added to StatsBarSection (|| defaultValue) to mitigate T-03-10 — NaN from non-numeric settings values renders safe default instead of 'NaN+'"
  - "HeroSection uses motion from motion/react with static initial/animate props — Server Component compatible (no hooks)"
metrics:
  duration_minutes: 18
  completed_date: "2026-05-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 3 Plan 4: Hero Section + Stats Bar Summary

**One-liner:** HeroSection Server shell with word-by-word headline reveal, CSS floating orbs, inline SVG tech illustration, dual CTAs, social proof badge strip, and StatsBarSection with 4 spring-animated counters gated by useInView and reduced-motion support.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create HeroSection, HeroHeadline, StatsBadgeStrip | 7e87dd4 | HeroSection.tsx, HeroHeadline.tsx, StatsBadgeStrip.tsx |
| 2 | Create StatsBarSection + AnimatedCounter | 5fc2e8f | StatsBarSection.tsx, AnimatedCounter.tsx |

## What Was Built

### Task 1: Hero Components

**HeroSection.tsx (Server Component — no "use client"):**
- `relative min-h-screen flex items-center overflow-hidden bg-background` section
- Two decorative orb divs: `className="hero-orb-1"` + `className="hero-orb-2"` with `aria-hidden="true"` (CSS keyframe animations defined in globals.css 03-01)
- `max-w-7xl mx-auto` container with `relative z-10` to layer above orbs
- `grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-24` content grid
- Left column (`flex flex-col gap-6`): HeroHeadline → sub-headline with motion delay 0.6s → CTA buttons row with motion delay 0.8s → StatsBadgeStrip with motion delay 1.0s
- CTAs: "Book a Free Call" (→ `/book-a-call`, `bg-[var(--brand-primary)] text-white`) and "View Our Services" (→ `/services`, outline style). Both use styled Link (not Button asChild — see Deviations)
- Right column (`hidden lg:flex`): inline SVG 400×400 viewBox with 7 connected nodes, bezier connection lines, code bracket characters, floating animated dots (native SVG `<animate>`) — all using `stroke/fill="var(--brand-primary)"`. Wrapped in `hero-illustration` class div for CSS float animation.

**HeroHeadline.tsx ("use client" as first line):**
- Imports `motion` from `motion/react`
- `const HEADLINE = "We Build What Your Business Needs to Grow"` split into words array
- h1 with `text-[2.5rem] lg:text-[3.75rem] font-bold tracking-tight text-foreground leading-[1.1]`
- Each word: `motion.span` with `initial={{ opacity: 0, y: 20 }}`, `animate={{ opacity: 1, y: 0 }}`, `transition={{ delay: index * 0.07, duration: 0.4, ease: "easeOut" }}`
- Uses `animate` (mount-triggered), NOT `whileInView` — above fold, immediate reveal on page load

**StatsBadgeStrip.tsx (Server Component — no "use client"):**
- `flex flex-wrap gap-3 items-center text-sm text-muted-foreground` container
- 3 badge items each: `flex items-center gap-1.5` with `<IconCheck className="size-3.5 text-[var(--brand-primary)]" />` from `@tabler/icons-react` + text
- Badges separated by middot `span` with `mx-1 text-border` class
- Content: "150+ Projects Delivered", "50+ Happy Clients", "98% Client Satisfaction"

### Task 2: Stats Bar Components

**AnimatedCounter.tsx ("use client" as first line):**
- Imports: `useEffect`, `useRef` from react; `useMotionValue`, `useSpring`, `useTransform`, `useInView`, `useReducedMotion`, `motion` from `motion/react`
- Props: `target: number`, `suffix?: string` (default ""), `delay?: number` (default 0)
- `useRef<HTMLSpanElement>(null)` for scroll tracking
- `useInView(ref, { once: true })` — Pitfall 9 gate: count.set only fires when element is in viewport
- `useReducedMotion()` — instant set when user prefers reduced motion
- `useMotionValue(0)` → `useSpring(count, { stiffness: 60, damping: 20 })` → `useTransform(spring, (v) => \`\${Math.round(v)}\${suffix}\`)`
- `useEffect` gated on `[isInView, prefersReducedMotion]`: if prefersReducedMotion → `count.set(target)` immediately; else `setTimeout(() => count.set(target), delay * 1000)`
- Renders `motion.span` with `ref`, `className="text-[3.75rem] font-bold text-white"`, children = rounded MotionValue

**StatsBarSection.tsx (Server Component — no "use client"):**
- Imports `AnimatedCounter` from `@/components/ui/AnimatedCounter`, `motion` from `motion/react`, `type Settings` from `@/lib/api`
- Props: `settings: Settings`
- Parses 4 stat values: `parseInt(settings.stat_projects) || 150` etc. with safe fallbacks (T-03-10 mitigation)
- `motion.section` with `className="bg-[var(--brand-primary)] py-12 lg:py-16"`, `initial={{ opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true }}`, `transition={{ duration: 0.5 }}`
- "Trusted Results" eyebrow label (`text-xs font-medium uppercase tracking-widest text-white/60`)
- `grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white` stats grid
- Each stat: div → `<AnimatedCounter target={stat.target} suffix={stat.suffix} delay={index * 0.2} />` → `<p className="text-sm font-medium text-white/80 mt-2">{stat.label}</p>`

## Verification

- `npx tsc --noEmit`: 0 errors (after fixing Button asChild prop mismatch — see Deviations)
- `npm run build`: exit 0, 6 static pages generated, no warnings

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Button asChild prop not available in @base-ui/react Button**
- **Found during:** Task 1 — `npx tsc --noEmit` reported TS2322: Property 'asChild' does not exist on Button props
- **Issue:** The plan spec called for `<Button asChild size="lg">` pattern, but the Button component uses `@base-ui/react/button` which does not expose an `asChild` prop (this is a Radix UI / shadcn vanilla pattern, not @base-ui)
- **Fix:** Replaced both CTA buttons with styled `<Link>` elements using equivalent Tailwind classes: `inline-flex items-center justify-center rounded-lg bg-[var(--brand-primary)] text-white font-medium text-sm px-6 min-h-[48px] transition-all` — functionally equivalent, type-safe, no prop mismatch
- **Files modified:** HeroSection.tsx
- **Commit:** 7e87dd4

**2. [Rule 2 - Missing Critical Functionality] parseInt NaN fallback for stat values**
- **Found during:** Task 2 — reviewing T-03-10 threat model entry for "parseInt returns NaN for non-numeric"
- **Issue:** Plan spec noted NaN would render "NaN+" which is "ugly but not dangerous." Per threat model mitigate disposition, added safe fallback
- **Fix:** Changed `parseInt(settings.stat_X)` to `parseInt(settings.stat_X) || defaultValue` in StatsBarSection stats array construction
- **Files modified:** StatsBarSection.tsx
- **Commit:** 5fc2e8f

## Known Stubs

None — all components render with real data from Settings API (passed via props from page.tsx in 03-06) or safe hardcoded fallbacks. No UI elements show placeholder content.

## Threat Flags

None. All SVG content hardcoded JSX (T-03-11 accepted). Settings stat values sanitized via parseInt + fallback (T-03-10 mitigated). No new network endpoints introduced.

## Self-Check: PASSED

Files verified:
- FOUND: buildera-frontend/src/components/sections/HeroSection.tsx
- FOUND: buildera-frontend/src/components/sections/HeroHeadline.tsx
- FOUND: buildera-frontend/src/components/sections/StatsBadgeStrip.tsx
- FOUND: buildera-frontend/src/components/sections/StatsBarSection.tsx
- FOUND: buildera-frontend/src/components/ui/AnimatedCounter.tsx

Commits verified:
- FOUND: 7e87dd4 (Task 1)
- FOUND: 5fc2e8f (Task 2)
