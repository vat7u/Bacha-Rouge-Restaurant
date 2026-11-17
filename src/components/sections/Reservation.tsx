import type { ReactNode } from "react";
import { GiltFrame } from "@/components/ui/GiltFrame";
import { Photo } from "@/components/ui/Photo";
import { words } from "@/components/ui/split";
import { CONTACT, telLink, waLink } from "@/content/contact";
import type { Locale } from "@/i18n/config";
import { FLOURISHES, type Dictionary } from "@/i18n/dictionaries";
import { ReservationForm } from "./ReservationForm";
import { ReviewsStrip } from "./ReviewsStrip";

const ARCHES = [
  "M2 30 V14 A10 10 0 0 1 22 14 V30",
  "M27 30 V14 A10 10 0 0 1 47 14 V30",
  "M52 30 V14 A10 10 0 0 1 72 14 V30",
  "M77 30 V14 A10 10 0 0 1 97 14 V30",
  "M102 30 V10 A23 23 0 0 1 148 10 V30",
  "M153 30 V14 A10 10 0 0 1 173 14 V30",
  "M178 30 V14 A10 10 0 0 1 198 14 V30",
  "M203 30 V14 A10 10 0 0 1 223 14 V30",
  "M228 30 V14 A10 10 0 0 1 248 14 V30",
];

function Info({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-item="" className="flex flex-col gap-1.5">
      <span className="text-[10.5px] tracking-[.26em] uppercase text-gold">{label}</span>
      {children}
    </div>
  );
}

const VALUE = "text-[15px] leading-[1.6] font-light";

export function Reservation({ locale, t }: { locale: Locale; t: Dictionary["reservation"] }) {
  return (
    <section data-res="" className="relative bg-oxblood overflow-clip">
      <div className="plaster-bg absolute inset-0" />
      <div className="res-shade absolute inset-0" />
      <div className="relative pt-[clamp(90px,11vw,160px)] px-[6vw] pb-[clamp(80px,9vw,130px)] flex flex-col gap-[clamp(32px,4vw,48px)]">
        <svg data-draw="" viewBox="0 0 250 30" fill="none" stroke="#B99655" className="self-center w-[min(100%,500px)] h-auto">
          {ARCHES.map((d) => (
            <path key={d} d={d} pathLength="1" strokeDasharray="1" />
          ))}
        </svg>

        <ReviewsStrip t={t.reviews} />

        {/* `#reserver` sits here, not on the section, so every "Reserve" link lands on the form rather than the reviews. */}
        <div
          id="reserver"
          className="max-w-[1320px] w-full mx-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-[clamp(56px,7vw,120px)]"
        >
          <div className="flex flex-col gap-7">
            <h2
              data-split=""
              className="m-0 font-serif font-normal text-[clamp(46px,6.2vw,104px)] leading-[.95] uppercase text-balance"
            >
              {words(t.heading)}
            </h2>
            <div lang="fr" className="font-script text-[38px] text-gold leading-none">
              {FLOURISHES.farewell}
            </div>
            <ReservationForm locale={locale} t={t.form} />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10 content-start">
            <GiltFrame
              shape="square"
              className="relative col-span-full w-[min(100%,440px)] justify-self-center"
              sizes="(max-width: 480px) 100vw, 440px"
              openingProps={{ "data-reveal": "up" }}
            >
              <div data-reveal-img="" className="absolute inset-0">
                <Photo src="/assets/ta/02.jpg" alt={t.entranceAlt} sizes="(max-width: 480px) 62vw, 280px" />
              </div>
            </GiltFrame>
            <div data-stagger="" className="flex flex-col gap-[22px]">
              <Info label={t.address}>
                <span className={VALUE}>
                  {CONTACT.street}
                  <br />
                  {t.city}
                </span>
                <a
                  href={CONTACT.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-[11px] tracking-[.24em] uppercase self-start border-b border-gold pb-[3px] mt-1"
                >
                  {t.directions}
                </a>
              </Info>
              <Info label={t.hours}>
                <span className={VALUE}>{t.hoursValue}</span>
              </Info>
            </div>
            <div data-stagger="" className="flex flex-col gap-[22px]">
              <Info label={t.telephone}>
                <a href={waLink()} target="_blank" rel="noopener" className={`${VALUE} self-start hover:text-gold`}>
                  <span className="block text-[10px] tracking-[.2em] uppercase text-ivory/70">{t.phones.whatsapp}</span>
                  <span className="whitespace-nowrap">{CONTACT.whatsappDisplay}</span>
                </a>
                <a href={telLink(CONTACT.phone)} className={`${VALUE} self-start mt-1.5 hover:text-gold`}>
                  <span className="block text-[10px] tracking-[.2em] uppercase text-ivory/70">{t.phones.phone}</span>
                  <span className="whitespace-nowrap">{CONTACT.phoneDisplay}</span>
                </a>
              </Info>
              <Info label={t.instagram}>
                <a href={CONTACT.instagramUrl} target="_blank" rel="noopener" className={`${VALUE} self-start hover:text-gold`}>
                  {CONTACT.instagramHandle}
                </a>
              </Info>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
