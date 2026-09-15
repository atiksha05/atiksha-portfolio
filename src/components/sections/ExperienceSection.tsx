import { experienceItems, experienceSection } from "@/data/experience";
import { cn } from "@/lib/utils";

const cardInteractive =
  "transition-[transform,border-color,background-color,box-shadow,color] duration-300 ease-out " +
  "hover:-translate-y-[3px] hover:border-pink-400/40 hover:bg-pink-500/[0.09] " +
  "hover:shadow-[0_8px_28px_rgba(244,114,182,0.12)] " +
  "focus-visible:outline-none focus-visible:-translate-y-[3px] focus-visible:border-pink-400/40 " +
  "focus-visible:bg-pink-500/[0.09] focus-visible:shadow-[0_8px_28px_rgba(244,114,182,0.12)] " +
  "focus-visible:ring-2 focus-visible:ring-pink-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-[calc(var(--navbar-height,76px)+16px)] overflow-x-clip border-t border-pink-500/[0.08] bg-black py-12 sm:py-16 md:py-20"
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

        <div className="mx-auto mt-8 max-w-3xl space-y-3.5 sm:mt-10 sm:space-y-4">
          {experienceItems.map((item) => {
            const isPrimary = item.priority !== "secondary";

            return (
              <article
                key={item.id}
                tabIndex={0}
                aria-label={`${item.role} at ${item.organization}`}
                className={cn(
                  "group experience-card min-w-0 cursor-default rounded-[1.35rem] border border-pink-400/18 bg-pink-500/[0.04] p-4 sm:rounded-3xl sm:p-6",
                  cardInteractive,
                )}
              >
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
                  <div className="min-w-0">
                    <p className="type-meta uppercase tracking-[0.16em] text-pink-400/65 transition-colors duration-300 group-hover:text-pink-300/85 group-focus-visible:text-pink-300/85">
                      {item.category}
                    </p>
                    <h3
                      className={cn(
                        "font-display mt-1 break-words tracking-[-0.03em] text-white",
                        isPrimary
                          ? "text-lg font-semibold sm:text-2xl"
                          : "text-base font-semibold sm:text-xl",
                      )}
                    >
                      {item.role}
                    </h3>
                    <p className="type-body mt-1 break-words text-[0.9375rem] text-pink-100/68 transition-colors duration-300 group-hover:text-pink-100/80 group-focus-visible:text-pink-100/80 sm:text-sm">
                      {item.organization}
                    </p>
                  </div>
                  {item.period ? (
                    <p className="type-meta shrink-0 text-pink-100/55 transition-colors duration-300 group-hover:text-pink-100/70 group-focus-visible:text-pink-100/70 sm:pt-1 sm:text-right">
                      {item.period}
                    </p>
                  ) : null}
                </div>

                <ul className="type-body mt-3.5 space-y-2 text-[0.9375rem] leading-relaxed text-pink-100/68 sm:mt-4 sm:text-sm">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-pink-400/60 transition-colors duration-300 group-hover:bg-pink-400/90 group-focus-visible:bg-pink-400/90"
                        aria-hidden
                      />
                      <span className="min-w-0">{bullet}</span>
                    </li>
                  ))}
                </ul>

                {item.tags && item.tags.length > 0 ? (
                  <div className="mt-3.5 flex flex-wrap gap-2 sm:mt-4">
                    {item.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-pink-400/18 bg-black/25 px-2.5 py-1 text-[11px] font-medium text-pink-100/68 transition-[border-color,background-color,color] duration-300 group-hover:border-pink-400/30 group-hover:bg-pink-500/10 group-hover:text-pink-100/85 group-focus-visible:border-pink-400/30 group-focus-visible:bg-pink-500/10 group-focus-visible:text-pink-100/85"
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
