import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink py-12 px-[6vw] flex flex-wrap items-center justify-between gap-6 border-t border-gold/25">
      <div className="flex items-center gap-3.5">
        <Image src="/assets/logo.png" alt="Bacha Rouge" width={44} height={44} className="block size-11" />
        <span className="font-serif text-[14px] tracking-[.32em]">BACHA ROUGE</span>
      </div>
      <span className="text-[11px] tracking-[.24em] uppercase text-gold">Chefchaouen · Maroc</span>
      <a href="#top" className="text-[11px] tracking-[.24em] uppercase">
        Back to top ↑
      </a>
    </footer>
  );
}
