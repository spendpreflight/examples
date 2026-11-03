import { test } from 'node:test';
import assert from 'node:assert/strict';
globalThis.fetch = async () => { throw new Error('Live networking forbidden in offline examples'); };
import { runDemo } from '../01-guarded-client/demo.mjs';
for (const outcome of ['allow','hold','block','error']) test(outcome + ' controls signing in the actual x402 client', async () => {
  const result = await runDemo(outcome);
  assert.equal(result.network_requests, 0);
  assert.deepEqual(result.decisions, [outcome === 'error' ? 'hold' : outcome]);
});
test('assistant configuration and seller workflow run offline', async () => {
  await import('../02-mcp-assistant/run.mjs');
  await import('../03-seller-ci/run.mjs');
});
