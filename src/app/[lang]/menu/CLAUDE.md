# app/[lang]/menu

## Overview
The French and Spanish menu routes, served at `/fr/menu` and `/es/menu`. A thin page: it validates the language segment, sets the metadata and renders the shared `MenuPage`. These URLs are targets of the restaurant's QR codes.

## Interface
- [page.tsx] `generateMetadata({ params })` — returns `{}` for an unknown language; otherwise title and description from `MENU_UI.metaTitle[lang]` / `MENU_UI.metaDescription[lang]` and `alternates` from `languageAlternates(lang, "/menu")`.
- [page.tsx] default export `Page({ params })` — awaits `params`, calls `notFound()` unless `isLocale(lang)` and `lang !== DEFAULT_LOCALE`, then renders `<MenuPage locale={lang} />`.

## Invariants
- `params` is a Promise and must be awaited (Next.js 16 typed helper `PageProps<"/[lang]/menu">`).
- `/en/menu` must 404 so it never duplicates `/menu` (`lang === DEFAULT_LOCALE` check).
- The prefixed languages come from `generateStaticParams` in `../layout.tsx`; this page adds none of its own.
- `/fr/menu`, `/es/menu` and their category anchors are permanent (QR codes).

## Side Effects
- None at runtime. Language alternates (hreflang) are emitted only when `NEXT_PUBLIC_SITE_URL` is set.

## Verification
- Run: `npm run lint` and `npm run build`, then open `/fr/menu` and `/es/menu`.
