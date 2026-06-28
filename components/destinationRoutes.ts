// Sweet-spot routes per Amex UK airline partner, as airport codes for map rendering.
// Used by the DestinationMap component. UK origins (LHR/LON) where applicable.
// These are illustrative "where this programme shines" routes, not an exhaustive
// network — treat as starting points and confirm live availability.

export interface AirlineRoutes {
  // Airline name — matches components/partners.ts.
  airline: string;
  // Comma-separated airport-pair codes for Great Circle Mapper (e.g. "LHR-JFK,LHR-LAX").
  codes: string;
  // One-line description of why these routes are the sweet spot.
  blurb: string;
}

export const DESTINATION_ROUTES: AirlineRoutes[] = [
  {
    airline: 'Virgin Atlantic Flying Club',
    codes: 'LHR-JFK,LHR-BOS,LHR-MIA,LHR-LAX,LHR-HND',
    blurb: 'Transatlantic on Virgin/Delta metal, plus ANA (All Nippon Airways) to Tokyo (HND).',
  },
  {
    airline: 'British Airways Club',
    codes: 'LHR-MAD,LHR-FCO,LHR-DOH,LHR-JFK',
    blurb: 'Short-haul Reward Flight Saver across Europe; Qatar Qsuite via Doha (DOH).',
  },
  {
    airline: 'Qatar Airways Privilege Club',
    codes: 'LHR-DOH,DOH-SIN,DOH-BKK,DOH-JNB',
    blurb: 'Qsuite business class via Doha (DOH) to Asia and Africa.',
  },
  {
    airline: 'Flying Blue',
    codes: 'LHR-CDG,CDG-JNB,AMS-NBO,CDG-GIG',
    blurb: 'Air France / KLM via Paris (CDG) and Amsterdam (AMS); strong Africa network.',
  },
  {
    airline: 'Singapore KrisFlyer',
    codes: 'LHR-SIN,SIN-DPS,SIN-SYD',
    blurb: 'Singapore Suites to Singapore (SIN) and onward Southeast Asia / Australia.',
  },
  {
    airline: 'Qantas Frequent Flyer',
    codes: 'LHR-PER,PER-SYD,LHR-SIN',
    blurb: 'Australia via Perth (PER); plus oneworld partner space.',
  },
  {
    airline: 'Emirates Skywards',
    codes: 'LHR-DXB,DXB-MLE,DXB-SYD',
    blurb: 'Emirates first/business via Dubai (DXB).',
  },
  {
    airline: 'Delta SkyMiles',
    codes: 'LHR-ATL,LHR-JFK,LHR-DTW',
    blurb: 'Delta One business to US hubs (Atlanta, New York, Detroit).',
  },
  {
    airline: 'Cathay',
    codes: 'LHR-HKG,HKG-NRT,HKG-SIN',
    blurb: 'Hong Kong (HKG) and onward Asia with Asia Miles.',
  },
  {
    airline: 'SAS EuroBonus',
    codes: 'LHR-CPH,CPH-ARN,CPH-SFO',
    blurb: 'Scandinavia via Copenhagen (CPH); SkyTeam onward.',
  },
  {
    airline: 'Iberia Club',
    codes: 'LHR-MAD,MAD-EZE,MAD-GIG',
    blurb: 'Madrid (MAD) and onward Latin America with Avios.',
  },
];
