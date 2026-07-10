export type ConstellationReview = {
  id: string;
  name: string;
  role: string;
  organization?: string;
  initials: string;
  quote: string;
  linkedInUrl?: string;
  rating?: number;
  /** True for visitor-submitted reviews that should animate in */
  isLive?: boolean;
  /** Position as % inside the network area (lower ~60% of card) */
  desktop: { x: number; y: number };
  tablet: { x: number; y: number };
  glow: "pink" | "purple" | "white";
  size: "sm" | "md" | "lg";
};

export const constellationSection = {
  title: "What People Say About Me",
  subtitle:
    "Here's what colleagues, mentors, and teammates have shared about working with me.",
};

/** Nodes stay inside the network area with edge padding (~8–12%). */
export const constellationReviews: ConstellationReview[] = [
  {
    id: "mentor",
    name: "Mentor Name",
    role: "Mentor",
    initials: "MN",
    quote: "Review coming soon.",
    desktop: { x: 16, y: 22 },
    tablet: { x: 18, y: 24 },
    glow: "pink",
    size: "md",
  },
  {
    id: "product-lead",
    name: "Teammate Name",
    role: "Product Lead",
    initials: "TN",
    quote: "Review coming soon.",
    desktop: { x: 34, y: 58 },
    tablet: { x: 32, y: 55 },
    glow: "purple",
    size: "lg",
  },
  {
    id: "eng-manager",
    name: "Colleague Name",
    role: "Engineering Manager",
    initials: "CN",
    quote: "Review coming soon.",
    desktop: { x: 48, y: 28 },
    tablet: { x: 50, y: 30 },
    glow: "white",
    size: "md",
  },
  {
    id: "swe",
    name: "Teammate Name",
    role: "Software Engineer",
    initials: "TN",
    quote: "Review coming soon.",
    desktop: { x: 62, y: 62 },
    tablet: { x: 68, y: 58 },
    glow: "pink",
    size: "md",
  },
  {
    id: "community",
    name: "Collaborator Name",
    role: "Community Lead",
    initials: "CL",
    quote: "Review coming soon.",
    desktop: { x: 78, y: 26 },
    tablet: { x: 80, y: 28 },
    glow: "purple",
    size: "sm",
  },
  {
    id: "professor",
    name: "Professor Name",
    role: "Faculty Mentor",
    initials: "PN",
    quote: "Review coming soon.",
    desktop: { x: 84, y: 68 },
    tablet: { x: 78, y: 70 },
    glow: "pink",
    size: "md",
  },
];

export const constellationConnections: [string, string][] = [
  ["mentor", "product-lead"],
  ["mentor", "eng-manager"],
  ["product-lead", "eng-manager"],
  ["eng-manager", "swe"],
  ["eng-manager", "community"],
  ["swe", "community"],
  ["swe", "professor"],
  ["community", "professor"],
  ["product-lead", "swe"],
];

/** Lower-center, with room for the “Leave a Review” label under the + */
export const leaveReviewOrb = {
  id: "leave-review",
  label: "Leave a Review",
  desktop: { x: 50, y: 72 },
  tablet: { x: 50, y: 74 },
};
