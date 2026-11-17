import gsap from "gsap";
import { Flip } from "gsap/Flip";

/** Widths where the number of visible cards changes; they match the `--rv-visible` steps in ReviewsStrip. */
const BREAKPOINTS = ["(min-width: 761px)", "(min-width: 1280px)"];
/** Horizontal finger movement (px) that counts as a swipe. */
const SWIPE_MIN = 40;

/**
 * Turns the server-rendered reviews strip into an endless carousel.
 *
 * Each card gets a rank (its place in the loop). Ranks below the visible
 * count are shown, in rank order (CSS `order`); the rest get an inline
 * `display: none` plus `inert` and `aria-hidden`. Next and Previous rotate
 * the ranks and Flip animates the real cards: nothing is cloned and the DOM
 * order React rendered is never changed. With `motion` false the change is
 * instant. The random order is chosen once per page view and kept on the
 * region, so a re-run (screen size or motion setting change) keeps it.
 *
 * Returns a cleanup that undoes everything it set.
 */
export function initReviewsCarousel(region: HTMLElement, { motion }: { motion: boolean }): () => void {
  const viewport = region.querySelector<HTMLElement>("[data-rv-viewport]");
  const prev = region.querySelector<HTMLButtonElement>("[data-rv-prev]");
  const next = region.querySelector<HTMLButtonElement>("[data-rv-next]");
  const cards = gsap.utils.toArray<HTMLElement>(region.querySelectorAll("[data-rv-card]"));
  if (!viewport || !prev || !next || cards.length < 2) return () => {};
  const count = cards.length;

  const rank = loadOrder(region, count);
  let flip: gsap.core.Timeline | null = null;
  let animating = false;

  // Never show every card: one must stay hidden for the loop to have something to bring in.
  const visibleCount = () => {
    const value = parseInt(getComputedStyle(viewport).getPropertyValue("--rv-visible"), 10);
    return Math.min(Number.isFinite(value) && value > 0 ? value : 1, count - 1);
  };

  const apply = () => {
    const visible = visibleCount();
    cards.forEach((card, i) => {
      const shown = rank[i] < visible;
      card.style.order = String(rank[i]);
      card.style.display = shown ? "" : "none";
      card.inert = !shown;
      if (shown) card.removeAttribute("aria-hidden");
      else card.setAttribute("aria-hidden", "true");
    });
  };

  const settle = () => {
    animating = false;
    flip = null;
    gsap.set(cards, { clearProps: "opacity,transform,transformOrigin" });
  };

  /** step 1 = Next (first card leaves on the left), -1 = Previous. */
  const move = (step: 1 | -1) => {
    if (animating) return;
    const state = motion ? Flip.getState(cards) : null;
    for (let i = 0; i < count; i++) rank[i] = (rank[i] - step + count) % count;
    apply();
    if (!state) return;

    animating = true;
    const forward = step === 1;
    flip = Flip.from(state, {
      duration: 0.7,
      ease: "power2.inOut",
      absoluteOnLeave: true,
      // Returned tweens are added to the Flip timeline, so onComplete waits for them.
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out", transformOrigin: forward ? "100% 100%" : "0% 100%" },
        ),
      onLeave: (els) =>
        gsap.to(els, { opacity: 0, scale: 0, duration: 0.5, ease: "power2.in", transformOrigin: forward ? "0% 100%" : "100% 100%" }),
      onComplete: settle,
      onInterrupt: settle,
    });
  };

  const onPrev = () => move(-1);
  const onNext = () => move(1);

  // Swipe: touch and pen only; the viewport has `touch-action: pan-y`, so vertical scrolling still works.
  let tracking = false;
  let startX = 0;
  let startY = 0;
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse") return;
    tracking = true;
    startX = e.clientX;
    startY = e.clientY;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (!tracking) return;
    tracking = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
  };
  const onPointerCancel = () => {
    tracking = false;
  };

  // Crossing a breakpoint changes the visible count: finish any animation, then re-lay out at once.
  const queries = BREAKPOINTS.map((query) => window.matchMedia(query));
  const onWidthChange = () => {
    flip?.progress(1);
    apply();
  };

  apply();
  region.setAttribute("data-rv-ready", "");
  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);
  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointerup", onPointerUp);
  viewport.addEventListener("pointercancel", onPointerCancel);
  queries.forEach((mq) => mq.addEventListener("change", onWidthChange));

  return () => {
    flip?.kill();
    flip = null;
    animating = false;
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
    viewport.removeEventListener("pointerdown", onPointerDown);
    viewport.removeEventListener("pointerup", onPointerUp);
    viewport.removeEventListener("pointercancel", onPointerCancel);
    queries.forEach((mq) => mq.removeEventListener("change", onWidthChange));
    // Also clears what a killed Flip may have left (absolute positioning of a leaving card).
    gsap.set(cards, { clearProps: "opacity,transform,transformOrigin,position,top,left,width,height" });
    cards.forEach((card) => {
      card.style.order = "";
      card.style.display = "";
      card.inert = false;
      card.removeAttribute("aria-hidden");
    });
    region.removeAttribute("data-rv-ready");
  };
}

/** Random order for this page view (Fisher–Yates), stored on the region so later runs reuse it. */
function loadOrder(region: HTMLElement, count: number): number[] {
  const saved = region.dataset.rvOrder?.split(",").map(Number);
  if (saved && saved.length === count && saved.every((n) => Number.isInteger(n) && n >= 0 && n < count)) return saved;

  const positions = Array.from({ length: count }, (_, i) => i);
  for (let i = count - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
  // positions[k] = card shown k-th; the rank of card i is where it appears in that list.
  const rank = new Array<number>(count);
  positions.forEach((card, place) => (rank[card] = place));
  region.dataset.rvOrder = rank.join(",");
  return rank;
}
