"use client";

import { Cormorant_Garamond } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import {
  lifeOutsideCopy,
  personalInterests,
  type LifeOutsideInterest,
} from "@/data/lifeOutsideWork";
import { cn } from "@/lib/utils";
import "./life-outside-work.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const ease = [0.22, 1, 0.36, 1] as const;
const REVEAL_STAGGER = 0.12;

const revealItem = (index: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease, delay: index * REVEAL_STAGGER },
  },
});

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  blur: number;
  duration: number;
  delay: number;
  baseOpacity: number;
  xDrift: number;
  yDrift: number;
};

function FloatingParticles() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: 5 + ((i * 17) % 90),
        y: 8 + ((i * 23) % 84),
        size: 6 + (i % 5) * 4,
        blur: 8 + (i % 4) * 3,
        duration: 11 + (i % 6),
        delay: (i % 5) * 0.45,
        baseOpacity: 0.22 + (i % 4) * 0.06,
        xDrift: ((i % 2 === 0 ? 1 : -1) * (18 + (i % 5) * 8)),
        yDrift: -(28 + (i % 4) * 10),
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-pink-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            filter: `blur(${p.blur}px)`,
            boxShadow:
              "0 0 18px rgba(244, 114, 182, 0.55), 0 0 36px rgba(236, 72, 153, 0.25)",
          }}
          animate={{
            x: [0, p.xDrift * 0.5, p.xDrift],
            y: [0, p.yDrift * 0.6, p.yDrift],
            opacity: [
              p.baseOpacity * 0.5,
              p.baseOpacity,
              p.baseOpacity * 0.35,
              p.baseOpacity * 0.85,
              p.baseOpacity * 0.4,
            ],
            scale: [1, 1.08, 0.95, 1.05, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function InterestCard({
  interest,
  revealIndex,
}: {
  interest: LifeOutsideInterest;
  revealIndex: number;
}) {
  const Icon = interest.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="life-interest-card group"
      data-accent={interest.accent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={revealItem(revealIndex)}
    >
      <div className="life-card-atmosphere" aria-hidden>
        <span className="life-card-orb life-card-orb--a" />
        <span className="life-card-orb life-card-orb--b" />
        <span className="life-card-ring" />
        <span className="life-card-line" />
        <span className="life-card-speck" />
        <span className="life-card-speck" />
        <span className="life-card-speck" />
      </div>

      <div className="life-card-body">
        <motion.span
          className="life-card-icon"
          aria-hidden
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [0, -4, 4, 0],
                }
          }
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: revealIndex * 0.2,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.7} />
        </motion.span>

        <h3 className={cn(cormorant.className, "life-card-title")}>
          {interest.title}
        </h3>
        <p className="life-card-copy">{interest.description}</p>
        <p className={cn(cormorant.className, "life-card-quote")}>
          &ldquo;{interest.quote}&rdquo;
        </p>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="life-outside-work"
      className="life-beyond-section relative scroll-mt-32 overflow-x-hidden border-t border-pink-500/[0.08] bg-black"
    >
      <FloatingParticles />

      <div
        className="pointer-events-none absolute bottom-1/4 left-1/4 z-0 h-64 w-64 rounded-full bg-pink-500/[0.08] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-0 top-1/3 z-0 h-72 w-72 rounded-full bg-fuchsia-500/[0.06] blur-[110px]"
        aria-hidden
      />

      <div className="section-container relative z-10 mx-auto w-full">
        <motion.header
          className="life-beyond-header max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealItem(0)}
        >
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70">
            {lifeOutsideCopy.eyebrow}
          </span>
          <h2 className={cn(cormorant.className, "life-beyond-title")}>
            {lifeOutsideCopy.title}
          </h2>
          <p className="life-beyond-subtitle">
            {lifeOutsideCopy.subtitle}
          </p>
        </motion.header>

        <div className="personal-interests-grid">
          {personalInterests.map((interest, i) => (
            <InterestCard
              key={interest.id}
              interest={interest}
              revealIndex={i + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
