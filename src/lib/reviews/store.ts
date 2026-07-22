import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  formatRole,
  initialsFromName,
  LIVE_REVIEW_SLOTS,
  PLACEHOLDER_SLOT_IDS,
  type StoredReview,
  type SubmittedReviewInput,
} from "@/lib/reviews/types";
import { constellationReviews as seedReviews } from "@/data/constellationReviews";
import {
  getNeonSql,
  isNeonConfigured,
  rowToStored,
  type NeonReviewRow,
} from "@/lib/reviews/neon";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  rowToStored as supabaseRowToStored,
  storedToRow,
  type SupabaseReviewRow,
} from "@/lib/reviews/supabase";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submitted-reviews.json");

/** In-memory fallback for serverless when file writes are not durable. */
const memoryStore: StoredReview[] = [];

async function ensureFileStore(): Promise<StoredReview[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredReview[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [...memoryStore];
  }
}

async function writeFileStore(reviews: StoredReview[]) {
  memoryStore.length = 0;
  memoryStore.push(...reviews);
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(reviews, null, 2), "utf8");
  } catch {
    // File system may be read-only on some hosts — memory still holds the review for this instance.
  }
}

async function listFromNeon(): Promise<StoredReview[] | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    const rows = (await sql`
      SELECT *
      FROM portfolio_reviews
      WHERE is_public = TRUE
      ORDER BY created_at ASC
    `) as NeonReviewRow[];

    return rows.map(rowToStored);
  } catch (error) {
    console.error("[reviews] Neon list failed:", error);
    return null;
  }
}

async function insertToNeon(review: StoredReview): Promise<StoredReview | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    const rows = (await sql`
      INSERT INTO portfolio_reviews (
        id,
        name,
        role,
        organization,
        initials,
        quote,
        rating,
        linkedin_url,
        glow,
        size,
        desktop_x,
        desktop_y,
        tablet_x,
        tablet_y,
        created_at,
        is_public
      )
      VALUES (
        ${review.id},
        ${review.name},
        ${review.role},
        ${review.organization ?? null},
        ${review.initials},
        ${review.quote},
        ${review.rating},
        ${review.linkedInUrl ?? null},
        ${review.glow},
        ${review.size},
        ${review.desktop.x},
        ${review.desktop.y},
        ${review.tablet.x},
        ${review.tablet.y},
        ${review.createdAt},
        ${review.public}
      )
      RETURNING *
    `) as NeonReviewRow[];

    return rows[0] ? rowToStored(rows[0]) : null;
  } catch (error) {
    console.error("[reviews] Neon insert failed:", error);
    return null;
  }
}

async function listFromSupabase(): Promise<StoredReview[] | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("portfolio_reviews")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[reviews] Supabase list failed:", error.message);
    return null;
  }

  return (data as SupabaseReviewRow[]).map(supabaseRowToStored);
}

async function insertToSupabase(
  review: StoredReview,
): Promise<StoredReview | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("portfolio_reviews")
    .insert(storedToRow(review))
    .select("*")
    .single();

  if (error) {
    console.error("[reviews] Supabase insert failed:", error.message);
    return null;
  }

  return supabaseRowToStored(data as SupabaseReviewRow);
}

export async function listPublicReviews(): Promise<StoredReview[]> {
  if (isNeonConfigured()) {
    const fromNeon = await listFromNeon();
    if (fromNeon) return fromNeon;
  }

  if (isSupabaseConfigured()) {
    const fromDb = await listFromSupabase();
    if (fromDb) return fromDb;
  }

  return ensureFileStore();
}

export async function createPublicReview(
  input: SubmittedReviewInput,
): Promise<StoredReview> {
  const existing = await listPublicReviews();
  const claimedIds = new Set(existing.map((review) => review.id));

  const nextPlaceholderId = PLACEHOLDER_SLOT_IDS.find(
    (slotId) => !claimedIds.has(slotId),
  );
  const placeholderSeed = nextPlaceholderId
    ? seedReviews.find((seed) => seed.id === nextPlaceholderId)
    : undefined;

  const placeholderIds = new Set<string>(PLACEHOLDER_SLOT_IDS);
  const overflowIndex = existing.filter(
    (review) => !placeholderIds.has(review.id),
  ).length;
  const overflowSlot =
    LIVE_REVIEW_SLOTS[overflowIndex % LIVE_REVIEW_SLOTS.length];

  const review: StoredReview = {
    id: placeholderSeed?.id ?? `live-${randomUUID()}`,
    name: input.name.trim(),
    role: formatRole(input.role, input.company),
    organization: input.company?.trim() || undefined,
    initials: initialsFromName(input.name),
    quote: input.quote.trim(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    linkedInUrl: input.linkedInUrl?.trim() || undefined,
    glow: placeholderSeed?.glow ?? overflowSlot.glow,
    size: placeholderSeed?.size ?? overflowSlot.size,
    desktop: placeholderSeed?.desktop ?? overflowSlot.desktop,
    tablet: placeholderSeed?.tablet ?? overflowSlot.tablet,
    createdAt: new Date().toISOString(),
    public: true,
  };

  if (isNeonConfigured()) {
    const saved = await insertToNeon(review);
    if (saved) return saved;
  }

  if (isSupabaseConfigured()) {
    const saved = await insertToSupabase(review);
    if (saved) return saved;
  }

  const fileReviews = await ensureFileStore();
  const withoutSameId = fileReviews.filter((item) => item.id !== review.id);
  withoutSameId.push(review);
  await writeFileStore(withoutSameId);
  return review;
}

export async function deletePublicReview(id: string): Promise<boolean> {
  const trimmed = id.trim();
  if (!trimmed) return false;

  if (isNeonConfigured()) {
    const sql = getNeonSql();
    if (sql) {
      try {
        await sql`
          DELETE FROM portfolio_reviews
          WHERE id = ${trimmed}
        `;
        return true;
      } catch (error) {
        console.error("[reviews] Neon delete failed:", error);
        return false;
      }
    }
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase
        .from("portfolio_reviews")
        .delete()
        .eq("id", trimmed);
      if (error) {
        console.error("[reviews] Supabase delete failed:", error.message);
        return false;
      }
      return true;
    }
  }

  const fileReviews = await ensureFileStore();
  const next = fileReviews.filter((review) => review.id !== trimmed);
  if (next.length === fileReviews.length) return false;
  await writeFileStore(next);
  return true;
}
