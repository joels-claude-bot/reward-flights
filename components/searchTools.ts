// Award-search aggregators and which Amex UK airline partners each one covers.
// Single source of truth for the AwardSearchMatrix component.
// Coverage last checked: 2026-06-28. Tools add/drop programmes often — the
// `check` cells are ones NOT confirmed in the tool's published list at that date;
// verify on the tool's own site (linked) before relying on them.
// Sources: seats.aero (awardwallet.com guide), awardtool.com, seatspy.com, pointsyeah.com.

export const COVERAGE_LAST_CHECKED = '2026-06-28';

export type Coverage = 'yes' | 'no' | 'check';

export interface SearchTool {
  // Display name of the tool.
  name: string;
  // Homepage / supported-programmes page.
  url: string;
  // Pricing summary as of COVERAGE_LAST_CHECKED.
  price: string;
  // One-line "what it's best at".
  note: string;
  // Coverage keyed by airline name (must match components/partners.ts).
  covers: Record<string, Coverage>;
}

export const SEARCH_TOOLS: SearchTool[] = [
  {
    name: 'seats.aero',
    url: 'https://seats.aero/',
    price: 'Free (2 months out) · Pro $9.99/mo',
    note: 'Fast multi-programme search; Pro adds a full year, live search and alerts.',
    covers: {
      'British Airways Club': 'no',
      Cathay: 'no',
      'Delta SkyMiles': 'yes',
      'Emirates Skywards': 'yes',
      'Flying Blue': 'yes',
      'Iberia Club': 'no',
      'Qantas Frequent Flyer': 'yes',
      'Qatar Airways Privilege Club': 'yes',
      'SAS EuroBonus': 'yes',
      'Singapore KrisFlyer': 'yes',
      'Virgin Atlantic Flying Club': 'yes',
    },
  },
  {
    name: 'AwardTool (award.flights)',
    url: 'https://www.awardtool.com/',
    price: 'Free tier · paid plans',
    note: 'Broadest coverage — all three alliances; free availability alerts.',
    covers: {
      'British Airways Club': 'yes',
      Cathay: 'yes',
      'Delta SkyMiles': 'yes',
      'Emirates Skywards': 'yes',
      'Flying Blue': 'yes',
      'Iberia Club': 'yes',
      'Qantas Frequent Flyer': 'yes',
      'Qatar Airways Privilege Club': 'yes',
      'SAS EuroBonus': 'check',
      'Singapore KrisFlyer': 'yes',
      'Virgin Atlantic Flying Club': 'yes',
    },
  },
  {
    name: 'SeatSpy',
    url: 'https://www.seatspy.com/',
    price: 'Subscription (UK)',
    note: 'UK-focused; deepest on BA Avios and Virgin Atlantic dynamic pricing.',
    covers: {
      'British Airways Club': 'yes',
      Cathay: 'yes', // SeatSpy tracks Cathay Pacific
      'Delta SkyMiles': 'no',
      'Emirates Skywards': 'no',
      'Flying Blue': 'yes', // via Air France + KLM
      'Iberia Club': 'yes',
      'Qantas Frequent Flyer': 'no',
      'Qatar Airways Privilege Club': 'no',
      'SAS EuroBonus': 'no',
      'Singapore KrisFlyer': 'no',
      'Virgin Atlantic Flying Club': 'yes',
    },
  },
  {
    name: 'PointsYeah',
    url: 'https://www.pointsyeah.com/',
    price: 'Free unlimited basic · paid Premium',
    note: 'Strong free tier and alerts across 22+ programmes; reads Amex MR directly.',
    covers: {
      'British Airways Club': 'no',
      Cathay: 'no',
      'Delta SkyMiles': 'yes',
      'Emirates Skywards': 'no',
      'Flying Blue': 'yes',
      'Iberia Club': 'no',
      'Qantas Frequent Flyer': 'yes',
      'Qatar Airways Privilege Club': 'yes',
      'SAS EuroBonus': 'no',
      'Singapore KrisFlyer': 'no',
      'Virgin Atlantic Flying Club': 'yes',
    },
  },
];
