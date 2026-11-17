# components

## Overview
React components for the site, split by responsibility: the home page and its sections, one animation owner, the menu page, and small shared primitives. `HomePage({ locale })` [HomePage.tsx] loads the dictionary and renders the sections inside `LandingMotion`, passing each its slice of text.

## Subdirectories & Boundaries
- sections: [./sections/CLAUDE.md](./sections/CLAUDE.md) - one component per page section; markup plus `data-*` animation hooks; the reservation form is the only client component.
- motion: [./motion/CLAUDE.md](./motion/CLAUDE.md) - `LandingMotion`, the single GSAP controller wrapping the page, and `reviewsCarousel.ts`, the reviews-strip behaviour it calls.
- menu: [./menu/CLAUDE.md](./menu/CLAUDE.md) - `MenuPage({ locale })`, the full menu: header with language links, allergy and prices notes, sticky category bar, every dish from `@/content/menu`. Server-rendered HTML and CSS only; it must not import GSAP or `LandingMotion`.
- ui: [./ui/CLAUDE.md](./ui/CLAUDE.md) - `W`/`words()` headline splitting, the `Photo` image, the `GiltFrame` picture frames and the `LanguageSwitcher`.
