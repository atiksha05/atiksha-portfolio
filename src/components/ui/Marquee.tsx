import {
  BarChart3,
  Box,
  Cloud,
  Database,
  Kanban,
  Layers,
  Map,
  Plug,
  ClipboardList,
  Terminal,
  type LucideIcon,
  Atom,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MarqueeSkill } from "@/lib/data";

const iconMap: Record<MarqueeSkill["icon"], LucideIcon> = {
  react: Atom,
  python: Terminal,
  aws: Cloud,
  nextjs: Layers,
  agile: Kanban,
  rest: Plug,
  jira: ClipboardList,
  postgresql: Database,
  roadmaps: Map,
  docker: Box,
  tableau: BarChart3,
};

function SkillItem({ skill }: { skill: MarqueeSkill }) {
  const Icon = iconMap[skill.icon];

  return (
    <span className="skill-item flex shrink-0 items-center gap-2.5">
      <Icon
        className="h-[14px] w-[14px] text-pink-400/50"
        strokeWidth={1.5}
        aria-hidden
      />
      <span className="text-[15px] font-medium tracking-wide text-pink-400/65">
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
  const doubled = [...items, ...items];

  return (
    <div className={cn("relative overflow-hidden py-6 sm:py-8", className)}>
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-black to-transparent sm:w-28"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-black to-transparent sm:w-28"
        aria-hidden
      />

      <div className="skills-track animate-marquee flex w-max items-center gap-16 whitespace-nowrap sm:gap-20 lg:gap-24">
        {doubled.map((skill, i) => (
          <SkillItem key={`${skill.label}-${i}`} skill={skill} />
        ))}
      </div>
    </div>
  );
}
