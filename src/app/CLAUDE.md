# app

## Overview
Next.js App Router entry. There are two root layouts: `(en)/` serves English at the site root (`/`, `/menu`) and `[lang]/` serves the prefixed languages (`/fr/menu`, `/es/menu`). Fonts, design tokens and shared CSS classes sit beside them. The landing page exists in English only for now; the menu page exists in all three languages.

## Interface
- `fontVariables` — [fonts.ts] loads `Bodoni_Moda` (`--font-bodoni`, normal + italic, `opsz` axis), `Jost` (`--font-jost`, weights 300/400/500) and `Pinyon_Script` (`--font-pinyon`, not preloaded); both root layouts put it on `<html>`.
- `RootLayout` — [(en)/layout.tsx] `<html lang="en">`; exports the site `metadata`.
- `RootLayout` — [[lang]/layout.tsx] `generateStaticParams` returns `fr` and `es`; sets `<html lang>` from the param.
- Menu pages — [(en)/menu/page.tsx] and [[lang]/menu/page.tsx] render `MenuPage` with a locale and translated title/description; the `[lang]` page calls `notFound()` for unknown languages and for `en`.
- `Home` — [(en)/page.tsx] renders `LandingMotion` around `Hero`, `Intro`, `Experience`, `Gastronomy`, `Menu`, `Gallery`, `Reservation`, `Footer` in that order.
- [globals.css] Tailwind v4 `@theme inline` tokens: colours `ivory`, `gold`, `oxblood`, `wine`, `crimson`, `ink`, `chaouen`, `velvet`; fonts `font-sans` / `font-serif` / `font-script`.
- [globals.css] component classes: `.frame-border` (uses `--fw`), `.split-word`, `.plaster-bg`, `.hero-vignette`, `.pendant` / `.pendant-chain` / `.hero-glow` (use `--pw`), `.exp-stage`, `.herringbone-bg`, `.gastro-scrim`, `.gal-checker`, `.res-shade`, `.field`.
- [icon.png] browser-tab icon (the logo).

## Invariants
- Layouts and pages use the Next.js 16 typed helpers (`LayoutProps<"/[lang]">`, `PageProps<"/[lang]/menu">`); `params` is a Promise and must be awaited.
- `next.config.ts` enables `cacheComponents`, so the `dynamicParams`, `dynamic` and `revalidate` route options are unavailable; unknown languages are rejected with `notFound()` in the page.
- English must never be reachable under `/en`. Do not redirect by browser language.
- Moving between the two root layouts (e.g. `/menu` to `/fr/menu`) is a full page load.
- No `metadataBase`, hreflang alternates or sitemap yet: they need the production domain.
- Font variables must match the `@theme` mappings (`--font-jost`, `--font-bodoni`, `--font-pinyon`).
- CSS image URLs point into `public/assets/` (`/assets/frame.png`, `plaster.png`, `herringbone.png`, `chain.png`).
- `html, body` are `overflow-x: clip` on `--color-ink`; pinned scenes depend on no horizontal scroll.
- The `.pendant-chain` height formula `calc(112vh - var(--pw) * 3.02)` assumes the lamp image ratio (440×1493).

## Side Effects
- `next/font/google` downloads and self-hosts the three fonts at build time.

## Verification
- Run: `npm run lint` and `npm run build`
