'use server';
/**
 * @fileOverview An AI-powered VDS plan recommendation agent.
 *
 * - getVDSRecommendation - A function that handles the VDS plan recommendation process.
 * - VDSRecommendationInput - The input type for the getVDSRecommendation function.
 * - VDSRecommendationOutput - The return type for the getVDSRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VDSRecommendationInputSchema = z.object({
  tradingActivity: z
    .string()
    .describe('The user\'s trading activity, including instruments traded, frequency, and average trade size.'),
  platformPreferences: z
    .string()
    .describe('The user\'s preferred trading platforms (e.g., MT4, MT5, cTrader).'),
  riskTolerance: z
    .string()
    .optional()
    .describe('The user\'s risk tolerance level (e.g., low, medium, high). This is less important, focus on activity and platforms.'),
});
export type VDSRecommendationInput = z.infer<typeof VDSRecommendationInputSchema>;

const VDSRecommendationOutputSchema = z.object({
  recommendedPlan: z.string().describe('The recommended VDS plan for the user.'),
  reasoning: z.string().describe('The reasoning behind the recommendation.'),
});
export type VDSRecommendationOutput = z.infer<typeof VDSRecommendationOutputSchema>;

export async function getVDSRecommendation(input: VDSRecommendationInput): Promise<VDSRecommendationOutput> {
  return vdsRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vdsRecommendationPrompt',
  input: {schema: VDSRecommendationInputSchema},
  output: {schema: VDSRecommendationOutputSchema},
  prompt: `You are an expert in recommending VDS plans for forex traders.

  Based on the user's trading activity and platform preferences, recommend the most suitable VDS plan (Small, Medium, or Large).

  Explain your reasoning for the recommendation.

  Trading Activity: {{{tradingActivity}}}
  Platform Preferences: {{{platformPreferences}}}

  Your recommendation should be concise and easy to understand.
`,
});

const vdsRecommendationFlow = ai.defineFlow(
  {
    name: 'vdsRecommendationFlow',
    inputSchema: VDSRecommendationInputSchema,
    outputSchema: VDSRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
