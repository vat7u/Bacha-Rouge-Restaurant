import Image from "next/image";
import Link from "next/link";
import { MENU, type MenuItem, type MenuSection } from "@/content/menu";
import { MENU_UI } from "@/content/menu/ui";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { localePath, type Locale } from "@/i18n/config";

function Price({ amount, locale }: { amount: number; locale: Locale }) {
  return (
    <span className="whitespace-nowrap tabular-nums font-medium">
      {amount} {MENU_UI.currency[locale]}
    </span>
  );
}

function Item({ item, locale }: { item: MenuItem; locale: Locale }) {
  const variants = Array.isArray(item.price) ? item.price : null;
  return (
    <li className="py-4 border-b border-ink/15 last:border-b-0">
      <div className="flex items-baseline justify-between gap-4 text-[19px] leading-snug">
        <span className="font-medium">{item.name[locale]}</span>
        {typeof item.price === "number" && <Price amount={item.price} locale={locale} />}
      </div>
      {item.description && <p className="m-0 mt-1.5 text-[16px] leading-normal text-ink/80">{item.description[locale]}</p>}
      {variants && (
        <ul className="list-none m-0 mt-2 p-0 text-[17px]">
          {variants.map((variant) => (
            <li key={variant.label.en} className="flex items-baseline justify-between gap-4 py-0.5">
              <span>{variant.label[locale]}</span>
              <Price amount={variant.amount} locale={locale} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Section({ section, locale }: { section: MenuSection; locale: Locale }) {
  return (
    <div className="mt-6">
      {section.title && (
        <h3 className="m-0 font-sans font-medium text-[15px] tracking-[.18em] uppercase text-wine">{section.title[locale]}</h3>
      )}
      {section.note && <p className="m-0 mt-2 text-[16px] italic text-ink/80">{section.note[locale]}</p>}
      <ul className="list-none m-0 mt-1 p-0">
        {section.items.map((item) => (
          <Item key={item.id} item={item} locale={locale} />
        ))}
      </ul>
    </div>
  );
}

/**
 * The full menu, also opened on guests' phones at the table. Plain HTML and
 * CSS only: no animation and no client JavaScript, so it stays fast and
 * readable on a weak connection.
 */
export function MenuPage({ locale }: { locale: Locale }) {
  return (
    <div id="top" className="min-h-screen bg-ivory text-ink font-sans">
      <header className="mx-auto max-w-[760px] px-5 pt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <Link href={localePath(locale, "/")} aria-label={MENU_UI.home[locale]} className="flex items-center gap-3 text-ink hover:text-wine">
          <Image src="/assets/logo.png" alt="" width={40} height={40} className="block size-10" />
          <span className="font-serif text-[14px] tracking-[.3em] font-medium">BACHA ROUGE</span>
        </Link>
        <LanguageSwitcher locale={locale} path="/menu" label={MENU_UI.languageLabel[locale]} tone="light" />
      </header>

      <div className="mx-auto max-w-[760px] px-5 pt-10 pb-6">
        <h1 className="m-0 font-serif font-normal text-[clamp(52px,12vw,88px)] leading-none text-wine">
          {MENU_UI.pageTitle[locale]}
        </h1>
        <p className="m-0 mt-5 text-[16px] text-ink/80">{MENU_UI.pricesNote[locale]}</p>
        <p className="m-0 mt-3 px-4 py-3 text-[17px] leading-snug border border-wine/50">{MENU_UI.allergyNote[locale]}</p>
      </div>

      <nav aria-label={MENU_UI.categoriesLabel[locale]} className="sticky top-0 z-10 bg-ivory border-y border-wine/30">
        <ul className="list-none m-0 mx-auto max-w-[760px] px-3 flex overflow-x-auto [scrollbar-width:none]">
          {MENU.map((category) => (
            <li key={category.id} className="flex-none">
              <a
                href={`#${category.id}`}
                className="flex items-center min-h-12 px-3 text-[14px] tracking-[.1em] uppercase whitespace-nowrap text-ink hover:text-wine"
              >
                {category.title[locale]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="mx-auto max-w-[760px] px-5 pb-16">
        {MENU.map((category) => (
          <section key={category.id} id={category.id} aria-labelledby={`${category.id}-title`} className="scroll-mt-16 pt-12">
            <h2 id={`${category.id}-title`} className="m-0 font-serif font-normal text-[clamp(30px,7vw,40px)] leading-tight text-wine">
              {category.title[locale]}
            </h2>
            {category.sections.map((section, i) => (
              <Section key={section.title?.en ?? i} section={section} locale={locale} />
            ))}
          </section>
        ))}
      </main>

      <footer className="border-t border-wine/30">
        <div className="mx-auto max-w-[760px] px-5 py-8 flex flex-col gap-4 text-[16px] text-ink/80">
          <p className="m-0">{MENU_UI.allergyNote[locale]}</p>
          <p className="m-0">{MENU_UI.pricesNote[locale]}</p>
          <a href="#top" className="self-start flex items-center min-h-11 text-ink underline underline-offset-4 hover:text-wine">
            {MENU_UI.backToTop[locale]} ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
