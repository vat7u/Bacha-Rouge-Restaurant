export const LOCALES = ["en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** One string in every supported language. */
export type Localized = Record<Locale, string>;

export const LOCALE_NAMES: Localized = { en: "English", fr: "Français", es: "Español" };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** English lives at the root (`/menu`); other languages are prefixed (`/fr/menu`). */
export function localePath(locale: Locale, path: `/${string}`): string {
  if (locale === DEFAULT_LOCALE) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
