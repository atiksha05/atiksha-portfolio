"use client";

import { motion } from "framer-motion";

export function SmokeBackground({ contained = false }: { contained?: boolean }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none z-0 overflow-hidden bg-black ${
        contained ? "absolute inset-0" : "fixed inset-0"
      }`}
    >
      {/* Rotating ambient mesh */}
      <motion.div
        className="absolute left-1/2 top-[30%] h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="h-full w-full opacity-60"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.06) 60deg, transparent 120deg, rgba(255,255,255,0.1) 200deg, transparent 280deg)",
            filter: "blur(80px)",
          }}
        />
      </motion.div>

      {/* Main silk ribbon — center hero */}
      <motion.div
        className="absolute left-1/2 top-[30%] h-[220px] w-[130%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 10%, rgba(255,255,255,0.18) 35%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.18) 65%, rgba(255,255,255,0.03) 90%, transparent 100%)",
          filter: "blur(35px)",
        }}
        animate={{
          x: ["-6%", "6%", "-6%"],
          scaleY: [1, 1.15, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Second ribbon — offset wave */}
      <motion.div
        className="absolute left-1/2 top-[34%] h-[160px] w-[140%] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.14) 45%, rgba(255,255,255,0.1) 70%, transparent 100%)",
          filter: "blur(50px)",
        }}
        animate={{
          x: ["5%", "-5%", "5%"],
          y: ["-8px", "12px", "-8px"],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Soft cloud cluster behind headline */}
      <motion.div
        className="absolute left-1/2 top-[28%] h-[480px] w-[min(100vw,780px)] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 35%, transparent 68%)",
          filter: "blur(45px)",
        }}
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.45, 0.75, 0.45],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting side wisps */}
      <motion.div
        className="absolute -left-[10%] top-[25%] h-[300px] w-[55%] rounded-full bg-white/[0.07] blur-[90px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -25, 0],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[8%] top-[32%] h-[280px] w-[50%] rounded-full bg-white/[0.06] blur-[85px]"
        animate={{
          x: [0, -35, 0],
          y: [0, 20, 0],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Lower fade glow */}
      <motion.div
        className="absolute bottom-[12%] left-1/2 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.04] blur-[110px]"
        animate={{ opacity: [0.15, 0.4, 0.15], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 55% at 50% 32%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
