import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { StoredReview } from "@/lib/reviews/types";

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  );
}

export function getSupabaseAdmin(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  client = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}

export type SupabaseReviewRow = {
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

export function rowToStored(row: SupabaseReviewRow): StoredReview {
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

export function storedToRow(review: StoredReview) {
  return {
    id: review.id,
    name: review.name,
    role: review.role,
    organization: review.organization ?? null,
    initials: review.initials,
    quote: review.quote,
    rating: review.rating,
    linkedin_url: review.linkedInUrl ?? null,
    glow: review.glow,
    size: review.size,
    desktop_x: review.desktop.x,
    desktop_y: review.desktop.y,
    tablet_x: review.tablet.x,
    tablet_y: review.tablet.y,
    created_at: review.createdAt,
    is_public: review.public,
  };
}
