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
  prompt: `You are an expert in recommending VDS plans for forex traders. Your recommendation must be based on the following strict rules:

1.  **Small Plan**: Recommend if the user mentions running 3 or fewer Expert Advisors (EAs).
2.  **Medium Plan**: Recommend if the user mentions running between 4 and 10 EAs.
3.  **Large Plan**: Recommend if the user either:
    a. Mentions running more than 10 EAs.
    b. Mentions using "Mirror Trading Manager", "copy trading", "trade mirroring", or similar professional software, regardless of the EA count.

- Always recommend the smallest sufficient plan according to these rules.
- If the user's input is unclear, make a reasonable estimate of the EA count.
- Keep your reasoning concise (2-4 sentences).
- If you recommend the Large plan because of mirroring software, explain that these tools require higher stability and resources.

User Input:
Trading Activity: {{{tradingActivity}}}
Platform Preferences: {{{platformPreferences}}}
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
