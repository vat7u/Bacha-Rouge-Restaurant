# Bacha Rouge Blueprint

## System Overview
Marketing site for Bacha Rouge, a red-plaster dining room in Chefchaouen. Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, GSAP with ScrollTrigger and Flip (`@gsap/react`) and `lucide-react` (installed, not yet used). Every page exists in English, French and Spanish: the home page (`/`, `/fr`, `/es`) is statically prerendered and made of eight stacked sections, and a separate read-only menu page (`/menu`, `/fr/menu`, `/es/menu`) lists every dish from `src/content/menu` and is also opened on guests' phones in the restaurant. On the home page, a single client component, `LandingMotion`, attaches every scroll animation by finding `data-*` hooks in the markup. Design source: the Claude Design handoff `Bacha Rouge.dc.html`.

> **Next.js 16 warning** (from `AGENTS.md`): APIs differ from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code, and heed deprecation notices (e.g. `priority` on `next/image` is replaced by `preload`).

## Subdirectories & System Boundaries
- src: [./src/CLAUDE.md](./src/CLAUDE.md) - all application code (`app` routing/styles, `components` sections, motion and UI primitives, `content` contact and menu data, `i18n` languages and home-page text).
- public: static files. `public/assets/` holds logo, lamp, chain, fez, tagine, plaster and herringbone images, the CSS border frame (`frame.png`) and the gilt picture frames (`arch-frame.png`, `square-frame.png`); `public/assets/ta/` holds the photos used by the sections (`.jpg` and `.webp`). No code contract.
- pics: source artwork (textures, frames, lamp, fez, reference photos) that the images in `public/assets` were made from. Not served and not referenced by code. No code contract.
- docs: `docs/competitor-analysis-triana.md` (written analysis of the competitor site and roadmap), `docs/designs/` (design proposals, for example `reviews-and-whatsapp-form.md`) and reference copies of the menu and the five-experiences text. No code contract.
- Skills: GSAP reference skills (`gsap-core`, `gsap-react`, `gsap-scrolltrigger`, `gsap-timeline`, …) are installed under `.claude/skills/`, for example [./.claude/skills/gsap-react/SKILL.md](./.claude/skills/gsap-react/SKILL.md).

## Global Invariants
- Section anchors (`#top`, `#maison`, `#experience`, `#table`, `#carte`, `#galerie`, `#reserver`) are linked from the nav and CTAs. `#reserver` is on the grid that holds the reservation heading and form (below the reviews strip), not on the section, so "Reserve" links land on the form.
- Animation hooks are `data-*` attributes shared between `src/components/sections` and `src/components/motion`; change both sides together.
- Animations must respect `prefers-reduced-motion` and the 760px mobile breakpoint through `gsap.matchMedia`.
- Design tokens (colours, fonts) are defined once in `src/app/globals.css`; do not hard-code new palette values in components.
- Home-page text lives in `src/i18n/dictionaries` (one file per language, same typed shape); do not write visible text directly in components.
- Menu URLs (`/menu`, `/fr/menu`, `/es/menu`) and their category anchors (`#salads` … `#drinks`) are meant for QR codes: treat them as permanent.
- The menu page stays free of GSAP and client JavaScript.
- Static images live under `public/assets` and are referenced by absolute `/assets/...` URLs.
- Gilt picture frames (`GiltFrame`) never animate: reveals and parallax run on the photo inside the frame, not on the frame.

## Global Side Effects
- Fonts (Bodoni Moda, Jost, Pinyon Script) are fetched and self-hosted at build time by `next/font/google`.
- The reservation form sends nothing itself: submitting opens WhatsApp (`wa.me`) with a pre-written message to the reservations number, starting with `[Website]`. Nothing reaches the restaurant until the guest presses Send in WhatsApp.
- Address, hours, phone numbers and Instagram are real (from the Google Maps page and the owner, 2026-11-17) and typed by hand; nothing detects if they go stale. The restaurant has no email address.
- The reviews strip shows ten Google reviews copied by hand into `src/content/reviews.ts`; they do not update themselves.
- French and Spanish copy was translated without a native-speaker review; have it proofread before launch.
- Search-engine language links (hreflang) are emitted only when `NEXT_PUBLIC_SITE_URL` is set; there is no sitemap yet.

## System Verification
- Run: `npm run lint` and `npm run build` (no test runner is configured); `npm run dev` serves at http://localhost:3000.
