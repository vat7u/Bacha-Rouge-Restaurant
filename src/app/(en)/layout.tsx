import type { Metadata } from "next";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: "Bacha Rouge — Chefchaouen",
  description:
    "A theatrical dining room of red plaster, velvet and brass in the heart of the blue city.",
};

// Root layout for English, which lives at the site root (`/`, `/menu`).
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
