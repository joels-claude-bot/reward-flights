// Airport coordinates for the destinations map, as [longitude, latitude] (the
// order d3-geo projections expect) plus a city label. Only the airports used in
// components/destinationRoutes.ts need to appear here.

export interface Airport {
  // City / airport label for tooltips and markers.
  city: string;
  // [longitude, latitude].
  lonLat: [number, number];
}

export const AIRPORTS: Record<string, Airport> = {
  LHR: { city: 'London', lonLat: [-0.4543, 51.47] },
  JFK: { city: 'New York', lonLat: [-73.7781, 40.6413] },
  BOS: { city: 'Boston', lonLat: [-71.0096, 42.3656] },
  MIA: { city: 'Miami', lonLat: [-80.287, 25.7959] },
  LAX: { city: 'Los Angeles', lonLat: [-118.4085, 33.9416] },
  HND: { city: 'Tokyo', lonLat: [139.7798, 35.5494] },
  NRT: { city: 'Tokyo (Narita)', lonLat: [140.3929, 35.772] },
  MAD: { city: 'Madrid', lonLat: [-3.5676, 40.4983] },
  FCO: { city: 'Rome', lonLat: [12.2389, 41.8003] },
  DOH: { city: 'Doha', lonLat: [51.608, 25.2731] },
  SIN: { city: 'Singapore', lonLat: [103.9915, 1.3644] },
  BKK: { city: 'Bangkok', lonLat: [100.7501, 13.69] },
  JNB: { city: 'Johannesburg', lonLat: [28.246, -26.1392] },
  CDG: { city: 'Paris', lonLat: [2.5479, 49.0097] },
  AMS: { city: 'Amsterdam', lonLat: [4.7683, 52.3105] },
  NBO: { city: 'Nairobi', lonLat: [36.9278, -1.3192] },
  GIG: { city: 'Rio de Janeiro', lonLat: [-43.2506, -22.809] },
  DPS: { city: 'Bali', lonLat: [115.1672, -8.7482] },
  SYD: { city: 'Sydney', lonLat: [151.1753, -33.9399] },
  PER: { city: 'Perth', lonLat: [115.9672, -31.9385] },
  DXB: { city: 'Dubai', lonLat: [55.3657, 25.2532] },
  MLE: { city: 'Malé', lonLat: [73.529, 4.1918] },
  ATL: { city: 'Atlanta', lonLat: [-84.4277, 33.6407] },
  DTW: { city: 'Detroit', lonLat: [-83.3554, 42.2162] },
  HKG: { city: 'Hong Kong', lonLat: [113.9185, 22.308] },
  CPH: { city: 'Copenhagen', lonLat: [12.6508, 55.618] },
  ARN: { city: 'Stockholm', lonLat: [17.9186, 59.6519] },
  SFO: { city: 'San Francisco', lonLat: [-122.379, 37.6213] },
  EZE: { city: 'Buenos Aires', lonLat: [-58.5358, -34.8222] },
};

// parseRoutes("LHR-JFK,LHR-BOS") -> [["LHR","JFK"],["LHR","BOS"]].
// Out: array of [from, to] code pairs, skipping any with an unknown airport.
export function parseRoutes(codes: string): Array<[string, string]> {
  return codes
    .split(',')
    .map((pair) => pair.split('-') as [string, string])
    .filter(([from, to]) => AIRPORTS[from] && AIRPORTS[to]);
}
