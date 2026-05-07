-- ─── Prism — Supabase Schema ──────────────────────────────────────────
-- Run this in the Supabase SQL editor.

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── Profiles ──────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  email       text,
  plan        text not null default 'free' check (plan in ('free', 'pro')),
  credits     integer not null default 30,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Rewrites ──────────────────────────────────────────────────────────────
create table if not exists public.rewrites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  original    text not null,
  rewritten   text not null,
  mode        text not null,
  mode_label  text not null,
  created_at  timestamptz not null default now()
);

alter table public.rewrites enable row level security;

create policy "Users can read own rewrites"
  on public.rewrites for select
  using (auth.uid() = user_id);

create policy "Users can insert own rewrites"
  on public.rewrites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own rewrites"
  on public.rewrites for delete
  using (auth.uid() = user_id);

-- Index for fast history lookups
create index if not exists rewrites_user_id_created_at_idx
  on public.rewrites (user_id, created_at desc);
