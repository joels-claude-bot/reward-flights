import React, { useMemo, useState } from 'react';
import { geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldTopo from 'world-atlas/countries-110m.json';
import { DESTINATION_ROUTES } from './destinationRoutes';
import { AIRPORTS, parseRoutes } from './airports';

// Self-contained interactive map of Amex UK partner destinations. Renders a world
// map (bundled topojson — no external requests) and draws each airline's sweet-spot
// routes, with an "All Amex UK partners" view that overlays every partner's routes.
// Out: a React element; no props.

const WIDTH = 800;
const HEIGHT = 400;
const ALL = 'ALL';

// World map + projection are constant, so build them once at module load.
const world = feature(worldTopo as never, (worldTopo as never as { objects: { countries: unknown } }).objects.countries as never) as {
  features: unknown[];
};
const projection = geoEquirectangular()
  .scale(WIDTH / (2 * Math.PI))
  .translate([WIDTH / 2, HEIGHT / 2]);
const pathGen = geoPath(projection);
const countryPaths = world.features.map((feat) => pathGen(feat as never) ?? '');

const buttonStyle: React.CSSProperties = {
  padding: '0.3rem 0.6rem',
  borderRadius: 6,
  border: '1px solid var(--rp-c-divider)',
  background: 'var(--rp-c-bg-soft, #f5f5f5)',
  color: 'var(--rp-c-text-1)',
  cursor: 'pointer',
  fontSize: '0.8rem',
};

function shortName(airline: string): string {
  return airline.replace(
    / (Club|Frequent Flyer|Skywards|KrisFlyer|EuroBonus|Privilege Club|Flying Club| SkyMiles)$/,
    '',
  );
}

export default function DestinationMap(): React.ReactElement {
  const [selected, setSelected] = useState<string>('Virgin Atlantic Flying Club');

  // Routes (as code pairs) for the current selection, deduped.
  const { pairs, airportCodes, blurb } = useMemo(() => {
    const chosen =
      selected === ALL
        ? DESTINATION_ROUTES
        : DESTINATION_ROUTES.filter((route) => route.airline === selected);
    const seen = new Set<string>();
    const collectedPairs: Array<[string, string]> = [];
    chosen.forEach((route) => {
      parseRoutes(route.codes).forEach(([from, to]) => {
        const key = `${from}-${to}`;
        if (!seen.has(key)) {
          seen.add(key);
          collectedPairs.push([from, to]);
        }
      });
    });
    const codes = new Set<string>();
    collectedPairs.forEach(([from, to]) => {
      codes.add(from);
      codes.add(to);
    });
    const text =
      selected === ALL
        ? 'Every sweet-spot route across all 11 Amex UK airline partners.'
        : (chosen[0]?.blurb ?? '');
    return { pairs: collectedPairs, airportCodes: [...codes], blurb: text };
  }, [selected]);

  const point = (code: string): [number, number] | null => {
    const projected = projection(AIRPORTS[code].lonLat);
    return projected as [number, number] | null;
  };

  const showLabels = selected !== ALL && airportCodes.length <= 8;

  return (
    <div
      style={{
        border: '1px solid var(--rp-c-divider)',
        borderRadius: 10,
        padding: '1rem',
        margin: '1.5rem 0',
      }}
    >
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setSelected(ALL)}
          style={{
            ...buttonStyle,
            ...(selected === ALL
              ? { background: '#0b62d6', color: '#fff', border: '1px solid #0b62d6', fontWeight: 700 }
              : { fontWeight: 600 }),
          }}
        >
          ★ All Amex UK partners
        </button>
        {DESTINATION_ROUTES.map((route) => (
          <button
            key={route.airline}
            type="button"
            onClick={() => setSelected(route.airline)}
            style={{
              ...buttonStyle,
              ...(route.airline === selected
                ? { background: '#1a7f37', color: '#fff', border: '1px solid #1a7f37', fontWeight: 600 }
                : {}),
            }}
          >
            {shortName(route.airline)}
          </button>
        ))}
      </div>

      <p style={{ margin: '0 0 0.5rem' }}>
        <strong>{selected === ALL ? 'All Amex UK partners' : selected}</strong> — {blurb}
      </p>

      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Map of destinations for ${selected === ALL ? 'all Amex UK partners' : selected}`}
        style={{ width: '100%', height: 'auto', background: 'var(--rp-c-bg-soft, #eef2f6)', borderRadius: 8 }}
      >
        <g>
          {countryPaths.map((d, index) => (
            <path key={index} d={d} fill="#cdd6e0" stroke="#aeb9c6" strokeWidth={0.4} />
          ))}
        </g>

        {/* routes */}
        <g>
          {pairs.map(([from, to]) => {
            const p1 = point(from);
            const p2 = point(to);
            if (!p1 || !p2) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={p1[0]}
                y1={p1[1]}
                x2={p2[0]}
                y2={p2[1]}
                stroke="#1a7f37"
                strokeWidth={selected === ALL ? 0.8 : 1.3}
                strokeOpacity={0.75}
              />
            );
          })}
        </g>

        {/* airport markers */}
        <g>
          {airportCodes.map((code) => {
            const projected = point(code);
            if (!projected) return null;
            const isOrigin = code === 'LHR';
            return (
              <g key={code} transform={`translate(${projected[0]},${projected[1]})`}>
                <circle
                  r={isOrigin ? 4 : 3}
                  fill={isOrigin ? '#0b62d6' : '#cf222e'}
                  stroke="#fff"
                  strokeWidth={0.8}
                >
                  <title>{`${code} — ${AIRPORTS[code].city}`}</title>
                </circle>
                {showLabels && !isOrigin ? (
                  <text x={5} y={3} fontSize={9} fill="var(--rp-c-text-1)" style={{ paintOrder: 'stroke' }} stroke="var(--rp-c-bg)" strokeWidth={2.5}>
                    {AIRPORTS[code].city}
                  </text>
                ) : null}
              </g>
            );
          })}
        </g>
      </svg>

      <p style={{ fontSize: '0.85rem', opacity: 0.85, margin: '0.5rem 0' }}>
        <span style={{ color: '#0b62d6', fontWeight: 700 }}>●</span> London origin ·{' '}
        <span style={{ color: '#cf222e', fontWeight: 700 }}>●</span> destination · hover a dot for the city.
        {selected !== ALL ? <> Routes: <code>{DESTINATION_ROUTES.find((route) => route.airline === selected)?.codes}</code></> : null}
      </p>

      <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>
        Illustrative sweet spots, not a full network — confirm live award space before booking. Want
        an interactive zoomable version? Open these routes in{' '}
        <a href="https://www.gcmap.com/" target="_blank" rel="noreferrer">Great Circle Mapper</a>{' '}
        or explore an airline's full network on{' '}
        <a href="https://www.flightconnections.com/" target="_blank" rel="noreferrer">FlightConnections</a>.
      </p>
    </div>
  );
}
