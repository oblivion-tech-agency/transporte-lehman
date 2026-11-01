export function Bitren() {
  const cell = "flex min-w-0 flex-col gap-2 px-3 py-6 sm:px-5";
  const divider = "border-l border-bg/35";
  const value = "font-heading text-[clamp(36px,4.5vw,56px)] leading-none font-semibold";
  const label = "text-[14px] text-accent-100 hyphens-auto";
  return (
    <section
      aria-labelledby="bitren-title"
      className="animate-drift-14 bg-[length:200%_200%] text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--color-brand-deep) 0%, #1a2f86 45%, var(--color-brand) 100%)",
      }}
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-[clamp(32px,5vw,72px)] gap-y-12 px-[clamp(20px,5vw,72px)] py-[clamp(56px,8vw,96px)]">
        <div className="flex flex-col gap-5">
          <span
            data-reveal="0"
            className="self-start bg-white px-2.5 py-1 text-[13px] font-semibold tracking-[0.08em] text-brand-deep uppercase"
          >
            Próximamente · 2027
          </span>
          <h2
            id="bitren-title"
            data-reveal="100"
            className="m-0 text-[clamp(40px,5.5vw,72px)] leading-none uppercase"
          >
            Incorporamos bitren
          </h2>
          <p className="m-0 max-w-[46ch] text-[17px] leading-[1.55]">
            El año próximo sumamos equipos bitren con tractores 6×4 de última generación, para mover
            más carga por viaje hacia el sur.
          </p>
        </div>
        <div data-reveal="200" className="grid grid-cols-3 border border-white/35 bg-white/6">
          <div className={cell}>
            <span className={value} data-count="75" data-prefix="" data-suffix=" t">
              75 t
            </span>
            <span className={label}>de carga</span>
          </div>
          <div className={`${cell} ${divider}`}>
            <span className={value}>6×4</span>
            <span className={label}>tractores última generación</span>
          </div>
          <div className={`${cell} ${divider}`}>
            <span className={value}>2</span>
            <span className={label}>semirremolques por equipo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
