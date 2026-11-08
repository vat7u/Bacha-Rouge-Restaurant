# Bacha Rouge Blueprint

## System Overview
Single-page marketing site for Bacha Rouge, a red-plaster dining room in Chefchaouen. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger (`@gsap/react`) and `lucide-react` (installed, not yet used). The page is a statically prerendered `/` made of eight stacked sections; a single client component, `LandingMotion`, attaches every scroll animation by finding `data-*` hooks in the markup. Design source: the Claude Design handoff `Bacha Rouge.dc.html`.

> **Next.js 16 warning** (from `AGENTS.md`): APIs differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices (e.g. `priority` on `next/image` is replaced by `preload`).

## Subdirectories & System Boundaries
- src: [./src/CLAUDE.md](./src/CLAUDE.md) - all application code (`app` routing/styles, `components` sections, motion and UI primitives).
- public: static files. `public/assets/` holds logo, lamp, chain, fez, tagine, frame, plaster and herringbone images, and `public/assets/ta/` holds numbered photos used by the sections. No code contract.
- docs: `docs/competitor-analysis-triana.md` - written analysis of the competitor site and roadmap. No code contract.
- Skills: GSAP reference skills (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, …) are installed under `.claude/skills/`, for example [./.claude/skills/gsap-react/SKILL.md](./.claude/skills/gsap-react/SKILL.md).

## Global Invariants
- Section anchors (`#top`, `#maison`, `#experience`, `#table`, `#carte`, `#galerie`, `#reserver`) are linked from the nav and CTAs.
- Animation hooks are `data-*` attributes shared between `src/components/sections` and `src/components/motion`; change both sides together.
- Animations must respect `prefers-reduced-motion` and the 760px mobile breakpoint through `gsap.matchMedia`.
- Design tokens (colours, fonts) are defined once in `src/app/globals.css`; do not hard-code new palette values in components.
- Static images live under `public/assets` and are referenced by absolute `/assets/...` URLs.

## Global Side Effects
- Fonts (Bodoni Moda, Jost, Pinyon Script) are fetched and self-hosted at build time by `next/font/google`.
- The reservation form does not transmit data; submitting only flips a local "sent" state.
- Menu items, address, hours, phone, email and Instagram are placeholders until real details are supplied.

## System Verification
- Run: `npm run lint` and `npm run build` (no test runner is configured); `npm run dev` serves at http://localhost:3000.
