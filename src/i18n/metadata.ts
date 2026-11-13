import type { Metadata } from "next";
import { DEFAULT_LOCALE, LOCALES, localePath, type Locale } from "./config";

/**
 * The production address, e.g. "https://bacharouge.ma". Language links for
 * search engines need full URLs, so they are only emitted once this is set
 * (in `.env.production` or the hosting dashboard).
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const metadataBase = SITE_URL ? new URL(SITE_URL) : undefined;

/** Canonical URL plus one alternate per language (and x-default) for `path`. */
export function languageAlternates(locale: Locale, path: `/${string}`): Metadata["alternates"] {
  if (!SITE_URL) return undefined;
  return {
    canonical: localePath(locale, path),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l, path)])),
      "x-default": localePath(DEFAULT_LOCALE, path),
    },
  };
}
