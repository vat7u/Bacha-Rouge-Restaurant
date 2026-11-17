/** A headline piece; `tone` colours one word red or blue (the Intro headline). */
export type HeadlinePart = { text: string; tone?: "red" | "blue" };

export type Chapter = { label: string; title: string; subtitle: string; text: string; alt: string };
export type GalleryFrame = { alt: string; caption: string };

type Five<T> = [T, T, T, T, T];
type Six<T> = [T, T, T, T, T, T];
type Seven<T> = [T, T, T, T, T, T, T];

/**
 * Every piece of home-page text, per language. French and Spanish must match
 * this shape exactly, so a missing string is a type error, not a blank on the page.
 * Array lengths are fixed because the scroll scenes pair items by index.
 */
export type Dictionary = {
  meta: { title: string; description: string };
  nav: { experience: string; menu: string; gallery: string; reserve: string; language: string };
  hero: { tagline: string; reserve: string; stepInside: string; lampAlt: string };
  intro: { headline: HeadlinePart[]; paragraphs: [string, string]; diningAlt: string; dishAlt: string; fezAlt: string };
  experience: { heading: string; chapters: Five<Chapter>; maskAlt: string };
  table: { heading: string; text: string; photoAlt: string; tagineAlt: string; dishesLabel: string; fullMenu: string };
  carte: { viewAll: string };
  gallery: { heading: string; frames: Seven<GalleryFrame>; comeIn: string; reserve: string };
  reservation: {
    heading: string;
    address: string;
    city: string;
    directions: string;
    hours: string;
    hoursValue: string;
    telephone: string;
    instagram: string;
    entranceAlt: string;
    /** Labels for the two numbers on the Telephone line. */
    phones: { whatsapp: string; phone: string };
    /** Labels around the reviews strip; the quotes themselves live in `@/content/reviews` (English only). */
    reviews: {
      /** Accessible name of the carousel region. */
      region: string;
      previous: string;
      next: string;
      seeAll: string;
      /** Read after the Google link, e.g. "(opens in a new tab)". */
      newTab: string;
      /** Star label; `{n}` is replaced by the star count. */
      stars: string;
      /** Small line telling visitors where the quotes come from and that they stay in English. */
      source: string;
    };
    form: {
      name: string;
      date: string;
      time: string;
      guests: string;
      /** Labels in the same order as `GUEST_VALUES` in ReservationForm. */
      guestOptions: Six<string>;
      note: string;
      submit: string;
      /** Shown after submit. Nothing reaches the restaurant until the guest presses Send in WhatsApp. */
      sentTitle: string;
      sentText: string;
      openAgain: string;
      noWhatsapp: string;
      edit: string;
      copy: string;
      copied: string;
      copyFailed: string;
      /** WhatsApp message pieces: a greeting line after `[Website]`, and the label for the note line. */
      message: { greeting: string; note: string };
    };
  };
  footer: { backToTop: string };
};
