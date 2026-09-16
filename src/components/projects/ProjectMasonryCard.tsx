import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project, ProjectCover } from "@/data/projects";
import type { ProjectCategory } from "@/data/recentWork";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const heightMap = {
  sm: "h-[200px] sm:h-[220px]",
  md: "h-[260px] sm:h-[280px]",
  lg: "h-[320px] sm:h-[340px]",
  xl: "h-[380px] sm:h-[400px]",
} as const;

const categoryPillStyles: Record<ProjectCategory, string> = {
  PM: "border-fuchsia-400/35 bg-fuchsia-500/15 text-fuchsia-200",
  SWE: "border-pink-400/35 bg-pink-500/15 text-pink-200",
  AI: "border-violet-400/35 bg-violet-500/15 text-violet-200",
  "Full Stack": "border-rose-400/35 bg-rose-500/15 text-rose-200",
  Systems: "border-indigo-400/30 bg-indigo-500/10 text-indigo-200/90",
};

function ProjectCoverVisual({ cover }: { cover: ProjectCover }) {
  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden transition-transform duration-500 group-hover:scale-[1.04]",
        cover.gradientClass,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(244,114,182,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_75%,rgba(167,139,250,0.14),transparent_50%)]" />

      {cover.motif === "evaluation" ? (
        <div className="absolute inset-x-8 bottom-10 top-14 flex items-end gap-2.5 opacity-50 sm:inset-x-10 sm:gap-3">
          {[38, 62, 48, 78, 55, 88, 44, 70].map((h, i) => (
            <span
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-violet-300/35 to-pink-200/20"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      ) : null}

      {cover.motif === "experiment" ? (
        <svg
          className="absolute inset-6 opacity-45 sm:inset-8"
          viewBox="0 0 320 180"
          fill="none"
          aria-hidden
        >
          <path
            d="M12 140 C 50 130, 70 70, 110 78 C 150 86, 160 40, 200 48 C 240 56, 250 110, 308 28"
            stroke="rgba(251,207,232,0.55)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M12 150 C 60 148, 90 120, 130 118 C 170 116, 190 90, 230 96 C 270 102, 285 70, 308 58"
            stroke="rgba(244,114,182,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 6"
          />
          {[
            [110, 78],
            [200, 48],
            [308, 28],
            [130, 118],
            [230, 96],
          ].map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="rgba(251,207,232,0.7)"
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}

function ProjectCardContent({ project }: { project: Project }) {
  const isPublic = Boolean(project.githubUrl) && !project.isPrivate;
  const hasLink = Boolean(project.href) || isPublic;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border border-pink-400/20 bg-gradient-to-br from-black via-pink-500/[0.05] to-purple-500/[0.05] transition-all duration-300",
        "group-hover:-translate-y-1 group-hover:border-pink-400/60 group-hover:shadow-[0_0_32px_rgba(236,72,153,0.2),0_20px_50px_rgba(0,0,0,0.4)]",
        hasLink && "group-hover:scale-[1.02]",
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden",
          heightMap[project.height],
        )}
      >
        {project.cover ? (
          <ProjectCoverVisual cover={project.cover} />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover brightness-[0.8] saturate-[1.1] transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-[0.85] group-hover:saturate-[1.15]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-950" aria-hidden />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />

        <div className="absolute left-4 top-4">
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md",
              categoryPillStyles[project.category],
            )}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <div>
          <h2
            className={cn(
              cormorant.className,
              "project-page-title bg-gradient-to-r from-white via-pink-200 to-pink-500 bg-clip-text text-xl font-semibold text-transparent transition-all duration-300 sm:text-2xl",
            )}
          >
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-pink-100/50">
            {project.description}
          </p>
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-pink-400/15 bg-pink-500/[0.06] px-2.5 py-1 text-[11px] text-pink-200/55"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.href ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-pink-200/40 transition-all duration-300 group-hover:text-pink-200/90">
            Explore case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : isPublic ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-pink-200/40 transition-all duration-300 group-hover:text-pink-200/90">
            View on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-white/35">
            <Lock className="h-3.5 w-3.5" />
            Private Project
          </span>
        )}
      </div>
    </article>
  );
}

export function ProjectMasonryCard({ project }: { project: Project }) {
  const isPublic = Boolean(project.githubUrl) && !project.isPrivate;
  const href = project.href ?? (isPublic ? project.githubUrl : undefined);
  const isExternal = Boolean(href?.startsWith("http"));

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-6 block break-inside-avoid cursor-pointer"
          aria-label={`${project.title} on GitHub`}
        >
          <ProjectCardContent project={project} />
        </a>
      );
    }

    return (
      <Link
        href={href}
        className="group mb-6 block break-inside-avoid cursor-pointer"
        aria-label={`${project.title} case study`}
      >
        <ProjectCardContent project={project} />
      </Link>
    );
  }

  return (
    <div className="group mb-6 block break-inside-avoid">
      <ProjectCardContent project={project} />
    </div>
  );
}
