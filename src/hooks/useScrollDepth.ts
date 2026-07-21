"use client";

import { useEffect } from "react";

export function useScrollDepth(targetRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      el.style.setProperty("--scroll-y", `${y}`);
      el.style.setProperty("--scroll-depth-back", `${y * 0.04}px`);
      el.style.setProperty("--scroll-depth-mid", `${y * 0.025}px`);
      el.style.setProperty("--scroll-depth-front", `${y * -0.015}px`);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetRef]);
}
