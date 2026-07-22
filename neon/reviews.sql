-- Run this once in the Neon SQL Editor to enable persistent live reviews.

CREATE TABLE IF NOT EXISTS portfolio_reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  organization TEXT,
  initials TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  linkedin_url TEXT,
  glow TEXT NOT NULL CHECK (glow IN ('pink', 'purple', 'white')),
  size TEXT NOT NULL CHECK (size IN ('sm', 'md', 'lg')),
  desktop_x DOUBLE PRECISION NOT NULL,
  desktop_y DOUBLE PRECISION NOT NULL,
  tablet_x DOUBLE PRECISION NOT NULL,
  tablet_y DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_public BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS portfolio_reviews_public_created_idx
  ON portfolio_reviews (is_public, created_at);
