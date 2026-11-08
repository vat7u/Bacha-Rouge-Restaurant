import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { words } from "@/components/ui/split";

export function Gastronomy() {
  return (
    <section id="table" data-gastro="" className="relative h-[320vh] bg-ink">
      <div className="herringbone-bg sticky top-0 h-screen overflow-clip">
        <div className="absolute inset-0 bg-ink/62" />
        <div data-g-photo="" className="absolute inset-0 overflow-hidden">
          <div data-g-photo-img="" className="absolute inset-0">
            <Photo src="/assets/ta/interior-red-room.jpg" alt="The red dining room: velvet chairs, laid tables and carved masks on oxblood plaster" sizes="100vw" />
          </div>
        </div>
        <div data-g-scrim="" className="gastro-scrim absolute inset-0 pointer-events-none" />

        <div className="absolute inset-x-0 top-[clamp(80px,13vh,140px)] z-[3] flex flex-col items-center gap-[18px] px-[6vw] text-center pointer-events-none">
          <Eyebrow data-g-fade="" numeral="III" label="La Table" tone="gold" />
          <h2
            data-g-head=""
            data-split=""
            data-split-manual=""
            className="m-0 font-serif font-normal text-[clamp(42px,6.4vw,112px)] leading-[.95] uppercase max-w-[14ch] text-balance"
          >
            {words("Slow fire, shared table")}
          </h2>
          <div data-g-fade="" className="font-script text-[clamp(28px,2.6vw,40px)] text-gold leading-[1.1]">
            servi dans le tajine rouge
          </div>
          <p data-g-fade="" className="m-0 max-w-[46ch] text-[15px] leading-[1.7] font-light text-pretty">
            Traditional Moroccan dishes arrive in individual red tagines, slow-cooked and uncovered at the table. The
            ritual is part of the meal.
          </p>
        </div>

        <div
          data-g-tagine=""
          className="absolute left-1/2 bottom-[2vh] w-[clamp(240px,30vw,460px)] h-[clamp(200px,25vw,380px)] z-[4]"
          style={{ marginLeft: "calc(clamp(240px, 30vw, 460px) / -2)" }}
        >
          <Image
            src="/assets/tagine.png"
            alt="Red Moroccan tagine"
            width={968}
            height={778}
            sizes="(max-width: 800px) 240px, 30vw"
            className="block w-full h-full object-contain object-[50%_100%] drop-shadow-[0_30px_40px_rgba(0,0,0,.55)]"
          />
        </div>
      </div>
    </section>
  );
}
