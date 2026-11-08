# components

## Overview
React components for the landing page, split by responsibility: static section markup, one animation owner, and tiny shared primitives.

## Subdirectories & Boundaries
- sections: [./sections/CLAUDE.md](./sections/CLAUDE.md) - one component per page section; markup plus `data-*` animation hooks; the reservation form is the only client component.
- motion: [./motion/CLAUDE.md](./motion/CLAUDE.md) - `LandingMotion`, the single GSAP/ScrollTrigger controller wrapping the page.
- ui: [./ui/CLAUDE.md](./ui/CLAUDE.md) - `W`/`words()` headline splitting, `Eyebrow` label, `Photo` cover image.
