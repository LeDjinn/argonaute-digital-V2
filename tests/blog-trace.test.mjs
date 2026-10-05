import test from 'node:test';
import assert from 'node:assert/strict';
import config from '../next.config.mjs';

test('serverless packaging explicitly includes source MDX directories needed by blog discovery', () => {
  assert.ok(config.outputFileTracingIncludes?.['/*']?.includes('./app/**/blog/*/page.mdx'), 'Serverless traces must include owned MDX files; a successful local build alone cannot prove runtime discovery works.');
});
