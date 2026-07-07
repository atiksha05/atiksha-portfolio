"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "8%", top: "18%", size: 6, delay: 0 },
  { left: "22%", top: "62%", size: 4, delay: 0.8 },
  { left: "48%", top: "28%", size: 5, delay: 1.2 },
  { left: "72%", top: "70%", size: 7, delay: 0.4 },
  { left: "88%", top: "34%", size: 4, delay: 1.6 },
  { left: "58%", top: "82%", size: 5, delay: 2 },
];

export function WipBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-pink-500/[0.08] blur-[100px]" />
      <div className="absolute -right-24 bottom-32 h-80 w-80 rounded-full bg-fuchsia-500/[0.06] blur-[110px]" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/[0.04] blur-[120px]" />

      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-pink-400/30 shadow-[0_0_20px_rgba(244,114,182,0.4)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -18, 0],
            opacity: [0.25, 0.7, 0.25],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4.5 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
