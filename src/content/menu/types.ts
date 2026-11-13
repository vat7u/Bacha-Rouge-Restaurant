import type { Localized } from "@/i18n/config";

/** A dish with several sizes or versions lists one labelled price per version. */
export type PriceVariant = { label: Localized; amount: number };

export type MenuItem = {
  /** Stable, language-neutral identifier. Unique across the whole menu. */
  id: string;
  name: Localized;
  description?: Localized;
  /** Price in dirhams, written once for all languages. */
  price: number | PriceVariant[];
};

export type MenuSection = {
  /** Sub-heading inside a category, e.g. "Fresh Juices" under Drinks. */
  title?: Localized;
  note?: Localized;
  items: MenuItem[];
};

export type MenuCategory = {
  /** Used as the anchor on the menu page (`/menu#salads`). Never translate or rename lightly: QR codes and links point at it. */
  id: string;
  title: Localized;
  sections: MenuSection[];
};
