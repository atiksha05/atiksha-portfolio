"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { pmProcessItems } from "@/data/pmProcess";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const [openId, setOpenId] = useState(pmProcessItems[0].id);

  const activeItem =
    pmProcessItems.find((item) => item.id === openId) ?? pmProcessItems[0];

  return (
    <section
      id="process"
      className="relative overflow-hidden border-t border-pink-500/[0.08] bg-black pt-16 lg:min-h-screen lg:max-h-screen"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-pink-500/[0.07] blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-500/[0.05] blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col justify-center px-6 py-10 sm:py-12 lg:min-h-[calc(100vh-96px)] lg:max-h-[calc(100vh-96px)] lg:px-10 lg:py-6">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          {/* Intro — mobile first, desktop right column top */}
          <div className="order-1 lg:order-2 lg:col-start-2 lg:row-start-1">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-pink-400/70">
              How I Think
            </span>
            <h2 className="font-serif-display mt-3 text-[clamp(1.75rem,2.8vw+0.75rem,2.75rem)] leading-[1.12] text-white">
              Building Products From Insight to Impact
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-pink-100/55 sm:text-base">
              I combine user research, product strategy, engineering
              collaboration, and continuous iteration to transform ideas into
              meaningful products.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="#contact"
                className="glow-button-pink rounded-full border border-pink-400/35 bg-pink-500/10 px-5 py-2 text-sm text-pink-50 transition-all hover:bg-pink-500/15 sm:px-6 sm:py-2.5"
              >
                Get in Touch
              </Link>
              <Link
                href="/work-in-progress"
                className="rounded-full border border-pink-400/20 px-5 py-2 text-sm text-pink-200/65 transition-all hover:border-pink-400/40 hover:text-pink-100 sm:px-6 sm:py-2.5"
              >
                View Work in Progress
              </Link>
            </div>
          </div>

          {/* Image — left on desktop */}
          <div className="order-2 lg:order-1 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <div className="relative h-[min(40vh,320px)] w-full overflow-hidden rounded-[1.75rem] border border-pink-400/20 bg-zinc-950 shadow-[0_0_60px_rgba(244,114,182,0.08)] sm:h-[min(44vh,380px)] lg:h-[clamp(420px,58vh,620px)] lg:rounded-[2rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.imageAlt}
                    fill
                    className="object-cover grayscale contrast-[1.05] saturate-[0.85]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-7">
                <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-pink-300/55 sm:text-xs">
                  {activeItem.number} — Product Thinking
                </p>
                <p className="mt-1.5 font-serif-display text-xl text-white sm:mt-2 sm:text-2xl">
                  {activeItem.title}
                </p>
              </div>
            </div>
          </div>

          {/* Accordion — full width on mobile, right column bottom on desktop */}
          <div className="order-3 w-full space-y-2 lg:order-2 lg:col-start-2 lg:row-start-2 lg:max-h-[min(50vh,480px)] lg:overflow-y-auto lg:pr-0.5">
            {pmProcessItems.map((item) => {
              const isOpen = openId === item.id;

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "overflow-hidden rounded-2xl border bg-pink-500/[0.03] backdrop-blur-sm transition-shadow duration-500",
                    isOpen
                      ? "border-pink-400/35 shadow-[0_0_40px_rgba(244,114,182,0.15)]"
                      : "border-pink-400/12 hover:border-pink-400/25 hover:shadow-[0_0_28px_rgba(244,114,182,0.08)]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(item.id)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5 sm:py-4"
                    aria-expanded={isOpen}
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      <span
                        className={cn(
                          "shrink-0 text-xs font-medium tabular-nums transition-colors",
                          isOpen ? "text-pink-300" : "text-pink-400/40",
                        )}
                      >
                        {item.number}
                      </span>
                      <span
                        className={cn(
                          "truncate text-sm font-medium sm:text-base",
                          isOpen ? "text-pink-50" : "text-pink-100/75",
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-pink-400/50 transition-transform duration-300",
                        isOpen && "rotate-180 text-pink-300",
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: {
                            duration: 0.4,
                            ease: [0.23, 1, 0.32, 1],
                          },
                          opacity: { duration: 0.3 },
                        }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: 8 }}
                          animate={{ y: 0 }}
                          exit={{ y: 8 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="space-y-3 px-4 pb-4 sm:px-5 sm:pb-5"
                        >
                          <p className="text-sm leading-relaxed text-pink-100/50">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-pink-400/20 bg-pink-500/[0.08] px-2.5 py-0.5 text-[11px] text-pink-200/70 sm:px-3 sm:py-1 sm:text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
