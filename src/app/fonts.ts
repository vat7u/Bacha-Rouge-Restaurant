import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

// Decorative only, and never used on the menu page, so it is not preloaded.
const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  preload: false,
});

/** Class names that expose the font CSS variables; set on <html> by every root layout. */
export const fontVariables = `${bodoni.variable} ${jost.variable} ${pinyon.variable}`;
