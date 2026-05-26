---
phase: 1
slug: project-foundation
status: approved
nyquist_compliant: true
wave_0_complete: true
created: 2026-05-26
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual CLI verification (scaffolding phase — no unit tests yet) |
| **Config file** | none — Wave 0 installs |
| **Quick run command** | `npm run dev` (frontend) / `php artisan serve` (backend) |
| **Full suite command** | `npm run build && php artisan migrate:fresh && curl http://localhost:8000/api/health` |
| **Estimated runtime** | ~60 seconds |

---

## Sampling Rate

- **After every task commit:** Run quick scaffold check (file exists + no syntax errors)
- **After every plan wave:** Run `npm run dev` and `php artisan serve`
- **Before `/gsd:verify-work`:** Full suite must be green (build succeeds, migrations clean, health endpoint returns 200)
- **Max feedback latency:** 60 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | — | N/A | manual | `npm run dev` exits 0 | ✅ W0 | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-04 | — | N/A | manual | `npm run build` exits 0 | ✅ W0 | ⬜ pending |
| 1-02-01 | 02 | 1 | FOUND-02 | — | N/A | manual | `php artisan serve` exits 0 | ✅ W0 | ⬜ pending |
| 1-02-02 | 02 | 1 | FOUND-05 | — | N/A | manual | CORS headers present on /api/health | ✅ W0 | ⬜ pending |
| 1-03-01 | 03 | 2 | INFRA-01 | — | N/A | manual | `php artisan migrate:fresh` exits 0 | ✅ W0 | ⬜ pending |
| 1-04-01 | 04 | 2 | INFRA-02 | — | N/A | manual | `GET /api/health` returns `{"status":"ok"}` | ✅ W0 | ⬜ pending |
| 1-04-02 | 04 | 2 | INFRA-03 | — | N/A | manual | Missing env var → app refuses to start with clear error | ✅ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure: no test framework needed — validation is CLI-driven (npm/artisan commands)

*Existing infrastructure covers all phase requirements via CLI verification.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| `npm run dev` serves localhost:3000 without errors | FOUND-01 | Browser/dev-server output only | Run `npm run dev`, open localhost:3000, verify page loads |
| `php artisan serve` starts on port 8000 | FOUND-02 | Process output only | Run `php artisan serve`, verify "Starting Laravel development server" |
| All migrations run on fresh DB | INFRA-01 | Requires live MySQL | Run `php artisan migrate:fresh`, verify 0 errors |
| `.env.example` documents all variables | FOUND-03 | Human review | Open both `.env.example` files, verify all vars present |
| Standalone output + postbuild copy | FOUND-04 | File system check | Run `npm run build`, verify `.next/standalone/` contains `public/` and `.next/static/` |
| CORS allows buildera.co only | FOUND-05 | HTTP header check | Send request from different origin, verify `Access-Control-Allow-Origin` header |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (none — CLI-only verification)
- [x] No watch-mode flags
- [x] Feedback latency < 60s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** 2026-05-26
