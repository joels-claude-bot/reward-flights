import React, { useMemo, useState } from 'react';
import { DESTINATION_ROUTES } from './destinationRoutes';

// Interactive destinations map: pick an airline, see its sweet-spot routes drawn
// on a world map (via Great Circle Mapper) plus links out to interactive maps.
// Out: a React element; no props.

// gcmapImage(codes) -> a Great Circle Mapper static map image URL for those routes.
// gcmap's P= parameter needs literal commas between airport pairs (not %2C), so the
// codes string is interpolated directly rather than URL-encoded.
function gcmapImage(codes: string): string {
  return `https://www.gcmap.com/map?P=${codes}&MS=bm&MX=720x380&PM=*`;
}

// gcmapInteractive(codes) -> the interactive (zoomable) Great Circle Mapper page.
function gcmapInteractive(codes: string): string {
  return `https://www.gcmap.com/mapui?P=${codes}`;
}

const buttonStyle: React.CSSProperties = {
  padding: '0.35rem 0.7rem',
  borderRadius: 6,
  border: '1px solid var(--rp-c-divider)',
  background: 'var(--rp-c-bg-soft, #f5f5f5)',
  color: 'var(--rp-c-text-1)',
  cursor: 'pointer',
  fontSize: '0.85rem',
};

export default function DestinationMap(): React.ReactElement {
  const [airline, setAirline] = useState(DESTINATION_ROUTES[0].airline);
  const [mapFailed, setMapFailed] = useState(false);
  const route = useMemo(
    () => DESTINATION_ROUTES.find((candidate) => candidate.airline === airline) ?? DESTINATION_ROUTES[0],
    [airline],
  );

  return (
    <div
      style={{
        border: '1px solid var(--rp-c-divider)',
        borderRadius: 10,
        padding: '1rem',
        margin: '1.5rem 0',
      }}
    >
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        {DESTINATION_ROUTES.map((candidate) => (
          <button
            key={candidate.airline}
            type="button"
            onClick={() => {
              setAirline(candidate.airline);
              setMapFailed(false);
            }}
            style={{
              ...buttonStyle,
              ...(candidate.airline === airline
                ? { background: '#1a7f37', color: '#fff', border: '1px solid #1a7f37', fontWeight: 600 }
                : {}),
            }}
          >
            {candidate.airline.replace(/ (Club|Frequent Flyer|Skywards|KrisFlyer|EuroBonus|Privilege Club|Flying Club| SkyMiles)$/, '')}
          </button>
        ))}
      </div>

      <p style={{ margin: '0 0 0.5rem' }}>
        <strong>{route.airline}</strong> — {route.blurb}
      </p>

      {mapFailed ? (
        <div
          style={{
            border: '1px dashed var(--rp-c-divider)',
            borderRadius: 8,
            padding: '1.5rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            opacity: 0.85,
          }}
        >
          Map preview couldn’t load. Open the routes in{' '}
          <a href={gcmapInteractive(route.codes)} target="_blank" rel="noreferrer">
            Great Circle Mapper ↗
          </a>
        </div>
      ) : (
        <img
          src={gcmapImage(route.codes)}
          alt={`Map of sweet-spot routes for ${route.airline}: ${route.codes}`}
          loading="lazy"
          onError={() => setMapFailed(true)}
          style={{ width: '100%', maxWidth: 720, borderRadius: 8, display: 'block' }}
        />
      )}

      <p style={{ fontSize: '0.85rem', opacity: 0.85, margin: '0.5rem 0' }}>
        Routes: <code>{route.codes}</code>
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a style={buttonStyle} href={gcmapInteractive(route.codes)} target="_blank" rel="noreferrer">
          Open in Great Circle Mapper ↗
        </a>
        <a style={buttonStyle} href="https://www.flightconnections.com/" target="_blank" rel="noreferrer">
          FlightConnections (route explorer) ↗
        </a>
        <a style={buttonStyle} href="https://www.flightsfrom.com/" target="_blank" rel="noreferrer">
          FlightsFrom (departures map) ↗
        </a>
      </div>

      <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem' }}>
        Map drawn by Great Circle Mapper from the route list above. Illustrative sweet spots,
        not a full network — confirm live award space before booking.
      </p>
    </div>
  );
}
