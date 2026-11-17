# content

## Overview
Site content that is data rather than page text: the contact details shared by every language, the guest reviews copied from Google, and the restaurant menu. Home-page wording lives in `../i18n/dictionaries`, not here.

## Interface
- [contact.ts] `CONTACT` — `street`, `whatsapp` / `whatsappDisplay` (reservations), `phone` / `phoneDisplay`, `instagramHandle`, `instagramUrl` and `mapsUrl` (the Google Maps place page). `waLink(text?)` builds the `wa.me` link (message encoded with `encodeURIComponent`), `telLink(digits)` the `tel:` link, and `WHATSAPP_MARKER` (`[Website]`) is the first line of every WhatsApp request. Read by `Reservation` and `ReservationForm`.
- [reviews.ts] `REVIEWS` (ten Google reviews: `id`, `name`, `stars`, `text`), `REVIEWS_URL` (same as `CONTACT.mapsUrl`), `MAX_REVIEW_WORDS` (46) and the `Review` type. `validateReviews` runs on import and fails the build on an empty name or text, stars outside 1 to 5, a duplicate or malformed id, `<` in the text, more than 46 words, a non-https link, or fewer than four reviews. `docs/Bacha-reviews.json` is the reference copy only.
- `menu` — [./menu/CLAUDE.md](./menu/CLAUDE.md) the menu in three languages, its build-time check and how to edit it.

## Invariants
- Numbers are stored as digits only; display text and links are built from them so they cannot drift. The restaurant has no email, so there is no email field.
- Review text stays word for word (spelling, capitals, apostrophes, spacing); a line break in the original becomes one space. The strip's card heights are sized for `MAX_REVIEW_WORDS`: raising it means re-measuring them in `ReviewsStrip`.
- `WHATSAPP_MARKER` is how the staff count website requests; its square brackets are deliberate.
- `CONTACT` is language-neutral: one value serves `/`, `/fr` and `/es`.

## Side Effects
- None. Static data.

## Verification
- Run: `npm run lint` and `npm run build`
