
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

- **EA Count Rules**:
    - **Small Plan**: Recommend "Small" if the user mentions running up to 3 EAs.
    - **Medium Plan**: Recommend "Medium" if the user mentions running 4-8 EAs.
    - **Large Plan**: Recommend "Large" if the user mentions running 9-15 EAs.
    - **Extra Large Plan**: Recommend "Extra Large" if the user mentions running 16 or more EAs.

- **Mirror Trading Manager Override**:
    - If the user mentions "Mirror Trading Manager" or "Anton Mel":
        - If they mention "1 EA", you MUST recommend the **Small** plan.
        - If they mention "3 EAs", you MUST recommend the **Medium** plan.
        - Otherwise, still follow the EA thresholds above, but if their usage description implies heavy use, you can push the recommendation up one tier.

- **Clarification**: If the EA count is unclear, provide a "best guess" recommendation based on other context, and then ask a short clarifying question in your reasoning.

- **Required Text Addition**: If "Mirror Trading Manager" is detected in the input, you MUST append the following exact text to the end of your reasoning, on a new line: "If you are using Mirror Trading Manager tool: up to 10 accounts, you can use a SMALL account, up to 30 accounts (medium), up to 100 (Large), above 100: extra large."

- **Priority**: The override rules take precedence. Your primary decision factor is the number of EAs.

- **Output Language**: Your entire output, especially the "reasoning", MUST be in the requested language: {{{lang}}}.
- **Output Plan Key**: The 'recommendedPlan' field must be ONLY one of 'Small', 'Medium', 'Large', or 'Extra Large'.

- **Reasoning**: Your explanation should be concise (2-4 sentences) and professional, referencing the rule you used (e.g., number of EAs). Do not mention the internal rules themselves.

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
