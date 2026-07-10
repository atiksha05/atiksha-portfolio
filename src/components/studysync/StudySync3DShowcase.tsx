"use client";

import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  FileText,
  LayoutGrid,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FloatingWidget = {
  id: string;
  title: string;
  icon: LucideIcon;
  className: string;
  depth: number;
  content: React.ReactNode;
};

const floatingWidgets: FloatingWidget[] = [
  {
    id: "career",
    title: "AI Career Assistant",
    icon: Bot,
    className: "left-[2%] top-[8%] sm:left-[4%] sm:top-[6%]",
    depth: 55,
    content: (
      <p className="mt-1 text-[8px] leading-snug text-white/55 sm:text-[9px]">
        Tailor your PM case study for Stripe APM.
      </p>
    ),
  },
  {
    id: "resume",
    title: "Resume Score",
    icon: FileText,
    className: "right-[2%] top-[10%] sm:right-[5%] sm:top-[8%]",
    depth: 45,
    content: (
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-base font-semibold text-white sm:text-lg">87</span>
        <span className="text-[8px] text-emerald-400/80">+12</span>
      </div>
    ),
  },
  {
    id: "interview",
    title: "Interview Progress",
    icon: Target,
    className: "left-[1%] bottom-[18%] sm:left-[3%] sm:bottom-[20%]",
    depth: 50,
    content: (
      <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
      </div>
    ),
  },
  {
    id: "applications",
    title: "Application Tracker",
    icon: TrendingUp,
    className: "right-[1%] bottom-[22%] sm:right-[4%] sm:bottom-[24%]",
    depth: 40,
    content: (
      <div className="mt-1 flex h-6 items-end gap-0.5">
        {[40, 65, 45, 80, 55].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-pink-500/60 to-purple-500/30"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    ),
  },
  {
    id: "planner",
    title: "Study Planner",
    icon: Sparkles,
    className: "bottom-[4%] left-[18%] sm:bottom-[6%] sm:left-[22%]",
    depth: 35,
    content: (
      <p className="mt-1 text-[8px] text-white/50 sm:text-[9px]">
        DSA 45m · PM frameworks 30m
      </p>
    ),
  },
  {
    id: "analytics",
    title: "Productivity Analytics",
    icon: BarChart3,
    className: "bottom-[5%] right-[16%] sm:bottom-[7%] sm:right-[20%]",
    depth: 48,
    content: (
      <div className="mt-1 flex items-center gap-1.5">
        <span className="text-sm font-semibold text-white">4.2h</span>
        <span className="text-[8px] text-white/40">focused</span>
      </div>
    ),
  },
];

function MiniWidget({
  widget,
  hoverDepth,
  isHovering,
}: {
  widget: FloatingWidget;
  hoverDepth: number;
  isHovering: boolean;
}) {
  const Icon = widget.icon;
  const z = isHovering ? widget.depth + hoverDepth : widget.depth * 0.35;

  return (
    <motion.div
      className={cn(
        "absolute z-20 w-[38%] max-w-[148px] rounded-xl border border-white/[0.1] bg-white/[0.04] p-2 backdrop-blur-xl sm:w-[30%] sm:max-w-[170px] sm:p-2.5",
        "shadow-[0_8px_32px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.04)_inset]",
        widget.className,
      )}
      style={{ transformStyle: "preserve-3d" }}
      animate={{
        z: z,
        y: isHovering ? -4 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="flex items-center gap-1.5">
        <div className="flex h-5 w-5 items-center justify-center rounded-md bg-pink-500/15">
          <Icon className="h-2.5 w-2.5 text-pink-300/90" />
        </div>
        <span className="truncate text-[8px] font-medium text-white/80 sm:text-[9px]">
          {widget.title}
        </span>
      </div>
      {widget.content}
    </motion.div>
  );
}

function DashboardCore({ isHovering }: { isHovering: boolean }) {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset,0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:rounded-3xl"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ z: isHovering ? 72 : 18 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-pink-400/40" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </div>
        <div className="mx-auto flex h-5 flex-1 max-w-[180px] items-center justify-center rounded-md border border-white/[0.06] bg-black/30 sm:max-w-xs sm:h-6">
          <span className="text-[8px] text-white/30 sm:text-[9px]">
            app.studysync.ai
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-2 p-3 sm:gap-3 sm:p-4">
        <div className="col-span-12 flex items-center justify-between sm:col-span-8">
          <div>
            <p className="text-[9px] text-white/35 sm:text-[10px]">
              Workspace
            </p>
            <p className="text-xs font-medium text-white/90 sm:text-sm">
              Good evening, Atiksha
            </p>
          </div>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-400/50 to-purple-500/40 ring-1 ring-pink-400/25" />
        </div>

        <div className="col-span-7 rounded-xl border border-pink-400/15 bg-gradient-to-br from-pink-500/10 to-purple-500/5 p-2.5 sm:col-span-5 sm:p-3">
          <div className="flex items-center gap-1.5">
            <Bot className="h-3 w-3 text-pink-300" />
            <span className="text-[9px] font-medium text-white/75 sm:text-[10px]">
              AI Assistant
            </span>
          </div>
          <div className="mt-2 rounded-lg border border-white/[0.06] bg-black/25 p-2">
            <p className="text-[8px] leading-relaxed text-white/60 sm:text-[9px]">
              Next: refine behavioral stories for your PM loop.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-1 rounded-md bg-white/[0.04] px-2 py-1">
            <MessageSquare className="h-2.5 w-2.5 text-pink-300/60" />
            <span className="text-[8px] text-white/35">Ask anything…</span>
          </div>
        </div>

        <div className="col-span-5 grid grid-cols-2 gap-2 sm:col-span-3">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2">
            <FileText className="h-3 w-3 text-pink-300/70" />
            <p className="mt-1 text-lg font-semibold text-white">87</p>
            <p className="text-[7px] text-white/40">Resume</p>
          </div>
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-2">
            <Target className="h-3 w-3 text-violet-300/70" />
            <p className="mt-1 text-lg font-semibold text-white">3/5</p>
            <p className="text-[7px] text-white/40">Interviews</p>
          </div>
        </div>

        <div className="col-span-12 grid grid-cols-3 gap-2 sm:col-span-4">
          {[
            { label: "Applied", val: "8" },
            { label: "Screens", val: "3" },
            { label: "Finals", val: "1" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-white/[0.06] bg-black/20 p-2 text-center"
            >
              <p className="text-sm font-semibold text-white">{item.val}</p>
              <p className="text-[7px] text-white/35">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="col-span-12 rounded-xl border border-white/[0.08] bg-white/[0.02] p-2.5 sm:col-span-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <LayoutGrid className="h-3 w-3 text-pink-300/70" />
              <span className="text-[9px] text-white/60">Today&apos;s focus</span>
            </div>
            <CheckCircle2 className="h-3 w-3 text-pink-400/60" />
          </div>
          <div className="mt-2 space-y-1">
            {["System design drill", "Application follow-ups"].map((t) => (
              <div
                key={t}
                className="flex items-center justify-between rounded-md bg-white/[0.03] px-2 py-1"
              >
                <span className="text-[8px] text-white/55 sm:text-[9px]">
                  {t}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-pink-400/70" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

type StudySync3DShowcaseProps = {
  isHovering: boolean;
  rotateX: number;
  rotateY: number;
  enableTilt: boolean;
};

export function StudySync3DShowcase({
  isHovering,
  rotateX,
  rotateY,
  enableTilt,
}: StudySync3DShowcaseProps) {
  return (
    <div className="relative mx-auto w-full max-w-4xl [perspective:1200px]">
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-purple-500/20 opacity-50 blur-3xl transition-opacity duration-500 sm:-inset-10"
        style={{ opacity: isHovering ? 0.85 : 0.45 }}
        aria-hidden
      />

      <motion.div
        className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[420px] [transform-style:preserve-3d]"
        animate={{
          rotateX: enableTilt ? rotateX : 4,
          rotateY: enableTilt ? rotateY : 0,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <div className="relative flex h-full min-h-[300px] items-center justify-center px-2 py-6 sm:min-h-[380px] sm:px-4 lg:min-h-[420px]">
          <div className="relative w-full max-w-2xl [transform-style:preserve-3d]">
            <DashboardCore isHovering={isHovering} />

            {floatingWidgets.map((widget) => (
              <MiniWidget
                key={widget.id}
                widget={widget}
                hoverDepth={12}
                isHovering={isHovering}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function useTiltInteraction() {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [enableTilt, setEnableTilt] = useState(false);
  const [rotate, setRotate] = useState({ x: 4, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 768px)");
    const update = () => setEnableTilt(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enableTilt || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setRotate({
        x: (0.5 - py) * 10,
        y: (px - 0.5) * 12,
      });
    },
    [enableTilt],
  );

  const handleLeave = useCallback(() => {
    setIsHovering(false);
    setRotate({ x: 4, y: 0 });
  }, []);

  return {
    ref,
    isHovering,
    setIsHovering,
    enableTilt,
    rotateX: rotate.x,
    rotateY: rotate.y,
    handleMove,
    handleLeave,
  };
}
