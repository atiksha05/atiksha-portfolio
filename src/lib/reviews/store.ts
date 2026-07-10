import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import {
  formatRole,
  initialsFromName,
  LIVE_REVIEW_SLOTS,
  type StoredReview,
  type SubmittedReviewInput,
} from "@/lib/reviews/types";
import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  rowToStored,
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

  return (data as SupabaseReviewRow[]).map(rowToStored);
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

  return rowToStored(data as SupabaseReviewRow);
}

export async function listPublicReviews(): Promise<StoredReview[]> {
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
  const slot = LIVE_REVIEW_SLOTS[existing.length % LIVE_REVIEW_SLOTS.length];

  const review: StoredReview = {
    id: `live-${randomUUID()}`,
    name: input.name.trim(),
    role: formatRole(input.role, input.company),
    organization: input.company?.trim() || undefined,
    initials: initialsFromName(input.name),
    quote: input.quote.trim(),
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    linkedInUrl: input.linkedInUrl?.trim() || undefined,
    glow: slot.glow,
    size: slot.size,
    desktop: slot.desktop,
    tablet: slot.tablet,
    createdAt: new Date().toISOString(),
    public: true,
  };

  if (isSupabaseConfigured()) {
    const saved = await insertToSupabase(review);
    if (saved) return saved;
  }

  const fileReviews = await ensureFileStore();
  fileReviews.push(review);
  await writeFileStore(fileReviews);
  return review;
}
