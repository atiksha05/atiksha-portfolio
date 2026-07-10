"use client";

import { Cormorant_Garamond, Inter } from "next/font/google";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  howIThinkCards,
  howIThinkSection,
  type HowIThinkCard,
} from "@/data/howIThink";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
});

const ease = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 300, damping: 26 };

function ActiveGlow() {
  return (
    <motion.div
      className="pointer-events-none absolute -inset-1 rounded-3xl"
      animate={{
        opacity: [0.4, 0.75, 0.4],
        scale: [1, 1.02, 1],
      }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(244,114,182,0.35) 0%, transparent 70%)",
        boxShadow: "0 0 48px rgba(244, 114, 182, 0.45)",
      }}
      aria-hidden
    />
  );
}

function ProcessFlashCard({
  card,
  index,
  isActive,
  isAnyActive,
  onSelect,
}: {
  card: HowIThinkCard;
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
  onSelect: () => void;
}) {
  const Icon = card.icon;

  return (
    <motion.article
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "group relative flex w-full cursor-pointer flex-col rounded-3xl border p-5 backdrop-blur-xl outline-none",
        "focus-visible:ring-2 focus-visible:ring-pink-400/50",
        card.cardClass,
        isActive
          ? "z-20 border-pink-400/55 shadow-[0_0_48px_rgba(244,114,182,0.4)]"
          : "z-10 shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:border-pink-400/45 hover:shadow-[0_0_36px_rgba(244,114,182,0.25)]",
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={
        isActive || isAnyActive
          ? SPRING
          : { duration: 0.55, ease, delay: index * 0.08 }
      }
      animate={
        isActive
          ? { opacity: 1, scale: 1.06, rotate: 0, y: -8 }
          : isAnyActive
            ? { opacity: 0.7, scale: 0.97, rotate: card.rotation * 0.4, y: 0 }
            : { opacity: 1, scale: 1, rotate: card.rotation, y: 0 }
      }
      whileHover={
        isActive
          ? { scale: 1.08, rotate: 0, y: -10 }
          : { scale: 1.03, rotate: 0, y: -6 }
      }
    >
      {isActive && <ActiveGlow />}

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-[0.28em]",
              isActive ? "text-pink-300/90" : "text-pink-300/55",
            )}
          >
            {card.number}
          </span>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl border bg-black/25 transition-colors duration-300",
              isActive
                ? "border-pink-400/50 text-pink-100"
                : "border-pink-400/20 text-pink-200/75 group-hover:border-pink-400/40 group-hover:text-pink-100",
            )}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          </div>
        </div>

        <h3
          className={cn(
            cormorant.className,
            "mt-4 text-lg font-semibold leading-tight text-white sm:text-xl",
          )}
        >
          {card.title}
        </h3>
        <p
          className={cn(
            inter.className,
            "mt-2 flex-1 text-sm leading-relaxed",
            isActive ? "text-pink-50/90" : "text-pink-100/55",
          )}
        >
          {card.description}
        </p>
      </div>
    </motion.article>
  );
}

export function ProcessSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="process"
      className="relative overflow-x-hidden border-t border-pink-500/[0.08] bg-black py-16 scroll-mt-32 md:py-20"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-500/[0.07] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 h-56 w-56 rounded-full bg-fuchsia-500/[0.05] blur-[100px]"
        aria-hidden
      />

      <div className="section-container relative">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
        >
          <span className="text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70">
            {howIThinkSection.label}
          </span>
          <h2
            className={cn(
              cormorant.className,
              "mt-3 text-[34px] font-medium leading-[1.08] text-white md:text-[44px] lg:text-[52px]",
            )}
          >
            {howIThinkSection.title}
          </h2>
          <p
            className={cn(
              inter.className,
              "mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-pink-100/55 sm:text-base",
            )}
          >
            {howIThinkSection.subtitle}
          </p>
          <p
            className={cn(
              inter.className,
              "mx-auto mt-2 text-xs italic tracking-wide text-pink-300/45 sm:text-sm",
            )}
          >
            {howIThinkSection.cue}
          </p>
        </motion.header>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:mt-12 lg:grid-cols-5 lg:gap-4 xl:gap-5">
          {howIThinkCards.map((card, index) => (
            <ProcessFlashCard
              key={card.id}
              card={card}
              index={index}
              isActive={activeId === card.id}
              isAnyActive={activeId !== null}
              onSelect={() => handleSelect(card.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
