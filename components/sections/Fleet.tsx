import Image from "next/image";
import { Corners, SectionLabel } from "@/components/ui";

const PHOTOS = [
  { src: "/img/a.jpg", alt: "Scania Super 420R con semirremolque con lona" },
  { src: "/img/i.jpg", alt: "Scania cargado con pallets en playa de carga" },
  { src: "/img/b.jpg", alt: "Iveco Hi-Way cargando pallets en depósito" },
  { src: "/img/k.jpg", alt: "Scania R410 de noche en playa logística" },
  { src: "/img/c.jpg", alt: "Scania con batea en depósito" },
  { src: "/img/j.jpg", alt: "Scania transportando semirremolques Randon" },
];

export function Fleet() {
  return (
    <section id="flota" className="scroll-mt-26 py-24 sm:scroll-mt-20">
      <SectionLabel>Flota</SectionLabel>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
        <h2 className="h-section">Unidades modernas, 2020 en adelante</h2>
        <p className="m-0 max-w-[44ch] text-[15px] leading-[1.55] text-text/78">
          Scania e Iveco con semirremolques de 14,50 m, conducidos por un equipo de transportistas
          honestos, diligentes y comprometidos.
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-7">
        {PHOTOS.map((p, i) => (
          <figure key={p.src} data-reveal={(i % 3) * 100} className="blueprint m-0 aspect-[4/5]">
            <div className="relative size-full overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1200px) 352px, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-[scale] duration-800 ease-standard hover:scale-[1.07]"
              />
            </div>
            <Corners />
          </figure>
        ))}
      </div>
    </section>
  );
}
