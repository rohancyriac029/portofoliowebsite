# Portfolio Website — Components & Animations Reference

> A breakdown of every major UI component and animation system in the portfolio.

---

## Architecture Overview

```
page.tsx (App shell)
├── Custom Cursor (dot + ring)
├── Noise Overlay
├── Scroll Progress Bar
├── Nav
├── main
│   ├── Hero
│   ├── About
│   ├── Projects
│   │   └── ProjectCard  (×5)
│   └── Contact
└── Footer
```

---

## Design Tokens  ([globals.css](file:///d:/rohansportfolio/portofoliowebsite/src/app/globals.css))

| Token | Value | Purpose |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--bg2` | `#111111` | Card / elevated surface |
| `--bg3` | `#1a1a1a` | Tertiary surface |
| `--text` | `#f0ede8` | Primary text |
| `--muted` | `#6b6965` | Secondary / body text |
| `--ghost` | `#2e2c2a` | Disabled / faintest UI |
| `--accent` | `#e8ff47` | Accent (lime-yellow) |
| `--border` | `rgba(240,237,232,0.07)` | Subtle dividers |
| `--border-hi` | `rgba(232,255,71,0.25)` | Highlighted borders |
| `--ease-spring` | `cubic-bezier(0.16,1,0.3,1)` | Shared easing curve |
| `--font-mono` | JetBrains Mono | Headings, buttons, labels |
| `--font-body` | Space Grotesk | Body copy |

---

## UI Components

### 1. Nav — [Nav.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Nav.tsx)

Fixed top bar with three elements:

| Element | CSS Class | Detail |
|---|---|---|
| Logo | `.nav-logo` | `<rohan.dev/>` with accent-colored angle brackets |
| Links | `.nav-link` | "about", "projects", "contact" — active link gets an accent underline |
| Status badge | `.nav-status` | `[ AVAILABLE FOR WORK ]` in accent color |

**Behaviour:** Receives `isScrolled` from parent; when true, applies `.scrolled` class → semi-transparent black background + subtle bottom border via `backdrop-filter: blur(24px)`.

---

### 2. Hero — [Hero.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Hero.tsx)

Full-viewport intro section containing:

| Element | Detail |
|---|---|
| **Particle Canvas** | 280 floating dots with connecting lines (see *Animations* below) |
| **Eyebrow** | [( Full-Stack Developer )](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Nav.tsx#11-39) with a small horizontal rule |
| **Name** | "ROHAN" solid + "CYRIAC" outline (transparent fill, `WebkitTextStroke`) |
| **Typewriter** | Cycles through `Developer → AI Enthusiast → Problem Solver → Innovator` |
| **CTA Buttons** | `[ VIEW MY WORK ]` (primary) and `[ GET IN TOUCH ]` (ghost) |
| **Scroll Indicator** | Vertical "SCROLL" text + gradient line, bottom-right corner (hidden on mobile) |

---

### 3. About — [About.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/About.tsx)

Two-column grid (`.about-grid`):

| Column | Content |
|---|---|
| **Left** | Bio paragraphs with `<strong>` highlights + ghost buttons linking to GitHub & LinkedIn |
| **Right** | Three skill groups, each with a label (`.skills-group-label`) and tag pills (`.tag.tag-lg`) |

Skill groups: *Languages & Frameworks*, *Databases*, *Project Fields*.

---

### 4. Projects — [Projects.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Projects.tsx)

Horizontal **drag-shelf** carousel of 5 project cards.

| Element | CSS Class | Detail |
|---|---|---|
| Shelf | inline flex | Drag/touch to scroll; snaps to nearest card with momentum |
| Progress bar | inside `.shelf-controls` | Thin accent-colored bar showing scroll position |
| Arrows + Counter | `.shelf-arrow`, `.shelf-counter` | ← / → buttons + "01 / 05" display |
| CTA | `.btn-ghost` | `[ ALL PROJECTS ON GITHUB ]` link |

---

### 5. ProjectCard — [ProjectCard.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/ProjectCard.tsx)

400 px wide card (`.card`) with:

| Element | CSS Class | Detail |
|---|---|---|
| Index | `.card-index` | e.g. `00 /` |
| Pulse dot | `.pulse-dot` | Animated accent-green circle |
| Title | `.card-title` | Uppercase mono heading |
| Description | `.card-description` | Body text |
| Tags | `.tag` | Small bordered pills |
| Links | `.card-link` | "VIEW ON GITHUB" + optional "LIVE SITE", arrow slides on hover |

**Active state:** `.card.active` → brighter accent border + 6 px vertical lift.

---

### 6. Contact — [Contact.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Contact.tsx)

| Element | Detail |
|---|---|
| Giant heading | "HAVE AN IDEA?" (solid) + "LET'S BUILD IT." (outlined stroke text) |
| Word-reveal | Each word fades/slides up individually with staggered delays |
| Buttons | Primary `[ ✉ EMAIL ]` + ghost GitHub & LinkedIn links |

---

### 7. Footer — [Footer.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Footer.tsx)

Minimal bar: `© 2026 ROHAN CYRIAC` on the left, `BUILT WITH NEXT.JS` on the right.

---

### 8. App-Level Overlays — [page.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/page.tsx)

| Overlay | Detail |
|---|---|
| **Custom Cursor** | Small accent dot (`#cursor`) + larger trailing ring (`#cursor-ring`); enlarges over `<a>` and `<button>` elements |
| **Noise Overlay** | Fixed full-screen SVG fractal-noise filter at 3.5 % opacity for a film-grain texture |
| **Scroll Progress Bar** | 2 px accent line on the right edge; shrinks as you scroll down |

---

## Animation Catalogue

### CSS Animations (globals.css)

| Name | Class / Keyframe | Trigger | Description |
|---|---|---|---|
| **Reveal Up** | `.reveal` → `.reveal.in-view` | IntersectionObserver (15 % threshold) | Fades in + slides up 28 px; uses `--ease-spring` |
| **Reveal Left** | `.reveal-left` → `.in-view` | Same observer | Slides in from −40 px on X axis |
| **Reveal Right** | `.reveal-right` → `.in-view` | Same observer | Slides in from +40 px on X axis |
| **Stagger Children** | `.stagger-children > *:nth-child(n)` | Combined with reveal | Adds 0 s → 0.4 s sequential delays to up to 5 children |
| **Word Reveal** | `.word-reveal` → `.in-view` | IntersectionObserver | Per-word fade-up with custom `transitionDelay` per word |
| **Typewriter Blink** | `@keyframes blink` | Always on | Block cursor (`█`) toggles opacity every 0.5 s |
| **Pulse Dot** | `@keyframes pulse-dot` / `.pulse-dot` | Always on | Scales 1 → 0.7 and fades 1 → 0.4 over 2 s (infinite) |

---

### JavaScript Animations

| Animation | File | Mechanism | Description |
|---|---|---|---|
| **Particle Network** | [Hero.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Hero.tsx) | Canvas `requestAnimationFrame` | 280 particles drift slowly; lines drawn between particles < 110 px apart. Fully responsive (resizes canvas on window resize). |
| **Typewriter Effect** | [Hero.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Hero.tsx) | `setTimeout` + React state | Types a word at 100 ms/char, pauses 1.5 s, deletes at 50 ms/char, then cycles to the next word. |
| **Custom Cursor** | [page.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/page.tsx) | `mousemove` + `requestAnimationFrame` | Dot follows mouse instantly; ring follows with 15 % lerp. Both enlarge over interactive elements. Hidden on touch devices via `@media (pointer: coarse)`. |
| **Shelf Drag** | [Projects.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/Projects.tsx) | Mouse/touch event handlers | Drag to scroll the card carousel; on release applies 0.9× momentum, then snaps to nearest card with `--ease-spring` transition. |
| **3D Card Tilt** | [ProjectCard.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/components/ProjectCard.tsx) | `onMouseMove` perspective math | Calculates cursor offset from card center; applies `rotateX` / `rotateY` (±10°) with `perspective(800px)`. Resets on mouse leave. |
| **Scroll Progress** | [page.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/page.tsx) | [scroll](file:///d:/rohansportfolio/portofoliowebsite/src/app/page.tsx#95-99) event listener | Computes `scrollY / (docH - viewportH)` and drives the right-edge progress bar height. |
| **Active Section Tracking** | [page.tsx](file:///d:/rohansportfolio/portofoliowebsite/src/app/page.tsx) | [scroll](file:///d:/rohansportfolio/portofoliowebsite/src/app/page.tsx#95-99) event + `getBoundingClientRect` | Determines which section is in the viewport center to highlight the matching nav link. |

---

### Transition Summary

| Property | Duration | Easing | Used By |
|---|---|---|---|
| All buttons | 0.22 s | `ease` | `.btn-primary`, `.btn-ghost`, `.card-link` |
| Reveal animations | 0.75 s | `--ease-spring` | `.reveal`, `.reveal-left`, `.reveal-right` |
| Word reveal | 0.5 s | `--ease-spring` | `.word-reveal` |
| Card tilt | 0.6 s | `--ease-spring` | `.card` transform |
| Shelf slide | 0.5 s | `--ease-spring` | Projects shelf `translateX` |
| Nav background | 0.4 s | `ease` | `.nav` background & border |
| Cursor size | 0.2 s | default | `#cursor`, `#cursor-ring` width/height |

---

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| **≤ 768 px** | Nav links + status hidden; sections padded 1.5 rem; about grid → single column; cards → 320 px; scroll indicator hidden |
| **≤ 480 px** | Extra-tight padding (1 rem); cards → 280 px; smaller buttons; footer stacks vertically |
