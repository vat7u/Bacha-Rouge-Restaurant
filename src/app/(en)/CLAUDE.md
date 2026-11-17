# app/(en)

## Overview
The English root layout and home page. English lives at the site root (`/`, `/menu`), so this route group is its own Next.js root layout, separate from the prefixed languages in `../[lang]`.

## Interface
- [layout.tsx] `metadata` (`{ metadataBase }`) and default export `RootLayout({ children })` — renders `<html lang="en" className={fontVariables}>` around `<body>`; imports `../fonts` and `../globals.css`.
- [page.tsx] `metadata` — title and description from `getDictionary("en").meta`, alternates from `languageAlternates("en", "/")`; default export `Home` renders `<HomePage locale="en" />`.
- `menu` — [./menu/CLAUDE.md](./menu/CLAUDE.md) the English menu page at `/menu`.

## Invariants
- English must never be reachable under `/en`; the `[lang]` pages call `notFound()` for it.
- Layouts use the Next.js 16 typed helper `LayoutProps<"/">`.
- Moving between this layout and `../[lang]` (for example `/menu` to `/fr/menu`) is a full page load, because they are different root layouts.

## Side Effects
- `metadataBase` is set only when `NEXT_PUBLIC_SITE_URL` is defined.

## Verification
- Run: `npm run lint` and `npm run build`, then open `/`.
