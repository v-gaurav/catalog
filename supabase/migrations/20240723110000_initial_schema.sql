-- Initial Schema for AgentBase

-- Enable the pgcrypto extension to generate UUIDs
create extension if not exists pgcrypto with schema extensions;

-- Create the tools table
create table tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  purpose text not null,
  description text not null,
  "howToUse" text not null,
  region text not null,
  "businessUnit" text not null,
  "languageSupport" text not null,
  cost text not null check (cost in ('Free', 'Paid')),
  access text not null check (access in ('Open', 'Controlled')),
  views bigint not null default 0,
  "createdAt" timestamptz not null default now(),
  "updatedAt" timestamptz not null default now()
);

-- Function to update the updatedAt timestamp
create or replace function handle_updated_at()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to automatically update updatedAt on row change
create trigger on_tool_update
before update on tools
for each row
execute procedure handle_updated_at();

-- Enable Row Level Security (RLS)
alter table tools enable row level security;

-- Create RLS policies
-- 1. Allow anonymous users to read all tools
create policy "Allow anonymous read access" on tools
for select to anon using (true);

-- 2. Allow authenticated users to insert new tools
create policy "Allow authenticated insert" on tools
for insert to authenticated with check (true);

-- 3. Allow authenticated users to update their own tools (example, might need adjustment)
-- This policy is restrictive and assumes a user_id column, which we don't have yet.
-- For now, let's allow any authenticated user to update.
create policy "Allow authenticated update" on tools
for update to authenticated using (true);

-- 4. Allow authenticated users to delete tools (example, might need adjustment)
create policy "Allow authenticated delete" on tools
for delete to authenticated using (true);
