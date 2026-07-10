-- Run this in the Supabase SQL editor to enable persistent live reviews.

create table if not exists public.portfolio_reviews (
  id text primary key,
  name text not null,
  role text not null,
  organization text,
  initials text not null,
  quote text not null,
  rating integer not null check (rating between 1 and 5),
  linkedin_url text,
  glow text not null check (glow in ('pink', 'purple', 'white')),
  size text not null check (size in ('sm', 'md', 'lg')),
  desktop_x double precision not null,
  desktop_y double precision not null,
  tablet_x double precision not null,
  tablet_y double precision not null,
  created_at timestamptz not null default now(),
  is_public boolean not null default true
);

alter table public.portfolio_reviews enable row level security;

create policy "Public can read public reviews"
  on public.portfolio_reviews
  for select
  using (is_public = true);

create policy "Anyone can insert public reviews"
  on public.portfolio_reviews
  for insert
  with check (is_public = true);
