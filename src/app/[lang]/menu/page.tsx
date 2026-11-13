import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MenuPage } from "@/components/menu/MenuPage";
import { MENU_UI } from "@/content/menu/ui";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[lang]/menu">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: MENU_UI.metaTitle[lang], description: MENU_UI.metaDescription[lang] };
}

export default async function Page({ params }: PageProps<"/[lang]/menu">) {
  const { lang } = await params;
  // `/en/menu` must not duplicate `/menu`.
  if (!isLocale(lang) || lang === DEFAULT_LOCALE) notFound();
  return <MenuPage locale={lang} />;
}
