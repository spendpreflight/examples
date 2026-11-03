import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
for (const file of ['claude.mcp.json','cursor.mcp.json']) {
  const config = JSON.parse(await readFile(new URL(file, import.meta.url), 'utf8'));
  assert.equal(config.mcpServers.spendpreflight.url, 'https://api.spendpreflight.com/mcp');
}
console.log('Configuration validated offline. Suggested assistant prompt:\n');
console.log(await readFile(new URL('prompt.txt', import.meta.url), 'utf8'));
