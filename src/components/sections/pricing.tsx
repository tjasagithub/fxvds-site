
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckoutModal, PlanName } from './checkout-modal';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

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
      isCustom: false,
    },
    {
      name: 'Medium' as PlanName,
      price: '€60',
      features: dictionary.medium.features,
      isCustom: false,
    },
    {
      name: 'Large' as PlanName,
      price: '€90',
      features: dictionary.large.features,
      isCustom: false,
    },
    {
      name: 'Extra Large' as PlanName,
      price: '€150',
      features: dictionary.extraLarge.features,
      isCustom: false,
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
          <p className="mt-4 text-lg text-gray-400">
            {dictionary.subtitle2}
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-card/30 border border-primary/20 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-primary flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6" />
                    {dictionary.earlyAccess.title}
                </h3>
                <p className="text-gray-300 mt-3 text-sm">
                    {dictionary.earlyAccess.body}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-400 list-disc list-inside">
                    {dictionary.earlyAccess.bullets.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <p className="text-xs text-gray-500 mt-4">{dictionary.earlyAccess.note}</p>
            </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => {
            const isSelected = activePlan === plan.name;
            return (
              <Card
                key={plan.name}
                onClick={() => !plan.isCustom && setActivePlan(plan.name as PlanName)}
                className={cn(
                  'flex flex-col border-border/70 bg-card/50 transition-all duration-300',
                  !plan.isCustom && 'hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer',
                  isSelected && !plan.isCustom && 'border-primary/50 shadow-2xl shadow-primary/20 relative ring-2 ring-primary/50'
                )}
              >
                {isSelected && !plan.isCustom && (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 via-primary/70 to-primary/80 opacity-75 blur-lg" />
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
                  {plan.isCustom ? (
                     <Button asChild className="w-full" variant="outline">
                        <Link href="#contact">{dictionary.contactCta}</Link>
                     </Button>
                  ) : (
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetStartedClick(plan.name as PlanName);
                      }}
                      className="w-full" 
                      variant={isSelected ? 'default' : 'outline'}
                    >
                      {dictionary.cta}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 text-center text-gray-400 space-y-2">
           <p dangerouslySetInnerHTML={{ __html: dictionary.customSetup.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
           <p className="text-xs" dangerouslySetInnerHTML={{ __html: dictionary.cryptoPayments.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
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
