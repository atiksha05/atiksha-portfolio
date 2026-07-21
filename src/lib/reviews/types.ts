import type { ConstellationReview } from "@/data/constellationReviews";

export type SubmittedReviewInput = {
  name: string;
  role?: string;
  company?: string;
  rating: number;
  quote: string;
  linkedInUrl?: string;
};

export type StoredReview = {
  id: string;
  name: string;
  role: string;
  organization?: string;
  initials: string;
  quote: string;
  rating: number;
  linkedInUrl?: string;
  glow: ConstellationReview["glow"];
  size: ConstellationReview["size"];
  desktop: { x: number; y: number };
  tablet: { x: number; y: number };
  createdAt: string;
  public: boolean;
};

/** Free constellation slots for live-submitted reviews (inside network bounds). */
export const LIVE_REVIEW_SLOTS: Array<{
  desktop: { x: number; y: number };
  tablet: { x: number; y: number };
  glow: ConstellationReview["glow"];
  size: ConstellationReview["size"];
}> = [
  { desktop: { x: 24, y: 42 }, tablet: { x: 24, y: 44 }, glow: "pink", size: "md" },
  { desktop: { x: 56, y: 44 }, tablet: { x: 58, y: 46 }, glow: "purple", size: "md" },
  { desktop: { x: 40, y: 74 }, tablet: { x: 40, y: 74 }, glow: "white", size: "sm" },
  { desktop: { x: 70, y: 42 }, tablet: { x: 72, y: 44 }, glow: "pink", size: "md" },
  { desktop: { x: 14, y: 64 }, tablet: { x: 16, y: 64 }, glow: "purple", size: "sm" },
  { desktop: { x: 86, y: 48 }, tablet: { x: 84, y: 50 }, glow: "pink", size: "md" },
  { desktop: { x: 30, y: 22 }, tablet: { x: 30, y: 24 }, glow: "white", size: "sm" },
  { desktop: { x: 66, y: 22 }, tablet: { x: 66, y: 24 }, glow: "purple", size: "md" },
];

export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function formatRole(role?: string, company?: string): string {
  const r = role?.trim();
  const c = company?.trim();
  if (r && c) return `${r} · ${c}`;
  if (r) return r;
  if (c) return c;
  return "Collaborator";
}

export function toConstellationReview(
  review: StoredReview,
): ConstellationReview & { rating?: number; isLive?: boolean } {
  return {
    id: review.id,
    name: review.name,
    role: review.role,
    organization: review.organization,
    initials: review.initials,
    quote: review.quote,
    linkedInUrl: review.linkedInUrl,
    desktop: review.desktop,
    tablet: review.tablet,
    glow: review.glow,
    size: review.size,
    rating: review.rating,
    isLive: true,
  };
}
