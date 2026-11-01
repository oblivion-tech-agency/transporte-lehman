import { CLIENTS } from "@/lib/site";

function Row({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
      {[...CLIENTS, ...CLIENTS].map((c, i) => (
        <span
          key={i}
          className="flex items-center gap-10 pr-10 font-heading text-[clamp(40px,6.4vw,96px)] leading-[1.05] font-bold tracking-[0.01em] whitespace-nowrap text-ink/40 uppercase transition-colors duration-300 hover:text-ink sm:gap-16 sm:pr-16"
        >
          {c}
          <span className="size-3 bg-amber sm:size-4" />
        </span>
      ))}
    </div>
  );
}

export function Clients() {
  return (
    <section id="clientes" aria-labelledby="clientes-title" className="section-y scroll-mt-16 overflow-hidden bg-night text-ink">
      <div className="wrap">
        <h2 id="clientes-title" className="m-0 font-heading text-[clamp(28px,3vw,40px)] font-bold uppercase" data-reveal="0">
          Confían en nosotros
        </h2>
        <ul className="sr-only">
          {CLIENTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="marquee mt-10 grid gap-2" aria-hidden="true">
        <Row />
        <Row reverse />
      </div>
    </section>
  );
}
