import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#050916] text-ink-dim">
      <div className="wrap pt-[clamp(72px,12vh,140px)] pb-10">
        <p className="m-0 max-w-[16ch] font-heading text-[clamp(44px,7vw,112px)] leading-[0.9] font-bold text-ink uppercase" data-reveal="0">
          Desde cualquier punto del país hacia todo el <span className="text-brand-sky">Sur Argentino</span>
        </p>
        <a href="#cotizar" className="btn-amber mt-10" data-reveal="120">
          Cotizar un viaje <span className="arrow" aria-hidden="true">→</span>
        </a>
        <div className="mt-[clamp(64px,10vh,120px)] flex flex-wrap items-center justify-between gap-x-10 gap-y-6 text-[14px]">
          <Image
            src="/img/logo.png"
            alt="Transporte Lehman"
            width={1261}
            height={401}
            sizes="139px"
            className="h-11 w-auto brightness-0 invert"
          />
          <span>Matías José Lehman · Titular</span>
          <address className="not-italic">Juan Cousté, Estación Algarrobo · Villarino, Buenos Aires</address>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-x-6 gap-y-2 pt-6 text-[13px] text-muted">
          <span>© 2026 Transporte Lehman</span>
          <span>
            Desarrollado por{" "}
            <a
              href="https://obliviontech.com.ar"
              target="_blank"
              rel="noopener"
              className="font-semibold text-ink no-underline underline-offset-4 hover:text-ink hover:underline"
            >
              Oblivion
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
