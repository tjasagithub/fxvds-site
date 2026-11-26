
export type Campaign = 'black-friday' | 'cyber-monday' | 'none';

const TIME_ZONE = 'Europe/Berlin';

const berlinParts = new Intl.DateTimeFormat('en-US', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/**
 * Wall-clock time in Europe/Berlin as YYYYMMDDHHmm, so campaign windows can be
 * compared as plain numbers without pulling in a date library.
 */
function berlinStamp(date: Date): number {
  const parts: Record<string, string> = {};
  for (const part of berlinParts.formatToParts(date)) {
    if (part.type !== 'literal') parts[part.type] = part.value;
  }
  return Number(`${parts.year}${parts.month}${parts.day}${parts.hour}${parts.minute}`);
}

/** Inclusive windows in Europe/Berlin wall-clock time. */
const CAMPAIGN_WINDOWS: { campaign: Exclude<Campaign, 'none'>; from: number; to: number }[] = [
  // Thu 26 Nov 2026 00:00 → Sun 29 Nov 2026 23:59
  { campaign: 'black-friday', from: 202611260000, to: 202611292359 },
  // Mon 30 Nov 2026 00:00 → Mon 30 Nov 2026 23:59
  { campaign: 'cyber-monday', from: 202611300000, to: 202611302359 },
];

export function getCampaign(now: Date = new Date()): Campaign {
  const stamp = berlinStamp(now);
  const match = CAMPAIGN_WINDOWS.find((window) => stamp >= window.from && stamp <= window.to);
  return match ? match.campaign : 'none';
}
