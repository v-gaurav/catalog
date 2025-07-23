'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { addTool, supabase } from './data';
import { getToolRecommendations, type ToolRecommendationsInput } from '@/ai/flows/tool-recommendations';

const FormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.'),
  purpose: z.string().min(10, 'Purpose must be at least 10 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  howToUse: z.string().min(20, "'How to Use' must be at least 20 characters."),
  region: z.string().min(1, 'Region is required.'),
  businessUnit: z.string().min(1, 'Business Unit is required.'),
  languageSupport: z.string().min(1, 'Language Support is required.'),
  cost: z.enum(['Free', 'Paid']),
  access: z.enum(['Open', 'Controlled']),
});

export type FormState = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export async function addToolAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = FormSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      message: 'Failed to create tool. Please check the fields.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await addTool(validatedFields.data);
    revalidatePath('/');
    return { message: 'Successfully added tool.' };
  } catch (e: any) {
    return { message: `Database Error: Failed to create tool. ${e.message}` };
  }
}

export async function getRecommendationsAction(input: ToolRecommendationsInput) {
  try {
    const result = await getToolRecommendations(input);
    return { recommendations: result.recommendations };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to get recommendations.' };
  }
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error);
    redirect('/?error=Could not authenticate user');
  } else if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  await supabase.auth.signOut();
  revalidatePath('/');
}
