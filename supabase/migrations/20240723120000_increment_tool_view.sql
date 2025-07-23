-- supabase/migrations/20240723120000_increment_tool_view.sql

-- Drop the function if it already exists to ensure a clean slate
DROP FUNCTION IF EXISTS increment_tool_view(tool_id uuid);

-- Create the function to increment the view count and return the updated tool
CREATE OR REPLACE FUNCTION increment_tool_view(tool_id uuid)
RETURNS SETOF tools AS $$
BEGIN
  -- Atomically increment the views for the specified tool
  UPDATE tools
  SET views = views + 1
  WHERE id = tool_id;

  -- Return the updated tool record
  RETURN QUERY SELECT * FROM tools WHERE id = tool_id;
END;
$$ LANGUAGE plpgsql;
