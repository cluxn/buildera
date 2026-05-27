# Phase 4: Services & Solutions Pages — Context

**Gathered:** 2026-05-27
**Status:** Ready for planning

<domain>
## Phase Boundary

All ~24 sub-service detail pages and ~18 solution detail pages built as statically generated Next.js pages, with a complete `ServiceDetailLayout` and `SolutionDetailLayout` components implementing conversion-optimised 10-section and 8-section flows respectively. Full persuasive marketing copy seeded per page. Inline social proof wiring: testimonials and case studies seeded in the backend and pulled per-service via API. By end of phase: every service URL and solution URL resolves to a premium, conversion-ready page.

</domain>

<decisions>
## Implementation Decisions

### Content Data Architecture

- **D-01:** Centralized data files — all marketing copy lives in `src/data/services/` (6 category files) and `src/data/solutions/solutions.ts` (all 18 solutions in one file). Pages import typed objects from these files and pass them to layout components.
- **D-02:** One file per service category: `website-development.ts`, `salesforce.ts`, `devops.ts`, `ai-agent.ts`, `software-dev.ts`, `hire-a-developer.ts`. Each exports an array of sub-service page objects conforming to `ServicePageData`.
- **D-03:** Solutions: one `src/data/solutions/solutions.ts` exporting all 18 solution objects conforming to `SolutionPageData`.
- **D-04:** Copy depth: **full persuasive marketing copy** — real headlines, pain point descriptions, outcome cards with metrics, process steps, industry callouts, FAQ questions and answers. The site must look finished and credible from day one. Not placeholder-level.
- **D-05:** Shared TypeScript interfaces in `src/types/service-page.ts` — `ServicePageData`, `SolutionPageData`. Both `ServiceDetailLayout` and `SolutionDetailLayout` accept these as typed props. Strict throughout.

### Routing Structure

- **D-06:** Service detail pages: `app/services/[category]/[slug]/page.tsx` — one template file, `generateStaticParams` returns all 24 category+slug combos from the data files.
- **D-07:** Service category pages: `app/services/[category]/page.tsx` alongside — `generateStaticParams` returns the 6 category slugs. Shows category overview with all sub-service cards.
- **D-08:** Solutions: `app/solutions/[slug]/page.tsx` — `generateStaticParams` returns 18 slugs. Solutions listing at `app/solutions/page.tsx`.
- **D-09:** Canonical category URL slugs (must match SiteNav hardcoded links from Phase 3 D-17):
  - `website-development`
  - `salesforce-development`
  - `devops-development`
  - `ai-agent-development`
  - `software-development`
  - `hire-a-developer`
- **D-10:** All service/solution pages are fully static (`force-static` or default Server Component static generation). No ISR needed — content is hardcoded.

### Social Proof Sourcing (04-06)

- **D-11:** Phase 4 seeds **~20 testimonials + 8 case studies** via Laravel seeders (no Filament resource UI — just database rows). Genuine-looking, diverse clients and industries. Coverage: 1-2 per service category (12), remainder cross-tagged to cover major solutions and all 8 industry pages. A single testimonial can be tagged with a service AND an industry so it appears on both pages.
- **D-12:** Phase 4 adds backend migrations with three tagging columns on both `testimonials` and `case_studies` tables:
  - `service_category` (string, nullable) — e.g., `'website-development'`
  - `solution_slug` (string, nullable) — e.g., `'crm'`, `'erp'`
  - `industry_category` (string, nullable) — e.g., `'manufacturing'`, `'retail'`
  All three are independent — a testimonial can have one, two, or all three set. Phase 6 Filament resources expose these as admin-editable fields.
- **D-13:** Frontend API calls accept any of the three filter params: `GET /api/testimonials?service=X`, `GET /api/testimonials?solution=X`, `GET /api/testimonials?industry=X`. Case studies use the same pattern. Phase 2 API controllers extended with these query param filters in 04-06.
- **D-14:** Graceful empty state: sections render hidden (not broken) if no seeded testimonials match the query. No hard dependency on seeded count per page.

### Animation Depth on Service Pages

- **D-16:** Full animated components in 04-01 as part of `ServiceDetailLayout`:
  - **Section 1 (Hero):** Animated ring/arc stat in the hero area (e.g., "150+ Projects" with an SVG arc drawn around it on scroll-into-view). Signals credibility immediately.
  - **Section 3 (Outcome cards):** Staggered checklist/card reveal (80ms per card, `whileInView`).
  - **Section 4 (Process):** Sequential step reveals — each step "unlocks" the next with a 120ms delay chain. Reinforces the narrative (steps build on each other).
  - **Technology Showcase (COMP-05):** Categorized grid (Frontend / Backend / Cloud / Tools), category label appears first, then logos stagger in at 60ms per item.
- **D-17:** Solution pages use the Phase 3 base animation set only: `whileInView` opacity+translateY, 80ms stagger on cards. No ring stats or bar charts on solution pages — premium animation budget is on service pages.
- **D-18:** All service page animated components are `"use client"` boundaries (they use `useInView` / `useAnimation` hooks). The parent `ServiceDetailLayout` remains a Server Component — animated components are isolated leaf nodes receiving data as props.

### Technology Showcase (COMP-05)

- **D-19:** Categorized stagger grid — technologies grouped into 4 buckets: Frontend, Backend, Cloud & DevOps, Tools & Integrations. Category header appears first (whileInView), then logos within each category stagger in (60ms per logo). Uses `@tabler/icons-react` for tech icons where available; fallback to text badges.
- **D-20:** Technology Showcase is a standalone `<TechShowcase technologies={...} />` Server Component placed in Section 10 (CTA area) or as a standalone section before the CTA. Each service page passes its relevant tech stack.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Scope
- `.planning/ROADMAP.md` §Phase 4 — Plans 04-01 through 04-06, success criteria
- `.planning/REQUIREMENTS.md` — SVC-01→09 (services), SOL-01→03 (solutions), TRUST-06 (inline social proof), COMP-04 (video embed), COMP-05 (tech showcase)

### Design System Baseline (Phase 3 — locked)
- `.planning/phases/03-homepage-design-system/03-CONTEXT.md` — All design decisions D-01→D-27; animation system, glassmorphism utilities, brand tokens, typography scale. **All carry forward to Phase 4.**
- `.planning/phases/03-homepage-design-system/03-UI-SPEC.md` — Spacing scale, typography table, component registry, motion config, color palette. **Downstream agents MUST implement to this spec.**

### Animation Requirements (memory)
- User-specified animation style: animated ring stats in hero, staggered checklist for process/outcome sections, sequential step reveals for process section. Source: project memory `project_phase3_animation_requirements.md`.

### Frontend Code
- `buildera-frontend/src/lib/api.ts` — `fetchFromApi<T>()` stub; extend with `fetchTestimonials(service: string)` and `fetchCaseStudies(service: string)` helpers
- `buildera-frontend/src/components/ui/button.tsx` — shadcn Button; use for all CTAs on service/solution pages
- `buildera-frontend/src/lib/utils.ts` — `cn()` helper for all conditional class composition

### Backend
- `buildera-backend/` — Phase 2 API controllers at `app/Http/Controllers/Api/`; extend `TestimonialController` and `CaseStudyController` with `?service=` query param filter
- `.planning/phases/02-backend-core/02-02-PLAN.md` — Existing API controller patterns to follow

### Project Constraints
- `CLAUDE.md` — `"use client"` allowed list (forms, tab switcher, analytics, popups), rendering strategy (Server Components by default), tech stack constraints

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `buildera-frontend/src/components/ui/button.tsx` — shadcn Button (primary + outline variants). Use for all CTA buttons: "Book a Free Call" (primary), "View Our Work" (outline).
- `buildera-frontend/src/lib/utils.ts` — `cn()` helper. Use for all conditional Tailwind class composition in layout components.
- `buildera-frontend/src/lib/api.ts` — `fetchFromApi<T>()`. Extend with `fetchTestimonials(service)` and `fetchCaseStudies(service)` typed helpers.

### Established Patterns
- Dynamic routes with `generateStaticParams` + typed `params` prop — the Phase 4 template pattern for all 42 pages.
- `"use client"` isolated to leaf animated components — parent layout stays a Server Component. Matches Phase 3 D-18 (tab switcher pattern).
- Tailwind 4 `@theme` variables via `var(--brand-primary)` etc. — all brand tokens already defined in Phase 3 `globals.css`.

### Integration Points
- `ServiceDetailLayout` receives `ServicePageData` as props (from data file) + `testimonials: TestimonialData[]` + `caseStudy: CaseStudyData | null` (from API at render time, Server Component).
- `SolutionDetailLayout` receives `SolutionPageData` as props + API-sourced social proof.
- All API calls use `{ next: { tags: ['testimonials'], revalidate: 3600 } }` — consistent with ISR tagging from Phase 2.
- Nav breadcrumbs (NAV-07) on all service/solution pages — `BreadcrumbList` JSON-LD. Phase 7 adds full structured data but the breadcrumb trail must be correct from Phase 4.

</code_context>

<specifics>
## Specific Ideas

- **Hero ring stat:** SVG arc (stroke-dasharray animation) drawn around a large number on `whileInView`. Similar to a progress ring. On mobile: smaller ring, same animation. Stat value comes from `ServicePageData.heroStat` field.
- **Process steps sequential reveal:** Each step has a connector line between it and the next. Line "draws" in (stroke animation) as the next step reveals. Creates a chained animation where you see the workflow unfold.
- **TechShowcase categories:** Frontend (React, Next.js, TypeScript, Tailwind), Backend (Laravel, Node.js, PHP, Python), Cloud & DevOps (AWS, GCP, Docker, Kubernetes), Tools & Integrations (Salesforce, Stripe, n8n, Twilio). Each service page customizes which categories and which logos appear.
- **Solution page hero:** Outcome-led headline (e.g., "Automate your operations end-to-end") + 1-line descriptor + primary CTA. No ring stat — clean and direct.
- **Video embed (COMP-04):** `ServicePageData.videoUrl` optional field. If present, renders an `<iframe>` embed between the process section and industries section. Lazy-loaded. If absent, section is hidden.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 4 — Services & Solutions Pages*
*Context gathered: 2026-05-27*
