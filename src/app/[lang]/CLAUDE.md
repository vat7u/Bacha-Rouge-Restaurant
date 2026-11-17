# app/[lang]

## Overview
The root layout and home page for the prefixed languages, French (`/fr`) and Spanish (`/es`). English is served by the `(en)` root layout instead, so this route only ever renders the non-default languages.

## Interface
- [layout.tsx] `metadata` (`{ metadataBase }`), `generateStaticParams()` (every locale except `DEFAULT_LOCALE`, so `fr` and `es`) and default export `RootLayout({ children, params })` — awaits `params` and renders `<html lang>` with the language, falling back to `DEFAULT_LOCALE` for an unknown value.
- [page.tsx] `generateMetadata({ params })` — `{}` for an unknown language, otherwise the dictionary's title and description plus `languageAlternates(lang, "/")`; default export `Home({ params })` — calls `notFound()` unless `isLocale(lang)` and `lang !== DEFAULT_LOCALE`, then renders `<HomePage locale={lang} />`.
- `menu` — [./menu/CLAUDE.md](./menu/CLAUDE.md) the French and Spanish menu pages at `/fr/menu` and `/es/menu`.

## Invariants
- `params` is a Promise and must be awaited (typed helpers `LayoutProps<"/[lang]">` and `PageProps<"/[lang]">`).
- `next.config.ts` sets `cacheComponents: true`, so the `dynamicParams`, `dynamic` and `revalidate` route options are unavailable; unknown languages are rejected with `notFound()` in the page.
- `/en` must 404 so it never duplicates `/`. Do not redirect by browser language.
- The layout's `<html lang>` fallback exists only so the attribute is always valid; the 404 comes from the page.

## Side Effects
- `metadataBase` is set only when `NEXT_PUBLIC_SITE_URL` is defined.

## Verification
- Run: `npm run lint` and `npm run build`, then open `/fr` and `/es`.
