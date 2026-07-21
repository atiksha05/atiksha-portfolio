"use client";

import { useCallback, useEffect, useState } from "react";

const MAX_ROTATE_X = 4;
const MAX_ROTATE_Y = 5;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function useCardTilt() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnabled(hoverMq.matches && !motionMq.matches);
    };

    update();
    hoverMq.addEventListener("change", update);
    motionMq.addEventListener("change", update);
    return () => {
      hoverMq.removeEventListener("change", update);
      motionMq.removeEventListener("change", update);
    };
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (!enabled || !document.hasFocus()) return;

      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const tabletMq = window.matchMedia("(max-width: 1024px)");
      const strength = tabletMq.matches ? 0.5 : 1;

      const rotateY = clamp(
        (x - 0.5) * 8 * strength,
        -MAX_ROTATE_Y,
        MAX_ROTATE_Y,
      );
      const rotateX = clamp(
        (y - 0.5) * -6 * strength,
        -MAX_ROTATE_X,
        MAX_ROTATE_X,
      );

      el.style.setProperty("--rotate-x", `${rotateX}deg`);
      el.style.setProperty("--rotate-y", `${rotateY}deg`);
      el.style.setProperty("--glow-x", `${x * 100}%`);
      el.style.setProperty("--glow-y", `${y * 100}%`);
    },
    [enabled],
  );

  const onPointerLeave = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    el.style.setProperty("--rotate-x", "0deg");
    el.style.setProperty("--rotate-y", "0deg");
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "50%");
  }, []);

  return { onPointerMove, onPointerLeave, tiltEnabled: enabled };
}
