
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getVDSRecommendation } from '@/ai/flows/ai-powered-vds-recommendation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Sparkles } from 'lucide-react';

const VDSRecommendationInputSchema = z.object({
  tradingActivity: z
    .string()
    .min(10, 'Please describe your trading activity in more detail.')
    .describe("The user's trading activity, including instruments traded, frequency, and average trade size."),
  platformPreferences: z
    .string()
    .min(2, 'Please enter your preferred platform(s).')
    .describe("The user's preferred trading platforms (e.g., MT4, MT5, cTrader)."),
});

type VDSRecommendationInput = z.infer<typeof VDSRecommendationInputSchema>;

type VDSRecommendationOutput = {
  recommendedPlan: string;
  reasoning: string;
};

// This variable will be set at build time on the server.
const isApiKeySet = process.env.NEXT_PUBLIC_GEMINI_API_KEY_SET === 'true';


const AiRecommender = () => {
  const [recommendation, setRecommendation] = useState<VDSRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<VDSRecommendationInput>({
    resolver: zodResolver(VDSRecommendationInputSchema),
    defaultValues: {
      tradingActivity: '',
      platformPreferences: '',
    },
  });

  const onSubmit = async (data: VDSRecommendationInput) => {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);

    if (!isApiKeySet) {
      const apiKeyError = "The AI recommender is not configured. Please contact support.";
      setError(apiKeyError);
       toast({
        variant: 'destructive',
        title: 'Feature Not Available',
        description: apiKeyError,
      });
      setIsLoading(false);
      return;
    }

    try {
      // The AI flow expects a riskTolerance field, but we removed it from the form.
      // We'll pass a default/neutral value to satisfy the schema without impacting the recommendation logic.
      const result = await getVDSRecommendation({ ...data, riskTolerance: 'medium' });
      if(result) {
        setRecommendation(result);
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = 'Recommendations are temporarily unavailable. Please compare plans above.';
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'AI Recommendation Failed',
        description: 'Please try again later or select a plan manually.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const formattedPlan = recommendation?.recommendedPlan.toLowerCase().includes('plan') 
    ? recommendation.recommendedPlan 
    : `${recommendation?.recommendedPlan} Plan`;

  return (
    <section id="ai-recommender" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Not Sure Which Plan Is Right?</h2>
          <p className="mt-4 text-lg text-gray-400">
            Let our AI assistant recommend the perfect VDS plan based on your trading style.
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <Card className="bg-card/50 border-border/70">
            <CardHeader>
              <CardTitle>Tell us about your needs</CardTitle>
              <CardDescription>The more details you provide, the better the recommendation.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tradingActivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trading Patterns</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g. High-frequency scalping on EUR/USD, running 5 EAs simultaneously during London and NY sessions, or managing multiple accounts."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="platformPreferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trading Platforms</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. MetaTrader 5, cTrader, Mirror Trading Manager"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Get Recommendation
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="h-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 p-8 min-h-[300px] lg:min-h-full">
            {isLoading && (
              <div className="text-center text-gray-400">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 font-semibold">Analyzing your needs...</p>
              </div>
            )}
            {!isLoading && !recommendation && (
               <div className="text-center text-gray-500">
                <Bot className="mx-auto h-12 w-12" />
                <p className="mt-4 font-semibold">Your recommendation will appear here.</p>
                {error && <p className="mt-2 text-destructive">{error}</p>}
              </div>
            )}
            {!isLoading && recommendation && (
              <div className="text-left w-full animate-in fade-in duration-500">
                <h3 className="text-lg font-semibold text-gray-300">Our Recommendation:</h3>
                <p className="text-4xl font-bold text-primary my-2">{formattedPlan}</p>
                <p className="text-gray-400">{recommendation.reasoning}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiRecommender;
