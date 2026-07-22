import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { StoredReview } from "@/lib/reviews/types";

export type NeonReviewRow = {
  id: string;
  name: string;
  role: string;
  organization: string | null;
  initials: string;
  quote: string;
  rating: number;
  linkedin_url: string | null;
  glow: StoredReview["glow"];
  size: StoredReview["size"];
  desktop_x: number;
  desktop_y: number;
  tablet_x: number;
  tablet_y: number;
  created_at: string;
  is_public: boolean;
};

let sqlClient: NeonQueryFunction<false, false> | null = null;

export function isNeonConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getNeonSql() {
  if (!isNeonConfigured()) return null;
  if (!sqlClient) {
    sqlClient = neon(process.env.DATABASE_URL!);
  }
  return sqlClient;
}

export function rowToStored(row: NeonReviewRow): StoredReview {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    organization: row.organization ?? undefined,
    initials: row.initials,
    quote: row.quote,
    rating: row.rating,
    linkedInUrl: row.linkedin_url ?? undefined,
    glow: row.glow,
    size: row.size,
    desktop: { x: row.desktop_x, y: row.desktop_y },
    tablet: { x: row.tablet_x, y: row.tablet_y },
    createdAt: row.created_at,
    public: row.is_public,
  };
}
