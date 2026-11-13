import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { getDictionary } from "@/i18n/dictionaries";
import { languageAlternates } from "@/i18n/metadata";

const t = getDictionary("en");

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: languageAlternates("en", "/"),
};

export default function Home() {
  return <HomePage locale="en" />;
}
