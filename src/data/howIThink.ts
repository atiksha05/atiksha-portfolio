import {
  Compass,
  LineChart,
  MessageCircle,
  Rocket,
  Target,
  type LucideIcon,
} from "lucide-react";

export type HowIThinkCard = {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  rotation: number;
  zIndex: number;
  scatter: { x: number; y: number };
  cardClass: string;
};

export const howIThinkSection = {
  label: "How I Build Products",
  title: "From insight to impact",
  subtitle:
    "A simple product process I use to move from ambiguity to shipped outcomes.",
  cue: "Tap a card to explore a stage.",
};

export const howIThinkCards: HowIThinkCard[] = [
  {
    id: "problem-discovery",
    number: "01",
    title: "Problem Discovery",
    description:
      "I frame the real problem before jumping to solutions — aligning users, stakeholders, and constraints.",
    icon: Compass,
    rotation: -3,
    zIndex: 1,
    scatter: { x: 0, y: 0 },
    cardClass:
      "border-pink-400/25 bg-gradient-to-br from-pink-500/15 via-fuchsia-500/8 to-black/50",
  },
  {
    id: "user-research",
    number: "02",
    title: "User Research",
    description:
      "I listen for patterns in feedback and behavior so decisions reflect how people actually work.",
    icon: MessageCircle,
    rotation: 2,
    zIndex: 2,
    scatter: { x: 0, y: 0 },
    cardClass:
      "border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/12 via-purple-500/8 to-black/50",
  },
  {
    id: "product-strategy",
    number: "03",
    title: "Product Strategy",
    description:
      "I prioritize by impact and feasibility, then define a focused MVP with clear requirements.",
    icon: Target,
    rotation: -2,
    zIndex: 3,
    scatter: { x: 0, y: 0 },
    cardClass:
      "border-pink-400/30 bg-gradient-to-br from-pink-500/18 via-violet-500/10 to-black/45",
  },
  {
    id: "execution-collaboration",
    number: "04",
    title: "Execution & Collaboration",
    description:
      "I partner closely with engineering and design to keep delivery aligned with product intent.",
    icon: Rocket,
    rotation: 3,
    zIndex: 4,
    scatter: { x: 0, y: 0 },
    cardClass:
      "border-purple-400/25 bg-gradient-to-br from-purple-500/12 via-pink-500/8 to-black/50",
  },
  {
    id: "iteration-impact",
    number: "05",
    title: "Iteration & Impact",
    description:
      "I treat launch as the start — reviewing signals and iterating toward better outcomes.",
    icon: LineChart,
    rotation: -2,
    zIndex: 5,
    scatter: { x: 0, y: 0 },
    cardClass:
      "border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 via-pink-500/8 to-black/55",
  },
];
