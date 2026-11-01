import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Transporte Lehman — Desde cualquier punto del país hacia todo el Sur Argentino";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = await readFile(join(process.cwd(), "assets/BarlowCondensed-SemiBold.ttf"));
const photo = `data:image/jpeg;base64,${(await readFile(join(process.cwd(), "public/img/l.jpg"))).toString("base64")}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(115deg, #13235f 0%, #2443b0 60%, #13235f 100%)",
          color: "#fff",
          fontFamily: "Barlow Condensed",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 28, padding: "0 56px 0 72px", width: 660 }}>
          <div style={{ fontSize: 24, letterSpacing: 2, textTransform: "uppercase", color: "#d6ebff" }}>
            Transporte de cargas generales
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, lineHeight: 1.02, textTransform: "uppercase" }}>
            Desde cualquier punto del país hacia todo el&nbsp;<span style={{ color: "#a9c0ff" }}>Sur Argentino</span>
          </div>
          <div style={{ fontSize: 30, color: "rgba(255,255,255,0.85)" }}>Buenos Aires – Tierra del Fuego</div>
        </div>
        <img src={photo} alt="" width={540} height={630} style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Barlow Condensed", data: font, weight: 600, style: "normal" }] },
  );
}
