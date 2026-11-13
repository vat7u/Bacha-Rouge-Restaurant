import type { MenuCategory } from "./types";

export const pasta: MenuCategory = {
  id: "pasta",
  title: { en: "Pasta", fr: "Pâtes", es: "Pasta" },
  sections: [
    {
      note: { en: "Pasta choice: Rigatoni, Spaghetti, or Tagliatelle.", fr: "Choix des pâtes : rigatoni, spaghetti ou tagliatelle.", es: "Elige el tipo de pasta: rigatoni, espaguetis o tagliatelle." },
      items: [
        {
          id: "bolognese",
          name: { en: "Bolognese", fr: "Bolognaise", es: "Boloñesa" },
          description: { en: "Simmered tomato sauce with minced meat, flavored with herbs.", fr: "Sauce tomate mijotée avec de la viande hachée et parfumée aux herbes.", es: "Salsa de tomate cocinada a fuego lento con carne picada y aromatizada con hierbas." },
          price: 95,
        },
        {
          id: "chicken-and-mushrooms",
          name: { en: "Chicken & Mushrooms", fr: "Poulet et champignons", es: "Pollo y champiñones" },
          description: { en: "Tender chicken and fresh mushrooms in a creamy sauce.", fr: "Poulet tendre et champignons frais dans une sauce crémeuse.", es: "Pollo tierno y champiñones frescos en una salsa cremosa." },
          price: 80,
        },
        {
          id: "pesto-shrimp",
          name: { en: "Pesto Shrimp", fr: "Crevettes au pesto", es: "Gambas al pesto" },
          description: { en: "Shrimp served with a basil-flavored pesto sauce.", fr: "Crevettes accompagnées d’une sauce pesto parfumée au basilic.", es: "Gambas servidas con una salsa pesto aromatizada con albahaca." },
          price: 120,
        },
      ],
    },
  ],
};
