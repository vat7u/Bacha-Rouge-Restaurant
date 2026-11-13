# ui

## Overview
Small presentational primitives shared by the sections: the masked-word headline pieces that GSAP animates, a photo that fills its parent, and the language switcher. No state, no client directives.

## Interface
- `W` — [split.tsx] wraps children in `<span class="split-word"><span data-w class="inline-block">…</span></span>`; the inner `[data-w]` is what `LandingMotion` animates.
- `words(text: string)` — [split.tsx] splits on whitespace into `W` elements joined by single spaces (returns a `Fragment` list keyed by index).
- `Photo` — [Photo.tsx] props `src`, `alt`, `sizes`, optional `fit: "cover" | "contain"` (default `cover`); renders `next/image` with `fill`. `contain` shows the whole image centred, so give the parent a matching background colour.
- `LanguageSwitcher` — [LanguageSwitcher.tsx] props `locale`, `path` (the same page in every language, e.g. `/menu`), `label`, `tone: "light" | "dark"`; renders EN/FR/ES links with `hrefLang`, `aria-current` on the current language and 44px tap targets.

## Invariants
- Headlines that should reveal on scroll must carry `data-split` on the heading and use `W`/`words()` for their text; the reveal targets `[data-w]` only.
- `.split-word` is defined in `src/app/globals.css`; it supplies the overflow mask. Removing it breaks the rise-from-mask effect.
- `Photo` uses `fill`, so its parent must be positioned (`relative`/`absolute`) and sized.
- `LanguageSwitcher` only links; it never redirects or stores a choice.

## Side Effects
- None. Pure render functions.

## Verification
- Run: `npm run lint` and `npm run build`
