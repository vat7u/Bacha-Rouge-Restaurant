# components/menu

## Overview
The read-only menu page, used for `/menu`, `/fr/menu` and `/es/menu`. It is opened on guests' phones in the restaurant, so it is plain server-rendered HTML and CSS: no animation, no client JavaScript.

## Interface
- [MenuPage.tsx] `MenuPage({ locale })` — the whole page: header (logo link home plus `LanguageSwitcher` with `tone="light"` and `path="/menu"`), title with the prices and allergy notes, a sticky category bar, one `<section id={category.id}>` per category in `MENU` (sections with optional title and note, dishes with name, description and price or price variants), and a footer repeating the notes with a back-to-top link.
- Internal helpers `Price`, `Item` and `Section` are not exported. Dish text, prices and fixed wording come from `MENU` / `MENU_UI` in `@/content/menu`.

## Invariants
- Must not import GSAP, `LandingMotion` or any client component, and must not use `"use client"`.
- Each category section keeps `id={category.id}`, and the sticky bar links to `#<category id>`; these anchors are linked from the home page and QR codes.
- Prices render as `amount` plus `MENU_UI.currency[locale]`; a dish whose `price` is an array renders one labelled line per variant.
- Layout is a single column capped at `max-w-[760px]` with 44px-high tap targets for the category links.

## Side Effects
- None. Pure render of static data.

## Verification
- Run: `npm run lint` and `npm run build`, then open `/menu`, `/fr/menu` and `/es/menu`.
