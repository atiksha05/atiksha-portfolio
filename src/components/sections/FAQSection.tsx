"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqTags, faqs } from "@/lib/data";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden border-t border-pink-500/[0.08] bg-black py-10 md:py-14 lg:py-16">
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-pink-500/[0.05] blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-pink-400/60">
              FAQ&apos;s
            </span>
            <h2 className="font-serif-display mt-3 text-3xl text-white sm:text-4xl lg:text-5xl">
              Answers
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-pink-100/55 sm:text-base">
              Common questions about my background, skills, and what I&apos;m
              looking for.
            </p>

            <div className="relative mt-6 aspect-[4/3] max-h-[280px] overflow-hidden rounded-3xl border border-pink-400/15 bg-zinc-900 sm:max-h-none">
              <Image
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Workspace"
                fill
                className="grayscale-image object-cover transition-all duration-700 hover:grayscale-0 hover:saturate-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {faqTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-pink-400/20 bg-pink-500/[0.06] px-3 py-1.5 text-xs text-pink-200/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="#contact"
              className="glow-button-pink mt-6 inline-flex rounded-full border border-pink-400/30 px-5 py-2.5 text-sm text-pink-50"
            >
              Get in Touch
            </Link>
          </div>

          <div className="w-full space-y-2.5">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className="w-full overflow-hidden rounded-2xl border border-pink-400/15 bg-pink-500/[0.03] transition-colors hover:border-pink-400/25"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-4"
                  >
                    <span className="text-sm font-medium leading-snug text-pink-50/90 sm:text-[0.9375rem]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-pink-400/50 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-4 text-sm leading-relaxed text-pink-100/55 sm:px-6 sm:pb-5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
