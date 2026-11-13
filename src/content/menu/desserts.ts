import type { MenuCategory } from "./types";

export const desserts: MenuCategory = {
  id: "desserts",
  title: { en: "Desserts", fr: "Desserts", es: "Postres" },
  sections: [
    {
      items: [
        {
          id: "san-sebastian-cheesecake-with-red-berries",
          name: { en: "San Sebastián Cheesecake with Red Berries", fr: "Cheesecake San Sebastián aux fruits rouges", es: "Tarta de queso San Sebastián con frutos rojos" },
          description: { en: "Melting, slightly caramelized cheesecake served with red berries.", fr: "Cheesecake fondant, légèrement caramélisé, servi avec des fruits rouges.", es: "Tarta de queso fundente, ligeramente caramelizada y servida con frutos rojos." },
          price: 70,
        },
        {
          id: "amlou-and-almond-fondant",
          name: { en: "Amlou & Almond Fondant", fr: "Fondant à l’amlou et aux amandes", es: "Fondant de amlou y almendras" },
          description: { en: "Gourmet chocolate fondant with amlou and almond flavors.", fr: "Délicieux fondant au chocolat aux saveurs d’amlou et d’amande.", es: "Delicioso fondant de chocolate con sabores de amlou y almendra." },
          price: 70,
        },
        {
          id: "saffron-creme-brulee",
          name: { en: "Saffron Crème Brûlée", fr: "Crème brûlée au safran", es: "Crème brûlée de azafrán" },
          description: { en: "Velvety cream flavored with saffron, topped with a thin caramelized crust.", fr: "Crème veloutée parfumée au safran, recouverte d’une fine couche de caramel croquant.", es: "Crema sedosa aromatizada con azafrán y cubierta con una fina capa de caramelo crujiente." },
          price: 70,
        },
        {
          id: "jawhara",
          name: { en: "Jawhara", fr: "Jawhara", es: "Jawhara" },
          description: { en: "Crispy pastry layers, milk cream flavored with orange blossom and almonds.", fr: "Couches de pâte croustillante et crème au lait parfumée à la fleur d’oranger et aux amandes.", es: "Capas de masa crujiente con crema de leche aromatizada con agua de azahar y almendras." },
          price: 60,
        },
        {
          id: "chocolate-and-argan-oil-mousse",
          name: { en: "Chocolate & Argan Oil Mousse", fr: "Mousse au chocolat et à l’huile d’argan", es: "Mousse de chocolate y aceite de argán" },
          description: { en: "Velvety chocolate mousse, delicately enhanced with argan oil.", fr: "Mousse au chocolat veloutée, délicatement relevée d’huile d’argan.", es: "Mousse de chocolate sedosa, delicadamente realzada con aceite de argán." },
          price: 70,
        },
      ],
    },
  ],
};
