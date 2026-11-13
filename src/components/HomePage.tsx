import { LandingMotion } from "@/components/motion/LandingMotion";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Gastronomy } from "@/components/sections/Gastronomy";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Menu } from "@/components/sections/Menu";
import { Reservation } from "@/components/sections/Reservation";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/** The home page in one language; each section gets only its slice of the dictionary. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <LandingMotion>
      <Hero locale={locale} t={t} />
      <Intro t={t.intro} />
      <Experience t={t.experience} />
      <Gastronomy t={t.table} />
      <Menu locale={locale} t={t} />
      <Gallery t={t.gallery} />
      <Reservation t={t.reservation} />
      <Footer t={t.footer} />
    </LandingMotion>
  );
}
