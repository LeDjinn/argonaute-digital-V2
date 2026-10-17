import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require = createRequire(import.meta.url);
const filename = path.resolve('components/google-analytics.tsx');
function loadAnalytics(mode = 'production') {
  assert.ok(fs.existsSync(filename), 'shared Google Analytics component must exist');
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(output, { exports, require, process: { env: { NODE_ENV: mode } } }, { filename });
  return exports.default;
}
test('production analytics loads the supplied Google tag and queues its exact configuration once', () => {
  const tree = loadAnalytics()();
  const scripts = tree.props.children;
  assert.equal(scripts.length, 2);
  assert.equal(scripts[0].props.src, 'https://www.googletagmanager.com/gtag/js?id=G-ZEDXENKBV4');
  assert.equal(scripts[0].props.strategy, 'afterInteractive');
  assert.equal(scripts[1].props.strategy, 'afterInteractive');
  assert.equal(scripts[1].props.id, 'argonaute-google-analytics');
  const window = {};
  vm.runInNewContext(scripts[1].props.children, { window, Date });
  const calls = window.dataLayer.map(args => Array.from(args));
  assert.equal(calls.length, 2);
  assert.equal(calls[0][0], 'js');
  assert.equal(calls[1][0], 'config');
  assert.equal(calls[1][1], 'G-ZEDXENKBV4');
});

test('development and test environments do not emit production analytics', () => {
  assert.equal(loadAnalytics('development')(), null);
  assert.equal(loadAnalytics('test')(), null);
});
