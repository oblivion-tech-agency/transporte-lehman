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
  "Acusur S.A.",
  "IPASA",
  "Vinisa Fueguina",
  "Río Chico S.A.",
  "Continental Maderas S.A.",
];

export type Stop = { name: string; prov: string; km: string; filled: boolean };

export const STOPS: Stop[] = [
  { name: "Buenos Aires", prov: "Origen · AMBA", km: "0 km", filled: true },
  { name: "Algarrobo", prov: "Base operativa · Villarino", km: "≈ 720 km", filled: true },
  { name: "Viedma", prov: "Río Negro", km: "≈ 960 km", filled: false },
  { name: "Puerto Madryn", prov: "Chubut", km: "≈ 1.380 km", filled: false },
  { name: "Comodoro Rivadavia", prov: "Chubut", km: "≈ 1.800 km", filled: false },
  { name: "Río Gallegos", prov: "Santa Cruz", km: "≈ 2.600 km", filled: false },
  { name: "Río Grande", prov: "Tierra del Fuego", km: "≈ 2.950 km", filled: false },
  { name: "Ushuaia", prov: "Tierra del Fuego · Destino", km: "≈ 3.150 km", filled: true },
];
