import Image from "next/image";

export function Base() {
  return (
    <section
      id="base"
      data-progress="view"
      aria-labelledby="base-title"
      className="relative isolate flex min-h-[86svh] scroll-mt-16 items-end overflow-hidden bg-night text-ink"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/base.jpg"
          alt="Base operativa de Transporte Lehman en Juan Cousté, Estación Algarrobo"
          fill
          sizes="100vw"
          className="base-img object-cover object-[center_40%]"
        />
        {/* taste-skill-ignore: neutral scrim over the photo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-night)_4%,rgba(7,12,31,0.55)_45%,rgba(7,12,31,0.1)_100%)]" />
      </div>
      <div className="wrap pb-[clamp(48px,10vh,120px)]">
        <h2 id="base-title" className="h-display max-w-[14ch]" data-reveal="0">
          Base operativa en Algarrobo
        </h2>
        <div className="mt-6 flex flex-wrap items-end gap-x-14 gap-y-6" data-reveal="120">
          <p className="m-0 max-w-[46ch] text-[17px] leading-[1.6] text-ink-dim">
            Instalaciones propias sobre la ruta al sur, en Juan Cousté, Estación Algarrobo (Villarino). Desde
            acá coordinamos cada viaje hacia la Patagonia.
          </p>
          <p className="m-0 text-[15px] leading-[1.5] text-ink">
            José Giamberardino y Bahía Blanca
            <span className="block text-muted tabular-nums">38°53′S · 63°08′O</span>
          </p>
        </div>
      </div>
    </section>
  );
}
