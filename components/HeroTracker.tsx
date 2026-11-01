"use client";

import { useEffect, useRef } from "react";
import { TruckSide } from "@/components/TruckSide";
import { delay } from "@/components/ui";
import { STOPS } from "@/lib/site";

const TOTAL_KM = STOPS[STOPS.length - 1].kmN;
const fmt = (n: number) => Math.round(n).toLocaleString("es-AR");

type Seg = { from: number; to: number; dur: number; stop: number; moving: boolean };

// One loop of the corridor as a timelapse: travel time ∝ distance, a short stop at each city.
const SEGMENTS: Seg[] = STOPS.flatMap((s, i): Seg[] => {
  const dwell: Seg = { from: s.kmN, to: s.kmN, dur: i === STOPS.length - 1 ? 2400 : 650, stop: i, moving: false };
  if (i === STOPS.length - 1) return [dwell];
  const next = STOPS[i + 1];
  const dur = Math.max(1100, ((next.kmN - s.kmN) / TOTAL_KM) * 15000);
  return [dwell, { from: s.kmN, to: next.kmN, dur, stop: i, moving: true }];
});
const LOOP = SEGMENTS.reduce((a, s) => a + s.dur, 0);
const easeInOut = (k: number) => 0.5 - Math.cos(Math.PI * k) / 2;

export function HeroTracker() {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const truckRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const kmRef = useRef<HTMLSpanElement>(null);
  const legRef = useRef<HTMLSpanElement>(null);
  const cityRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root) return;
    let width = track.clientWidth;
    const ro = new ResizeObserver(() => (width = track.clientWidth));
    ro.observe(track);

    let lastLeg = "";
    let lastMoving = false;
    const apply = (km: number, leg: string, opacity: number, moving = false) => {
      if (moving !== lastMoving) truckRef.current?.toggleAttribute("data-moving", (lastMoving = moving));
      const x = km / TOTAL_KM;
      if (truckRef.current) {
        truckRef.current.style.transform = `translateX(${x * width}px)`;
        truckRef.current.style.opacity = String(opacity);
      }
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${x})`;
      if (kmRef.current) kmRef.current.textContent = fmt(km);
      if (leg !== lastLeg && legRef.current) legRef.current.textContent = lastLeg = leg;
      cityRefs.current.forEach((el, i) => {
        if (!el) return;
        const lit = km >= STOPS[i].kmN;
        if (lit !== el.hasAttribute("data-lit")) el.toggleAttribute("data-lit", lit);
      });
    };

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply(STOPS[3].kmN, `${STOPS[3].name} → ${STOPS[4].name}`, 1);
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = 0;
    let pausedAt = 0;
    const frame = (now: number) => {
      if (!start) start = now;
      let t = (now - start) % LOOP;
      const segIdx = SEGMENTS.findIndex((s) => (t -= s.dur) < 0);
      const seg = SEGMENTS[segIdx];
      const k = (t + seg.dur) / seg.dur;
      const km = seg.moving ? seg.from + (seg.to - seg.from) * easeInOut(k) : seg.from;
      const leg = seg.moving
        ? `${STOPS[seg.stop].name} → ${STOPS[seg.stop + 1].name}`
        : `En ${STOPS[seg.stop].name}`;
      const elapsed = (now - start) % LOOP;
      const opacity = Math.min(1, elapsed / 300, (LOOP - elapsed) / 400);
      apply(km, leg, opacity, seg.moving);
      raf = requestAnimationFrame(frame);
    };

    // Only animate while the hero is on screen.
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !raf) {
        if (pausedAt) start += performance.now() - pausedAt;
        raf = requestAnimationFrame(frame);
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
        pausedAt = performance.now();
      }
    });
    io.observe(root);

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative z-10 mx-auto w-full max-w-[1320px] px-[clamp(20px,5vw,72px)] pb-6">
      <div
        data-ui
        className="tracker fade-up mb-8 w-full max-w-[340px] text-ink-dim lg:absolute lg:right-[clamp(20px,5vw,72px)] lg:bottom-[calc(100%+12px)] lg:mb-0"
        style={delay(1000)}
      >
        <div className="flex items-center justify-between gap-3 border-b border-night-line px-4 py-2.5">
          <span className="flex items-center gap-2.5 font-medium tracking-[0.08em] text-ink uppercase">
            <span className="live-dot" aria-hidden="true" />
            En ruta
          </span>
          <span className="text-[11px] text-muted">Simulación del recorrido</span>
        </div>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 px-4 py-3">
          <dt className="tracker-row text-muted" style={delay(1150)}>Unidad</dt>
          <dd className="tracker-row m-0 text-ink" style={delay(1150)}>Scania R410 · 2020+</dd>
          <dt className="tracker-row text-muted" style={delay(1250)}>Tramo</dt>
          <dd className="tracker-row m-0 truncate text-ink" style={delay(1250)}>
            <span ref={legRef}>En Buenos Aires</span>
          </dd>
          <dt className="tracker-row text-muted" style={delay(1350)}>Recorrido</dt>
          <dd className="tracker-row m-0 text-ink tabular-nums" style={delay(1350)}>
            <span ref={kmRef} className="text-amber">0</span> / {fmt(TOTAL_KM)} km
          </dd>
          <dt className="tracker-row text-muted" style={delay(1450)}>Rastreo</dt>
          <dd className="tracker-row m-0 flex items-center gap-2 text-ink" style={delay(1450)}>
            <span className="size-1.5 rounded-full bg-ok" aria-hidden="true" />
            Satelital · señal OK
          </dd>
        </dl>
      </div>

      <div data-ui className="fade-up" style={delay(900)} aria-hidden="true">
        <div ref={trackRef} className="relative h-[62px]">
          <div className="absolute inset-x-0 top-[30px] h-px bg-ink/20" />
          <div ref={fillRef} className="absolute inset-x-0 top-[29.5px] h-0.5 origin-left scale-x-0 bg-amber" />
          {STOPS.map((s, i) => {
            const first = i === 0;
            const last = i === STOPS.length - 1;
            // The last two cities sit close together: hang the penultimate label to the left of its dot.
            const penultimate = i === STOPS.length - 2;
            return (
              <div
                key={s.name}
                ref={(el) => {
                  cityRefs.current[i] = el;
                }}
                className="strip-city absolute top-0 h-full"
                style={{ left: `${(s.kmN / TOTAL_KM) * 100}%` }}
                {...(first ? { "data-lit": "" } : {})}
              >
                <span className="strip-dot absolute top-[26px] left-0 size-[9px] -translate-x-1/2 border border-ink/40 bg-night" />
                <span
                  className={`strip-label absolute top-[40px] font-mono text-[10.5px] tracking-[0.06em] whitespace-nowrap text-muted uppercase ${
                    first ? "left-0" : last ? "right-0" : penultimate ? "right-2 hidden md:block" : "hidden -translate-x-1/2 md:block"
                  }`}
                >
                  {s.short}
                </span>
              </div>
            );
          })}
          <div ref={truckRef} className="absolute top-[1px] left-0 will-change-transform sm:-top-[3px]">
            {/* The cab's nose leads: align ~78% of the rig to the progress point. */}
            <div className="-translate-x-[78%]">
              <TruckSide className="h-[26px] w-auto sm:h-[30px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
