"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import type { WipProject } from "@/data/wipProjects";
import { cn } from "@/lib/utils";

type WipProjectCardProps = {
  project: WipProject;
  featured?: boolean;
  index?: number;
};

function StatusDot() {
  return (
    <span className="relative flex h-2 w-2 shrink-0">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
    </span>
  );
}

export function WipProjectCard({
  project,
  featured = false,
  index = 0,
}: WipProjectCardProps) {
  const hasGithub = Boolean(project.githubUrl) && !project.comingSoon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-pink-400/15 bg-pink-500/[0.04] backdrop-blur-md transition-all duration-500",
        "hover:border-pink-400/35 hover:shadow-[0_0_56px_rgba(244,114,182,0.22),0_24px_80px_rgba(0,0,0,0.45)]",
        featured && "lg:rounded-[2rem]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]",
        )}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:scale-[1.06] group-hover:brightness-110 group-hover:grayscale-0 group-hover:saturate-110"
          sizes={
            featured
              ? "100vw"
              : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

        <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2 sm:left-6 sm:top-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/20 px-3 py-1.5 text-xs font-medium text-pink-100 backdrop-blur-md">
            <StatusDot />
            In Progress
          </span>
          {project.comingSoon && (
            <span className="rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white/60 backdrop-blur-md">
              Coming Soon
            </span>
          )}
        </div>
      </div>

      <div className="relative p-5 transition-transform duration-500 group-hover:-translate-y-1 sm:p-6 lg:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 flex-1">
            <h2
              className={cn(
                "font-serif-display text-white",
                featured ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl",
              )}
            >
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-pink-100/55 sm:text-base">
              {project.description}
            </p>
          </div>

          <p className="shrink-0 text-right font-medium tabular-nums text-pink-300">
            {project.progress}%
          </p>
        </div>

        <div className="mt-5">
          <div className="h-2 overflow-hidden rounded-full bg-pink-500/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-pink-400 to-fuchsia-400 shadow-[0_0_16px_rgba(244,114,182,0.5)]"
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-pink-400/20 bg-pink-500/[0.08] px-3 py-1 text-xs text-pink-200/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            href={`/work-in-progress#${project.id}`}
            className="glow-button-pink inline-flex items-center justify-center gap-2 rounded-full border border-pink-400/35 bg-pink-500/10 px-5 py-2.5 text-sm text-pink-50 transition-all hover:bg-pink-500/15"
          >
            View Progress
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {hasGithub ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-pink-400/20 bg-white/[0.04] px-5 py-2.5 text-sm text-pink-200/80 transition-all hover:border-pink-400/40 hover:text-pink-100"
            >
              <Code2 className="h-4 w-4" />
              GitHub
            </a>
          ) : (
            <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2.5 text-sm text-white/30">
              <Code2 className="h-4 w-4" />
              GitHub
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
