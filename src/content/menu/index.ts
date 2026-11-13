import { LOCALES, type Localized } from "@/i18n/config";
import { beldiFusions } from "./beldi-fusions";
import { desserts } from "./desserts";
import { drinks } from "./drinks";
import { moroccanSpecialties } from "./moroccan-specialties";
import { pasta } from "./pasta";
import { salads } from "./salads";
import { starters } from "./starters";
import type { MenuCategory } from "./types";

export type { MenuCategory, MenuItem, MenuSection, PriceVariant } from "./types";

/** The whole menu, in the order it is shown. */
export const MENU: MenuCategory[] = [salads, starters, moroccanSpecialties, beldiFusions, pasta, desserts, drinks];

/**
 * Fails the build with a readable message when an edit leaves the menu in a
 * state guests should never see (blank text, bad price, duplicate id).
 */
function validateMenu(menu: MenuCategory[]) {
  const problems: string[] = [];
  const seen = new Set<string>();

  const checkText = (text: Localized, where: string) => {
    for (const locale of LOCALES) {
      if (typeof text[locale] !== "string" || text[locale].trim() === "") problems.push(`${where}: missing "${locale}" text`);
    }
  };
  const checkAmount = (amount: number, where: string) => {
    if (!Number.isFinite(amount) || amount <= 0) problems.push(`${where}: price must be a number above 0`);
  };
  const checkId = (id: string, where: string) => {
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) problems.push(`${where}: id "${id}" must be lowercase letters, digits and dashes`);
    if (seen.has(id)) problems.push(`${where}: id "${id}" is used twice`);
    seen.add(id);
  };

  for (const category of menu) {
    const inCategory = `menu category "${category.id}"`;
    checkId(category.id, inCategory);
    checkText(category.title, `${inCategory} title`);
    if (category.sections.length === 0) problems.push(`${inCategory}: has no sections`);

    for (const section of category.sections) {
      if (section.title) checkText(section.title, `${inCategory} section title`);
      if (section.note) checkText(section.note, `${inCategory} section note`);
      if (section.items.length === 0) problems.push(`${inCategory}: a section has no items`);

      for (const item of section.items) {
        const inItem = `menu item "${item.id}" (${category.id})`;
        checkId(item.id, inItem);
        checkText(item.name, `${inItem} name`);
        if (item.description) checkText(item.description, `${inItem} description`);
        if (Array.isArray(item.price)) {
          if (item.price.length === 0) problems.push(`${inItem}: price list is empty`);
          for (const variant of item.price) {
            checkText(variant.label, `${inItem} price label`);
            checkAmount(variant.amount, inItem);
          }
        } else {
          checkAmount(item.price, inItem);
        }
      }
    }
  }

  if (problems.length > 0) {
    throw new Error(`The menu in src/content/menu has ${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  }
}

validateMenu(MENU);
