# components

## Overview
React components for the site, split by responsibility: the home page and its sections, one animation owner, the menu page, and small shared primitives. `HomePage({ locale })` [HomePage.tsx] loads the dictionary and renders the sections inside `LandingMotion`, passing each its slice of text.

## Subdirectories & Boundaries
- sections: [./sections/CLAUDE.md](./sections/CLAUDE.md) - one component per page section; markup plus `data-*` animation hooks; the reservation form is the only client component.
- motion: [./motion/CLAUDE.md](./motion/CLAUDE.md) - `LandingMotion`, the single GSAP/ScrollTrigger controller wrapping the page.
- menu: `menu/MenuPage.tsx` - the full menu page (`MenuPage({ locale })`): header with language links, allergy and prices notes, sticky category bar, every dish from `@/content/menu`. Server-rendered HTML and CSS only; it must not import GSAP or `LandingMotion`. No contract file.
- ui: [./ui/CLAUDE.md](./ui/CLAUDE.md) - `W`/`words()` headline splitting, the `Photo` image and the `LanguageSwitcher`.
