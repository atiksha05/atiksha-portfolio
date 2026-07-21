"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  featuredInterest,
  featuredQuote,
  lifeOutsideCopy,
  sideInterests,
  type ImageFit,
  type LifeOutsideInterest,
} from "@/data/lifeOutsideWork";
import { cn } from "@/lib/utils";
import "./life-outside-work.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const ease = [0.22, 1, 0.36, 1] as const;
const REVEAL_STAGGER = 0.15;

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
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: 5 + Math.random() * 90,
        y: 5 + Math.random() * 90,
        size: 6 + Math.random() * 22,
        blur: 8 + Math.random() * 12,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 3,
        baseOpacity: 0.25 + Math.random() * 0.3,
        xDrift: (Math.random() - 0.5) * 60,
        yDrift: -(30 + Math.random() * 50),
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

function InterestImage({
  src,
  alt,
  fit,
  objectPosition,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  fit: ImageFit;
  objectPosition: string;
  sizes: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="interest-image-wrap" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/25 via-fuchsia-500/10 to-purple-900/20" />
      </div>
    );
  }

  return (
    <div className="interest-image-wrap">
      {fit === "contain" ? (
        <div
          className="interest-image-blur"
          style={{ backgroundImage: `url(${src})` }}
          aria-hidden
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn(
          "interest-image",
          fit === "contain" ? "interest-image-contain" : "interest-image-cover",
        )}
        style={{
          objectFit: fit,
          objectPosition,
        }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function FeaturedPaintingCard({ revealIndex }: { revealIndex: number }) {
  return (
    <motion.article
      className="featured-interest-card group"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealItem(revealIndex)}
    >
      <InterestImage
        src={featuredInterest.image}
        alt={featuredInterest.alt}
        fit={featuredInterest.fit}
        objectPosition={featuredInterest.objectPosition}
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />

      <div className="interest-card-content">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-pink-300/60 sm:text-xs">
          {featuredQuote.label}
        </p>
        <blockquote
          className={cn(
            cormorant.className,
            "mt-2 text-xl font-medium leading-snug text-white sm:text-2xl",
          )}
        >
          &ldquo;{featuredQuote.text}&rdquo;
        </blockquote>
        <p className="mt-3 text-xs uppercase tracking-[0.16em] text-pink-300/70">
          {featuredInterest.title}
        </p>
      </div>
    </motion.article>
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

  return (
    <motion.article
      className="personal-interest-card group"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={revealItem(revealIndex)}
    >
      <InterestImage
        src={interest.image}
        alt={interest.alt}
        fit={interest.fit}
        objectPosition={interest.objectPosition}
        sizes="(max-width: 768px) 50vw, 25vw"
      />

      <div className="interest-card-content">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-pink-400/25 bg-black/30 text-pink-300/80 backdrop-blur-sm transition-colors duration-300 group-hover:border-pink-400/45 group-hover:text-pink-200">
          <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mt-2 text-sm font-medium text-white">{interest.title}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-pink-100/50">
          {interest.description}
        </p>
      </div>
    </motion.article>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="life-outside-work"
      className="relative scroll-mt-32 overflow-x-hidden border-t border-pink-500/[0.08] bg-black py-20 md:py-24"
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
          className="max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealItem(0)}
        >
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70">
            {lifeOutsideCopy.eyebrow}
          </span>
          <h2
            className={cn(
              cormorant.className,
              "mt-3 text-[34px] font-medium leading-[1.05] text-white md:text-[44px] lg:text-[64px]",
            )}
          >
            {lifeOutsideCopy.title}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-pink-100/55 sm:text-base">
            {lifeOutsideCopy.subtitle}
          </p>
        </motion.header>

        <div className="personal-interests-grid mt-10">
          <FeaturedPaintingCard revealIndex={1} />

          <div className="personal-interests-list">
            {sideInterests.map((interest, i) => (
              <InterestCard
                key={interest.id}
                interest={interest}
                revealIndex={i + 2}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
