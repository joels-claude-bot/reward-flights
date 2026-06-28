import React from 'react';
import { AIRLINE_PARTNERS } from './partners';
import { POINTSYEAH, TOOL_STATUS_CHECKED } from './toolStatus';

// PointsYeah coverage table. scope='amex' shows the 11 Amex UK partners and whether
// PointsYeah tracks them; scope='other' lists PointsYeah programmes that are not Amex
// UK partners. In: scope. Out: a React element.
// (PointsYeah, like SeatSpy, publishes a tracked list rather than per-airline status.)

function tracked(): React.ReactElement {
  return <span style={{ color: '#1a7f37', fontWeight: 700 }}>✓ Tracked</span>;
}

export default function PointsYeahTable({ scope }: { scope: 'amex' | 'other' }): React.ReactElement {
  if (scope === 'other') {
    const others = POINTSYEAH.filter((entry) => entry.amexPartner === null);
    return (
      <table>
        <thead>
          <tr>
            <th>Programme (not an Amex UK partner)</th>
          </tr>
        </thead>
        <tbody>
          {others.map((entry) => (
            <tr key={entry.program}>
              <td>{entry.program}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const coveredPartners = new Set(
    POINTSYEAH.map((entry) => entry.amexPartner).filter((name): name is string => name !== null),
  );

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Amex UK partner</th>
            <th>PointsYeah</th>
            <th>Tracked via</th>
          </tr>
        </thead>
        <tbody>
          {AIRLINE_PARTNERS.map((partner) => {
            const via = POINTSYEAH.filter((entry) => entry.amexPartner === partner.airline).map((entry) => entry.program);
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
        PointsYeah tracks 18 programmes (as of {TOOL_STATUS_CHECKED}); 5 are Amex UK partners. It
        reads Amex Membership Rewards balances directly and has a strong free tier.
      </p>
    </>
  );
}
