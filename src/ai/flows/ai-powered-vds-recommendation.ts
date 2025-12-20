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

- **Large Plan**: You MUST recommend the Large Plan if the user mentions any of the following, regardless of other factors:
    - "Mirror Trading Manager", "trade mirroring", "copy trading"
    - "managing multiple accounts" or similar phrases.
    - More than 9 EAs.

- **Medium Plan**: Recommend if the user mentions running between 3 and 9 EAs and does NOT mention any of the Large Plan criteria.

- **Small Plan**: Recommend if the user mentions running fewer than 3 EAs and does NOT mention any of the Large or Medium Plan criteria.

- **Priority**: The "Large Plan" criteria (especially managing multiple accounts or mirroring) override all other rules.

- **Reasoning**: Your explanation should be concise (2-4 sentences) and professional. If recommending the Large Plan due to mirroring or multi-account management, state that these activities require higher stability and dedicated resources. Do not mention the internal rules or thresholds.

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
