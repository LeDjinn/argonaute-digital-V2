import assert from 'node:assert/strict';
import {readBlogContent} from './blog-content.mjs';
import {blogTags} from '../lib/blog-core.mjs';
const base=process.env.BLOG_TEST_BASE_URL || 'http://localhost:3000';
const records=readBlogContent();
const published=records.filter(record=>record.blog.draft === false);
const drafts=records.filter(record=>record.blog.draft === true);
let checks=0;
async function get(route,status=200) {
  const response=await fetch(new URL(route,base),{redirect:'manual'});
  assert.equal(response.status,status,`${route}: expected ${status}; found ${response.status}`);
  checks++;
  return response.text();
}
for(const locale of ['en','fr']) {
  const index=await get(`/${locale}/blog`);
  assert.ok(index.includes(`/${locale}/blog\"`),`${locale} localized navigation`);
  for(const record of published) assert.ok(index.includes(`/${locale}/blog/${record.slug}`),`${record.slug} listed`);
  for(const record of drafts) assert.ok(!index.includes(`/${locale}/blog/${record.slug}`),`${record.slug} omitted from listing`);
  for(const record of drafts) {
    const article=await get(`/${locale}/blog/${record.slug}`);
    assert.ok(/name="robots" content="noindex, follow"/.test(article),`${record.slug} noindex`);
    assert.ok(article.includes(locale==='fr' ? 'Modèle non publié' : 'Unpublished template'));
    assert.ok(article.includes(record.blog.author.name),`${record.slug} attribution preserved`);
    assert.ok(article.includes(`/${locale}/blog/${record.slug}\"`),`${record.slug} own canonical`);
  }
  for(const record of published) {
    const article=await get(`/${locale}/blog/${record.slug}`);
    assert.ok(article.includes('application/ld+json'));
    assert.ok(article.includes('BlogPosting'));
    assert.ok(article.includes('property="og:type" content="article"'));
    assert.ok(article.includes('name="twitter:card" content="summary_large_image"'));
    const canonical=article.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert.ok(canonical?.[1].endsWith(`/en/blog/${record.slug}`),`${record.slug} English canonical on ${locale}`);
    assert.ok(article.includes(`hrefLang="en" href="${canonical[1]}"`) || article.includes(`hreflang="en" href="${canonical[1]}"`));
    assert.ok(!/<link[^>]*href[Ll]ang="fr"/.test(article),'no nonexistent French article alternate');
    const json=article.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    assert.ok(json,'rendered JSON-LD');
    const schema=JSON.parse(json[1]);
    assert.equal(schema.url,canonical[1]);
    assert.equal(schema.mainEntityOfPage,canonical[1]);
    assert.equal(schema.inLanguage,'en');
    assert.ok(article.includes(encodeURIComponent(canonical[1])),'sharing uses canonical');
    assert.ok(/<h1[^>]*lang="en"/.test(article));
    assert.ok(/<div[^>]*lang="en"[^>]*data-mdx-content/.test(article));
    if(locale==='fr') assert.ok(article.includes('Cet article est rédigé en anglais.'));
    assert.ok(!article.includes('name="robots" content="noindex'));
  }
  for(const tag of blogTags(published.map(record=>record.blog))) {
    const archive=await get(`/${locale}/blog/tag/${tag}`);
    assert.ok(archive.includes(`/${locale}/blog/tag/${tag}\"`));
    for(const record of published) assert.equal(archive.includes(`href="/${locale}/blog/${record.slug}"`),record.blog.tags.includes(tag),`${tag} filters ${record.slug}`);
  }
  await get(`/${locale}/blog/tag/unknown-no-such-tag`,404);
}
const rss=await get('/feed.xml');
assert.equal((rss.match(/<item>/g)||[]).length,published.length,'RSS item count');
const sitemap=await get('/sitemap.xml');
for(const record of drafts) {
  assert.ok(!rss.includes(`/blog/${record.slug}`));
  assert.ok(!sitemap.includes(`/blog/${record.slug}`));
}
for(const record of published) {
  assert.ok(rss.includes(`/en/blog/${record.slug}`));
  assert.ok(sitemap.includes(`/en/blog/${record.slug}`));
  assert.ok(!sitemap.includes(`/fr/blog/${record.slug}`));
}
assert.ok(sitemap.includes('/fr/case-studies/'));
const legacy=await fetch(new URL('/blog/what-is-ai-anyway',base));
assert.equal(legacy.status,200,'legacy URL preserved');
checks++;
console.log(`Blog HTTP smoke passed: ${checks} routes; ${published.length} published, ${drafts.length} drafts.`);
