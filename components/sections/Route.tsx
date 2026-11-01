import Image from "next/image";
import { Truck } from "@/components/icons";
import { Corners, SectionLabel } from "@/components/ui";
import { STOPS } from "@/lib/site";

export function Route() {
  return (
    <section
      id="ruta"
      className="grid scroll-mt-26 grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-[clamp(32px,5vw,72px)] gap-y-12 pb-24 sm:scroll-mt-20"
    >
      <div>
        <SectionLabel>Cobertura</SectionLabel>
        <h2 className="h-section mb-4">Buenos Aires – Tierra del Fuego</h2>
        <p className="mb-8 max-w-[50ch] text-[16px] leading-[1.55] text-text/80">
          Cargamos en cualquier punto del país y llegamos a cada rincón de la Patagonia. Este es el
          recorrido que hacemos todas las semanas.
        </p>
        <div aria-hidden="true" className="relative mx-3.5 mb-5 h-10">
          <div
            className="absolute inset-x-0 top-[30px] h-0.5 bg-[length:18px_2px]"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--color-brand) 0 10px, transparent 10px 18px)",
            }}
          />
          <div className="absolute top-[26px] -left-[5px] size-2.5 bg-brand" />
          <div className="absolute top-[26px] -right-[5px] size-2.5 animate-pulse-dot bg-brand-bright" />
          <div className="absolute top-0 left-0 animate-truck">
            <div className="-translate-x-1/2 text-brand">
              <Truck size={30} />
            </div>
          </div>
        </div>
        <ol className="m-0 list-none border-t border-divider p-0">
          {STOPS.map((s, i) => (
            <li
              key={s.name}
              data-reveal={i * 70}
              className="grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-4 border-b border-text/10 py-3"
            >
              <span
                aria-hidden="true"
                className={`size-[11px] justify-self-center border-[1.5px] border-brand ${s.filled ? "bg-brand" : "bg-transparent"}`}
              />
              <span className="flex flex-col">
                <span className="font-heading text-[20px] font-semibold tracking-[0.02em] uppercase">{s.name}</span>
                <span className="text-[13px] text-text/70">{s.prov}</span>
              </span>
              <span className="text-[14px] font-semibold text-brand tabular-nums">{s.km}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 mb-0 text-[12px] text-text/65">Distancias aproximadas por ruta desde Buenos Aires.</p>
      </div>
      <figure data-reveal="150" className="blueprint m-0 aspect-square">
        <Image
          src="/img/d.jpg"
          alt="Iveco Hi-Way de Transporte Lehman en ruta nevada del sur"
          fill
          sizes="(min-width: 1200px) 520px, (min-width: 1000px) 45vw, 100vw"
          className="object-cover"
        />
        <Corners />
      </figure>
    </section>
  );
}
