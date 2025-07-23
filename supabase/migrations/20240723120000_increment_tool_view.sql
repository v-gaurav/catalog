create or replace function increment_tool_view(tool_id uuid)
returns table (
  id uuid,
  name text,
  purpose text,
  description text,
  "howToUse" text,
  region text,
  "businessUnit" text,
  "languageSupport" text,
  cost text,
  access text,
  views bigint,
  tenant_id uuid,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
)
language plpgsql
as $$
begin
  update tools
  set views = views + 1
  where tools.id = tool_id;

  return query
  select *
  from tools
  where tools.id = tool_id;
end;
$$;
