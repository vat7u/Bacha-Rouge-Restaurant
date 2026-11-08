import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { words } from "@/components/ui/split";

// Copy comes from docs/bacha-rouge-five-experiences.md. Photos are placeholders until the final ones arrive.
const CHAPTERS = [
  {
    label: "I The Moroccan Table",
    title: "The Moroccan Table",
    subtitle: "Flavours rooted in tradition",
    text: "Discover the authentic soul of Moroccan cuisine through fragrant tagines, carefully prepared couscous and traditional specialties. From chicken with preserved lemon to slow-cooked lamb shank and Marrakech Tanjia, every dish brings the richness of Moroccan culinary heritage to your table.",
    src: "/assets/ta/moroccan-table.webp",
    alt: "A carved wooden table set with two tagines, a glass of milk and a glass of red drink on a red herringbone floor",
  },
  {
    label: "II Beldi, Reimagined",
    title: "Beldi, Reimagined",
    subtitle: "Tradition meets creativity",
    text: "A contemporary expression of Moroccan inspiration. Explore a selection of refined creations, from filet mignon with carob sauce and sea bream with regional herbs to our signature Bacha Mrouzia Burger. Familiar flavours take on unexpected forms.",
    src: "/assets/ta/03.jpg",
    alt: "Beldi, Reimagined",
  },
  {
    label: "III Sweet Moments",
    title: "Sweet Moments",
    subtitle: "An indulgence worth remembering",
    text: "Let the evening unfold with delicate desserts and signature refreshments. Discover our San Sebastián cheesecake, amlou and almond fondant, saffron crème brûlée and Jawhara, accompanied by colourful mocktails and freshly prepared juices.",
    src: "/assets/ta/13.jpg",
    alt: "Sweet Moments",
  },
  {
    label: "IV The Red Room",
    title: "The Red Room",
    subtitle: "Where atmosphere becomes an experience",
    text: "Step into a world of deep red velvet, golden lighting and distinctive details. Surrounded by elegant décor and an intimate atmosphere, the Red Room is a place for meaningful conversations, shared moments and evenings worth remembering.",
    src: "/assets/ta/12.jpg",
    alt: "The Red Room",
  },
  {
    label: "V Above the Blue",
    title: "Above the Blue",
    subtitle: "A different perspective of Chefchaouen",
    text: "Rise above the everyday and discover our blue rooftop, where the surrounding mountains create a breathtaking backdrop. With open skies, beautiful views and a more relaxed atmosphere, it is the perfect setting to pause, unwind and enjoy the beauty of the Blue Pearl.",
    src: "/assets/ta/05.jpg",
    alt: "Above the Blue",
  },
];

const PHOTO_SIZES = "(max-width: 760px) 90vw, 36vw";

export function Experience() {
  return (
    <section id="experience" data-exp="" className="relative h-[520vh] bg-ink">
      <div className="exp-stage sticky top-0 h-screen overflow-clip grid grid-rows-[auto_minmax(0,1fr)] gap-[3vh] px-[6vw] pt-[clamp(56px,8vh,96px)] pb-[4vh]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="flex flex-col gap-3.5">
            <Eyebrow numeral="II" label="Bacha Rouge" tone="gold" />
            <h2
              data-split=""
              className="m-0 font-serif font-normal text-[clamp(30px,3.8vw,60px)] leading-none uppercase"
            >
              {words("The five experiences")}
            </h2>
          </div>
          <div className="flex flex-col gap-3 grow basis-[420px] max-w-[640px]">
            <div className="flex flex-wrap gap-x-[22px] gap-y-2 text-[11px] tracking-[.24em] uppercase">
              {CHAPTERS.map((c, i) => (
                <span key={c.label} data-exp-label="" style={{ opacity: i === 0 ? 1 : 0.4 }}>
                  {c.label}
                </span>
              ))}
            </div>
            <div className="h-px bg-ivory/18">
              <div data-exp-progress="" className="h-px bg-gold origin-[0%_50%]" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-[10vw] gap-y-[3vh] min-h-0">
          <div className="relative h-[min(64vh,70vw)] aspect-[1.1]">
            {/* Arched gilt frame: two nested borders and a keystone, drawn bottom-up as the scene starts. */}
            <div
              data-exp-frame=""
              className="absolute -inset-[18px] rounded-t-[999px] border border-gold/60 pointer-events-none"
            />
            <div
              data-exp-frame=""
              className="absolute -inset-[9px] rounded-t-[999px] border-2 border-gold shadow-[0_0_48px_rgba(185,150,85,.2),inset_0_0_18px_rgba(0,0,0,.45)] pointer-events-none"
            />
            <div
              data-exp-gem=""
              className="absolute inset-x-0 -top-[24px] z-[3] flex justify-center pointer-events-none"
            >
              <span className="block size-[11px] rotate-45 bg-gold ring-[5px] ring-ink" />
            </div>

            <div className="absolute inset-0 rounded-t-[999px] overflow-hidden bg-velvet">
              {CHAPTERS.map((c) => (
                <div key={c.src} data-exp-layer="" className="absolute inset-0 overflow-hidden">
                  <div data-exp-img="" className="absolute inset-0">
                    <Photo src={c.src} alt={c.alt} sizes={PHOTO_SIZES} />
                  </div>
                </div>
              ))}
            </div>
            <div
              data-exp-mask=""
              className="frame-border [--fw:16px] absolute right-[-21%] top-[8%] w-[38%] aspect-[0.78] z-[2] overflow-hidden shadow-[0_30px_50px_rgba(0,0,0,.45)]"
            >
              <Photo src="/assets/ta/11.jpg" alt="Framed detail" sizes="(max-width: 760px) 25vw, 15vw" />
            </div>
          </div>

          <div className="relative w-[min(100%,420px)] h-[clamp(260px,40vh,360px)]">
            {CHAPTERS.map((c, i) => (
              <div
                key={c.title}
                data-exp-cap=""
                className="absolute inset-0 flex flex-col gap-3"
                style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
              >
                <div className="font-script text-[clamp(36px,3.4vw,52px)] text-gold leading-none">{c.title}</div>
                <div className="text-[11px] tracking-[.26em] uppercase text-ivory/70">{c.subtitle}</div>
                <p className="m-0 text-[15px] leading-[1.7] font-light text-pretty">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
