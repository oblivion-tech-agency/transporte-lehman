import Image from "next/image";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#ruta", label: "Ruta" },
  { href: "#flota", label: "Flota" },
  { href: "#clientes", label: "Clientes" },
];

export function Nav() {
  return (
    <nav
      aria-label="Principal"
      className="nav sticky top-0 z-20 flex-wrap gap-y-2 border-b border-divider bg-bg px-[clamp(20px,5vw,72px)] py-2.5"
    >
      <a href="#inicio" className="nav-brand flex items-center">
        <Image
          src="/img/logo.png"
          alt="Transporte Lehman"
          width={1261}
          height={401}
          preload
          sizes="139px"
          className="h-11 w-auto"
        />
      </a>
      {/* On phones the section links drop to their own full-width row under logo + CTA. */}
      <div className="order-last flex w-full justify-between gap-[var(--space-4)] sm:order-none sm:w-auto sm:justify-start">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </div>
      <a
        href="#cotizar"
        className="btn btn-primary border-brand bg-brand text-bg transition-colors duration-150 hover:border-brand-deep hover:bg-brand-deep hover:text-bg"
      >
        Cotizar viaje
      </a>
    </nav>
  );
}
