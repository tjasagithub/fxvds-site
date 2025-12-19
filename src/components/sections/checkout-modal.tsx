
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { stripeLinks } from '@/lib/stripe-links';
import { cn } from '@/lib/utils';
import { Cpu, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export type PlanName = 'Small' | 'Medium' | 'Large';

type PlanDetails = {
  price: number;
  specs: string[];
};

const planData: Record<PlanName, PlanDetails> = {
  Small: {
    price: 30,
    specs: ['2-core CPU', '4 GB RAM', 'Windows Server 2025', '1 Gbit/s', 'Secure VPN'],
  },
  Medium: {
    price: 60,
    specs: ['4-core CPU', '8 GB RAM', 'Windows Server 2025', '1 Gbit/s', 'Secure VPN'],
  },
  Large: {
    price: 90,
    specs: ['8-core CPU', '16 GB RAM', 'Windows Server 2025', '1 Gbit/s', 'Secure VPN'],
  },
};

type CheckoutModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialPlan: PlanName;
};

export const CheckoutModal = ({ isOpen, onOpenChange, initialPlan }: CheckoutModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanName>(initialPlan);
  const [hasDailyBackups, setHasDailyBackups] = useState(false);
  const [hasDedicatedIp, setHasDedicatedIp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialPlan);
      setHasDailyBackups(false);
      setHasDedicatedIp(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialPlan]);


  const handleContinue = () => {
    setErrorMessage(null);
    let urlKey: keyof typeof stripeLinks.Small = 'base';
    if (hasDailyBackups && hasDedicatedIp) {
      urlKey = 'backup_ip';
    } else if (hasDailyBackups) {
      urlKey = 'backup';
    } else if (hasDedicatedIp) {
      urlKey = 'ip';
    }

    const planKey = selectedPlan.toLowerCase() as keyof typeof stripeLinks;
    const checkoutUrl = stripeLinks[planKey][urlKey];

    if (checkoutUrl.includes('_URL')) {
      setErrorMessage('Checkout link not configured yet.');
    } else {
      window.location.href = checkoutUrl;
    }
  };

  const currentPlanData = planData[selectedPlan];
  const backupsPrice = hasDailyBackups ? 10 : 0;
  const ipPrice = hasDedicatedIp ? 10 : 0;
  const totalPrice = currentPlanData.price + backupsPrice + ipPrice;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/80 border-border/70 backdrop-blur-xl text-white sm:max-w-2xl p-0 flex flex-col max-h-[85dvh]">
        <DialogHeader className="p-6 pb-4 sticky top-0 bg-card/80 backdrop-blur-xl z-10 shrink-0">
          <DialogTitle className="text-2xl font-bold font-headline text-white text-center">
            Select your setup
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 pt-2">
            {/* Left Side */}
            <div>
              <div className="flex justify-center space-x-2 mb-6 bg-black/20 p-1 rounded-md">
                {(['Small', 'Medium', 'Large'] as PlanName[]).map((plan) => (
                  <Button
                    key={plan}
                    variant={selectedPlan === plan ? 'default' : 'ghost'}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn("flex-1 transition-all", selectedPlan === plan ? 'bg-primary text-primary-foreground' : 'text-gray-400 hover:bg-black/30 hover:text-white')}
                  >
                    {plan}
                  </Button>
                ))}
              </div>

               <div>
                  <p className="font-semibold text-white">
                    {selectedPlan} Plan
                  </p>
                  <p className="text-lg font-bold text-primary">
                    €{currentPlanData.price} <span className="text-sm font-normal text-gray-400">/ month</span>
                  </p>
              </div>
              
              <Separator className="bg-border/50 my-4" />
              
              <ul className="space-y-2 text-sm text-gray-300">
                  {currentPlanData.specs.map(spec => (
                      <li key={spec} className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-primary/80" />
                          <span>{spec}</span>
                      </li>
                  ))}
              </ul>
            </div>

            {/* Right Side */}
            <div className="flex flex-col">
              <div className="space-y-4">
                <h3 className="font-semibold text-white">Optional add-ons</h3>
                  <div className="flex items-start space-x-3 rounded-md border border-transparent p-3 hover:border-border/50 hover:bg-black/20 transition-all">
                    <Checkbox
                      id="dailyBackups"
                      checked={hasDailyBackups}
                      onCheckedChange={(checked) => setHasDailyBackups(!!checked)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                    />
                    <Label htmlFor="dailyBackups" className="flex-1 cursor-pointer">
                      <span className="font-medium text-white">Daily Backups</span>
                      <span className="text-sm text-gray-400 block">+€10/month</span>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 rounded-md border border-transparent p-3 hover:border-border/50 hover:bg-black/20 transition-all">
                    <Checkbox
                      id="dedicatedIp"
                      checked={hasDedicatedIp}
                      onCheckedChange={(checked) => setHasDedicatedIp(!!checked)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                    />
                    <Label htmlFor="dedicatedIp" className="flex-1 cursor-pointer">
                      <span className="font-medium text-white">Dedicated IP</span>
                      <span className="text-sm text-gray-400 block">+€10/month</span>
                    </Label>
                  </div>
              </div>

              <Separator className="bg-border/50 my-6" />

              <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Plan: {selectedPlan} VDS</span> <span>€{currentPlanData.price}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Backups:</span> <span>{hasDailyBackups ? '€10' : '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Dedicated IP:</span> <span>{hasDedicatedIp ? '€10' : '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Setup fee:</span> <span>€0</span></div>
              </div>

              <Separator className="bg-border/50 my-4" />

              <div className="space-y-2">
                  <div className="flex justify-between font-bold"><span className="text-white">Monthly:</span> <span className="text-white">€{totalPrice}</span></div>
                  <div className="flex justify-between font-bold text-primary"><span className="text-primary">Due today:</span> <span className="text-primary">€0</span></div>
              </div>

            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-col gap-4 p-6 pt-4 sticky bottom-0 bg-card/80 backdrop-blur-xl z-10 shrink-0">
           <div className="flex flex-col w-full">
             <Button type="button" onClick={handleContinue} size="lg">
                Start your free trial now
              </Button>
            {errorMessage && <p className="text-sm text-destructive mt-2 text-center">{errorMessage}</p>}
          </div>
           <p className="text-xs text-gray-500 text-center">You’ll complete your subscription securely on Stripe.</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
