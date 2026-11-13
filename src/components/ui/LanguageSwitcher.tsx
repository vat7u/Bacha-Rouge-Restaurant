import Link from "next/link";
import { LOCALE_NAMES, LOCALES, localePath, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  /** The same page in every language, e.g. "/" or "/menu". */
  path: `/${string}`;
  label: string;
  tone: "light" | "dark";
};

/** EN · FR · ES links to the current page in each language. Links only: no redirect, no stored choice. */
export function LanguageSwitcher({ locale, path, label, tone }: LanguageSwitcherProps) {
  const idle = tone === "dark" ? "text-ivory hover:text-gold" : "text-ink hover:text-wine";
  const active = tone === "dark" ? "text-gold" : "text-wine";
  return (
    <nav aria-label={label}>
      <ul className="list-none m-0 p-0 flex text-[12px] tracking-[.18em] uppercase">
        {LOCALES.map((l) => (
          <li key={l}>
            <Link
              href={localePath(l, path)}
              hrefLang={l}
              lang={l}
              aria-label={LOCALE_NAMES[l]}
              aria-current={l === locale ? "page" : undefined}
              className={`flex items-center justify-center min-w-11 min-h-11 px-1.5 ${
                l === locale ? `${active} font-medium underline underline-offset-8` : idle
              }`}
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
