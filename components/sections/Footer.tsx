import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-brand-deep text-white/80">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-8 gap-y-4 px-[clamp(20px,5vw,72px)] pt-10 pb-6 text-[13px]">
        <Image
          src="/img/logo.png"
          alt="Transporte Lehman"
          width={1261}
          height={401}
          sizes="126px"
          className="h-10 w-auto brightness-0 invert"
        />
        <span>Matías José Lehman · Titular</span>
        <address className="not-italic">Juan Cousté, Estación Algarrobo · Villarino, Buenos Aires</address>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/15 px-[clamp(20px,5vw,72px)] pt-4 pb-7 text-[12px] text-white/65">
        <span>© 2026 Transporte Lehman</span>
        <span>
          Desarrollado por{" "}
          <a
            href="https://obliviontech.com.ar"
            target="_blank"
            rel="noopener"
            className="border-b border-white/40 font-semibold text-white no-underline hover:border-white hover:text-white"
          >
            Oblivion
          </a>
        </span>
      </div>
    </footer>
  );
}
