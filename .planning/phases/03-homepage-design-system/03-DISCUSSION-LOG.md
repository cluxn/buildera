# Phase 3: Homepage & Design System — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-27
**Phase:** 3 — Homepage & Design System
**Areas discussed:** Hero visual tone, Brand palette depth, Mega nav UX, Services tab section

---

## Hero Visual Tone

### Background treatment

| Option | Description | Selected |
|--------|-------------|----------|
| Dark hero | Deep blue/indigo background, white headline | |
| Light hero | White/off-white bg, blue gradient accents | ✓ |
| Split/transitional | Dark top, light below the fold | |

**User's choice:** Light hero — white background with floating blue orbs

---

### Animated background style

| Option | Description | Selected |
|--------|-------------|----------|
| Floating orbs/blobs | 2-3 CSS keyframe gradient circles, top-right + bottom-left | ✓ |
| Animated mesh gradient | CSS conic/radial gradient shifting slowly | |
| Static gradient accents | No bg animation; animation on headline/CTA only | |

**User's choice:** Floating orbs/blobs (CSS only, no JS)

---

### Headline animation

| Option | Description | Selected |
|--------|-------------|----------|
| Word-by-word fade + slide up | Each word in motion.span, staggered 70ms, y: 20→0 | ✓ |
| Full headline fade in | Entire headline as one animated block | |
| Typewriter effect | Characters appear one-by-one left-to-right | |

**User's choice:** Word-by-word fade + slide up using motion/react

---

### Social proof element

| Option | Description | Selected |
|--------|-------------|----------|
| Inline stat badge | Small pill below CTAs: ✓ 150+ Projects • ✓ 50+ Clients | ✓ |
| Avatar stack + text | 3-4 circular avatars + "50+ clients trust Buildera" | |
| Star rating row | "5 stars on Clutch" with star icons | |

**User's choice:** Inline stat badge strip

---

### Hero layout

| Option | Description | Selected |
|--------|-------------|----------|
| Text-only, centered | Full-width centered, no right-side visual | |
| Left text + right illustration | 2-column layout | ✓ |
| Left text + right stats/numbers | Large animated numbers as visual | |

**User's choice:** 2-column: left text + right illustration

---

### Right column visual

| Option | Description | Selected |
|--------|-------------|----------|
| Abstract tech SVG illustration | Nodes, circuits, code brackets — CSS animated | ✓ |
| Browser mockup with fake dashboard | Stylized browser frame + UI screenshot | |
| Code snippet card | Terminal-style card with syntax highlighting | |

**User's choice:** Abstract tech SVG illustration

---

### Hero height

| Option | Description | Selected |
|--------|-------------|----------|
| Full viewport height | min-h-screen | ✓ |
| Large but not full viewport | min-h-[600px], peek effect | |
| Medium height | 60-70vh, content-dense | |

**User's choice:** Full viewport height (min-h-screen)

---

## Brand Palette Depth

### Token depth

| Option | Description | Selected |
|--------|-------------|----------|
| Minimal brand token set | 7 named tokens covering all design needs | ✓ |
| Full blue scale (50→950) | Tailwind-style full palette | |
| Extend shadcn tokens only | Update existing --primary etc. only | |

**User's choice:** Minimal 7-token brand set

---

### Dark mode

| Option | Description | Selected |
|--------|-------------|----------|
| Light-only, strip dark mode | Remove .dark block entirely | |
| Keep dark mode support | Tune .dark block with brand tokens | ✓ |
| You decide | Claude picks | |

**User's choice:** Keep dark mode — tune brand tokens for both modes

---

### Glassmorphism style

| Option | Description | Selected |
|--------|-------------|----------|
| Subtle glass | 6% bg, blur 12px, border 15% | ✓ |
| Strong glass | 15-20% opacity, blur 20px+ | |
| White glass | white/70%, blur, border | |

**User's choice:** Subtle glass

---

### Font structure

| Option | Description | Selected |
|--------|-------------|----------|
| Wire Inter as --font-sans | Inter as sole font, fix @theme wiring | ✓ |
| Inter as heading + system-ui body | Split fonts | |
| You decide | Claude picks | |

**User's choice:** Wire Inter as --font-sans (sole font)

---

### Section background rhythm

| Option | Description | Selected |
|--------|-------------|----------|
| White → brand-surface alternating | Subtle alternation, stats bar solid blue, CTA gradient | ✓ |
| All white with border separators | Uniform white, borders only | |
| You decide | Claude picks | |

**User's choice:** Alternating pattern as recommended

---

## Mega Nav UX

### Trigger

| Option | Description | Selected |
|--------|-------------|----------|
| Hover-triggered (150ms delay) | Standard for marketing sites | ✓ |
| Click-triggered | More accessible, easier to implement | |
| You decide | Claude picks hover | |

**User's choice:** Hover-triggered with 150ms delay

---

### Panel width

| Option | Description | Selected |
|--------|-------------|----------|
| Full viewport width | Edge-to-edge, max space for grids | ✓ |
| Container-width panel | Matches content container width | |
| You decide | Claude picks full-width | |

**User's choice:** Full viewport width

---

### Sticky nav scroll behavior

| Option | Description | Selected |
|--------|-------------|----------|
| Glassmorphism activates on scroll | Transparent → glass transition | ✓ |
| Always sticky glass | Glass from page load | |
| Solid white on scroll | No blur, solid white | |

**User's choice:** Glassmorphism activates on scroll (~50px threshold)

---

### Mobile nav

| Option | Description | Selected |
|--------|-------------|----------|
| Full-screen overlay, slide from right | Accordion groups, CTA pinned bottom | ✓ |
| Drawer from left | Sidebar-style | |
| Full-screen fade-over | Immersive, dramatic | |

**User's choice:** Full-screen overlay, slides from right

---

### Services panel data source

| Option | Description | Selected |
|--------|-------------|----------|
| Hardcoded in component | SERVICES_MENU constant, API for other groups | ✓ |
| Fully API-driven | All panels from GET /api/nav-items | |
| Hybrid | Categories from API, sub-links hardcoded | |

**User's choice:** Services panel hardcoded; Work + Resources from API

---

## Services Tab Section

### Tab orientation

| Option | Description | Selected |
|--------|-------------|----------|
| Horizontal tabs at the top | Standard horizontal pill bar | ✓ |
| Vertical sidebar tabs | Left sidebar + right content | |
| Icon grid switching | 6 icon tiles as selectors | |

**User's choice:** Horizontal tab bar

---

### Cards per tab

| Option | Description | Selected |
|--------|-------------|----------|
| All sub-services shown | No truncation, no View All link | ✓ |
| 3 cards max + View All link | Compact section | |
| Featured 3 + see more | Editorial, requires curation | |

**User's choice:** All sub-services shown per tab

---

### Card content + hover

| Option | Description | Selected |
|--------|-------------|----------|
| Icon + title + 1-line desc + arrow | Hover: lift + border glow, 200ms | ✓ |
| Icon + title + bullet points | More detail, taller cards | |
| Title + description only (no icon) | Minimal, no visual diff | |

**User's choice:** Icon + title + 1-line description + Learn More → with lift/glow hover

---

### Tab switching animation

| Option | Description | Selected |
|--------|-------------|----------|
| Fade in new cards | Old fades out, new fades in with 50ms stagger | ✓ |
| Slide cards from right | Cinematic but complex | |
| Instant switch, no animation | Snappy, simplest | |

**User's choice:** Fade in with staggered 50ms per card

---

### Solutions grid (HOME-03)

| Option | Description | Selected |
|--------|-------------|----------|
| Compact 4-column tile grid, all 18 | Scroll-triggered stagger, no filter | ✓ |
| 8-9 featured tiles + View All | Shorter section | |
| Horizontal scrolling carousel | Unique on mobile | |

**User's choice:** All 18 in compact 4-column grid

---

### Client logos marquee (COMP-02)

| Option | Description | Selected |
|--------|-------------|----------|
| Auto-scrolling infinite CSS marquee | Grayscale → color on hover | ✓ |
| Static logo grid | No animation | |
| Skip this section for now | Placeholder | |

**User's choice:** Infinite CSS marquee

---

## Claude's Discretion

None — user made direct selections on all questions.

## Deferred Ideas

None emerged during discussion.
