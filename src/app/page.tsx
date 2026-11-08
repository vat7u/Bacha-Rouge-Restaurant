import { LandingMotion } from "@/components/motion/LandingMotion";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Gastronomy } from "@/components/sections/Gastronomy";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Menu } from "@/components/sections/Menu";
import { Reservation } from "@/components/sections/Reservation";

export default function Home() {
  return (
    <LandingMotion>
      <Hero />
      <Intro />
      <Experience />
      <Gastronomy />
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
    </LandingMotion>
  );
}
