import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { parse } from 'yaml';
const text = await readFile(new URL('lint.yml', import.meta.url), 'utf8');
const workflow = parse(text);
assert.deepEqual(Object.keys(workflow.on), ['workflow_dispatch']);
assert.equal(workflow.jobs.lint.steps[0].with.comment, 'false');
console.log('Workflow validated offline. Copy to .github/workflows/lint.yml in your seller repository; dispatch only for your public endpoint.\n');
console.log(text);
