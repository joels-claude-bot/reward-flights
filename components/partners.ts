// Amex UK Membership Rewards → airline transfer partners.
// Single source of truth: both the partners table and the points-value
// calculator import from here so the ratios never drift apart.
// Source: American Express UK "Transfer partners" page (captured 2026-06-26).
// Ratios are "MR points in : airline miles out".

export interface AirlinePartner {
  // Display name of the airline loyalty programme.
  airline: string;
  // Currency the points convert into (Avios, miles, etc.).
  currency: string;
  // How many MR points you must spend to get `milesOut` airline miles.
  pointsIn: number;
  // How many airline miles `pointsIn` MR points produce.
  milesOut: number;
  // Human-readable estimated transfer time, verbatim from Amex.
  transferTime: string;
  // Minimum number of MR points per transfer.
  minTransfer: number;
  // Optional banner shown against the row (e.g. maintenance outage).
  note?: string;
}

// milesPerPoint(partner) = airline miles received per 1 MR point.
// Out: a number (e.g. 1, 0.5, 0.667) used by the calculator.
export function milesPerPoint(partner: AirlinePartner): number {
  return partner.milesOut / partner.pointsIn;
}

// simplifiedRatio(partner) = the transfer ratio reduced to small whole numbers.
// Out: a string like "1:1", "2:1" or "3:2" (strips the 1000:1000 noise).
export function simplifiedRatio(partner: AirlinePartner): string {
  const gcd = (left: number, right: number): number => (right === 0 ? left : gcd(right, left % right));
  const divisor = gcd(partner.pointsIn, partner.milesOut) || 1;
  return `${partner.pointsIn / divisor}:${partner.milesOut / divisor}`;
}

export type RatioRating = 'good' | 'ok' | 'bad';

// ratioRating(partner) = traffic-light quality of the transfer ratio.
// Out: 'good' for 1:1 or better, 'ok' for between (e.g. 3:2), 'bad' for 2:1 or worse.
export function ratioRating(partner: AirlinePartner): RatioRating {
  const rate = milesPerPoint(partner);
  if (rate >= 1) return 'good';
  if (rate > 0.5) return 'ok';
  return 'bad';
}

export const AIRLINE_PARTNERS: AirlinePartner[] = [
  {
    airline: 'British Airways Club',
    currency: 'Avios',
    pointsIn: 1,
    milesOut: 1,
    transferTime: 'Instant',
    minTransfer: 1000,
  },
  {
    airline: 'Cathay',
    currency: 'Asia Miles',
    pointsIn: 1,
    milesOut: 1,
    transferTime: '3 working days',
    minTransfer: 1000,
    note: 'Temporary outage: transfers unavailable Tue 30 Jun 2026, 4am–4pm BST (system maintenance).',
  },
  {
    airline: 'Delta SkyMiles',
    currency: 'SkyMiles',
    pointsIn: 1000,
    milesOut: 1000,
    transferTime: 'Up to 30 minutes',
    minTransfer: 1000,
  },
  {
    airline: 'Emirates Skywards',
    currency: 'Skywards miles',
    pointsIn: 2,
    milesOut: 1,
    transferTime: '2 working days',
    minTransfer: 1000,
  },
  {
    airline: 'Flying Blue',
    currency: 'Flying Blue miles',
    pointsIn: 1,
    milesOut: 1,
    transferTime: '4 working days',
    minTransfer: 500,
  },
  {
    airline: 'Iberia Club',
    currency: 'Avios',
    pointsIn: 1,
    milesOut: 1,
    transferTime: '4 working days',
    minTransfer: 1000,
  },
  {
    airline: 'Qantas Frequent Flyer',
    currency: 'Qantas Points',
    pointsIn: 1,
    milesOut: 1,
    transferTime: '3 business days',
    minTransfer: 500,
  },
  {
    airline: 'Qatar Airways Privilege Club',
    currency: 'Avios',
    pointsIn: 1,
    milesOut: 1,
    transferTime: 'Up to 48 hours',
    minTransfer: 500,
  },
  {
    airline: 'SAS EuroBonus',
    currency: 'EuroBonus points',
    pointsIn: 1,
    milesOut: 1,
    transferTime: '5 working days',
    minTransfer: 1000,
  },
  {
    airline: 'Singapore KrisFlyer',
    currency: 'KrisFlyer miles',
    pointsIn: 3,
    milesOut: 2,
    transferTime: '15 working days',
    minTransfer: 900,
  },
  {
    airline: 'Virgin Atlantic Flying Club',
    currency: 'Virgin Points',
    pointsIn: 1,
    milesOut: 1,
    transferTime: 'Instant',
    minTransfer: 1000,
  },
];
