import type { ComponentType } from "react";
import { MapPin, Menu, Package, ShieldCheck } from "@/components/icons";
import { Corners, SectionLabel } from "@/components/ui";

const SERVICES: { icon: ComponentType<{ size?: number; stroke?: string }>; title: string; body: string }[] = [
  {
    icon: Package,
    title: "Carga paletizada",
    body: "Semirremolques de 14,50 m con lona y carga lateral, con capacidad para 28 pallets.",
  },
  {
    icon: Menu,
    title: "Carga suelta",
    body: "Cada unidad lleva 12 fajas para asegurar cargas sueltas y voluminosas.",
  },
  {
    icon: MapPin,
    title: "Rastreo satelital",
    body: "Todos los equipos cuentan con rastreador satelital full durante todo el viaje.",
  },
  {
    icon: ShieldCheck,
    title: "Protocolos internos",
    body: "Trabajamos bajo estrictos protocolos para garantizar la integridad de sus bienes.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="scroll-mt-26 pb-24 sm:scroll-mt-20">
      <SectionLabel>Servicios</SectionLabel>
      <h2 className="h-section mb-10 max-w-[22ch]">Cargas que llegan a tiempo y en buen estado</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-8">
        {SERVICES.map(({ icon: Icon, title, body }, i) => (
          <article
            key={title}
            data-reveal={i * 90}
            className="blueprint flex flex-col gap-3.5 p-6 transition-[translate,border-color,box-shadow] duration-300 ease-standard hover:-translate-y-1.5 hover:border-brand hover:shadow-md"
          >
            <Corners />
            <div className="flex size-12 items-center justify-center bg-brand">
              <Icon size={28} stroke="#fff" />
            </div>
            <h3 className="m-0 text-[22px] uppercase">{title}</h3>
            <p className="m-0 text-[15px] leading-[1.55] text-text/78">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
