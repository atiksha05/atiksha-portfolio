import { productToolkit } from "@/data/productToolkit";
import { cn } from "@/lib/utils";

const cardInteractive =
  "transition-[transform,border-color,background-color,box-shadow,color] duration-300 ease-out " +
  "hover:-translate-y-[3px] hover:border-pink-400/40 hover:bg-pink-500/[0.09] " +
  "hover:shadow-[0_8px_28px_rgba(244,114,182,0.12)] " +
  "focus-visible:outline-none focus-visible:-translate-y-[3px] focus-visible:border-pink-400/40 " +
  "focus-visible:bg-pink-500/[0.09] focus-visible:shadow-[0_8px_28px_rgba(244,114,182,0.12)] " +
  "focus-visible:ring-2 focus-visible:ring-pink-400/35 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export function ProductToolkitSection() {
  return (
    <section
      id="toolkit"
      className="relative scroll-mt-[calc(var(--navbar-height,76px)+16px)] overflow-x-clip border-t border-pink-500/[0.08] bg-black py-12 sm:py-14 md:py-16"
    >
      <div className="section-container relative">
        <header className="mx-auto max-w-2xl text-center">
          <span className="type-eyebrow">{productToolkit.label}</span>
          <h2 className="type-section-title mt-3">{productToolkit.title}</h2>
          <p className="type-section-desc mx-auto mt-3 max-w-lg">
            {productToolkit.subtitle}
          </p>
        </header>

        <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3 md:gap-6">
          {productToolkit.groups.map((group) => (
            <div
              key={group.id}
              tabIndex={0}
              aria-label={`${group.title} skills`}
              className={cn(
                "group toolkit-card min-w-0 cursor-default rounded-[1.35rem] border border-pink-400/15 bg-pink-500/[0.04] p-4 sm:rounded-3xl sm:p-6",
                cardInteractive,
              )}
            >
              <h3 className="type-meta uppercase tracking-[0.18em] text-pink-300/70 transition-colors duration-300 group-hover:text-pink-200 group-focus-visible:text-pink-200">
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-pink-400/15 bg-black/30 px-3 py-1.5 text-xs font-medium text-pink-100/70 transition-[border-color,background-color,color] duration-300 group-hover:border-pink-400/30 group-hover:bg-pink-500/10 group-hover:text-pink-50 group-focus-visible:border-pink-400/30 group-focus-visible:bg-pink-500/10 group-focus-visible:text-pink-50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
