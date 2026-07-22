import {
  BookOpen,
  Music2,
  Paintbrush,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type LifeOutsideInterest = {
  id: string;
  title: string;
  description: string;
  quote: string;
  icon: LucideIcon;
  accent: "pink" | "violet" | "fuchsia" | "rose";
};

export const personalInterests: LifeOutsideInterest[] = [
  {
    id: "reading",
    title: "Reading",
    description:
      "I enjoy reading product management, psychology, leadership, and self-growth books. Learning how people think helps me build products with more empathy.",
    quote: "Every book teaches me a different way to solve problems.",
    icon: BookOpen,
    accent: "pink",
  },
  {
    id: "music",
    title: "Discovering Music",
    description:
      "I love exploring new artists, discovering underrated songs, and finding playlists that match every mood. Music helps me recharge and stay creative.",
    quote: "Some ideas arrive because of the right song.",
    icon: Music2,
    accent: "violet",
  },
  {
    id: "painting",
    title: "Painting & Sketching",
    description:
      "Sketching and painting have been part of my life since childhood. It reminds me that creativity doesn't always need rules.",
    quote: "Creativity grows when perfection disappears.",
    icon: Paintbrush,
    accent: "fuchsia",
  },
  {
    id: "dancing",
    title: "Dancing",
    description:
      "Dancing helps me disconnect from screens and reconnect with energy, confidence, and expression.",
    quote: "Movement clears my mind better than words.",
    icon: Sparkles,
    accent: "rose",
  },
];

export const lifeOutsideCopy = {
  eyebrow: "Outside the Resume",
  title: "Life Beyond the Work",
  subtitle:
    "Outside of software and product work, I find inspiration through stories, music, movement, and art.",
};
