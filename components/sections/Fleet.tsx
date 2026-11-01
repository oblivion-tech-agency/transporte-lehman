import Image from "next/image";

type Photo = { src: string; alt: string; caption: string };

const COLUMNS: { k: string; className: string; photos: Photo[] }[] = [
  {
    k: "60px",
    className: "",
    photos: [
      { src: "/img/a.jpg", alt: "Scania Super 420R con semirremolque con lona", caption: "Scania Super 420R" },
      { src: "/img/k.jpg", alt: "Scania R410 de noche en playa logística", caption: "Scania R410" },
    ],
  },
  {
    k: "-160px",
    className: "mt-16 lg:mt-28",
    photos: [
      { src: "/img/i.jpg", alt: "Scania cargado con pallets en playa de carga", caption: "Carga paletizada" },
      { src: "/img/d.jpg", alt: "Iveco Hi-Way de Transporte Lehman en ruta nevada del sur", caption: "Iveco Hi-Way · Patagonia" },
    ],
  },
  {
    k: "20px",
    className: "hidden lg:grid lg:mt-10",
    photos: [
      { src: "/img/j.jpg", alt: "Scania transportando semirremolques Randon", caption: "Traslado de semirremolques" },
      { src: "/img/b.jpg", alt: "Iveco Hi-Way cargando pallets en depósito", caption: "Iveco Hi-Way" },
    ],
  },
];

export function Fleet() {
  return (
    <section id="flota" data-progress="view" aria-labelledby="flota-title" className="section-y scroll-mt-16 overflow-hidden bg-night text-ink">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <h2 id="flota-title" className="h-display" data-reveal="0">
            Unidades modernas, <span className="text-brand-sky">2020 en adelante</span>
          </h2>
          <p className="m-0 max-w-[44ch] text-[17px] leading-[1.6] text-ink-dim" data-reveal="120">
            Scania e Iveco con semirremolques de 14,50 m, conducidos por un equipo de transportistas
            honestos, diligentes y comprometidos.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-3 lg:gap-8">
          {COLUMNS.map((col, ci) => (
            <div
              key={ci}
              className={`fleet-col grid content-start gap-4 sm:gap-6 lg:gap-8 ${col.className}`}
              style={{ "--k": col.k } as React.CSSProperties}
            >
              {col.photos.map((p) => (
                <figure key={p.src} data-clip className="group relative m-0 aspect-[4/5] overflow-hidden">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    className="object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(7,12,31,0.85),transparent)] px-4 pt-10 pb-3 font-heading text-[16px] font-semibold tracking-[0.03em] text-ink uppercase sm:text-[18px]">
                    {p.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
