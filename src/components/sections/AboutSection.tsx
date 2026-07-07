"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowDown } from "lucide-react";
import { useRef, useState } from "react";
import { about, experience, projects, skillTags } from "@/lib/data";
import { cn } from "@/lib/utils";

function ExperienceRow({
  role,
  company,
  period,
}: {
  role: string;
  company: string;
  period: string;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 border-t border-pink-400/15 py-4 text-sm transition-colors hover:bg-pink-500/[0.03]">
      <span className="text-pink-50/85">{role}</span>
      <span className="text-pink-200/45">{company}</span>
      <span className="text-right text-pink-200/35">{period}</span>
    </div>
  );
}

function MyStoryButton() {
  return (
    <Link
      href="/story"
      className="group flex justify-center py-10 transition-all"
    >
      <span className="inline-flex rounded-full border border-pink-400/50 bg-pink-500/10 px-12 py-4 text-sm font-bold uppercase tracking-[0.45em] text-pink-200 shadow-[0_0_40px_rgba(244,114,182,0.2)] transition-all group-hover:scale-105 group-hover:border-pink-300/70 group-hover:text-pink-50 group-hover:shadow-[0_0_56px_rgba(244,114,182,0.35)]">
        My Story
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
      <div
        className="relative h-[min(72vh,680px)] w-[min(94vw,420px)] sm:w-[480px] lg:h-[min(78vh,740px)] lg:w-[540px] [transform-style:preserve-3d] will-change-transform"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(${hovering ? 20 : 6}px)`,
          transition: hovering
            ? "transform 0.12s ease-out"
            : "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        <div
          className={cn(
            "pointer-events-none absolute bottom-6 left-1/2 h-6 w-[55%] -translate-x-1/2 rounded-full bg-pink-500/20 blur-xl transition-opacity duration-500",
            hovering ? "opacity-80" : "opacity-40",
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
            "relative z-[1] h-full w-full object-contain object-center contrast-[1.04] saturate-[1.05] drop-shadow-[0_28px_50px_rgba(244,114,182,0.22)] transition-transform duration-500 [transform:translateZ(12px)]",
            hovering && "scale-[1.03]",
          )}
          sizes="(max-width: 1024px) 480px, 540px"
          priority
        />
      </div>
    </div>
  );
}

export function AboutSection() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visible = projects.slice(0, 5);

  const prev = () =>
    setCarouselIndex((i) => (i === 0 ? visible.length - 1 : i - 1));
  const next = () =>
    setCarouselIndex((i) => (i === visible.length - 1 ? 0 : i + 1));

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-pink-500/[0.08] bg-black py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-pink-500/[0.07] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-0 h-64 w-64 rounded-full bg-fuchsia-500/[0.05] blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex min-h-0 items-center justify-center lg:justify-start">
            <Avatar3D />
          </div>

          <div className="flex flex-col">
            <h2 className="font-serif-display text-4xl text-white sm:text-5xl md:text-6xl">
              {about.title}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-pink-100/55 sm:text-lg">
              {about.bio}
            </p>

            <div className="mt-10 overflow-hidden">
              <div className="animate-marquee flex w-max gap-3">
                {[...skillTags, ...skillTags].map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="rounded-full border border-pink-400/20 bg-pink-500/[0.06] px-4 py-2 text-xs text-pink-200/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div id="experience" className="mt-12 space-y-0">
              {experience.map((item) => (
                <ExperienceRow key={item.company} {...item} />
              ))}
            </div>

            <MyStoryButton />
          </div>
        </div>

        <div className="mt-20 sm:mt-24">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-medium tracking-wide text-pink-100/90">
                Work In Progress
              </h3>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-pink-400/25 bg-pink-500/[0.05]">
                <ArrowDown className="h-4 w-4 text-pink-300/70" />
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous project"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-400/25 text-pink-300/70 transition-colors hover:border-pink-400/50 hover:text-pink-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next project"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-400/25 text-pink-300/70 transition-colors hover:border-pink-400/50 hover:text-pink-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-pink-400/15">
            <Link href={visible[carouselIndex].href} className="group block">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-900 sm:aspect-[21/9]">
                <Image
                  src={visible[carouselIndex].image}
                  alt={visible[carouselIndex].title}
                  fill
                  className="object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:scale-[1.02] group-hover:grayscale-0 group-hover:saturate-110"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-xs uppercase tracking-widest text-pink-300/50">
                    {String(carouselIndex + 1).padStart(2, "0")} /{" "}
                    {String(visible.length).padStart(2, "0")}
                  </p>
                  <h4 className="mt-2 font-serif-display text-3xl text-white sm:text-4xl">
                    {visible[carouselIndex].title}
                  </h4>
                  <p className="mt-2 text-pink-200/50">
                    {visible[carouselIndex].description}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
