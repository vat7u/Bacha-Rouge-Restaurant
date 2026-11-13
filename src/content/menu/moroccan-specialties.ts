import type { MenuCategory } from "./types";

export const moroccanSpecialties: MenuCategory = {
  id: "moroccan-specialties",
  title: { en: "Moroccan Specialties", fr: "Spécialités marocaines", es: "Especialidades marroquíes" },
  sections: [
    {
      items: [
        {
          id: "chicken-tagine-with-preserved-lemon",
          name: { en: "Chicken Tagine with Preserved Lemon", fr: "Tajine de poulet au citron confit", es: "Tajín de pollo con limón encurtido" },
          description: { en: "Slow-cooked chicken with preserved lemon, olives, and Moroccan spices.", fr: "Poulet mijoté lentement avec du citron confit, des olives et des épices marocaines.", es: "Pollo cocinado lentamente con limón encurtido, aceitunas y especias marroquíes." },
          price: 85,
        },
        {
          id: "lamb-shank-tagine",
          name: { en: "Lamb Shank Tagine", fr: "Tajine de jarret d’agneau", es: "Tajín de jarrete de cordero" },
          description: { en: "Lamb shank slow-cooked until tender and meltingly soft.", fr: "Jarret d’agneau longuement mijoté jusqu’à obtenir une tendreté fondante.", es: "Jarrete de cordero cocinado lentamente hasta quedar tierno y muy jugoso." },
          price: 220,
        },
        {
          id: "beef-tagine-with-prunes-and-almonds",
          name: { en: "Beef Tagine with Prunes & Almonds", fr: "Tajine de bœuf aux pruneaux et aux amandes", es: "Tajín de ternera con ciruelas pasas y almendras" },
          description: { en: "Slow-cooked beef with prunes, roasted almonds, and Moroccan spices.", fr: "Bœuf mijoté lentement avec des pruneaux, des amandes grillées et des épices marocaines.", es: "Ternera cocinada lentamente con ciruelas pasas, almendras tostadas y especias marroquíes." },
          price: 95,
        },
        {
          id: "kefta-tagine-with-eggs",
          name: { en: "Kefta Tagine with Eggs", fr: "Tajine de kefta aux œufs", es: "Tajín de kefta con huevos" },
          description: { en: "Kefta simmered in a fragrant tomato sauce, topped with eggs.", fr: "Kefta mijotée dans une sauce tomate parfumée et garnie d’œufs.", es: "Kefta cocinada a fuego lento en una aromática salsa de tomate y cubierta con huevos." },
          price: 85,
        },
        {
          id: "royal-couscous",
          name: { en: "Royal Couscous", fr: "Couscous royal", es: "Cuscús real" },
          description: { en: "Fine semolina, seasonal vegetables, and broth flavored with Moroccan spices. Choice of meat, chicken, or vegetarian.", fr: "Semoule fine, légumes de saison et bouillon parfumé aux épices marocaines. Au choix : viande, poulet ou végétarien.", es: "Sémola fina, verduras de temporada y caldo aromatizado con especias marroquíes. A elegir: carne, pollo o vegetariano." },
          price: [
            { label: { en: "Meat", fr: "Viande", es: "Carne" }, amount: 105 },
            { label: { en: "Chicken", fr: "Poulet", es: "Pollo" }, amount: 90 },
            { label: { en: "Vegetarian", fr: "Végétarien", es: "Vegetariano" }, amount: 65 },
          ],
        },
        {
          id: "salmon-tagine-with-meslalla-olives",
          name: { en: "Salmon Tagine with Meslalla Olives", fr: "Tajine de saumon aux olives Meslalla", es: "Tajín de salmón con aceitunas Meslalla" },
          description: { en: "Delicately simmered salmon with Meslalla olives and Moroccan flavors.", fr: "Saumon délicatement mijoté avec des olives Meslalla et des saveurs marocaines.", es: "Salmón cocinado delicadamente a fuego lento con aceitunas Meslalla y sabores marroquíes." },
          price: 145,
        },
        {
          id: "anchovy-tagra-with-rosemary",
          name: { en: "Anchovy Tagra with Rosemary", fr: "Tagra d’anchois au romarin", es: "Tagra de anchoas al romero" },
          description: { en: "Anchovies cooked in a clay tagra with tomato sauce, rosemary, and spices.", fr: "Anchois cuits dans une tagra en terre cuite, avec une sauce tomate, du romarin et des épices.", es: "Anchoas cocinadas en una tagra de barro con salsa de tomate, romero y especias." },
          price: 85,
        },
        {
          id: "lamb-skewers-moroccan-marinade",
          name: { en: "Lamb Skewers, Moroccan Marinade", fr: "Brochettes d’agneau, marinade marocaine", es: "Brochetas de cordero al estilo marroquí" },
          description: { en: "Lamb pieces marinated in Moroccan herbs and spices, then grilled.", fr: "Morceaux d’agneau marinés aux herbes et aux épices marocaines, puis grillés.", es: "Trozos de cordero marinados con hierbas y especias marroquíes y después a la parrilla." },
          price: 135,
        },
        {
          id: "stuffed-coquelet-with-vermicelli",
          name: { en: "Stuffed Coquelet with Vermicelli", fr: "Coquelet farci aux vermicelles", es: "Coquelet relleno de fideos vermicelli" },
          description: { en: "Generously stuffed young chicken (coquelet) with delicately flavored vermicelli.", fr: "Jeune poulet (coquelet) généreusement farci de vermicelles délicatement parfumés.", es: "Pollo joven (coquelet) generosamente relleno de fideos vermicelli delicadamente aromatizados." },
          price: 165,
        },
        {
          id: "marrakech-tanjia-1-kg",
          name: { en: "Marrakech Tanjia – 1 kg", fr: "Tanjia de Marrakech – 1 kg", es: "Tanjia de Marrakech – 1 kg" },
          description: { en: "Meat slow-cooked with garlic, preserved lemon, smen, and traditional spices. Serves 2.", fr: "Viande longuement mijotée avec de l’ail, du citron confit, du smen et des épices traditionnelles. Pour 2 personnes.", es: "Carne cocinada lentamente con ajo, limón encurtido, smen y especias tradicionales. Para 2 personas." },
          price: 350,
        },
      ],
    },
  ],
};
