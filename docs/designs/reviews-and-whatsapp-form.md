# Reviews Strip and WhatsApp Reservation Form

* **Author:** AZZOUZ Othman
* **Date:** 2026-11-17

## Overview

The reservation section at the bottom of the home page gets two changes that serve one goal: getting a visitor to book a table.

1. **A reviews strip.** A full-width strip near the top of the reservation section shows ten hand-picked Google reviews, copied word for word, in a random order each time the page loads. Each card has the reviewer's name, the star count and the quote; the name does not link anywhere. Three cards show at a time on wide screens, two on tablets and one on phones. Next and Previous buttons move through the cards with the Flip animation from the GSAP CodePen "Flip Caterpillar With Controls"; phones can also swipe. Nothing moves by itself. A link such as "See all reviews on Google" opens the restaurant's Google Maps page. There is no overall rating number, so nothing goes stale.
2. **A form that opens WhatsApp.** Today the form sends nothing. It shows "request received" and keeps no data. After the change, pressing the button opens WhatsApp with a message already written to +212 763 960 486, in the language of the page the guest is on. The guest must press Send in WhatsApp. The "phone or email" field is removed because WhatsApp shows the sender's number. Every message starts with the line `[Website]`, so the staff can count requests that came from the site. The Telephone line of the contact block shows both +212 763 960 486 (reservations on WhatsApp) and +212 606 799 619 (the number on the restaurant's Google profile). The same block also gets the real address and opening hours from the Google Maps page, and loses its email row.

No Google API is used. The reviews come from a fixed file that the owner fills by hand. The site needs no server code for either part, so the hosting choice does not affect this work.

## Analysis

Six independent reviewers read the concept against the real code. Their findings, deduplicated and ordered by how much they matter:

### The WhatsApp form is the riskier part, and it matters more for bookings

* **The thank-you message is false after this change.** Today `ReservationForm.tsx` calls `setSent(true)` and the English text says "request has been received". With WhatsApp, nothing reaches the restaurant until the guest presses Send. A guest who closes WhatsApp will believe they have booked. The text must say that nothing is sent until they press Send and that the table is not booked until the restaurant replies. The button should say "Send via WhatsApp" or "Request a table", not "Reserve" or "Book".
* **The new window can be blocked.** On iPhone Safari and inside in-app browsers (the Instagram browser is likely traffic), a window opened after any delay is blocked. The handler must open it immediately inside the submit event. The thank-you state must also show a normal link to the same WhatsApp address, so the guest can tap it if the window was blocked. Because the browser does not tell us when a window is blocked, the link must always be shown.
* **A computer without WhatsApp lands on a "Continue to chat" page.** The text should say so. The plain phone numbers stay visible for guests who cannot use WhatsApp.
* **Building the message.** The address is `https://wa.me/212763960486?text=` plus the message encoded with `encodeURIComponent` (digits only, no "+"). The first line is `[Website]`, then one labelled line per field, leaving out the note line when it is empty. Keep `[Website]` in one named constant. It is the success measure, and the repo uses square brackets to mean "placeholder".
* **Party size.** `GUEST_VALUES` is in an odd order (`2, 1, 3, 4, 5, 6+`). The message must use the translated label (`t.guestOptions[...]`), never a number from the list position.
* **Date and time.** The date input returns `2026-12-24`-style text. Format it for the page language with `Intl.DateTimeFormat` and `timeZone: "UTC"`, otherwise some time zones show the wrong day. Time stays as 24-hour `HH:MM`.
* **The form needs the page language.** A `locale` value has to be passed from `HomePage` to `Reservation` to `ReservationForm`. The message template belongs in the dictionaries, with the same placeholders in all three languages.
* **Counting `[Website]` messages gives a minimum, not a total.** Guests can edit the first line, and guests who never press Send leave no trace. The owner should know this.
* **Staff language.** Messages will arrive in English, French or Spanish. Someone has to read and answer in all three.
* **Contact block.** Keep one digits-only WhatsApp number in `contact.ts` and build the `wa.me` and `tel:` links from it so they cannot drift apart. Use guest-friendly labels ("Reservations (WhatsApp)", "Telephone"), not "Google profile phone". The email row is removed because the restaurant has no email address, and the Instagram row uses the real page (https://www.instagram.com/bacharouge_restaurant/). The owner placed both numbers in the Telephone line of this block, not in the footer.
* **Smaller points.** Cap the field lengths. Block past dates, computed in the browser to avoid a mismatch with the pre-built page. Move focus to the thank-you panel. Offer an "Edit request" button. With one field gone, make the note field span the full row.

### The reviews strip fits the page, but the CodePen cannot be copied as it is

* **The CodePen clones cards and adds them outside React.** The cloned cards would repeat the quote for screen readers, be processed twice when the page switches between phone and desktop mode, and be duplicated again by React's development double-mount. Do not clone. Render the ten real cards once and rotate the real cards. The cleanest way is to change a rank attribute on each card between `Flip.getState` and `Flip.from`, not to hold the window in React state.
* **Cleanup has to reset the animation lock.** If the page switches mode in the middle of an animation, the `isAnimating` flag can stay `true` and the buttons stop working. Cleanup must stop the Flip animation, reset the flag, clear leftover inline styles and remove listeners.
* **The Flip behaviour with hidden cards is unverified.** Nobody could confirm how Flip treats a card that switches to `display: none`. Before building the section, build a small test of about 30 lines: the leaving card shrinks toward the bottom-left, no inline style is left behind, and the new card grows in from the right on Next and from the left on Previous. Scaling text distorts the quote, so prefer Flip with `scale: false`. If the test fails, fall back to hand-written move and scale animations.
* **Correction.** I told the reviewers that Flip has no typings. That was wrong: the file is `node_modules/gsap/types/Flip.d.ts`, so `import { Flip } from "gsap/Flip"` should type-check. Register it next to `useGSAP` and `ScrollTrigger`, then confirm with `npm run build`.
* **Who owns the animation is not settled.** One reading keeps the strip as plain server markup and puts the behaviour in a helper module called only from `LandingMotion`, so the contract lines "single owner of all GSAP" and "`ReservationForm` is the only client component" stay true. The other reading makes the strip its own client component with its own animation setup. That is simpler to write but rewrites those contract lines. The first is cheaper for the contracts. Either way, use a new hook family (`data-rv-*`) and do not put `data-stagger`, `data-item`, `data-reveal` or `data-split` on the cards, because their fade-in tweens fight Flip. Reveal the whole strip once from its wrapper.
* **Card count at tablet width.** Three cards at 761px are about 220px wide each, which is too narrow. Use one card below 760px, two from 760 to 1099px and three from 1100px, decided by CSS and not by a number in JavaScript.
* **Fixed height needs a rule.** Set the card height per screen size and do not use line clamping, because a clipped quote is no longer the quote as written. Add a maximum length that fails the build.
* **Reduced motion, no JavaScript and swipe.** The Next and Previous handlers must still work when motion is reduced, with an instant swap, so do not wire them inside the existing `if (motion)` blocks. Without JavaScript the buttons do nothing, so hide them until the script starts and show a still row of cards. Swipe should use pointer events with `touch-action: pan-y`, a movement of about 40px, and must not swallow taps on links. No autoplay means no pause control is required.
* **Accessibility.** A labelled region for the carousel, real `button` elements with translated labels, 44px touch targets and a visible focus ring. Cards outside the window and cards leaving get `inert` and `aria-hidden`. Each quote is a `blockquote lang="en"` with the name outside it. Stars are decorative with a translated "5 out of 5 stars" label. The Google link says it opens in a new tab.
* **The data file.** Create `src/content/reviews.ts` and copy the ten reviews as plain text, with line breaks turned into spaces; do not import the JSON at run time. Add a build-time check in the style of `validateMenu`: non-empty name and text, whole-number stars from 1 to 5, unique ids, no `<` characters, a maximum length, `https` links, and at least four reviews so the loop cannot break. Store the Google place link once.
* **Verbatim traps in the ten.** Keep Pablo's lower-case start, Imane's "Good food , good service" with the space before the comma, the curly apostrophes, the "&" in alisha's quote and her lower-case name. Do not title-case anything. Styling the name in capitals with CSS is fine. Guy Who Travels' original has a paragraph break (`<br>`) and writes "desert" for dessert; keep the spelling, turn the break into a space, and keep the text free of HTML.

### Where the strip goes

* **It pushes the form down.** Every "Reserve" button on the page jumps to `#reserver`, which would now land on the reviews, with the form more than a screen and a half below on a phone. There are three options: (a) put the strip below the two-column area so the form does not move; (b) keep it above but compact on phones, and move the `#reserver` id to the form area so buttons still land on the form; (c) keep it as specified and accept the cost. Option (b) changes a documented anchor contract.
* **Decision (owner): option (b).** The strip stays above the heading and form, and is compact on phones. The id `reserver` moves from the `<section>` to the wrapper around the heading and form, so every "Reserve" button and the nav link land on the form. The id name does not change. A visitor who clicks a "Reserve" button skips the reviews, since they have already decided to book; everyone else meets the reviews while scrolling down. The page has no fixed header, so no scroll offset is needed.
* **What "compact on phones" means (to confirm when built):** one card at a time, a card height fitted to the longest of the ten quotes (46 words) at 320px wide, small 44px buttons, no extra heading, and a total strip height that stays well under half a phone screen. Measure it on a real phone before settling the numbers.
* **Width and spacing.** "Full width" should mean the same 1320px cap and side padding as the rest of the section, so edges line up. The section's existing large gap would double around a third block, so use about 40px.
* **Animation side effects.** The arch drawing is safe, since it only touches SVG shapes. A taller section moves the start points of later scroll animations, which are measured when the page refreshes. A fixed card height prevents late changes.

### Simplicity

* One reviewer argued for shipping the WhatsApp form first, because it is small and drives bookings, and for replacing Flip, the endless loop and the clones with a plain row of cards that scrolls and snaps into place. That gives swipe, keyboard scrolling and reduced motion for free, and Previous and Next buttons would take about ten lines. On wide screens it could also be a 3-by-2 grid with no controls.
* The counter-argument is that the owner explicitly chose the Flip look, and with ten cards and three visible, rotating real cards is cheap, but only after the test above passes.
* If the scope has to shrink, cut in this order: the clones, the endless loop, and the middle screen size. (The "Copy message" button was kept and the names do not link to reviews, by the owner's choice.) Do not cut the fallback link, the honest thank-you wording, the build-time check or the `lang="en"` marks.

### What the concept leaves out

* **Nobody checked Google's rules on reproducing reviews.** Reviews can be edited or removed by their authors. Keep the "See all reviews on Google" link and agree on a removal process for when a reviewer or Google asks. (Owner decision: no removal process is planned. Deleting the entry from the reviews file is the only step needed.)
* **Ten hand-picked 5-star quotes with no overall number can look curated.** The link to all reviews is the honest answer. On the French and Spanish pages, a short line saying the quotes are in their original language helps.
* **Do not add review markup for search engines.** Hand-copied reviews are not first-party data, such markup would be self-serving and risks a penalty, and it would drift from Google's live numbers.
* **Staff process.** Someone has to watch the WhatsApp number and reply, and say who and in which language.
* **Weight.** Flip adds about 10 to 12 KB compressed. Import it only in the carousel module so the menu page stays free of GSAP.
* **Long links break.** Dropped: names do not link to the original reviews, so the long per-review links are not stored.
* **No test runner exists**, so a manual check list is needed: iPhone Safari, Android Chrome, a computer without WhatsApp, a pop-up blocker on, all three languages, special characters (`& # é ñ` and an emoji) in the name and note, rapid clicks, resizing between 1440, 390 and 900px at rest and mid-animation, reduced motion switched on live, 320px and 200% zoom, and a keyboard-only pass.

### Dictionaries, contact details and contract files

Order that keeps the build working:

1. `contact.ts`: add the digits-only WhatsApp number, both display numbers and a link helper. Keep `phone` for now.
2. New `src/content/reviews.ts` with its build-time check.
3. `types.ts`, additions only: reviews labels (title, previous, next, see all, stars label), the WhatsApp message template, the retry link label, the new thank-you text, the phone labels, and the real hours and address text.
4. `en.ts`, `fr.ts` and `es.ts` together, since a new required key breaks the build until all three have it.
5. The form changes.
6. The strip markup and the carousel.
7. Removals last: `form.contact` and the email label from the types and all three dictionaries, `CONTACT.email`, and `CONTACT.phone` if it is replaced. Fill in `CONTACT.street`, `CONTACT.instagram` and the Google place link at step 1.
8. Update each contract file in the same step as its code, not at the end.

Contract sentences that become false: in the root `CLAUDE.md`, "The reservation form does not transmit data", the placeholder line for phone, the technology line (add Flip), and the anchors line, since `#reserver` will point at the form area and not at the top of the section; in `src/CLAUDE.md`, the content line; in `components/CLAUDE.md`, "the reservation form is the only client component" and the single-controller line; in `sections/CLAUDE.md`, the `Reservation` and `ReservationForm` entries and the placeholder rule; in `motion/CLAUDE.md`, "single owner", the plugin registration line, the hook list and the cleanup rule; in `content/CLAUDE.md`, the `CONTACT` shape and the reviews file; in `dictionaries/CLAUDE.md`, the new labels, the removed field and the `GUEST_VALUES` pairing. After the change, search for "does not transmit", "only client component", `t.contact` and `CONTACT.phone`. The new French and Spanish texts, including the message that reaches the staff, need a native speaker's check, and belong on the existing proofreading list.

## Goals vs. Non-Goals

* **In-Scope Goals:**
  * A reviews strip under the arch ornament in the reservation section, with ten English quotes in a random order each page load, name and stars per card (no links to the original reviews), no overall rating number, a link to all reviews on Google, Next and Previous buttons, swipe on phones, and no autoplay.
  * Cards that stay at a fixed height, so the form never jumps, and an instant swap for visitors who reduce motion.
  * The `#reserver` anchor moved to the form area, so every "Reserve" button lands on the form and not on the reviews.
  * A reservation form that opens WhatsApp with a message in the page's language, starting with `[Website]`, with the phone and email field removed and honest wording after submit.
  * Both phone numbers shown, labelled for guests.
  * A build-time check on the reviews file.
* **Out-of-Scope Non-Goals:**
  * Any Google API, any server code, any automatic fetching of reviews.
  * An overall rating or review count on the page.
  * Autoplay or pausing controls for it.
  * Review markup for search engines.
  * Analytics, and any way of recording guests who never press Send.
  * Translating the reviews.
  * Automatic sending of reservations (a WhatsApp Business API or an email service).

## Alternatives Weighed

* **Google Places API.** Rejected. It returns at most five reviews of Google's choosing, needs a key and a billing account, and limits how the data can be shown and stored.
* **Google Business Profile API.** Rejected. It lists all reviews, but needs approval from Google, a login by the profile's owner, and a stored token that can edit the restaurant's Google listing.
* **Live rating number.** Rejected. A hand-typed number goes stale, and a live one needs the API above.
* **Dated rating line ("4.7 on Google, Nov 2026").** Rejected by the owner in favour of no number and a link.
* **Slider that moves by itself.** Rejected. Moving text beside a form pulls attention away from it, quotes can disappear before they are read, and visitors who reduce motion cannot use it.
* **The CodePen exactly as written (cloning cards).** Rejected. Clones duplicate text for screen readers and escape React and the cleanup.
* **Plain scroll-and-snap row instead of Flip.** Rejected by the owner for launch. It is cheaper and accessible by default, but looks plainer than the CodePen. It stays as the last resort if neither Flip nor hand-written tweens can produce the look reliably.
* **Strip below the form.** Rejected by the owner. It would protect the form's position, but visitors would see the reviews only after the form. The strip stays above, compact on phones, with the `#reserver` anchor moved to the form.
* **Automatic WhatsApp or email sending.** Rejected. It needs a server, an account and approval. The owner chose a WhatsApp link because the restaurant already takes reservations there.

## Key Decisions & Staging for Next Steps

**Decided**

* No API; ten reviews copied word for word from `docs/Bacha-reviews.json` into the site.
* The ten reviews (the owner chose option (b)): Yuki Wong, Pablo Salazar, Christine Wong, Lala Taghiyeva, alisha kumar, Imane R, Ashlee Booker, Mo Metwally, Cynia Manning, Guy Who Travels. The longest is 46 words, so the quote limit is about 46 words. The four short reviews left out are Alex Burba, David Yin, Tyrone Pope and Marten Riehl. The ten are shown in a random order each time the page loads. Because the list is exactly ten, "ten at random" means a random order; adding reviews to the file later makes the choice of ten random too.
* Guy Who Travels' review has a paragraph break in the original and the spelling "desert" for dessert. Both stay as written (the break may be shown as a space).
* No overall rating number; a link to the Google reviews instead.
* Quotes in English on all three language pages; labels around them translated.
* Full-width strip under the ornament; three cards at a time on wide screens; one on phones with swipe; Next and Previous buttons; no autoplay.
* Form opens WhatsApp to +212 763 960 486 in the page's language; the phone/email field is dropped; both numbers are shown.
* The strip sits above the heading and form, compact on phones. The id `reserver` moves to the wrapper around the heading and form so "Reserve" buttons land on the form.
* Keep the Flip look from the CodePen, rotating the ten real cards (no clones). Build the 30-line Flip test first. If it fails, rebuild the same look with hand-written GSAP move and scale tweens; the scroll-and-snap row is the last resort.
* Card size and count are left to the implementer, fitted to each screen width. Starting point: one card below 760px, two from 760 to 1099px, three from 1100px. Card width follows the column; card height is set per width to fit the longest of the ten quotes (46 words), with no clipping. Check on a phone, a tablet and a laptop before settling.

* Reviewer names are shown on each card but do not link to the original Google review. The per-review link field is dropped.
* The WhatsApp message goes out in the language of the page the guest is on, in English, French or Spanish. The staff accept messages in any of them.
* Both phone numbers go in the Telephone line of the reservation section's contact block (the owner pointed at that element), not in the footer. The number the form uses is the WhatsApp one, +212 763 960 486. The other number (+212 606 799 619) needs no special label ("Telephone" is enough).
* Address and opening hours come from the Google Maps page, read on 2026-11-17: address "Derb Chorfa, Chefchaouen 91000"; hours 11:30 to 23:00 every day of the week (Google marks hours as possibly different on public holidays). They replace the placeholders in the contact block in all three languages. The Directions link should point at the real Google Maps place page, not a search.
* No email address exists, so the email row is removed. Instagram stays, with the real page: https://www.instagram.com/bacharouge_restaurant/.
* The thank-you state offers both "Edit request" and "Copy message", next to the WhatsApp link.
* The date field blocks past dates.
* Messages starting with `[Website]` will be counted by the restaurant. The count is a minimum. No person is named yet.
* The owner chose not to plan a removal process for reviews and accepts the risk that a reviewer or Google may ask for one. A review can always be removed by deleting its entry from the reviews file.

**Still to decide (owner)**

None. Every question raised so far has an answer. The owner should read this brief once, confirm it, and choose the handoff step.

**Staging**

1. Settle the open decisions above.
2. Build the WhatsApp form first: contact numbers, dictionaries (all three languages together), form changes, honest thank-you state, fallback link.
3. Build the 30-line Flip test with real nodes. If it fails, switch to hand-written GSAP tweens for the same look before considering the scroll-and-snap row.
4. Build the reviews file and its build-time check, then the strip and carousel.
5. Update the contract files with each step, then search for the leftover sentences listed above.
6. Run `npm run lint` and `npm run build`, then the manual check list on real phones.
7. Have the French and Spanish texts checked by native speakers before launch.
