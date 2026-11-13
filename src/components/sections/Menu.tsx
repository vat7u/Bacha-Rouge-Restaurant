import Image from "next/image";
import Link from "next/link";
import { words } from "@/components/ui/split";
import { MENU } from "@/content/menu";
import { localePath, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Home-page doorway to the menu: "BACHA" beside the category titles, each
 * linking to its place on the full menu page.
 *
 * With motion allowed the panel is tall and the stage sticks to the screen
 * while `LandingMotion` slides the titles past the word, highlighting the one
 * in the middle. With reduced motion (or no script) it is a plain short list.
 */
export function Menu({ locale, t }: { locale: Locale; t: Dictionary }) {
  const menuPath = localePath(locale, "/menu");
  return (
    <section id="carte" data-carte="" className="relative bg-ink">
      <div data-arch-panel="" className="relative bg-ivory text-ink motion-safe:h-[300vh]">
        <div className="relative px-[6vw] py-[clamp(90px,11vw,160px)] motion-safe:sticky motion-safe:top-0 motion-safe:h-screen motion-safe:py-0 motion-safe:overflow-clip">
          <nav
            aria-labelledby="carte-title"
            className="max-w-[1180px] h-full mx-auto flex items-center gap-x-[clamp(28px,5vw,80px)] gap-y-6 max-[760px]:flex-col max-[760px]:items-start max-[760px]:motion-safe:pt-[14vh]"
          >
            <h2 id="carte-title" className="sr-only">
              {t.nav.menu}
            </h2>
            {/* On wide screens the link hangs below the word so the word itself is centred on the anchor line. */}
            <div className="relative flex-none flex flex-col gap-6">
              {/* The fez perches on the top-left corner of the word, like a hat on the B. */}
              <Image
                src="/assets/fez.png"
                alt=""
                aria-hidden="true"
                width={1236}
                height={1006}
                sizes="140px"
                className="absolute bottom-full left-[-3%] mb-1 w-[clamp(64px,8vw,130px)] h-auto -rotate-12 drop-shadow-[0_14px_18px_rgba(23,16,18,.3)] pointer-events-none"
              />
              {/* Decorative: the hero already carries the BACHA ROUGE heading. */}
              <div
                aria-hidden="true"
                data-split=""
                className="font-serif font-normal text-[clamp(64px,11vw,170px)] leading-[.9] tracking-[.02em] text-wine"
              >
                {words("BACHA")}
              </div>
              <Link
                href={menuPath}
                className="self-start text-[11px] tracking-[.28em] uppercase text-ink hover:text-crimson py-2 border-b border-wine min-[761px]:absolute min-[761px]:top-full min-[761px]:left-0 min-[761px]:mt-6 whitespace-nowrap"
              >
                {t.carte.viewAll} →
              </Link>
            </div>

            {/* The window the titles slide through; the anchor marks the line the active title sits on. */}
            <div className="relative flex-1 w-full motion-safe:self-stretch motion-safe:overflow-clip">
              <span data-carte-anchor="" aria-hidden="true" className="absolute left-0 top-1/2 h-0 w-0" />
              <ul
                data-carte-list=""
                data-stagger=""
                className="list-none m-0 p-0 flex flex-col gap-[.32em] font-serif uppercase text-[clamp(26px,3.4vw,50px)] leading-[1.05] tracking-[.02em] motion-safe:absolute motion-safe:inset-x-0 motion-safe:top-0"
              >
                {MENU.map((category) => (
                  <li key={category.id} data-item="">
                    <Link
                      href={`${menuPath}#${category.id}`}
                      data-carte-link=""
                      className="inline-block text-ink hover:text-crimson focus-visible:opacity-100! focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wine"
                    >
                      {category.title[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
