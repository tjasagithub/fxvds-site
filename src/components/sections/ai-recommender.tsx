'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getVDSRecommendation } from '@/ai/flows/ai-powered-vds-recommendation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, Sparkles } from 'lucide-react';

const VDSRecommendationInputSchema = z.object({
  tradingActivity: z
    .string()
    .min(10, 'Please describe your trading activity in more detail.')
    .describe('The user\'s trading activity, including instruments traded, frequency, and average trade size.'),
  platformPreferences: z
    .string({ required_error: 'Please select your preferred platform.'})
    .describe('The user\'s preferred trading platforms (e.g., MT4, MT5, cTrader).'),
  riskTolerance: z
    .string({ required_error: 'Please select your risk tolerance.'})
    .describe('The user\'s risk tolerance level (e.g., low, medium, high).'),
});

type VDSRecommendationInput = z.infer<typeof VDSRecommendationInputSchema>;

type VDSRecommendationOutput = {
  recommendedPlan: string;
  reasoning: string;
};

const AiRecommender = () => {
  const [recommendation, setRecommendation] = useState<VDSRecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<VDSRecommendationInput>({
    resolver: zodResolver(VDSRecommendationInputSchema),
    defaultValues: {
      tradingActivity: '',
    },
  });

  const onSubmit = async (data: VDSRecommendationInput) => {
    setIsLoading(true);
    setRecommendation(null);
    setError(null);

    try {
      const result = await getVDSRecommendation(data);
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
                        <FormLabel>Trading Activity</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., I trade EUR/USD and Gold, running 2-3 EAs on 5 charts, with a focus on scalping."
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
                        <FormLabel>Platform Preference</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a platform" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MT4">MT4</SelectItem>
                            <SelectItem value="MT5">MT5</SelectItem>
                            <SelectItem value="cTrader">cTrader</SelectItem>
                            <SelectItem value="Multiple/Other">Multiple/Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="riskTolerance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Risk Tolerance / EA Aggressiveness</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
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
                <p className="text-4xl font-bold text-primary my-2">{recommendation.recommendedPlan} Plan</p>
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
