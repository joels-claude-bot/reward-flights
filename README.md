# reward-flights

A practical guide to making the most of **American Express (Amex) UK Membership Rewards
(MR)** points for **reward flights** — which airlines give the best value, how to find
award seats, when to book, and the expected value (£/point) of a redemption.

Built as an interactive [Rspress](https://rspress.rs/) MDX docs site so the points-value
calculator and partner table are live components, not static text.

## Quick start

```bash
npm install
just docs        # dev server with live reload + search on http://localhost:9307
```

`just --list` shows all recipes. Without `just`:

```bash
npm run dev      # dev server (default port)
npm run build    # static site into doc_build/
npm run preview  # serve the built site
```

## Layout

| Path | What |
| --- | --- |
| `docs/` | The content (Markdown / MDX pages). |
| `components/` | React components used in MDX: `TransferPartnersTable`, `PointValueCalculator`, shared `partners.ts` data. |
| `rspress.config.ts` | Site config. |
| `justfile` | `docs` / `build` / `preview` recipes (docs bound to port 9307). |
| `scripts/e2e.mjs` | Headless-Chromium end-to-end check of the live site. |
| `docs/dev-log/` | Working notes. |

## Port

`docs = 9307` (base = `9000 + crc32("reward-flights") % 900`), registered in
`.registered-ports.toml`.

## End-to-end test

With the dev server running on `:9307`:

```bash
node scripts/e2e.mjs    # asserts pages render, table + calculator are interactive
```

> Figures in the docs (ratios, value tiers, aggregator prices, routes) are indicative and
> change often — always confirm with Amex and the airline before transferring.
