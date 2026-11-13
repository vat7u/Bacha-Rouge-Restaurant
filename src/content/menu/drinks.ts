import type { MenuCategory } from "./types";

export const drinks: MenuCategory = {
  id: "drinks",
  title: { en: "Drinks", fr: "Boissons", es: "Bebidas" },
  sections: [
    {
      title: { en: "Hot and Cozy", fr: "Boissons chaudes et réconfortantes", es: "Bebidas calientes y reconfortantes" },
      items: [
        {
          id: "espresso",
          name: { en: "Espresso", fr: "Espresso", es: "Espresso" },
          price: 25,
        },
        {
          id: "americano",
          name: { en: "Americano", fr: "Americano", es: "Americano" },
          price: 30,
        },
        {
          id: "noss-noss",
          name: { en: "Noss Noss", fr: "Noss Noss", es: "Noss Noss" },
          price: 30,
        },
        {
          id: "spiced-coffee",
          name: { en: "Spiced Coffee", fr: "Café aux épices", es: "Café especiado" },
          price: 30,
        },
        {
          id: "cappuccino",
          name: { en: "Cappuccino", fr: "Cappuccino", es: "Capuchino" },
          price: 35,
        },
        {
          id: "mint-tea",
          name: { en: "Mint Tea", fr: "Thé à la menthe", es: "Té de menta" },
          price: 25,
        },
        {
          id: "hot-chocolate",
          name: { en: "Hot Chocolate", fr: "Chocolat chaud", es: "Chocolate caliente" },
          price: 35,
        },
      ],
    },
    {
      title: { en: "Fresh Juices", fr: "Jus frais", es: "Zumos naturales" },
      items: [
        {
          id: "orange",
          name: { en: "Orange", fr: "Orange", es: "Naranja" },
          price: 35,
        },
        {
          id: "orange-and-banana",
          name: { en: "Orange & Banana", fr: "Orange et banane", es: "Naranja y plátano" },
          price: 45,
        },
        {
          id: "orange-and-avocado",
          name: { en: "Orange & Avocado", fr: "Orange et avocat", es: "Naranja y aguacate" },
          price: 45,
        },
        {
          id: "orange-and-carrot",
          name: { en: "Orange & Carrot", fr: "Orange et carotte", es: "Naranja y zanahoria" },
          price: 45,
        },
        {
          id: "orange-and-mango",
          name: { en: "Orange & Mango", fr: "Orange et mangue", es: "Naranja y mango" },
          price: 55,
        },
        {
          id: "orange-and-kiwi",
          name: { en: "Orange & Kiwi", fr: "Orange et kiwi", es: "Naranja y kiwi" },
          price: 55,
        },
        {
          id: "pineapple",
          name: { en: "Pineapple", fr: "Ananas", es: "Piña" },
          price: 60,
        },
      ],
    },
    {
      title: { en: "Healthy Corner", fr: "Coin healthy", es: "Rincón saludable" },
      items: [
        {
          id: "skin-care-potion",
          name: { en: "Skin Care Potion", fr: "Potion soin de la peau", es: "Poción para el cuidado de la piel" },
          description: { en: "Orange, carrot, beetroot, lettuce, and orange blossom syrup.", fr: "Orange, carotte, betterave, laitue et sirop de fleur d’oranger.", es: "Naranja, zanahoria, remolacha, lechuga y sirope de flor de azahar." },
          price: 60,
        },
        {
          id: "morning-glow",
          name: { en: "Morning Glow", fr: "Éclat du matin", es: "Brillo mañanero" },
          description: { en: "Cucumber, ginger, apple, mint, and lime.", fr: "Concombre, gingembre, pomme, menthe et citron vert.", es: "Pepino, jengibre, manzana, menta y lima." },
          price: 60,
        },
      ],
    },
    {
      title: { en: "Mocktails", fr: "Mocktails", es: "Cócteles sin alcohol (Mocktails)" },
      items: [
        {
          id: "souk-affair",
          name: { en: "Souk Affair", fr: "Souk Affair", es: "Souk Affair" },
          description: { en: "Passion fruit, pineapple juice, vanilla.", fr: "Fruit de la passion, jus d’ananas et vanille.", es: "Fruta de la pasión, zumo de piña y vainilla." },
          price: 65,
        },
        {
          id: "rouge-royale",
          name: { en: "Rouge Royale", fr: "Rouge Royale", es: "Rouge Royale" },
          description: { en: "Red berries, cherry, lime, orange blossom, and Sprite.", fr: "Fruits rouges, cerise, citron vert, fleur d’oranger et Sprite.", es: "Frutos rojos, cereza, lima, flor de azahar y Sprite." },
          price: 65,
        },
        {
          id: "j-galliano",
          name: { en: "J. Galliano", fr: "J. Galliano", es: "J. Galliano" },
          description: { en: "Orange juice, orange blossom, honey, cinnamon, and sparkling water.", fr: "Jus d’orange, fleur d’oranger, miel, cannelle et eau gazeuse.", es: "Zumo de naranja, flor de azahar, miel, canela y agua con gas." },
          price: 65,
        },
        {
          id: "medina-vogue",
          name: { en: "Medina Vogue", fr: "Medina Vogue", es: "Medina Vogue" },
          description: { en: "Pineapple juice, coconut milk, red berries, and coconut syrup.", fr: "Jus d’ananas, lait de coco, fruits rouges et sirop de coco.", es: "Zumo de piña, leche de coco, frutos rojos y sirope de coco." },
          price: 75,
        },
        {
          id: "saint-laurent",
          name: { en: "Saint Laurent", fr: "Saint Laurent", es: "Saint Laurent" },
          description: { en: "Clementine, lemon, pineapple, and orange juice.", fr: "Clémentine, citron, ananas et jus d’orange.", es: "Mandarina, limón, piña y zumo de naranja." },
          price: 70,
        },
        {
          id: "kasbah-tango",
          name: { en: "Kasbah Tango", fr: "Kasbah Tango", es: "Kasbah Tango" },
          description: { en: "Orange juice, lemon juice, mango juice, vanilla syrup.", fr: "Jus d’orange, jus de citron, jus de mangue et sirop de vanille.", es: "Zumo de naranja, zumo de limón, zumo de mango y sirope de vainilla." },
          price: 60,
        },
      ],
    },
    {
      title: { en: "Mojitos", fr: "Mojitos", es: "Mojitos" },
      note: { en: "Alcohol-free.", fr: "Sans alcool.", es: "Sin alcohol." },
      items: [
        {
          id: "classic-mojito",
          name: { en: "Classic Mojito", fr: "Mojito classique", es: "Mojito clásico" },
          price: 45,
        },
        {
          id: "passion-mojito",
          name: { en: "Passion Mojito", fr: "Mojito passion", es: "Mojito de fruta de la pasión" },
          price: 55,
        },
      ],
    },
    {
      title: { en: "Water & Sodas", fr: "Eaux et sodas", es: "Aguas y refrescos" },
      items: [
        {
          id: "still-water-1l",
          name: { en: "Still Water 1L", fr: "Eau plate 1 L", es: "Agua sin gas 1 L" },
          price: 25,
        },
        {
          id: "sparkling-water-1l",
          name: { en: "Sparkling Water 1L", fr: "Eau gazeuse 1 L", es: "Agua con gas 1 L" },
          price: 35,
        },
        {
          id: "coca-cola-coca-cola-zero",
          name: { en: "Coca-Cola / Coca-Cola Zero", fr: "Coca-Cola / Coca-Cola Zero", es: "Coca-Cola / Coca-Cola Zero" },
          price: 25,
        },
        {
          id: "sprite",
          name: { en: "Sprite", fr: "Sprite", es: "Sprite" },
          price: 25,
        },
        {
          id: "poms",
          name: { en: "Poms", fr: "Poms", es: "Poms" },
          price: 25,
        },
        {
          id: "hawaii",
          name: { en: "Hawaii", fr: "Hawaii", es: "Hawaii" },
          price: 25,
        },
        {
          id: "red-bull",
          name: { en: "Red Bull", fr: "Red Bull", es: "Red Bull" },
          price: 35,
        },
        {
          id: "s-pellegrino",
          name: { en: "S.Pellegrino", fr: "S.Pellegrino", es: "S.Pellegrino" },
          price: 50,
        },
        {
          id: "budweiser-0-0",
          name: { en: "Budweiser 0,0%", fr: "Budweiser 0,0 %", es: "Budweiser 0,0 %" },
          price: 50,
        },
        {
          id: "heineken-0-0",
          name: { en: "Heineken 0,0%", fr: "Heineken 0,0 %", es: "Heineken 0,0 %" },
          price: 50,
        },
      ],
    },
  ],
};
