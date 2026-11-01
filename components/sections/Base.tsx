import Image from "next/image";
import { Corners, SectionLabel } from "@/components/ui";

export function Base() {
  return (
    <section id="base" className="scroll-mt-26 pb-24 sm:scroll-mt-20">
      <SectionLabel>Nuestra base</SectionLabel>
      <div className="flex flex-wrap items-center gap-x-[clamp(32px,5vw,72px)] gap-y-10">
        <div data-reveal="0" className="flex flex-[1_1_300px] flex-col gap-4">
          <h2 className="h-section">Base operativa en Algarrobo</h2>
          <p className="m-0 max-w-[44ch] text-[16px] leading-[1.55] text-text/80">
            Instalaciones propias sobre la ruta al sur, en Juan Cousté, Estación Algarrobo (Villarino).
            Desde acá coordinamos cada viaje hacia la Patagonia.
          </p>
          <span className="text-[14px] font-semibold text-brand">José Giamberardino y Bahía Blanca</span>
        </div>
        <figure
          data-reveal="150"
          className="blueprint m-0 aspect-[4/3] min-w-0 flex-[1.6_1_min(100%,440px)]"
        >
          <div className="relative size-full overflow-hidden">
            <Image
              src="/img/base.jpg"
              alt="Base operativa de Transporte Lehman en Algarrobo"
              fill
              sizes="(min-width: 1200px) 640px, (min-width: 800px) 60vw, 100vw"
              className="object-cover object-[center_40%] transition-[scale] duration-800 ease-standard hover:scale-[1.05]"
            />
          </div>
          <Corners />
        </figure>
      </div>
    </section>
  );
}
