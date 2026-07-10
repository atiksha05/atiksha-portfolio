"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { studySyncAi } from "@/data/studySyncAi";
import {
  StudySync3DShowcase,
  useTiltInteraction,
} from "@/components/studysync/StudySync3DShowcase";
import { cn } from "@/lib/utils";

export function CurrentlyBuildingCard() {
  const {
    ref,
    isHovering,
    setIsHovering,
    enableTilt,
    rotateX,
    rotateY,
    handleMove,
    handleLeave,
  } = useTiltInteraction();

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href={`/projects/${studySyncAi.slug}`}
        className="group block"
        aria-label={`${studySyncAi.title} — explore case study`}
      >
        <article
          ref={ref}
          onMouseEnter={() => setIsHovering(true)}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-pink-400/20",
            "bg-gradient-to-b from-zinc-950/90 via-black to-black",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset]",
            "transition-[border-color,box-shadow] duration-500",
            "hover:border-pink-400/50",
            isHovering &&
              "shadow-[0_0_64px_rgba(236,72,153,0.22),0_32px_80px_rgba(0,0,0,0.55)]",
          )}
        >
          {/* Ambient layers */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(236,72,153,0.12),transparent_70%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-purple-500/10 blur-[90px]"
            aria-hidden
          />

          {/* 3D showcase */}
          <div className="relative px-4 pb-2 pt-6 sm:px-8 sm:pt-10 lg:px-12 lg:pt-12">
            <StudySync3DShowcase
              isHovering={isHovering}
              rotateX={rotateX}
              rotateY={rotateY}
              enableTilt={enableTilt}
            />
          </div>

          {/* Product launch copy */}
          <div className="relative border-t border-white/[0.06] px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
            <div className="flex flex-wrap gap-2">
              {studySyncAi.showcaseTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-pink-100/85 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h4 className="mt-5 font-serif-display text-3xl text-white sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {studySyncAi.title}
            </h4>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
              {studySyncAi.subtitle}
            </p>

            <motion.span
              className={cn(
                "mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium",
                "border-pink-400/25 bg-pink-500/[0.08] text-pink-100/80",
                "transition-all duration-300",
                isHovering &&
                  "border-pink-400/50 bg-pink-500/15 text-pink-50 shadow-[0_0_28px_rgba(236,72,153,0.25)]",
              )}
              animate={{ x: isHovering ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              Explore Case Study
              <span aria-hidden>→</span>
            </motion.span>
          </div>
        </article>
      </Link>
    </div>
  );
}
