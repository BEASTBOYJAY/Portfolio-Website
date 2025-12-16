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
    // Only init if both scripts are loaded, ref exists, and Vanta is available
    if (isThreeLoaded && isVantaLoaded && vantaRef.current && window.VANTA && window.THREE) {
      const effect = window.VANTA.BIRDS({
        el: vantaRef.current,
        THREE: window.THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        
        // --- CUSTOM BIRD SETTINGS ---
        color1: 0xcfd62a, // Yellowish/Lime (from your snippet)
        color2: 0x1a6802, // Green (from your snippet)
        colorMode: "lerpGradient",
        
        // Logic to switch background based on your theme
        // 0x00091a is the hex expansion of your snippet's 0x91a (Deep Purple/Black)
        backgroundColor: isDark ? 0x40e : 0xffffff,
      });
      setVantaEffect(effect);

      return () => {
        if (effect) effect.destroy();
      };
    }
  }, [isThreeLoaded, isVantaLoaded, isDark]);

  return (
    <>
      {/* 1. Load Three.js */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsThreeLoaded(true)}
      />
      
      {/* 2. Load Vanta BIRDS effect (Changed from NET) */}
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js"
        strategy="afterInteractive"
        onLoad={() => setIsVantaLoaded(true)}
      />

      {/* 3. Base Layer: Solid Background Color */}
      {/* Matches the Vanta backgroundColor so the fade looks seamless */}
      <div 
        className="fixed inset-0 -z-20 transition-colors duration-500"
        style={{
           // If dark, use the specific color from your snippet (Deep Purple #00091a)
           // If light, use white
           backgroundColor: isDark ? '#00091a' : '#ffffff'
        }}
      />

      {/* 4. Animation Layer: Vanta.js */}
      <div
        ref={vantaRef}
        className="absolute top-0 left-0 w-full -z-10"
        style={{
          height: '120vh', 
          // FADE MASK: Visible for top 40%, fades to transparent at bottom
          maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
        }}
      />

      {/* 5. Content Layer */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </>
  );
}