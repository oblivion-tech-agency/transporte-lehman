import { Instagram, MapPin, MessageCircle } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionLabel } from "@/components/ui";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, WA_URL } from "@/lib/site";

export function Quote() {
  const contact = "flex items-center gap-3 text-text no-underline hover:text-brand";
  return (
    <section id="cotizar" className="scroll-mt-26 pb-24 sm:scroll-mt-20">
      <SectionLabel>Cotizar un viaje</SectionLabel>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-x-[clamp(32px,5vw,72px)] gap-y-12">
        <div className="flex flex-col gap-5">
          <h2 className="h-section">Contanos qué necesitás mover</h2>
          <p className="m-0 max-w-[44ch] text-[16px] leading-[1.55] text-text/80">
            Completá los datos del viaje y te respondemos con la cotización por WhatsApp. Precios
            competitivos, sin vueltas.
          </p>
          <address className="flex flex-col gap-3.5 pt-2 text-[15px] not-italic">
            <a href={WA_URL} target="_blank" rel="noopener" className={contact}>
              <MessageCircle size={20} stroke="var(--color-brand)" />
              {PHONE_DISPLAY}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={contact}>
              <Instagram size={20} stroke="var(--color-brand)" />@{INSTAGRAM_HANDLE}
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={20} stroke="var(--color-brand)" className="flex-none" />
              <span>
                José Giamberardino y Bahía Blanca
                <br />
                (8136) Juan Cousté, Estación Algarrobo
                <br />
                Villarino, Buenos Aires
              </span>
            </div>
          </address>
        </div>
        <QuoteForm />
      </div>
    </section>
  );
}
