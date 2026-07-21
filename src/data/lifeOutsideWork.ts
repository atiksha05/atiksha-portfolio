import {
  BookOpen,
  Music2,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type ImageFit = "cover" | "contain";

export type LifeOutsideInterest = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  objectPosition: string;
  fit: ImageFit;
};

/**
 * Four personal interests.
 * Featured card uses Painting; the other three render in the right-hand grid.
 */
export const personalInterests: LifeOutsideInterest[] = [
  {
    id: "reading",
    title: "Reading",
    description:
      "Stories, ideas, and perspectives that help me see the world differently.",
    icon: BookOpen,
    image: "/images/personal/city-portrait.jpg",
    alt: "Atiksha on a San Francisco sidewalk in a trench coat",
    objectPosition: "center 18%",
    fit: "cover",
  },
  {
    id: "music",
    title: "Exploring New Music",
    description:
      "Discovering new sounds, artists, and moods that inspire creativity.",
    icon: Music2,
    image: "/images/personal/night-moon.png",
    alt: "A glowing moon over a quiet night street, capturing a creative mood",
    objectPosition: "center 42%",
    fit: "cover",
  },
  {
    id: "painting",
    title: "Painting",
    description: "Color, texture, and quiet creative focus.",
    icon: Palette,
    image: "/images/personal/creative-desk.png",
    alt: "Atiksha focused on a detailed creative project at her desk",
    objectPosition: "center 28%",
    fit: "cover",
  },
  {
    id: "dancing",
    title: "Dancing",
    description: "Movement, rhythm, and expression beyond the screen.",
    icon: Sparkles,
    image: "/images/personal/plaza-night.jpg",
    alt: "Atiksha walking through a plaza lined with string lights at night",
    objectPosition: "center 18%",
    fit: "cover",
  },
];

export const featuredInterestId = "painting" as const;

export const featuredInterest =
  personalInterests.find((item) => item.id === featuredInterestId)!;

export const sideInterests = personalInterests.filter(
  (item) => item.id !== featuredInterestId,
);

export const featuredQuote = {
  label: "Featured",
  text: "Creativity makes me a better builder.",
};

export const lifeOutsideCopy = {
  eyebrow: "Outside the Resume",
  title: "Life Beyond the Work",
  subtitle:
    "Outside of software and product work, I find inspiration through stories, music, movement, and art.",
};
