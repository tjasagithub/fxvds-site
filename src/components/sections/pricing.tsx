'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckoutModal, PlanName } from './checkout-modal';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['pricing'];

const Pricing = ({ dictionary }: { dictionary: Dictionary }) => {
  const [activePlan, setActivePlan] = useState<PlanName>('Medium');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState<PlanName>('Medium');

  const plans = [
    {
      name: 'Small' as PlanName,
      price: '€30',
      features: dictionary.small.features,
    },
    {
      name: 'Medium' as PlanName,
      price: '€60',
      features: dictionary.medium.features,
    },
    {
      name: 'Large' as PlanName,
      price: '€90',
      features: dictionary.large.features,
    },
  ];

  const handleGetStartedClick = (planName: PlanName) => {
    setModalPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">{dictionary.title}</h2>
          <p className="mt-4 text-lg text-gray-400">
            {dictionary.subtitle}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isSelected = activePlan === plan.name;
            return (
              <Card
                key={plan.name}
                onClick={() => setActivePlan(plan.name)}
                className={cn(
                  'flex flex-col border-border/70 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer',
                  isSelected && 'border-primary/50 shadow-2xl shadow-primary/20 relative ring-2 ring-primary/50'
                )}
              >
                {isSelected && (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 via-red-500/30 to-primary/80 opacity-50 blur-lg" />
                )}
                <CardHeader className="text-center relative">
                  <CardTitle className="text-3xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-white/90 mt-2">
                    {plan.price}
                    <span className="text-sm font-medium text-gray-400"> / {dictionary.perMonth}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center relative">
                  <ul className="space-y-3 text-gray-300">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className={cn(feature.highlighted ? "font-bold text-white" : "text-gray-400")}>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="relative">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetStartedClick(plan.name)
                    }}
                    className="w-full" 
                    variant={isSelected ? 'default' : 'outline'}
                  >
                    {dictionary.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 text-center text-gray-400">
           <p dangerouslySetInnerHTML={{ __html: dictionary.customSetup.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
        </div>
      </div>
      
      <CheckoutModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialPlan={modalPlan}
        dictionary={dictionary.checkout}
      />
      
    </section>
  );
};

export default Pricing;
