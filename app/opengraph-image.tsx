import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";

export const alt = `${site.name} · Backend Engineer & Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#08080f", color: "#ecebf5" }}>
        <div style={{ display: "flex", width: 84, height: 84, borderRadius: 18, background: "#7c3aed", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700 }}>HK</div>
        <div style={{ marginTop: 40, fontSize: 84, fontWeight: 700 }}>{site.name}</div>
        <div style={{ marginTop: 16, fontSize: 38, color: "#b79dff" }}>Backend Engineer · Full Stack Developer</div>
        <div style={{ marginTop: 24, fontSize: 28, color: "#a5a4bd" }}>Python · FastAPI · PostgreSQL · WebRTC · Kotlin · Rust</div>
      </div>
    ),
    size,
  );
}
