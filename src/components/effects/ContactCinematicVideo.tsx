"use client";

import { useEffect, useRef, useState } from "react";
import { backgroundVideo } from "@/lib/data";

export function ContactCinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !ready) return;
    video.playbackRate = 0.65;
    video.play().catch(() => undefined);
  }, [ready]);

  if (error) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-black to-pink-950/40"
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-1000"
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
      <div className="absolute inset-0 bg-black/30" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 30% 50%, rgba(244,114,182,0.06) 0%, transparent 55%), linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
        }}
      />
    </div>
  );
}
