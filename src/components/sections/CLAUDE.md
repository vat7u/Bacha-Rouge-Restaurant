# sections

## Overview
One component per landing-page section, in page order. They are static markup plus `data-*` hooks; all animation is applied by [`../motion`](../motion/CLAUDE.md). Only the reservation form is a client component. Every visible string comes in through a `t` prop (a slice of `Dictionary` from `@/i18n/dictionaries`); `Hero` and `Menu` also take `locale`.

## Interface
- `Hero` — [Hero.tsx] nav, `BACHA`/`ROUGE` split title (`HeroWord`), hanging pendant lamp, tagline and CTAs; nav links hide under 760px via CSS.
- `Intro` — [Intro.tsx] "La Maison" on the ivory arch panel with three photos, the fez and a spinning ornament.
- `Experience` — [Experience.tsx] pinned "The five experiences" scene driven by the `CHAPTERS` array (label, script title, subtitle, text and photo per experience; copy from `docs/bacha-rouge-five-experiences.md`). The arch is framed by two nested CSS borders (`data-exp-frame`) and a diamond keystone (`data-exp-gem`).
- `Gastronomy` — [Gastronomy.tsx] pinned "La Table" scene with circular photo reveal and the tagine, which drops in at the centre then slides left (animated in `LandingMotion`).
- `Menu` — [Menu.tsx] doorway to the menu: a decorative "BACHA" word beside the category titles from `MENU` (`@/content/menu`), each linking to `/menu#<category id>`, plus a link to the full menu. Keeps `id="carte"` and the ivory arch panel. With motion allowed the panel is `300vh` with a sticky stage, and `LandingMotion` slides the titles past the word (one lit at a time); with reduced motion or no script it is a short, fully visible list. Under 760px the word sits above the titles.
- `Gallery` — [Gallery.tsx] horizontal track built from the `FRAMES` array plus a closing "COME IN." block.
- `Reservation` — [Reservation.tsx] arch ornament, headline, `ReservationForm`, entrance photo and `Info` blocks (address, hours, phone, email, Instagram placeholders).
- `ReservationForm` — [ReservationForm.tsx] `"use client"` form with `sent` state.
- `Footer` — [Footer.tsx] logo, location line, back-to-top link.

## Invariants
- Anchor ids used by nav and CTAs must stay: `top`, `maison`, `experience`, `table`, `carte`, `galerie`, `reserver`.
- The `data-*` attributes are a contract with `LandingMotion`; renaming one silently disables its animation.
- Experience: the first caption is visible, the rest start with `opacity:0; visibility:hidden`; the first label starts at opacity 1, the rest at 0.4.
- Gastronomy heading carries `data-split-manual` so the generic reveal skips it (the scene timeline animates it).
- `Experience` pairs `t.chapters[i]` with `PHOTOS[i]`, and `Gallery` pairs `t.frames[i]` with `FRAMES[i]`; the dictionary types fix these lengths at 5 and 7.
- Decorative French lines (`FLOURISHES`) stay French in every language and carry `lang="fr"`.
- `ReservationForm` submits language-neutral guest values (`GUEST_VALUES`); only the labels are translated.
- Contact values come from `CONTACT` in `@/content/contact`.
- Photos are served from `public/assets/ta/*.jpg`; images use `next/image` with explicit `sizes`.
- Address, hours, phone, email and Instagram are placeholders awaiting real data.

## Side Effects
- `ReservationForm`: `onSubmit` calls `preventDefault()` and sets `sent`; no network request is made, so nothing reaches the restaurant yet.
- Hero logo and lamp images use `preload`.

## Verification
- Run: `npm run lint` and `npm run build`
