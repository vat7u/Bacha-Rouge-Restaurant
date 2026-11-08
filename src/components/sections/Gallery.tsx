import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { words } from "@/components/ui/split";

type Frame = {
  src: string;
  alt: string;
  caption: string;
  shape: "arch" | "framed";
  size: string;
  sizes: string;
  align?: string;
};

const FRAMES: Frame[] = [
  { src: "/assets/ta/06.jpg", alt: "Service", caption: "The service", shape: "arch", size: "w-[clamp(240px,30vw,500px)] h-[min(58vh,560px)]", sizes: "(max-width: 800px) 290px, 36vw" },
  { src: "/assets/ta/01.jpg", alt: "Dish", caption: "From the kitchen", shape: "framed", size: "w-[clamp(200px,22vw,360px)] h-[min(38vh,380px)]", sizes: "(max-width: 900px) 240px, 26vw", align: "self-end" },
  { src: "/assets/ta/16.jpg", alt: "Terrace", caption: "Terrace at dusk", shape: "framed", size: "w-[clamp(280px,38vw,620px)] h-[min(52vh,520px)]", sizes: "(max-width: 740px) 340px, 46vw" },
  { src: "/assets/ta/21.jpg", alt: "Lanterns", caption: "Lanterns", shape: "arch", size: "w-[clamp(190px,20vw,330px)] h-[min(44vh,440px)]", sizes: "(max-width: 950px) 230px, 24vw", align: "self-start" },
  { src: "/assets/ta/19.jpg", alt: "Couscous", caption: "Couscous", shape: "framed", size: "w-[clamp(240px,28vw,460px)] h-[min(34vh,340px)]", sizes: "(max-width: 860px) 290px, 34vw", align: "self-end" },
  { src: "/assets/ta/18.jpg", alt: "Blue streets", caption: "The blue streets", shape: "arch", size: "w-[clamp(240px,28vw,440px)] h-[min(58vh,560px)]", sizes: "(max-width: 860px) 290px, 34vw" },
  { src: "/assets/ta/10.jpg", alt: "View", caption: "Over Chefchaouen", shape: "framed", size: "w-[clamp(230px,26vw,420px)] h-[min(42vh,420px)]", sizes: "(max-width: 890px) 280px, 32vw" },
];

const SHAPE = {
  arch: "rounded-[999px_999px_0_0]",
  framed: "frame-border [--fw:20px] shadow-[0_30px_60px_rgba(0,0,0,.35)]",
};

export function Gallery() {
  return (
    <section id="galerie" data-gal="" className="relative h-[420vh] bg-chaouen">
      <div className="sticky top-0 h-screen overflow-clip">
        <div className="absolute inset-x-[6vw] top-[clamp(64px,9vh,100px)] z-[2] flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <div className="flex flex-col gap-3">
            <Eyebrow numeral="V" label="Gallery" tone="gold" />
            <h2 data-split="" className="m-0 font-serif font-normal text-[clamp(30px,3.8vw,60px)] leading-none uppercase">
              {words("An evening, in frames")}
            </h2>
          </div>
          <div className="font-script text-[30px] text-gold">la galerie</div>
        </div>

        <div
          data-gal-track=""
          className="absolute inset-y-0 left-0 flex items-center gap-[clamp(28px,3.5vw,60px)] pt-[clamp(150px,20vh,200px)] px-[6vw] pb-[9vh] w-max"
        >
          {FRAMES.map((f, i) => (
            <figure key={f.src} className={`m-0 flex-none flex flex-col gap-3 ${f.align ?? ""}`}>
              <div className={`relative overflow-hidden ${f.size} ${SHAPE[f.shape]}`}>
                <div data-gal-img="" className="absolute inset-y-0 left-[-12%] right-[-12%]">
                  <Photo src={f.src} alt={f.alt} sizes={f.sizes} />
                </div>
              </div>
              <figcaption className="text-[11px] tracking-[.24em] uppercase">
                <span className="text-gold">{String(i + 1).padStart(2, "0")}</span> — {f.caption}
              </figcaption>
            </figure>
          ))}
          <div className="flex-none box-content w-[clamp(280px,34vw,540px)] flex flex-col gap-[18px] pr-[4vw]">
            <div className="font-serif text-[clamp(56px,7vw,120px)] leading-[.9]">COME IN.</div>
            <div className="font-script text-[34px] text-gold">la porte est ouverte</div>
            <a
              href="#reserver"
              className="self-start text-[11px] tracking-[.28em] uppercase py-2 border-b border-gold"
            >
              Reserve a table →
            </a>
          </div>
        </div>

        <div className="absolute inset-x-[6vw] bottom-[calc(22px+3vh)] h-px bg-ivory/20">
          <div data-gal-bar="" className="h-px bg-gold origin-[0%_50%]" />
        </div>
        <div className="gal-checker absolute inset-x-0 bottom-0 h-[22px] opacity-55" />
      </div>
    </section>
  );
}
