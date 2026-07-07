"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorDot() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  });
  const dotY = useSpring(cursorY, {
    damping: 28,
    stiffness: 180,
    mass: 0.4,
  });

  useEffect(() => {
    const prefersFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!prefersFinePointer) return;

    setEnabled(true);
    document.body.classList.add("custom-cursor");

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[201] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.8),0_0_16px_rgba(244,114,182,0.4)]"
      style={{
        left: dotX,
        top: dotY,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
