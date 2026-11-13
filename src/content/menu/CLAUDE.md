# content/menu

## Overview
The restaurant menu as data: one file per category, each dish holding its English, French and Spanish text and its price once. It is the only source for the menu page and for the category links on the home page. Converted once from `docs/bacha-rouge-menu-{en,fr,es}.md`, which are now reference only.

## How to edit the menu
- **Change a price:** open the category file (e.g. `desserts.ts`), find the dish, change the number after `price:`. It updates all three languages.
- **Change wording:** edit the `en`, `fr` or `es` text of that dish. All three must be filled in.
- **Add a dish:** copy an existing `{ id, name, description, price }` block inside `items: [ ... ]` and give it a new unique `id` (lowercase letters, digits and dashes).
- **Remove a dish:** delete its whole `{ ... },` block.
- **A dish with several prices** (like Royal Couscous) uses a list: `price: [{ label: { en, fr, es }, amount: 105 }, ...]`.
- Then run `npm run build`. If something is missing or wrong, the build stops and names the dish and the problem.

## Interface
- `MENU: MenuCategory[]` — [index.ts] all categories in display order: salads, starters, moroccan-specialties, beldi-fusions, pasta, desserts, drinks.
- `MenuCategory`, `MenuSection`, `MenuItem`, `PriceVariant` — [types.ts].
- `MENU_UI` — [ui.ts] fixed wording around the menu (page title, metadata, prices note, allergy note, labels) in three languages.
- One exported category per file: `salads`, `starters`, `moroccanSpecialties`, `beldiFusions`, `pasta`, `desserts`, `drinks`.

## Invariants
- Category `id`s are the anchors on the menu page (`/menu#drinks`) and are linked from the home page; treat them as permanent once a QR code or link uses them.
- Every `id` (category and item) is unique across the whole menu and language-neutral.
- Prices are numbers in dirhams; the "Dhs" label is added when rendering.
- Drinks is one category with titled sections (Hot and Cozy, Fresh Juices, Healthy Corner, Mocktails, Mojitos, Water & Sodas). The Mojitos section carries the "Alcohol-free." note.
- Moroccan dish names keep the spelling used in each language's source file.

## Side Effects
- `validateMenu(MENU)` runs when `index.ts` is first imported and throws, failing the build, on missing text in any language, a non-positive or non-numeric price, an empty section, or a duplicate or malformed id.

## Verification
- Run: `npm run build` (the menu check runs as part of it), then open `/menu`, `/fr/menu` and `/es/menu`.
