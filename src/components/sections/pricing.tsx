'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Small',
    price: '€30',
    features: ['2-core CPU', '4 GB RAM'],
  },
  {
    name: 'Medium',
    price: '€60',
    features: ['4-core CPU', '8 GB RAM'],
  },
  {
    name: 'Large',
    price: '€90',
    features: ['8-core CPU', '16 GB RAM'],
  },
];

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('Medium');

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
            const isSelected = selectedPlan === plan.name;
            return (
              <Card
                key={plan.name}
                onClick={() => setSelectedPlan(plan.name)}
                className={cn(
                  'flex flex-col border-border/70 bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer',
                  isSelected && 'border-primary/50 shadow-2xl shadow-primary/20 relative'
                )}
              >
                {isSelected && (
                  <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 to-primary/80 opacity-50 blur-lg" />
                )}
                <CardHeader className="text-center relative">
                  <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-4xl font-extrabold text-white mt-4">
                    {plan.price}
                    <span className="text-base font-medium text-gray-400"> / month</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center relative">
                  <ul className="space-y-3 text-gray-300">
                    {plan.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="relative">
                  <Button asChild className="w-full" variant={isSelected ? 'default' : 'outline'}>
                    <Link href="#">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>
            Need more power or a custom setup? Just <Link href="#contact" className="text-primary hover:underline">send us a message</Link>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
