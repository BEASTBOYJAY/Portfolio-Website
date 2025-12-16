"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

export default function VantaBackground({
  children,
  isDark = true,
}: {
  children: React.ReactNode;
  isDark?: boolean;
}) {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);
  const [isVantaLoaded, setIsVantaLoaded] = useState(false);

  useEffect(() => {
    if (isThreeLoaded && isVantaLoaded && vantaRef.current && window.VANTA && window.THREE) {
      const effect = window.VANTA.NET({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x6abb28,
        backgroundColor: isDark ? 0x000000 : 0xffffff,
      });
      setVantaEffect(effect);

      return () => {
        if (effect) effect.destroy();
      };
    }
  }, [isThreeLoaded, isVantaLoaded, isDark]);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsThreeLoaded(true)}
      />
      
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsVantaLoaded(true)}
      />

      {/* 1. Base Layer: Solid Background Color */}
      {/* This ensures that when Vanta fades out, the user sees the solid color behind it */}
      <div 
        className={`fixed inset-0 -z-20 transition-colors duration-500 ${
          isDark ? 'bg-black' : 'bg-white'
        }`} 
      />

      {/* 2. Animation Layer: Vanta.js */}
      <div
        ref={vantaRef}
        className="absolute top-0 left-0 w-full -z-10"
        style={{
          height: '120vh', 
          // FADE: Visible for top 80%, fades to transparent at bottom
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      />

      {/* 3. Content Layer */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </>
  );
}