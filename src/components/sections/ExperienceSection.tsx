import { experienceItems, experienceSection } from "@/data/experience";
import { cn } from "@/lib/utils";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-[calc(var(--navbar-height,76px)+16px)] overflow-x-hidden border-t border-pink-500/[0.08] bg-black py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-56 w-56 rounded-full bg-fuchsia-500/[0.05] blur-[90px]"
        aria-hidden
      />

      <div className="section-container relative">
        <header className="mx-auto max-w-2xl text-center">
          <span className="type-eyebrow">{experienceSection.label}</span>
          <h2 className="type-section-title mt-3">{experienceSection.title}</h2>
          <p className="type-section-desc mx-auto mt-4 max-w-xl">
            {experienceSection.subtitle}
          </p>
        </header>

        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {experienceItems.map((item) => {
            const isPrimary = item.priority !== "secondary";

            return (
              <article
                key={item.id}
                className={cn(
                  "rounded-3xl border p-5 sm:p-6",
                  isPrimary
                    ? "border-pink-400/22 bg-pink-500/[0.05]"
                    : "border-pink-400/10 bg-pink-500/[0.025]",
                )}
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="type-meta uppercase tracking-[0.16em] text-pink-400/60">
                      {item.category}
                    </p>
                    <h3
                      className={cn(
                        "font-display mt-1 tracking-[-0.03em] text-white",
                        isPrimary
                          ? "text-xl font-semibold sm:text-2xl"
                          : "text-lg font-semibold sm:text-xl",
                      )}
                    >
                      {item.role}
                    </h3>
                    <p className="type-body mt-1 text-sm text-pink-100/55">
                      {item.organization}
                    </p>
                  </div>
                  {item.period ? (
                    <p className="type-meta shrink-0 sm:pt-1 sm:text-right">
                      {item.period}
                    </p>
                  ) : null}
                </div>

                <ul className="type-body mt-4 space-y-2 text-sm leading-relaxed text-pink-100/60">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pink-400/50"
                        aria-hidden
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {item.tags && item.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-pink-400/15 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-pink-100/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
