import Image from "next/image";
import { Photo } from "@/components/ui/Photo";
import { W, words } from "@/components/ui/split";

export function Intro() {
  return (
    <section id="maison" data-intro="" className="relative bg-oxblood">
      <div
        data-arch-panel=""
        className="bg-ivory text-ink px-[6vw] pt-[clamp(96px,13vw,190px)] pb-[clamp(96px,12vw,170px)]"
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-[clamp(56px,7vw,120px)] items-center">
          <div className="flex flex-col gap-8">
            <h2
              data-split=""
              className="m-0 font-serif font-normal text-[clamp(46px,6.2vw,104px)] leading-[.98] tracking-[-.01em] uppercase text-balance"
            >
              {words("A")}{" "}
              <W>
                <span className="text-crimson">red</span>
              </W>{" "}
              {words("room in the")}{" "}
              <W>
                <em className="text-chaouen italic">blue</em>
              </W>{" "}
              {words("city.")}
            </h2>
            <div
              data-stagger=""
              className="flex flex-col gap-[18px] max-w-[50ch] text-[16px] leading-[1.75] text-[#3b2a2c] font-light"
            >
              <p data-item="" className="m-0 text-pretty">
                Chefchaouen is famous for blue. Behind our door, everything turns red — plaster walls the colour of
                oxblood, velvet on every chair, brass lamps that glow rather than shine.
              </p>
              <p data-item="" className="m-0 text-pretty">
                Bacha Rouge is a dining room in the old manner: Moroccan cooking served with the ceremony of a vintage
                European salon. Come for dinner, stay for the evening.
              </p>
              <div data-item="" className="font-script text-[36px] text-wine leading-[1.2] mt-2">
                Bienvenue chez Bacha Rouge
              </div>
            </div>
          </div>

          <div className="relative h-[clamp(520px,64vw,860px)]">
            <div
              data-reveal="up"
              className="absolute right-0 top-0 h-[84%] aspect-[2/3] rounded-[999px_999px_0_0] overflow-hidden"
            >
              <div data-reveal-img="" className="absolute inset-0">
                <Photo
                  src="/assets/ta/dining-room.webp"
                  alt="Dining room with fringed red lamps hanging from a carved plaster ceiling above laid tables and velvet seating"
                  sizes="(max-width: 960px) 60vw, 30vw"
                />
              </div>
            </div>
            <div
              data-reveal="left"
              className="frame-border [--fw:18px] absolute left-0 bottom-0 w-[56%] aspect-[3/2] overflow-hidden"
            >
              <div data-reveal-img="" className="absolute inset-0">
                <Photo
                  src="/assets/ta/signature-dish.webp"
                  alt="Roasted bird on layered pastry, garnished with blue cornflower petals, against a blue tiled wall"
                  sizes="(max-width: 960px) 56vw, 28vw"
                />
              </div>
            </div>
            <div data-speed="0.35" className="absolute left-[4%] top-[6%] w-[30%] h-[26%]">
              <Image
                src="/assets/fez.png"
                alt="Red fez with black tassel"
                width={1236}
                height={1006}
                sizes="(max-width: 960px) 30vw, 15vw"
                className="block w-full h-full object-contain drop-shadow-[0_24px_30px_rgba(23,16,18,.35)]"
              />
            </div>
            <svg
              data-draw=""
              data-spin="90"
              viewBox="0 0 100 100"
              fill="none"
              stroke="#760D16"
              strokeWidth="1"
              className="absolute right-[-3%] bottom-[6%] size-[clamp(90px,10vw,150px)] overflow-visible"
            >
              <rect x="18" y="18" width="64" height="64" pathLength="1" strokeDasharray="1" vectorEffect="non-scaling-stroke" />
              <rect x="18" y="18" width="64" height="64" pathLength="1" strokeDasharray="1" transform="rotate(45 50 50)" vectorEffect="non-scaling-stroke" />
              <circle cx="50" cy="50" r="14" pathLength="1" strokeDasharray="1" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
