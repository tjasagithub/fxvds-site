
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckoutModal, PlanName } from './checkout-modal';
import { Gift } from 'lucide-react';

const plans: { name: PlanName; price: string; features: { text: string; highlighted: boolean }[] }[] = [
  {
    name: 'Small',
    price: '€30',
    features: [
      { text: '2-core CPU', highlighted: true },
      { text: '4 GB RAM', highlighted: true },
      { text: '3.6 GHz per core', highlighted: false },
      { text: '60 GB NVMe SSD', highlighted: false },
      { text: '1 Gbit/s high-speed connection', highlighted: false },
    ],
  },
  {
    name: 'Medium',
    price: '€60',
    features: [
        { text: '4-core CPU', highlighted: true },
        { text: '8 GB RAM', highlighted: true },
        { text: '3.6 GHz per core', highlighted: false },
        { text: '60 GB NVMe SSD', highlighted: false },
        { text: '1 Gbit/s high-speed connection', highlighted: false },
    ],
  },
  {
    name: 'Large',
    price: '€90',
    features: [
        { text: '8-core CPU', highlighted: true },
        { text: '16 GB RAM', highlighted: true },
        { text: '3.6 GHz per core', highlighted: false },
        { text: '60 GB NVMe SSD', highlighted: false },
        { text: '1-Gbit/s high-speed connection', highlighted: false },
    ],
  },
];

const Pricing = () => {
  const [activePlan, setActivePlan] = useState<PlanName>('Medium');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState<PlanName>('Medium');

  const handleGetStartedClick = (planName: PlanName) => {
    setModalPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold font-headline text-white">Choose Your Power</h2>
          <p className="mt-4 text-lg text-gray-400">
            Simple, transparent pricing. No hidden fees. Upgrade or downgrade anytime.
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
                  isSelected && 'border-primary/50 shadow-2xl shadow-primary/20 relative ring-2 ring-red-500/50'
                )}
              >
                {isSelected && (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 via-red-500/30 to-primary/80 opacity-50 blur-lg" />
                )}
                <CardHeader className="text-center relative">
                   {isSelected && (
                    <div className="absolute top-0 right-0 m-4 p-2 bg-red-600/80 rounded-full text-white animate-in fade-in-0 zoom-in-50 duration-500">
                      <Gift className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 text-xs items-center justify-center bg-red-500 text-white font-bold text-[9px]">50%</span>
                      </span>
                    </div>
                  )}
                  <CardTitle className="text-3xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-3xl font-bold text-white/90 mt-2">
                    {plan.price}
                    <span className="text-sm font-medium text-gray-400"> / month</span>
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
                    Claim Holiday Offer
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>
            Need more power or a custom setup? Just <a href="#contact" className="text-primary hover:underline">send us a message</a>.
          </p>
        </div>
      </div>
      
      <CheckoutModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialPlan={modalPlan}
      />
      
    </section>
  );
};

export default Pricing;
