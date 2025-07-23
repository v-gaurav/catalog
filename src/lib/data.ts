import { createClient } from '@supabase/supabase-js';
import type { Tool } from './types';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  return data.user;
}

export async function getTools(): Promise<Tool[]> {
   const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', user.id).single();
  if (!profile) return [];

  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('tenant_id', profile.tenant_id)
    .order('createdAt', { ascending: false });
    
  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
  return data || [];
}

export async function getToolById(id: string): Promise<Tool | null> {
  const { data, error } = await supabase.rpc('increment_tool_view', { tool_id: id }).single();

  if (error) {
    if (error.code === 'PGRST116') {
      console.warn(`Attempted to view a tool with ID '${id}', but it was not found.`);
    } else {
      console.error(
        `An unexpected error occurred while fetching tool with id ${id}. Code: ${error.code}`,
        error.message
      );
    }
    return null;
  }
  return data;
}

export async function addTool(tool: Omit<Tool, 'id' | 'views' | 'createdAt' | 'updatedAt' | 'tenant_id'>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data: profile } = await supabase.from('profiles').select('tenant_id').eq('id', user.id).single();
  if (!profile) throw new Error("User profile not found.");


  const { data, error } = await supabase
    .from('tools')
    .insert([{ ...tool, views: 0, tenant_id: profile.tenant_id }])
    .select()
    .single();

  if (error) {
    console.error('Error adding tool:', error.message);
    throw new Error('Failed to add tool to the database.');
  }

  return data;
}
