import { Corners } from "@/components/ui";

const STATS = [
  { n: 15, prefix: "+", suffix: " años", label: "de experiencia en el mercado" },
  { n: 15, prefix: "", suffix: " unidades", label: "modelo 2020 en adelante" },
  { n: 28, prefix: "", suffix: " pallets", label: "por semirremolque de 14,50 m con lona" },
  { n: 24, prefix: "", suffix: " h", label: "rastreo satelital full en cada unidad" },
];

export function CompanyStats() {
  return (
    <section data-reveal="0" aria-label="Ficha de la empresa" className="blueprint mt-[72px] mb-24">
      <Corners />
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-divider px-6 py-3 text-[13px] font-semibold tracking-[0.08em] uppercase">
        <span>Ficha de la empresa</span>
        <span className="text-text/70">Transporte Lehman · Villarino, Bs. As.</span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px bg-divider">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col gap-1.5 bg-bg p-6">
            <span aria-hidden="true" className="text-[13px] font-semibold tracking-[0.08em] text-brand">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="font-heading text-[44px] leading-none font-semibold text-brand"
              data-count={s.n}
              data-prefix={s.prefix}
              data-suffix={s.suffix}
            >
              {s.prefix}
              {s.n}
              {s.suffix}
            </span>
            <span className="text-[14px] text-text/75">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
