"use client";

import { CurrentlyBuildingCard } from "@/components/sections/CurrentlyBuildingCard";
import { PersonBehindProduct } from "@/components/sections/PersonBehindProduct";

export function AboutSection() {
  return (
    <>
      <section className="relative overflow-x-hidden border-t border-pink-500/[0.08] bg-black pt-20 md:pt-24 lg:pt-28 pb-0">
        <div
          className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-pink-500/[0.07] blur-[100px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-fuchsia-500/[0.05] blur-[90px]"
          aria-hidden
        />

        <div className="section-container relative">
          <h3
            id="currently-building"
            className="scroll-mt-32 font-serif-display text-3xl font-semibold tracking-tight text-pink-100/95 md:text-4xl lg:text-5xl"
          >
            Currently Building
          </h3>

          <div className="mt-8 sm:mt-10">
            <CurrentlyBuildingCard />
          </div>
        </div>
      </section>

      <PersonBehindProduct />
    </>
  );
}
