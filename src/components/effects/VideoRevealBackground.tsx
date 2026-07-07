"use client";

import { useEffect, useRef, useState } from "react";
import { backgroundVideo } from "@/lib/data";

export function VideoRevealBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ready) return;
    videoRef.current?.play().catch(() => undefined);
  }, [ready]);

  if (error) {
    return <div aria-hidden className="absolute inset-0 z-0 bg-black" />;
  }

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Soft bloom behind video */}
      <div
        className="absolute inset-0 scale-105 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, rgba(255,200,120,0.25) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)",
        }}
      />

      <video
        ref={videoRef}
        className="video-glow absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
        src={backgroundVideo.src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onError={() => setError(true)}
      />

      {/* Warm light glow over the bridge lights */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,220,160,0.2) 0%, transparent 65%)",
        }}
      />

      {/* Lighter tint — keeps text readable without dulling the video */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 95% 75% at 50% 45%, transparent 0%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
