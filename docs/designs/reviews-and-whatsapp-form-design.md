# Reviews Strip and WhatsApp Reservation Form

*   **Author:** AZZOUZ Othman
*   **Status:** Draft
*   **Date:** 2026-11-17

--------------------------------------------------------------------------------

## Overview

The reservation section at the bottom of the Bacha Rouge home page is where a visitor decides whether to book. This design makes three changes there:

1. A strip of ten guest reviews from Google, copied word for word, shown above the heading and the form.
2. A reservation form that opens WhatsApp with the request already written, because WhatsApp is how the restaurant takes reservations.
3. Real contact details (address, opening hours, both phone numbers, Instagram) in place of the placeholders.

The site stays fully static. No Google API and no server code are used.

## The Problem

1. **The site shows no proof from other guests.** The restaurant's Google profile has 4.7 stars from 619 reviews (read on 2026-11-17), but a visitor at the booking section sees none of it.
2. **The reservation form sends nothing.** `ReservationForm.tsx` only calls `preventDefault()` and sets a local "sent" flag, and the screen then says "request received". Once the site is online, guests would think they have booked while the restaurant hears nothing.
3. **The contact block holds placeholders.** Street address, hours, phone, email and Instagram all show text in square brackets. The restaurant has no email address.

The solution is to bring selected Google reviews onto the page as fixed text, to turn the form into a pre-filled WhatsApp message that the guest sends, and to fill the contact block from the restaurant's Google Maps page and the details the owner supplied.

## Goals

*   **Reviews strip.**
    *   Shows ten reviews copied verbatim from `docs/Bacha-reviews.json`: Yuki Wong, Pablo Salazar, Christine Wong, Lala Taghiyeva, alisha kumar, Imane R, Ashlee Booker, Mo Metwally, Cynia Manning and Guy Who Travels.
    *   Each card shows the reviewer's name, the star count and the quote. The name is not a link.
    *   The order is random each time the page loads.
    *   No quote is longer than 46 words, and a build check enforces this.
    *   Cards stay at a fixed height, so the form below never moves.
    *   On phones the whole strip (card, source line, Google link and buttons) is about 330px tall, roughly 40% of an 812px screen, using a tighter layout: 14px quote text and one row of controls.
    *   Three cards show from 1100px wide, two from 760px to 1099px, and one below 760px.
    *   Next and Previous buttons move through the cards with the Flip effect from the GSAP CodePen "Flip Caterpillar With Controls". Phones also support swipe. Nothing moves by itself.
    *   A link opens the restaurant's Google Maps page in a new tab. No overall rating or review count is shown.
    *   Quotes are English on all three language pages and are marked `lang="en"`. The labels around them are translated.
*   **Placement.** The strip is full width, directly under the arch ornament and above the heading and form, and compact on phones. The id `reserver` moves to the wrapper around the heading and form, so every "Reserve" button lands on the form.
*   **WhatsApp form.**
    *   Submitting opens WhatsApp to +212 763 960 486 with a message in the language of the page the guest is on.
    *   The first line is the fixed marker `[Website]`, followed by the name, date, time, party size and note.
    *   The "phone or email" field is removed, and past dates are blocked.
    *   After submitting, the page does not claim the request was received. It says nothing is sent until the guest presses Send in WhatsApp, and it offers an "Open WhatsApp again" link, an "Edit request" button and a "Copy message" button.
*   **Contact block.** Shows the real address (Derb Chorfa, Chefchaouen 91000), the hours (11:30 to 23:00 every day), both phone numbers (+212 763 960 486 and +212 606 799 619) as tappable links, and the Instagram page. The email row is removed. The Directions link opens the real Google Maps place page.
*   **Quality bar.** `npm run lint` and `npm run build` pass. The three dictionaries (English, French, Spanish) stay in the same typed shape. The `CLAUDE.md` contracts that describe the changed behaviour are updated in the same change.
*   **Measurable result.** The restaurant can count the WhatsApp messages that start with `[Website]`.

## Non-Goals

*   Any Google API (Places or Business Profile), and any fetching of reviews at run time.
*   An overall rating or review count on the page.
*   Autoplay, and a pause control for it.
*   Review or rating structured data for search engines.
*   Analytics, and any record of guests who open WhatsApp but never press Send.
*   Translating the reviews.
*   Links from reviewer names to the original reviews.
*   A process for removing a review when a reviewer or Google asks. The owner accepted this risk.
*   Sending reservations automatically (WhatsApp Business API, email service, or any server).
*   Changes to the menu pages, which stay free of GSAP and client JavaScript.
*   Showing the phone numbers in the footer.

## Open Questions

*   **Does Flip work with hidden cards?** Nobody has confirmed how Flip treats a card whose display switches to none. A test of about 30 lines comes before the strip is built. If it fails, the same look is rebuilt with hand-written GSAP move and scale tweens.
*   **Who watches +212 763 960 486 and replies?** The brief does not say who answers requests during opening hours, or how quickly.
*   **Who counts the `[Website]` messages?** The restaurant counts them, but no person is named. The count is a minimum, because guests can edit the first line and guests who never press Send leave no trace.
*   **Who keeps the opening hours current?** They are typed into the site by hand, and Google marks them as possibly different on public holidays.
*   **French and Spanish text.** The new strings, including the message that reaches the staff, need a native speaker's check before launch.

## Critical User Journeys (CUJs)

### CUJ 1: A visitor reads reviews and requests a table

*   **Given**: A visitor on the home page in any of the three languages, with WhatsApp installed.
*   **When**: They scroll to the reservation section, read the review cards, fill in name, date, time and party size, and press the submit button.
*   **Then**: WhatsApp opens with a message in the page's language, starting with `[Website]`, addressed to +212 763 960 486. The page tells the visitor to press Send, and shows the "Open WhatsApp again", "Edit request" and "Copy message" actions. The visitor never sees text saying the request was received.

### CUJ 2: A visitor's WhatsApp window is blocked or WhatsApp is missing

*   **Given**: A visitor on an iPhone, in an in-app browser, or on a computer without WhatsApp.
*   **When**: They submit the form and no WhatsApp window appears.
*   **Then**: The thank-you state shows a normal link to the same WhatsApp address, a "Copy message" button, and the plain phone numbers, so the visitor still has a way to reach the restaurant.

### CUJ 3: A visitor taps a "Reserve" button

*   **Given**: A visitor anywhere on the home page.
*   **When**: They tap the "Reserve" button in the navigation, the hero or the gallery.
*   **Then**: The page scrolls to the heading and form, not to the reviews strip.

### CUJ 4: A visitor browses the reviews

*   **Given**: A visitor on a laptop, a phone, or using only a keyboard, or one who has asked their device to reduce motion.
*   **When**: They use the Next and Previous buttons, or swipe on a phone.
*   **Then**: The cards change by the Flip effect, or instantly when motion is reduced. The strip's height does not change, and the form below does not move. Every card is readable and reachable by keyboard. A visible link leads to all reviews on Google.

## Technical Plan (Architecture)

The change touches four places: a new reviews data file, a new server-rendered strip, a new behaviour helper that `LandingMotion` calls, and the reservation section's form and contact block. Nothing runs on a server at request time and no new dependency is added; the Flip plugin already ships inside the installed `gsap` package.

```text
 src/content/reviews.ts ──(10 reviews + Google link, checked at build)──┐
                                                                         ▼
 src/i18n/dictionaries ──(labels, WhatsApp text, hours)──► Reservation.tsx (server)
 src/content/contact.ts ─(numbers, address, Instagram)──►   ├─ arch ornament (SVG)
                                                            ├─ ReviewsStrip.tsx (server markup, data-rv-* hooks)
                                                            └─ <div id="reserver"> grid
                                                                 ├─ heading, ReservationForm.tsx (client)
                                                                 └─ photo frame + contact block

 HomePage ► LandingMotion (client, single animation owner)
                └─ initReviewsCarousel(strip)  ◄── src/components/motion/reviewsCarousel.ts
                     shuffle → Flip next/prev → swipe → cleanup

 Guest taps submit ► ReservationForm builds message + wa.me link ► window.open (inside the click)
                    ► thank-you panel: honest text, link, Edit request, Copy message
```

### 1. Reviews data

*   `src/content/reviews.ts` exports `REVIEWS` (ten entries, each with a stable `id`, the reviewer's `name` exactly as Google shows it, whole-number `stars`, and the `text` as plain text) and `REVIEWS_URL` (the Google Maps place link `https://www.google.com/maps/search/?api=1&query=Bacha%20Rouge%20Restaurant&query_place_id=ChIJYedjYzQnCw0RgiQDqUs0jKY`).
*   The text is copied from `docs/Bacha-reviews.json` and never imported from it at run time. A paragraph break in the original becomes a space. Spelling, capitals, curly apostrophes, "&" and spacing stay as written ("Good food , good service" keeps its space before the comma).
*   A build-time check, written like `validateMenu` in `src/content/menu/index.ts`, collects every problem and throws one error. It checks that name and text are not empty, stars are whole numbers from 1 to 5, ids are unique, the text has no `<` character and no more than 46 words, `REVIEWS_URL` starts with `https://`, and there are at least four reviews, so the loop can never run out of hidden cards.
*   The per-review links in the JSON are not copied.

### 2. The strip markup (server component)

*   `ReviewsStrip` renders a region with an `aria-roledescription` of carousel and a translated label. Inside it are a viewport, ten cards, Previous and Next buttons, and the Google link. It has no `"use client"` line.
*   Each card is a `figure` holding a decorative star row with a translated text label (for example "5 out of 5 stars", built from a `{n}` placeholder), a `blockquote` with `lang="en"`, and a `figcaption` with the name outside the quote.
*   The Google link reads "See all reviews on Google" and also says it opens in a new tab, both translated. It uses `rel="noopener"`.
*   Hooks used by the behaviour helper: `data-rv` (the region), `data-rv-viewport`, `data-rv-card`, `data-rv-prev` and `data-rv-next`. The cards carry none of `data-stagger`, `data-item`, `data-reveal` or `data-split`, because the page-wide fade-in animations write inline styles that would fight Flip.
*   The number of visible cards is a CSS decision: a custom property is 1 below 760px, 2 from 760px to 1099px, and 3 from 1100px. Card height is also set per width in CSS, sized for the longest quote (46 words) at that width, without line clamping. Below 760px the layout is tighter (14px quote text, smaller padding, and one row holding the source line, the Google link and the buttons) so the whole strip stays near 330px.
*   Without JavaScript all ten cards stay in the HTML as a still row that scrolls sideways and snaps, and the Previous and Next buttons stay hidden. The buttons are revealed only when the helper starts.
*   The whole strip appears once, using the existing `data-reveal` on its outer wrapper. The cards themselves are never revealed individually.

### 3. The behaviour helper (Option A)

*   `src/components/motion/reviewsCarousel.ts` exports one function that takes the strip element and whether motion is allowed, and returns a cleanup function. `LandingMotion` calls it inside its existing animation setup and adds the returned cleanup to its own.
*   **Order on load.** The cards are in file order in the HTML. The helper shuffles them in the browser after the page loads, by writing a rank number on each card, so React is not involved and there is no mismatch with the pre-built page. The strip sits near the bottom of a long page, so visitors do not see the reorder.
*   **Visible window.** Cards whose rank is outside the first `visible` ranks get `display: none`, `inert` and `aria-hidden`. The helper reads `visible` from the CSS custom property and re-reads it when the screen width crosses a breakpoint, then recomputes without animation.
*   **Next and Previous.** The helper saves the card positions with `Flip.getState`, changes the ranks (Next rotates the first card to the end; Previous rotates the last card to the front), then runs `Flip.from`. The leaving card shrinks toward the bottom-left on Next and the bottom-right on Previous, and the entering card grows from the opposite side. The real cards are moved; none are cloned. Scaling is turned off for the text itself where possible, because scaled text distorts the quote.
*   **Lock.** A flag ignores clicks while an animation runs. It is reset when the animation completes or is interrupted.
*   **Swipe.** Pointer events on the viewport with `touch-action: pan-y`. A horizontal movement of more than about 40px, larger than the vertical movement, counts as a swipe: left means Next, right means Previous. Taps on the Google link are not swallowed.
*   **Reduced motion.** The same handlers are wired, but the rank change is applied at once with no Flip. This wiring is outside the existing `if (motion)` blocks.
*   **Cleanup.** Kills the running Flip animation, resets the lock, clears inline styles and ranks, restores the original card order, removes every listener, and re-hides the buttons. This makes the helper safe to start twice (React's development double-mount) and safe when the page switches between phone and desktop mode in the middle of an animation.
*   **Flip test first.** Before the strip is built, a test of about 30 lines checks three things: the leaving card shrinks toward the correct corner, no inline style is left on any card, and the entering card grows from the correct side on Next and on Previous. If it fails, the same look is rebuilt with hand-written GSAP move and scale tweens.

### 4. `LandingMotion` changes

*   Register Flip beside `useGSAP` and `ScrollTrigger` with `import { Flip } from "gsap/Flip"` (its typings are in `node_modules/gsap/types/Flip.d.ts`).
*   Call the helper once for the strip, and add its cleanup to the function the animation setup already returns (today that function only removes one `focusin` listener).
*   Import Flip only from here and the helper, so the menu pages stay free of GSAP.

### 5. The reservation form (client component)

*   `ReservationForm` receives the page language and the text slice. `Reservation` and `HomePage` pass the language down, which `Reservation` does not receive today.
*   Fields: name, date, time, party size and note. The "phone or email" field is removed. The date field's minimum is today, computed in the browser after the page loads, so it cannot differ from the pre-built HTML. Lengths are capped (about 80 characters for the name and 300 for the note).
*   On submit the handler builds the message and the address `https://wa.me/212763960486?text=` followed by the message passed through `encodeURIComponent` (digits only in the number, no "+"). It opens that address with `window.open(url, "_blank", "noopener")` directly inside the click handler, with no timer or waiting.
*   **Message.** The first line is the constant `[Website]`, then one labelled line per field, and no note line when the note is empty. The template and labels come from the dictionary of the page language, with the same placeholders in all three languages. The date uses `Intl.DateTimeFormat(language, { dateStyle: "full", timeZone: "UTC" })` so no time zone shifts the day. The time stays as `HH:MM`. The party size uses the translated label found by looking up the submitted value in `GUEST_VALUES` and reading `guestOptions` at that position, never the list position as a number.
*   **After submit.** The form is replaced by a panel that takes keyboard focus. It says that nothing has been sent until the guest presses Send in WhatsApp and that the table is not booked until the restaurant replies. It shows a normal link to the same address (always shown, because a blocked window cannot be detected), an "Edit request" button that returns to the filled-in form, and a "Copy message" button that copies the message text. A double submit is ignored.
*   The submit button is labelled with words like "Send via WhatsApp", not "Reserve" or "Book".

### 6. Contact block, details and anchor

*   `src/content/contact.ts` gets a digits-only `whatsapp` value (`212763960486`), the display numbers, the real `street` ("Derb Chorfa"), the Instagram handle and page, and the Google place link in place of the search link. The `wa.me` and `tel:` links are built from the digits so they cannot drift. The `email` value is removed.
*   `Reservation` shows the address (street plus "Chefchaouen 91000, Morocco" from the dictionary), the hours (dictionary text for 11:30 to 23:00 every day), both phone numbers as tappable links on the Telephone line (the WhatsApp one labelled for reservations), and the Instagram link. The email row is deleted. The Directions link points at the Google place link.
*   `id="reserver"` moves from the `<section>` to the grid wrapper that holds the heading, the form and the right-hand column. The strip stays above it, so every "Reserve" button lands on the form. No scroll offset is needed because the page has no fixed header. The gap between the section's three blocks is reduced from the current large value to about 40px so the extra block does not double the spacing.

### 7. Dictionaries and types

*   `src/i18n/dictionaries/types.ts` gets additions first: a `reviews` slice (region label, previous, next, see all, new-tab note, stars label with `{n}`), the WhatsApp template and labels, the retry, edit and copy labels, the new thank-you text, the telephone labels, and the hours text. `form.contact` and the email label are removed last.
*   `en.ts`, `fr.ts` and `es.ts` are changed together, because a new required key breaks the build until all three have it.

### Data and failure summary

| Input | Where it comes from | If it is wrong |
| :--- | :--- | :--- |
| Ten reviews | `src/content/reviews.ts`, checked at build | The build fails with one message listing every problem |
| Page language | The route (`/`, `/fr`, `/es`) | An unknown language already ends in a 404 |
| WhatsApp window | Opened inside the click | A blocked window leaves the always-visible link and the copy button |
| Flip animation | `reviewsCarousel.ts` | Falls back to instant swap when motion is reduced; the pre-build test decides if tweens replace Flip |
| Hours and numbers | `contact.ts` and the dictionaries | Stale text is not detected; the owner updates it by hand |

## Alternatives Considered

The first nine come from the brainstorm brief (`docs/designs/reviews-and-whatsapp-form.md`, "Alternatives Weighed"); the tenth and eleventh were decided while drafting this plan.

### Alternative A: Google Places API for the reviews

*   **Pros**: Reviews and ratings stay current without hand-copying; no approval from Google is needed.
*   **Cons**: Returns at most five reviews, chosen by Google, so the owner cannot pick them. Needs an API key, a billing account and a server-side fetch, which the static site does not have. Google's terms limit how the data is shown and how long it can be stored.
*   **Reason for Rejection**: The owner wants to choose the reviews, and does not want a billing account, a key to guard, or a change in how the page is built.

### Alternative B: Google Business Profile API

*   **Pros**: Lists all reviews, so any of them can be chosen in code.
*   **Cons**: Google must approve access before it works. A profile owner has to log in once, and the site's server then stores a token that can reply to reviews and edit the restaurant's Google listing. Needs login setup, token renewal and error handling.
*   **Reason for Rejection**: The approval wait, the powerful stored token and the extra code are out of proportion for ten quotes that a person can copy by hand.

### Alternative C: A live rating number (stars and review count)

*   **Pros**: The strongest proof on the page: 4.7 from 619 reviews.
*   **Cons**: A hand-typed number goes stale, and a live one needs the API in Alternative A.
*   **Reason for Rejection**: Decided with the owner: no number is shown. The "See all reviews on Google" link carries the real figure.

### Alternative D: A dated rating line ("4.7 on Google, Nov 2026")

*   **Pros**: Honest about when the number was read, and keeps the proof on the page.
*   **Cons**: Someone has to remember to retype it, and an old date makes the page look neglected.
*   **Reason for Rejection**: The owner preferred no number and a link to Google.

### Alternative E: A slider that moves by itself

*   **Pros**: Shows more reviews without any action from the visitor.
*   **Cons**: Moving text next to a form pulls attention away from filling it in. Quotes can leave before they are read (a 30-word quote needs about eight seconds). Rules for accessible sites require a way to pause moving content, and visitors who reduce motion cannot use it.
*   **Reason for Rejection**: It works against the booking goal and adds a pause control and extra accessibility work. The owner chose buttons and swipe.

### Alternative F: The CodePen exactly as written (cloning cards)

*   **Pros**: Already works as a demo and is short.
*   **Cons**: It copies the first or last card into a new element outside React. Copies repeat the quote for screen readers, are processed twice when the page switches between phone and desktop mode and again by React's development double-mount, and are not removed by the cleanup.
*   **Reason for Rejection**: The plan keeps the Flip look but moves the ten real cards instead of cloning them.

### Alternative G: A plain scroll-and-snap row instead of Flip

*   **Pros**: Cheapest option. Swipe, keyboard scrolling and reduced motion work with almost no code, and it adds no plugin weight (Flip is about 10 to 12 KB compressed).
*   **Cons**: Looks plainer than the CodePen the owner chose.
*   **Reason for Rejection**: The owner chose the Flip look. It remains the last resort if neither Flip nor hand-written tweens produce the look reliably.

### Alternative H: The strip below the form

*   **Pros**: The form keeps its current position, so a "Reserve" button lands on the form without any change to the anchor.
*   **Cons**: Visitors would meet the reviews only after the form, when they have already decided to fill it in or leave.
*   **Reason for Rejection**: The owner chose the strip above the form, compact on phones, with `id="reserver"` moved to the form area.

### Alternative I: Sending reservations automatically (WhatsApp Business API or an email service)

*   **Pros**: The restaurant would receive every request, including from guests who never press Send, and could count them exactly.
*   **Cons**: Needs a server, an account with a provider and approval. The restaurant has no email address and already takes reservations on WhatsApp.
*   **Reason for Rejection**: The owner chose a WhatsApp link. The cost is that a request only reaches the restaurant when the guest presses Send, which the thank-you wording must say plainly.

### Alternative J: The carousel as its own client component (Option B)

*   **Pros**: Markup, behaviour and cleanup sit in one file, which is easier to read and can be built without touching `LandingMotion`.
*   **Cons**: Two contract sentences become false ("`LandingMotion` is the single owner of GSAP" and "`ReservationForm` is the only client component"). The page then has two animation owners with separate reduced-motion and phone-width conditions that can drift apart, and their scroll triggers can disagree with `LandingMotion`'s page-wide refresh.
*   **Reason for Rejection**: The owner chose Option A, a helper module called by `LandingMotion`.

### Alternative K: The WhatsApp message as one template sentence per language

*   **Pros**: The staff read a natural sentence in each language, for example "I would like a table for {guests} on {date} at {time}", and each language can order the words as it needs.
*   **Cons**: The sentence uses placeholders in every dictionary. A translator who deletes or renames one makes a field vanish from every message, and the type system cannot detect it. A build check would have to be added.
*   **Reason for Rejection**: The owner chose labelled lines (the `[Website]` line, a greeting, then one "Label: value" line per field built from the form's own labels). They need no placeholder syntax, and a missing label is a type error.

--------------------------------------------------------------------------------

## Non-Functional Requirements

*   **Security and privacy.** No secrets are involved: there is no API key and no token. Reviewer names are already public on Google, and the owner accepted the risk of showing them. The form sends nothing to the site's own server; the guest's name, date, time, party size and note travel inside the WhatsApp message to the restaurant's number, so they pass through WhatsApp. External links use `rel="noopener"`.
*   **Performance.** Flip adds about 10 to 12 KB compressed. It is imported only by `LandingMotion` and the new helper, so the menu pages stay free of GSAP. The strip's photos are none; the cards are text and small star graphics. Card heights are fixed, so the strip causes no layout shift and does not move the scroll triggers measured further down the page.
*   **Accessibility.** Required: a labelled carousel region, real buttons with translated labels and a 44px touch target, a visible focus ring, `inert` and `aria-hidden` on hidden cards, `lang="en"` on quotes, a text label for the stars, instant swaps for reduced motion, and no autoplay.
*   **Rollout and rollback.** The site is not published yet, and the change needs no feature flag, data migration or server setting. Rollback is a normal revert of the commits.
*   **Content freshness.** The hours, numbers, address and reviews are typed in by hand and nothing detects stale values. This is an accepted trade-off, listed in the open questions.

### Additional Resources

*   `docs/designs/reviews-and-whatsapp-form.md`: the brief this design follows, with the full reviewer findings.
*   `docs/Bacha-reviews.json`: the source of the ten reviews. Reference only after this change.
*   The CodePen "Flip Caterpillar With Controls" (`codepen.io/GreenSock/pen/eYwbjdz`): the animation the owner chose.
*   The restaurant's Google Maps page (read on 2026-11-17): source of the address, hours and review text.
*   The Next.js 16 guides in `node_modules/next/dist/docs/` (the project's `AGENTS.md` asks for them before Next.js code is written).

### Future Improvements

*   **Show the overall rating (for example "4.7 from 619 reviews").** Needs either a hand-typed number with a date or a live source.
*   **Receive requests without the guest pressing Send.** Needs a server and a messaging or email provider.
*   **Detect stale content.** A build-time warning when the hours or reviews have not changed for a long time.

--------------------------------------------------------------------------------

## Detailed Implementation Plan

The work is one list. Files are in the order they should be changed, so `npm run lint`, `npx tsc --noEmit` and `npm run build` pass after every group. The first thing to build inside the list is the Flip check described in item 9.

### Target Files to Create/Modify

#### 1. `src/content/contact.ts` (Modify)

*   **Type / Scope**: TypeScript data module shared by every language.
*   **Proposed Changes**:
    *   Replace the placeholder values with: `street` = "Derb Chorfa"; `whatsapp` = "212763960486" (digits only); `phone` = "212606799619" (digits only); `whatsappDisplay` = "+212 763 960 486"; `phoneDisplay` = "+212 606 799 619"; `instagramHandle` = "@bacharouge_restaurant"; `instagramUrl` = "https://www.instagram.com/bacharouge_restaurant/"; `mapsUrl` = `https://www.google.com/maps/search/?api=1&query=Bacha%20Rouge%20Restaurant&query_place_id=ChIJYedjYzQnCw0RgiQDqUs0jKY`.
    *   Keep `email` and `instagram` out: the restaurant has no email, and `instagramHandle` plus `instagramUrl` replace `instagram`. The file's header comment is updated to say which values are placeholders (none remain except any left for later).
    *   Add small helpers, with these signatures: `waLink(text?: string): string` returns `https://wa.me/<whatsapp>` with `?text=` plus `encodeURIComponent(text)` only when text is given; `telLink(digits: string): string` returns `tel:+<digits>`. Both build from the digits so the displayed and linked numbers cannot differ.
    *   Add the constant `WHATSAPP_MARKER = "[Website]"` with a comment that it is the success measure and that the square brackets are deliberate, not a placeholder.
    *   `Reservation.tsx` (item 8) is the only current reader of `phone`, `email` and `instagram`. Change it in the same group as this file, so the build passes after the group.

#### 2. `src/content/reviews.ts` (Create)

*   **Type / Scope**: TypeScript data module with a build-time check, written in the style of `src/content/menu/index.ts`.
*   **Proposed Changes**:
    *   Export type `Review = { id: string; name: string; stars: number; text: string }`, the constant `REVIEWS: Review[]` and the constant `REVIEWS_URL`.
    *   `REVIEWS` holds the ten reviews, in this file order, with ids made from the lower-case name joined by dashes: Yuki Wong, Pablo Salazar, Christine Wong, Lala Taghiyeva, alisha kumar, Imane R, Ashlee Booker, Mo Metwally, Cynia Manning, Guy Who Travels. Each is copied from `docs/Bacha-reviews.json` exactly: spelling, capitals, curly apostrophes, "&" and odd spacing ("Good food , good service"; "desert" in Guy Who Travels' review) stay as written. A `<br>` in the original becomes one space. All `stars` are 5.
    *   `REVIEWS_URL` is the same Google place link as `CONTACT.mapsUrl` (`https://www.google.com/maps/search/?api=1&query=Bacha%20Rouge%20Restaurant&query_place_id=ChIJYedjYzQnCw0RgiQDqUs0jKY`). Import it from `contact.ts` and do not write it twice.
    *   A `validateReviews` function runs when the file is first imported and throws one error that lists every problem: empty name or text, stars not a whole number from 1 to 5, duplicate id, text containing `<`, text longer than 46 words, `REVIEWS_URL` not starting with `https://`, fewer than four reviews.
    *   The file's top comment says that docs/Bacha-reviews.json is reference only, that quotes must stay verbatim, and how to remove a review (delete its entry).

#### 3. `src/i18n/dictionaries/types.ts` (Modify, additive first)

*   **Type / Scope**: The `Dictionary` type that all three languages must match.
*   **Proposed Changes**:
    *   Under `reservation`, add `phones: { whatsapp: string; phone: string }` and `reviews: { region: string; previous: string; next: string; seeAll: string; newTab: string; stars: string; source: string }` (`stars` contains the placeholder `{n}`).
    *   Under `reservation.form`, add the keys `sentTitle`, `sentText`, `openAgain`, `noWhatsapp`, `edit`, `copy`, `copied`, `copyFailed`, and `message: { greeting: string; note: string }`.
    *   Keep `email`, `form.contact`, `form.thanks` and the old `submit` text until item 12, so every file still compiles.

#### 4. `src/i18n/dictionaries/en.ts` (Modify)

*   **Type / Scope**: English text.
*   **Proposed Changes**: add the new keys with these values, and change the existing ones noted.
    *   `reservation.city` = "Chefchaouen 91000, Morocco"; `reservation.hoursValue` = "Every day, 11:30 AM – 11 PM".
    *   `reservation.phones` = { whatsapp: "WhatsApp (reservations)", phone: "Phone" }.
    *   `reservation.reviews` = { region: "Guest reviews from Google", previous: "Previous review", next: "Next review", seeAll: "See all reviews on Google", newTab: "(opens in a new tab)", stars: "{n} out of 5 stars", source: "Reviews from Google, shown in English as written" }.
    *   `reservation.form.submit` = "Send via WhatsApp"; `sentTitle` = "WhatsApp is opening"; `sentText` = "Nothing has been sent yet. Press Send in WhatsApp to send your request. Your table is not booked until the restaurant replies."; `openAgain` = "Open WhatsApp again"; `noWhatsapp` = "No WhatsApp on this device? Copy the message or call us."; `edit` = "Edit request"; `copy` = "Copy message"; `copied` = "Copied"; `copyFailed` = "Could not copy. Select the text below."; `message` = { greeting: "Reservation request from the website", note: "Note" }.

#### 5. `src/i18n/dictionaries/fr.ts` (Modify)

*   **Type / Scope**: French text. These strings are written here for the implementer and need a native speaker's check before launch.
*   **Proposed Changes**:
    *   `city` = "Chefchaouen 91000, Maroc"; `hoursValue` = "Tous les jours, 11 h 30 – 23 h".
    *   `phones` = { whatsapp: "WhatsApp (réservations)", phone: "Téléphone" }.
    *   `reviews` = { region: "Avis des clients sur Google", previous: "Avis précédent", next: "Avis suivant", seeAll: "Voir tous les avis sur Google", newTab: "(s’ouvre dans un nouvel onglet)", stars: "{n} étoiles sur 5", source: "Avis Google, affichés en anglais tels qu’écrits" }.
    *   `form.submit` = "Envoyer par WhatsApp"; `sentTitle` = "WhatsApp s’ouvre"; `sentText` = "Rien n’a encore été envoyé. Appuyez sur Envoyer dans WhatsApp pour transmettre votre demande. Votre table n’est pas réservée tant que le restaurant n’a pas répondu."; `openAgain` = "Rouvrir WhatsApp"; `noWhatsapp` = "Pas de WhatsApp sur cet appareil ? Copiez le message ou appelez-nous."; `edit` = "Modifier la demande"; `copy` = "Copier le message"; `copied` = "Copié"; `copyFailed` = "Copie impossible. Sélectionnez le texte ci-dessous."; `message` = { greeting: "Demande de réservation depuis le site", note: "Remarque" }.

#### 6. `src/i18n/dictionaries/es.ts` (Modify)

*   **Type / Scope**: Spanish text, also needing a native speaker's check.
*   **Proposed Changes**:
    *   `city` = "Chefchaouen 91000, Marruecos"; `hoursValue` = "Todos los días, 11:30 – 23:00".
    *   `phones` = { whatsapp: "WhatsApp (reservas)", phone: "Teléfono" }.
    *   `reviews` = { region: "Reseñas de clientes en Google", previous: "Reseña anterior", next: "Reseña siguiente", seeAll: "Ver todas las reseñas en Google", newTab: "(se abre en una pestaña nueva)", stars: "{n} de 5 estrellas", source: "Reseñas de Google, en inglés tal como fueron escritas" }.
    *   `form.submit` = "Enviar por WhatsApp"; `sentTitle` = "Se está abriendo WhatsApp"; `sentText` = "Todavía no se ha enviado nada. Pulse Enviar en WhatsApp para mandar su solicitud. Su mesa no está reservada hasta que el restaurante responda."; `openAgain` = "Abrir WhatsApp de nuevo"; `noWhatsapp` = "¿Sin WhatsApp en este dispositivo? Copie el mensaje o llámenos."; `edit` = "Editar la solicitud"; `copy` = "Copiar el mensaje"; `copied` = "Copiado"; `copyFailed` = "No se pudo copiar. Seleccione el texto de abajo."; `message` = { greeting: "Solicitud de reserva desde la web", note: "Nota" }.

#### 7. `src/components/sections/ReviewsStrip.tsx` (Create)

*   **Type / Scope**: Server component. No `"use client"`, no GSAP import. Takes `t: Dictionary["reservation"]["reviews"]`.
*   **Proposed Changes**:
    *   Outer wrapper carries `data-reveal="up"` (the existing one-time reveal) and a width and padding that match the section's 1320px grid cap and `6vw` side padding.
    *   Inside: a region element with `data-rv`, `aria-roledescription="carousel"`, `aria-label={t.region}` and a group name for CSS (`group/rv`). The `data-rv-ready` attribute is set by the helper when it starts.
    *   A viewport element (`data-rv-viewport`) holding a flex row with a 20px gap. It has the custom property `--rv-visible` set to 1, then 2 from 760px, then 3 from 1100px (Tailwind arbitrary properties with `min-[760px]:` and `min-[1100px]:`). Each card's width is the viewport width minus the gaps, divided by `--rv-visible`.
    *   Before the helper starts, the viewport scrolls sideways with snap points so all ten cards are reachable without JavaScript. When `data-rv-ready` is present, it switches to `overflow: hidden`.
    *   Each of the ten cards (`data-rv-card`, an `li` inside a `ul`) is a `figure` with: a row of star graphics (inline SVG, five of them, gold using the existing `text-gold` token) with a visually hidden label from `t.stars` where `{n}` is replaced by the star count; a `blockquote` with `lang="en"` holding the text; and a `figcaption` with the name in small uppercase letters (11px, `.24em` tracking) outside the quote. No link wraps any card.
    *   Visual style: translucent dark card (`bg-ink/55`), a thin gold border (`border-gold/35`), square corners, padding of about 24px, quote text in Jost, light weight, 15px, line height 1.6 for readability. Below 760px the layout is tighter: padding of about 20px, quote text 14px, line height 1.5. The Flip animation needs each card to be a flex item whose size does not depend on its neighbours.
    *   Card height is set by CSS per width: start with 260px from 1100px, 300px from 760px to 1099px and 270px below 760px. These are starting values: with the longest quote (Guy Who Travels, 46 words), check at 320px, 768px, 1100px and 1440px, and raise a height if the quote touches the card edge. No line clamping or hidden overflow on the quote text.
    *   Below the cards, one row: on the left the `t.source` text (10.5px, uppercase, gold) and the link `t.seeAll` to `REVIEWS_URL` (`target="_blank"`, `rel="noopener"`, followed by a visually hidden `t.newTab`); on the right the Previous and Next buttons (`data-rv-prev`, `data-rv-next`, `type="button"`, 44px, gold border, chevron icons, labels `t.previous` and `t.next`, visible focus ring). The buttons are hidden until `data-rv-ready` is present. On phones the row stays one row: the left cell stacks the small source text above the link, the right cell holds the two buttons (about 48px tall in total), so the whole strip is about 270px of card plus about 60px of row and gap.
    *   The component reads `REVIEWS` from `src/content/reviews.ts`.

#### 8. `src/components/sections/Reservation.tsx` (Modify)

*   **Type / Scope**: Server component for the reservation section.
*   **Proposed Changes**:
    *   Accept `locale: Locale` and pass it to `ReservationForm`.
    *   Remove `id="reserver"` from the `<section>` and put it on the grid wrapper (the `max-w-[1320px]` grid that holds the heading, the form and the right-hand column). Keep `data-res` on the section.
    *   Insert `<ReviewsStrip t={t.reviews} />` between the arch ornament SVG and that grid.
    *   Reduce the gap of the container that holds the three blocks from `clamp(56px,7vw,100px)` to `clamp(32px,4vw,48px)`.
    *   In the contact block: keep the address (street from `CONTACT`, city line from `t.city`) and the Directions link (`CONTACT.mapsUrl`); the hours line stays `t.hoursValue` (now real text).
    *   Telephone line: two lines, each a link. First: label `t.phones.whatsapp`, number `CONTACT.whatsappDisplay`, `href={waLink()}`, `target="_blank"`, `rel="noopener"`. Second: label `t.phones.phone`, number `CONTACT.phoneDisplay`, `href={telLink(CONTACT.phone)}`.
    *   Instagram line: a link with `CONTACT.instagramHandle` to `CONTACT.instagramUrl` (`target="_blank"`, `rel="noopener"`).
    *   Delete the email `Info` row.

#### 9. `src/components/motion/reviewsCarousel.ts` (Create)

*   **Type / Scope**: Plain TypeScript module (not a React component). Imports `gsap` and `Flip` from `gsap/Flip`.
*   **Proposed Changes**: build this file first and exercise it in the browser with the real strip. This is the Flip check; if it fails, rebuild the same look with hand-written GSAP move and scale tweens, and do not continue until one of the two works.
    *   Export `initReviewsCarousel(region: HTMLElement, options: { motion: boolean }): () => void`. The returned function is the cleanup.
    *   On start: remember the original card order; shuffle the cards with Fisher–Yates using `Math.random`; write each card's rank in a `data-rank` attribute; set `data-rv-ready` on the region; reveal the buttons.
    *   Visible count: read the computed value of `--rv-visible` from the viewport; listen for width changes with `matchMedia` at 760px and 1100px; on a change, recompute which ranks are visible with no animation. Cards outside the visible ranks get `display: none`, `inert` and `aria-hidden="true"`; visible cards have those removed.
    *   Next: `Flip.getState(cards)`, rotate ranks (rank 0 becomes the last rank), update visibility, then `Flip.from(state, …)` with `absoluteOnLeave` and `fade`. A leaving card shrinks toward the bottom-left; the entering card grows from the bottom-right. Previous mirrors it (leaving toward the bottom-right, entering from the bottom-left, last rank becomes 0). Use `scale: false` on Flip for the text where this keeps the quote undistorted. Real cards are moved; nothing is cloned or created.
    *   Lock: an `isAnimating` flag blocks further clicks; it is cleared in both `onComplete` and `onInterrupt`.
    *   Reduced motion (`options.motion` false): same handlers, but the ranks are applied at once with no `Flip.from`.
    *   Swipe: pointer events on the viewport, `touch-action: pan-y` on it; a swipe is a horizontal movement over about 40px that is larger than the vertical movement; left means Next, right means Previous; ignored while animating; a tap on the Google link is not treated as a swipe.
    *   Cleanup: kill any running Flip animation, reset the lock, clear inline styles, `data-rank`, `inert` and `aria-hidden`, restore the original card order, remove every listener (buttons, pointer events, `matchMedia`), remove `data-rv-ready`.
    *   The function does nothing and returns a no-op cleanup if the region is missing or has fewer cards than the visible count plus one.

#### 10. `src/components/motion/LandingMotion.tsx` (Modify)

*   **Type / Scope**: The single GSAP owner (client component).
*   **Proposed Changes**:
    *   Import `Flip` from `gsap/Flip` and add it to `gsap.registerPlugin(useGSAP, ScrollTrigger)`.
    *   Import `initReviewsCarousel` and call it once inside the existing `mm.add` callback, after the gallery block and outside every `if (motion)` block, with `{ motion }`. Query the region with `R.querySelector("[data-rv]")` and skip it if absent.
    *   Add the returned cleanup to the function the `mm.add` callback already returns (today it only removes the menu-doorway `focusin` listener), so both run on `mm.revert()`.
    *   No other animation changes. The strip's one-time reveal reuses the existing `[data-reveal]` handling and needs no code here.

#### 11. `src/components/sections/ReservationForm.tsx` (Modify)

*   **Type / Scope**: Client component (stays the only client component among the sections).
*   **Proposed Changes**:
    *   Props: `locale: Locale` and `t: Dictionary["reservation"]["form"]`.
    *   Keep the form mounted at all times; hide it with the `hidden` attribute while the thank-you panel shows, so the guest's entries are still there after "Edit request".
    *   Fields: name (required, `maxLength` 80), date (required, `min` set to today), time (required), guests select, note (`maxLength` 300). Remove the "phone or email" field. Make the note field span the full row. `min` is computed after mount in an effect (stored in state) and uses the visitor's local date, so it cannot disagree with the pre-built HTML.
    *   Submit handler: stop the default action; ignore the event if the panel already shows. Build the message lines, in order: `WHATSAPP_MARKER`; `t.message.greeting`; `<t.name>: <name>`; `<t.date>: <date formatted with Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" })>`; `<t.time>: <HH:MM as entered>`; `<t.guests>: <t.guestOptions at GUEST_VALUES.indexOf(value)>`; and, only if the note is not empty, `<t.message.note>: <note>`. Join with line breaks. Store the message and `waLink(message)` in state, then call `window.open(url, "_blank", "noopener")` directly in the handler with no timer or waiting. Show the panel.
    *   Panel (focus moved to it; `role="status"`, `tabIndex={-1}`): `t.sentTitle`, `t.sentText`, a normal link `t.openAgain` to the stored address (`target="_blank"`, `rel="noopener"`), a button `t.edit` that hides the panel and shows the form again, a button `t.copy` that copies the message with `navigator.clipboard.writeText` and shows `t.copied`; if copying fails, show `t.copyFailed` and the message in a read-only text area that is selected, and `t.noWhatsapp` with both phone numbers as `tel:` links.
    *   The submit button text is `t.submit`. The old "request received" text is deleted.
    *   Keep `GUEST_VALUES` and its comment, and add a comment that this is the one place values are shown in the page's language.

#### 12. `src/components/HomePage.tsx` (Modify)

*   **Type / Scope**: Page assembly.
*   **Proposed Changes**: pass `locale` to `Reservation` (`<Reservation locale={locale} t={t.reservation} />`).

#### 13. `src/i18n/dictionaries/types.ts`, `en.ts`, `fr.ts`, `es.ts` (Modify, removals last)

*   **Type / Scope**: Final removals, done only after items 8 and 11 no longer read the old keys.
*   **Proposed Changes**: remove `reservation.email`, `reservation.form.contact` and `reservation.form.thanks` from the type and from all three files in the same step.

#### 14. Contract files (Modify, updated with each group, not at the end)

*   **Type / Scope**: The `CLAUDE.md` files that describe behaviour this change alters.
*   **Proposed Changes**:
    *   `CLAUDE.md` (root): remove "The reservation form does not transmit data; submitting only flips a local 'sent' state" and replace it with the WhatsApp behaviour and the fact that nothing reaches the restaurant until the guest presses Send; update the placeholders line (phone, address, hours and Instagram are now real; email does not exist); add GSAP Flip to the stack line; change the anchors line so `#reserver` points at the form area; update the `docs` line if needed.
    *   `src/CLAUDE.md`: the `content` line now mentions the reviews data.
    *   `src/components/CLAUDE.md`: change "the reservation form is the only client component" only if it becomes false (it stays true under Option A) and note the new motion helper.
    *   `src/components/sections/CLAUDE.md`: new `ReviewsStrip` entry (server markup, hooks `data-rv-*`); update the `Reservation` entry (takes `locale`, strip above the grid, `id="reserver"` on the grid) and the `ReservationForm` entry (WhatsApp, thank-you panel, no network request by the site); update the placeholders invariant.
    *   `src/components/motion/CLAUDE.md`: add the `data-rv-*` hooks; add Flip to the registration line; document `reviewsCarousel.ts` and its cleanup duty inside the single cleanup; state that cards never carry `data-stagger`, `data-item`, `data-reveal` or `data-split`.
    *   `src/content/CLAUDE.md`: new `reviews.ts` entry with its build-time check, the new `CONTACT` shape and helpers, and that `docs/Bacha-reviews.json` is reference only.
    *   `src/i18n/dictionaries/CLAUDE.md`: new `reservation.reviews`, `phones`, form and `message` keys; the removed `contact`, `email` and `thanks` keys; the `GUEST_VALUES` pairing; the proofreading note now also covers the WhatsApp text.
*   Finish with a search for leftovers: "does not transmit", "only flips", `t.contact`, `t.email`, `CONTACT.phone` as a display string, `CONTACT.email`, `CONTACT.instagram`.

#### Not changed

*   `src/components/sections/Footer.tsx`: the numbers are not in the footer.
*   `src/components/menu/MenuPage.tsx` and every file under `src/app/`: the menu pages stay free of GSAP and client JavaScript.
*   `docs/Bacha-reviews.json`, `concepts_brief.md`, `concepts_brief_reviews.md`: not edited. Nothing is deleted.

### Verification Plan

*   **Compilation/Build**: `npm run build` (this also runs the reviews check). It must pass after every numbered group above.
*   **Unit Tests**: none. No test runner is configured, and none is added.
*   **Static Analysis & Linting**: `npm run lint` and `npx tsc --noEmit`.
*   **Test Coverage Requirement**: none; verification is by the manual matrix below.
*   **Flip check (before building the rest)**: with the real strip, on Next the leaving card shrinks toward the bottom-left and the entering card grows from the bottom-right; on Previous the reverse; no card keeps an inline style after the animation; rapid clicks do not break the lock.
*   **E2E/Integration (manual, in the browser at `npm run dev`)**:
    *   All three languages (`/`, `/fr`, `/es`): reviews in English, labels translated, WhatsApp message in the page's language, starting with `[Website]`, with the party size shown as the translated label.
    *   Widths 320px, 390px, 768px, 900px, 1100px, 1440px, and resizing between them at rest and in the middle of an animation: one, two and three cards; no card clipped; the form below never moves when cards change.
    *   Phone height: at 320px and 390px wide, the whole strip measures about 330px or less (well under half of an 812px screen) with the longest quote showing in full. If it does not, tighten the padding or the heights before raising the limit.
    *   Reduced motion switched on and off while the page is open: instant swaps, then Flip again.
    *   Keyboard only: tab through the buttons and the Google link; focus stays on the pressed button; hidden cards are skipped.
    *   Swipe on a phone or touch emulation; a tap on the Google link still opens it.
    *   "Reserve" buttons (navigation, hero, gallery) land on the form, not on the strip.
    *   Form: past dates blocked; required fields; special characters (`& # é ñ` and an emoji) in the name and note; a blocked window still leaves the link and the copy button; "Edit request" brings back the same entries; double submit ignored.
    *   Real devices: iPhone Safari, Android Chrome, and a computer without WhatsApp.
    *   Contact block: both numbers open WhatsApp and the dialler; Instagram and Directions open in a new tab; no email row; the hours and address match the Google page.
    *   The menu pages (`/menu`, `/fr/menu`, `/es/menu`) still load no GSAP.

--------------------------------------------------------------------------------

## Implementation Notes (2026-11-17)

Where the build differs from the plan above, and why. Each change came from measuring the longest quote in the browser after fonts loaded.

*   **Three cards from 1280px, not 1100px.** At 1100px three cards are about 309px wide and the 46-word quote needs about 320px of height, so it would overflow. From 761px to 1279px two cards show. `BREAKPOINTS` in `reviewsCarousel.ts` uses 761px and 1280px to match.
*   **Card heights are 266px (phones), 310px (761 to 1279px) and 290px (from 1280px)**, instead of 270, 300 and 260. Measured tallest quotes: 256px at 320px wide, 243px at 390px, 296px at 768px, 272px at 1280px, 248px at 1440px.
*   **Phone padding is 16px below 380px** (20px from 380px), and the source line under the cards is in normal case with tighter letter spacing on phones, so the controls row stays one line on most phones. Measured strip height: 326px at 390px wide (39% of an 844px screen), 350 to 356px at 320 and 360px wide, where the controls row wraps to two lines.
*   **Hidden cards use an inline `display: none`**, not the `hidden` attribute: Tailwind's `hidden` rule uses `!important`, which would stop Flip from showing a leaving card during its exit. Cards are ordered with CSS `order`, so React's DOM order never changes.
*   **The strip's one-time reveal** uses `data-reveal` on an inner wrapper with a 4px inset (`-m-1 p-1`) so the clip-path does not cut off focus rings at the edges.
*   **`FLOURISHES.thanks` ("MERCI.")** was only used by the old thank-you message and was removed.
*   **Verified in the browser:** Flip check (leaving card toward the bottom-left on Next, entering from the bottom-right, reversed on Previous, no inline styles left, rapid clicks move one step); French message, date and party-size label; special characters and emoji in the message; panel focus and "Edit request" focus; touch swipe and ignored vertical drags; contact links. Not verified: real iPhone and Android devices, a computer without WhatsApp, and reduced motion switched on (the instant-swap path is wired but was not exercised).

--------------------------------------------------------------------------------

*Drafted with EGM*
