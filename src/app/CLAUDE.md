# app

## Overview
Next.js App Router entry: the root layout (fonts and metadata), the design tokens and shared CSS classes, and the single landing page that composes all sections inside the motion wrapper.

## Interface
- `RootLayout` — [layout.tsx] loads `Bodoni_Moda` (`--font-bodoni`, normal + italic, `opsz` axis), `Jost` (`--font-jost`, weights 300/400/500) and `Pinyon_Script` (`--font-pinyon`); applies the three variables to `<html lang="en">`; exports `metadata` (title "Bacha Rouge — Chefchaouen" and description).
- `Home` — [page.tsx] renders `LandingMotion` around `Hero`, `Intro`, `Experience`, `Gastronomy`, `Menu`, `Gallery`, `Reservation`, `Footer` in that order.
- [globals.css] Tailwind v4 `@theme inline` tokens: colours `ivory`, `gold`, `oxblood`, `wine`, `crimson`, `ink`, `chaouen`, `velvet`; fonts `font-sans` / `font-serif` / `font-script`.
- [globals.css] component classes: `.frame-border` (uses `--fw`), `.split-word`, `.plaster-bg`, `.hero-vignette`, `.pendant` / `.pendant-chain` / `.hero-glow` (use `--pw`), `.exp-stage`, `.herringbone-bg`, `.gastro-scrim`, `.gal-checker`, `.res-shade`, `.field`.
- [icon.png] browser-tab icon (the logo).

## Invariants
- Layout uses `LayoutProps<"/">`, the Next.js 16 typed-routes helper.
- Font variables must match the `@theme` mappings (`--font-jost`, `--font-bodoni`, `--font-pinyon`).
- CSS image URLs point into `public/assets/` (`/assets/frame.png`, `plaster.png`, `herringbone.png`, `chain.png`).
- `html, body` are `overflow-x: clip` on `--color-ink`; pinned scenes depend on no horizontal scroll.
- The `.pendant-chain` height formula `calc(112vh - var(--pw) * 3.02)` assumes the lamp image ratio (440×1493).

## Side Effects
- `next/font/google` downloads and self-hosts the three fonts at build time.

## Verification
- Run: `npm run lint` and `npm run build`
