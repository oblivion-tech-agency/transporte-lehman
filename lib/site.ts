export const SITE_NAME = "Transporte Lehman";
export const SITE_TITLE =
  "Transporte Lehman — Desde cualquier punto del país hacia todo el Sur Argentino";
export const SITE_DESCRIPTION =
  "Transporte de cargas generales desde cualquier punto del país hacia la Patagonia. Corredor Buenos Aires – Tierra del Fuego con flota propia 2020+, rastreo satelital 24 h y semirremolques de 28 pallets. Base en Algarrobo, Villarino.";

// Production domain once it's bought; until then Vercel's production URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const WA_NUMBER = "5492914120638";
export const WA_URL = `https://wa.me/${WA_NUMBER}`;
export const PHONE_DISPLAY = "(291) 412-0638";
export const PHONE_E164 = "+5492914120638";
export const INSTAGRAM_HANDLE = "transportelehman";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export const CLIENTS = [
  "Acsur S.A.",
  "IPASA",
  "Vinisa Fueguina",
  "Río Chico S.A.",
  "Continental Maderas S.A.",
];

export type Stop = { name: string; short: string; prov: string; km: string; kmN: number; filled: boolean; note: string };

export const STOPS: Stop[] = [
  { name: "Buenos Aires", short: "Bs. As.", prov: "Origen · AMBA", km: "0 km", kmN: 0, filled: true, note: "Cargamos en AMBA y en cualquier punto del país." },
  { name: "Algarrobo", short: "Algarrobo", prov: "Base operativa · Villarino", km: "≈ 720 km", kmN: 720, filled: true, note: "Nuestra base sobre la ruta al sur. Desde acá se coordina cada viaje." },
  { name: "Viedma", short: "Viedma", prov: "Río Negro", km: "≈ 960 km", kmN: 960, filled: false, note: "Cruzamos el río Negro y entramos a la Patagonia." },
  { name: "Puerto Madryn", short: "Madryn", prov: "Chubut", km: "≈ 1.380 km", kmN: 1380, filled: false, note: "Costa de Chubut, entre el golfo Nuevo y la meseta." },
  { name: "Comodoro Rivadavia", short: "Comodoro", prov: "Chubut", km: "≈ 1.800 km", kmN: 1800, filled: false, note: "Golfo San Jorge. Más de la mitad del corredor." },
  { name: "Río Gallegos", short: "Gallegos", prov: "Santa Cruz", km: "≈ 2.600 km", kmN: 2600, filled: false, note: "Último tramo continental antes del estrecho de Magallanes." },
  { name: "Río Grande", short: "Río Grande", prov: "Tierra del Fuego", km: "≈ 2.950 km", kmN: 2950, filled: false, note: "Ya en la isla, después del cruce en balsa." },
  { name: "Ushuaia", short: "Ushuaia", prov: "Tierra del Fuego · Destino", km: "≈ 3.150 km", kmN: 3150, filled: true, note: "El fin del corredor. La carga llega completa y a tiempo." },
];
