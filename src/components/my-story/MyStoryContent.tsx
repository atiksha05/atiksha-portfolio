"use client";

import { Cormorant_Garamond, Inter } from "next/font/google";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Camera,
  Code2,
  Coffee,
  Compass,
  Heart,
  Lightbulb,
  MapPin,
  Music,
  Palette,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { myStoryPage } from "@/data/myStoryPage";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
});

const ease = [0.22, 1, 0.36, 1] as const;

const identityIcons = [Code2, Users, Lightbulb] as const;
const leadershipIcons = [Sparkles, Heart, Target, Briefcase] as const;
const valueIcons = [Target, Heart, Compass, Lightbulb] as const;
const beyondIcons = [Camera, Palette, Music, BookOpen, MapPin, Coffee] as const;

function HeroBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-[100px]" />

      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-pink-400/50"
          style={{
            left: `${12 + i * 14}%`,
            top: `${20 + (i % 3) * 22}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3.5 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      <motion.div
        className="absolute left-[8%] top-[18%] h-20 w-28 rounded-2xl border border-pink-400/15 bg-white/[0.03] backdrop-blur-xl sm:h-24 sm:w-36"
        animate={{ y: [0, -10, 0], rotate: [-6, -4, -6] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[6%] top-[28%] h-16 w-24 rounded-xl border border-purple-400/15 bg-purple-500/[0.05] backdrop-blur-xl sm:h-20 sm:w-32"
        animate={{ y: [0, 12, 0], rotate: [8, 5, 8] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[20%] h-14 w-20 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-lg sm:h-16 sm:w-28"
        animate={{ y: [0, -8, 0], rotate: [4, 7, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 120 Q100 80 200 110 T400 90"
          fill="none"
          stroke="url(#story-line)"
          strokeWidth="1"
          animate={{ pathLength: [0.4, 1, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="story-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(236,72,153,0)" />
            <stop offset="50%" stopColor="rgba(236,72,153,0.5)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), {
    stiffness: 260,
    damping: 22,
  });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const update = () => setEnableTilt(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [enableTilt, mx, my],
  );

  return (
    <motion.article
      ref={ref}
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setHovering(false);
        mx.set(0);
        my.set(0);
      }}
      style={{
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "rounded-2xl border border-pink-400/20 bg-white/[0.03] p-5 backdrop-blur-xl transition-shadow duration-300 sm:p-6",
        hovering &&
          "border-pink-400/40 shadow-[0_0_40px_rgba(236,72,153,0.18)]",
        className,
      )}
    >
      {children}
    </motion.article>
  );
}

const beyondLinkClass =
  "group flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-pink-400/15 bg-white/[0.03] p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-pink-400/40 hover:shadow-[0_0_24px_rgba(236,72,153,0.15)] sm:p-4";

const beyondIconClass =
  "h-4 w-4 text-pink-300/70 transition-colors duration-300 group-hover:text-pink-300 sm:h-5 sm:w-5";

export function MyStoryContent() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-pink-500/[0.08] blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-500/[0.06] blur-[100px]"
        aria-hidden
      />

      <Navbar />

      <main
        className={cn(
          inter.className,
          "section-container relative pb-20 pt-[120px] sm:pb-24",
        )}
      >
        <Link
          href="/#about"
          className="inline-flex items-center gap-2 text-sm text-pink-300/70 transition-colors hover:text-pink-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to About
        </Link>

        {/* Hero */}
        <header className="relative mt-10 min-h-[200px] sm:min-h-[240px]">
          <HeroBackdrop />
          <motion.div
            className="relative z-10 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1
              className={cn(
                cormorant.className,
                "text-5xl text-white sm:text-6xl md:text-7xl",
              )}
            >
              {myStoryPage.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-neutral-400 sm:text-xl">
              {myStoryPage.tagline}
            </p>
          </motion.div>
        </header>

        {/* Identity cards */}
        <section className="mt-14 [perspective:1200px] sm:mt-16">
          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {myStoryPage.identities.map((item, i) => {
              const Icon = identityIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease }}
                >
                  <TiltCard>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500/25 to-purple-500/10">
                      <Icon className="h-5 w-5 text-pink-300" />
                    </div>
                    <h2
                      className={cn(
                        cormorant.className,
                        "mt-4 text-2xl text-white",
                      )}
                    >
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                      {item.line}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Leadership */}
        <section className="mt-16 sm:mt-20">
          <h2
            className={cn(
              cormorant.className,
              "text-2xl text-white sm:text-3xl",
            )}
          >
            Leadership snapshot
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {myStoryPage.leadership.map((org, i) => {
              const Icon = leadershipIcons[i];
              return (
                <motion.div
                  key={org.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease }}
                >
                  <TiltCard className="p-4 sm:p-5">
                    <Icon className="h-4 w-4 text-pink-400/80" />
                    <h3 className="mt-3 text-sm font-medium text-white">
                      {org.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">
                      {org.impact}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Values */}
        <section className="mt-16 sm:mt-20">
          <h2
            className={cn(
              cormorant.className,
              "text-2xl text-white sm:text-3xl",
            )}
          >
            What Drives Me
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {myStoryPage.values.map((item, i) => {
              const Icon = valueIcons[i];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5, ease }}
                >
                  <TiltCard className="flex items-start gap-3 p-4 sm:p-5">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-pink-400/70" />
                    <div>
                      <h3 className="text-sm font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500">
                        {item.line}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Beyond the Screen */}
        <section className="mt-16 sm:mt-20">
          <Link
            href="/#life-outside-work"
            className={cn(
              cormorant.className,
              "group inline-block cursor-pointer text-2xl text-white transition-colors duration-300 hover:text-pink-100 sm:text-3xl",
            )}
          >
            Beyond the Screen
          </Link>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
            {myStoryPage.beyond.map((name, i) => {
              const Icon = beyondIcons[i];
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.5, ease }}
                >
                  <Link
                    href="/#life-outside-work"
                    aria-label={`${name} — view Life Outside Work`}
                    className={beyondLinkClass}
                  >
                    <Icon className={beyondIconClass} />
                    <span className="text-center text-[10px] text-neutral-400 sm:text-xs">
                      {name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Closing */}
        <motion.section
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
        >
          <div className="rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-500/[0.08] via-transparent to-purple-500/[0.06] p-6 text-center backdrop-blur-sm sm:p-8">
            <p
              className={cn(
                cormorant.className,
                "text-lg leading-relaxed text-pink-100/75 sm:text-xl",
              )}
            >
              {myStoryPage.closing}
            </p>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
