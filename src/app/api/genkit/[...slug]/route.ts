import {appRoute} from '@genkit-ai/next';
import '@/ai/genkit';
import {vdsRecommendationFlow} from '@/ai/flows/ai-powered-vds-recommendation';

export const {GET, POST} = appRoute({
  flows: [vdsRecommendationFlow],
});
