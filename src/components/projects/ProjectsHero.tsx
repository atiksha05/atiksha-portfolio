"use client";

import { Cormorant_Garamond, Inter } from "next/font/google";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
});

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectsHero() {
  return (
    <header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, ease }}
        className="h-px w-28 bg-gradient-to-r from-pink-400/90 via-pink-300/50 to-transparent sm:w-36"
        aria-hidden
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease }}
        className={cn(
          cormorant.className,
          "mt-5 text-5xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl",
        )}
      >
        My Work
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.15, ease }}
        className={cn(
          inter.className,
          "mt-6 max-w-3xl text-lg leading-relaxed text-neutral-400 md:text-xl",
        )}
      >
        A collection of products, experiments, and ideas that shaped my journey
        as an engineer and future product manager.
      </motion.p>
    </header>
  );
}
