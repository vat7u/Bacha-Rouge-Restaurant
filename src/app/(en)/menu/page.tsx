import type { Metadata } from "next";
import { MenuPage } from "@/components/menu/MenuPage";
import { MENU_UI } from "@/content/menu/ui";

export const metadata: Metadata = {
  title: MENU_UI.metaTitle.en,
  description: MENU_UI.metaDescription.en,
};

export default function Page() {
  return <MenuPage locale="en" />;
}
