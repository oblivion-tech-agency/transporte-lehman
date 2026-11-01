"use client";

import { useEffect } from "react";

const EMPH = "cubic-bezier(0.05,0.7,0.1,1)";

/** Scroll reveals (`data-reveal="<delay ms>"`) and count-ups (`data-count`), as in the design. */
export function Motion() {
  useEffect(() => {
    // Nav turns solid once the page leaves the very top.
    const html = document.documentElement;
    const onScrollNav = () => html.toggleAttribute("data-scrolled", scrollY > 24);
    onScrollNav();
    addEventListener("scroll", onScrollNav, { passive: true });
    return () => removeEventListener("scroll", onScrollNav);
  }, []);

  useEffect(() => {
    // `[data-progress]` gets `--p` (0 → 1). Modes: default = scrolling out past the top,
    // "view" = whole crossing of the viewport (parallax), "sticky" = travel of a tall sticky section.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    let raf = 0;
    const update = () => {
      raf = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        const vh = innerHeight;
        if (r.bottom < -vh || r.top > vh * 2) continue;
        const mode = el.dataset.progress;
        const p =
          mode === "view"
            ? (vh - r.top) / (vh + r.height)
            : mode === "sticky"
              ? -r.top / Math.max(1, r.height - vh)
              : -r.top / r.height;
        el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduce) {
      reveals.forEach((el) => el.classList.add("revealed"));
      document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => el.classList.add("revealed"));
      return;
    }

    const count = (el: HTMLElement) => {
      const n = Number(el.dataset.count);
      const p = el.dataset.prefix ?? "";
      const s = el.dataset.suffix ?? "";
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = p + Math.round(n * e) + s;
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          io.unobserve(el);
          if (el.dataset.count) {
            count(el);
            return;
          }
          el.classList.add("revealed");
          if (el.hasAttribute("data-clip")) return;
          const a = el.animate(
            [
              { opacity: 0, transform: "translateY(28px)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 650, delay: Number(el.dataset.reveal) || 0, easing: EMPH, fill: "backwards" },
          );
          a.finished.then(() => a.cancel()).catch(() => {});
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    reveals.forEach((el) => io.observe(el));
    document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => io.observe(el));
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
