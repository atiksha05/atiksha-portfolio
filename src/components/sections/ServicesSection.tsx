import { cn } from "@/lib/utils";

type QuoteCard = {
  type: "quote";
  name: string;
  role: string;
  accent?: boolean;
};

type MetricCard = {
  type: "metric";
  value: string;
  label: string;
  accent?: boolean;
};

type PlaceholderCard = QuoteCard | MetricCard;

const placeholderCards: PlaceholderCard[] = [
  { type: "quote", name: "Mentor Name", role: "Mentor" },
  { type: "quote", name: "Teammate Name", role: "Product Lead" },
  {
    type: "metric",
    value: "—",
    label: "Impact metric coming soon",
    accent: true,
  },
  { type: "metric", value: "—", label: "Outcome metric placeholder" },
  { type: "quote", name: "Colleague Name", role: "Engineering Manager" },
  { type: "quote", name: "Teammate Name", role: "Software Engineer" },
];

function AvatarPlaceholder() {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pink-400/25 bg-pink-500/[0.08] text-xs font-medium text-pink-300/50"
      aria-hidden
    >
      ?
    </div>
  );
}

function QuotePlaceholderCard({
  name,
  role,
  accent,
}: {
  name: string;
  role: string;
  accent?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border p-6 transition-all duration-500 sm:p-7",
        accent
          ? "border-pink-400/30 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-purple-500/10 shadow-[0_0_40px_rgba(244,114,182,0.12)]"
          : "border-pink-400/15 bg-pink-500/[0.03] hover:border-pink-400/35 hover:bg-pink-500/[0.05] hover:shadow-[0_0_32px_rgba(244,114,182,0.18)]",
      )}
    >
      <div className="flex items-center gap-3">
        <AvatarPlaceholder />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-pink-50">{name}</p>
          <p className="truncate text-xs text-pink-300/45">{role}</p>
        </div>
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-pink-100/45 sm:mt-6">
        &ldquo;Review coming soon.&rdquo;
      </p>
    </article>
  );
}

function MetricPlaceholderCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col justify-center rounded-2xl border p-6 transition-all duration-500 sm:p-7",
        accent
          ? "border-pink-400/30 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-purple-500/10 shadow-[0_0_40px_rgba(244,114,182,0.12)]"
          : "border-pink-400/15 bg-pink-500/[0.03] hover:border-pink-400/35 hover:bg-pink-500/[0.05] hover:shadow-[0_0_32px_rgba(244,114,182,0.18)]",
      )}
    >
      <p className="font-serif-display text-5xl text-pink-100 sm:text-6xl">{value}</p>
      <p className="mt-3 text-sm text-pink-200/50">{label}</p>
    </article>
  );
}

export function ServicesSection() {
  return (
    <section className="relative overflow-hidden border-t border-pink-500/[0.08] bg-black py-10 md:py-14 lg:py-20">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-64 w-64 rounded-full bg-pink-500/[0.06] blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <h2 className="font-serif-display text-3xl uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            What People Say About Me
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-pink-100/55 sm:text-base">
            Here&apos;s what colleagues, mentors, and teammates have shared
            about working with me.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {placeholderCards.map((card, index) =>
            card.type === "quote" ? (
              <QuotePlaceholderCard
                key={`${card.name}-${index}`}
                name={card.name}
                role={card.role}
                accent={card.accent}
              />
            ) : (
              <MetricPlaceholderCard
                key={`${card.label}-${index}`}
                value={card.value}
                label={card.label}
                accent={card.accent}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
}
