// Per-programme status for the two tools we detail: seats.aero and SeatSpy.
// `amexPartner` maps a tool's programme to the matching Amex UK partner name in
// components/partners.ts, or null if it is NOT an Amex UK transfer partner
// (those go in the appendix). Captured 2026-06-28 from each tool's status page.

export const TOOL_STATUS_CHECKED = '2026-06-28';

export type ServiceStatus = 'healthy' | 'degraded' | 'outage';

export interface SeatsAeroProgram {
  // Programme name as shown on seats.aero.
  program: string;
  status: ServiceStatus;
  // Whether seats.aero offers real-time "live search" for this programme.
  liveSearch: boolean;
  // Whether the programme is flagged BETA.
  beta: boolean;
  // Matching Amex UK partner name, or null if not an Amex UK partner.
  amexPartner: string | null;
}

export const SEATS_AERO: SeatsAeroProgram[] = [
  { program: 'Aeromexico', status: 'healthy', liveSearch: false, beta: false, amexPartner: null },
  { program: 'Air Canada Aeroplan', status: 'healthy', liveSearch: false, beta: false, amexPartner: null },
  { program: 'Air France/KLM Flying Blue', status: 'healthy', liveSearch: true, beta: false, amexPartner: 'Flying Blue' },
  { program: 'Alaska Atmos Rewards', status: 'healthy', liveSearch: true, beta: false, amexPartner: null },
  { program: 'American AAdvantage', status: 'healthy', liveSearch: true, beta: false, amexPartner: null },
  { program: 'Azul Fidelidade', status: 'healthy', liveSearch: true, beta: false, amexPartner: null },
  { program: 'Delta SkyMiles', status: 'healthy', liveSearch: true, beta: false, amexPartner: 'Delta SkyMiles' },
  { program: 'Emirates Skywards', status: 'degraded', liveSearch: false, beta: false, amexPartner: 'Emirates Skywards' },
  { program: 'Ethiopian ShebaMiles', status: 'healthy', liveSearch: false, beta: true, amexPartner: null },
  { program: 'Etihad Guest', status: 'healthy', liveSearch: true, beta: false, amexPartner: null },
  { program: 'Finnair Plus', status: 'outage', liveSearch: false, beta: false, amexPartner: null },
  { program: 'Frontier Airlines', status: 'healthy', liveSearch: false, beta: true, amexPartner: null },
  { program: 'GOL Smiles', status: 'degraded', liveSearch: false, beta: false, amexPartner: null },
  { program: 'JetBlue TrueBlue', status: 'healthy', liveSearch: true, beta: false, amexPartner: null },
  { program: 'Lufthansa Miles & More', status: 'healthy', liveSearch: false, beta: true, amexPartner: null },
  { program: 'Qantas Frequent Flyer', status: 'healthy', liveSearch: true, beta: false, amexPartner: 'Qantas Frequent Flyer' },
  { program: 'Qatar Airways Privilege Club', status: 'outage', liveSearch: false, beta: false, amexPartner: 'Qatar Airways Privilege Club' },
  { program: 'SAS EuroBonus', status: 'healthy', liveSearch: false, beta: false, amexPartner: 'SAS EuroBonus' },
  { program: 'Saudia AlFursan', status: 'healthy', liveSearch: false, beta: false, amexPartner: null },
  { program: 'Singapore Airlines KrisFlyer', status: 'outage', liveSearch: false, beta: true, amexPartner: 'Singapore KrisFlyer' },
  { program: 'Turkish Miles&Smiles', status: 'outage', liveSearch: false, beta: false, amexPartner: null },
  { program: 'United MileagePlus', status: 'healthy', liveSearch: true, beta: false, amexPartner: null },
  { program: 'Virgin Atlantic', status: 'healthy', liveSearch: true, beta: false, amexPartner: 'Virgin Atlantic Flying Club' },
  { program: 'Virgin Australia Velocity', status: 'healthy', liveSearch: false, beta: false, amexPartner: null },
];

export interface SeatSpyAirline {
  // Airline name as shown on SeatSpy.
  airline: string;
  // Matching Amex UK partner name, or null if not an Amex UK partner.
  amexPartner: string | null;
}

export const SEATSPY: SeatSpyAirline[] = [
  { airline: 'Air France', amexPartner: 'Flying Blue' },
  { airline: 'British Airways', amexPartner: 'British Airways Club' },
  { airline: 'Cathay Pacific', amexPartner: 'Cathay' },
  { airline: 'Etihad Airways', amexPartner: null },
  { airline: 'Iberia Airlines', amexPartner: 'Iberia Club' },
  { airline: 'Jet Blue', amexPartner: null },
  { airline: 'KLM Royal Dutch Airlines', amexPartner: 'Flying Blue' },
  { airline: 'Virgin Atlantic', amexPartner: 'Virgin Atlantic Flying Club' },
];

export interface PointsYeahProgram {
  // Programme name as shown on PointsYeah.
  program: string;
  // Matching Amex UK partner name, or null if not an Amex UK partner.
  amexPartner: string | null;
}

export const POINTSYEAH: PointsYeahProgram[] = [
  { program: 'Aerolíneas Argentinas', amexPartner: null },
  { program: 'Aeromexico Club Premier', amexPartner: null },
  { program: 'Air Canada Aeroplan', amexPartner: null },
  { program: 'Air France/KLM Flying Blue', amexPartner: 'Flying Blue' },
  { program: 'Alaska Atmos Rewards', amexPartner: null },
  { program: 'American Airlines AAdvantage', amexPartner: null },
  { program: 'Avianca LifeMiles', amexPartner: null },
  { program: 'Delta SkyMiles', amexPartner: 'Delta SkyMiles' },
  { program: 'Etihad Guest', amexPartner: null },
  { program: 'Finnair Plus Avios', amexPartner: null },
  { program: 'JetBlue True Blue', amexPartner: null },
  { program: 'Miles & More', amexPartner: null },
  { program: 'Qantas Frequent Flyer', amexPartner: 'Qantas Frequent Flyer' },
  { program: 'Qatar Avios', amexPartner: 'Qatar Airways Privilege Club' },
  { program: 'Turkish Miles & Smiles', amexPartner: null },
  { program: 'United MileagePlus', amexPartner: null },
  { program: 'Virgin Atlantic Flying Club', amexPartner: 'Virgin Atlantic Flying Club' },
  { program: 'Virgin Australia Velocity', amexPartner: null },
];
