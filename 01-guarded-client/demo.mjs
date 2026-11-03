import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { createGuardedFetch } from './client.mjs';

export async function runDemo(outcome = 'allow') {
  const events = [], decisions = [];
  // Ephemeral, unfunded key. No key input, output, file, RPC or real merchant.
  const account = privateKeyToAccount(generatePrivateKey());
  const signer = { address: account.address, signTypedData: async data => {
    events.push('sign'); return account.signTypedData(data);
  }};
  const url = 'https://merchant.example/data';
  const challenge = { x402Version: 2, resource: { url, description: 'Offline fixture', mimeType: 'application/json' }, accepts: [{ scheme: 'exact', network: 'eip155:8453', amount: '10000', asset: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', payTo: '0x1111111111111111111111111111111111111111', maxTimeoutSeconds: 60, extra: { name: 'USD Coin', version: '2' } }] };
  const merchantFetch = async (input, init) => {
    const request = new Request(input, init);
    assert.equal(request.url, url);
    const headers = request.headers;
    if (headers.has('PAYMENT-SIGNATURE')) { events.push('mock-delivery'); return Response.json({ fixture: true }); }
    events.push('challenge');
    return Response.json(challenge, { status: 402, headers: { 'PAYMENT-REQUIRED': Buffer.from(JSON.stringify(challenge)).toString('base64') } });
  };
  const screeningFetch = async (input, init) => {
    assert.equal(String(input), 'https://api.spendpreflight.com/v1/preflight');
    const body = JSON.parse(init.body);
    assert.equal(body.challenge.accepts[0].payTo, challenge.accepts[0].payTo);
    assert.equal(body.rules.max_per_payment_usd, 0.10);
    events.push('preflight');
    if (outcome === 'error') return new Response(null, { status: 503 });
    return Response.json({ decision: outcome, reasons: [outcome + ': offline fixture'], receipt: { id: 'fixture-not-a-signed-service-receipt' } });
  };
  const pay = createGuardedFetch({ signer, merchantFetch, screeningFetch, onDecision: value => decisions.push(value.decision) });
  let stopped = false;
  try { const response = await pay(url); assert.equal(response.status, 200); }
  catch (error) { if (outcome === 'allow') throw error; stopped = true; }
  if (outcome === 'allow') assert.deepEqual(events, ['challenge','preflight','sign','mock-delivery']);
  else { assert.equal(stopped, true); assert.deepEqual(events, ['challenge','preflight']); }
  return { outcome, events, decisions, network_requests: 0, settled: false };
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) console.log(JSON.stringify(await runDemo(), null, 2));
