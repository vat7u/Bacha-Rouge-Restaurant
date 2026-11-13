import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/HomePage";
import { DEFAULT_LOCALE, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { languageAlternates } from "@/i18n/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.meta.title, description: t.meta.description, alternates: languageAlternates(lang, "/") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  // `/en` must not duplicate `/`.
  if (!isLocale(lang) || lang === DEFAULT_LOCALE) notFound();
  return <HomePage locale={lang} />;
}
