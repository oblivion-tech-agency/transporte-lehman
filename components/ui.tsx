import type { CSSProperties } from "react";

/** Stagger delay for CSS entrance animations (`.mline`, `.fade-up`, `.tracker-row`, check marks). */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
