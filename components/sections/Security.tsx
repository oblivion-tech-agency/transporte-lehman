import { delay } from "@/components/ui";

const STATS = [
  { n: 15, prefix: "+", unit: "años", label: "de experiencia en las rutas del sur" },
  { n: 15, prefix: "", unit: "unidades", label: "propias, modelo 2020 en adelante" },
  { n: 28, prefix: "", unit: "pallets", label: "por semirremolque de 14,50 m" },
  { n: 24, prefix: "", unit: "h", label: "de rastreo satelital en cada unidad" },
];

const PROTOCOLS = [
  "Rastreo satelital full en todas las unidades, durante todo el viaje",
  "Protocolos internos estrictos en cada carga y descarga",
  "12 fajas por unidad para asegurar la mercadería",
  "Semirremolques con lona y carga lateral",
  "Choferes propios, honestos, diligentes y comprometidos",
];

export function Security() {
  return (
    <section id="seguridad" aria-labelledby="seguridad-title" className="section-y scroll-mt-16 bg-night-raised text-ink">
      <div className="wrap grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <h2 id="seguridad-title" className="h-display" data-reveal="0">
            Cada carga, <span className="text-brand-sky">bajo control</span>
          </h2>
          <p className="mt-6 mb-0 max-w-[46ch] text-[17px] leading-[1.6] text-ink-dim" data-reveal="120">
            Trabajamos bajo estrictos protocolos para garantizar la integridad de sus bienes, de la carga a
            la entrega.
          </p>
          <ul className="mt-10 mb-0 grid list-none gap-4 p-0" data-reveal="200">
            {PROTOCOLS.map((p, i) => (
              <li key={p} className="flex items-start gap-4 text-[16px] leading-[1.5]">
                <svg viewBox="0 0 24 24" className="mt-0.5 size-5 flex-none" aria-hidden="true">
                  <path
                    d="m5 12.5 4.5 4.5L19 7.5"
                    pathLength={1}
                    fill="none"
                    stroke="var(--color-amber)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="check-path"
                    style={delay(300 + i * 110)}
                  />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-12 self-center sm:gap-x-10 sm:gap-y-16">
          {STATS.map((s, i) => (
            <div key={s.label} data-reveal={i * 90}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="m-0">
                <span className="block font-heading text-[clamp(64px,8vw,124px)] leading-[0.85] font-bold tabular-nums">
                  <span data-count={s.n} data-prefix={s.prefix} data-suffix="">
                    {s.prefix}
                    {s.n}
                  </span>
                  <span className="ml-2 text-[0.32em] text-amber uppercase">{s.unit}</span>
                </span>
                <span aria-hidden="true" className="mt-3 block max-w-[22ch] text-[15px] leading-[1.45] text-ink-dim">
                  {s.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
