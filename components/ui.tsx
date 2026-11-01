import type { CSSProperties, ReactNode } from "react";

/** The four "+" registration marks a `.blueprint` frame wears. Must be direct children of it. */
export function Corners({ color }: { color?: string }) {
  const style = color ? { color } : undefined;
  return (
    <>
      <i aria-hidden="true" className="corner tl" style={style} />
      <i aria-hidden="true" className="corner tr" style={style} />
      <i aria-hidden="true" className="corner bl" style={style} />
      <i aria-hidden="true" className="corner br" style={style} />
    </>
  );
}

/** Eyebrow label + brand rule that opens every content section. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="eyebrow">{children}</span>
      <div className="rule" />
    </>
  );
}

/** Stagger delay for CSS entrance animations (`.rise`, `.word`). */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
