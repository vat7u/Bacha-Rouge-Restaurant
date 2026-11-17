/**
 * Contact details shown on every language version of the home page.
 * Address, phone numbers and Instagram come from the restaurant's Google Maps
 * page and the owner (checked 2026-11-17). The restaurant has no email address.
 * Numbers are stored as digits only; the display text and links are built from them.
 */
export const CONTACT = {
  street: "Derb Chorfa",
  /** WhatsApp number that receives reservations (the form sends to it). */
  whatsapp: "212763960486",
  whatsappDisplay: "+212 763 960 486",
  /** Number listed on the Google profile. */
  phone: "212606799619",
  phoneDisplay: "+212 606 799 619",
  instagramHandle: "@bacharouge_restaurant",
  instagramUrl: "https://www.instagram.com/bacharouge_restaurant/",
  /** The restaurant's Google Maps place page (Directions and "See all reviews"). */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Bacha%20Rouge%20Restaurant&query_place_id=ChIJYedjYzQnCw0RgiQDqUs0jKY",
} as const;

/**
 * First line of every WhatsApp request sent from the site, so the staff can
 * count them. The square brackets are deliberate, not a placeholder.
 */
export const WHATSAPP_MARKER = "[Website]";

/** WhatsApp chat with the reservations number, optionally with a pre-written message. */
export function waLink(text?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Phone link for a digits-only number with its country code. */
export function telLink(digits: string): string {
  return `tel:+${digits}`;
}
