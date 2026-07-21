"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { backgroundVideo, contactImage } from "@/lib/data";

/**
 * Contact left-panel media.
 *
 * A static Golden Gate still is always rendered (priority, opacity 1).
 * The cinematic video is an optional enhancement layered on top and
 * only becomes opaque after it can paint a frame — so a stalled or
 * failed video after tab/server inactivity never leaves a blank panel.
 */
export function ContactCinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPainted, setVideoPainted] = useState(false);
  const [imageSrc, setImageSrc] = useState(contactImage.src);
  const fallbackApplied = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      video.playbackRate = 0.65;
      void video.play().catch(() => {
        // Keep still visible; do not hide the panel.
        setVideoPainted(false);
      });
    };

    const hideBrokenVideo = () => setVideoPainted(false);

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    tryPlay();
    video.addEventListener("stalled", hideBrokenVideo);
    video.addEventListener("error", hideBrokenVideo);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", tryPlay);

    return () => {
      video.removeEventListener("stalled", hideBrokenVideo);
      video.removeEventListener("error", hideBrokenVideo);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", tryPlay);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="contact-media absolute inset-0 overflow-hidden"
    >
      <Image
        src={imageSrc}
        alt="Golden Gate Bridge illuminated at night"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
        className="contact-image"
        onError={() => {
          if (fallbackApplied.current) return;
          fallbackApplied.current = true;
          setImageSrc(contactImage.fallbackSrc);
        }}
      />

      <video
        ref={videoRef}
        className="contact-video absolute inset-0 h-full w-full object-cover"
        style={{ opacity: videoPainted ? 1 : 0 }}
        src={backgroundVideo.src}
        poster={contactImage.src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoPainted(true)}
        onCanPlay={() => setVideoPainted(true)}
        onPlaying={() => setVideoPainted(true)}
        onError={() => setVideoPainted(false)}
      />

      <div className="contact-image-overlay absolute inset-0 bg-black/30" />
      <div
        className="contact-image-overlay absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="contact-image-overlay absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 30% 50%, rgba(244,114,182,0.06) 0%, transparent 55%), linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 100%)",
        }}
      />
    </div>
  );
}
