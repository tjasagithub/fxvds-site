
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
import { Locale } from '@/i18n.config';

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
  lang: z.custom<Locale>().describe('The language for the response (e.g., "en", "de").'),
});
export type VDSRecommendationInput = z.infer<typeof VDSRecommendationInputSchema>;

const VDSRecommendationOutputSchema = z.object({
  recommendedPlan: z.enum(['Small', 'Medium', 'Large', 'Extra Large']).describe('The key of the recommended VDS plan for the user (Small, Medium, Large, or Extra Large).'),
  reasoning: z.string().describe('The reasoning behind the recommendation, in the requested language.'),
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

- **Extra Large Plan**: You MUST recommend the "Extra Large" plan if the user mentions "Mirror Trading Manager", "trade copier", "copy trading", "account mirroring", or "managing multiple accounts" AND they also mention "high volume", "many connected accounts", "professional usage", or "commercial usage".

- **Large Plan**: You MUST recommend the "Large" plan if the user mentions any of the following, and does NOT meet the Extra Large criteria, regardless of other factors:
    - "Mirror Trading Manager", "trade mirroring", "copy trading", "trade copier"
    - "managing multiple accounts" or similar phrases.
    - More than 9 EAs.

- **Medium Plan**: Recommend "Medium" if the user mentions running between 3 and 9 EAs and does NOT mention any of the Large or Extra Large Plan criteria.

- **Small Plan**: Recommend "Small" if the user mentions running fewer than 3 EAs and does NOT mention any of the Large, Extra Large, or Medium Plan criteria.

- **Priority**: The "Extra Large" and "Large Plan" criteria override all other rules.

- **Output Language**: Your entire output, especially the "reasoning", MUST be in the requested language: {{{lang}}}.
- **Output Plan Key**: The 'recommendedPlan' field must be ONLY one of 'Small', 'Medium', 'Large', or 'Extra Large'.

- **Reasoning**: Your explanation should be concise (2-4 sentences) and professional. If recommending the Large or Extra Large Plan due to mirroring or multi-account management, state that these activities require higher stability and dedicated resources. Do not mention the internal rules or thresholds.

User Input:
Trading Activity: {{{tradingActivity}}}
Platform Preferences: {{{platformPreferences}}}
Language: {{{lang}}}
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
