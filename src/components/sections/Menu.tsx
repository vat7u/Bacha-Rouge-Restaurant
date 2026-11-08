import { Eyebrow } from "@/components/ui/Eyebrow";
import { words } from "@/components/ui/split";

type Dish = { name: string; price: string; description: string };

// Placeholder entries until the printed menu is transcribed.
const PLACEHOLDER: Dish = { name: "Nom du plat", price: "— MAD", description: "[Description from the printed menu]" };

const COURSES: { title: string; dishes: Dish[] }[] = [
  { title: "ENTRÉES", dishes: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER] },
  { title: "TAJINES", dishes: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER] },
  { title: "DOUCEURS", dishes: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER] },
];

function FrameRect({ className, stroke }: { className: string; stroke: string }) {
  return (
    <svg
      data-draw=""
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      fill="none"
      stroke={stroke}
      className={`absolute overflow-visible pointer-events-none ${className}`}
    >
      <rect x="0" y="0" width="100" height="100" pathLength="1" strokeDasharray="1" vectorEffect="non-scaling-stroke" strokeWidth="1" />
    </svg>
  );
}

export function Menu() {
  return (
    <section id="carte" className="relative bg-ink">
      <div data-arch-panel="" className="bg-ivory text-ink py-[clamp(90px,11vw,160px)] px-[5vw]">
        <div className="relative box-content max-w-[1180px] mx-auto py-[clamp(56px,7vw,110px)] px-[clamp(24px,5vw,90px)]">
          <FrameRect stroke="#760D16" className="inset-0 w-full h-full" />
          <FrameRect stroke="#B99655" className="left-2.5 top-2.5 w-[calc(100%-20px)] h-[calc(100%-20px)]" />

          <div className="flex flex-col items-center gap-3.5 text-center">
            <Eyebrow numeral="IV" label="Menu" tone="wine" />
            <h2
              data-split=""
              className="m-0 font-serif font-normal text-[clamp(56px,9vw,150px)] leading-[.9] text-wine tracking-[.02em]"
            >
              {words("LA CARTE")}
            </h2>
            <svg data-draw="" viewBox="0 0 240 20" fill="none" stroke="#B99655" className="w-[240px] h-5 max-w-full">
              <path d="M0 10 H100" pathLength="1" strokeDasharray="1" />
              <path d="M120 2 L128 10 L120 18 L112 10 Z" pathLength="1" strokeDasharray="1" />
              <path d="M140 10 H240" pathLength="1" strokeDasharray="1" />
            </svg>
            <p className="m-0 text-[12px] tracking-[.08em] text-[#6b4a4c] italic">
              Placeholder entries — to be replaced with items and prices from the printed menu.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-x-[clamp(32px,4vw,64px)] gap-y-14 mt-[clamp(48px,6vw,84px)]">
            {COURSES.map((course) => (
              <div key={course.title} data-stagger="" className="flex flex-col gap-[26px]">
                <h3
                  data-item=""
                  className="m-0 font-serif font-medium text-[18px] tracking-[.3em] text-wine pb-3.5 border-b border-wine/30"
                >
                  {course.title}
                </h3>
                {course.dishes.map((dish, i) => (
                  <div key={i} data-item="" className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-script text-[32px] text-wine leading-[1.1]">{dish.name}</span>
                      <span className="flex-1 border-b border-dotted border-wine/40" />
                      <span className="font-serif text-[16px] text-ink">{dish.price}</span>
                    </div>
                    <span className="text-[13px] leading-[1.55] text-[#4a3436] font-light">{dish.description}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
