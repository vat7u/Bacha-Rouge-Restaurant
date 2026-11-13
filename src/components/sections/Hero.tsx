import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import type { Locale } from "@/i18n/config";
import { FLOURISHES, type Dictionary } from "@/i18n/dictionaries";

function HeroWord({ word, side }: { word: string; side: "l" | "r" }) {
  return (
    <span data-hero-word={side} className="inline-flex">
      {[...word].map((char, i) => (
        <span key={i} className="inline-block overflow-hidden py-[.08em]">
          <span data-hero-char="" className="inline-block">
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section
      id="top"
      data-hero=""
      className="relative h-screen min-h-[680px] overflow-clip bg-oxblood"
    >
      <div data-hero-bg="" className="plaster-bg absolute inset-x-0 top-[-12%] bottom-[-12%]">
        <div className="hero-vignette absolute inset-0" />
      </div>

      <nav
        data-nav=""
        className="absolute inset-x-0 top-0 z-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-[5vw] py-[26px]"
      >
        <a href="#top" className="flex items-center">
          <Image src="/assets/logo.png" alt="Bacha Rouge" width={58} height={58} preload className="block size-[58px]" />
        </a>
        <div className="flex flex-wrap items-center gap-x-[26px] gap-y-2 text-[11px] tracking-[.26em] uppercase">
          <a href="#experience" className="max-[760px]:hidden">{t.nav.experience}</a>
          <a href="#carte" className="max-[760px]:hidden">{t.nav.menu}</a>
          <a href="#galerie" className="max-[760px]:hidden">{t.nav.gallery}</a>
          <LanguageSwitcher locale={locale} path="/" label={t.nav.language} tone="dark" />
          <a href="#reserver" className="px-[18px] py-2.5 border border-ivory/55">{t.nav.reserve}</a>
        </div>
      </nav>

      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <h1
          data-hero-title=""
          className="m-0 flex flex-wrap justify-center gap-x-[clamp(180px,34vh,360px)] gap-y-0 font-serif font-medium text-[clamp(44px,9.6vw,190px)] leading-[.9] tracking-[-.01em] text-ivory text-center translate-y-[2vh] max-[760px]:flex-col max-[760px]:items-center max-[760px]:-translate-y-[25vh]"
        >
          <HeroWord word="BACHA" side="l" />
          <HeroWord word="ROUGE" side="r" />
        </h1>
      </div>

      <div data-pendant-scroll="" className="absolute left-1/2 top-0 w-0 h-full z-[3]">
        <div data-pendant="" className="pendant absolute origin-[50%_0%]">
          <div data-pendant-sway="" className="relative origin-[50%_0%]">
            <div className="pendant-chain" />
            <div className="relative">
              <div
                data-hero-glow=""
                className="hero-glow absolute left-[-160%] right-[-160%] top-[60%] h-[70%] pointer-events-none"
              />
              <Image
                src="/assets/lamp.png"
                alt={t.hero.lampAlt}
                width={440}
                height={1493}
                sizes="300px"
                preload
                className="relative block w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        data-hero-copy=""
        className="absolute inset-x-0 bottom-[5vh] z-[4] flex flex-col items-center gap-4 px-[6vw] text-center max-[760px]:bottom-[3vh]"
      >
        <div data-hero-fade="" lang="fr" className="font-script text-[clamp(28px,2.6vw,38px)] text-gold leading-none">
          {FLOURISHES.place}
        </div>
        <p data-hero-fade="" className="m-0 max-w-[44ch] text-[15px] leading-[1.65] font-light text-pretty">
          {t.hero.tagline}
        </p>
        <div data-hero-fade="" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3.5 mt-1.5">
          <a
            href="#reserver"
            className="bg-ivory text-oxblood px-[30px] py-4 text-[11px] tracking-[.28em] uppercase font-medium hover:bg-gold hover:text-ink"
          >
            {t.hero.reserve}
          </a>
          <a href="#maison" className="text-[11px] tracking-[.28em] uppercase py-2 border-b border-gold">
            {t.hero.stepInside}
          </a>
        </div>
      </div>
    </section>
  );
}
