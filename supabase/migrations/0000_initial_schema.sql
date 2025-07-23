-- Create tenants table
create table tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamp with time zone not null default now()
);

-- Create profiles table
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  tenant_id uuid references tenants(id) on delete cascade,
  updated_at timestamp with time zone
);

-- Function to create a new tenant and profile for a new user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  new_tenant_id uuid;
begin
  -- Create a new tenant for the user
  insert into public.tenants (name)
  values (new.raw_user_meta_data->>'full_name' || '''s Team')
  returning id into new_tenant_id;

  -- Create a new profile for the user, linking to the new tenant
  insert into public.profiles (id, full_name, avatar_url, tenant_id, updated_at)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    new_tenant_id,
    now()
  );
  return new;
end;
$$;

-- Trigger to call handle_new_user on new user creation
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create tools table
create table tools (
  id uuid primary key default gen_random_uuid(),
  "name" text not null,
  purpose text not null,
  description text not null,
  "howToUse" text not null,
  region text not null,
  "businessUnit" text not null,
  "languageSupport" text not null,
  cost text not null,
  access text not null,
  views bigint not null default 0,
  tenant_id uuid not null references tenants(id) on delete cascade,
  "createdAt" timestamp with time zone not null default now(),
  "updatedAt" timestamp with time zone not null default now()
);

-- Update RLS policies for profiles
alter table profiles enable row level security;
create policy "Users can view their own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- Update RLS policies for tenants
alter table tenants enable row level security;
create policy "Users can view their own tenant" on tenants for select using (id = (select tenant_id from profiles where id = auth.uid()));

-- Update RLS policies for tools
alter table tools enable row level security;
create policy "Users can view tools in their tenant" on tools for select using (tenant_id = (select tenant_id from profiles where id = auth.uid()));
create policy "Users can insert tools in their tenant" on tools for insert with check (tenant_id = (select tenant_id from profiles where id = auth.uid()));
create policy "Users can update tools in their tenant" on tools for update using (tenant_id = (select tenant_id from profiles where id = auth.uid()));
create policy "Users can delete tools in their tenant" on tools for delete using (tenant_id = (select tenant_id from profiles where id = auth.uid()));

