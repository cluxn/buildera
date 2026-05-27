# Phase 4: Services & Solutions Pages — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-27
**Phase:** 4 — Services & Solutions Pages
**Areas discussed:** Content data architecture, Routing structure, Social proof sourcing, Animation depth on service pages

---

## Content Data Architecture

| Option | Description | Selected |
|--------|-------------|----------|
| Centralized data files | src/data/services/ + src/data/solutions/ — typed data objects | ✓ |
| Inline per page | Copy as const objects inside each page.tsx | |
| Single data registry | One large src/data/content.ts for everything | |

**File structure chosen:**
| Option | Description | Selected |
|--------|-------------|----------|
| One file per category (6 service files + 1 solutions file) | website-development.ts, salesforce.ts etc. | ✓ |
| One file per sub-service (24 files) | Maximum granularity | |
| Two files: services.ts + solutions.ts | Fewer files, larger each | |

**Copy depth:**
| Option | Description | Selected |
|--------|-------------|----------|
| Full persuasive copy | Real marketing copy, site looks finished | ✓ |
| Realistic placeholder | Good-enough, structured for swapping | |
| Minimal structure-only | Lorem-adjacent | |

**TypeScript typing:**
| Option | Description | Selected |
|--------|-------------|----------|
| Shared interfaces (ServicePageData, SolutionPageData) | src/types/service-page.ts | ✓ |
| Inferred types only | No explicit interface | |

**Solutions file structure:**
| Option | Description | Selected |
|--------|-------------|----------|
| One solutions.ts for all 18 | Single file, clean | ✓ |
| Category-grouped solution files | More files, more organized | |

**Notes:** User wants the site to look finished from day one with real marketing copy. Centralized data layer with strict TypeScript is the clean architecture for 42 pages.

---

## Routing Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Nested dynamic routes [category]/[slug] | One template, generateStaticParams | ✓ |
| Category directories + [slug] | 6 directories each with dynamic slug | |
| Fully static directories | One file per page | |

**Category pages:**
| Option | Description | Selected |
|--------|-------------|----------|
| Dynamic app/services/[category]/page.tsx | Alongside the [slug] sub-route | ✓ |
| Separate static category pages | 6 dedicated files | |
| Services overview page only | One page with all tabs, no category landing | |

**Solution routing:**
| Option | Description | Selected |
|--------|-------------|----------|
| app/solutions/[slug]/page.tsx | Dynamic with generateStaticParams | ✓ |
| Fully static: one file per solution | 18 individual files | |

**Category slugs:**
| Option | Description | Selected |
|--------|-------------|----------|
| Verbose slugs | website-development, salesforce-development etc. | ✓ |
| Short slugs | website, salesforce, devops etc. | |

**Notes:** Verbose slugs chosen for SEO clarity and to match what SiteNav hardcodes in Phase 3 D-17.

---

## Social Proof Sourcing

| Option | Description | Selected |
|--------|-------------|----------|
| Seed in Phase 4, pull from API | Laravel seeders in Phase 4, API calls on pages | ✓ |
| Hardcode per page in data files | Sample objects in each service data file | |
| Build API calls with graceful empty state | No seeding, sections empty until Phase 6 | |

**Tagging approach:**
| Option | Description | Selected |
|--------|-------------|----------|
| service_category column | String column matching URL slug | ✓ |
| Tags array / pivot table | Many-to-many relation | |

**Seed count:**
| Option | Description | Selected |
|--------|-------------|----------|
| 8 testimonials + 6 case studies | Enough for 1-2 per service category | ✓ |
| Minimum viable: 3 + 3 | Thin coverage | |
| Full set: 12 + 8 | Maximum coverage | |

**Schema migrations:**
| Option | Description | Selected |
|--------|-------------|----------|
| Add migrations in Phase 4 | service_category + industry_category on both tables | ✓ |
| Phase 6 handles schema | Let Phase 6 add columns | |

**Notes:** Seeding in Phase 4 is the cleanest approach — avoids rework in Phase 6 and means service pages look genuine immediately. Backend migrations for service_category + industry_category added now.

---

## Animation Depth on Service Pages

| Option | Description | Selected |
|--------|-------------|----------|
| Full animated components in Phase 4 | Ring stat, staggered checklist, sequential steps | ✓ |
| Standard scroll-reveals only | Base whileInView for everything | |
| Partial — animated checklist only | Middle ground | |

**Hero stat placement:**
| Option | Description | Selected |
|--------|-------------|----------|
| Section 1 — Hero | Ring stat in hero, immediate credibility | ✓ |
| Section 3 — Outcome cards | Stats on each outcome card | |
| Section 4 — Dedicated stats bar | Ring stats between pain + outcome | |

**Technology Showcase (COMP-05):**
| Option | Description | Selected |
|--------|-------------|----------|
| Animated categorized grid with stagger | Logos grouped by category, stagger reveal | ✓ |
| Static badge grid | No animation | |
| Marquee scroll | Infinite horizontal scroll | |

**Solution page animations:**
| Option | Description | Selected |
|--------|-------------|----------|
| Simpler — standard scroll-reveals | Base Phase 3 animations only | ✓ |
| Same as service pages | Full premium animations | |

**Notes:** Service pages get the full premium animation treatment (ring stats, sequential process reveals, staggered checklists). Solution pages use the Phase 3 base animation set — they're supporting pages, not primary conversion surfaces. "Use client" isolated to animated leaf components only; ServiceDetailLayout stays a Server Component.

---

## Claude's Discretion

- Process steps connector line animation (stroke-dasharray drawing effect between steps) — designed to visually convey the chained workflow. Claude will implement this as it fits the ServicePageData structure.
- TechShowcase category groupings (Frontend / Backend / Cloud / Tools) — standard groupings chosen by Claude unless the service data file specifies differently.
- Video embed (COMP-04) placement — between process and industries sections when videoUrl is present.

## Deferred Ideas

None — discussion stayed within phase scope.
