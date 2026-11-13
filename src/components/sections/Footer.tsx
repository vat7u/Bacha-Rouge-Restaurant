import Image from "next/image";
import { FLOURISHES, type Dictionary } from "@/i18n/dictionaries";

export function Footer({ t }: { t: Dictionary["footer"] }) {
  return (
    <footer className="bg-ink py-12 px-[6vw] flex flex-wrap items-center justify-between gap-6 border-t border-gold/25">
      <div className="flex items-center gap-3.5">
        <Image src="/assets/logo.png" alt="Bacha Rouge" width={44} height={44} className="block size-11" />
        <span className="font-serif text-[14px] tracking-[.32em]">BACHA ROUGE</span>
      </div>
      <span lang="fr" className="text-[11px] tracking-[.24em] uppercase text-gold">
        {FLOURISHES.place}
      </span>
      <a href="#top" className="text-[11px] tracking-[.24em] uppercase">
        {t.backToTop} ↑
      </a>
    </footer>
  );
}
