import React from 'react';
import { AIRLINE_PARTNERS } from './partners';
import { SEATS_AERO, TOOL_STATUS_CHECKED, type ServiceStatus } from './toolStatus';

// seats.aero coverage table. scope='amex' shows the 11 Amex UK partners and their
// seats.aero status (incl. "not tracked"); scope='other' lists seats.aero's other
// programmes (not reachable with Amex UK points directly).
// In: scope — which set of rows to show. Out: a React element.

const STATUS: Record<ServiceStatus, { color: string; label: string }> = {
  healthy: { color: '#1a7f37', label: 'Healthy' },
  degraded: { color: '#bf8700', label: 'Degraded' },
  outage: { color: '#cf222e', label: 'Outage' },
};

function StatusBadge({ status }: { status: ServiceStatus }): React.ReactElement {
  const s = STATUS[status];
  return (
    <span style={{ whiteSpace: 'nowrap', color: s.color, fontWeight: 600 }}>
      <span style={{ display: 'inline-block', width: 9, height: 9, borderRadius: '50%', background: s.color, marginRight: 6 }} />
      {s.label}
    </span>
  );
}

function liveCell(live: boolean): React.ReactElement {
  return live ? (
    <span style={{ color: '#1a7f37', fontWeight: 700 }}>✓ live</span>
  ) : (
    <span style={{ opacity: 0.6 }}>—</span>
  );
}

export default function SeatsAeroTable({ scope }: { scope: 'amex' | 'other' }): React.ReactElement {
  if (scope === 'other') {
    const others = SEATS_AERO.filter((program) => program.amexPartner === null);
    return (
      <table>
        <thead>
          <tr>
            <th>Programme (not an Amex UK partner)</th>
            <th>Status</th>
            <th>Live search</th>
          </tr>
        </thead>
        <tbody>
          {others.map((program) => (
            <tr key={program.program}>
              <td>
                {program.program}
                {program.beta ? <span style={{ opacity: 0.6, fontSize: '0.8rem' }}> · BETA</span> : null}
              </td>
              <td><StatusBadge status={program.status} /></td>
              <td>{liveCell(program.liveSearch)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Amex UK partner</th>
            <th>seats.aero status</th>
            <th>Live search</th>
          </tr>
        </thead>
        <tbody>
          {AIRLINE_PARTNERS.map((partner) => {
            const entry = SEATS_AERO.find((program) => program.amexPartner === partner.airline);
            return (
              <tr key={partner.airline}>
                <td>{partner.airline}</td>
                <td>
                  {entry ? (
                    <>
                      <StatusBadge status={entry.status} />
                      {entry.beta ? <span style={{ opacity: 0.6, fontSize: '0.8rem' }}> · BETA</span> : null}
                    </>
                  ) : (
                    <span style={{ opacity: 0.55 }}>Not tracked</span>
                  )}
                </td>
                <td>{entry ? liveCell(entry.liveSearch) : <span style={{ opacity: 0.6 }}>—</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
        Status as of {TOOL_STATUS_CHECKED} (seats.aero's own status page). "Outage"/"Degraded" are
        usually temporary. Live search = real-time availability rather than cached.
      </p>
    </>
  );
}
