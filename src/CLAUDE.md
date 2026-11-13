# src

## Overview
Application source for the Bacha Rouge site, using the `@/*` import alias. Routing, layout and global styling live in `app`; reusable UI and animation live in `components`.

## Subdirectories & Boundaries
- app: [./app/CLAUDE.md](./app/CLAUDE.md) - App Router root layouts per language, fonts, design tokens, the `Home` page and the menu pages.
- components: [./components/CLAUDE.md](./components/CLAUDE.md) - home sections, the GSAP motion wrapper, the menu page and shared UI primitives.
- content/menu: [./content/menu/CLAUDE.md](./content/menu/CLAUDE.md) - the menu data in three languages, its build-time check, and how to edit it.
- i18n: `i18n/config.ts` - `LOCALES` (`en`, `fr`, `es`), `Locale`, `Localized`, `isLocale()` and `localePath()` (English unprefixed, others `/fr/...`, `/es/...`). No contract file.
