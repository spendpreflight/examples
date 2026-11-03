import { x402Client } from '@x402/core/client';
import { wrapFetchWithPayment } from '@x402/fetch';
import { ExactEvmScheme } from '@x402/evm/exact/client';
import { guard } from 'spendpreflight';

// Inject your existing signer and a SEPARATE screening transport.
// Every merchant payment allowed by local rules must also pass remote preflight.
// No onHold override and no fail-open fallback: hold/block/error stop signing.
export function createGuardedFetch({ signer, merchantFetch = fetch, screeningFetch = fetch, onDecision = () => {} }) {
  const client = new x402Client().register('eip155:8453', new ExactEvmScheme(signer));
  guard(client, {
    rules: { maxPerPaymentUsd: 0.10, holdAboveUsd: 0.10, dailyCapUsd: 1 },
    remote: { fetch: screeningFetch, onError: 'hold' },
    onDecision,
  });
  return wrapFetchWithPayment(merchantFetch, client);
}
