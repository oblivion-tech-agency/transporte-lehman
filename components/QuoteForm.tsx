"use client";

import { useState, type FormEvent } from "react";
import { CircleCheck } from "@/components/icons";
import { WA_URL } from "@/lib/site";

const TIPOS = ["Paletizada", "Suelta", "Otra"];

function buildMessage(f: Record<string, string>) {
  return [
    "Hola, quiero cotizar un viaje:",
    `Nombre: ${f.nombre}` + (f.empresa ? ` (${f.empresa})` : ""),
    `Teléfono: ${f.telefono}`,
    f.email && `Email: ${f.email}`,
    `Origen: ${f.origen}`,
    `Destino: ${f.destino}`,
    `Tipo de carga: ${f.tipo}`,
    f.peso && `Peso aprox.: ${f.peso} kg`,
    f.pallets && `Pallets: ${f.pallets}`,
    f.fecha && `Fecha estimada: ${f.fecha}`,
    f.detalle && `Detalle: ${f.detalle}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function QuoteForm() {
  // The reveal wrapper outlives both states, so remounting the form never re-hides it.
  return (
    <div data-reveal="100">
      <QuoteFormBody />
    </div>
  );
}

function QuoteFormBody() {
  const [waLink, setWaLink] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const link = `${WA_URL}?text=${encodeURIComponent(buildMessage(f))}`;
    window.open(link, "_blank", "noopener");
    setWaLink(link);
  };

  if (waLink) {
    return (
      <div className="order-form flex flex-col items-start gap-5 bg-paper px-[clamp(24px,4vw,48px)] py-12 text-on-paper" role="status">
        <CircleCheck size={44} stroke="var(--color-brand)" />
        <h3 className="m-0 font-heading text-[36px] leading-none font-bold uppercase">Pedido listo</h3>
        <p className="m-0 max-w-[44ch] text-[16px] leading-[1.55] text-[#4a5068]">
          Abrimos WhatsApp con los datos de tu viaje. Enviá el mensaje y te respondemos a la brevedad.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener"
            className="btn-amber"
          >
            Abrir WhatsApp de nuevo
          </a>
          <button
            type="button"
            className="min-h-[52px] cursor-pointer px-4 font-heading text-[17px] font-semibold tracking-[0.02em] text-brand uppercase hover:underline"
            onClick={() => setWaLink(null)}
          >
            Nueva cotización
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Pedido de cotización"
      className="order-form grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-5 gap-y-[18px] bg-paper p-[clamp(20px,3.4vw,44px)] text-on-paper"
    >
      <div className="col-span-full mb-2 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="m-0 font-heading text-[clamp(26px,2.6vw,34px)] leading-none font-bold uppercase">Orden de carga</h3>
        <span className="text-[13px] text-[#4a5068]">Respuesta por WhatsApp</span>
      </div>
      <div className="field">
        <label htmlFor="q-nombre">Nombre y apellido *</label>
        <input id="q-nombre" name="nombre" className="input" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="q-empresa">Empresa</label>
        <input id="q-empresa" name="empresa" className="input" autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="q-tel">Teléfono *</label>
        <input id="q-tel" name="telefono" type="tel" className="input" autoComplete="tel" required />
      </div>
      <div className="field">
        <label htmlFor="q-mail">Email</label>
        <input id="q-mail" name="email" type="email" className="input" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="q-origen">Origen (ciudad, provincia) *</label>
        <input id="q-origen" name="origen" className="input" placeholder="Ej.: Rosario, Santa Fe" required />
      </div>
      <div className="field">
        <label htmlFor="q-destino">Destino *</label>
        <input
          id="q-destino"
          name="destino"
          className="input"
          placeholder="Ej.: Río Grande, Tierra del Fuego"
          required
        />
      </div>
      <fieldset className="field col-span-full m-0 border-0 p-0">
        <legend className="mb-[5px] block text-[12px]">Tipo de carga</legend>
        <div className="seg flex-wrap">
          {TIPOS.map((t, i) => (
            <label key={t} className="seg-opt">
              <input type="radio" name="tipo" value={t} defaultChecked={i === 0} />
              {t}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="q-peso">Peso aprox. (kg)</label>
        <input id="q-peso" name="peso" className="input" inputMode="numeric" />
      </div>
      <div className="field">
        <label htmlFor="q-pallets">Cantidad de pallets</label>
        <input id="q-pallets" name="pallets" className="input" inputMode="numeric" />
      </div>
      <div className="field">
        <label htmlFor="q-fecha">Fecha estimada de carga</label>
        <input id="q-fecha" name="fecha" type="date" className="input" />
      </div>
      <div className="field col-span-full">
        <label htmlFor="q-detalle">Detalle de la mercadería</label>
        <textarea
          id="q-detalle"
          name="detalle"
          className="input"
          placeholder="Qué se transporta, medidas, condiciones de carga y descarga…"
        />
      </div>
      <div className="col-span-full flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
        <span className="text-[13px] text-[#4a5068]">Al enviar se abre WhatsApp con tu consulta lista.</span>
        <button type="submit" className="btn-amber cursor-pointer border-0">
          Enviar pedido <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
