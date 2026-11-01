import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

const font = await readFile(join(process.cwd(), "assets/BarlowCondensed-SemiBold.ttf"));

export default function Icon() {
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
          fontSize: 300,
        }}
      >
        TL
      </div>
    ),
    { ...size, fonts: [{ name: "Barlow Condensed", data: font, weight: 600, style: "normal" }] },
  );
}
