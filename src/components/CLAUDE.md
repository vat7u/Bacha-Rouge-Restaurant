# components

## Overview
React components for the landing page, split by responsibility: static section markup, one animation owner, and tiny shared primitives.

## Subdirectories & Boundaries
- sections: [./sections/CLAUDE.md](./sections/CLAUDE.md) - one component per page section; markup plus `data-*` animation hooks; the reservation form is the only client component.
- motion: [./motion/CLAUDE.md](./motion/CLAUDE.md) - `LandingMotion`, the single GSAP/ScrollTrigger controller wrapping the page.
- menu: `menu/MenuPage.tsx` - the full menu page (`MenuPage({ locale })`): header with language links, allergy and prices notes, sticky category bar, every dish from `@/content/menu`. Server-rendered HTML and CSS only; it must not import GSAP or `LandingMotion`. No contract file.
- ui: [./ui/CLAUDE.md](./ui/CLAUDE.md) - `W`/`words()` headline splitting and the `Photo` image.
