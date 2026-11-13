import Image from "next/image";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { words } from "@/components/ui/split";
import { FLOURISHES, type Dictionary } from "@/i18n/dictionaries";
import { MENU, type MenuItem } from "@/content/menu";
import { MENU_UI } from "@/content/menu/ui";
import { localePath, type Locale } from "@/i18n/config";

const CATEGORY_ID = "moroccan-specialties";
/** Dishes shown beside the tagine; ids come from `@/content/menu/moroccan-specialties.ts`. */
const SIGNATURE_IDS = [
  "chicken-tagine-with-preserved-lemon",
  "lamb-shank-tagine",
  "beef-tagine-with-prunes-and-almonds",
  "marrakech-tanjia-1-kg",
];

const category = MENU.find((c) => c.id === CATEGORY_ID);
const dishes: MenuItem[] = SIGNATURE_IDS.map((id) => {
  const item = category?.sections.flatMap((s) => s.items).find((i) => i.id === id);
  if (!item) throw new Error(`Gastronomy: dish "${id}" is missing from the menu`);
  return item;
});

export function Gastronomy({ locale, t }: { locale: Locale; t: Dictionary["table"] }) {
  const menuHref = `${localePath(locale, "/menu")}#${CATEGORY_ID}`;
  return (
    <section id="table" data-gastro="" className="relative h-[280vh] bg-ink">
      <div className="herringbone-bg sticky top-0 h-screen overflow-clip">
        <div className="absolute inset-0 bg-ink/62" />
        <div data-g-photo="" className="absolute inset-0 overflow-hidden">
          <div data-g-photo-img="" className="absolute inset-0">
            <Photo src="/assets/ta/interior-red-room.jpg" alt={t.photoAlt} sizes="100vw" />
          </div>
        </div>
        <div data-g-scrim="" className="gastro-scrim absolute inset-0 pointer-events-none" />

        {/* Heading block and dishes panel share one column so they stack instead of overlapping on short screens. */}
        <div className="absolute inset-0 z-[5] flex flex-col gap-6 px-[6vw] pt-[clamp(80px,13vh,140px)] pb-[6vh] pointer-events-none">
          <div className="flex flex-col items-center gap-[18px] text-center">
            <h2
              data-g-head=""
              data-split=""
              data-split-manual=""
              className="m-0 font-serif font-normal text-[clamp(42px,min(6.4vw,11vh),112px)] leading-[.95] uppercase max-w-[14ch] text-balance"
            >
              {words(t.heading)}
            </h2>
            <div data-g-fade="" lang="fr" className="font-script text-[clamp(28px,2.6vw,40px)] text-gold leading-[1.1]">
              {FLOURISHES.tagine}
            </div>
            <p data-g-fade="" className="m-0 max-w-[46ch] min-[761px]:[@media(max-height:640px)]:hidden text-[15px] leading-[1.7] font-light text-pretty">
              {t.text}
            </p>
          </div>

          <div
            data-g-dishes=""
            className="mt-auto self-end w-[min(38vw,480px)] px-6 py-4 bg-ink/75 backdrop-blur-sm border border-gold/30 pointer-events-auto max-[760px]:self-stretch max-[760px]:w-auto max-[760px]:px-5"
          >
            <p className="m-0 mb-3 text-[11px] tracking-[.28em] uppercase text-gold max-[760px]:text-center">
              {t.dishesLabel}
            </p>
            <ul className="list-none m-0 p-0 border-t border-gold/40">
              {dishes.map((dish) => (
                <li key={dish.id} data-g-dish="" className="border-b border-gold/25">
                  <Link
                    href={menuHref}
                    className="flex items-baseline justify-between gap-4 py-[clamp(6px,1.2vh,12px)] hover:text-gold transition-colors"
                  >
                    <span className="font-serif text-[clamp(16px,1.5vw,22px)] leading-tight">{dish.name[locale]}</span>
                    {typeof dish.price === "number" && (
                      <span className="whitespace-nowrap tabular-nums text-[14px] text-gold">
                        {dish.price} {MENU_UI.currency[locale]}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              data-g-dish=""
              href={menuHref}
              className="inline-block mt-3 text-[11px] tracking-[.28em] uppercase border-b border-gold py-2 hover:text-gold max-[760px]:block max-[760px]:text-center"
            >
              {t.fullMenu} →
            </Link>
          </div>
        </div>

        <div
          data-g-tagine=""
          className="absolute left-1/2 bottom-[2vh] w-[clamp(240px,30vw,460px)] h-[clamp(200px,25vw,380px)] z-[4]"
          style={{ marginLeft: "calc(clamp(240px, 30vw, 460px) / -2)" }}
        >
          <Image
            src="/assets/tagine.png"
            alt={t.tagineAlt}
            width={968}
            height={778}
            sizes="(max-width: 800px) 240px, 30vw"
            className="block w-full h-full object-contain object-[50%_100%] drop-shadow-[0_30px_40px_rgba(0,0,0,.55)]"
          />
        </div>
      </div>
    </section>
  );
}
