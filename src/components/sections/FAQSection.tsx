"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useCallback, useMemo, useRef, useState, type PointerEvent } from "react";
import { faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
});

const ease = [0.22, 1, 0.36, 1] as const;

function FloatingDots() {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${6 + ((i * 19) % 88)}%`,
        top: `${8 + ((i * 27) % 84)}%`,
        size: 2 + (i % 3),
        duration: 7 + (i % 5),
        delay: i * 0.35,
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-pink-400/40"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.12, 0.35, 0.12],
          }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function FaqImage({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const x = useTransform(springX, [0, 1], [-8, 8]);
  const y = useTransform(springY, [0, 1], [-6, 6]);

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (reducedMotion || !ref.current) return;
      if (window.innerWidth < 1024) return;
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY, reducedMotion],
  );

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      className="group relative mt-5 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-pink-400/20 bg-zinc-900 shadow-[0_0_0_rgba(244,114,182,0)] transition-[box-shadow,border-color] duration-500 hover:border-pink-400/40 hover:shadow-[0_0_40px_rgba(244,114,182,0.18)] lg:mt-6 lg:aspect-[5/4] lg:max-h-[340px]"
    >
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { x, y }}
      >
        <motion.div
          className="absolute inset-[-6%]"
          animate={
            reducedMotion
              ? undefined
              : { scale: [1, 1.06, 1] }
          }
          transition={
            reducedMotion
              ? undefined
              : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
            alt="Workspace"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 48vw"
          />
        </motion.div>
      </motion.div>

      {/* Pink gradient + vignette */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-pink-950/25 to-black/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.65)]"
        aria-hidden
      />

      {/* Floating glass label */}
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-[260px]">
        <div className="rounded-2xl border border-pink-400/25 bg-black/45 px-4 py-3 backdrop-blur-md">
          <p
            className={cn(
              cormorant.className,
              "text-base font-medium text-white sm:text-lg",
            )}
          >
            Curious about my work?
          </p>
          <p
            className={cn(
              inter.className,
              "mt-1 text-xs leading-relaxed text-pink-100/55",
            )}
          >
            Explore how I combine software engineering, product thinking, and
            leadership to solve meaningful problems.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FaqItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
  reducedMotion,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border backdrop-blur-sm transition-[border-color,box-shadow] duration-300",
        isOpen
          ? "border-pink-400/40 bg-gradient-to-br from-pink-500/15 via-fuchsia-500/10 to-purple-900/20 shadow-[0_0_28px_rgba(244,114,182,0.18)]"
          : "border-pink-400/15 bg-pink-500/[0.03] hover:border-pink-400/30",
      )}
      layout={!reducedMotion}
    >
      {/* Active left light bar */}
      <motion.span
        className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-pink-400"
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          scaleY: isOpen ? 1 : 0.4,
        }}
        transition={{ duration: 0.35, ease }}
        aria-hidden
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
      >
        <span
          className={cn(
            inter.className,
            "shrink-0 text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
            isOpen ? "text-pink-300/90" : "text-pink-400/35",
          )}
        >
          {number}
        </span>

        <span
          className={cn(
            inter.className,
            "faq-question min-w-0 flex-1 text-sm font-semibold leading-snug text-[#f6edf2] sm:text-[0.9375rem] lg:text-[clamp(1rem,1.08vw,1.16rem)]",
          )}
        >
          {question}
        </span>

        <span
          className={cn(
            "relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
            isOpen
              ? "border-pink-400/45 bg-pink-500/15 text-pink-100"
              : "border-pink-400/20 text-pink-300/55",
          )}
          aria-hidden
        >
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isOpen ? 0 : 1,
              rotate: isOpen ? 90 : 0,
              scale: isOpen ? 0.5 : 1,
            }}
            transition={{ duration: 0.35, ease }}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              rotate: isOpen ? 0 : -90,
              scale: isOpen ? 1 : 0.5,
            }}
            transition={{ duration: 0.35, ease }}
          >
            <Minus className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={
              reducedMotion
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            animate={{ opacity: 1, height: "auto" }}
            exit={
              reducedMotion
                ? { opacity: 0, height: 0 }
                : { opacity: 0, height: 0 }
            }
            transition={{ duration: reducedMotion ? 0.15 : 0.4, ease }}
            className="overflow-hidden"
          >
            <p
              className={cn(
                inter.className,
                "faq-answer max-w-[760px] px-4 pb-4 pl-[3.25rem] text-[clamp(0.92rem,1vw,1.05rem)] leading-[1.58] text-[rgba(235,218,228,0.72)] sm:px-5 sm:pb-5 sm:pl-[3.75rem]",
              )}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section
      id="faq"
      className="relative overflow-x-hidden border-t border-pink-500/[0.08] bg-black scroll-mt-32 pt-10 pb-12 md:pt-12 md:pb-12"
    >
      {/* Soft background motion */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-pink-500/[0.06] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-fuchsia-500/[0.05] blur-[100px]"
        aria-hidden
      />
      {!reducedMotion && <FloatingDots />}

      <div className="section-container relative mx-auto max-w-7xl">
        <div className="grid items-start gap-10 lg:grid-cols-[48%_52%] lg:gap-14 xl:gap-16">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease }}
          >
            <span
              className={cn(
                inter.className,
                "text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70",
              )}
            >
              FAQ&apos;s
            </span>
            <h2
              className={cn(
                cormorant.className,
                "mt-3 text-[clamp(2.4rem,5.2vw,4.25rem)] font-medium leading-[0.98] text-white",
              )}
            >
              Quick Answers for Recruiters
            </h2>
            <p
              className={cn(
                inter.className,
                "mt-4 max-w-md text-sm leading-relaxed text-neutral-400 sm:text-base",
              )}
            >
              A quick look at how I think, what I bring, and the opportunities
              I&apos;m excited to pursue.
            </p>

            <FaqImage reducedMotion={reducedMotion} />
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="flex w-full flex-col"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease, delay: 0.08 }}
          >
            <div className="space-y-2.5 sm:space-y-3">
              {faqs.map((faq, index) => (
                <FaqItem
                  key={faq.id}
                  question={faq.question}
                  answer={faq.answer}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() =>
                    setOpenIndex((prev) => (prev === index ? null : index))
                  }
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            <p
              className={cn(
                inter.className,
                "mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-pink-200/45",
              )}
            >
              <span>Still curious?</span>
              <Link
                href="#contact"
                className="group inline-flex items-center gap-1 font-medium text-pink-300/80 transition-colors hover:text-pink-200"
              >
                Let&apos;s talk
                <span
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
