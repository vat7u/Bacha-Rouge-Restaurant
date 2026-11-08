# ui

## Overview
Small presentational primitives shared by every section: the masked-word headline pieces that GSAP animates, the numbered section label, and a cover-fit photo. No state, no client directives.

## Interface
- `W` — [split.tsx] wraps children in `<span class="split-word"><span data-w class="inline-block">…</span></span>`; the inner `[data-w]` is what `LandingMotion` animates.
- `words(text: string)` — [split.tsx] splits on whitespace into `W` elements joined by single spaces (returns a `Fragment` list keyed by index).
- `Eyebrow` — [Eyebrow.tsx] props `numeral`, `label`, `tone: "wine" | "gold"` plus any `HTMLAttributes<HTMLDivElement>` (e.g. `data-g-fade`); renders numeral, 40px rule, uppercase label.
- `Photo` — [Photo.tsx] props `src`, `alt`, `sizes`, optional `fit: "cover" | "contain"` (default `cover`); renders `next/image` with `fill`. `contain` shows the whole image centred, so give the parent a matching background colour.

## Invariants
- Headlines that should reveal on scroll must carry `data-split` on the heading and use `W`/`words()` for their text; the reveal targets `[data-w]` only.
- `.split-word` is defined in `src/app/globals.css`; it supplies the overflow mask. Removing it breaks the rise-from-mask effect.
- `Photo` uses `fill`, so its parent must be positioned (`relative`/`absolute`) and sized.
- `Eyebrow` `tone` picks text and rule colours only (`text-wine`/`bg-wine` vs `text-gold`/`bg-gold`).

## Side Effects
- None. Pure render functions.

## Verification
- Run: `npm run lint` and `npm run build`
