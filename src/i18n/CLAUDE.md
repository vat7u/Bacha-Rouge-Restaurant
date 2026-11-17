# i18n

## Overview
Language plumbing for the three supported languages (English, French, Spanish): the language list and URL rules, the search-engine language links, and the home-page text in `dictionaries`.

## Interface
- [config.ts] `LOCALES` (`en`, `fr`, `es`), `Locale`, `DEFAULT_LOCALE` (`en`), `Localized` (one string per language), `LOCALE_NAMES`, `isLocale(value)` and `localePath(locale, path)`.
- [metadata.ts] `metadataBase` and `languageAlternates(locale, path)`.
- `dictionaries` — [./dictionaries/CLAUDE.md](./dictionaries/CLAUDE.md) the typed home-page text per language, `getDictionary` and `FLOURISHES`.

## Invariants
- English is unprefixed and the other languages are prefixed: `localePath("en", "/menu")` is `/menu`, `localePath("fr", "/menu")` is `/fr/menu`, and `localePath("fr", "/")` is `/fr`.
- `languageAlternates` returns `undefined` unless `NEXT_PUBLIC_SITE_URL` is set; when set it lists every language plus `x-default`, which points at the default language.
- A new language needs an entry in `LOCALES`, `LOCALE_NAMES`, a dictionary file, and menu text for every dish and label in `@/content/menu`.

## Side Effects
- [metadata.ts] reads `process.env.NEXT_PUBLIC_SITE_URL` once at module load.

## Verification
- Run: `npm run lint` and `npm run build`
