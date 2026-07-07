"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { about, projectMarquee } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICON_POSITION =
  "absolute left-3 top-5 z-40 sm:left-6 sm:top-8 lg:left-10 lg:top-12";

const MORPH_SPRING = { type: "spring" as const, stiffness: 80, damping: 18 };

type MarqueeProject = (typeof projectMarquee)[number];

function GlassLabel({
  label,
  highlighted,
}: {
  label: string;
  highlighted: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-[92%] items-center gap-1.5 rounded-full border px-5 py-2.5 text-center text-sm font-medium backdrop-blur-md transition-all duration-500",
        highlighted
          ? "scale-100 border-pink-300/70 bg-pink-500/25 text-pink-50 opacity-100 shadow-[0_0_28px_rgba(244,114,182,0.45)]"
          : "scale-[0.97] border-white/20 bg-white/[0.06] text-white/70 opacity-45",
      )}
    >
      <span className="truncate">{label}</span>
      <ArrowUpRight
        className={cn(
          "h-3.5 w-3.5 shrink-0 transition-opacity",
          highlighted ? "text-pink-100 opacity-100" : "opacity-50",
        )}
      />
    </span>
  );
}

function BwColorImage({
  src,
  alt,
  isColorful,
  sizes,
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  isColorful: boolean;
  sizes: string;
  objectPosition?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={cn(
        "object-cover transition-[filter,transform] duration-[800ms] ease-out",
        isColorful
          ? "scale-[1.03] saturate-100 grayscale-0"
          : "scale-100 grayscale contrast-[1.05]",
      )}
      style={{ objectPosition }}
      sizes={sizes}
    />
  );
}

function MarqueeProjectCard({
  project,
  isActive,
  onActivate,
  onDeactivate,
}: {
  project: MarqueeProject;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const isExternal = project.href.startsWith("http");

  return (
    <Link
      href={project.href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="relative z-0 block h-[200px] w-[min(42vw,320px)] shrink-0 overflow-hidden rounded-[1.5rem] bg-zinc-900 sm:h-[228px] sm:w-[340px] lg:h-[248px] lg:w-[360px] lg:rounded-[2rem]"
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      onPointerDown={(e) => {
        if (e.pointerType === "touch") onActivate();
      }}
      aria-label={project.title}
    >
      <BwColorImage
        src={project.image}
        alt={project.title}
        isColorful={isActive}
        sizes="360px"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <GlassLabel label={project.title} highlighted={isActive} />
      </div>
    </Link>
  );
}

function AboutMeEntrance({
  isInView,
  containerRef,
}: {
  isInView: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const morphRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [phase, setPhase] = useState<"icon" | "center">("icon");
  const [skipTransition, setSkipTransition] = useState(false);
  const [targets, setTargets] = useState({ x: 0, y: 0, scale: 8 });

  const computeTargets = useCallback(() => {
    const container = containerRef.current;
    const morphEl = morphRef.current;
    if (!container || !morphEl) return;

    const c = container.getBoundingClientRect();
    const m = morphEl.getBoundingClientRect();
    const iconSize = m.width || 40;

    const iconCenterX = m.left + m.width / 2 - c.left;
    const iconCenterY = m.top + m.height / 2 - c.top;
    const sectionCenterX = c.width / 2;
    const sectionCenterY = c.height * 0.38;

    const targetWidth = Math.min(c.width * 0.78, 400);
    const targetHeight = Math.min(c.height * 0.56, 560);
    const scale = Math.min(
      targetWidth / iconSize,
      targetHeight / iconSize,
      10,
    );

    setTargets({
      x: sectionCenterX - iconCenterX,
      y: sectionCenterY - iconCenterY,
      scale,
    });
  }, [containerRef]);

  useEffect(() => {
    if (!isInView) {
      setPhase("icon");
      setSkipTransition(false);
      return;
    }

    let timeoutId: number;
    const raf = window.requestAnimationFrame(() => {
      computeTargets();
      setSkipTransition(true);
      setPhase("center");
      window.requestAnimationFrame(() => {
        setSkipTransition(false);
        timeoutId = window.setTimeout(() => setPhase("icon"), 320);
      });
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timeoutId);
    };
  }, [isInView, computeTargets]);

  const handleClick = () => {
    document.getElementById("about")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const isCentered = phase === "center";

  return (
    <motion.button
      type="button"
      aria-label="About Me"
      className={cn(ICON_POSITION, "z-40 p-0")}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      animate={phase === "icon" ? { y: [0, -5, 0] } : { y: 0 }}
      transition={{
        y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={phase === "icon" ? { scale: 1.08 } : undefined}
      whileTap={phase === "icon" ? { scale: 0.96 } : undefined}
    >
      <motion.div
        ref={morphRef}
        className={cn(
          "relative h-10 w-10 overflow-hidden rounded-full border-2 sm:h-11 sm:w-11 lg:h-12 lg:w-12",
          hovered && phase === "icon"
            ? "border-pink-300 shadow-[0_0_28px_rgba(244,114,182,0.7),0_0_48px_rgba(244,114,182,0.25)]"
            : "border-pink-400/90 shadow-[0_0_16px_rgba(244,114,182,0.45)]",
        )}
        style={{ borderRadius: 9999 }}
        initial={false}
        animate={{
          x: isCentered ? targets.x : 0,
          y: isCentered ? targets.y : 0,
          scale: isCentered ? targets.scale : 1,
          opacity: 1,
        }}
        transition={
          skipTransition ? { duration: 0 } : MORPH_SPRING
        }
      >
        <Image
          src={about.portrait}
          alt="Atiksha Antil"
          fill
          className={cn(
            "object-cover object-[center_22%] transition-all duration-300",
            hovered && phase === "icon"
              ? "saturate-110 contrast-[1.05]"
              : "saturate-[0.9] contrast-[1.02]",
          )}
          sizes="48px"
        />
      </motion.div>

      <AnimatePresence>
        {hovered && phase === "icon" && (
          <motion.span
            initial={{ opacity: 0, x: -8, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="pointer-events-none absolute left-full top-1/2 z-50 ml-2.5 -translate-y-1/2 whitespace-nowrap rounded-full border border-pink-300/60 bg-pink-500/20 px-3 py-1.5 text-xs font-medium text-pink-50 shadow-[0_0_22px_rgba(244,114,182,0.35)] backdrop-blur-md sm:ml-3 sm:px-4 sm:py-2 sm:text-sm"
          >
            About Me
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function ProjectsStrip() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4, once: false });

  const doubled = [...projectMarquee, ...projectMarquee];

  const activate = (id: string) => {
    setActiveId(id);
    setMarqueePaused(true);
  };

  const deactivate = (id: string) => {
    setActiveId((current) => (current === id ? null : current));
    setMarqueePaused(false);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-black pb-10 pt-2 sm:pb-14 sm:pt-4"
    >
      <div
        ref={containerRef}
        className="relative mx-auto h-[min(62vh,600px)] w-full max-w-[100vw]"
      >
        <AboutMeEntrance isInView={isInView} containerRef={containerRef} />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 flex items-end overflow-hidden">
            <div
              className={cn(
                "animate-projects-marquee flex w-max items-end gap-4 sm:gap-5",
                marqueePaused && "paused",
              )}
            >
              {doubled.map((project, i) => {
                const cardId = `project-${project.id}-${i}`;
                return (
                  <MarqueeProjectCard
                    key={cardId}
                    project={project}
                    isActive={activeId === cardId}
                    onActivate={() => activate(cardId)}
                    onDeactivate={() => deactivate(cardId)}
                  />
                );
              })}
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-24"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-24"
            aria-hidden
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-8">
        <Link
          href="/projects"
          className="text-sm text-white/40 transition-colors hover:text-pink-300/80"
        >
          All Projects →
        </Link>
        <Link
          href="/work-in-progress"
          className="text-sm text-white/40 transition-colors hover:text-pink-300/80"
        >
          Work in Progress →
        </Link>
      </div>
    </section>
  );
}
