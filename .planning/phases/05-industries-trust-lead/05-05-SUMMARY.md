---
plan: "05-05"
phase: 5
status: complete
completed: "2026-05-28"
---

# 05-05 Summary — Popups + NudgeBanner

## What Was Built

### Task 05-05-01: ExitIntentPopup + IdlePopup + PopupManager
- `ExitIntentPopup.tsx` — "use client"; fires only when clientY <= 0 (top exit); sessionStorage checked BEFORE listener registration; AnimatePresence exit animation; MiniLeadForm embedded; Escape + backdrop close
- `IdlePopup.tsx` — "use client"; 45s idle timer (mouse/key/click/scroll/touch events reset it); sessionStorage guard before setup; same modal UI; MiniLeadForm embedded
- `PopupManager.tsx` — "use client"; single settings fetch; both popups gated on popup_exit_enabled / popup_idle_enabled (both false by default)
- `api.ts` — added popup_exit_*, popup_idle_*, nudge_banner_* fields to Settings interface and SETTINGS_FALLBACK

### Task 05-05-02: NudgeBanner + layout update
- `NudgeBanner.tsx` — "use client"; admin-toggled; date-gated via nudge_banner_expires_at; sessionStorage dismiss; renders null when disabled/expired/empty
- `layout.tsx` — NudgeBanner before SiteNav (top of page), PopupManager after FloatingCTA (end of body)

## Final layout.tsx body order
NudgeBanner → SiteNav → {children} → SiteFooter → WhatsAppWidget → FloatingCTA → PopupManager

## Commits
- `a2209ba` feat(05-05): ExitIntentPopup, IdlePopup, PopupManager + api.ts popup fields
- `50402f1` feat(05-05): NudgeBanner + layout

## Self-Check
- [x] All components have "use client"
- [x] sessionStorage checked BEFORE event listener registration in both popups
- [x] Exit intent fires only on clientY <= 0 (top exit)
- [x] AnimatePresence wraps conditional modal in both popups
- [x] All motion imports from "motion/react"
- [x] SETTINGS_FALLBACK has all new fields with safe defaults (false / '')
- [x] NudgeBanner renders null when disabled, expired, or text empty
- [x] No STATE.md or ROADMAP.md modifications

## Self-Check: PASSED
