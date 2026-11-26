
'use client';

import { useEffect, useState } from 'react';
import { getCampaign, type Campaign } from '@/lib/campaign';

/**
 * Resolves the active campaign in the browser.
 *
 * Starts at 'none' so the statically generated markup matches the first client
 * render (no hydration mismatch), then re-checks every minute so an open tab
 * rolls over from Black Friday to Cyber Monday on its own.
 */
export function useCampaign(): Campaign {
  const [campaign, setCampaign] = useState<Campaign>('none');

  useEffect(() => {
    const update = () => setCampaign(getCampaign());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return campaign;
}
