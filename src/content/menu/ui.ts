import type { Localized } from "@/i18n/config";

/** Fixed wording around the menu (not dishes). */
export const MENU_UI = {
  pageTitle: { en: "Menu", fr: "Menu", es: "Menú" },
  metaTitle: {
    en: "Menu — Bacha Rouge, Chefchaouen",
    fr: "Menu — Bacha Rouge, Chefchaouen",
    es: "Menú — Bacha Rouge, Chefchaouen",
  },
  metaDescription: {
    en: "The full Bacha Rouge menu: Moroccan specialties, Beldi fusions, desserts and alcohol-free drinks, with prices in dirhams.",
    fr: "Le menu complet de Bacha Rouge : spécialités marocaines, fusions beldi, desserts et boissons sans alcool, avec les prix en dirhams.",
    es: "El menú completo de Bacha Rouge: especialidades marroquíes, fusiones beldi, postres y bebidas sin alcohol, con precios en dírhams.",
  },
  pricesNote: {
    en: "All prices are in Moroccan dirhams (Dhs).",
    fr: "Tous les prix sont indiqués en dirhams marocains (Dhs).",
    es: "Todos los precios están expresados en dírhams marroquíes (Dhs).",
  },
  allergyNote: {
    en: "Please tell your server about any allergies or dietary requirements.",
    fr: "Merci de signaler toute allergie ou tout régime alimentaire à votre serveur.",
    es: "Informe a su camarero de cualquier alergia o necesidad alimentaria.",
  },
  categoriesLabel: { en: "Menu categories", fr: "Catégories du menu", es: "Categorías del menú" },
  languageLabel: { en: "Language", fr: "Langue", es: "Idioma" },
  home: { en: "Back to the home page", fr: "Retour à l’accueil", es: "Volver al inicio" },
  backToTop: { en: "Back to top", fr: "Haut de page", es: "Volver arriba" },
  currency: { en: "Dhs", fr: "Dhs", es: "Dhs" },
} satisfies Record<string, Localized>;
