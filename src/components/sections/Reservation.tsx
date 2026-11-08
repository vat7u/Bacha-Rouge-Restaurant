import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { words } from "@/components/ui/split";
import { ReservationForm } from "./ReservationForm";

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

export function Reservation() {
  return (
    <section id="reserver" data-res="" className="relative bg-oxblood overflow-clip">
      <div className="plaster-bg absolute inset-0" />
      <div className="res-shade absolute inset-0" />
      <div className="relative pt-[clamp(90px,11vw,160px)] px-[6vw] pb-[clamp(80px,9vw,130px)] flex flex-col gap-[clamp(56px,7vw,100px)]">
        <svg data-draw="" viewBox="0 0 250 30" fill="none" stroke="#B99655" className="self-center w-[min(100%,500px)] h-auto">
          {ARCHES.map((d) => (
            <path key={d} d={d} pathLength="1" strokeDasharray="1" />
          ))}
        </svg>

        <div className="max-w-[1320px] w-full mx-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-[clamp(56px,7vw,120px)]">
          <div className="flex flex-col gap-7">
            <Eyebrow numeral="VI" label="Réserver" tone="gold" />
            <h2
              data-split=""
              className="m-0 font-serif font-normal text-[clamp(46px,6.2vw,104px)] leading-[.95] uppercase text-balance"
            >
              {words("Your table is waiting")}
            </h2>
            <div className="font-script text-[38px] text-gold leading-none">à très bientôt</div>
            <ReservationForm />
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10 content-start">
            <div
              data-reveal="up"
              className="relative col-span-full h-[clamp(340px,36vw,520px)] rounded-[999px_999px_0_0] overflow-hidden max-w-[420px] w-full justify-self-center"
            >
              <div data-reveal-img="" className="absolute inset-0">
                <Photo src="/assets/ta/02.jpg" alt="Entrance" sizes="420px" />
              </div>
            </div>
            <div data-stagger="" className="flex flex-col gap-[22px]">
              <Info label="Address">
                <span className={VALUE}>
                  [Street address]
                  <br />
                  Chefchaouen, Morocco
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bacha+Rouge+Chefchaouen"
                  target="_blank"
                  rel="noopener"
                  className="text-[11px] tracking-[.24em] uppercase self-start border-b border-gold pb-[3px] mt-1"
                >
                  Directions
                </a>
              </Info>
              <Info label="Hours">
                <span className={VALUE}>[Opening days &amp; hours]</span>
              </Info>
            </div>
            <div data-stagger="" className="flex flex-col gap-[22px]">
              <Info label="Telephone">
                <span className={VALUE}>[+212 ··· ··· ···]</span>
              </Info>
              <Info label="Email">
                <span className={VALUE}>[reservations@…]</span>
              </Info>
              <Info label="Instagram">
                <span className={VALUE}>[@handle]</span>
              </Info>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
