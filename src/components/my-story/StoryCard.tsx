"use client";

import { useCardTilt } from "@/hooks/useCardTilt";
import { cn } from "@/lib/utils";

type StoryCardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "article" | "div";
};

const storyCardBase =
  "rounded-2xl border border-pink-400/20 bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6";

export function StoryCard({
  children,
  className,
  as: Tag = "article",
}: StoryCardProps) {
  const { onPointerMove, onPointerLeave } = useCardTilt();

  return (
    <Tag
      className={cn("story-card", storyCardBase, className)}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </Tag>
  );
}
