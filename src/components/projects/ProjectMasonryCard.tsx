import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const heightMap = {
  sm: "h-[200px] sm:h-[220px]",
  md: "h-[260px] sm:h-[280px]",
  lg: "h-[320px] sm:h-[340px]",
  xl: "h-[380px] sm:h-[400px]",
} as const;

export function ProjectMasonryCard({ project }: { project: Project }) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group mb-6 block break-inside-avoid"
      aria-label={`${project.title} on GitHub`}
    >
      <article className="overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
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
            className="object-cover grayscale contrast-[1.05] transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-110 group-hover:grayscale-0 group-hover:saturate-50"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>

        <div className="space-y-3 p-5 sm:p-6">
          <div>
            <h2 className="font-serif-display text-xl text-white sm:text-2xl">
              {project.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/45">
              {project.description}
            </p>
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 text-sm text-white/35 transition-all duration-300 group-hover:text-white/90">
            View on GitHub
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </article>
    </a>
  );
}
