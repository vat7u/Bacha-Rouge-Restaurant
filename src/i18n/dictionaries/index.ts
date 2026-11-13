import type { Locale } from "../config";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import type { Dictionary } from "./types";

export type { Chapter, Dictionary, GalleryFrame, HeadlinePart } from "./types";

const DICTIONARIES: Record<Locale, Dictionary> = { en, fr, es };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/**
 * Decorative French lines kept in every language as part of the brand voice.
 * Render them with `lang="fr"` so screen readers pronounce them correctly.
 */
export const FLOURISHES = {
  place: "Chefchaouen · Maroc",
  welcome: "Bienvenue chez Bacha Rouge",
  tagine: "servi dans le tajine rouge",
  gallery: "la galerie",
  door: "la porte est ouverte",
  farewell: "à très bientôt",
  thanks: "MERCI.",
} as const;
