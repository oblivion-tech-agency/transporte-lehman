import Image from "next/image";
import { MessageCircle } from "@/components/icons";
import { Corners, delay } from "@/components/ui";
import { WA_URL } from "@/lib/site";

const WORDS = ["Desde", "cualquier", "punto", "del", "país", "hacia", "todo", "el", "Sur", "Argentino"];
const HIGHLIGHT = new Set(["Sur", "Argentino"]);
const MARK = "rgba(255,255,255,0.7)";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative animate-drift-16 overflow-hidden bg-[length:220%_220%] text-white"
      style={{
        backgroundImage:
          "linear-gradient(115deg, var(--color-brand-deep) 0%, var(--color-brand) 50%, var(--color-brand-deep) 100%)",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-x-[clamp(32px,5vw,72px)] gap-y-12 px-[clamp(20px,5vw,72px)] pt-[clamp(56px,8vw,104px)] pb-[clamp(72px,9vw,120px)]">
        <div className="flex flex-col gap-7">
          <span className="rise text-[13px] font-semibold tracking-[0.08em] text-accent-200 uppercase">
            Transporte de cargas generales · Algarrobo, Buenos Aires
          </span>
          <h1 className="m-0 text-[clamp(44px,6.4vw,84px)] leading-[1.02] tracking-[0.01em] uppercase">
            {WORDS.map((w, i) => (
              <span key={w}>
                <span
                  className={`word${HIGHLIGHT.has(w) ? " text-brand-sky" : ""}`}
                  style={delay(100 + i * 60)}
                >
                  {w}
                </span>
                {i < WORDS.length - 1 ? " " : null}
              </span>
            ))}
          </h1>
          <p className="rise m-0 max-w-[52ch] text-[17px] leading-[1.55] text-white/88" style={delay(500)}>
            Más de 15 años en las rutas de la Patagonia. Nuestro fuerte es el corredor Buenos Aires –
            Tierra del Fuego, con flota propia, rastreo satelital y choferes de confianza.
          </p>
          <div className="rise flex flex-wrap gap-3" style={delay(650)}>
            <a
              href="#cotizar"
              className="btn btn-primary blueprint border-white bg-white px-[22px] py-3 text-[15px] font-semibold text-brand-deep transition-[translate,background-color] duration-150 hover:-translate-y-0.5 hover:bg-accent-100 hover:text-brand-deep"
            >
              <Corners color={MARK} />
              Pedir cotización
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener"
              className="btn btn-secondary border-white/50 px-[22px] py-3 text-[15px] text-white transition-colors duration-150 hover:bg-white/12 hover:text-white"
            >
              <MessageCircle size={18} />
              WhatsApp 291 412-0638
            </a>
          </div>
        </div>
        <figure
          className="rise blueprint m-0 aspect-[4/3] border-white/35 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]"
          style={delay(300)}
        >
          <Image
            src="/img/l.jpg"
            alt="Scania R410 de Transporte Lehman en ruta patagónica al atardecer"
            fill
            preload
            sizes="(min-width: 1200px) 540px, (min-width: 1000px) 45vw, 100vw"
            className="object-cover"
          />
          <Corners color={MARK} />
        </figure>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-7 h-[3px] animate-road bg-[length:96px_3px]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.55) 0 48px, transparent 48px 96px)",
        }}
      />
    </section>
  );
}
