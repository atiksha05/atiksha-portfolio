import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle2,
  FileText,
  FolderKanban,
  LayoutGrid,
  MessageSquare,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

type StudySyncDashboardMockupProps = {
  className?: string;
  compact?: boolean;
};

function Widget({
  title,
  icon: Icon,
  children,
  className,
  accent = "pink",
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  accent?: "pink" | "purple" | "violet";
}) {
  const accentMap = {
    pink: "from-pink-500/20 to-pink-500/5 border-pink-400/20",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-400/20",
    violet: "from-violet-500/20 to-violet-500/5 border-violet-400/20",
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-gradient-to-br p-2.5 sm:p-3",
        accentMap[accent],
        className,
      )}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06]">
          <Icon className="h-3 w-3 text-pink-300/80" />
        </div>
        <span className="truncate text-[9px] font-medium text-white/75 sm:text-[10px]">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

export function StudySyncDashboardMockup({
  className,
  compact = false,
}: StudySyncDashboardMockupProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0b] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_80px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 sm:px-4">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/10 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-white/10 sm:h-2.5 sm:w-2.5" />
        </div>
        <div className="mx-auto flex h-5 max-w-[200px] flex-1 items-center justify-center rounded-md border border-white/[0.06] bg-black/40 px-2 sm:max-w-xs sm:h-6">
          <span className="truncate text-[8px] text-white/30 sm:text-[9px]">
            app.studysync.ai/workspace
          </span>
        </div>
      </div>

      <div className={cn("flex", compact ? "min-h-[220px]" : "min-h-[280px] sm:min-h-[340px]")}>
        {/* Sidebar */}
        <aside className="hidden w-[52px] shrink-0 border-r border-white/[0.06] bg-black/40 p-2 sm:block sm:w-14">
          <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/30 to-purple-500/20">
            <Sparkles className="h-3.5 w-3.5 text-pink-200" />
          </div>
          <nav className="space-y-1.5">
            {[LayoutGrid, Target, Briefcase, Calendar, BarChart3].map(
              (Icon, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    i === 0
                      ? "bg-pink-500/15 text-pink-300"
                      : "text-white/25",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </div>
              ),
            )}
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 p-2.5 sm:p-3.5">
          {/* Top bar */}
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div>
              <p className="text-[9px] text-white/35 sm:text-[10px]">
                Good evening
              </p>
              <p className="text-[11px] font-medium text-white/90 sm:text-xs">
                Your workspace
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="hidden h-6 items-center gap-1 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 sm:flex">
                <Search className="h-2.5 w-2.5 text-white/30" />
                <span className="text-[9px] text-white/25">Search</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-pink-400/40 to-purple-500/30 ring-1 ring-pink-400/20" />
            </div>
          </div>

          {/* Widget grid */}
          <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
            {/* AI Career Assistant */}
            <Widget
              title="AI Career Assistant"
              icon={Bot}
              accent="purple"
              className="col-span-3 row-span-2 sm:col-span-2"
            >
              <div className="space-y-1.5">
                <div className="rounded-lg border border-white/[0.06] bg-black/30 p-1.5">
                  <p className="text-[8px] text-white/40">Suggested action</p>
                  <p className="mt-0.5 text-[9px] leading-snug text-white/75 sm:text-[10px]">
                    Tailor your PM case study for the Stripe APM loop.
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-pink-500/10 px-1.5 py-1">
                  <MessageSquare className="h-2.5 w-2.5 text-pink-300/70" />
                  <span className="text-[8px] text-pink-200/70">
                    Ask anything…
                  </span>
                </div>
              </div>
            </Widget>

            {/* Resume Score */}
            <Widget title="Resume Score" icon={FileText} className="col-span-3 sm:col-span-2">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xl font-semibold text-white sm:text-2xl">
                    87
                  </p>
                  <p className="text-[8px] text-emerald-400/80">+12 this week</p>
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-pink-400/40 border-t-pink-400" />
              </div>
            </Widget>

            {/* Interview Progress */}
            <Widget
              title="Interview Progress"
              icon={Target}
              accent="violet"
              className="col-span-3 sm:col-span-2"
            >
              <div className="space-y-1">
                {["Behavioral", "System Design", "PM Case"].map((stage, i) => (
                  <div key={stage} className="flex items-center gap-1.5">
                    <CheckCircle2
                      className={cn(
                        "h-2.5 w-2.5 shrink-0",
                        i < 2 ? "text-pink-400/80" : "text-white/20",
                      )}
                    />
                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                        style={{ width: i < 2 ? "100%" : "40%" }}
                      />
                    </div>
                    <span className="text-[7px] text-white/40">{stage}</span>
                  </div>
                ))}
              </div>
            </Widget>

            {/* Internship Tracker */}
            <Widget
              title="Internship Tracker"
              icon={Briefcase}
              accent="purple"
              className="col-span-3 sm:col-span-2"
            >
              <div className="flex gap-1">
                {["Applied", "Screen", "Final"].map((s, i) => (
                  <div
                    key={s}
                    className="flex-1 rounded-md border border-white/[0.06] bg-black/20 p-1 text-center"
                  >
                    <p className="text-[10px] font-semibold text-white/80">
                      {[8, 3, 1][i]}
                    </p>
                    <p className="text-[7px] text-white/35">{s}</p>
                  </div>
                ))}
              </div>
            </Widget>

            {/* Application Tracker */}
            <Widget
              title="Application Tracker"
              icon={TrendingUp}
              className="col-span-3 sm:col-span-2"
            >
              <div className="flex h-10 items-end gap-0.5">
                {[35, 55, 40, 70, 50, 85, 65].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-pink-500/50 to-purple-500/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </Widget>

            {/* Study Planner */}
            <Widget
              title="Study Planner"
              icon={Sparkles}
              className="col-span-3 sm:col-span-2"
            >
              <div className="space-y-1">
                {["DSA — 45m", "PM frameworks — 30m"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-md bg-white/[0.03] px-1.5 py-1"
                  >
                    <span className="text-[8px] text-white/65">{item}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-400/70" />
                  </div>
                ))}
              </div>
            </Widget>

            {/* Productivity Analytics */}
            <Widget
              title="Productivity Analytics"
              icon={BarChart3}
              accent="violet"
              className="col-span-3 sm:col-span-2"
            >
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-white">4.2h</p>
                <p className="text-[8px] text-white/40">focused today</p>
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500" />
              </div>
            </Widget>

            {/* Calendar */}
            <Widget title="Calendar" icon={Calendar} className="col-span-2 sm:col-span-1">
              <div className="grid grid-cols-7 gap-px">
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "aspect-square rounded-[2px] bg-white/[0.04]",
                      i === 9 && "bg-pink-500/40 ring-1 ring-pink-400/50",
                    )}
                  />
                ))}
              </div>
            </Widget>

            {/* Projects */}
            <Widget
              title="Projects"
              icon={FolderKanban}
              accent="purple"
              className="col-span-4 sm:col-span-5"
            >
              <div className="flex flex-wrap gap-1">
                {["StudySync AI", "Portfolio", "LearnLoop"].map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-1.5 py-0.5 text-[7px] text-white/55 sm:text-[8px]"
                  >
                    {p}
                  </span>
                ))}
                <span className="rounded-md border border-dashed border-pink-400/25 px-1.5 py-0.5 text-[7px] text-pink-300/50 sm:text-[8px]">
                  + New
                </span>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    </div>
  );
}
