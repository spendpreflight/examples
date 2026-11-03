# Guard every merchant payment

From the repository root: `npm ci`, then `npm run example:buyer`.

The demo feeds a simulated HTTP 402 challenge through the real `@x402/fetch` wrapper, `@x402/core` client, EVM scheme and published `spendpreflight@0.3.2` guard. A simulated preflight must allow before the unfunded ephemeral account signs locally. No network call, payment settlement or real receipt is claimed. `npm test` also covers hold, block and unavailable screening.

## Use in your application

Import `createGuardedFetch` from `client.mjs` and inject your existing signer. The example's merchant limits are 0.10 USDC per payment and 1 USDC per in-process UTC day; set your approved policy deliberately before using a funded signer. Failed signatures retain reservations, and process restarts do not provide a durable budget ledger.

Inject a **separate** screening fetch that your application explicitly authorizes to pay the 0.02 USDC preflight fee. The default plain fetch stops at a 402 and the merchant guard holds; it does not automatically pay screening fees. A dedicated, locally guarded screening client can implement that fee policy. Never pass the merchant client recursively or override errors with allow. The screening fee budget is separate from the merchant budget.

Every merchant payment that passes local rules is remotely preflighted before signing. Locally blocked payments stop without a remote request. Hold has no automatic approval callback. The remote service receives the selected challenge and resource URL; do not include secrets or private URLs. See the service privacy policy.

This runnable demo intentionally has no key loader or live-payment command. Integrate with the wallet and permissions already approved for your application.
