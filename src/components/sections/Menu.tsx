import Link from "next/link";
import { words } from "@/components/ui/split";
import { MENU } from "@/content/menu";
import { localePath, type Locale } from "@/i18n/config";

// The home page is English-only for now.
const LOCALE: Locale = "en";

/** Home-page doorway to the menu: the category titles, each linking to its place on the full menu page. */
export function Menu() {
  const menuPath = localePath(LOCALE, "/menu");
  return (
    <section id="carte" className="relative bg-ink">
      <div data-arch-panel="" className="bg-ivory text-ink py-[clamp(90px,11vw,160px)] px-[6vw]">
        <nav
          aria-labelledby="carte-title"
          className="max-w-[1180px] mx-auto flex items-start gap-x-[clamp(28px,5vw,80px)] gap-y-8 max-[760px]:flex-col"
        >
          <h2 id="carte-title" className="sr-only">
            Menu
          </h2>
          {/* Decorative: the hero already carries the BACHA ROUGE heading. */}
          <div
            aria-hidden="true"
            data-split=""
            className="flex-none font-serif font-normal text-[clamp(64px,11vw,170px)] leading-[.9] tracking-[.02em] text-wine"
          >
            {words("BACHA")}
          </div>
          <div className="flex flex-col gap-8 pt-[clamp(4px,1vw,16px)]">
            <ul
              data-stagger=""
              className="list-none m-0 p-0 flex flex-col font-serif uppercase text-[clamp(26px,3.4vw,50px)] leading-[1.05] tracking-[.02em] gap-[.32em]"
            >
              {MENU.map((category) => (
                <li key={category.id} data-item="">
                  <Link href={`${menuPath}#${category.id}`} className="inline-block text-ink hover:text-crimson">
                    {category.title[LOCALE]}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={menuPath}
              className="self-start text-[11px] tracking-[.28em] uppercase text-ink hover:text-crimson py-2 border-b border-wine"
            >
              View the full menu →
            </Link>
          </div>
        </nav>
      </div>
    </section>
  );
}
