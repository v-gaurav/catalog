import { supabase } from './supabase';
import type { Tool } from './types';

export async function getTools(): Promise<Tool[]> {
  const { data, error } = await supabase.from('tools').select('*');
  if (error) {
    console.error('Error fetching tools:', error);
    return [];
  }
  return data || [];
}

export async function getToolById(id: string): Promise<Tool | null> {
  const { data, error } = await supabase.from('tools').select('*').eq('id', id).single();
  if (error) {
    console.error(`Error fetching tool with id ${id}:`, error);
    return null;
  }
  return data;
}

export async function addTool(tool: Omit<Tool, 'id' | 'views' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase.from('tools').insert([
    { ...tool, views: 0 }
  ]).select().single();

  if (error) {
    console.error('Error adding tool:', error);
    throw new Error('Failed to add tool to the database.');
  }

  return data;
}
