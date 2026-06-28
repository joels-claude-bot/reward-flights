import React, { useMemo, useState } from 'react';
import {
  AIRLINE_PARTNERS,
  simplifiedRatio,
  ratioRating,
  type AirlinePartner,
  type RatioRating,
} from './partners';

// Renders the Amex UK airline transfer partners as a sortable, filterable table.
// Out: a React element; no props — reads the shared AIRLINE_PARTNERS list.
type SortKey = 'airline' | 'ratio' | 'minTransfer';

// Traffic-light colour + label for each ratio rating.
const RATING: Record<RatioRating, { color: string; label: string }> = {
  good: { color: '#1a7f37', label: 'good' },
  ok: { color: '#bf8700', label: 'ok' },
  bad: { color: '#cf222e', label: 'poor' },
};

// RatioCell renders a coloured dot + the simplified ratio (e.g. "● 1:1").
function RatioCell({ partner }: { partner: AirlinePartner }): React.ReactElement {
  const rating = RATING[ratioRating(partner)];
  return (
    <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
      <span
        aria-label={rating.label}
        title={`${rating.label} ratio`}
        style={{
          display: 'inline-block',
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: rating.color,
          marginRight: 6,
        }}
      />
      {simplifiedRatio(partner)}
    </span>
  );
}

export default function TransferPartnersTable(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('airline');

  const rows = useMemo(() => {
    const filtered = AIRLINE_PARTNERS.filter((partner) =>
      partner.airline.toLowerCase().includes(query.trim().toLowerCase()),
    );
    const sorted = [...filtered].sort((left, right) => {
      if (sortKey === 'ratio') {
        return right.milesOut / right.pointsIn - left.milesOut / left.pointsIn;
      }
      if (sortKey === 'minTransfer') {
        return left.minTransfer - right.minTransfer;
      }
      return left.airline.localeCompare(right.airline);
    });
    return sorted;
  }, [query, sortKey]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          margin: '1rem 0',
        }}
      >
        <input
          aria-label="Filter airlines"
          placeholder="Filter airlines…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{
            padding: '0.4rem 0.6rem',
            borderRadius: 6,
            border: '1px solid var(--rp-c-divider)',
            background: 'var(--rp-c-bg)',
            color: 'var(--rp-c-text-1)',
            flex: '1 1 200px',
          }}
        />
        <select
          aria-label="Sort by"
          value={sortKey}
          onChange={(event) => setSortKey(event.target.value as SortKey)}
          style={{
            padding: '0.4rem 0.6rem',
            borderRadius: 6,
            border: '1px solid var(--rp-c-divider)',
            background: 'var(--rp-c-bg)',
            color: 'var(--rp-c-text-1)',
          }}
        >
          <option value="airline">Sort: A–Z</option>
          <option value="ratio">Sort: best ratio first</option>
          <option value="minTransfer">Sort: lowest minimum first</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Airline programme</th>
            <th>Rate</th>
            <th>Currency</th>
            <th>Estimated transfer time</th>
            <th>Minimum transfer</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((partner) => (
            <tr key={partner.airline}>
              <td>
                <strong>{partner.airline}</strong>
                {partner.note ? (
                  <div style={{ fontSize: '0.8rem', color: 'var(--rp-c-warning-1, #b8860b)' }}>
                    ⚠ {partner.note}
                  </div>
                ) : null}
              </td>
              <td>
                <RatioCell partner={partner} />
              </td>
              <td>{partner.currency}</td>
              <td>{partner.transferTime}</td>
              <td>{partner.minTransfer.toLocaleString()} points</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 ? <p>No airlines match “{query}”.</p> : null}

      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
        Rate = MR points in : airline miles out, simplified.{' '}
        <span style={{ color: RATING.good.color, fontWeight: 700 }}>●</span> 1:1 or better ·{' '}
        <span style={{ color: RATING.ok.color, fontWeight: 700 }}>●</span> worse than 1:1 (e.g. 3:2) ·{' '}
        <span style={{ color: RATING.bad.color, fontWeight: 700 }}>●</span> 2:1 or worse.
      </p>
    </div>
  );
}
