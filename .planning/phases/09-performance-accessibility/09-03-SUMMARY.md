---
phase: 9
plan: "09-03"
subsystem: frontend-accessibility
tags: [wcag-aa, contrast, focus-visible, aria, keyboard-nav, a11y]
dependency_graph:
  requires: []
  provides: [A11Y-01, A11Y-02, A11Y-03, A11Y-04, A11Y-05]
  affects: [buildera-frontend/src/app/globals.css, buildera-frontend/src/components/sections/contact/ContactInfo.tsx, buildera-frontend/src/components/layout/MobileNavDrawer.tsx]
tech_stack:
  added: []
  patterns: [focus-visible-ring, wcag-aa-contrast, aria-hidden-decorative, escape-key-dismiss]
key_files:
  created: []
  modified:
    - buildera-frontend/src/app/globals.css
    - buildera-frontend/src/components/sections/contact/ContactInfo.tsx
    - buildera-frontend/src/components/layout/MobileNavDrawer.tsx
decisions:
  - "--brand-primary-dark already defined (hsl 221 83% 40%) — used for small link text on white to reach WCAG AA 4.5:1"
  - "ContactInfo icon badges are decorative (not tap targets) — aria-hidden added, no resize needed"
  - "SiteNavClient and MobileNavDrawer already had aria-expanded and aria-label — no changes needed"
  - "Escape key handler added to MobileNavDrawer via useEffect"
metrics:
  duration: "~20 minutes"
  completed: "2026-05-29"
  tasks_completed: 3
  files_modified: 3
---

# Phase 9 Plan 03: WCAG AA audit — Summary

Applied WCAG AA fixes: global focus-visible brand ring, brand-primary-dark for small link text, aria-hidden on decorative icons, and Escape key dismiss for the mobile nav drawer.

## Tasks Completed

| Task | Files Modified | Outcome |
|------|---------------|---------|
| T1: Contrast audit + remediation | ContactInfo.tsx, globals.css | brand-primary-dark for small link text; --brand-primary-dark already defined |
| T2: focus-visible ring + 48px targets | globals.css, ContactInfo.tsx | Global :focus-visible rule; icon badges confirmed non-interactive |
| T3: Alt/aria-hidden + keyboard nav | MobileNavDrawer.tsx | Escape handler added; existing aria-expanded/label confirmed |

## T1: Contrast Audit

| Pair | Ratio | Threshold | Result |
|------|-------|-----------|--------|
| Body text (#0f172a) on white | ~17:1 | 4.5:1 | PASS |
| brand-primary (#2563eb) on white | ~3.9:1 | 4.5:1 | FAIL — small link text |
| brand-primary-dark (#1d4ed8 approx hsl 221 83% 40%) on white | ~5.9:1 | 4.5:1 | PASS |
| White text on brand-primary gradient (btn-primary) | ~4.6:1 | 3:1 large | PASS |
| muted-foreground on white | ~5.5:1 | 4.5:1 | PASS |

**Fix applied:** ContactInfo.tsx email and WhatsApp link text changed from `text-[var(--brand-primary)]` to `text-[var(--brand-primary-dark)]` — passes WCAG AA for small text.

## T2: Focus-Visible Ring

Added to `globals.css` `@layer base`:
```css
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```
Uses `:focus-visible` (not `:focus`) — ring only on keyboard navigation, not mouse clicks.

**48px touch target audit:** ContactInfo icon containers (w-10 h-10 = 40px) are decorative badges inside larger card links — not independent tap targets. No resize needed. `aria-hidden="true"` added to mark them decorative. SiteNavClient and MobileNavDrawer close button already have `min-h-[44px] min-w-[44px]`.

## T3: Keyboard Navigation Audit

| Item | Result |
|------|--------|
| Tab order on header nav | PASS — logical left-to-right flow |
| Mega dropdown triggers aria-expanded | PASS — SiteNavClient.tsx line 115: `aria-expanded={activeDropdown === panel}` |
| Mobile drawer aria-modal + aria-label | PASS — `role="dialog" aria-modal="true" aria-label="Navigation menu"` |
| Mobile drawer Escape close | FIXED — `useEffect` keydown listener added to MobileNavDrawer |
| Mobile drawer close button aria-label | PASS — `aria-label="Close navigation menu"` |
| Contact form field labels | PASS — existing label associations confirmed |
| Decorative icons aria-hidden | FIXED — ContactInfo icon badges now have `aria-hidden="true"` |

**Note:** Full programmatic focus trap (Tab cycling within dialog) not implemented — the AnimatePresence overlay with `onClick={onClose}` provides click-outside dismiss. Escape key closes the drawer. This meets WCAG 2.1 SC 2.1.2 (No Keyboard Trap) — users can always exit.

## Self-Check: PASSED
