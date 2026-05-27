---
phase: 03-homepage-design-system
plan: "05"
subsystem: frontend-services-solutions-logos
tags: [services-tab, animated-tab-switcher, AnimatePresence, layoutId, solutions-grid, diagonal-stagger, client-logos, marquee, server-components, motion]
dependency_graph:
  requires:
    - 03-01 (globals.css marquee-track/logo-item CSS classes, brand tokens)
    - 03-02 (SERVICES_MENU exported from SiteNav.tsx — data reference for tab categories)
    - 03-03 (layout.tsx context)
  provides:
    - ServicesTabSection Client Component (6-tab AnimatePresence switcher with layoutId underline)
    - ServiceCard Server Component (sub-service card with hover lift + border glow)
    - SolutionsGridSection Server Component (18-tile diagonal stagger grid)
    - SolutionTile Server Component (icon + name tile linking to /solutions/{slug})
    - ClientLogosMarquee Server Component (pure CSS infinite scroll with 8 placeholder logos)
  affects:
    - Plan 03-06 (page.tsx assembly imports all 5 components from this plan)
tech_stack:
  added: []
  patterns:
    - AnimatePresence mode="wait" with key={activeTab} for cross-fade tab content (Pitfall 6)
    - layoutId="tab-indicator" motion.div for spring-animated sliding underline between tabs
    - overflow-x-auto snap-x tab bar for mobile horizontal scroll (D-18)
    - Diagonal cascade stagger: delay (colIndex + rowIndex) * 0.05 for 4-col grid
    - Pure CSS marquee via .marquee-track class — no JS, no motion import (D-23)
    - Logo duplication in JSX for seamless CSS loop (not JS array manipulation)
    - Server Component with motion.div static props (no hooks needed — works without use client)
key_files:
  created:
    - buildera-frontend/src/components/sections/ServicesTabSection.tsx
    - buildera-frontend/src/components/ui/ServiceCard.tsx
    - buildera-frontend/src/components/sections/SolutionsGridSection.tsx
    - buildera-frontend/src/components/ui/SolutionTile.tsx
    - buildera-frontend/src/components/sections/ClientLogosMarquee.tsx
  modified: []
decisions:
  - "ServicesTabSection defines its own SERVICES_DATA const with full sub-service descriptions rather than importing/re-exporting SERVICES_MENU from SiteNav — cleaner separation of concerns; navigation menu uses string slugs only, tab section needs icon component refs and descriptions"
  - "ServiceCard renders as Link (not motion.a) with CSS hover classes — motion hover lift not needed since parent ServicesTabSection already handles card enter animations; CSS transition-all duration-200 provides smooth hover"
  - "SolutionTile icon rendered as ReactNode prop rather than component ref — SolutionsGridSection passes pre-instantiated JSX icons for cleaner Server Component composition"
  - "ClientLogosMarquee eyebrow text moved into a centered paragraph inside max-w-7xl container, then marquee outside container — gives full-bleed scroll without clipping logos at edge while keeping text aligned with page grid"
metrics:
  duration_minutes: 12
  completed_date: "2026-05-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 0
---

# Phase 3 Plan 5: Services Tab Section + Solutions Grid + Client Logos Summary

**One-liner:** ServicesTabSection "use client" with AnimatePresence cross-fade and layoutId sliding underline; SolutionsGridSection Server Component with 18 SOL-03 tiles and diagonal cascade stagger; ClientLogosMarquee pure-CSS infinite scroll with 8 placeholder SVG logos.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create ServicesTabSection + ServiceCard | 68601fd | ServicesTabSection.tsx, ServiceCard.tsx |
| 2 | Create SolutionsGridSection + SolutionTile + ClientLogosMarquee | e5ddcf7 | SolutionsGridSection.tsx, SolutionTile.tsx, ClientLogosMarquee.tsx |

## What Was Built

### Task 1: Services Tab Section + ServiceCard

**ServicesTabSection.tsx ("use client" as first line):**
- `useState(0)` for activeTab index
- SERVICES_DATA const with all 6 categories, icon component refs (not string names), and full sub-service data
- Each sub-service has a genuine 1-sentence SMB-relevant description
- Tab bar: `relative flex gap-1 overflow-x-auto snap-x pb-2 mb-8` with scrollbar-hidden CSS
- Each tab button: `relative px-4 py-2 min-h-[48px]` with cn() conditional active/inactive classes; shows Tabler icon + category name
- Active tab: `motion.div layoutId="tab-indicator"` positioned absolute bottom-0 with `h-0.5 bg-[var(--brand-primary)]`, spring stiffness 500 damping 40
- `AnimatePresence mode="wait"` wraps `motion.div key={activeTab}` — key changes on every tab click (Pitfall 6 compliance)
- Exit animation: `exit={{ opacity: 0, scale: 0.95, y: 8 }}`, duration 0.15 ease easeIn
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- Each card wrapped in motion.div: `initial={{ opacity: 0, scale: 0.97, y: 12 }}`, `animate={{ opacity: 1, scale: 1, y: 0 }}`, `transition={{ delay: index * 0.05, duration: 0.25, ease: "easeOut" }}`
- Footer: "Explore All Services →" link to /services

**ServiceCard.tsx (Server Component — no "use client"):**
- Props: name, slug, parentSlug, description?, icon (ReactNode), className?
- Renders as `<Link href="/services/{parentSlug}">` — links to category page
- CSS hover: `hover:shadow-[0_0_0_2px_var(--brand-primary)] hover:-translate-y-1 transition-all duration-200`
- Content: icon at top, bold title (font-semibold text-sm), 1-line description (text-xs line-clamp-1), "Learn More →" at bottom (mt-auto)

### Task 2: Solutions Grid + Solution Tile + Client Logos

**SolutionsGridSection.tsx (Server Component — no "use client"):**
- All 18 SOL-03 solutions: Operations Mgmt, Vendor Mgmt, OTA Channel Partner, Supply Chain, Project Mgmt, Accounting Mgmt, Warehouse Mgmt, Hotels & Resorts, Financial Mgmt, Fleet Mgmt, Airbnb & Vacation Rental, HR Mgmt, Lead Mgmt, Sales Mgmt, CRM, India Mart Automation, ERP, Manufacturing/Production
- Each solution: unique Tabler icon from @tabler/icons-react, kebab-case slug
- Section background: `bg-[var(--brand-surface)]`
- Eyebrow: "Problems We Solve" / H2: "Find the Solution to Your Problem"
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
- Diagonal stagger per tile: `delay: (colIndex + rowIndex) * 0.05`, duration 0.35, ease easeOut
- Footer: "View All Solutions →" link to /solutions

**SolutionTile.tsx (Server Component — no "use client"):**
- Props: name, slug, icon (ReactNode), className?
- `<Link href="/solutions/{slug}">` with `flex items-center gap-3 p-3 rounded-lg border border-border bg-card`
- CSS hover: `hover:shadow-[0_0_0_2px_var(--brand-primary)] hover:-translate-y-1 transition-all duration-200`
- Icon: `size-5 text-[var(--brand-primary)]`, Name: `text-sm font-medium text-foreground`

**ClientLogosMarquee.tsx (Server Component — no "use client", no motion import):**
- LOGOS const: 8 placeholder logo objects with inline SVG JSX
- SVGs: abstract company logo shapes (circles, rectangles, H shape, ellipse, diamond, etc.) in neutral gray (#94a3b8, #cbd5e1) at 120x40 viewBox with abstract company names
- Eyebrow: "Trusted by businesses across India" (centered, inside max-w-7xl container)
- Marquee container: `aria-hidden="true"` (decorative), `overflow-hidden`
- Inner div: `className="marquee-track"` (pure CSS animation from globals.css)
- Logos rendered twice: `[...LOGOS, ...LOGOS].map` for seamless CSS loop
- Each logo: `className="logo-item mx-8 flex-shrink-0 flex items-center h-12"`

## Verification

- `npx tsc --noEmit`: 0 errors (Task 1 verification)
- `npm run build`: exit 0, 6 static pages generated, no warnings (Task 2 verification)

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

**ClientLogosMarquee placeholder logos:** 8 inline SVG logos use abstract geometric shapes with invented company names (Nexova, Trilvex, Quorix, Ventara, Solkraft, Bytelink, Halvex, Orbisen). These are intentional visual stubs for Phase 3 — real client logos with written permission will be substituted before Phase 10 deploy. The section heading "Trusted by businesses across India" is accurate marketing copy regardless of placeholder status, as it reflects Buildera's real client base; only the logo visuals are placeholders.

## Threat Flags

None. All content hardcoded JSX (T-03-14 accepted per threat model). All link destinations are hardcoded relative paths (T-03-13 accepted). No user input, no external SVG sources, no new network endpoints.

## Self-Check: PASSED

Files verified:
- FOUND: buildera-frontend/src/components/sections/ServicesTabSection.tsx
- FOUND: buildera-frontend/src/components/ui/ServiceCard.tsx
- FOUND: buildera-frontend/src/components/sections/SolutionsGridSection.tsx
- FOUND: buildera-frontend/src/components/ui/SolutionTile.tsx
- FOUND: buildera-frontend/src/components/sections/ClientLogosMarquee.tsx

Commits verified:
- FOUND: 68601fd (Task 1 — ServicesTabSection + ServiceCard)
- FOUND: e5ddcf7 (Task 2 — SolutionsGridSection + SolutionTile + ClientLogosMarquee)
