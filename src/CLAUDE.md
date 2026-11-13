# src

## Overview
Application source for the Bacha Rouge site, using the `@/*` import alias. Routing, layout and global styling live in `app`; reusable UI and animation live in `components`.

## Subdirectories & Boundaries
- app: [./app/CLAUDE.md](./app/CLAUDE.md) - App Router root layouts per language, fonts, design tokens, the `Home` page and the menu pages.
- components: [./components/CLAUDE.md](./components/CLAUDE.md) - home sections, the GSAP motion wrapper, the menu page and shared UI primitives.
- content/menu: [./content/menu/CLAUDE.md](./content/menu/CLAUDE.md) - the menu data in three languages, its build-time check, and how to edit it.
- content/contact.ts: `CONTACT` (street, phone, email, Instagram, maps URL), shared by every language. Values in [brackets] are placeholders. No contract file.
- i18n: no contract file.
  - `i18n/config.ts`: `LOCALES` (`en`, `fr`, `es`), `Locale`, `Localized`, `isLocale()` and `localePath()` (English unprefixed, others `/fr/...`, `/es/...`).
  - `i18n/dictionaries/`: `Dictionary` type and `en`/`fr`/`es` home-page text; `getDictionary(locale)`; `FLOURISHES`, the decorative French lines shown in every language (render with `lang="fr"`).
  - `i18n/metadata.ts`: `metadataBase` and `languageAlternates(locale, path)`, both empty until `NEXT_PUBLIC_SITE_URL` is set.
