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
  table: { heading: string; text: string; photoAlt: string; tagineAlt: string };
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
    email: string;
    instagram: string;
    entranceAlt: string;
    form: {
      name: string;
      contact: string;
      date: string;
      time: string;
      guests: string;
      /** Labels in the same order as `GUEST_VALUES` in ReservationForm. */
      guestOptions: Six<string>;
      note: string;
      submit: string;
      thanks: string;
    };
  };
  footer: { backToTop: string };
};
