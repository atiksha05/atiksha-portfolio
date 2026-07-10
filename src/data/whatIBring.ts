import {
  Code2,
  Palette,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

export type WhatIBringCard = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  number: string;
  rotation: number;
  cardClass: string;
};

export const whatIBringSection = {
  title: "What I Bring",
  subtitle:
    "Product thinking, engineering depth, leadership, and creativity — all in one builder.",
  tagline:
    "I don't just build features — I connect problems, people, and possibilities.",
  signature: "Built with curiosity, empathy, and craft.",
};

export const whatIBringCards: WhatIBringCard[] = [
  {
    id: "pm",
    title: "Product Management",
    description:
      "Bridging user needs and business goals to define strategy, prioritize features, and deliver meaningful products.",
    icon: Target,
    number: "01 / 04",
    rotation: -5,
    cardClass:
      "border-pink-400/30 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/10 to-purple-900/20",
  },
  {
    id: "swe",
    title: "Software Engineering",
    description:
      "Building full-stack systems with clean architecture, thoughtful UX, and reliable implementation.",
    icon: Code2,
    number: "02 / 04",
    rotation: 3,
    cardClass:
      "border-purple-400/25 bg-gradient-to-br from-purple-500/15 via-violet-500/10 to-black/40",
  },
  {
    id: "leadership",
    title: "Leadership",
    description:
      "Leading student organizations, campus events, and community initiatives with empathy and ownership.",
    icon: Users,
    number: "03 / 04",
    rotation: -2,
    cardClass:
      "border-white/15 bg-gradient-to-br from-white/[0.08] via-pink-500/10 to-zinc-900/30",
  },
  {
    id: "creativity",
    title: "Creativity",
    description:
      "Bringing design, storytelling, and visual thinking into the way I build products.",
    icon: Palette,
    number: "04 / 04",
    rotation: 4,
    cardClass:
      "border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/15 via-pink-500/10 to-purple-950/25",
  },
];
