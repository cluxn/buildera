# Phase 3: Homepage & Design System — Context

**Gathered:** 2026-05-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Site nav (SiteNav), site footer (SiteFooter), and the full homepage are built, with a complete motion design system established underneath — brand tokens, glassmorphism utilities, animation config, and Inter font wiring all done in 03-01 so every subsequent phase inherits them. By end of phase: buildera.co has a visual identity and a working homepage from hero to bottom CTA.

</domain>

<decisions>
## Implementation Decisions

### Hero Section

- **D-01:** Light hero — white/off-white background (not dark). Brand blue is a decorative accent, not the dominant surface.
- **D-02:** Animated background: CSS keyframe floating orbs/blobs — 2-3 soft gradient circles positioned absolute (top-right + bottom-left corners), blur 80-120px, opacity 0.3-0.5, 8s ease-in-out infinite alternate animation, colors: brand blue + lighter indigo tint. No JS required.
- **D-03:** Headline animation: word-by-word fade + slide up using motion/react. Each word wrapped in `<motion.span>`, `initial: { opacity: 0, y: 20 }`, `animate: { opacity: 1, y: 0 }`, `transition: { delay: index * 0.07, duration: 0.4 }`. Triggers on component mount.
- **D-04:** Social proof element: inline stat badge strip below the two CTA buttons — `✓ 150+ Projects  •  ✓ 50+ Clients  •  ✓ 98% Satisfaction`. Small, compact, doesn't compete with CTAs.
- **D-05:** Hero layout: 2-column on desktop — left column: headline, sub-headline, CTA buttons, stat badges; right column: illustration.
- **D-06:** Right column visual: abstract tech SVG illustration — interconnected nodes, circuit-like lines, code brackets, data flow shapes in brand blue. Built inline with SVG/CSS. Animated with CSS (subtle float/pulse, no JS). No external image file needed.
- **D-07:** Hero height: `min-h-screen` (full viewport height on desktop). Mobile: natural content height.

### Brand Design System

- **D-08:** Minimal brand token set — 7 named tokens in `@theme` block of `globals.css`:
  ```css
  --brand-primary: hsl(217 91% 60%)
  --brand-primary-dark: hsl(217 91% 45%)
  --brand-primary-light: hsl(217 91% 75%)
  --brand-gradient-from: hsl(217 91% 60%)
  --brand-gradient-to: hsl(242 75% 40%)
  --brand-surface: hsl(217 60% 97%)
  --brand-glass: hsl(217 91% 60% / 8%)
  ```
  Do NOT define a full 50→950 scale — overkill. These 7 tokens are sufficient for all phase 3-10 design needs.

- **D-09:** Keep dark mode — tune the `.dark` block in `globals.css` so brand tokens work in both light and dark. Respects `prefers-color-scheme`. Required by DESIGN requirements.

- **D-10:** Glassmorphism utility (applies to nav header, stat cards, testimonial cards):
  - `background: hsl(217 91% 60% / 6%)` (--brand-glass)
  - `backdrop-filter: blur(12px)`
  - `border: 1px solid hsl(217 91% 60% / 15%)`
  - `border-radius: var(--radius-lg)`
  This is the "subtle glass" style. Not strong (15-20%) — subtle (6%).

- **D-11:** Font: Inter is the sole typeface. Wire `--font-inter` (from `next/font/google`) as `--font-sans` in the `@theme inline` block. Fix the existing disconnect in `layout.tsx` where Inter is loaded as `--font-inter` but `@theme` maps `--font-sans` from a missing variable.

- **D-12:** Section backgrounds on homepage (alternating rhythm):
  | Section | Background |
  |---------|-----------|
  | Hero | white |
  | Stats bar | `--brand-primary` solid blue, white text |
  | Services tab section | white |
  | Solutions grid | `--brand-surface` (very light blue-white) |
  | Client logos marquee | white |
  | Testimonials | white |
  | Case studies preview | `--brand-surface` |
  | Why Buildera | white |
  | Bottom CTA section | `linear-gradient(--brand-gradient-from, --brand-gradient-to)` |

### Mega Nav (SiteNav)

- **D-13:** Desktop: hover-triggered mega dropdown with 150ms delay on open (prevents accidental triggers). No click required.
- **D-14:** Mega dropdown panel: full viewport width, drops below the header bar, content constrained to container inside. This gives maximum real estate for Services (6 categories) and Solutions (18 tiles).
- **D-15:** Sticky nav scroll behavior — starts transparent at page top; on scroll past ~50px: activates glassmorphism (`background: hsl(0 0% 100% / 80%)`, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid var(--brand-glass)`). Smooth CSS transition.
- **D-16:** Mobile nav: full-screen overlay slides in from right on hamburger tap. Groups are accordion-expandable. "Book a Free Call" CTA pinned at bottom of overlay. Close (X) in top-left. Logo in top-right.
- **D-17:** Data sourcing split:
  - **Services panel**: hardcoded in `SiteNav.tsx` as `const SERVICES_MENU` (6 categories + sub-service links). No API call for this panel.
  - **Solutions, Work, Resources panels**: populated from `GET /api/nav-items` at build time (SSG).
  - Rationale: Service page slugs are hardcoded content anyway (Phase 4), so nav links must match exactly.

### Services Tab Section (HOME-02)

- **D-18:** Horizontal tab bar — all 6 service categories as tab pills across the top. On desktop, single row if they fit; wraps to 2 rows on mid-size screens. On mobile, horizontal scroll (overflow-x: auto, snap).
- **D-19:** All sub-services shown per active tab — no truncation, no "View All" link. Cards are compact enough. Website Dev = 4 cards, Salesforce = 5 cards, DevOps = 4 cards, AI Agent = 4 cards, Software Dev = 4 cards, Hire a Dev = 3 cards.
- **D-20:** Sub-service card contents (compact):
  - Tabler icon (brand blue, top-left)
  - Bold title
  - 1-line description (max 1 sentence)
  - "Learn More →" link text at bottom
  - Hover state: `translateY(-4px)`, blue border glow (`box-shadow: 0 0 0 2px var(--brand-primary)`), `transition: 200ms`
- **D-21:** Tab switching animation: on tab click, old cards fade out, new cards fade in with 50ms stagger delay per card. Uses motion/react `AnimatePresence` + `motion.div`.

### Solutions Grid & Client Logos (HOME-03, COMP-02)

- **D-22:** Solutions grid: compact 4-column grid (desktop), all 18 tiles visible at once, no filter on homepage (filter is on the dedicated solutions listing page in Phase 4). Each tile: icon + solution name, links to detail page. Scroll-triggered stagger animation on enter.
- **D-23:** Client logos marquee: CSS infinite scroll animation (`@keyframes marquee`), logos duplicated for seamless loop, grayscale filter by default, color/full on hover. Section heading: "Trusted by businesses across India". Seeded with placeholder logo SVGs.

### Animation System (global, set in 03-01)

- **D-24:** Scroll-triggered reveal: `initial: { opacity: 0, y: 24 }`, `animate: { opacity: 1, y: 0 }`, `transition: { duration: 0.5 }`. Triggered by `whileInView` + `viewport: { once: true }`.
- **D-25:** Grid stagger: child cards enter with 80ms stagger delay per item (`delay: index * 0.08`).
- **D-26:** Hover cards: `translateY(-4px)`, border glow, `transition: 200ms ease` — applied to all card components globally.

### `"use client"` Boundary Rules (carry-forward from CLAUDE.md)

- Tab switcher component (Services tabs): `"use client"` — requires state for active tab + AnimatePresence
- SiteNav mobile drawer: `"use client"` — requires open/close state + scroll listener for glass effect
- Everything else (Hero, Stats, Solutions grid, Testimonials, Footer): Server Components

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Scope
- `.planning/ROADMAP.md` §Phase 3 — Plans 03-01 through 03-06, success criteria
- `.planning/REQUIREMENTS.md` — NAV-01→08 (nav/footer), HOME-01→07 (homepage sections), COMP-02, COMP-03, COMP-06, DESIGN-01→08, INFRA-03

### Design System Baseline
- `buildera-frontend/src/app/globals.css` — current @theme block, shadcn tokens, existing --primary value to merge/replace
- `buildera-frontend/src/app/layout.tsx` — Inter font setup, --font-inter variable name to wire into @theme

### API Integration Points
- `buildera-frontend/src/lib/api.ts` — fetchFromApi stub; nav/footer/settings typed helpers need adding here
- `.planning/CLIENT-CONTEXT.md` — company contact details for footer (phone, email, address, nofollow attribution line)

### Project Constraints
- `CLAUDE.md` — design system section (glassmorphism, gradients, motion, hover rules), rendering strategy (Server Components by default), `"use client"` allowed list

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `buildera-frontend/src/components/ui/button.tsx` — shadcn Button component; already initialized. Use for all CTA buttons (primary variant for main CTAs, outline/ghost for secondary).
- `buildera-frontend/src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge); use for all conditional class composition.
- `buildera-frontend/src/lib/api.ts` — `fetchFromApi<T>()` stub. Extend with typed helpers for `fetchNavItems()`, `fetchFooterLinks()`, `fetchSettings()` for nav/footer data.

### Established Patterns
- Tailwind 4 `@theme inline` block in `globals.css` — all custom tokens go here (no `tailwind.config.js`). The `--brand-*` tokens added in 03-01 will be consumed as `bg-[var(--brand-surface)]` etc.
- `next/font/google` Inter already loaded in `layout.tsx` as `--font-inter`. Must be wired to `--font-sans` in `@theme` to activate as the global font.
- `optimizePackageImports` already set in `next.config.ts` for `@tabler/icons-react` and `motion` — icon and animation imports are already optimized.

### Integration Points
- `SiteNav` must call `GET /api/nav-items` at build time (Server Component). Data cached with `{ next: { tags: ['nav-items'] } }`.
- `SiteFooter` must call `GET /api/footer-links` and `GET /api/settings` (for social links, WhatsApp number) at build time.
- Stats bar values (HOME-04) come from `GET /api/settings` — seeded with sample values (150+ Projects, 50+ Clients, etc.) until client updates.
- `layout.tsx` wraps all pages — SiteNav and SiteFooter live here as shared layout components.

</code_context>

<specifics>
## Specific Ideas

- **Floating blob animation reference**: `animation: float 8s ease-in-out infinite alternate` on absolutely-positioned gradient divs. Two blobs: top-right corner (brand blue), bottom-left (indigo tint).
- **Hero SVG illustration**: interconnected nodes with brand-blue lines, floating code brackets, abstract data flow. Animated with CSS `@keyframes` float pulse. Viewbox aspect ratio: approx 1:1 or 4:3.
- **Stats bar**: 4 metrics — "150+ Projects Delivered", "50+ Happy Clients", "6+ Years Experience", "98% Client Satisfaction". Values seeded via settings API. Counters animate from 0 on scroll-into-view (motion/react).
- **Footer contact info from CLIENT-CONTEXT.md**: Phone +91-82994 06767, Email info@buildera.co, Address 117/Q/457/10A Indrapuri Sharda Nagar Kanpur 208025. Attribution line: `Developed and managed by <a href="https://buildera.co" rel="nofollow">Buildera Technologies LLP</a>`.
- **Nav "Book a Call" CTA**: links to `/book-a-call`. Solid brand-primary button on desktop nav (right side). Pinned at mobile drawer bottom.
- **Marquee seed logos**: use placeholder SVG shapes styled as company logo silhouettes. 6-8 logos duplicated for seamless loop.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 3 — Homepage & Design System*
*Context gathered: 2026-05-27*
