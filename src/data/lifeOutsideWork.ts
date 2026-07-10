import {
  BookOpen,
  Camera,
  Globe,
  MapPin,
  Music2,
  Palette,
  type LucideIcon,
} from "lucide-react";

export type LifeOutsideInterest = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  /** Replace with your image path when ready */
  image: string;
};

export const lifeOutsideInterests: LifeOutsideInterest[] = [
  {
    id: "photography",
    title: "Photography",
    description: "Framing moments and noticing small details.",
    icon: Camera,
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70e?w=800&q=80",
  },
  {
    id: "painting",
    title: "Painting",
    description: "Color, texture, and quiet creative focus.",
    icon: Palette,
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  },
  {
    id: "dancing",
    title: "Dancing",
    description: "Movement, rhythm, and expression off the screen.",
    icon: Music2,
    image:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
  },
  {
    id: "reading",
    title: "Reading",
    description: "Stories, ideas, and perspectives that widen my lens.",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
  },
  {
    id: "exploring-sf",
    title: "Exploring San Francisco",
    description: "Neighborhood walks, views, and city energy.",
    icon: MapPin,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
  },
  {
    id: "travel-culture",
    title: "Travel & Culture",
    description: "New places, people, and ways of seeing the world.",
    icon: Globe,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80",
  },
];

/** Featured slideshow order: Painting → Photography → … → Travel & Culture */
const slideshowOrder = [
  "painting",
  "photography",
  "dancing",
  "reading",
  "exploring-sf",
  "travel-culture",
] as const;

export const featuredSlideshowImages = slideshowOrder.map(
  (id) => lifeOutsideInterests.find((item) => item.id === id)!.image,
);

export const featuredQuote = {
  label: "Featured",
  text: "Creativity makes me a better builder.",
};
