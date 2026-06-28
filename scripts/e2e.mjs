// Throwaway e2e check: drives headless Chromium against the live Rspress dev
// server to prove pages render client-side and the interactive pieces work.
// Run: node scripts/e2e.mjs   (dev server must be up on :9307)
import { chromium } from 'playwright';

const BASE = 'http://localhost:9307';
const results = [];
const ok = (name, pass, extra = '') => {
  results.push({ name, pass });
  console.log(`  ${pass ? 'PASS' : 'FAIL'}: ${name}${extra ? ' — ' + extra : ''}`);
};

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_BIN || '/home/claude/.nix-profile/bin/chromium',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
const consoleErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});

// Mermaid renders to an SVG with a hashed class; the reliable signal is that a
// diagram label appears in the DOM while the raw `flowchart` syntax does NOT.
const diagramRendered = async (label) => {
  await page.waitForFunction((l) => document.body.innerText.includes(l), label, { timeout: 8000 }).catch(() => {});
  const body = await page.textContent('body');
  return body.includes(label) && !body.includes('flowchart LR');
};

// 1. Home: worked-example + mermaid decision-flow diagram render
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForFunction(() => document.body.innerText.includes('£450 or £2,700'), null, { timeout: 8000 }).catch(() => {});
ok('home shows value contrast tagline', (await page.textContent('body')).includes('£450 or £2,700'));
ok('home decision-flow diagram rendered', await diagramRendered('Find award space'));

// 2. Transfer-partners table still renders 11 airlines
await page.goto(`${BASE}/transfer-partners`, { waitUntil: 'networkidle' });
await page.waitForSelector('table tbody tr');
ok('partners table has 11 rows', (await page.locator('table tbody tr').count()) === 11);
ok('Avios cluster says "Three"', (await page.textContent('body')).includes('Three'));
const partnersBody = await page.textContent('body');
ok('summary table shows simplified ratios (2:1, 3:2)', partnersBody.includes('2:1') && partnersBody.includes('3:2'));
ok('summary table shows currency column (Asia Miles)', partnersBody.includes('Asia Miles'));
ok('summary table has traffic-light legend', partnersBody.includes('1:1 or better'));

// 3. Finding award seats: compatibility matrix renders with all 4 tools + 11 rows
await page.goto(`${BASE}/finding-flights`, { waitUntil: 'networkidle' });
await page.waitForSelector('table tbody tr');
const matrixBody = await page.textContent('body');
ok('matrix names seats.aero', matrixBody.includes('seats.aero'));
ok('matrix names SeatSpy', matrixBody.includes('SeatSpy'));
ok('matrix names PointsYeah', matrixBody.includes('PointsYeah'));
ok('matrix names AwardTool', matrixBody.includes('AwardTool'));
ok('matrix shows last-checked date', matrixBody.includes('2026-06-28'));
ok('seats.aero table shows Outage/Degraded statuses', matrixBody.includes('Degraded') && matrixBody.includes('Outage'));
ok('seats.aero shows live search', matrixBody.includes('live'));
ok('SeatSpy table shows Tracked', matrixBody.includes('Tracked'));
ok('SeatSpy now covers Cathay (corrected)', matrixBody.includes('Cathay Pacific'));
ok('PointsYeah table present', matrixBody.includes('Qatar Avios'));
// PointsYeah corrections: within the PointsYeah table, Qatar is Tracked but
// Emirates & Singapore are Not tracked (they were wrongly "yes" before).
const py = await page.evaluate(() => {
  // The PointsYeah amex table is the only one whose own cells contain "Qatar Avios".
  const table = [...document.querySelectorAll('table')].find((t) => /Qatar Avios/.test(t.textContent));
  if (!table) return null;
  const rowText = (name) => {
    const tr = [...table.querySelectorAll('tr')].find((r) => r.querySelector('td')?.textContent.trim() === name);
    return tr ? tr.textContent : '';
  };
  return {
    qatar: rowText('Qatar Airways Privilege Club'),
    emirates: rowText('Emirates Skywards'),
    singapore: rowText('Singapore KrisFlyer'),
  };
});
ok('PointsYeah: Qatar tracked', !!py && /Tracked/.test(py.qatar) && /Qatar Avios/.test(py.qatar));
ok('PointsYeah: Emirates NOT tracked (corrected)', !!py && /Not tracked/.test(py.emirates));
ok('PointsYeah: Singapore NOT tracked (corrected)', !!py && /Not tracked/.test(py.singapore));

// 3b. Appendix: non-Amex airlines present, Amex partners absent from the "other" lists
await page.goto(`${BASE}/appendix`, { waitUntil: 'networkidle' });
await page.waitForSelector('table tbody tr');
const appendixBody = await page.textContent('body');
ok('appendix lists United MileagePlus (non-Amex)', appendixBody.includes('United MileagePlus'));
ok('appendix lists Etihad (SeatSpy non-Amex)', appendixBody.includes('Etihad'));
ok('appendix excludes Amex partner British Airways from "other"', !appendixBody.includes('British Airways'));

// 4. When-to-book: mermaid timeline renders
await page.goto(`${BASE}/when-to-book`, { waitUntil: 'networkidle' });
ok('when-to-book timeline diagram rendered', await diagramRendered('SCHEDULE OPENS'));

// 5. Destinations: interactive map component renders and switching airlines updates routes.
// (Asserts on route-code text, not the gcmap image, so it passes with or without outbound net.)
await page.goto(`${BASE}/destinations`, { waitUntil: 'networkidle' });
await page.waitForSelector('text=Routes:');
const firstCodes = await page.locator('p:has-text("Routes:") code').textContent();
ok('destination map shows Virgin routes', firstCodes.includes('LHR-JFK'));
await page.getByRole('button', { name: 'Qatar Airways' }).click();
await page.waitForTimeout(200);
const secondCodes = await page.locator('p:has-text("Routes:") code').textContent();
ok('map updates when airline changes', firstCodes !== secondCodes && secondCodes.includes('DOH'), `now: ${secondCodes}`);
// the gcmap <img> should be requested, or the graceful fallback shown if it can't load
const imgCount = await page.locator('img[alt^="Map of sweet-spot routes"]').count();
const fallbackCount = await page.getByText('Map preview couldn').count();
ok('gcmap image element or fallback present', imgCount + fallbackCount > 0, `img:${imgCount} fallback:${fallbackCount}`);

// 6. Calculator still interactive
await page.goto(`${BASE}/expected-value`, { waitUntil: 'networkidle' });
await page.waitForSelector('text=per MR point');
const before = await page.textContent('body');
await page.locator('input[type="number"]').nth(0).fill('25000');
await page.waitForTimeout(200);
ok('calculator recomputes on input change', before !== (await page.textContent('body')));

// 7. No console errors (ignore gcmap image network noise if offline)
const realErrors = consoleErrors.filter((e) => !/gcmap\.com|net::ERR/.test(e));
ok('no unexpected console errors', realErrors.length === 0, realErrors.slice(0, 2).join(' | '));

await browser.close();
const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed === 0 ? 0 : 1);
