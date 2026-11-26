
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckoutModal, PlanName } from './checkout-modal';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';
import { ShieldCheck, Info, X } from 'lucide-react';
import { useCampaign } from '@/hooks/use-campaign';

type PricingDictionary = Awaited<ReturnType<typeof getDictionary>>['pricing'];

const Pricing = ({ dictionary }: { dictionary: PricingDictionary }) => {
  const campaign = useCampaign();
  const [activePlan, setActivePlan] = useState<PlanName>('Medium');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPlan, setModalPlan] = useState<PlanName>('Medium');
  const [isEarlyAccessVisible, setIsEarlyAccessVisible] = useState(true);
  const pricingSectionRef = useRef<HTMLDivElement>(null);
  const earlyAccessRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEarlyAccessVisible) return;
    
    const sectionEl = pricingSectionRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if (earlyAccessRef.current && !earlyAccessRef.current.contains(event.target as Node)) {
        setIsEarlyAccessVisible(false);
      }
    };
    
    if (sectionEl) {
      sectionEl.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (sectionEl) {
        sectionEl.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [isEarlyAccessVisible]);

  const plans = [
    {
      name: 'Small' as PlanName,
      price: '€30',
      regularPrice: '€60', // display only — doubled "regular" price, never charged
      features: dictionary.small.features,
      isCustom: false,
    },
    {
      name: 'Medium' as PlanName,
      price: '€60',
      regularPrice: '€120', // display only — doubled "regular" price, never charged
      features: dictionary.medium.features,
      isCustom: false,
    },
    {
      name: 'Large' as PlanName,
      price: '€90',
      regularPrice: '€180', // display only — doubled "regular" price, never charged
      features: dictionary.large.features,
      isCustom: false,
    },
    {
      name: 'Extra Large' as PlanName,
      price: '€150',
      regularPrice: '€300', // display only — doubled "regular" price, never charged
      features: dictionary.extraLarge.features,
      isCustom: false,
    },
  ];

  const handleGetStartedClick = (planName: PlanName) => {
    setModalPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <section id="pricing" ref={pricingSectionRef} className="py-20 md:py-32 bg-background">
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

        <div className="mt-12 max-w-4xl mx-auto min-h-[250px] flex flex-col justify-center">
          {isEarlyAccessVisible ? (
            <div ref={earlyAccessRef} className="relative bg-card/30 border border-primary/20 rounded-xl p-6 shadow-lg animate-in fade-in duration-500">
              <button
                onClick={() => setIsEarlyAccessVisible(false)}
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-white rounded-full transition-colors hover:bg-white/10 z-10"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close notice</span>
              </button>
              <h3 className="text-xl font-bold text-primary flex items-center gap-3 mt-2">
                  <ShieldCheck className="h-6 w-6" />
                  {dictionary.earlyAccess.bannerTitle}
              </h3>
              <p className="text-gray-300 mt-3 text-sm">
                  {dictionary.earlyAccess.bannerBody}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center animate-in fade-in duration-500">
              <Button variant="outline" size="sm" onClick={() => setIsEarlyAccessVisible(true)} className="bg-transparent border-primary/30 text-gray-300 hover:bg-primary/10 hover:text-white hover:border-primary/50">
                  <Info className="h-4 w-4 mr-2 text-primary/80" />
                  {dictionary.earlyAccess.bannerTitle}
              </Button>
            </div>
          )}
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
                  <CardDescription className="mt-2">
                    <span className="flex items-baseline justify-center gap-2 flex-wrap">
                      <s className="text-lg font-bold text-gray-400/60">
                        <span className="sr-only">{dictionary.regularPriceLabel} </span>
                        {plan.regularPrice}
                      </s>
                      <span className="text-3xl font-bold text-white/90">{plan.price}</span>
                      <span className="text-sm font-medium text-gray-400"> / {dictionary.perMonth}</span>
                    </span>
                    <span className="mt-1 block text-xs font-medium text-primary">{dictionary.earlyBirdBadge}</span>
                    {campaign !== 'none' && (
                      <span className="mt-2 block rounded-md border border-primary/30 bg-primary/10 px-2 py-1.5 text-xs font-bold text-primary">
                        {dictionary.campaignBadge}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center relative">
                  <ul className="space-y-3 text-gray-300">
                    {plan.features.map((feature) => (
                      <li 
                        key={feature.text} 
                        className={cn(feature.highlighted ? "font-bold text-white" : "text-gray-400")}
                      >
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
        <div className="mt-16 max-w-3xl mx-auto text-left text-gray-300 space-y-8">
          <div>
            <h3 className="text-xl font-bold text-white">{dictionary.earlyBirdExplainer.changingTitle}</h3>
            <p className="mt-3 text-sm text-gray-400">{dictionary.earlyBirdExplainer.changingBody}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{dictionary.earlyBirdExplainer.lockTitle}</h3>
            <p className="mt-3 text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: dictionary.earlyBirdExplainer.lockBody1 }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{dictionary.earlyBirdExplainer.howTitle}</h3>
            <p className="mt-3 text-sm text-gray-400">{dictionary.earlyBirdExplainer.howBody1}</p>
            <p className="mt-3 text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: dictionary.earlyBirdExplainer.howBody2.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{dictionary.serverLocations.title}</h3>
            <p className="mt-3 text-sm text-gray-400">{dictionary.serverLocations.body}</p>
          </div>
          <div className="space-y-2 text-sm text-gray-400">
            <p dangerouslySetInnerHTML={{ __html: dictionary.cryptoPayments.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
            <p dangerouslySetInnerHTML={{ __html: dictionary.customSetup.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
          </div>
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
