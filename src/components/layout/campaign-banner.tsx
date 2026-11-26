
'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Campaign } from '@/lib/campaign';
import { useCampaign } from '@/hooks/use-campaign';
import { getDictionary } from '@/lib/get-dictionary';

type CampaignDictionary = Awaited<ReturnType<typeof getDictionary>>['campaign'];

// Per campaign, so a dismissed Black Friday banner does not hide Cyber Monday.
const storageKey = (campaign: Campaign) => `fxvds:campaign-dismissed:${campaign}`;

const isDismissed = (campaign: Campaign) => {
  try {
    return window.localStorage.getItem(storageKey(campaign)) === '1';
  } catch {
    return false;
  }
};

const CampaignBanner = ({ dictionary }: { dictionary: CampaignDictionary }) => {
  const campaign = useCampaign();
  const [visibleFor, setVisibleFor] = useState<Campaign | null>(null);

  useEffect(() => {
    if (campaign === 'none') {
      setVisibleFor(null);
      return;
    }
    setVisibleFor(isDismissed(campaign) ? null : campaign);
  }, [campaign]);

  if (!visibleFor || visibleFor === 'none') return null;

  const dismiss = () => {
    try {
      window.localStorage.setItem(storageKey(visibleFor), '1');
    } catch {
      // Storage unavailable (private mode) — hiding for this page view is enough.
    }
    setVisibleFor(null);
  };

  const message =
    visibleFor === 'black-friday' ? dictionary.banner.blackFriday : dictionary.banner.cyberMonday;

  return (
    <div className="relative w-full border-b border-primary/30 bg-black">
      <div className="container mx-auto flex min-h-[2.75rem] items-center justify-center px-10 py-2 md:px-6">
        <p className="text-center text-xs font-bold tracking-wide text-primary sm:text-sm">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label={dictionary.dismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-primary/70 transition-colors hover:bg-white/10 hover:text-primary"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CampaignBanner;
