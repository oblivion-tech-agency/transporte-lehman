import Image from "next/image";
import { HeroTracker } from "@/components/HeroTracker";
import { MessageCircle } from "@/components/icons";
import { delay } from "@/components/ui";
import { WA_URL } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="inicio"
      data-progress
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-ink"
    >
      <div className="hero-photo" aria-hidden="true">
        <div className="hero-photo-track">
          <Image
            src="/img/g.jpg"
            alt=""
            fill
            preload
            sizes="(min-width: 1024px) 62vw, 100vw"
            className="hero-photo-img object-cover object-[50%_40%]"
          />
        </div>
        <div className="hero-shade" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 flex-col px-[clamp(20px,5vw,72px)] pt-[46svh] pb-8 lg:justify-center lg:pt-32">
        <div className="max-w-[44rem]">
          <h1 className="m-0 font-heading font-bold tracking-[-0.01em] uppercase">
            <span className="mline text-[clamp(20px,2.3vw,32px)] leading-[1.15] font-semibold tracking-[0.01em] text-ink-dim">
              <span style={delay(150)}>Desde cualquier punto del país</span>
            </span>
            <span className="mline mt-2 text-[clamp(46px,6.8vw,116px)] leading-[0.9]">
              <span style={delay(260)}>hacia todo el</span>
            </span>
            <span className="mline text-[clamp(46px,6.8vw,116px)] leading-[0.9] text-brand-sky">
              <span style={delay(360)}>Sur Argentino</span>
            </span>
          </h1>
          <p
            className="fade-up mt-7 mb-0 max-w-[46ch] text-[17px] leading-[1.6] text-ink-dim sm:text-[18px]"
            style={delay(620)}
          >
            Más de 15 años en las rutas de la Patagonia. Flota propia modelo 2020 en adelante, rastreo
            satelital en cada unidad y choferes de confianza.
          </p>
          <div className="fade-up mt-9 flex flex-wrap gap-3" style={delay(760)}>
            <a href="#cotizar" className="btn-amber">
              Cotizar un viaje <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href={WA_URL} target="_blank" rel="noopener" className="btn-line">
              <MessageCircle size={18} />
              291 412-0638
            </a>
          </div>
        </div>
      </div>

      <HeroTracker />
    </section>
  );
}
