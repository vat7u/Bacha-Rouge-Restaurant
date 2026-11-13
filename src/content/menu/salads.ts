import type { MenuCategory } from "./types";

export const salads: MenuCategory = {
  id: "salads",
  title: { en: "Salads", fr: "Salades", es: "Ensaladas" },
  sections: [
    {
      items: [
        {
          id: "burrata-salad",
          name: { en: "Burrata Salad", fr: "Salade de burrata", es: "Ensalada de burrata" },
          description: { en: "Creamy burrata, served with a house-made vinaigrette.", fr: "Burrata crémeuse servie avec une vinaigrette maison.", es: "Burrata cremosa servida con una vinagreta casera." },
          price: 120,
        },
        {
          id: "moroccan-salad",
          name: { en: "Moroccan Salad", fr: "Salade marocaine", es: "Ensalada marroquí" },
          description: { en: "Fresh vegetables with Moroccan flavors, seasoned with traditional herbs and spices, and Greek cheese.", fr: "Légumes frais aux saveurs marocaines, assaisonnés d’herbes et d’épices traditionnelles, avec du fromage grec.", es: "Verduras frescas con sabores marroquíes, aliñadas con hierbas y especias tradicionales y queso griego." },
          price: 55,
        },
        {
          id: "fennel-avocado-and-shrimp-salad",
          name: { en: "Fennel, Avocado & Shrimp Salad", fr: "Salade de fenouil, avocat et crevettes", es: "Ensalada de hinojo, aguacate y gambas" },
          description: { en: "Crunchy fennel, tuna sauce, creamy avocado, and delicately seasoned shrimp.", fr: "Fenouil croquant, sauce au thon, avocat crémeux et crevettes délicatement assaisonnées.", es: "Hinojo crujiente, salsa de atún, aguacate cremoso y gambas delicadamente sazonadas." },
          price: 85,
        },
        {
          id: "caesar-salad",
          name: { en: "Caesar Salad", fr: "Salade César", es: "Ensalada César" },
          description: { en: "Romaine lettuce, grilled chicken, parmesan, croutons, and house-made Caesar dressing.", fr: "Laitue romaine, poulet grillé, parmesan, croûtons et sauce César maison.", es: "Lechuga romana, pollo a la parrilla, parmesano, picatostes y salsa César casera." },
          price: 85,
        },
      ],
    },
  ],
};
