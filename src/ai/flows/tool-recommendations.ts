'use server';

/**
 * @fileOverview Provides AI-powered tool recommendations based on a given tool's metadata.
 *
 * - getToolRecommendations - A function that returns tool recommendations.
 * - ToolRecommendationsInput - The input type for the getToolRecommendations function.
 * - ToolRecommendationsOutput - The return type for the getToolRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ToolRecommendationsInputSchema = z.object({
  name: z.string().describe('The name of the tool.'),
  purpose: z.string().describe('The purpose of the tool.'),
  description: z.string().describe('A detailed description of the tool.'),
  region: z.string().describe('The region where the tool is applicable.'),
  businessUnit: z.string().describe('The business unit that uses the tool.'),
  languageSupport: z.string().describe('The languages supported by the tool.'),
  cost: z.string().describe('The cost of the tool (e.g., Paid, Free).'),
  access: z.string().describe('The access type of the tool (e.g., Open, Controlled).'),
});
export type ToolRecommendationsInput = z.infer<typeof ToolRecommendationsInputSchema>;

const ToolRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended tools based on the input tool.'),
});
export type ToolRecommendationsOutput = z.infer<typeof ToolRecommendationsOutputSchema>;

export async function getToolRecommendations(input: ToolRecommendationsInput): Promise<ToolRecommendationsOutput> {
  return toolRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'toolRecommendationsPrompt',
  input: {schema: ToolRecommendationsInputSchema},
  output: {schema: ToolRecommendationsOutputSchema},
  prompt: `You are an AI tool recommendation expert. Based on the details of the current tool, provide a list of related tools that the user might find helpful.

Current Tool Details:
Name: {{{name}}}
Purpose: {{{purpose}}}
Description: {{{description}}}
Region: {{{region}}}
Business Unit: {{{businessUnit}}}
Language Support: {{{languageSupport}}}
Cost: {{{cost}}}
Access: {{{access}}}

Recommend similar or complementary tools:`,
});

const toolRecommendationsFlow = ai.defineFlow(
  {
    name: 'toolRecommendationsFlow',
    inputSchema: ToolRecommendationsInputSchema,
    outputSchema: ToolRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
