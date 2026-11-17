import { CONTACT } from "./contact";

/**
 * Guest reviews shown in the reservation section, copied by hand from the
 * restaurant's Google Maps page (source: docs/Bacha-reviews.json, reference only).
 *
 * - Quotes stay word for word: keep spelling, capitals, apostrophes and spacing.
 *   A line break in the original becomes one space.
 * - To remove a review, delete its entry. To add one, copy an entry and give it a
 *   new unique id. The build stops if a rule below is broken.
 * - The page shows them in a random order, so every entry must read well alone.
 */
export type Review = {
  /** Stable, language-neutral identifier. */
  id: string;
  /** Reviewer's name exactly as Google shows it. */
  name: string;
  /** Whole stars, 1 to 5. */
  stars: number;
  /** The review text, plain text only. */
  text: string;
};

/** Longest quote allowed, in words. Card heights are sized for this. */
export const MAX_REVIEW_WORDS = 46;

/** Where "See all reviews on Google" leads. */
export const REVIEWS_URL = CONTACT.mapsUrl;

export const REVIEWS: Review[] = [
  {
    id: "yuki-wong",
    name: "Yuki Wong",
    stars: 5,
    text: "Enjoyed our dinner at the rooftop with stunning views. Food was great and excellent service. Highly recommended !",
  },
  {
    id: "pablo-salazar",
    name: "Pablo Salazar",
    stars: 5,
    text: "food was definitely one of the best I’ve had in Morocco. great customer service and really cool interior. Definitely stop by if you’re in Chefchaouen",
  },
  {
    id: "christine-wong",
    name: "Christine Wong",
    stars: 5,
    text: "A relaxing rooftop for the beautiful sunset. It shared the same view as the Spanish Mosque. Staff are all friendly and attentive. Fish tajine is tasty.",
  },
  {
    id: "lala-taghiyeva",
    name: "Lala Taghiyeva",
    stars: 5,
    text: "It is very nice place with good ambiance. We watched sunset there and it was magical. Food is really delicious. Special thanks to hosts Ismail and Kamal!",
  },
  {
    id: "alisha-kumar",
    name: "alisha kumar",
    stars: 5,
    text: "The first restaurant we went to since arriving at Chefchaouen. Food, ambiance, & service by Mohammed was amazing. Highly recommend. One of the best restaurants from our Morocco trip.",
  },
  {
    id: "imane-r",
    name: "Imane R",
    stars: 5,
    text: "Good food , good service and a beautifully decorated place.",
  },
  {
    id: "ashlee-booker",
    name: "Ashlee Booker",
    stars: 5,
    text: "Incredible indoor seating and an impressive terrace. I recommend going an hour before sunset for a spectacular view of the hills. We had starters, mains, and desserts - everything was delicious, there was attentive service, and reasonably priced for an exceptional dining experience.",
  },
  {
    id: "mo-metwally",
    name: "Mo Metwally",
    stars: 5,
    text: "The lunch was delicious just like homemade food. I appreciated the authentic taste and quality. The atmosphere was wonderful, with beautiful décor. The service was excellent, and everyone was welcoming and attentive. Everything about this place really exceeded my expectations. I highly recommend it.",
  },
  {
    id: "cynia-manning",
    name: "Cynia Manning",
    stars: 5,
    text: "Kamal is a great manager. He was super welcoming and his staff took great care of us. We were seated and helped to the rooftop and the food came out in a timely manner. They also have beautiful indoor dining. I’d 100% recommend this place.",
  },
  {
    id: "guy-who-travels",
    name: "Guy Who Travels",
    stars: 5,
    text: "This restaurant was quite lovely. They responded quickly when I asked for a reservation and the server was helpful when picking food to try. The main course was good and we enjoyed the desert. We recommend the terrace which has a good view of the city.",
  },
];

/**
 * Fails the build with one readable message when an edit breaks a rule:
 * empty text, bad star count, duplicate id, HTML, a quote that is too long,
 * a non-https link, or too few reviews for the carousel to loop.
 */
function validateReviews(reviews: Review[]) {
  const problems: string[] = [];
  const seen = new Set<string>();

  if (reviews.length < 4) problems.push(`there are ${reviews.length} reviews; at least 4 are needed`);
  if (!REVIEWS_URL.startsWith("https://")) problems.push("REVIEWS_URL must start with https://");

  for (const review of reviews) {
    const where = `review "${review.id}"`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(review.id)) problems.push(`${where}: id must be lowercase letters, digits and dashes`);
    if (seen.has(review.id)) problems.push(`${where}: id is used twice`);
    seen.add(review.id);
    if (review.name.trim() === "") problems.push(`${where}: name is empty`);
    if (review.text.trim() === "") problems.push(`${where}: text is empty`);
    if (!Number.isInteger(review.stars) || review.stars < 1 || review.stars > 5) problems.push(`${where}: stars must be a whole number from 1 to 5`);
    if (review.text.includes("<")) problems.push(`${where}: text must be plain text (no "<")`);
    const words = review.text.trim().split(/\s+/).length;
    if (words > MAX_REVIEW_WORDS) problems.push(`${where}: ${words} words; the limit is ${MAX_REVIEW_WORDS}`);
  }

  if (problems.length > 0) {
    throw new Error(`The reviews in src/content/reviews.ts have ${problems.length} problem(s):\n- ${problems.join("\n- ")}`);
  }
}

validateReviews(REVIEWS);
