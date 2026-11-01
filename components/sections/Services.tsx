import Image from "next/image";

const ROWS = [
  {
    img: "/img/b.jpg",
    alt: "Iveco Hi-Way de Transporte Lehman cargando pallets en depósito",
    figure: "28",
    unit: "pallets",
    title: "Carga paletizada",
    body: "Semirremolques de 14,50 m con lona y carga lateral, con capacidad para 28 pallets por viaje.",
  },
  {
    img: "/img/c.jpg",
    alt: "Scania de Transporte Lehman con batea en depósito",
    figure: "12",
    unit: "fajas",
    title: "Carga suelta",
    body: "Cada unidad lleva 12 fajas para asegurar cargas sueltas y voluminosas durante todo el recorrido.",
  },
];

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section-y scroll-mt-16 bg-night text-ink">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="servicios-title" className="h-display" data-reveal="0">
            Lo que movemos
          </h2>
          <p className="m-0 max-w-[44ch] text-[17px] leading-[1.6] text-ink-dim" data-reveal="120">
            Cargas generales desde cualquier punto del país, con equipos preparados para cada tipo de
            mercadería.
          </p>
        </div>

        <div className="mt-16 grid gap-20 lg:mt-24 lg:gap-28">
          {ROWS.map((r, i) => (
            <article
              key={r.title}
              className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 ? "lg:[&>figure]:order-2" : ""}`}
            >
              <figure data-clip className="relative m-0 aspect-[4/3] overflow-hidden">
                <Image
                  src={r.img}
                  alt={r.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </figure>
              <div>
                <p className="m-0 flex items-baseline gap-3 font-heading font-bold uppercase" data-reveal="100">
                  <span className="text-[clamp(88px,11vw,168px)] leading-[0.8] text-amber tabular-nums">
                    {r.figure}
                  </span>
                  <span className="text-[clamp(24px,2.6vw,36px)] text-ink-dim">{r.unit}</span>
                </p>
                <h3 className="mt-6 mb-0 font-heading text-[clamp(30px,3vw,42px)] leading-none font-bold uppercase" data-reveal="180">
                  {r.title}
                </h3>
                <p className="mt-4 mb-0 max-w-[40ch] text-[17px] leading-[1.6] text-ink-dim" data-reveal="240">
                  {r.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
