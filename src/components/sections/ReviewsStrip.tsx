import { REVIEWS, REVIEWS_URL } from "@/content/reviews";
import type { Dictionary } from "@/i18n/dictionaries";

const STAR = "M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z";

function Stars({ count, label }: { count: number; label: string }) {
  return (
    <div role="img" aria-label={label} className="flex gap-1 text-gold">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={`size-3.5 ${i < count ? "fill-current" : "fill-none stroke-current"}`}>
          <path d={STAR} />
        </svg>
      ))}
    </div>
  );
}

function Chevron({ flip }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-4 fill-none stroke-current stroke-[1.5] ${flip ? "rotate-180" : ""}`}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

const BUTTON =
  "grid place-items-center size-11 border border-gold/60 text-gold cursor-pointer bg-transparent hover:bg-gold hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory";

/**
 * Guest reviews from Google above the reservation form. Server markup only:
 * `reviewsCarousel.ts` (called by `LandingMotion`) shuffles the cards, shows
 * one, two or three at a time and wires the buttons and swipe. Without
 * JavaScript the cards stay a sideways-scrolling row and the buttons stay hidden.
 */
export function ReviewsStrip({ t }: { t: Dictionary["reservation"]["reviews"] }) {
  return (
    <div className="max-w-[1320px] w-full mx-auto">
      {/* Small inset so the one-time clip-path reveal does not cut off focus rings at the edges. */}
      <div data-reveal="up" className="-m-1 p-1">
        <div
          data-rv=""
          role="region"
          aria-roledescription="carousel"
          aria-label={t.region}
          className="group/rv flex flex-col gap-4 min-[761px]:gap-5"
        >
          <div
            data-rv-viewport=""
            className="overflow-x-auto snap-x snap-mandatory touch-pan-y group-data-[rv-ready]/rv:overflow-hidden [--rv-visible:1] [--rv-gap:16px] min-[761px]:[--rv-visible:2] min-[761px]:[--rv-gap:20px] min-[1280px]:[--rv-visible:3]"
          >
            <ul className="relative list-none m-0 p-0 flex gap-[var(--rv-gap)]">
              {REVIEWS.map((review) => (
                <li
                  key={review.id}
                  data-rv-card=""
                  className="flex-none snap-start w-[calc((100%_-_(var(--rv-visible)_-_1)_*_var(--rv-gap))_/_var(--rv-visible))] h-[266px] min-[761px]:h-[310px] min-[1280px]:h-[290px]"
                >
                  {/* Fixed heights fit the longest quote (MAX_REVIEW_WORDS) at each width; re-measure if a longer one is added. */}
                  <figure className="m-0 h-full flex flex-col gap-3 bg-ink/55 border border-gold/35 p-4 min-[380px]:p-5 min-[761px]:p-6">
                    <Stars count={review.stars} label={t.stars.replace("{n}", String(review.stars))} />
                    <blockquote lang="en" className="m-0 flex-1 text-[14px] leading-[1.5] min-[761px]:text-[15px] min-[761px]:leading-[1.6] font-light text-pretty">
                      {review.text}
                    </blockquote>
                    <figcaption className="text-[11px] tracking-[.24em] uppercase text-ivory/80">{review.name}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 min-w-0">
              {/* Tighter lettering on phones keeps this row close to the buttons' 44px height. */}
              <span className="text-[11px] tracking-[.04em] text-gold min-[761px]:text-[10.5px] min-[761px]:tracking-[.2em] min-[761px]:uppercase">
                {t.source}
              </span>
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener"
                className="self-start text-[11px] tracking-[.12em] min-[761px]:tracking-[.24em] uppercase border-b border-gold pb-[3px] hover:text-gold"
              >
                {t.seeAll}
                <span className="sr-only"> {t.newTab}</span>
              </a>
            </div>
            <div className="hidden group-data-[rv-ready]/rv:flex flex-none gap-2">
              <button type="button" data-rv-prev="" aria-label={t.previous} className={BUTTON}>
                <Chevron />
              </button>
              <button type="button" data-rv-next="" aria-label={t.next} className={BUTTON}>
                <Chevron flip />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
