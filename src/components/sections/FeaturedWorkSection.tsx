import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  featuredCaseStudies,
  featuredWorkSection,
  type FeaturedCaseStudy,
} from "@/data/featuredWork";
import { cn } from "@/lib/utils";

function CaseStudyCard({ project }: { project: FeaturedCaseStudy }) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div>
          {project.featured && (
            <span className="type-meta uppercase tracking-[0.18em] text-pink-400/75">
              Flagship
            </span>
          )}
          <h3 className="font-display mt-1 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="type-body mt-2 text-sm text-pink-100/70">{project.tagline}</p>
        </div>
        {project.href ? (
          <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-400/25 text-pink-200/70">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        ) : null}
      </div>

      <dl className="type-body mt-6 space-y-4 text-sm">
        <div>
          <dt className="type-meta uppercase tracking-[0.16em] text-pink-400/55">
            Problem
          </dt>
          <dd className="mt-1.5 leading-relaxed text-pink-100/60">{project.problem}</dd>
        </div>
        <div>
          <dt className="type-meta uppercase tracking-[0.16em] text-pink-400/55">
            Solution
          </dt>
          <dd className="mt-1.5 leading-relaxed text-pink-100/60">{project.solution}</dd>
        </div>
        <div>
          <dt className="type-meta uppercase tracking-[0.16em] text-pink-400/55">
            Role
          </dt>
          <dd className="mt-1.5 text-pink-100/75">{project.role}</dd>
        </div>
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-pink-400/20 bg-pink-500/[0.07] px-2.5 py-1 text-[11px] font-medium text-pink-100/75"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-pink-400/10 pt-4">
        <p className="type-meta text-[11px]">{project.stack.join(" · ")}</p>
        <span className="text-xs font-semibold text-pink-200/80">
          {project.ctaLabel}
          {project.href ? " →" : ""}
        </span>
      </div>
    </>
  );

  const className = cn(
    "flex h-full flex-col rounded-3xl border border-pink-400/15 bg-gradient-to-br from-pink-500/[0.07] via-black/40 to-purple-950/20 p-6 sm:p-7",
    "transition-[border-color,box-shadow] duration-300",
    project.href &&
      "hover:border-pink-400/35 hover:shadow-[0_0_40px_rgba(244,114,182,0.12)]",
    project.featured && "border-pink-400/30 sm:col-span-2 lg:col-span-1",
  );

  if (project.href) {
    return (
      <Link href={project.href} className={className}>
        {inner}
      </Link>
    );
  }

  return <article className={className}>{inner}</article>;
}

export function FeaturedWorkSection() {
  return (
    <section
      id="work"
      className="relative scroll-mt-[calc(var(--navbar-height,76px)+16px)] overflow-x-hidden border-t border-pink-500/[0.08] bg-black py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full bg-pink-500/[0.05] blur-[100px]"
        aria-hidden
      />

      <div className="section-container relative">
        <header className="mx-auto max-w-2xl text-center">
          <span className="type-eyebrow">{featuredWorkSection.label}</span>
          <h2 className="type-section-title mt-3">{featuredWorkSection.title}</h2>
          <p className="type-section-desc mx-auto mt-4 max-w-xl">
            {featuredWorkSection.subtitle}
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {featuredCaseStudies.map((project) => (
            <CaseStudyCard key={project.id} project={project} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={featuredWorkSection.allProjectsHref}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-pink-200/80 transition-colors hover:text-pink-50"
          >
            {featuredWorkSection.allProjectsLabel}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
