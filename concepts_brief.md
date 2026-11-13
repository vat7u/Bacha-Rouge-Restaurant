# Menu Page, Category Selector and Three-Language Site

* **Author:** AZZOUZ Othman
* **Date:** 2026-11-13

## Overview

Bacha Rouge is a one-page, English-only site today. Its "La Carte" block is a placeholder with three fake categories. The real menu has 11 headings and about 70 to 85 dishes in three languages, so the block cannot stay as it is.

The plan has three parts:

1. **A separate menu page** that shows every dish at once. Guests can also open it on their phone in the restaurant, from a QR code. It is read-only: nobody orders on it, and the restaurant keeps its printed menus. The restaurant has working guest Wi-Fi, and the owner updates the content by editing files.
2. **One data file per menu item set** that holds English, French and Spanish text with the price stored once, so a price is changed in one place. The source is the three Markdown files `docs/bacha-rouge-menu-en.md`, `-fr.md` and `-es.md`.
3. **A short homepage selector** that replaces La Carte. A large "BACHA" word stays pinned on the left while about 7 category titles scroll on the right. The title nearest the centre grows and brightens while the others shrink and fade. Each title links to its place on the menu page. The effect comes from the CodePen `snorkltv/azodrxB`. The whole site is then offered in English, French and Spanish.

What the CodePen does, read from its code: it pins an `h1`, scales the centre list item to 100% and fades the others to 80% size and 20% opacity, one item every 0.5 timeline units, scrubbed to scroll with GSAP and ScrollTrigger. It also sets page-wide CSS `scroll-snap-type: y proximity`, which this plan rejects (see Goals vs. Non-Goals).

## Analysis

Six independent reviewers looked at the plan: design, codebase details, scope, comprehension, implementation readiness and structure. Some did not read every file (the French and Spanish menu files, and the Next.js docs), so Next.js 16 specifics must be checked in `node_modules/next/dist/docs/` before building. None of them could open the CodePen.

### Must decide before the first change

1. **The URL layout.** English lives at `/` with no prefix. A single `app/[lang]` tree cannot do that without a proxy (Next 16's renamed middleware), which adds a request-time layer to a fully static site. Two reviewers recommend route groups instead: `app/(en)/` for English plus `app/[lang]/` for French and Spanish, with `generateStaticParams` and `dynamicParams = false`. That keeps everything static. Unknown languages must return 404, and `/en` must not exist. Do not redirect by browser language: guests who scan a QR code would be bounced. Use a language switcher with links only. Do the route restructuring as one English-only commit with identical output before adding any language.
2. **How text is stored for the whole site.** Copy is written directly into Hero, Intro, Experience, Gastronomy, Gallery, Reservation, ReservationForm, Footer and Menu. Several lines are already French. The Intro headline highlights "red" and "blue" with coloured spans, and word order differs in French and Spanish, so it needs its own markup per language, not a plain string. The reservation form is a client component, so its text must be passed in. The guest-count text ("2 guests") currently doubles as the option value. The recommendation is one typed text file per language checked against the English shape, no translation library, sections receiving their text as props, and one helper that builds language-aware links. Nobody is named yet to write or proofread the French and Spanish homepage copy.
3. **The shape of the dish data.** Reviewers disagree: one file per dish (about 65 to 85 files) versus one file per category, or one menu file with `{ price, en, fr, es }` per dish. All keep the price stored once. The data must handle:
   - Royal Couscous: three labelled prices (meat / chicken / vegetarian), so a price must be a list of label and amount.
   - Marrakech Tanjia: 1 kg, serves 2.
   - Salmon Steak: side choices written inside the description.
   - Pasta: a choice note that belongs to the category.
   - Drinks: sub-headings "Hot and Cozy" and "Fresh Juices".
   - Missing descriptions: all drinks, Mojitos and Water & Sodas have none.
   - Display order: needs an explicit field, since file names are not enough.
   - Price unit: the documents say "Dhs", the old Menu.tsx says "MAD". Pick one.
   - The couscous asterisk and italic note in the Markdown record how the prices were read; they must not appear on the page.
4. **Safety when the owner edits files.** With no test runner (only lint and build), one wrong comma, one missing translation or a non-numeric price could show a blank or "NaN" to guests, or break the build with a hard-to-read error. A build-time check is needed that names the file, the field and the missing language. How the owner publishes a change, and how a failed build shows up for him, is not yet decided. Neither is the hosting or the production domain.

### Major risks

5. **The menu page must not inherit the landing page's weight.** `LandingMotion` is used in `page.tsx`, not the layout, so `/menu` can stay GSAP-free. `globals.css` forces a dark page and `overflow-x: clip` (which keeps `position: sticky` working) and holds home-only classes. The layout loads three Google fonts; the menu should drop Pinyon Script, since 32px script dish names and 13px light descriptions in the old `Menu.tsx` fail the "large, readable" goal. Gold on the ivory background has a contrast ratio of about 2.3:1, which is too low for text; ink on ivory is about 13:1. Suggested targets: body text at least 18px, contrast 4.5:1 or better, tap targets 44px or more, and a page-weight budget tested on a slow connection. A bright ivory page can glare in a dim dining room; ask the owner about a dark option.
6. **The homepage BACHA scene is the riskiest and least necessary piece.**
   - **Length:** existing pinned scenes already total about 1260vh (Experience 520, La Table 320, Gallery 420). 7 titles at 60 to 80vh each would add 400 to 550vh. The competitor report already criticises long homepages. Cap it near 250 to 350vh.
   - **Contrast:** 20% opacity text is about 1.4:1 on dark, which fails the 4.5:1 minimum. It contradicts "faded titles stay readable". Set an opacity floor around 0.55 to 0.65.
   - **Keyboard:** use `opacity`, not `autoAlpha` (which hides elements and blocks focus). Focus must not depend on the scrolled centre. Needs a visible focus ring and 44px tap targets.
   - **Click versus scroll:** a click should go to the menu page. Decide whether a tap on a faded title first scrolls to it or navigates at once.
   - **Snapping:** use ScrollTrigger's own snap option inside this section only, not page-wide CSS snap.
   - **Reduced motion:** the existing scenes stay tall even with reduced motion. The new section must be short by default and tall only when motion is allowed. The no-script version should show a plain list at full opacity.
   - **Refresh order:** a new tall section shifts every later trigger. There must be exactly one owner of `ScrollTrigger.refresh()`.
   - **Markup:** a server-rendered list of real links inside a labelled nav; the giant BACHA word should be hidden from screen readers since the hero already has the BACHA ROUGE heading.
   - **Phasing view:** ship the plain list of links first, which is also the reduced-motion version, then add the scroll effect on top of the same markup.
7. **Eleven headings versus about seven titles, and the anchors.** Five drink headings (Drinks with Hot and Cozy and Fresh Juices, Healthy Corner, Mocktails, Mojitos, Water & Sodas) must fold into one homepage "Drinks" title. The mapping, the link target and whether the menu page's sticky bar shows 7 or 11 entries are undecided. Anchor ids must be fixed English-style slugs defined once, never built from translated titles, or QR and shared links break when the language changes. `id="carte"` is a documented invariant, linked from the nav and buttons.
8. **Shared page parts.** The nav lives inside the Hero and is hidden under 760px, and the footer is a homepage section. The menu page needs its own nav (back to home, language switcher) that works on phones, and the allergy note. The language switcher should keep the current page and anchor.
9. **Search and sharing.** Each page needs its own translated title and description, canonical and language-alternate links, `<html lang>`, and a sitemap with all six URLs. Full web addresses need `metadataBase`, which is blocked until the production domain is known.
10. **Content gaps in the menu itself.** The "alcohol-free" label on Mojitos and the allergy note are new three-language text the owner must write and approve; they are not in the Markdown. Do not invent per-dish allergen tags. Keep Moroccan dish names untranslated, but spellings differ between files (Mchermela / mchermel / Mchermel, Pastilla / Pastela, Briouates / Briouats) and number formats differ (0,0% versus 0,0 %). The three files are identical in structure, counts and prices, so conversion can be scripted and checked line by line, then the Markdown should be archived so it is not a second source of truth. Which is correct if the printed and web menus differ is undecided.
11. **Verification is thin.** Needed: the build lists exactly the six pages, the data check passes, every dish name and the couscous prices appear in the built HTML, each page has the right language tags, and manual tests on iPhone Safari and Android Chrome with reduced motion on. There is no analytics to show whether the QR is used.
12. **Docs.** Seven `CLAUDE.md` files describe the site as a single page with eight sections and need updating. The six URLs will be printed on QR codes, so they become a permanent public address list.

### What holds up

- The guest scenario is real: a QR code, shared Wi-Fi, printed menus kept, no ordering.
- Storing each price once removes the main risk of three files drifting apart.
- A static `/menu` with every dish in the HTML and almost no scripting is light, reads well on poor connections, and works for search engines and screen readers.
- The current structure can host the homepage effect (sticky pinned sections, the motion and mobile conditions, the data-attribute hooks) without a second animation system. Next.js 16 supports every routing piece needed, so no translation library is required.
- Rejecting page-wide scroll snap, requiring keyboard and reduced-motion behaviour, and the out-of-scope list are sound. Replacing La Carte with a short selector fixes the "homepage repeats inner pages" criticism in the competitor report.

## Goals vs. Non-Goals

* **In-Scope Goals:**
  - A read-only `/menu` page in English, French and Spanish with every dish in the page HTML, a sticky category bar, large high-contrast text, and light page weight.
  - One data file per dish (or per category; see Key Decisions) holding all three languages, with the price stored once and a build-time check.
  - A homepage selector replacing La Carte: pinned BACHA word, about 7 titles, links to the menu page.
  - The whole site in English, French and Spanish with language links, language tags and a sitemap.
  - Alcohol-free labels on Mojitos and an allergy note on the menu.
* **Out-of-Scope Non-Goals:**
  - Online ordering, payment, or a "call the waiter" button.
  - A blog, dish photos, and an admin screen or CMS.
  - Page-wide CSS scroll snap (it would fight the pinned Experience and La Table scenes).
  - Redirecting by browser language.
  - Arabic (to be confirmed with the owner; the competitor report mentioned it).
  - A service worker for offline use.

## Alternatives Weighed

* **Click a category title and swap the dishes inside the homepage section (original idea).** Rejected: it hides dishes from scanning, from search engines and from screen readers, changes the page height under the pinned scenes, and slows a guest who wants to compare dishes.
* **Keep the whole menu inside the homepage, as one long section.** Rejected: too long once all 11 headings and the three languages are included, and it repeats what the inner page would hold.
* **One menu page with a scroll-through BACHA selector that also shows the dishes.** Rejected: puts the heavy pinned-scene code on the page that has to load fast on a phone.
* **Keep the three Markdown files as the live source.** Rejected: a price changed in one language can be forgotten in another, and the page would need Markdown parsing at build time.
* **Redirect visitors to a language by browser setting.** Rejected: a guest scanning the QR code could land on the wrong language, and it conflicts with the language-alternate links.
* **A single `app/[lang]` folder with a proxy that rewrites `/` to `/en`.** Not preferred: it adds a request-time layer to a static site. Route groups (`app/(en)` plus `app/[lang]`) are the preferred option.
* **A translation library.** Rejected for now: typed text files per language, checked against the English shape, are enough for this size.
* **A dark-theme menu page matching the homepage.** Not chosen by default: readability on phones matters more than atmosphere, but the owner should be asked about glare in the dim dining room.

## Key Decisions & Staging for Next Steps

Decisions already confirmed by the owner:

- The menu is read-only, printed menus stay, guest Wi-Fi works, and the owner edits the files himself.
- About 7 homepage titles, with the drinks grouped under one title; clicking a title opens the matching place on the menu page.
- One data file per dish that holds all three languages, with each price stored once.
- The whole site is offered in English, French and Spanish.
- Royal Couscous prices 105 / 90 / 65 Dhs are in the order meat, chicken, vegetarian.
- Mojito entries are labelled alcohol-free, and the menu carries a note asking guests to tell their server about allergies.

Decisions still open (to settle before the build):

1. **Phasing.** Four of six reviewers recommend three phases: (1) menu data, the check, the `/menu`, `/fr/menu` and `/es/menu` pages, and a plain list of category links on the homepage; (2) translate the homepage after real contact details and a proofreader exist, behind a first English-only commit that restructures the routes; (3) add the scroll effect on top of the same markup, with a capped length. The brief says "whole site in three languages", so this changes when that arrives, not whether. It is the owner's scope call.
2. **File granularity:** one file per dish (about 65 to 85 files) or one menu file or one file per category with `{ price, en, fr, es }` per dish. The data check applies either way.
3. **Which homepage titles and anchors:** the exact list of 7, the mapping of the five drink headings, and the sticky bar showing 7 or 11.
4. **Wording and placement** of the allergy note and the Mojito label in three languages, and who signs them off.
5. **The QR target:** one code to `/menu` with a visible language switcher, or one code per language.
6. **Who writes and proofreads** French and Spanish homepage copy, and when the placeholder address, hours and phone get real values.
7. **Hosting, publishing and domain:** how the owner publishes a change, who sees a failed build, and the production domain for language links.
8. **Price unit:** "Dhs" or "MAD".
9. **Dark or light menu page** for the dining room.
10. **Housekeeping before any code:** commit or set aside the current uncommitted edits (the numbered labels removal), commit the three menu Markdown files as a baseline, and push the two commits that still need the owner's GitHub login.
