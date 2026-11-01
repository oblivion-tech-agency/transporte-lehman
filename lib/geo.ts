// Simplified geography of southern Argentina for the corridor map.
// Points are [longitude, latitude]; projected equirectangular, corrected for ~44°S.

type LonLat = readonly [number, number];

const LON0 = -74.2;
const LAT0 = -33.4;
const SCALE = 27;
const COS = Math.cos((44 * Math.PI) / 180);

export const MAP_W = Math.round((-54.6 - LON0) * COS * SCALE);
export const MAP_H = Math.round((LAT0 - -55.4) * SCALE);

export function project([lon, lat]: LonLat): [number, number] {
  return [(lon - LON0) * COS * SCALE, (LAT0 - lat) * SCALE];
}

export function unproject(x: number, y: number): [number, number] {
  return [x / (COS * SCALE) + LON0, LAT0 - y / SCALE];
}

const r1 = (n: number) => Math.round(n * 10) / 10;
const toPath = (pts: readonly LonLat[], close = true) =>
  pts.map((p, i) => `${i ? "L" : "M"}${project(p).map(r1).join(" ")}`).join("") + (close ? "Z" : "");

// Mainland: Atlantic coast north → south, then the Andes border back north.
const MAINLAND: LonLat[] = [
  [-58.4, -33.4], [-58.38, -34.6], [-57.95, -34.88], [-57.15, -35.43], [-57.37, -35.85], [-56.98, -36.3],
  [-56.68, -36.4], [-56.85, -37.1], [-57.55, -38.0], [-58.1, -38.3], [-58.75, -38.58], [-60.07, -38.86],
  [-61.3, -38.99], [-62.05, -38.9], [-62.3, -38.78], [-62.15, -39.3], [-62.1, -39.9], [-62.2, -40.55],
  [-62.8, -41.03], [-63.7, -41.15], [-64.3, -40.9], [-64.95, -40.75], [-65.1, -41.2], [-65.05, -41.8],
  [-64.6, -42.15], [-64.0, -42.15], [-63.6, -42.6], [-64.1, -42.95], [-64.6, -42.7], [-65.03, -42.77],
  [-64.95, -43.05], [-65.05, -43.35], [-65.3, -44.05], [-65.6, -44.75], [-65.65, -45.05], [-66.53, -45.12],
  [-67.2, -45.4], [-67.5, -45.86], [-67.55, -46.45], [-67.0, -46.95], [-66.2, -47.1], [-65.75, -47.2],
  [-65.9, -47.75], [-66.5, -48.4], [-67.2, -48.8], [-67.7, -49.3], [-68.1, -49.7], [-68.45, -50.1],
  [-69.0, -50.85], [-69.15, -51.55], [-68.85, -51.8], [-68.35, -52.33], [-69.5, -52.15], [-71.0, -52.05],
  [-71.9, -52.0], [-72.3, -51.6], [-72.4, -51.0], [-73.2, -50.6], [-73.5, -49.3], [-72.8, -48.3],
  [-72.3, -47.6], [-71.9, -46.9], [-71.7, -45.6], [-71.6, -44.6], [-71.9, -43.5], [-71.7, -42.3],
  [-71.9, -41.2], [-71.6, -40.2], [-71.1, -39.0], [-71.0, -37.8], [-70.4, -36.3], [-70.1, -35.0],
  [-70.0, -33.4],
];

const TIERRA_DEL_FUEGO: LonLat[] = [
  [-68.61, -52.65], [-68.25, -53.05], [-67.75, -53.75], [-67.1, -54.25], [-66.4, -54.5], [-65.75, -54.65],
  [-65.15, -54.65], [-65.6, -54.9], [-66.6, -54.92], [-67.3, -54.9], [-68.3, -54.82], [-68.62, -54.88],
];

const MALVINAS: LonLat[][] = [
  [[-59.75, -51.25], [-58.4, -51.32], [-57.75, -51.55], [-58.3, -51.95], [-59.1, -52.2], [-59.6, -51.85]],
  [[-60.95, -51.4], [-60.0, -51.3], [-59.9, -51.7], [-60.15, -52.15], [-60.75, -52.0], [-61.15, -51.75]],
];

export const LAND_PATHS = [toPath(MAINLAND), toPath(TIERRA_DEL_FUEGO), ...MALVINAS.map((m) => toPath(m))];

// Neighbouring Chilean land, drawn faintly: Ruta 3 crosses it to reach Tierra del Fuego.
const ANDES = MAINLAND.slice(MAINLAND.findIndex(([lon, lat]) => lon === -71.9 && lat === -52.0));
const CHILE_MAINLAND: LonLat[] = [
  ...ANDES.reverse(), [-71.0, -52.05], [-69.5, -52.15], [-68.35, -52.33], [-69.6, -52.55], [-70.9, -53.15],
  [-71.3, -53.9], [-72.5, -53.4], [-74.2, -52.5], [-74.2, -33.4],
];
const CHILE_FUEGO: LonLat[] = [
  [-68.61, -52.65], [-69.4, -52.5], [-70.0, -52.75], [-70.6, -53.3], [-70.4, -53.9], [-70.0, -54.3],
  [-69.0, -54.6], [-68.62, -54.88],
];
export const CONTEXT_PATHS = [toPath(CHILE_MAINLAND), toPath(CHILE_FUEGO)];

// Ruta Nacional 3, including the crossing through Chile to reach Tierra del Fuego.
const ROUTE: LonLat[] = [
  [-58.38, -34.6], [-58.76, -35.05], [-59.1, -36.01], [-59.86, -36.78], [-59.8, -37.67], [-60.28, -38.38],
  [-62.27, -38.72], [-63.13, -38.89], [-62.68, -39.5], [-62.99, -40.81], [-64.95, -40.73], [-65.36, -41.61],
  [-65.04, -42.77], [-65.31, -43.25], [-66.54, -44.68], [-67.48, -45.86], [-67.52, -46.44], [-67.25, -47.02],
  [-67.8, -48.15], [-67.72, -49.31], [-68.91, -49.98], [-69.22, -51.62], [-69.55, -52.45], [-69.29, -52.78],
  [-68.6, -53.3], [-67.7, -53.79], [-67.2, -54.51], [-68.3, -54.8],
];

/** Index into ROUTE for each corridor stop, in STOPS order. */
export const STOP_VERTEX = [0, 7, 9, 12, 15, 21, 25, 27];

const ROUTE_XY = ROUTE.map(project);
const CUM: number[] = [0];
for (let i = 1; i < ROUTE_XY.length; i++) {
  const [ax, ay] = ROUTE_XY[i - 1];
  const [bx, by] = ROUTE_XY[i];
  CUM.push(CUM[i - 1] + Math.hypot(bx - ax, by - ay));
}
const TOTAL = CUM[CUM.length - 1];

export const ROUTE_PATH = toPath(ROUTE, false);
/** Fraction of the drawn route at which each stop sits. */
export const STOP_FRAC = STOP_VERTEX.map((v) => CUM[v] / TOTAL);
export const STOP_XY = STOP_VERTEX.map((v) => ROUTE_XY[v]);

/** Point and heading (degrees) at fraction `t` of the route. */
export function pointAt(t: number): { x: number; y: number; angle: number } {
  const d = Math.min(1, Math.max(0, t)) * TOTAL;
  let i = 1;
  while (i < CUM.length - 1 && CUM[i] < d) i++;
  const [ax, ay] = ROUTE_XY[i - 1];
  const [bx, by] = ROUTE_XY[i];
  const k = (d - CUM[i - 1]) / (CUM[i] - CUM[i - 1] || 1);
  return { x: ax + (bx - ax) * k, y: ay + (by - ay) * k, angle: (Math.atan2(by - ay, bx - ax) * 180) / Math.PI };
}

/** "38°53′S 63°08′O" for a projected point. */
export function formatCoords(x: number, y: number): string {
  const [lon, lat] = unproject(x, y);
  const dm = (v: number) => {
    const a = Math.abs(v);
    const deg = Math.floor(a);
    const min = Math.round((a - deg) * 60);
    return `${deg}°${String(min === 60 ? 0 : min).padStart(2, "0")}′`;
  };
  return `${dm(lat)}S ${dm(lon)}O`;
}
