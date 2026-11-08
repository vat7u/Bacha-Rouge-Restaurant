# motion

## Overview
The single owner of all GSAP and ScrollTrigger animation. It wraps the page, finds sections by `data-*` attribute hooks, and builds every timeline inside one `useGSAP` call scoped to its root element.

## Interface
- `LandingMotion({ children })` — [LandingMotion.tsx] client component; renders `<div data-br-root>` around the page and wires all animation on mount.
- Hooks it consumes (set by the section components): `data-hero`, `data-hero-bg`, `data-hero-word` (`l`/`r`), `data-hero-char`, `data-hero-title`, `data-hero-copy`, `data-hero-fade`, `data-hero-glow`, `data-nav`, `data-pendant`, `data-pendant-sway`, `data-pendant-scroll`, `data-arch-panel`, `data-speed`, `data-spin`, `data-split` / `data-split-manual` / `data-w`, `data-reveal` (`up|down|left|right`) / `data-reveal-img`, `data-draw`, `data-stagger` / `data-item`, `data-exp` / `data-exp-layer` / `data-exp-img` / `data-exp-cap` / `data-exp-label` / `data-exp-progress` / `data-exp-frame` (clip-path wipe, staggered) / `data-exp-gem` / `data-exp-mask`, `data-gastro` / `data-g-photo` / `data-g-photo-img` / `data-g-scrim` / `data-g-head` / `data-g-fade` / `data-g-tagine` (lands at centre, then `x: -34vw`; stays centred on mobile), `data-gal` / `data-gal-track` / `data-gal-img` / `data-gal-bar`.

## Invariants
- Registers `useGSAP` and `ScrollTrigger` at module load via `gsap.registerPlugin`.
- All tweens live inside `gsap.matchMedia(R)` with conditions `motion` (`prefers-reduced-motion: no-preference`) and `mobile` (`max-width: 760px`); without `motion`, effects degrade to fades.
- Experience layers, captions and labels are indexed together: `layers[i]`, `caps[i]`, `labels[i]` must be the same length and order.
- Pinned scenes (`[data-exp]`, `[data-gastro]`, `[data-gal]`) rely on tall section heights (`520vh`, `320vh`, `420vh`) with a `sticky` child; changing heights changes scroll pacing.
- Scrub smoothing is the module constant `SCRUB = 1`.
- Cleanup is `mm.revert()` plus removal of the `window` `load` listener.

## Side Effects
- Attaches ScrollTrigger instances and scroll listeners to the document.
- Starts an infinite yoyo tween on `[data-pendant-sway]`.
- Calls `ScrollTrigger.refresh()` on `document.fonts.ready` and on window `load`.

## Verification
- Run: `npm run lint` and `npm run build`, then scroll the page in `npm run dev` to check each scene.
