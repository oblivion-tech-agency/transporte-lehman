import Image from "next/image";

const LINKS = [
  { href: "#ruta", label: "Corredor" },
  { href: "#servicios", label: "Servicios" },
  { href: "#flota", label: "Flota" },
  { href: "#clientes", label: "Clientes" },
];

export function Nav() {
  return (
    // taste-skill-ignore: sticky bar, its border only shows once scrolled
    <nav
      aria-label="Principal"
      className="site-nav fixed inset-x-0 top-0 z-40 flex flex-wrap items-center gap-x-8 gap-y-2 border-b border-transparent px-[clamp(20px,5vw,72px)] py-3 text-ink"
    >
      <a href="#inicio" className="mr-auto flex items-center">
        <Image
          src="/img/logo.png"
          alt="Transporte Lehman"
          width={1261}
          height={401}
          preload
          sizes="139px"
          className="h-10 w-auto brightness-0 invert sm:h-11"
        />
      </a>
      {/* On phones the section links drop to their own full-width row under logo + CTA. */}
      <div className="order-last flex w-full justify-between gap-6 sm:order-none sm:w-auto sm:justify-start">
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[14px] font-medium text-ink-dim no-underline transition-colors duration-150 hover:text-ink"
          >
            {l.label}
          </a>
        ))}
      </div>
      <a href="#cotizar" className="btn-amber min-h-10! px-4! text-[15px]!">
        Cotizar viaje
      </a>
    </nav>
  );
}
