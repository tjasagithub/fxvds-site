
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
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n.config';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['aiRecommender'];
type PlanName = 'Small' | 'Medium' | 'Large' | 'Extra Large';

const AiRecommender = ({ dictionary, lang }: { dictionary: Dictionary, lang: Locale }) => {
  const [recommendation, setRecommendation] = useState<{ recommendedPlan: PlanName; reasoning: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // This variable will be set at build time on the server.
  const isApiKeySet = process.env.NEXT_PUBLIC_GEMINI_API_KEY_SET === 'true';

  const VDSRecommendationInputSchema = z.object({
    tradingActivity: z
      .string()
      .min(10, dictionary.form.validation.activity),
    platformPreferences: z
      .string()
      .min(2, dictionary.form.validation.platform),
  });

  type VDSRecommendationInput = z.infer<typeof VDSRecommendationInputSchema>;

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
      const apiKeyError = dictionary.errors.notConfigured;
      setError(apiKeyError);
       toast({
        variant: 'destructive',
        title: dictionary.errors.notAvailableTitle,
        description: apiKeyError,
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await getVDSRecommendation({ ...data, riskTolerance: 'medium', lang });
      if(result) {
        setRecommendation(result as { recommendedPlan: PlanName; reasoning: string });
      } else {
        throw new Error("Empty response from AI");
      }
    } catch (e) {
      console.error(e);
      const errorMessage = dictionary.errors.failed;
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: dictionary.errors.failedTitle,
        description: dictionary.errors.failedDescription,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getPlanDisplayName = (planKey: PlanName | undefined) => {
    if (!planKey) return '';
    const planName = planKey.replace(' ', '').toLowerCase() as 'small' | 'medium' | 'large' | 'extralarge';
    return dictionary.plans[planName] || planKey;
  }

  return (
    <section id="ai-recommender" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-gray-400">
            {dictionary.subtitle}
          </p>
        </div>

        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <Card className="bg-card/50 border-border/70">
            <CardHeader>
              <CardTitle>{dictionary.form.title}</CardTitle>
              <CardDescription>{dictionary.form.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tradingActivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{dictionary.form.activity.label}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={dictionary.form.activity.placeholder}
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
                        <FormLabel>{dictionary.form.platform.label}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={dictionary.form.platform.placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {dictionary.form.button}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="h-full flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border/50 p-8 min-h-[300px] lg:min-h-full">
            {isLoading && (
              <div className="text-center text-gray-400">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                <p className="mt-4 font-semibold">{dictionary.result.loading}</p>
              </div>
            )}
            {!isLoading && !recommendation && (
               <div className="text-center text-gray-500">
                <Bot className="mx-auto h-12 w-12" />
                <p className="mt-4 font-semibold">{dictionary.result.placeholder}</p>
                {error && <p className="mt-2 text-destructive">{error}</p>}
              </div>
            )}
            {!isLoading && recommendation && (
              <div className="text-left w-full animate-in fade-in duration-500">
                <h3 className="text-lg font-semibold text-gray-300">{dictionary.result.title}</h3>
                <p className="text-4xl font-bold text-primary my-2">{getPlanDisplayName(recommendation.recommendedPlan)}</p>
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
