"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Scrub lag (seconds) for the pinned scenes — the design's "smooth" setting.
const SCRUB = 1;

const REVEAL_FROM: Record<string, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Page root that owns every GSAP animation. Sections mark their animated
 * elements with data-* hooks; this component wires them up once on mount.
 */
export function LandingMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const R = root.current!;
      const q = (s: string) => gsap.utils.toArray<HTMLElement>(R.querySelectorAll(s));
      const mm = gsap.matchMedia(R);

      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", mobile: "(max-width: 760px)" },
        (ctx) => {
          const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };

          // Hero intro
          if (motion) {
            gsap
              .timeline({ defaults: { ease: "power3.out" } })
              .from("[data-pendant]", { y: "-80vh", duration: 2.6, ease: "power2.out" }, 0)
              .from("[data-pendant]", { rotation: 3, duration: 3.4, ease: "sine.inOut" }, 0)
              .from("[data-hero-glow]", { autoAlpha: 0, duration: 2 }, 1.4)
              .from("[data-hero-char]", { yPercent: 115, duration: 1.2, stagger: 0.06, ease: "power4.out" }, 1.2)
              .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.12 }, 2.0)
              .from("[data-nav]", { y: -16, autoAlpha: 0, duration: 1 }, 2.2);

            gsap.fromTo(
              "[data-pendant-sway]",
              { rotation: -0.8 },
              { rotation: 0.8, duration: 3.6, ease: "sine.inOut", yoyo: true, repeat: -1 },
            );
            gsap
              .timeline({ scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } })
              .to("[data-hero-bg]", { yPercent: 14, ease: "none" }, 0)
              .to('[data-hero-word="l"]', { xPercent: -16, ease: "none" }, 0)
              .to('[data-hero-word="r"]', { xPercent: 16, ease: "none" }, 0)
              .to("[data-hero-title]", { yPercent: 35, autoAlpha: 0.15, ease: "none" }, 0)
              .to("[data-pendant-scroll]", { y: "32vh", ease: "none" }, 0)
              .to("[data-hero-copy]", { y: -60, autoAlpha: 0, ease: "none" }, 0);

            // Burgundy -> ivory arch transitions
            q("[data-arch-panel]").forEach((p) =>
              gsap.fromTo(
                p,
                { clipPath: "inset(12% 24% 0% 24% round 50vw 50vw 0vw 0vw)" },
                {
                  clipPath: "inset(0% 0% 0% 0% round 0vw 0vw 0vw 0vw)",
                  ease: "none",
                  scrollTrigger: { trigger: p, start: "top bottom", end: "top 5%", scrub: true },
                },
              ),
            );

            q("[data-speed]").forEach((el) => {
              const s = parseFloat(el.dataset.speed ?? "") || 0.2;
              gsap.fromTo(
                el,
                { yPercent: s * 100 },
                {
                  yPercent: -s * 100,
                  rotation: s * 20,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                },
              );
            });
            q("[data-spin]").forEach((el) =>
              gsap.fromTo(
                el,
                { rotation: 0 },
                {
                  rotation: parseFloat(el.dataset.spin ?? "") || 45,
                  ease: "none",
                  scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
                },
              ),
            );
          }

          // Headline word reveals
          q("[data-split]:not([data-split-manual])").forEach((el) => {
            const w = el.querySelectorAll("[data-w]");
            gsap.from(
              w,
              motion
                ? { yPercent: 115, duration: 1.2, stagger: 0.07, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 86%" } }
                : { autoAlpha: 0, duration: 0.8, scrollTrigger: { trigger: el, start: "top 86%" } },
            );
          });

          // Clip-path image reveals
          q("[data-reveal]").forEach((el) => {
            if (!motion) {
              gsap.from(el, { autoAlpha: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 88%" } });
              return;
            }
            const img = el.querySelector("[data-reveal-img]");
            const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 95%", end: "top 30%", scrub: SCRUB } });
            tl.fromTo(el, { clipPath: REVEAL_FROM[el.dataset.reveal || "up"] }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }, 0);
            if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, ease: "none" }, 0);
          });

          // Ornament line drawing
          q("[data-draw]").forEach((svg) => {
            const shapes = svg.querySelectorAll("path,rect,circle,line,polygon");
            gsap.fromTo(
              shapes,
              { strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: motion ? 2.2 : 0.01,
                stagger: 0.12,
                ease: "power2.inOut",
                scrollTrigger: { trigger: svg, start: "top 90%" },
              },
            );
          });

          q("[data-stagger]").forEach((c) =>
            gsap.from(c.querySelectorAll("[data-item]"), {
              y: motion ? 28 : 0,
              autoAlpha: 0,
              duration: 1,
              stagger: 0.09,
              ease: "power3.out",
              scrollTrigger: { trigger: c, start: "top 84%" },
            }),
          );

          // Experience: pinned layered interior
          const layers = q("[data-exp-layer]");
          const caps = q("[data-exp-cap]");
          const labels = q("[data-exp-label]");
          if (layers.length) {
            const step = 1.4;
            const last = (layers.length - 1) * step - 0.4;
            const tl = gsap.timeline({
              defaults: { ease: "power2.inOut" },
              scrollTrigger: { trigger: "[data-exp]", start: "top top", end: "bottom bottom", scrub: SCRUB },
            });
            tl.fromTo(
              "[data-exp-frame]",
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1, stagger: 0.2, ease: "none" },
              0,
            )
              .fromTo("[data-exp-gem]", { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.4, ease: "back.out(2)" }, 0.9)
              .fromTo("[data-exp-progress]", { scaleX: 0 }, { scaleX: 1, duration: last + 1.6, ease: "none" }, 0);
            if (motion) {
              tl.fromTo(layers[0].querySelector("[data-exp-img]"), { scale: 1.2 }, { scale: 1, duration: 1.2, ease: "none" }, 0);
            }
            layers.forEach((layer, i) => {
              if (!i) return;
              const at = i * step - 0.4;
              const img = layer.querySelector("[data-exp-img]");
              const prev = layers[i - 1].querySelector("[data-exp-img]");
              if (motion) {
                tl.fromTo(layer, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, at)
                  .fromTo(img, { scale: 1.3, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.2, ease: "power2.out" }, at)
                  .to(prev, { scale: 1.12, yPercent: -6, duration: 1 }, at);
              } else {
                tl.fromTo(layer, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, at);
              }
              tl.to(caps[i - 1], { autoAlpha: 0, y: motion ? -30 : 0, duration: 0.5 }, at)
                .fromTo(caps[i], { autoAlpha: 0, y: motion ? 30 : 0 }, { autoAlpha: 1, y: 0, duration: 0.6 }, at + 0.4)
                .to(labels[i - 1], { opacity: 0.4, duration: 0.4 }, at)
                .to(labels[i], { opacity: 1, duration: 0.4 }, at);
            });
            tl.fromTo(
              "[data-exp-mask]",
              { autoAlpha: 0, y: motion ? 80 : 0, rotation: motion ? -10 : 0 },
              { autoAlpha: 1, y: 0, rotation: 0, duration: 1, ease: "power3.out" },
              last + 0.2,
            );
            tl.to({}, { duration: 0.6 });
          }

          // Gastronomy: circular reveal + tagine
          const g = R.querySelector("[data-gastro]");
          if (g) {
            const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: "top top", end: "bottom bottom", scrub: SCRUB } });
            if (motion) {
              tl.fromTo(
                "[data-g-photo]",
                { clipPath: "circle(14% at 50% 64%)" },
                { clipPath: "circle(75% at 50% 50%)", duration: 1.4, ease: "power2.inOut" },
                0,
              )
                .fromTo("[data-g-photo-img]", { scale: 1.35 }, { scale: 1, duration: 1.8, ease: "none" }, 0)
                .fromTo(
                  "[data-g-tagine]",
                  { yPercent: -60, scale: 0.72, rotation: -6 },
                  { yPercent: 0, scale: 1, rotation: 0, duration: 1.4, ease: "power2.out" },
                  0,
                );
            }
            tl.fromTo("[data-g-scrim]", { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.9)
              .fromTo(
                "[data-g-head] [data-w]",
                { yPercent: motion ? 115 : 0, autoAlpha: motion ? 1 : 0 },
                { yPercent: 0, autoAlpha: 1, stagger: 0.08, duration: 0.7, ease: "power3.out" },
                1.2,
              )
              .fromTo("[data-g-fade]", { autoAlpha: 0, y: motion ? 24 : 0 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6 }, 1.5);
            // After landing in the centre, the tagine slides left so it stops covering the copy.
            const tagineX = mobile ? 0 : "-34vw";
            if (motion) tl.to("[data-g-tagine]", { x: tagineX, duration: 1, ease: "power2.inOut" }, 1.4);
            else gsap.set("[data-g-tagine]", { x: tagineX });
            tl.to({}, { duration: 0.5 });
          }

          // Menu doorway: the category titles slide past the pinned BACHA word; the one on the anchor line is lit.
          const carte = R.querySelector<HTMLElement>("[data-carte]");
          const carteList = carte?.querySelector<HTMLElement>("[data-carte-list]");
          const carteAnchor = carte?.querySelector<HTMLElement>("[data-carte-anchor]");
          const carteLinks = carte ? gsap.utils.toArray<HTMLElement>(carte.querySelectorAll("[data-carte-link]")) : [];
          let onCarteFocus: ((e: FocusEvent) => void) | undefined;
          if (motion && carte && carteList && carteAnchor && carteLinks.length > 1) {
            // Lowest opacity that keeps the faded titles readable (about 4.5:1 on ivory).
            const DIM = 0.62;
            // How far to move the list so title i sits on the anchor line (both measured in the same window).
            const yFor = (i: number) => () => {
              const item = carteLinks[i].parentElement!;
              return carteAnchor.offsetTop - (carteList.offsetTop + item.offsetTop + item.offsetHeight / 2);
            };
            gsap.set(carteLinks, { transformOrigin: "0% 50%" });
            const tl = gsap.timeline({
              defaults: { ease: "power2.inOut", duration: 1 },
              scrollTrigger: {
                trigger: carte.querySelector("[data-arch-panel]"),
                start: "top top",
                end: "bottom bottom",
                scrub: SCRUB,
                invalidateOnRefresh: true,
                // No inertia: a jump (keyboard focus, anchor link) must land on its title, not fling past it.
                snap: { snapTo: "labels", inertia: false, duration: { min: 0.2, max: 0.6 }, delay: 0.1, ease: "power1.inOut" },
              },
            });
            tl.set(carteList, { y: yFor(0) }, 0)
              .set(carteLinks, { opacity: DIM, scale: 0.8 }, 0)
              .set(carteLinks[0], { opacity: 1, scale: 1 }, 0)
              .addLabel("c0", 0);
            // Explicit start and end values: steps share boundaries, so recorded starts would collide.
            const lit = { opacity: 1, scale: 1 };
            const dim = { opacity: DIM, scale: 0.8 };
            const step = { immediateRender: false };
            for (let i = 1; i < carteLinks.length; i++) {
              const at = i - 1;
              tl.fromTo(carteList, { y: yFor(i - 1) }, { y: yFor(i), ...step }, at)
                .fromTo(carteLinks[i - 1], lit, { ...dim, ...step }, at)
                .fromTo(carteLinks[i], dim, { ...lit, ...step }, at)
                .addLabel(`c${i}`, i);
            }
            // Tabbing to a title scrolls the scene so that title is the lit one.
            const st = tl.scrollTrigger!;
            onCarteFocus = (e) => {
              const i = carteLinks.indexOf(e.target as HTMLElement);
              if (i >= 0) window.scrollTo({ top: st.labelToScroll(`c${i}`), behavior: "instant" });
            };
            carteList.addEventListener("focusin", onCarteFocus);
          }

          // Gallery: horizontal scroll
          const track = R.querySelector<HTMLElement>("[data-gal-track]");
          if (track) {
            const dist = () => -Math.max(0, track.scrollWidth - window.innerWidth);
            const tl = gsap.timeline({
              scrollTrigger: { trigger: "[data-gal]", start: "top top", end: "bottom bottom", scrub: SCRUB, invalidateOnRefresh: true },
            });
            tl.to(track, { x: dist, ease: "none", duration: 1 }, 0).fromTo("[data-gal-bar]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, 0);
            if (motion) tl.fromTo("[data-gal-img]", { xPercent: -8 }, { xPercent: 8, ease: "none", duration: 1 }, 0);
          }

          return () => {
            if (onCarteFocus) carteList?.removeEventListener("focusin", onCarteFocus);
          };
        },
      );

      // Web fonts and images change section heights; re-measure once they settle.
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} data-br-root="" className="relative font-sans text-ivory bg-ink">
      {children}
    </div>
  );
}
