# SpendPreflight examples

Call **preflight_payment before signing an x402 payment**. Enforce allow / hold / block in the payment client, within your approved wallet and budget. Sellers start with free Lint and optional monitoring.

Three runnable examples, using existing products and prices:

| Example | Run after `npm ci` | What runs |
|---|---|---|
| [Guarded x402 client](01-guarded-client/) | `npm run example:buyer` | Real @x402 client + published `spendpreflight` SDK, simulated merchant and screening responses, ephemeral unfunded local signer |
| [Claude Code / Cursor MCP](02-mcp-assistant/) | `npm run example:mcp` | Validates configurations and prints the prompt offline |
| [Seller CI](03-seller-ci/) | `npm run example:seller` | Validates and prints a manually dispatched Lint Action workflow offline |

Use Node.js 22 or newer. `npm test` proves allow signs only after preflight, while hold, block and screening errors stop signing. These commands make no live product request or payment. Installing dependencies requires npm access. Offline fixtures do not establish live paid delivery.

## About to pay?

Start with [the buyer example](01-guarded-client/). Local rules reject over-budget payments before screening. Remaining payments require a remote `preflight_payment` decision; the example uses a separate screening transport and fails closed. Preflight costs 0.02 USDC; an existing shared trial may apply. The demo simulates that result and pays no fee.

Preflight combines payee screening, spending rules and cached price/recipient evidence where available. If a seller advertises an ERC-8004 identity, [ERC-8478 Draft verification](https://spendpreflight.com/tools/payee-binding/) is a separate existing check (0.01 USDC; shared trial may apply). It is not silently integrated here. Missing evidence remains unknown; allow is not a safety or delivery guarantee.

## Selling via x402?

Start with [seller CI](03-seller-ci/) and [free Lint](https://spendpreflight.com/tools/x402-lint/). A live Lint performs an unpaid public probe and may create a public dated report. Monitoring is a separate opt-in service with existing pricing; the workflow does not register for it.

[All products and prices](https://spendpreflight.com/tools/) · [Data APIs](https://spendpreflight.com/tools/data-apis/) · [SDK source](https://github.com/spendpreflight/spendpreflight-js) · [Privacy and retention](https://spendpreflight.com/privacy/)

Maintained by SpendPreflight, the operator of the optional paid service. MIT license.
