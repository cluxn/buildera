---
phase: 3
slug: homepage-design-system
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-27
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — visual/interaction UI phase; TypeScript build is the automated gate |
| **Config file** | `buildera-frontend/tsconfig.json` |
| **Quick run command** | `cd buildera-frontend && npx tsc --noEmit` |
| **Full suite command** | `cd buildera-frontend && npm run build` |
| **Estimated runtime** | ~30–60 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit` (TypeScript type check)
- **After every plan wave:** Run `npm run build` (full static generation + type check)
- **Before `/gsd:verify-work`:** Full build must be green
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | DESIGN-01 | — | N/A | build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | DESIGN-02 | — | N/A | build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 2 | NAV-01→03 | — | No user-controlled hrefs | manual + build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 2 | NAV-04→06 | — | No dangerouslySetInnerHTML | manual + build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-04-01 | 04 | 3 | HOME-01, HOME-04 | — | N/A | manual + build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-05-01 | 05 | 3 | HOME-02, HOME-03, COMP-02 | — | N/A | manual + build | `npm run build` | ❌ W0 | ⬜ pending |
| 03-06-01 | 06 | 3 | HOME-05→07, COMP-03, COMP-06 | — | N/A | manual + build | `npm run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements — `npm run build` is the automated gate.
- No test framework installation needed (visual phase, no business logic).
- The `buildera-frontend` directory already has a working Next.js build config.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sticky nav glass effect activates at ~50px scroll | NAV-01 | Scroll interaction; no automated test possible | Open homepage, scroll down 50px, verify nav becomes frosted glass |
| Mega dropdown renders all 4 groups on hover | NAV-02 | Hover interaction | Hover over Services/Solutions/Work/Resources on desktop |
| Mobile drawer opens/closes with accordion | NAV-03 | Touch/click interaction | Resize to <768px, tap hamburger, verify full-screen overlay |
| Footer renders multi-column layout | NAV-04 | Static render | Verify 3-column footer on desktop, stacked on mobile |
| Hero headline word-by-word animation | HOME-01 | Mount animation | Load homepage, verify words fade + slide up sequentially |
| Stats counters animate on scroll-into-view | HOME-04 | Scroll interaction | Scroll to stats bar, verify counters count up from 0 |
| Logo marquee scrolls continuously | COMP-02 | CSS animation | Verify logos scroll infinitely without gap, grayscale default |
| Glassmorphism visible on nav + stat cards | DESIGN-04 | CSS visual | Verify backdrop-filter blur + subtle blue-tinted border visible |
| Services tab switching with card animation | HOME-02 | AnimatePresence interaction | Click each of 6 tabs, verify old cards fade out / new fade in |
| Solutions grid scroll-triggered stagger | HOME-03 | Scroll interaction | Scroll to solutions section, verify cards stagger in |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (no W0 test files needed — npm run build is the gate for this visual phase)
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-05-27
