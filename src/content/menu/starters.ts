import type { MenuCategory } from "./types";

export const starters: MenuCategory = {
  id: "starters",
  title: { en: "Starters", fr: "Entrées", es: "Entrantes" },
  sections: [
    {
      items: [
        {
          id: "pigeon-pastilla",
          name: { en: "Pigeon Pastilla", fr: "Pastilla au pigeon", es: "Pastela de pichón" },
          description: { en: "Crispy warqa pastry, tender pigeon, roasted almonds, and Moroccan spices with a delicate sweet touch.", fr: "Feuilles de warqa croustillantes, pigeon tendre, amandes grillées et épices marocaines, avec une délicate touche sucrée.", es: "Crujiente masa warqa, tierna carne de pichón, almendras tostadas y especias marroquíes con un delicado toque dulce." },
          price: 150,
        },
        {
          id: "seafood-briouates",
          name: { en: "Seafood Briouates", fr: "Briouates aux fruits de mer", es: "Briouats de marisco" },
          description: { en: "Crispy warqa pastry filled with seafood, vermicelli, herbs, and Moroccan spices.", fr: "Feuilles de warqa croustillantes farcies de fruits de mer, de vermicelles, d’herbes et d’épices marocaines.", es: "Crujiente masa warqa rellena de marisco, fideos vermicelli, hierbas y especias marroquíes." },
          price: 75,
        },
        {
          id: "harira-soup",
          name: { en: "Harira Soup", fr: "Soupe harira", es: "Sopa harira" },
          description: { en: "Traditional Moroccan tomato, legume, fresh herb, and spice soup. Served with chebakia, almond cigars, egg, and dates.", fr: "Soupe marocaine traditionnelle à base de tomates et de légumineuses, avec des herbes fraîches et des épices. Servie avec de la chebakia, des cigares aux amandes, un œuf et des dattes.", es: "Sopa tradicional marroquí de tomate y legumbres, con hierbas frescas y especias. Se sirve con chebakia, cigarros de almendra, huevo y dátiles." },
          price: 65,
        },
        {
          id: "mchermela-liver",
          name: { en: "Mchermela Liver", fr: "Foie de veau mchermel", es: "Hígado Mchermel" },
          description: { en: "Sautéed veal liver with Moroccan spices.", fr: "Foie de veau sauté aux épices marocaines.", es: "Hígado de ternera salteado con especias marroquíes." },
          price: 80,
        },
        {
          id: "chicken-pastilla",
          name: { en: "Chicken Pastilla", fr: "Pastilla au poulet", es: "Pastela de pollo" },
          description: { en: "Crispy warqa pastry, chicken, and almond paste.", fr: "Feuilles de warqa croustillantes garnies de poulet et de pâte d’amandes.", es: "Crujiente masa warqa rellena de pollo y pasta de almendras." },
          price: 70,
        },
      ],
    },
  ],
};
