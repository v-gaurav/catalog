-- Create the tools table with a UUID primary key
create table
  tools (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    purpose text not null,
    description text not null,
    "howToUse" text not null,
    region text not null,
    "businessUnit" text not null,
    "languageSupport" text not null,
    cost text check (cost in ('Free', 'Paid')) not null,
    access text check (access in ('Open', 'Controlled')) not null,
    views integer not null default 0,
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now()
  );

-- Enable Row Level Security
alter table tools enable row level security;

-- Create policies for public access
create policy "Allow public read access" on tools for
select
  using (true);

create policy "Allow public write access" on tools for
insert
  with check (true);

create policy "Allow public update access" on tools for
update
  using (true);