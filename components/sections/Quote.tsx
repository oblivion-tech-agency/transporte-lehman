import { Instagram, MapPin, MessageCircle } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, WA_URL } from "@/lib/site";

export function Quote() {
  const contact = "flex items-center gap-3 text-ink no-underline transition-colors duration-150 hover:text-amber";
  return (
    <section id="cotizar" aria-labelledby="cotizar-title" className="section-y scroll-mt-16 bg-night-raised text-ink">
      <div className="wrap grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28">
          <h2 id="cotizar-title" className="h-display" data-reveal="0">
            Contanos qué necesitás <span className="text-amber">mover</span>
          </h2>
          <p className="mt-6 mb-0 max-w-[42ch] text-[17px] leading-[1.6] text-ink-dim" data-reveal="120">
            Completá los datos del viaje y te respondemos con la cotización por WhatsApp. Precios
            competitivos, sin vueltas.
          </p>
          <address className="mt-10 flex flex-col gap-4 text-[16px] not-italic" data-reveal="200">
            <a href={WA_URL} target="_blank" rel="noopener" className={contact}>
              <MessageCircle size={20} stroke="var(--color-amber)" />
              {PHONE_DISPLAY}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={contact}>
              <Instagram size={20} stroke="var(--color-amber)" />@{INSTAGRAM_HANDLE}
            </a>
            <div className="flex items-start gap-3 text-ink-dim">
              <MapPin size={20} stroke="var(--color-amber)" className="flex-none" />
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
