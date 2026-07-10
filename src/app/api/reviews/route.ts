import { NextResponse } from "next/server";
import { createPublicReview, listPublicReviews } from "@/lib/reviews/store";
import type { SubmittedReviewInput } from "@/lib/reviews/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const reviews = await listPublicReviews();
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("[api/reviews] GET failed", error);
    return NextResponse.json(
      { error: "Failed to load reviews", reviews: [] },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<SubmittedReviewInput>;

    const name = body.name?.trim();
    const quote = body.quote?.trim();
    const rating = Number(body.rating);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }
    if (!quote || quote.length < 8) {
      return NextResponse.json(
        { error: "Please write a short review." },
        { status: 400 },
      );
    }
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Please choose a rating from 1 to 5." },
        { status: 400 },
      );
    }

    const review = await createPublicReview({
      name,
      role: body.role?.trim(),
      company: body.company?.trim(),
      rating,
      quote,
      linkedInUrl: body.linkedInUrl?.trim(),
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    console.error("[api/reviews] POST failed", error);
    return NextResponse.json(
      { error: "Failed to save review. Please try again." },
      { status: 500 },
    );
  }
}
