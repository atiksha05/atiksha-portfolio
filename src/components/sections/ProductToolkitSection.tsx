import { productToolkit } from "@/data/productToolkit";
import { cn } from "@/lib/utils";

export function ProductToolkitSection() {
  return (
    <section
      id="toolkit"
      className="relative scroll-mt-[calc(var(--navbar-height,76px)+16px)] overflow-x-hidden border-t border-pink-500/[0.08] bg-black py-14 md:py-16"
    >
      <div className="section-container relative">
        <header className="mx-auto max-w-2xl text-center">
          <span className="type-eyebrow">{productToolkit.label}</span>
          <h2 className="type-section-title mt-3">{productToolkit.title}</h2>
          <p className="type-section-desc mx-auto mt-3 max-w-lg">
            {productToolkit.subtitle}
          </p>
        </header>

        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {productToolkit.groups.map((group, index) => (
            <div
              key={group.id}
              className={cn(
                "rounded-3xl border border-pink-400/12 bg-pink-500/[0.03] p-6",
                index === 0 && "border-pink-400/25 bg-pink-500/[0.06]",
              )}
            >
              <h3
                className={cn(
                  "type-meta uppercase tracking-[0.18em]",
                  index === 0 ? "text-pink-300/90" : "text-pink-300/55",
                )}
              >
                {group.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium",
                      index === 0
                        ? "border-pink-400/25 bg-pink-500/10 text-pink-50"
                        : "border-pink-400/15 bg-black/30 text-pink-100/65",
                    )}
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
