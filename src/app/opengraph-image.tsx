import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGoogleFont(fontFamily: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontFamily
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (match) {
    const res = await fetch(match[1]);
    if (res.ok) return res.arrayBuffer();
  }
  throw new Error(`Failed to load font: ${fontFamily}`);
}

export default async function Image() {
  const name = siteConfig.name;
  const subtitle = `${siteConfig.jobTitle} · @${siteConfig.handle}`;
  const domain = "jaysinha.dev";

  const fonts: { name: string; data: ArrayBuffer; weight: 400; style: "normal" }[] = [];
  try {
    const [serif, mono] = await Promise.all([
      loadGoogleFont("Instrument Serif", 400, name),
      loadGoogleFont("JetBrains Mono", 400, subtitle + domain),
    ]);
    fonts.push(
      { name: "Instrument Serif", data: serif, weight: 400, style: "normal" },
      { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" }
    );
  } catch {
    // Google Fonts unreachable at render time — fall back to system fonts below.
  }

  const hasSerif = fonts.some((f) => f.name === "Instrument Serif");
  const hasMono = fonts.some((f) => f.name === "JetBrains Mono");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          background: "#f7f3ec",
          color: "#241d16",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontFamily: hasMono ? "JetBrains Mono" : "monospace",
            color: "#c1652e",
            letterSpacing: "0.02em",
            marginBottom: 24,
          }}
        >
          {domain}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 128,
            fontFamily: hasSerif ? "Instrument Serif" : "serif",
            lineHeight: 1,
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            marginTop: 32,
            fontFamily: hasMono ? "JetBrains Mono" : "monospace",
            color: "#5a4f42",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}
