import React from 'react';
import { AIRLINE_PARTNERS } from './partners';
import { SEATSPY, TOOL_STATUS_CHECKED } from './toolStatus';

// SeatSpy coverage table. scope='amex' shows the 11 Amex UK partners and whether
// SeatSpy tracks them; scope='other' lists SeatSpy airlines that are not Amex UK
// partners. In: scope. Out: a React element.

function tracked(): React.ReactElement {
  return <span style={{ color: '#1a7f37', fontWeight: 700 }}>✓ Tracked</span>;
}

export default function SeatSpyTable({ scope }: { scope: 'amex' | 'other' }): React.ReactElement {
  if (scope === 'other') {
    const others = SEATSPY.filter((entry) => entry.amexPartner === null);
    return (
      <table>
        <thead>
          <tr>
            <th>Airline (not an Amex UK partner)</th>
          </tr>
        </thead>
        <tbody>
          {others.map((entry) => (
            <tr key={entry.airline}>
              <td>{entry.airline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const coveredPartners = new Set(
    SEATSPY.map((entry) => entry.amexPartner).filter((name): name is string => name !== null),
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Amex UK partner</th>
            <th>SeatSpy</th>
            <th>Tracked via</th>
          </tr>
        </thead>
        <tbody>
          {AIRLINE_PARTNERS.map((partner) => {
            const via = SEATSPY.filter((entry) => entry.amexPartner === partner.airline).map((entry) => entry.airline);
            return (
              <tr key={partner.airline}>
                <td>{partner.airline}</td>
                <td>{coveredPartners.has(partner.airline) ? tracked() : <span style={{ opacity: 0.55 }}>Not tracked</span>}</td>
                <td style={{ opacity: 0.8 }}>{via.length ? via.join(' + ') : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
        SeatSpy is UK-focused and tracks a short list of airlines (as of {TOOL_STATUS_CHECKED}).
        Flying Blue is covered via both Air France and KLM.
      </p>
    </>
  );
}
