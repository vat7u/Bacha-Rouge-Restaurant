# app/(en)/menu

## Overview
The English menu route, served at `/menu`. A thin page: it sets the metadata and renders the shared `MenuPage` for English. This URL is the target of the restaurant's QR codes.

## Interface
- [page.tsx] `metadata` — title and description from `MENU_UI.metaTitle.en` / `MENU_UI.metaDescription.en` (`@/content/menu/ui`); `alternates` from `languageAlternates("en", "/menu")`.
- [page.tsx] default export `Page` — renders `<MenuPage locale="en" />` from `@/components/menu/MenuPage`.

## Invariants
- The URL `/menu` and its category anchors (`#salads` … `#drinks`) are permanent: treat them as printed on QR codes.
- English is never reachable under `/en/menu`; the prefixed routes are handled by `../../[lang]/menu`.
- The page takes no params and is statically prerendered.

## Side Effects
- None at runtime. Language alternates (hreflang) are emitted only when `NEXT_PUBLIC_SITE_URL` is set.

## Verification
- Run: `npm run lint` and `npm run build`, then open `/menu`.
