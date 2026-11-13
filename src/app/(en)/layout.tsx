import type { Metadata } from "next";
import { metadataBase } from "@/i18n/metadata";
import { fontVariables } from "../fonts";
import "../globals.css";

export const metadata: Metadata = { metadataBase };

// Root layout for English, which lives at the site root (`/`, `/menu`).
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}
