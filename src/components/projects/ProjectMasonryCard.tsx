import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "@/data/projects";
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
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover brightness-[0.8] saturate-[1.1] transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-[0.85] group-hover:saturate-[1.15]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
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
