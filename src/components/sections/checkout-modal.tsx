
'use client';

import React, { useState, useMemo } from 'react';
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

export type PlanName = 'Small' | 'Medium' | 'Large';

type CheckoutModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: PlanName;
};

export const CheckoutModal = ({ isOpen, onOpenChange, selectedPlan }: CheckoutModalProps) => {
  const [hasDailyBackups, setHasDailyBackups] = useState(false);
  const [hasDedicatedIp, setHasDedicatedIp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const planPrice = selectedPlan === 'Small' ? 30 : selectedPlan === 'Medium' ? 60 : 90;
  const backupsPrice = hasDailyBackups ? 10 : 0;
  const ipPrice = hasDedicatedIp ? 10 : 0;
  const totalPrice = planPrice + backupsPrice + ipPrice;
  
  const summaryText = useMemo(() => {
    const addons = [];
    if(hasDailyBackups) addons.push("Daily Backups");
    if(hasDedicatedIp) addons.push("Dedicated IP");

    if(addons.length > 0) {
      return `You will be purchasing the ${selectedPlan} plan with ${addons.join(" and ")}.`;
    }
    return `You will be purchasing the ${selectedPlan} plan.`;
  }, [selectedPlan, hasDailyBackups, hasDedicatedIp]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/80 border-border/70 backdrop-blur-xl text-white sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-headline text-white">
            Select your setup
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <p className="font-semibold text-white">
              Selected Plan: <span className="text-primary">{selectedPlan}</span>
            </p>
            <p className="text-sm text-gray-400">
              Base price: €{planPrice} / month
            </p>
          </div>

          <Separator className="bg-border/50" />

          <div>
            <h3 className="font-semibold text-white mb-4">Optional add-ons</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 rounded-md border border-transparent p-3 hover:border-border/50 hover:bg-black/20 transition-all">
                <Checkbox
                  id="dailyBackups"
                  checked={hasDailyBackups}
                  onCheckedChange={(checked) => setHasDailyBackups(!!checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="dailyBackups" className="flex-1 cursor-pointer">
                  <span className="font-medium text-white">Daily Backups</span>
                  <span className="text-sm text-gray-400 block">+€10/month</span>
                </Label>
              </div>
              <div className="flex items-center space-x-3 rounded-md border border-transparent p-3 hover:border-border/50 hover:bg-black/20 transition-all">
                <Checkbox
                  id="dedicatedIp"
                  checked={hasDedicatedIp}
                  onCheckedChange={(checked) => setHasDedicatedIp(!!checked)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="dedicatedIp" className="flex-1 cursor-pointer">
                  <span className="font-medium text-white">Dedicated IP</span>
                  <span className="text-sm text-gray-400 block">+€10/month</span>
                </Label>
              </div>
            </div>
          </div>
          
          <Separator className="bg-border/50" />

          <div>
            <p className="text-sm text-gray-300 mb-2">{summaryText}</p>
            <p className="text-xl font-bold text-white">Total: €{totalPrice}/month</p>
          </div>

        </div>

        <DialogFooter className="sm:justify-between gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
          </DialogClose>
          <div className="flex flex-col w-full sm:w-auto">
             <Button type="button" onClick={handleContinue} className="w-full sm:w-auto">
                Continue to checkout
              </Button>
            {errorMessage && <p className="text-sm text-destructive mt-2 text-center sm:text-right">{errorMessage}</p>}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
