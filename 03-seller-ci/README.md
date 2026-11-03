# Seller CI with x402 Lint

Run `npm run example:seller` from the repository root for an offline workflow validation and printable YAML.

Copy `lint.yml` to `.github/workflows/lint.yml` in your own seller repository. Commit it to the default branch, then use Actions → Seller x402 Lint → Run workflow with your public HTTPS endpoint. The workflow is manual only: no push, pull-request or scheduled probe. The Action is pinned to a reviewed commit, uses read-only repository permissions and disables PR comments.

A live dispatch performs an unpaid public Lint probe, subject to robots, host pacing and quotas, and may create a public seven-day report. Do not submit credentials, sensitive query parameters, private endpoints or request bodies. No wallet, token secret, paid merchant call or monitoring signup is needed. GitHub Actions usage is governed by your account's allowance.

Inconclusive fails the job so missing evidence is visible; it does not prove the endpoint is broken. Passing is an unpaid snapshot, not paid delivery, full security or guaranteed Bazaar indexing. Read the report's evidence and unknowns.

[Action source and inputs](https://github.com/spendpreflight/x402-lint-action) · [Lint scope](https://spendpreflight.com/tools/x402-lint/)
