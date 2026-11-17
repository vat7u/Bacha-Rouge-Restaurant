# sections

## Overview
One component per landing-page section, in page order. They are static markup plus `data-*` hooks; all animation is applied by [`../motion`](../motion/CLAUDE.md). Only the reservation form is a client component. Every visible string comes in through a `t` prop (a slice of `Dictionary` from `@/i18n/dictionaries`); `Hero`, `Gastronomy` and `Menu` also take `locale`.

## Interface
- `Hero` — [Hero.tsx] nav, `BACHA`/`ROUGE` split title (`HeroWord`), hanging pendant lamp, tagline and CTAs; nav links hide under 760px via CSS.
- `Intro` — [Intro.tsx] "La Maison" on the ivory arch panel with three photos (the dining room in an arch `GiltFrame`, revealed inside the still frame), the fez and a spinning ornament.
- `Experience` — [Experience.tsx] pinned "The five experiences" scene driven by the `CHAPTERS` array (label, script title, subtitle, text and photo per experience; copy from `docs/bacha-rouge-five-experiences.md`). The chapter photos change inside a still square `GiltFrame`; the small red-framed mask photo (`data-exp-mask`) lands over its right edge at the end.
- `Gastronomy` — [Gastronomy.tsx] pinned "La Table" scene (`280vh`) with circular photo reveal and the tagine, which drops in at the centre then slides left, followed by a list of four signature Moroccan dishes (names and prices read from `@/content/menu` by id, each linking to `/menu#moroccan-specialties`). Takes `locale` and `t`; throws at build if a dish id is missing from the menu (animated in `LandingMotion`).
- `Menu` — [Menu.tsx] doorway to the menu: a decorative "BACHA" word beside the category titles from `MENU` (`@/content/menu`), each linking to `/menu#<category id>`, plus a link to the full menu. Keeps `id="carte"` and the ivory arch panel. With motion allowed the panel is `300vh` with a sticky stage, and `LandingMotion` slides the titles past the word (one lit at a time); with reduced motion or no script it is a short, fully visible list. Under 760px the word sits above the titles.
- `Gallery` — [Gallery.tsx] horizontal track built from the `FRAMES` array plus a closing "COME IN." block. `arch` frames use an arch `GiltFrame` (their `size` is a height only); `framed` ones keep the red `.frame-border`.
- `Reservation` — [Reservation.tsx] takes `locale` and `t`. Arch ornament, then `ReviewsStrip`, then the grid carrying `id="reserver"`: headline, `ReservationForm`, entrance photo in a square `GiltFrame` (revealed inside the still frame) and `Info` blocks (address, hours, both phone numbers as `wa.me` / `tel:` links, Instagram link).
- `ReviewsStrip` — [ReviewsStrip.tsx] server markup for the reviews carousel: a region (`data-rv`) with a viewport (`data-rv-viewport`), one card per entry of `REVIEWS` (`data-rv-card`: stars, `blockquote lang="en"`, name), the source line, the Google link and Previous/Next buttons (`data-rv-prev`, `data-rv-next`, hidden until `data-rv-ready`). The visible count comes from the CSS variable `--rv-visible` (1 below 761px, 2 up to 1279px, 3 from 1280px); card heights are fixed per width (266 / 310 / 290px) and sized for `MAX_REVIEW_WORDS`. Without JavaScript the cards form a sideways-scrolling row.
- `ReservationForm` — [ReservationForm.tsx] `"use client"` form (name, date, time, guests, note). Takes `locale` and `t`. Submitting opens WhatsApp with the message; the form stays mounted (hidden) under a status panel with "Open WhatsApp again", "Edit request" and "Copy message".
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
- Photos are served from `public/assets/ta/` (`.jpg` and `.webp`); images use `next/image` with explicit `sizes`.
- Intro shows the headline word with `tone: "blue"` in italic and in the `ink` colour, not blue.
- Address, hours, phone numbers and Instagram are real but typed by hand; there is no email row.
- Review cards never carry `data-stagger`, `data-item`, `data-reveal` or `data-split` (their tweens would fight Flip); the strip is revealed once from its wrapper.
- The WhatsApp message is built from labelled lines: `WHATSAPP_MARKER`, `t.message.greeting`, then `Label: value` per field (the note line only when filled). The date uses `Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" })` and the party size uses the translated `guestOptions` label.

## Side Effects
- `ReservationForm`: `onSubmit` calls `window.open(wa.me link, "_blank", "noopener")` inside the submit event, so pop-up blockers allow it. The site makes no network request; the request only reaches the restaurant if the guest presses Send in WhatsApp. The date field's `min` (today) is set in the browser after load.
- Hero logo and lamp images use `preload`.

## Verification
- Run: `npm run lint` and `npm run build`
