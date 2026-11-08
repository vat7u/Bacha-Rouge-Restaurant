import type { Metadata } from "next";
import { Bodoni_Moda, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";

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

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bacha Rouge — Chefchaouen",
  description:
    "A theatrical dining room of red plaster, velvet and brass in the heart of the blue city.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${jost.variable} ${pinyon.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
