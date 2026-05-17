
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CheckoutModal, PlanName } from './checkout-modal';
import { getDictionary } from '@/lib/get-dictionary';
import Link from 'next/link';
import { ShieldCheck, Info, X } from 'lucide-react';

type PricingDictionary = Awaited<ReturnType<typeof getDictionary>>['pricing'];

const Pricing = ({ dictionary }: { dictionary: PricingDictionary }) => {
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
      price: '€240',
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
              <p
                  className="text-sm text-primary"
                  dangerouslySetInnerHTML={{ __html: dictionary.earlyAccess.antonNelOffer.replace('{link}', '<a href="#contact" class="font-semibold hover:underline">')}}
              />
              <h3 className="text-xl font-bold text-primary flex items-center gap-3 mt-2">
                  <ShieldCheck className="h-6 w-6" />
                  {dictionary.earlyAccess.title}
              </h3>
              <p className="text-gray-300 mt-3 text-sm">
                  {dictionary.earlyAccess.body}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center animate-in fade-in duration-500">
              <Button variant="outline" size="sm" onClick={() => setIsEarlyAccessVisible(true)} className="bg-transparent border-primary/30 text-gray-300 hover:bg-primary/10 hover:text-white hover:border-primary/50">
                  <Info className="h-4 w-4 mr-2 text-primary/80" />
                  {dictionary.earlyAccess.title}
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
                  <CardDescription className="text-3xl font-bold text-white/90 mt-2">
                    {plan.price}
                    <span className="text-sm font-medium text-gray-400"> / {dictionary.perMonth}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center relative">
                  <ul className="space-y-3 text-gray-300">
                    {plan.features.map((feature) => (
                      <React.Fragment key={feature.text}>
                        <li className={cn(feature.highlighted ? "font-bold text-white" : "text-gray-400")}>
                          {feature.text}
                        </li>
                        {/* CPU clock speed note for USA/UK */}
                        {(feature.text.includes("3.6 GHz")) && (
                          <li className="text-[10px] text-primary/80 -mt-2 font-medium italic">
                            {dictionary.cpuNote}
                          </li>
                        )}
                      </React.Fragment>
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
        <div className="mt-12 text-center text-gray-400">
          <div className="space-y-2">
            <p dangerouslySetInnerHTML={{ __html: dictionary.cryptoPayments.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
            <p dangerouslySetInnerHTML={{ __html: dictionary.customSetup.replace('{link}', '<a href="#contact" class="text-primary hover:underline">') + '</a>' }} />
          </div>

          <div className="pt-8">
            <h3 className="font-semibold text-white text-lg">{dictionary.serverLocations.title}</h3>
            <div className="mt-2 text-gray-400 max-w-3xl mx-auto space-y-4 text-sm">
                <p>{dictionary.serverLocations.body}</p>
            </div>
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
