import type { Metadata } from "next";
import { MenuPage } from "@/components/menu/MenuPage";
import { MENU_UI } from "@/content/menu/ui";
import { languageAlternates } from "@/i18n/metadata";

export const metadata: Metadata = {
  title: MENU_UI.metaTitle.en,
  description: MENU_UI.metaDescription.en,
  alternates: languageAlternates("en", "/menu"),
};

export default function Page() {
  return <MenuPage locale="en" />;
}
