import type { Metadata } from "next";
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";

export const metadata: Metadata = {
  title: "Jay Sinha | AI Engineer & ML Developer",
  description: "AI Engineer specializing in Deep Learning, Computer Vision, NLP, and Generative AI. Building cutting-edge AI solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Jay Sinha",
              "alternateName": "beastboyjay",
              "url": "https://jaysinha.dev",
              "sameAs": [
                "https://github.com/beastboyjay",
                "https://x.com/BEAST_BOY_JAY",
                "https://medium.com/@beastboyjay"
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <VisualEditsMessenger />
      </body>
    </html>
  );
}