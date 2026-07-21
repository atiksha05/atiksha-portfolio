"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type StoryRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function StoryReveal({
  children,
  className,
  delay = 0,
}: StoryRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("story-reveal", className)}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 34,
              rotateX: 2,
              z: -36,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              rotateX: 0,
              z: 0,
              transition: {
                delay,
                duration: 0.65,
                ease: EASE,
              },
            }
      }
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -40px 0px" }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
