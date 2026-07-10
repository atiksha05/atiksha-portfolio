import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Lock } from "lucide-react";
import { studySyncAi } from "@/data/studySyncAi";
import { StudySyncDashboardMockup } from "@/components/studysync/StudySyncDashboardMockup";
import { cn } from "@/lib/utils";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium uppercase tracking-[0.28em] text-pink-400/60">
      {children}
    </p>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 font-serif-display text-3xl text-white sm:text-4xl",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function StudySyncCaseStudy() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-pink-300/70 transition-colors hover:text-pink-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back Home
        </Link>

        <div className="mt-10 max-w-4xl">
          <SectionLabel>{studySyncAi.eyebrow}</SectionLabel>
          <h1 className="mt-4 font-serif-display text-4xl leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {studySyncAi.heroHeadline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            {studySyncAi.heroSubheadline}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {studySyncAi.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-pink-200/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div
            className="pointer-events-none absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-pink-500/15 via-transparent to-purple-500/15 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-5xl">
            <StudySyncDashboardMockup />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>01 — Problem</SectionLabel>
        <SectionTitle>{studySyncAi.problem.title}</SectionTitle>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-400">
          {studySyncAi.problem.body}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {studySyncAi.problem.points.map((point) => (
            <div
              key={point}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-sm leading-relaxed text-pink-100/55"
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      {/* Solution */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>02 — Solution</SectionLabel>
        <SectionTitle>{studySyncAi.solution.title}</SectionTitle>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-400">
          {studySyncAi.solution.body}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {studySyncAi.solution.highlights.map((item, i) => (
            <div
              key={item}
              className="group rounded-2xl border border-pink-400/15 bg-gradient-to-br from-pink-500/[0.06] to-purple-500/[0.04] p-6 transition-colors hover:border-pink-400/30"
            >
              <span className="text-xs font-medium text-pink-400/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-base leading-relaxed text-pink-50/80">
                {item}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* User Personas */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>03 — User Personas</SectionLabel>
        <SectionTitle>Designed for real ambition</SectionTitle>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {studySyncAi.personas.map((persona) => (
            <article
              key={persona.name}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/20 text-sm font-semibold text-pink-100">
                {persona.name[0]}
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">
                {persona.name}
              </h3>
              <p className="mt-1 text-sm text-pink-300/60">{persona.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                <span className="text-pink-200/70">Goal:</span> {persona.goal}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                <span className="text-pink-200/70">Pain:</span> {persona.pain}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Core Features */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>04 — Core Features</SectionLabel>
        <SectionTitle>Nine widgets. One workspace.</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {studySyncAi.coreFeatures.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/[0.06] bg-black/40 p-5 transition-all hover:border-pink-400/25 hover:bg-pink-500/[0.03]"
            >
              <h3 className="text-sm font-medium text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Thinking */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>05 — Product Thinking</SectionLabel>
        <SectionTitle>Clarity over configurability</SectionTitle>
        <div className="mt-8 rounded-2xl border border-pink-400/15 bg-gradient-to-br from-pink-500/[0.05] via-black to-purple-500/[0.05] p-8 sm:p-10">
          <p className="max-w-3xl text-lg leading-relaxed text-pink-100/60">
            {studySyncAi.productThinking}
          </p>
        </div>
      </section>

      {/* Technical Architecture */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>06 — Technical Architecture</SectionLabel>
        <SectionTitle>Built to ship and scale</SectionTitle>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-400">
          {studySyncAi.technicalArchitecture.summary}
        </p>
        <div className="mt-10 space-y-3">
          {studySyncAi.technicalArchitecture.layers.map((layer, i) => (
            <div
              key={layer.name}
              className="flex flex-col gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-pink-400/50">
                Layer {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-white">{layer.name}</h3>
                <p className="mt-1 text-sm text-neutral-500">{layer.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {studySyncAi.technicalArchitecture.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-sm text-neutral-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* AI Workflow */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>07 — AI Workflow</SectionLabel>
        <SectionTitle>From data to action</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-5">
          {studySyncAi.aiWorkflow.map((step, i) => (
            <div key={step.step} className="relative">
              <div className="rounded-2xl border border-pink-400/15 bg-pink-500/[0.04] p-5">
                <span className="text-xs font-medium text-pink-400/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-white">
                  {step.step}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  {step.detail}
                </p>
              </div>
              {i < studySyncAi.aiWorkflow.length - 1 && (
                <span
                  className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-pink-400/30 sm:block"
                  aria-hidden
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>08 — Roadmap</SectionLabel>
        <SectionTitle>Shipping in phases</SectionTitle>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {studySyncAi.roadmap.map((phase) => (
            <div
              key={phase.phase}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            >
              <span className="inline-flex rounded-full border border-pink-400/25 bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-200/80">
                {phase.phase}
              </span>
              <ul className="mt-5 space-y-3">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-neutral-400"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-pink-400/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Results & Future Vision */}
      <section className="mt-24 sm:mt-32">
        <SectionLabel>09 — Results & Future Vision</SectionLabel>
        <SectionTitle>{studySyncAi.resultsAndVision.title}</SectionTitle>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {studySyncAi.resultsAndVision.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-pink-400/20 bg-gradient-to-br from-pink-500/10 to-purple-500/5 p-6 text-center"
            >
              <p className="font-serif-display text-4xl text-white">
                {metric.value}
              </p>
              <p className="mt-2 text-sm text-neutral-500">{metric.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-neutral-400">
          {studySyncAi.resultsAndVision.body}
        </p>
        <blockquote className="mt-8 border-l-2 border-pink-400/40 pl-6">
          <p className="text-xl leading-relaxed text-pink-100/70 sm:text-2xl">
            &ldquo;{studySyncAi.resultsAndVision.vision}&rdquo;
          </p>
        </blockquote>
      </section>

      {/* Footer CTA */}
      <div className="mt-20 flex flex-wrap gap-4 border-t border-white/[0.06] pt-12">
        {studySyncAi.githubUrl && !studySyncAi.isPrivate ? (
          <a
            href={studySyncAi.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-pink-400/35 bg-pink-500/10 px-6 py-3 text-sm font-medium text-pink-50 transition-all hover:border-pink-400/55 hover:bg-pink-500/15"
          >
            View on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm text-white/45">
            <Lock className="h-4 w-4" />
            Private repository
          </span>
        )}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white/75 transition-all hover:border-white/35 hover:text-white"
        >
          All Projects
        </Link>
      </div>
    </>
  );
}
