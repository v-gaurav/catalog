-- Initial schema for AgentBase

-- Enable the pgcrypto extension to generate UUIDs
create extension if not exists "pgcrypto" with schema "public";

-- Create the tools table
create table if not exists "public"."tools" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "purpose" text not null,
    "description" text not null,
    "howToUse" text not null,
    "region" text not null,
    "businessUnit" text not null,
    "languageSupport" text not null,
    "cost" text not null,
    "access" text not null,
    "views" bigint not null default 0,
    "createdAt" timestamp with time zone not null default now(),
    "updatedAt" timestamp with time zone not null default now(),
    primary key ("id")
);

-- Secure the table by enabling Row Level Security
alter table "public"."tools" enable row level security;

-- Create policies to allow public read access
create policy "Allow public read access" on "public"."tools" for select using (true);
-- Create policy to allow insert access for authenticated users
create policy "Allow insert for authenticated users" on "public"."tools" for insert with check (true);
