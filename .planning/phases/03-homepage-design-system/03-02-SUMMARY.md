---
phase: 03-homepage-design-system
plan: "02"
subsystem: frontend-nav
tags: [navigation, mega-dropdown, glassmorphism, mobile-drawer, server-components, animation]
dependency_graph:
  requires:
    - 03-01 (globals.css glass-nav utility, brand tokens, api.ts NavItem + fetchNavItems)
  provides:
    - SiteNav server shell (exports SERVICES_MENU const for reuse in ServicesTabSection plan 03-05)
    - SiteNavClient scroll glassmorphism + mega dropdown hover state
    - MegaDropdown 4-panel desktop dropdown (Services hardcoded, Solutions/Work/Resources from API)
    - MobileNavDrawer full-screen overlay with accordion groups + pinned CTA
    - layout.tsx SiteNav wired — nav visible on all pages
  affects:
    - All Phase 3-10 pages inherit SiteNav via layout.tsx
    - Plan 03-05 (ServicesTabSection) imports SERVICES_MENU from SiteNav.tsx
tech_stack:
  added: []
  patterns:
    - Server shell + Client component split for nav (SiteNav fetches data, SiteNavClient handles state)
    - 150ms hover delay via setTimeout + useRef cancel pattern (D-13)
    - AnimatePresence wrap for MegaDropdown enter/exit animation
    - AnimatePresence wrap for MobileNavDrawer slide-from-right + backdrop
    - Single accordion group state (openGroup) — only one group open at a time
    - Passive scroll listener for glassmorphism threshold at 50px
key_files:
  created:
    - buildera-frontend/src/components/layout/SiteNav.tsx
    - buildera-frontend/src/components/layout/SiteNavClient.tsx
    - buildera-frontend/src/components/layout/MegaDropdown.tsx
    - buildera-frontend/src/components/layout/MobileNavDrawer.tsx
  modified:
    - buildera-frontend/src/app/layout.tsx
decisions:
  - "SERVICES_MENU typed as readonly ServiceMenuItem[] with exported ServiceMenuItem interface — enables typed import in ServicesTabSection (plan 03-05)"
  - "MegaDropdown created as regular component rendered inside SiteNavClient — receives props only, no data fetching, works as part of the client component tree"
  - "ACCORDION_GROUPS const removed in favor of inline union type — eliminates ESLint no-unused-vars warning while preserving type safety"
  - "Work/Resources panels show hardcoded fallback links when API returns empty — prevents empty panels at build time when backend is not yet running"
metrics:
  duration_minutes: 20
  completed_date: "2026-05-27"
  tasks_completed: 2
  tasks_total: 2
  files_created: 4
  files_modified: 1
---

# Phase 3 Plan 2: SiteNav Component System Summary

**One-liner:** SiteNav server shell fetches nav items at build time, SiteNavClient handles scroll glassmorphism (50px) + 150ms-delayed mega dropdown with 4 panels, MobileNavDrawer slides from right with accordion groups and pinned CTA, wired into layout.tsx for site-wide visibility.

## Tasks Completed

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create SiteNav server shell + SiteNavClient + MegaDropdown + MobileNavDrawer | 350b06e | SiteNav.tsx, SiteNavClient.tsx, MegaDropdown.tsx, MobileNavDrawer.tsx |
| 2 | Wire SiteNav into layout.tsx + fix lint warning | 1ca315b | layout.tsx, MobileNavDrawer.tsx |

## What Was Built

### Task 1: Navigation Component System

**SiteNav.tsx (Server Component):**
- Async Server Component — calls `fetchNavItems()` at build time with `nav-items` cache tag
- Defines and exports `SERVICES_MENU` const (6 categories: Website Dev, Salesforce Dev, DevOps Dev, AI Agent Dev, Software Dev, Hire a Developer) with category, icon string, slug, and subServices array
- Exports `ServiceMenuItem` interface for typed imports in downstream plans (03-05 ServicesTabSection)
- Renders `<header className="fixed top-0 left-0 right-0 z-50">` shell, passes data to SiteNavClient as props

**SiteNavClient.tsx (Client Component):**
- `"use client"` as first line
- useState: isScrolled, activeDropdown, isMobileOpen
- useEffect with passive scroll listener — sets isScrolled when `window.scrollY > 50`
- cn() conditional: `glass-nav` (from globals.css utility) when scrolled, `bg-transparent` when not, with `transition-all duration-300`
- 150ms hover delay: `setTimeout` in `handleNavMouseEnter`, stored in `useRef<ReturnType<typeof setTimeout>>`, cleared in `handleNavMouseLeave` to prevent accidental trigger when cursor passes through
- Desktop nav: 4 panel buttons (Services, Solutions, Work, Resources) with hover handlers
- Right: "Book a Call" Link to `/book-a-call` with `bg-[var(--brand-primary)]`, hidden on mobile
- Mobile hamburger: `IconMenu2` from `@tabler/icons-react`, lg:hidden
- Renders MegaDropdown with `activePanel`, mouse handlers for dropdown persistence
- Renders MobileNavDrawer with `isOpen/onClose` toggle

**MegaDropdown.tsx (Component in client tree):**
- Wrapped in `AnimatePresence` — `motion.div` with `initial={{ opacity: 0, y: -8 }}`, `animate={{ opacity: 1, y: 0 }}`, `exit={{ opacity: 0, y: -8 }}`, `transition={{ duration: 0.2 }}`
- Full-width panel: `absolute left-0 right-0 top-full bg-white border-t border-border shadow-lg`
- Inner constrained: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8`
- Services panel: 3-column grid, Tabler icon + category link + sub-service list per category
- Icon mapping: `ICON_MAP` object maps icon string names to Tabler icon components
- Solutions panel: 4-column grid of tiles from navItems filtered by `group === 'solutions'`
- Work/Resources panels: link lists from navItems filtered by group, with hardcoded fallbacks when API returns empty
- `onMouseEnter/onMouseLeave` props keep dropdown alive when hovering panel

**MobileNavDrawer.tsx (Client Component):**
- `"use client"` as first line
- `AnimatePresence` wraps conditional render
- Backdrop: `motion.div fixed inset-0 bg-black/50 z-40`, `onClick={onClose}`
- Drawer: `motion.div fixed top-0 right-0 h-full w-full max-w-sm bg-background z-50`, slides via `initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}`, `transition: { duration: 0.35, ease: "easeOut" }`
- Header: IconX (close, left) + Buildera logo link (right)
- 4 accordion groups: Services (from servicesMenu), Solutions/Work/Resources (from navItems with fallbacks)
- Single openGroup state — clicking an open group closes it (null), clicking closed group opens it
- Accordion height animation: `initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}`
- All nav links call `onClose()` to close drawer on navigation
- Pinned footer: "Book a Free Call" Link to `/book-a-call` with `mt-auto` + `bg-[var(--brand-primary)]`
- All interactive elements have `min-h-[48px]`

### Task 2: layout.tsx Integration

- Added `import { SiteNav } from "@/components/layout/SiteNav"` to layout.tsx
- SiteNav rendered between skip-to-content link and `<main>` element
- SiteNav now renders on every page in the app

## Verification

- `npx tsc --noEmit`: 0 errors
- `npm run build`: exit 0, 6 static pages generated, no warnings after ACCORDION_GROUPS fix

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Removed unused ACCORDION_GROUPS const in MobileNavDrawer.tsx**
- **Found during:** Task 2 — `npm run build` ESLint lint pass reported `@typescript-eslint/no-unused-vars` warning
- **Issue:** `ACCORDION_GROUPS` was defined as `const` but only used to derive the type via `typeof` — ESLint flags const-only-used-as-type as unused
- **Fix:** Replaced with inline union type `type AccordionGroup = "Services" | "Solutions" | "Work" | "Resources"` which is equivalent and eliminates the warning
- **Files modified:** MobileNavDrawer.tsx
- **Commit:** 1ca315b

## Known Stubs

None — SiteNav renders correctly with hardcoded Services data and graceful empty fallbacks for Solutions/Work/Resources panels when API is unavailable at build time.

## Threat Flags

None. NavItem.url values are rendered via `next/link` Link component (handles routing internally). NavItem.label values rendered as text content (React auto-escapes). SERVICES_MENU is hardcoded in source — not user-modifiable. No new network endpoints or auth paths introduced.

## Self-Check: PASSED

Files found:
- FOUND: buildera-frontend/src/components/layout/SiteNav.tsx
- FOUND: buildera-frontend/src/components/layout/SiteNavClient.tsx
- FOUND: buildera-frontend/src/components/layout/MegaDropdown.tsx
- FOUND: buildera-frontend/src/components/layout/MobileNavDrawer.tsx
- FOUND: buildera-frontend/src/app/layout.tsx

Commits verified:
- FOUND: 350b06e (Task 1)
- FOUND: 1ca315b (Task 2)
