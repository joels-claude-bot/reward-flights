import React from 'react';
import { AIRLINE_PARTNERS } from './partners';
import { SEARCH_TOOLS, COVERAGE_LAST_CHECKED, type Coverage } from './searchTools';

// Compatibility matrix: which award-search tool covers which Amex UK airline partner.
// Out: a React element; no props — reads AIRLINE_PARTNERS and SEARCH_TOOLS.

const CELL: Record<Coverage, { mark: string; color: string; title: string }> = {
  yes: { mark: '✓', color: '#1a7f37', title: 'Covered' },
  no: { mark: '—', color: 'var(--rp-c-text-3, #888)', title: 'Not covered' },
  check: { mark: '?', color: '#bf8700', title: 'Not confirmed — check the tool’s site' },
};

export default function AwardSearchMatrix(): React.ReactElement {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Airline programme</th>
              {SEARCH_TOOLS.map((tool) => (
                <th key={tool.name} style={{ textAlign: 'center', minWidth: 90 }}>
                  <a href={tool.url} target="_blank" rel="noreferrer">
                    {tool.name}
                  </a>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AIRLINE_PARTNERS.map((partner) => (
              <tr key={partner.airline}>
                <td>{partner.airline}</td>
                {SEARCH_TOOLS.map((tool) => {
                  const state = tool.covers[partner.airline] ?? 'check';
                  const cell = CELL[state];
                  return (
                    <td
                      key={tool.name}
                      title={cell.title}
                      style={{ textAlign: 'center', color: cell.color, fontWeight: 700 }}
                    >
                      {cell.mark}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.5rem' }}>
        <strong style={{ color: CELL.yes.color }}>✓</strong> covered ·{' '}
        <strong style={{ color: CELL.no.color }}>—</strong> not covered ·{' '}
        <strong style={{ color: CELL.check.color }}>?</strong> not confirmed in the tool’s
        published list — check its site. Coverage last checked{' '}
        <strong>{COVERAGE_LAST_CHECKED}</strong>; tools add and drop programmes often.
      </p>

      <ul style={{ fontSize: '0.9rem' }}>
        {SEARCH_TOOLS.map((tool) => (
          <li key={tool.name}>
            <a href={tool.url} target="_blank" rel="noreferrer">
              <strong>{tool.name}</strong>
            </a>{' '}
            — {tool.note} <em>({tool.price})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
