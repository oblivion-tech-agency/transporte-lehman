import { SectionLabel } from "@/components/ui";
import { CLIENTS } from "@/lib/site";

export function Clients() {
  const fade = "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)";
  return (
    <section id="clientes" className="scroll-mt-26 pb-24 sm:scroll-mt-20">
      <SectionLabel>Confían en nosotros</SectionLabel>
      <h2 className="sr-only">Clientes de Transporte Lehman</h2>
      <ul className="sr-only">
        {CLIENTS.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="overflow-hidden bg-brand py-7 text-white"
        style={{ WebkitMaskImage: fade, maskImage: fade }}
      >
        <div className="flex w-max animate-marquee">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-14 pr-14 font-heading text-[clamp(24px,3vw,34px)] font-semibold tracking-[0.04em] whitespace-nowrap uppercase"
            >
              {c}
              <span className="size-2.5 rotate-45 border-[1.5px] border-white/70" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
