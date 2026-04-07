'use client';

import React, { useState, useEffect } from 'react';
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
import { CheckCircle2, X, Info } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>['checkout'];

export type PlanName = 'Small' | 'Medium' | 'Large' | 'Extra Large';
type AccessType = 'vpn' | 'rdp';

type PlanDetails = {
  price: number;
  specs: {
    cpu: string;
    ram: string;
    storage: string;
    network: string;
    os: string;
  };
};

const planData: Record<PlanName, PlanDetails> = {
  Small: {
    price: 30,
    specs: {
        cpu: '2-core CPU @ 3.6 GHz per core',
        ram: '4 GB RAM',
        storage: '60 GB NVMe SSD',
        network: '1 Gbit/s',
        os: 'Windows Server 2025',
    }
  },
  Medium: {
    price: 60,
    specs: {
        cpu: '4-core CPU @ 3.6 GHz per core',
        ram: '8 GB RAM',
        storage: '60 GB NVMe SSD',
        network: '1 Gbit/s',
        os: 'Windows Server 2025',
    }
  },
  Large: {
    price: 90,
    specs: {
        cpu: '8-core CPU @ 3.6 GHz per core',
        ram: '16 GB RAM',
        storage: '60 GB NVMe SSD',
        network: '1 Gbit/s',
        os: 'Windows Server 2025',
    }
  },
  'Extra Large': {
    price: 150,
    specs: {
      cpu: '16-core CPU @ 3.6 GHz per core',
      ram: '32 GB RAM',
      storage: '60 GB NVMe SSD',
      network: '1 Gbit/s',
      os: 'Windows Server 2025',
    }
  }
};

type CheckoutModalProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialPlan: PlanName;
  dictionary: Dictionary;
};

export const CheckoutModal = ({ isOpen, onOpenChange, initialPlan, dictionary }: CheckoutModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanName>(initialPlan);
  const [accessType, setAccessType] = useState<AccessType>('vpn');
  const [hasDailyBackups, setHasDailyBackups] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(initialPlan);
      setAccessType('vpn');
      setHasDailyBackups(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialPlan]);

  const handleContinue = () => {
    setErrorMessage(null);
    let urlKey: keyof typeof stripeLinks.small;

    if (accessType === 'rdp') {
      // RDP includes dedicated IP, so we use the 'ip' and 'backup_ip' links
      urlKey = hasDailyBackups ? 'backup_ip' : 'ip';
    } else { // VPN access
      // VPN has its own base price, uses 'base' and 'backup' links
      urlKey = hasDailyBackups ? 'backup' : 'base';
    }

    const planKey = selectedPlan.replace(' ', '').toLowerCase() as keyof typeof stripeLinks;
    const checkoutUrl = stripeLinks[planKey]?.[urlKey];

    if (!checkoutUrl) {
      setErrorMessage(dictionary.notConfiguredError);
    } else {
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const currentPlanData = planData[selectedPlan];
  const rdpExtraCost = accessType === 'rdp' ? 10 : 0;
  const planDisplayPrice = currentPlanData.price + rdpExtraCost;
  const backupsPrice = hasDailyBackups ? 10 : 0;
  const totalPrice = planDisplayPrice + backupsPrice;
  const firstMonthPrice = planDisplayPrice + backupsPrice;
  
  const SpecItem = ({ label, value }: { label: string; value: string }) => (
    <li className="flex items-start gap-3">
        <CheckCircle2 className="h-4 w-4 text-primary/80 mt-0.5 shrink-0" />
        <div>
            <span className="font-medium text-white">{label}:</span>
            <span className="text-gray-300 ml-1">{value}</span>
        </div>
    </li>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card/80 border-border/70 backdrop-blur-xl text-white sm:max-w-4xl p-0 flex flex-col max-h-[90dvh] overflow-hidden">
        
        <DialogClose className="absolute right-3 top-3 z-50 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white h-11 w-11 flex items-center justify-center">
            <X className="h-5 w-5" />
            <span className="sr-only">{dictionary.close}</span>
        </DialogClose>
        
        <DialogHeader className="p-6 pb-4 shrink-0">
          <DialogTitle className="text-2xl font-bold font-headline text-white text-center">
            {dictionary.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] px-6">
           <div className="mb-6">
            <h3 className="font-semibold text-white text-center mb-3">{dictionary.accessType.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                onClick={() => setAccessType('vpn')}
                className={cn(
                  'p-4 rounded-lg border-2 cursor-pointer transition-all',
                  accessType === 'vpn' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border/50 bg-black/20 hover:border-primary/50'
                )}
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold text-white">{dictionary.accessType.vpn.title}</h4>
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">{dictionary.accessType.recommended}</span>
                </div>
                <p className="text-xs text-gray-400">{dictionary.accessType.vpn.description}</p>
              </div>
              <div
                onClick={() => setAccessType('rdp')}
                className={cn(
                  'p-4 rounded-lg border-2 cursor-pointer transition-all',
                  accessType === 'rdp' ? 'border-primary bg-primary/10 shadow-lg' : 'border-border/50 bg-black/20 hover:border-primary/50'
                )}
              >
                <h4 className="font-semibold text-white mb-1">{dictionary.accessType.rdp.title}</h4>
                <p className="text-xs text-gray-400">{dictionary.accessType.rdp.description}</p>
                <p className="text-xs text-amber-500/80 mt-2">{dictionary.accessType.rdp.note}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            {/* Left Side */}
            <div>
              <div className="flex justify-center space-x-2 mb-6 bg-black/20 p-1 rounded-md">
                {(Object.keys(planData) as PlanName[]).map((plan) => (
                  <Button
                    key={plan}
                    variant={selectedPlan === plan ? 'default' : 'ghost'}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      "flex-1 transition-all", 
                      selectedPlan === plan ? 'bg-primary text-primary-foreground shadow-md' : 'text-gray-400 hover:bg-black/30 hover:text-white'
                    )}
                  >
                    {dictionary.plans[plan.replace(' ', '').toLowerCase() as keyof typeof dictionary.plans]}
                  </Button>
                ))}
              </div>

               <div>
                  <p className="font-semibold text-white">
                    {dictionary.plans[selectedPlan.replace(' ', '').toLowerCase() as keyof typeof dictionary.plans]} {dictionary.plan}
                  </p>
                  <p className="text-lg font-bold text-primary">
                    €{planDisplayPrice} <span className="text-sm font-normal text-gray-400">/ {dictionary.perMonth}</span>
                  </p>
              </div>
              
              <Separator className="bg-border/50 my-4" />
              
              <ul className="space-y-3 text-sm">
                <SpecItem label="CPU" value={currentPlanData.specs.cpu} />
                <SpecItem label="RAM" value={currentPlanData.specs.ram} />
                <SpecItem label={dictionary.specs.storage} value={currentPlanData.specs.storage} />
                <SpecItem label={dictionary.specs.network} value={currentPlanData.specs.network} />
                <SpecItem label={dictionary.specs.os} value={currentPlanData.specs.os} />
                <SpecItem label={dictionary.specs.security} value={accessType === 'vpn' ? dictionary.accessType.vpn.spec : dictionary.accessType.rdp.spec} />
              </ul>
            </div>

            {/* Right Side */}
            <div className="flex flex-col">
              <div className="space-y-4">
                <h3 className="font-semibold text-white">{dictionary.addOns.title}</h3>
                  <div className="flex items-start space-x-3 rounded-md border border-transparent p-3 hover:border-border/50 hover:bg-black/20 transition-all">
                    <Checkbox
                      id="dailyBackups"
                      checked={hasDailyBackups}
                      onCheckedChange={(checked) => setHasDailyBackups(!!checked)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary mt-1"
                    />
                    <Label htmlFor="dailyBackups" className="flex-1 cursor-pointer">
                      <span className="font-medium text-white">{dictionary.addOns.backups.title}</span>
                      <span className="text-sm text-gray-400 block">{dictionary.addOns.backups.price.replace('{price}', '10')}</span>
                    </Label>
                  </div>
                  {accessType === 'vpn' ? (
                    <div className="flex items-start space-x-3 rounded-md p-3 transition-all">
                        <CheckCircle2 className="h-5 w-5 text-primary/80 mt-0.5 shrink-0" />
                        <div className="flex-1">
                            <span className="font-medium text-white">{dictionary.addOns.fixedIpVpn.title}</span>
                            <span className="text-sm text-gray-400 block">{dictionary.addOns.fixedIpVpn.description}</span>
                        </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-3 rounded-md p-3 transition-all">
                        <CheckCircle2 className="h-5 w-5 text-primary/80 mt-0.5 shrink-0" />
                        <div className="flex-1">
                            <span className="font-medium text-white">{dictionary.addOns.dedicatedIpRdp.title}</span>
                            <span className="text-sm text-gray-400 block">{dictionary.addOns.dedicatedIpRdp.description}</span>
                        </div>
                    </div>
                  )}
              </div>

              <div className="mt-4 p-4 rounded-lg bg-black/20 border border-border/50 shadow-inner">
                <h3 className="font-bold text-white flex items-center gap-2"><Info className="text-primary"/>{dictionary.offer.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{dictionary.offer.body}</p>
              </div>

              <Separator className="bg-border/50 my-4" />

              <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">{dictionary.summary.accessType.label}:</span> <span>{accessType === 'vpn' ? dictionary.summary.accessType.vpn : dictionary.summary.accessType.rdp}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">{dictionary.summary.plan}: {dictionary.plans[selectedPlan.replace(' ', '').toLowerCase() as keyof typeof dictionary.plans]} VDS</span> <span>€{planDisplayPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">{dictionary.summary.backups}:</span> <span>{hasDailyBackups ? '€10.00' : '—'}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">{dictionary.summary.setupFee}:</span> <span>€0.00</span></div>
              </div>

              <Separator className="bg-border/50 my-3" />

              <div className="space-y-2">
                  <div className="flex justify-between font-bold text-primary"><span className="text-primary">{dictionary.summary.dueToday}:</span> <span className="text-primary">€0.00</span></div>
                  <div className="flex justify-between font-bold"><span className="text-white">{dictionary.summary.firstMonth}:</span> <span className="text-white">€{firstMonthPrice.toFixed(2)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-gray-400">{dictionary.summary.recurring}:</span> <span className="text-gray-400">€{totalPrice.toFixed(2)} / {dictionary.perMonth}</span></div>
              </div>

            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-col gap-4 p-6 pt-4 shrink-0 bg-card/80">
           <div className="flex flex-col w-full">
             <Button type="button" onClick={handleContinue} size="lg">
                {dictionary.cta}
              </Button>
            {errorMessage && <p className="text-sm text-destructive mt-2 text-center" dangerouslySetInnerHTML={{ __html: errorMessage }} />}
          </div>
           <p className="text-xs text-gray-500 text-center">{dictionary.secureNote}</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
