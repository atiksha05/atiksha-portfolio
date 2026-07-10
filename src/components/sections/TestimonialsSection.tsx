"use client";

import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  featuredQuote,
  featuredSlideshowImages,
  lifeOutsideInterests,
  type LifeOutsideInterest,
} from "@/data/lifeOutsideWork";
import { cn } from "@/lib/utils";

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

function ImageWithFallback({
  src,
  alt,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-pink-500/25 via-fuchsia-500/10 to-purple-900/20",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      onError={() => setFailed(true)}
    />
  );
}

function FeaturedSlideshow({ revealIndex }: { revealIndex: number }) {
  const [index, setIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((i) => (i + 1) % featuredSlideshowImages.length);
      setImgFailed(false);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  const currentSrc = featuredSlideshowImages[index];

  return (
    <motion.div
      className="group relative z-10 min-h-[240px] overflow-hidden rounded-2xl border border-pink-400/15 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] hover:border-pink-400/40 hover:shadow-[0_0_48px_rgba(244,114,182,0.2)] sm:min-h-[260px] md:min-h-0 md:h-full lg:min-h-[360px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={revealItem(revealIndex)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSrc}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease }}
        >
          {imgFailed ? (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-fuchsia-500/15 to-black" />
          ) : (
            <Image
              src={currentSrc}
              alt=""
              fill
              className="object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImgFailed(true)}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/55 to-black/20" />

      <div className="absolute inset-0 z-[2] flex flex-col justify-end p-5 sm:p-6">
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
      </div>
    </motion.div>
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
      className={cn(
        "group relative z-10 min-h-[132px] overflow-hidden rounded-2xl border border-pink-400/15 transition-all duration-500 sm:min-h-[140px]",
        "hover:-translate-y-1 hover:scale-[1.02] hover:border-pink-400/40 hover:shadow-[0_0_36px_rgba(244,114,182,0.2)]",
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={revealItem(revealIndex)}
    >
      <ImageWithFallback
        src={interest.image}
        alt=""
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25" />

      <div className="relative z-10 flex h-full min-h-[132px] flex-col justify-end p-3.5 sm:min-h-[140px] sm:p-4">
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
            Life Outside Work
          </span>
          <h2
            className={cn(
              cormorant.className,
              "mt-3 text-[34px] font-medium leading-[1.05] text-white md:text-[44px] lg:text-[64px]",
            )}
          >
            The parts of me that keep me creative
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-pink-100/55 sm:text-base">
            Outside of software and product work, I find inspiration through
            movement, art, stories, and the city around me.
          </p>
        </motion.header>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:items-stretch">
          <FeaturedSlideshow revealIndex={1} />

          <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
            {lifeOutsideInterests.map((interest, i) => (
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
