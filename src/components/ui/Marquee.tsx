"use client";

import {
  Atom,
  BarChart3,
  Box,
  ClipboardList,
  Cloud,
  Compass,
  Database,
  FileText,
  Kanban,
  ListOrdered,
  Map,
  MessageCircle,
  PenTool,
  Plug,
  Sparkles,
  TableProperties,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { MarqueeSkill } from "@/lib/data";

const iconMap: Record<MarqueeSkill["icon"], LucideIcon> = {
  strategy: Compass,
  research: MessageCircle,
  prd: FileText,
  roadmaps: Map,
  prioritize: ListOrdered,
  analytics: BarChart3,
  agile: Kanban,
  jira: ClipboardList,
  figma: PenTool,
  sql: TableProperties,
  ai: Sparkles,
  python: Terminal,
  react: Atom,
  postgresql: Database,
  rest: Plug,
  aws: Cloud,
  docker: Box,
  tableau: BarChart3,
};

function SkillItem({ skill }: { skill: MarqueeSkill }) {
  const Icon = iconMap[skill.icon];

  return (
    <span className="skill-item flex shrink-0 items-center gap-2.5">
      <Icon
        className="h-[14px] w-[14px] text-pink-400/45"
        strokeWidth={1.5}
        aria-hidden
      />
      <span className="text-[13px] font-medium tracking-wide text-pink-400/60 sm:text-[14px]">
        {skill.label}
      </span>
    </span>
  );
}

export function Marquee({
  items,
  className,
}: {
  items: MarqueeSkill[];
  className?: string;
}) {
  const reducedMotion = useReducedMotion() ?? false;
  const doubled = [...items, ...items];

  return (
    <div
      className={cn(
        "skills-ticker group relative w-full overflow-hidden border-y border-pink-500/[0.06] bg-black py-5 sm:py-6",
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-black to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-black to-transparent sm:w-20"
        aria-hidden
      />

      <div
        className={cn(
          "skills-track flex w-max items-center gap-14 whitespace-nowrap sm:gap-16 lg:gap-20",
          !reducedMotion && "animate-marquee group-hover:[animation-play-state:paused]",
        )}
      >
        {doubled.map((skill, i) => (
          <SkillItem key={`${skill.label}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}
