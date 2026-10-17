import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const Module = require('node:module');
const root = process.cwd();
const originalLoad = Module._load;
Module._load = function (request, parent, ...rest) {
  if (request === 'next-view-transitions') return { Link: require('next/link').default };
  // Existing blog tests cover real MDX discovery; isolate static sitemap entries here.
  if (request === '@/lib/blog') return { getAllBlogs: async () => [] };
  return originalLoad.call(this, request, parent, ...rest);
};
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, ...rest) {
  if (request.startsWith('@/')) request = path.join(root, request.slice(2));
  return originalResolve.call(this, request, parent, ...rest);
};
for (const extension of ['.ts', '.tsx']) {
  Module._extensions[extension] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true, target: ts.ScriptTarget.ES2022 },
  }).outputText, filename);
}
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const filename = 'app/[locale]/(marketing)/privacy-policy/page.tsx';

test('public privacy route renders actual English and French disclosures without account access', async () => {
  assert.ok(fs.existsSync(filename), 'Privacy Policy route must exist');
  const page = require(path.join(root, filename)).default;
  for (const [locale, title] of [['en', 'Privacy Policy'], ['fr', 'Politique de confidentialité']]) {
    const html = renderToStaticMarkup(await page({ params: Promise.resolve({ locale }) }));
    assert.match(html, new RegExp(`<h1[^>]*>${title}</h1>`));
    assert.ok(html.includes('hello@argonaute.digital'));
    assert.ok(html.includes('Formspree'));
    assert.ok(html.includes('Vercel'));
    assert.ok(html.includes('Argonaute Digital Reporting'));
    assert.ok(html.includes('analytics.readonly'));
    assert.ok(html.includes('webmasters.readonly'));
    assert.ok(html.includes('id="google-reporting"'));
    assert.ok(!html.includes('GOCSPX-'));
    assert.ok(!html.includes('refresh_token'));
    assert.ok(!html.includes('signIn('));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test('policy page uses the marketing layouts existing main landmark without nesting another', async () => {
  const page = require(path.join(root, filename)).default;
  for (const locale of ['en', 'fr']) {
    const html = renderToStaticMarkup(React.createElement('main', null, await page({ params: Promise.resolve({ locale }) })));
    assert.equal((html.match(/<main\b/g) || []).length, 1);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
  }
});

test('privacy metadata exposes localized canonical, hreflang and crawlable policy URLs', async () => {
  const page = require(path.join(root, filename));
  assert.equal(typeof page.generateMetadata, 'function');
  for (const locale of ['en', 'fr']) {
    const metadata = await page.generateMetadata({ params: Promise.resolve({ locale }) });
    assert.ok(metadata.alternates.canonical.endsWith(`/${locale}/privacy-policy`));
    assert.ok(metadata.alternates.languages.en.endsWith('/en/privacy-policy'));
    assert.ok(metadata.alternates.languages.fr.endsWith('/fr/privacy-policy'));
    assert.equal(metadata.robots.index, true);
    assert.equal(metadata.robots.follow, true);
    assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
    assert.ok(metadata.description.length > 40);
  }
});

test('footer exposes a visible Privacy Policy link in each locale', () => {
  const { Footer } = require(path.join(root, 'components/footer.tsx'));
  for (const [locale, label] of [['en', 'Privacy Policy'], ['fr', 'Confidentialité']]) {
    const html = renderToStaticMarkup(React.createElement(Footer, { locale }));
    assert.ok(html.includes(`href="/${locale}/privacy-policy"`));
    assert.ok(html.includes(label));
  }
});

test('sitemap and public middleware make both policy routes discoverable without sign-in', async () => {
  const sitemap = require(path.join(root, 'app/sitemap.ts')).default;
  const entries = await sitemap();
  const { middleware } = require(path.join(root, 'middleware.ts'));
  const { NextRequest } = require('next/server');
  for (const locale of ['en', 'fr']) {
    const route = `/${locale}/privacy-policy`;
    assert.ok(entries.some(entry => entry.url.endsWith(route)));
    const response = await middleware(new NextRequest(`https://www.argonaute-digital.com${route}`));
    assert.ok(!response.headers.get('location')?.includes('/api/auth/signin'));
  }
});
