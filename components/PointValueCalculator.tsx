import React, { useMemo, useState } from 'react';
import { AIRLINE_PARTNERS, milesPerPoint } from './partners';

// Interactive "pence per Membership Rewards point" calculator.
// Lets you compare a reward booking against its cash price and see the
// effective value of each MR point, so you only burn points above a threshold.
// Out: a React element; no props.

const inputStyle: React.CSSProperties = {
  padding: '0.4rem 0.6rem',
  borderRadius: 6,
  border: '1px solid var(--rp-c-divider)',
  background: 'var(--rp-c-bg)',
  color: 'var(--rp-c-text-1)',
  width: '100%',
  boxSizing: 'border-box',
};

const fieldStyle: React.CSSProperties = { flex: '1 1 180px' };

function verdict(pencePerPoint: number): { label: string; color: string } {
  if (pencePerPoint >= 2) return { label: 'Excellent — book it', color: '#1a7f37' };
  if (pencePerPoint >= 1.5) return { label: 'Good value', color: '#2da44e' };
  if (pencePerPoint >= 1) return { label: 'Fair — baseline', color: '#bf8700' };
  return { label: 'Poor — keep the points', color: '#cf222e' };
}

export default function PointValueCalculator(): React.ReactElement {
  const [airline, setAirline] = useState(AIRLINE_PARTNERS[0].airline);
  const [milesRequired, setMilesRequired] = useState(50000);
  const [cashPrice, setCashPrice] = useState(900);
  const [feesPaid, setFeesPaid] = useState(200);

  const partner = useMemo(
    () => AIRLINE_PARTNERS.find((candidate) => candidate.airline === airline) ?? AIRLINE_PARTNERS[0],
    [airline],
  );

  const result = useMemo(() => {
    const perPoint = milesPerPoint(partner);
    const mrPointsNeeded = Math.ceil(milesRequired / perPoint);
    const cashAvoided = Math.max(0, cashPrice - feesPaid);
    const pencePerPoint = mrPointsNeeded > 0 ? (cashAvoided * 100) / mrPointsNeeded : 0;
    return { mrPointsNeeded, cashAvoided, pencePerPoint };
  }, [partner, milesRequired, cashPrice, feesPaid]);

  const grade = verdict(result.pencePerPoint);

  return (
    <div
      style={{
        border: '1px solid var(--rp-c-divider)',
        borderRadius: 10,
        padding: '1.25rem',
        margin: '1.5rem 0',
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <label style={fieldStyle}>
          Airline
          <select
            value={airline}
            onChange={(event) => setAirline(event.target.value)}
            style={inputStyle}
          >
            {AIRLINE_PARTNERS.map((candidate) => (
              <option key={candidate.airline} value={candidate.airline}>
                {candidate.airline}
              </option>
            ))}
          </select>
        </label>
        <label style={fieldStyle}>
          Miles needed for the flight
          <input
            type="number"
            min={0}
            value={milesRequired}
            onChange={(event) => setMilesRequired(Number(event.target.value))}
            style={inputStyle}
          />
        </label>
        <label style={fieldStyle}>
          Cash price of the same flight (£)
          <input
            type="number"
            min={0}
            value={cashPrice}
            onChange={(event) => setCashPrice(Number(event.target.value))}
            style={inputStyle}
          />
        </label>
        <label style={fieldStyle}>
          Taxes &amp; fees you still pay (£)
          <input
            type="number"
            min={0}
            value={feesPaid}
            onChange={(event) => setFeesPaid(Number(event.target.value))}
            style={inputStyle}
          />
        </label>
      </div>

      <div style={{ marginTop: '1.25rem', lineHeight: 1.8 }}>
        <div>
          MR points required:{' '}
          <strong>{result.mrPointsNeeded.toLocaleString()}</strong>{' '}
          <span style={{ opacity: 0.7 }}>
            (ratio {partner.pointsIn}:{partner.milesOut} → {partner.currency})
          </span>
        </div>
        <div>
          Cash value captured: <strong>£{result.cashAvoided.toLocaleString()}</strong>
        </div>
        <div style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>
          <strong>{result.pencePerPoint.toFixed(2)}p</strong> per MR point —{' '}
          <span style={{ color: grade.color, fontWeight: 600 }}>{grade.label}</span>
        </div>
      </div>
    </div>
  );
}
