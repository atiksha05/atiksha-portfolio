"use client";

import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { Lock } from "lucide-react";
import { useState } from "react";
import {
  getCategoryStyle,
  recentWorkProjects,
  type RecentWorkProject,
} from "@/data/recentWork";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const cardBaseClass = cn(
  "group relative flex w-[min(88vw,300px)] shrink-0 flex-col overflow-hidden rounded-2xl border bg-zinc-950/80 backdrop-blur-sm transition-all duration-300 sm:w-[320px] md:w-[340px] lg:w-[360px]",
  "hover:-translate-y-2 hover:border-pink-400/45 hover:shadow-[0_0_32px_rgba(244,114,182,0.22),0_16px_48px_rgba(0,0,0,0.45)]",
);

function RecentWorkCard({
  project,
  isActive,
  onActivate,
  onDeactivate,
}: {
  project: RecentWorkProject;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const isPublic = Boolean(project.githubUrl) && !project.isPrivate;
  const href = project.href ?? (isPublic ? project.githubUrl : undefined);
  const isExternal = Boolean(href?.startsWith("http"));

  const cardClass = cn(
    cardBaseClass,
    href ? "cursor-pointer" : "cursor-default",
    isActive
      ? "-translate-y-2 border-pink-400/45 shadow-[0_0_32px_rgba(244,114,182,0.22),0_16px_48px_rgba(0,0,0,0.45)]"
      : "border-pink-400/12 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
  );

  const cardContent = (
    <>
      <div className="relative h-[140px] overflow-hidden sm:h-[150px]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={cn(
            "object-cover transition-all duration-300",
            isActive
              ? "scale-[1.03] grayscale-0 saturate-110"
              : "grayscale contrast-[1.05] group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:saturate-110",
          )}
          sizes="360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
              getCategoryStyle(project.category),
            )}
          >
            {project.category}
          </span>
          {project.isPrivate && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/55 backdrop-blur-md">
              <Lock className="h-2.5 w-2.5" />
              Private
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3
          className={cn(
            cormorant.className,
            "project-title-gradient text-lg font-semibold leading-tight transition-all duration-300 group-hover:brightness-125 sm:text-xl md:text-2xl",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-pink-100/50 sm:text-sm">
          {project.impact}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-pink-400/15 bg-pink-500/[0.06] px-2 py-0.5 text-[10px] text-pink-200/60 sm:text-[11px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const interactionProps = {
    onMouseEnter: onActivate,
    onMouseLeave: onDeactivate,
    onFocus: onActivate,
    onBlur: onDeactivate,
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === "touch") onActivate();
    },
  };

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cardClass}
          aria-label={`Open ${project.title}`}
          {...interactionProps}
        >
          {cardContent}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={cardClass}
        aria-label={`Open ${project.title}`}
        {...interactionProps}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <article className={cardClass} {...interactionProps}>
      {cardContent}
    </article>
  );
}

export function ProjectsStrip() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);

  const doubled = [...recentWorkProjects, ...recentWorkProjects];

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
      id="projects"
      className="relative scroll-mt-[calc(var(--navbar-height,76px)+16px)] overflow-hidden bg-black pb-6 pt-6 sm:pb-8 sm:pt-8"
    >
      <div className="section-container mb-6 sm:mb-8">
        <h2 className="text-center font-serif-display text-3xl text-white sm:text-4xl">
          Things I&apos;ve Built
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className={cn(
            "animate-projects-marquee flex w-max items-stretch gap-4 px-4 sm:gap-5 sm:px-6 md:px-8",
            marqueePaused && "paused",
          )}
        >
          {doubled.map((project, i) => {
            const cardId = `${project.id}-${i}`;
            return (
              <RecentWorkCard
                key={cardId}
                project={project}
                isActive={activeId === cardId}
                onActivate={() => activate(cardId)}
                onDeactivate={() => deactivate(cardId)}
              />
            );
          })}
        </div>

        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black via-black/90 to-transparent sm:w-20 md:w-28"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black via-black/90 to-transparent sm:w-20 md:w-28"
          aria-hidden
        />
      </div>

      <div className="mt-6 flex justify-center sm:mt-8">
        <Link
          href="/projects"
          className="text-sm text-white/40 transition-colors duration-300 hover:text-pink-300/80"
        >
          All Projects →
        </Link>
      </div>
    </section>
  );
}
