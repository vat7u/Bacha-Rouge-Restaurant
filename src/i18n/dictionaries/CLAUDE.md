# i18n/dictionaries

## Overview
All visible home-page text, one typed file per language, plus the lookup function. French and Spanish must match the English shape exactly, so a missing string fails type-checking instead of showing a blank on the page.

## Interface
- [index.ts] `getDictionary(locale)` — returns the `Dictionary` for `en`, `fr` or `es`.
- [index.ts] `FLOURISHES` — decorative French lines shown in every language: `place`, `welcome`, `tagine`, `gallery`, `door`, `farewell`.
- [index.ts] re-exports the types `Chapter`, `Dictionary`, `GalleryFrame`, `HeadlinePart`.
- [types.ts] `Dictionary` — slices `meta`, `nav`, `hero`, `intro`, `experience`, `table`, `carte`, `gallery`, `reservation` (with `form`), `footer`; each section component receives one slice as its `t` prop.
- [en.ts], [fr.ts], [es.ts] — the `en`, `fr` and `es` dictionaries.

## Invariants
- Every language file satisfies `Dictionary`; add a field to `types.ts` first, then to all three files.
- Array lengths are fixed by the types because scroll scenes pair items by index: `experience.chapters` is five, `gallery.frames` is seven, `reservation.form.guestOptions` is six, `intro.paragraphs` is two.
- `reservation.form.guestOptions` is in the same order as `GUEST_VALUES` in `components/sections/ReservationForm.tsx`; the WhatsApp message shows the label, never the list position.
- `reservation.reviews` holds only the labels around the reviews strip (`stars` contains `{n}`); the quotes are English and live in `@/content/reviews`.
- `reservation.form.message` (`greeting`, `note`) and the form labels build the WhatsApp message, which reaches the staff in the page's language. `reservation.phones` labels the two numbers.
- The reservation slice has no `email`, `form.contact` or `form.thanks` any more; the panel after submit uses `sentTitle`, `sentText`, `openAgain`, `noWhatsapp`, `edit`, `copy`, `copied` and `copyFailed`.
- `FLOURISHES` stays French in every language; render it with `lang="fr"`.
- `intro.headline` parts with `tone: "red"` or `tone: "blue"` mark the coloured words; `Intro` shows the `blue` word in italic and in the `ink` colour, not blue.
- `table.dishesLabel` and `table.fullMenu` are the labels around the signature dishes panel in `Gastronomy`; the dish names and prices themselves come from `@/content/menu`, not from here.
- Home-page text belongs here, not in components. Menu text belongs in `@/content/menu`.

## Side Effects
- None. Static objects.

## Verification
- Run: `npm run lint` and `npm run build`; ask a native speaker to proofread `fr.ts` and `es.ts` before launch (they were translated without review, including the WhatsApp message text and the reviews labels).
