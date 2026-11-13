import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/i18n/config";
import { fontVariables } from "../fonts";
import "../globals.css";

// English is served by the (en) root layout; this one covers the prefixed languages.
export function generateStaticParams() {
  return LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  // Unknown prefixes end in a 404 from the page; the attribute just needs a valid value.
  return (
    <html lang={isLocale(lang) ? lang : DEFAULT_LOCALE} className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
