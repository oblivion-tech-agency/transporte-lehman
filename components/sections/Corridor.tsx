"use client";

import { useEffect, useRef, useState } from "react";
import {
  CONTEXT_PATHS,
  LAND_PATHS,
  MAP_H,
  MAP_W,
  ROUTE_PATH,
  STOP_FRAC,
  STOP_XY,
  formatCoords,
  pointAt,
} from "@/lib/geo";
import { STOPS } from "@/lib/site";

const fmt = (n: number) => Math.round(n).toLocaleString("es-AR");
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Route fraction → km from Buenos Aires, interpolated between stops. */
function kmAt(t: number) {
  let i = 0;
  while (i < STOP_FRAC.length - 2 && STOP_FRAC[i + 1] <= t) i++;
  const k = clamp01((t - STOP_FRAC[i]) / (STOP_FRAC[i + 1] - STOP_FRAC[i]));
  return STOPS[i].kmN + (STOPS[i + 1].kmN - STOPS[i].kmN) * k;
}

function activeAt(t: number) {
  let i = 0;
  while (i < STOP_FRAC.length - 1 && STOP_FRAC[i + 1] <= t + 0.004) i++;
  return i;
}

// Server render shows the finished route: readable with no JS or reduced motion.
const END = pointAt(1);

export function Corridor() {
  const sectionRef = useRef<HTMLElement>(null);
  const drawnRef = useRef<SVGPathElement>(null);
  const truckRef = useRef<SVGGElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stopRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  const [active, setActive] = useState(STOPS.length - 1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 0;
    let value = 0;
    let raf = 0;
    let last = 0;
    let shownActive = -1;

    const read = () => {
      const r = section.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, r.height - innerHeight));
      target = clamp01((p - 0.05) / 0.85);
    };

    const paint = (t: number) => {
      const pt = pointAt(t);
      drawnRef.current?.style.setProperty("stroke-dashoffset", String(1 - t));
      truckRef.current?.setAttribute(
        "transform",
        `translate(${pt.x.toFixed(2)} ${pt.y.toFixed(2)}) rotate(${pt.angle.toFixed(1)})`,
      );
      if (kmRef.current) kmRef.current.textContent = fmt(kmAt(t));
      if (coordsRef.current) coordsRef.current.textContent = formatCoords(pt.x, pt.y);
      if (barRef.current) barRef.current.style.transform = `scaleX(${t})`;
      section.style.setProperty("--snow", clamp01((t - 0.6) / 0.12).toFixed(3));
      STOP_FRAC.forEach((f, i) => {
        const passed = t + 0.004 >= f;
        stopRefs.current[i]?.toggleAttribute("data-passed", passed);
        labelRefs.current[i]?.toggleAttribute("data-passed", passed);
      });
      const a = activeAt(t);
      if (a !== shownActive) setActive((shownActive = a));
    };

    // Exponential smoothing so the truck glides instead of jumping with the wheel.
    const tick = (now: number) => {
      const dt = last ? Math.min(0.1, (now - last) / 1000) : 0.016;
      last = now;
      value += (target - value) * (1 - Math.pow(0.0015, dt));
      if (Math.abs(target - value) < 0.0004) value = target;
      paint(value);
      raf = value === target ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      read();
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    read();
    value = target;
    paint(value);
    addEventListener("scroll", kick, { passive: true });
    addEventListener("resize", kick, { passive: true });
    return () => {
      removeEventListener("scroll", kick);
      removeEventListener("resize", kick);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} id="ruta" aria-labelledby="ruta-title" className="corridor relative bg-night text-ink">
      <div className="corridor-sticky overflow-hidden">
        <div className="mx-auto grid h-full max-w-[1320px] grid-rows-[minmax(0,1fr)_auto] gap-4 px-[clamp(20px,5vw,72px)] pt-28 pb-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:grid-rows-1 lg:items-center lg:gap-16 lg:pt-20 lg:pb-10">
          {/* Copy + live stop */}
          <div className="order-2 flex min-h-0 flex-col lg:order-1">
            <h2
              id="ruta-title"
              className="m-0 hidden font-heading text-[clamp(38px,4vw,60px)] leading-[0.95] font-bold uppercase lg:block"
            >
              Buenos Aires – Tierra del Fuego.
              <span className="block text-ink-dim">Todas las semanas.</span>
            </h2>
            <p className="mt-5 mb-0 hidden max-w-[46ch] text-[17px] leading-[1.6] text-ink-dim lg:block">
              Cargamos en cualquier punto del país y llegamos a cada rincón de la Patagonia por la Ruta 3.
              Bajá y recorré el corredor.
            </p>

            <div className="pt-2 lg:mt-12">
              <div className="flex items-end justify-between gap-4">
                {/* Hidden stops share the same grid cell so wrapping never resizes the map. */}
                <div className="grid min-w-0" aria-live="polite">
                  {STOPS.map((stop, i) => (
                    <div
                      key={stop.name}
                      aria-hidden={i !== active}
                      className={`col-start-1 row-start-1 flex min-w-0 flex-col justify-end ${i === active ? "" : "invisible"}`}
                    >
                      <span className="font-heading text-[clamp(34px,4vw,56px)] leading-[0.95] font-bold uppercase">
                        {stop.name}
                      </span>
                      <span className="mt-1 block text-[14px] text-muted">{stop.prov}</span>
                    </div>
                  ))}
                </div>
                <div className="shrink-0 text-right font-heading">
                  <div className="grid text-[clamp(30px,3.2vw,44px)] leading-none font-bold text-amber tabular-nums">
                    <span className="invisible col-start-1 row-start-1" aria-hidden="true">
                      {fmt(STOPS[STOPS.length - 1].kmN)}
                      <span className="text-[0.55em]"> km</span>
                    </span>
                    <span className="col-start-1 row-start-1">
                      <span ref={kmRef}>{fmt(STOPS[STOPS.length - 1].kmN)}</span>
                      <span className="text-[0.55em] text-ink-dim"> km</span>
                    </span>
                  </div>
                  <span className="mt-1.5 block font-body text-[12px] text-muted">desde Buenos Aires</span>
                </div>
              </div>
              <div className="mt-4 grid max-w-[48ch] text-[16px] leading-[1.55] text-ink-dim" aria-live="polite">
                {STOPS.map((stop, i) => (
                  <p
                    key={stop.name}
                    aria-hidden={i !== active}
                    className={`col-start-1 row-start-1 m-0 ${i === active ? "" : "invisible"}`}
                  >
                    {stop.note}
                  </p>
                ))}
              </div>
              <div className="mt-5 h-0.5 bg-night-line">
                <div ref={barRef} className="h-full origin-left bg-amber" />
              </div>
            </div>

            <ol className="mt-6 hidden list-none grid-cols-2 gap-x-8 gap-y-1.5 p-0 text-muted lg:grid">
              {STOPS.map((s, i) => (
                <li
                  key={s.name}
                  data-state={i < active ? "passed" : i === active ? "active" : "upcoming"}
                  className="stop-row flex items-center justify-between gap-3 text-[14px]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="stop-dot size-2 border border-muted" aria-hidden="true" />
                    {s.name}
                  </span>
                  <span className="text-[13px] tabular-nums">{s.km.replace("≈ ", "")}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Map */}
          <div data-ui className="relative order-1 min-h-0 lg:order-2 lg:h-full lg:max-h-[86svh]">
            <h2 className="m-0 font-heading text-[30px] leading-none font-bold uppercase lg:hidden">
              Bs. As. – Tierra del Fuego
            </h2>
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="mx-auto mt-3 block h-[calc(100%-42px)] w-auto max-w-full lg:mt-0 lg:h-full"
              role="img"
              aria-label="Mapa del corredor por Ruta 3: Buenos Aires, Algarrobo, Viedma, Puerto Madryn, Comodoro Rivadavia, Río Gallegos, Río Grande y Ushuaia"
            >
              <defs>
                <pattern id="grid-dots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="0.8" fill="var(--color-night-line)" />
                </pattern>
                <linearGradient id="map-fade" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0" />
                  <stop offset="0.12" stopColor="#fff" stopOpacity="1" />
                </linearGradient>
                <mask id="map-mask">
                  <rect width={MAP_W} height={MAP_H} fill="url(#map-fade)" />
                </mask>
              </defs>
              <rect width={MAP_W} height={MAP_H} fill="url(#grid-dots)" />
              <g mask="url(#map-mask)">
                {CONTEXT_PATHS.map((d) => (
                  <path key={d} d={d} fill="var(--color-night-raised)" opacity="0.45" />
                ))}
                {LAND_PATHS.map((d) => (
                  <path key={d} d={d} fill="var(--color-night-raised)" stroke="#2a3a73" strokeWidth="0.8" />
                ))}
                <path
                  d={ROUTE_PATH}
                  fill="none"
                  stroke="var(--color-muted)"
                  strokeOpacity="0.5"
                  strokeWidth="1.2"
                  strokeDasharray="2 4"
                />
                <path
                  ref={drawnRef}
                  d={ROUTE_PATH}
                  pathLength={1}
                  fill="none"
                  stroke="var(--color-amber)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="1 1"
                  strokeDashoffset="0"
                />
              </g>
              {STOP_XY.map(([x, y], i) => (
                <g key={STOPS[i].name}>
                  <circle
                    ref={(el) => {
                      stopRefs.current[i] = el;
                    }}
                    cx={x}
                    cy={y}
                    r="4"
                    className="map-stop"
                    fill="var(--color-night)"
                    stroke="var(--color-ink-dim)"
                    strokeWidth="1.4"
                    data-passed=""
                  />
                  <text
                    ref={(el) => {
                      labelRefs.current[i] = el;
                    }}
                    x={x + 10}
                    y={y + 4}
                    className="map-label font-mono"
                    fontSize="10.5"
                    fill="var(--color-muted)"
                    data-passed=""
                  >
                    {STOPS[i].short.toUpperCase()}
                  </text>
                </g>
              ))}
              {/* GPS-style heading marker, rotated along the road. */}
              <g ref={truckRef} transform={`translate(${END.x} ${END.y}) rotate(${END.angle})`}>
                <circle r="7" fill="none" stroke="var(--color-amber)" className="map-ring" />
                <circle r="9" fill="var(--color-night)" fillOpacity="0.85" stroke="var(--color-amber)" strokeWidth="1.2" />
                <path d="M6 0-4.5 5.2-2 0-4.5-5.2Z" fill="var(--color-amber)" />
              </g>
            </svg>
            <div className="snow" aria-hidden="true" />
            <span
              ref={coordsRef}
              className="absolute right-0 bottom-0 font-mono text-[11px] text-muted tabular-nums lg:bottom-2"
              aria-hidden="true"
            >
              {formatCoords(END.x, END.y)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
