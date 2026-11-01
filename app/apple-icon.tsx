import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const font = await readFile(join(process.cwd(), "assets/BarlowCondensed-SemiBold.ttf"));

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2443b0",
          color: "#fff",
          fontFamily: "Barlow Condensed",
          fontSize: 106,
        }}
      >
        TL
      </div>
    ),
    { ...size, fonts: [{ name: "Barlow Condensed", data: font, weight: 600, style: "normal" }] },
  );
}
