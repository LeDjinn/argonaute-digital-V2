import test from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../lib/blog-core.mjs';
import { existsSync } from 'node:fs';
test('repository gate extracts literals, catches duplicates, and hides six templates', async () => {
  assert.ok(existsSync(new URL('../scripts/blog-content.mjs', import.meta.url)), 'content reader exists');
  const {readBlogContent, validateCollection, parseBlogSource} = await import('../scripts/blog-content.mjs');
  const records = readBlogContent();
  assert.equal(records.filter(post => post.blog.draft === true).length,6);
  assert.deepEqual(validateCollection(records),[]);
  const parsed = parseBlogSource(`export const blog = ${JSON.stringify(valid)};\nexport default (props) => <BlogLayout blog={blog} {...props} />;\n\n${body}`,'real-post');
  assert.equal(core.wordCount(parsed.body),651);
  assert.deepEqual(parsed.blog,valid);
  assert.ok(validateCollection([parsed,parsed]).some(error => error.includes('duplicate')));
  assert.throws(() => parseBlogSource('export const blog = dangerous();\nexport default (props) => <BlogLayout {...props} />;\n','unsafe'), /literal/);
});
const valid = {slug:'real-post', title:'Real engineering', description:'A useful guide', author:{name:'Tim Spiridonov',src:'/tim.png'}, date:'2026-10-05',tags:['engineering'],draft:false,readingTime:4,sources:['https://nextjs.org/docs']};
const body = ('engineering ').repeat(650) + '\n[Contact](/en/contact)\n';
test('bibliography cannot inflate an underlength article and summaries use the same body count', async () => {
  const {contentSummary}=await import('../scripts/blog-content.mjs');
  const shortBody='engineering '.repeat(550);
  const padded=shortBody+'\n\n## Sources\n\n'+'bibliography '.repeat(100)+'\n[reference]: https://example.org/reference';
  assert.equal(core.wordCount(padded),550);
  assert.ok(core.validateBlog(valid,padded).some(error=>error.includes('found 550')));
  assert.equal(contentSummary([{slug:valid.slug,blog:valid,body:padded}])[0].words,550);
});

test('body count ignores headings, definitions and URLs while preserving link prose', () => {
  const markdown='# Heading not body\n\nReadable [link](https://example.org/path) and useful [reference][ref].[1][8]\n\n[ref]: https://example.org/definition "Reference title"\n\nhttps://example.org/bare/path\n\n## Sources\n\nIgnored source prose';
  assert.equal(core.wordCount(markdown),5);
});

test('publishing gate rejects legacy fictional/example authors and invalid XML chars are sanitized', () => {
  for(const name of ['Tyler Durden','Manu Arora','John Doe']) assert.ok(core.validateBlog({...valid,author:{name,src:'/tim.png'}},body).some(error=>error.includes('author')),name);
  assert.equal(core.escapeXml('a\u0001b & < > " \' '),'ab &amp; &lt; &gt; &quot; &apos; ');
});

test('sitemap includes English canonical articles and localized tag/case URLs, excluding drafts', () => {
  assert.equal(typeof core.discoveryEntries,'function');
  const entries=core.discoveryEntries([valid,{...valid,slug:'hidden',draft:true}],['case-one'],'https://example.org');
  const urls=entries.map(entry=>entry.url);
  for(const locale of ['en','fr']) {
    assert.equal(urls.includes(`https://example.org/${locale}/blog/real-post`), locale === 'en');
    assert.ok(urls.includes(`https://example.org/${locale}/blog/tag/engineering`));
    assert.ok(urls.includes(`https://example.org/${locale}/case-studies/case-one`));
  }
  assert.equal(new Set(urls).size,urls.length);
  assert.ok(!urls.some(url=>url.endsWith('hidden')));
});

test('copy link reports unsupported or rejected clipboard gracefully', async () => {
  assert.equal(typeof core.copyArticleLink,'function');
  assert.equal(await core.copyArticleLink('https://example.org',{}),false);
  assert.equal(await core.copyArticleLink('https://example.org',{clipboard:{writeText:async()=>{throw Error('denied');}}}),false);
  let copied;
  assert.equal(await core.copyArticleLink('https://example.org',{clipboard:{writeText:async value=>{copied=value;}}}),true);
  assert.equal(copied,'https://example.org');
});

test('locale-aware discovery, SEO, schema and RSS omit drafts and escape untrusted text', () => {
  assert.equal(typeof core.articleMetadata, 'function');
  const post = {...valid,title:'A & B <test>',description:'\"quoted\" & safe'};
  const metadata = core.articleMetadata(post,'fr','https://example.org');
  assert.equal(metadata.alternates.canonical, 'https://example.org/en/blog/real-post');
  assert.deepEqual(metadata.alternates.languages, {en:'https://example.org/en/blog/real-post'});
  assert.equal(metadata.openGraph.url,metadata.alternates.canonical);
  assert.equal(metadata.openGraph.locale,'en_US');
  for (const locale of ['en','fr']) {
    const schema=core.blogSchema(post,locale,'https://example.org');
    assert.equal(schema.url,metadata.alternates.canonical);
    assert.equal(schema.mainEntityOfPage,metadata.alternates.canonical);
  }
  assert.equal(core.articleMetadata({...post,draft:true},'fr','https://example.org').alternates.canonical,'https://example.org/fr/blog/real-post');
  assert.equal(metadata.openGraph.type,'article');
  assert.equal(metadata.twitter.card,'summary_large_image');
  assert.equal(core.articleMetadata({...post,draft:true},'en','https://example.org').robots.index,false);
  assert.equal(core.blogSchema(post,'fr','https://example.org')['@type'],'BlogPosting');
  const rss = core.rssFeed([post,{...post,slug:'hidden',draft:true}], 'https://example.org');
  assert.ok(rss.includes('A &amp; B &lt;test&gt;'));
  assert.ok(!rss.includes('/hidden'));
  assert.ok(rss.includes('Mon, 05 Oct 2026 00:00:00 GMT'));
  assert.deepEqual(core.blogTags([post,{...post,tags:['hidden'],draft:true}]),['engineering']);
  assert.equal(core.relatedBlogs(post,[post,{...post,slug:'related'},{...post,slug:'hidden',draft:true}])[0].slug,'related');
});
test('publishing gate validates body, metadata and local links without evaluating MDX', () => {
  assert.equal(typeof core.validateBlog, 'function');
  assert.deepEqual(core.validateBlog(valid, body, {slugs:['real-post'],paths:['/en/contact']}), []);
  for (const change of [{author:{name:'John Doe'}},{date:'2026-02-30'},{tags:['Bad Tag']},{sources:[]},{readingTime:0},{draft:undefined},{slug:'Bad Slug'}]) {
    assert.ok(core.validateBlog({...valid,...change}, body).length > 0, JSON.stringify(change));
  }
  assert.ok(core.validateBlog(valid, 'too short').some(x => x.includes('600')));
  assert.ok(core.validateBlog(valid, body + '[broken](/en/blog/missing)', {slugs:['real-post'],paths:['/en/contact']}).some(x => x.includes('link')));
  assert.deepEqual(core.validateBlog({...valid,draft:true,author:{name:'John Doe'}}, 'template'), []);
});

test('public collection excludes drafts, sorts dates and has no six-post cap', () => {
  assert.equal(typeof core.publicBlogs, 'function');
  const posts = Array.from({length: 9}, (_, i) => ({slug: `post-${i}`, date: `2026-09-${String(i+1).padStart(2,'0')}`, draft: false, tags: ['engineering']}));
  const result = core.publicBlogs([...posts, {...posts[0], slug:'draft',draft:true}]);
  assert.equal(result.length, 9);
  assert.equal(result[0].slug, 'post-8');
});
