import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Hex approximations of the OKLCH --background / --accent tokens in globals.css
// (manifest theme/background colors need broad browser support, unlike the
// OKLCH values used elsewhere in the app's CSS).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ec",
    theme_color: "#c1652e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
