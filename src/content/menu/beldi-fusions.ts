import type { MenuCategory } from "./types";

export const beldiFusions: MenuCategory = {
  id: "beldi-fusions",
  title: { en: "Beldi Fusions", fr: "Fusions Beldi", es: "Fusiones Beldi" },
  sections: [
    {
      items: [
        {
          id: "filet-mignon-carob-sauce",
          name: { en: "Filet Mignon, Carob Sauce", fr: "Filet mignon, sauce à la caroube", es: "Filete mignon con salsa de algarroba" },
          description: { en: "Tender filet mignon accompanied by a refined carob sauce.", fr: "Filet mignon tendre accompagné d’une sauce à la caroube raffinée.", es: "Tierno filete mignon acompañado de una refinada salsa de algarroba." },
          price: 220,
        },
        {
          id: "sea-bream-with-regional-herbs",
          name: { en: "Sea Bream with Regional Herbs", fr: "Daurade aux herbes régionales", es: "Dorada con hierbas de la región" },
          description: { en: "Delicately cooked sea bream flavored with fresh regional herbs.", fr: "Daurade délicatement cuisinée et parfumée aux herbes fraîches de la région.", es: "Dorada cocinada delicadamente y aromatizada con hierbas frescas de la región." },
          price: 210,
        },
        {
          id: "salmon-steak-with-fennel",
          name: { en: "Salmon Steak with Fennel", fr: "Pavé de saumon au fenouil", es: "Filete de salmón con hinojo" },
          description: { en: "Salmon steak served with delicately prepared fennel. Side choice: mashed potatoes, vegetable garden, or homemade fries.", fr: "Pavé de saumon servi avec du fenouil délicatement préparé. Garniture au choix : purée de pommes de terre, légumes du potager ou frites maison.", es: "Filete de salmón servido con hinojo preparado delicadamente. Guarnición a elegir: puré de patatas, verduras de la huerta o patatas fritas caseras." },
          price: 170,
        },
        {
          id: "bacha-mrouzia-burger",
          name: { en: "Bacha Mrouzia Burger", fr: "Burger Bacha Mrouzia", es: "Hamburguesa Bacha Mrouzia" },
          description: { en: "Mrouzia-style lamb burger, honey, raisins, house sauce, cheddar, and fries.", fr: "Burger d’agneau façon Mrouzia, avec miel, raisins secs, sauce maison, cheddar et frites.", es: "Hamburguesa de cordero al estilo Mrouzia, con miel, pasas, salsa de la casa, cheddar y patatas fritas." },
          price: 110,
        },
      ],
    },
  ],
};
