"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { about, experience } from "@/lib/data";
import { cn } from "@/lib/utils";
import { CurrentlyBuildingCard } from "@/components/sections/CurrentlyBuildingCard";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

function ExperienceRow({
  role,
  company,
}: {
  role: string;
  company: string;
}) {
  return (
    <div className="border-t border-pink-400/15 py-3 text-sm transition-colors hover:bg-pink-500/[0.03]">
      <span className="font-medium text-pink-50/85">{role}</span>
      <span className="text-pink-200/45"> — {company}</span>
    </div>
  );
}

function ReadMyStoryButton() {
  return (
    <Link
      href="/my-story"
      className="group inline-flex w-fit items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-8 py-4 text-sm font-medium text-pink-100/90 shadow-[0_0_32px_rgba(236,72,153,0.15)] transition-all duration-300 hover:border-pink-400/60 hover:bg-pink-500/15 hover:text-pink-50 hover:shadow-[0_0_48px_rgba(236,72,153,0.28)]"
    >
      Read My Story
      <span
        className="transition-transform duration-300 group-hover:translate-x-0.5"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}

function Avatar3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateY: (px - 0.5) * 14,
      rotateX: (0.5 - py) * 10,
    });
  };

  const handleLeave = () => {
    setHovering(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div
      ref={wrapRef}
      className="flex h-full w-full items-center justify-center [perspective:1400px]"
      onMouseEnter={() => setHovering(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative mx-auto h-auto w-full max-h-[300px] max-w-[260px] sm:max-h-[400px] sm:max-w-[340px] lg:max-h-[520px] lg:max-w-[440px]"
      >
        <div
          className="relative h-full w-full [transform-style:preserve-3d] will-change-transform"
          style={{
            transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${hovering ? 20 : 6}px)`,
            transition: hovering
              ? "transform 0.12s ease-out"
              : "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <div
            className={cn(
              "pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/25 blur-[80px] transition-opacity duration-500",
              hovering ? "opacity-90" : "opacity-55",
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute bottom-6 left-1/2 h-8 w-[60%] -translate-x-1/2 rounded-full bg-pink-500/25 blur-2xl transition-opacity duration-500",
              hovering ? "opacity-90" : "opacity-50",
            )}
            aria-hidden
          />

          <Image
            src={about.avatar3d}
            alt="Atiksha — 3D avatar"
            width={1536}
            height={1024}
            unoptimized
            className={cn(
              "relative z-[1] h-full w-full object-contain object-center contrast-[1.04] saturate-[1.05] drop-shadow-[0_28px_50px_rgba(244,114,182,0.28)] transition-transform duration-500 [transform:translateZ(12px)]",
              hovering && "scale-[1.03]",
            )}
            sizes="(max-width: 1024px) 480px, 540px"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}

export function AboutSection() {
  return (
    <section className="relative overflow-hidden border-t border-pink-500/[0.08] bg-black pt-20 md:pt-24 lg:pt-28 pb-0">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-pink-500/[0.07] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-fuchsia-500/[0.05] blur-[90px]"
        aria-hidden
      />

      <div className="section-container relative">
        <div>
          <h3 className="font-serif-display text-3xl font-semibold tracking-tight text-pink-100/95 md:text-4xl lg:text-5xl">
            Currently Building
          </h3>

          <div className="mt-8 sm:mt-10">
            <CurrentlyBuildingCard />
          </div>
        </div>

        <div id="about" className="scroll-mt-32 mt-16 pb-4 md:mt-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
              <div className="flex items-center justify-center lg:justify-start">
                <Avatar3D />
              </div>

              <div className="flex flex-col">
                <h2
                  className={cn(
                    cormorant.className,
                    "text-[34px] font-semibold leading-[1.05] text-white md:text-[44px] lg:text-[56px]",
                  )}
                >
                  The Person Behind the
                  <br />
                  Product
                </h2>

                <div className="mt-6 space-y-3">
                  {about.intro.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-base leading-relaxed text-pink-100/55 sm:text-lg"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div id="experience" className="mt-10 scroll-mt-32 space-y-0">
                  {experience.map((item) => (
                    <ExperienceRow
                      key={item.company}
                      role={item.role}
                      company={item.company}
                    />
                  ))}
                </div>

                <div className="mt-8">
                  <ReadMyStoryButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
