import Image from "next/image";

const SPECS = [
  { value: "75 t", label: "de carga por equipo" },
  { value: "6×4", label: "tractores de última generación" },
  { value: "2", label: "semirremolques por equipo" },
];

export function Bitren() {
  return (
    <section data-progress="sticky" aria-labelledby="bitren-title" className="bitren relative bg-night text-white">
      <div className="bitren-sticky">
        <div className="bitren-frame">
          <Image
            src="/img/l.jpg"
            alt="Scania R410 de Transporte Lehman en ruta patagónica al atardecer"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* taste-skill-ignore: neutral scrim over the photo */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,12,31,0.92)_0%,rgba(7,12,31,0.35)_55%,rgba(7,12,31,0.15)_100%)]" />
        </div>
        <div className="bitren-copy wrap relative flex h-full flex-col justify-end pb-[clamp(40px,8vh,96px)]">
          <span className="self-start bg-amber px-3 py-1.5 font-heading text-[15px] font-bold tracking-[0.06em] text-on-amber uppercase">
            Próximamente · 2027
          </span>
          <h2 id="bitren-title" className="h-display mt-5 text-[clamp(52px,8vw,132px)]!">
            Incorporamos bitren
          </h2>
          <p className="mt-5 mb-0 max-w-[48ch] text-[18px] leading-[1.55] text-white/85">
            El año próximo sumamos equipos bitren con tractores 6×4 de última generación, para mover más
            carga por viaje hacia el sur.
          </p>
          <dl className="mt-10 mb-0 grid max-w-[720px] grid-cols-3 gap-6">
            {SPECS.map((s) => (
              <div key={s.value}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="m-0">
                  <span className="block font-heading text-[clamp(36px,5vw,72px)] leading-none font-bold">{s.value}</span>
                  <span aria-hidden="true" className="mt-2 block text-[14px] leading-[1.4] text-white/70">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
