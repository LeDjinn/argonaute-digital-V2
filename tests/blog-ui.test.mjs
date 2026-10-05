import test from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire(import.meta.url);
const Module = require('node:module');
const root = path.resolve('');
const originalLoad = Module._load;
Module._load = function(request,parent,...rest) {
  // The bundler resolves extensionless ESM imports in this existing package.
  if(request === 'next/font/google') return {Inter:()=>({variable:'--font-inter'}),IBM_Plex_Mono:()=>({variable:'--font-ibm-plex-mono'})};
  if(request === 'next-view-transitions') return {Link:require('next/link').default,ViewTransitions:require('react').Fragment};
  return originalLoad.call(this,request,parent,...rest);
};
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function(request,parent,...rest) {
  if(request.startsWith('@/')) request = path.join(root,request.slice(2));
  return originalResolve.call(this,request,parent,...rest);
};
for (const extension of ['.ts','.tsx']) Module._extensions[extension] = (module,filename) => module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText,filename);
const {compileSync} = require('@mdx-js/mdx');
Module._extensions['.mdx'] = (module,filename) => {
  const source = String(compileSync(fs.readFileSync(filename,'utf8')));
  module._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,filename);
};
Module._extensions['.jpeg'] = (module,filename) => {module.exports={src:`/images/${path.basename(filename)}`,width:800,height:450};};
Module._extensions['.css'] = () => {};
const React = require('react');
const {renderToStaticMarkup} = require('react-dom/server');
const post = {slug:'production-guide',title:'Production guide',description:'Build reliably.',author:{name:'Tim Spiridonov',src:'/tim.png'},date:'2026-10-05',tags:['engineering'],draft:false,readingTime:4,sources:['https://nextjs.org/docs']};

test('locale-prefixed protected price offers still require authentication', async () => {
  const {middleware}=require('../middleware.ts');
  const {NextRequest}=require('next/server');
  for(const prefix of ['', '/en', '/fr']) {
    const response=await middleware(new NextRequest(`https://example.org${prefix}/price-offers/private`));
    assert.ok(response.headers.get('location')?.includes('/api/auth/signin'),`${prefix || 'legacy'} protected route redirects to sign in`);
  }
});

test('protected offer roots and descendants enforce email allowlist without matching similarly named public routes', async () => {
  const {middleware}=require('../middleware.ts');
  const {NextRequest}=require('next/server');
  const {encode}=require('next-auth/jwt');
  const previous=process.env.NEXTAUTH_SECRET;
  process.env.NEXTAUTH_SECRET='blog-middleware-regression-test-secret';
  try {
    for (const email of ['amine@top-turnover.ai','argonautedigital.tim@gmail.com','outsider@example.org']) {
      const token=await encode({token:{email},secret:process.env.NEXTAUTH_SECRET});
      for (const prefix of ['', '/en', '/fr']) {
        for (const route of ['/price-offers','/price-offers/private','/price-offers-extra']) {
          const url=`https://example.org${prefix}${route}`;
          const response=await middleware(new NextRequest(url,{headers:{authorization:`Bearer ${token}`}}));
          const location=response.headers.get('location');
          const denied=email==='outsider@example.org' && route!=='/price-offers-extra';
          assert.equal(Boolean(location?.includes('/api/auth/signin')),denied,`${email} ${prefix}${route}`);
          if (denied) assert.equal(new URL(location).searchParams.get('callbackUrl'),url);
        }
      }
    }
    for (const prefix of ['', '/en', '/fr']) {
      const response=await middleware(new NextRequest(`https://example.org${prefix}/price-offers-extra`));
      assert.ok(!response.headers.get('location')?.includes('/api/auth/signin'));
    }
  } finally {
    if (previous===undefined) delete process.env.NEXTAUTH_SECRET;
    else process.env.NEXTAUTH_SECRET=previous;
  }
});

test('Next 15 route params are awaited while preserving French rendering', async () => {
  const layout=require('../app/[locale]/layout.tsx');
  const metadata=await layout.generateMetadata({params:Promise.resolve({locale:'fr'})});
  assert.ok(metadata.title.includes('Ingénierie'));
  const tree=await layout.default({params:Promise.resolve({locale:'fr'}),children:'Content'});
  assert.equal(tree.props.children.props.lang,'fr');
  for(const route of ['page','contact/page','case-studies/page']) {
    const component=require(`../app/[locale]/(marketing)/${route}.tsx`).default;
    const element=await component({params:Promise.resolve({locale:'fr'})});
    if(route==='contact/page') assert.equal(element.props.children.props.locale,'fr');
    else assert.ok(renderToStaticMarkup(element).includes(route==='page' ? 'Réserver' : 'cas'));
  }
});

test('shared locale layout does not force homepage canonical onto every route', async () => {
  const layout=require('../app/[locale]/layout.tsx');
  const metadata=await layout.generateMetadata({params:{locale:'fr'}});
  assert.equal(metadata.alternates,undefined);
  assert.equal(metadata.openGraph.url,undefined);
  const homepage=require('../app/[locale]/(marketing)/page.tsx');
  assert.equal(typeof homepage.generateMetadata,'function');
  const home=await homepage.generateMetadata({params:Promise.resolve({locale:'fr'})});
  assert.ok(home.alternates.canonical.endsWith('/fr'));
});

test('navigation and footer expose locale-specific blog and root RSS links', () => {
  const {Footer}=require('../components/footer.tsx');
  const footer=renderToStaticMarkup(React.createElement(Footer,{locale:'fr'}));
  assert.ok(footer.includes('href="/fr/blog"'));
  assert.ok(footer.includes('href="/feed.xml"'));
  const {NavBar}=require('../components/navbar/index.tsx');
  const {AppRouterContext}=require('next/dist/shared/lib/app-router-context.shared-runtime');
  const {PathnameContext}=require('next/dist/shared/lib/hooks-client-context.shared-runtime');
  const nav=renderToStaticMarkup(React.createElement(AppRouterContext.Provider,{value:{push(){},refresh(){},prefetch(){}}},React.createElement(PathnameContext.Provider,{value:'/fr/blog'},React.createElement(NavBar,{locale:'fr'}))));
  assert.ok(nav.includes('href="/fr/blog"'));
  assert.ok(nav.includes('href="/feed.xml"'));
});

test('tag archive only generates published tags and unknown tags return not found', async () => {
  assert.ok(fs.existsSync('app/[locale]/(marketing)/blog/tag/[tag]/page.tsx'),'tag archive route exists');
  const archive=require('../app/[locale]/(marketing)/blog/tag/[tag]/page.tsx');
  const {getAllBlogs}=require('../lib/blog.ts');
  const {blogTags}=require('../lib/blog-core.mjs');
  assert.deepEqual(await archive.generateStaticParams(),blogTags(await getAllBlogs()).map(tag=>({tag})));
  await assert.rejects(archive.default({params:{locale:'fr',tag:'unknown-no-such-tag'}}),/NEXT_(?:NOT_FOUND|HTTP_ERROR_FALLBACK;404)/);
  const {BlogIndex}=require('../components/blog-index.tsx');
  const html=renderToStaticMarkup(React.createElement(BlogIndex,{blogs:[post,{...post,slug:'other',title:'OTHER SUBJECT',tags:['cloud']}],locale:'en',tag:'engineering'}));
  assert.ok(html.includes('Production guide'));
  assert.ok(!html.includes('OTHER SUBJECT'));
});

test('localized blog route metadata and legacy MDX pages use own canonical and draft robots', async () => {
  const page=require('../app/[locale]/(marketing)/blog/page.tsx');
  assert.equal(typeof page.generateMetadata,'function');
  const meta=await page.generateMetadata({params:Promise.resolve({locale:'fr'})});
  assert.ok(meta.alternates.canonical.endsWith('/fr/blog'));
  for(const entry of fs.readdirSync('app/[locale]/(marketing)/blog',{withFileTypes:true})) {
    const filename=`../app/[locale]/(marketing)/blog/${entry.name}/page.mdx`;
    if(!entry.isDirectory() || !fs.existsSync(filename.replace('../',''))) continue;
    const mdx=require(filename);
    assert.equal(typeof mdx.generateMetadata,'function',entry.name);
    const metadata=await mdx.generateMetadata({params:{locale:'fr'}});
    assert.equal(metadata.robots.index,mdx.blog.draft === false);
    assert.ok(metadata.alternates.canonical.endsWith(`/${mdx.blog.draft ? 'fr' : 'en'}/blog/${entry.name}`));
  }
});

test('feed route and sitemap discover only published metadata', async () => {
  assert.ok(fs.existsSync('app/feed.xml/route.ts'),'RSS route exists');
  const {GET}=require('../app/feed.xml/route.ts');
  const response=await GET();
  assert.equal(response.status,200);
  assert.ok(response.headers.get('content-type').includes('application/rss+xml'));
  const xml=await response.text();
  assert.ok(xml.includes('<rss'));
  assert.ok(!xml.includes('what-is-ai-anyway'));
  const sitemap=require('../app/sitemap.ts');
  const entries=await sitemap.default();
  assert.ok(entries.some(entry=>entry.url.includes('/fr/case-studies/') ));
  assert.ok(!entries.some(entry=>entry.url.includes('/blog/what-is-ai-anyway')));
});

test('French article and cards identify English passages without relabeling French controls', () => {
  const {BlogArticle}=require('../components/blog-layout.tsx');
  const {BlogCard}=require('../components/blog-card.tsx');
  const html=renderToStaticMarkup(React.createElement(BlogArticle,{blog:post,locale:'fr',related:[],children:React.createElement('p',null,'English body')}));
  assert.match(html, /<h1[^>]*lang="en"[^>]*>Production guide<\/h1>/);
  assert.match(html, /<p[^>]*lang="en"[^>]*>Build reliably\.<\/p>/);
  assert.match(html, /<div[^>]*lang="en"[^>]*data-mdx-content[^>]*><p>English body<\/p><\/div>/);
  assert.match(html, /<a[^>]*>← Tous les articles<\/a>/);
  assert.match(html, /<time[^>]*>5 octobre 2026<\/time>/);
  assert.ok(html.includes('Cet article est rédigé en anglais.'));
  const card=renderToStaticMarkup(React.createElement(BlogCard,{blog:post,locale:'fr'}));
  assert.match(card, /<h2[^>]*lang="en"[^>]*>/);
  assert.match(card, /<p[^>]*lang="en"[^>]*>Build reliably\.<\/p>/);
  assert.ok(card.includes('de lecture'));
  assert.ok(!html.includes('<main lang="en"'));
  assert.ok(!card.includes('<article lang="en"'));
});

test('rendered JSON-LD escapes hostile script closures and shares English canonical identity', () => {
  const {BlogArticle}=require('../components/blog-layout.tsx');
  const hostile='</script><script>alert("hostile")</script>';
  const blog={...post,title:hostile,description:hostile};
  const html=renderToStaticMarkup(React.createElement(BlogArticle,{blog,locale:'fr',related:[],children:'Body'}));
  const scripts=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length,1);
  assert.ok(scripts[0][1].includes('\\u003c'));
  assert.ok(!scripts[0][1].includes('<'));
  const schema=JSON.parse(scripts[0][1]);
  assert.equal(schema.headline,hostile);
  assert.equal(schema.description,hostile);
  assert.ok(schema.url.endsWith('/en/blog/production-guide'));
  assert.equal(schema.mainEntityOfPage,schema.url);
  assert.equal(schema.inLanguage,'en');
  assert.ok(html.includes(encodeURIComponent(schema.url)), 'share links encode canonical English URL');
  assert.ok(html.includes('Cet article est rédigé en anglais.'));
});

test('article view shows template warning without schema and preserves original attribution', () => {
  const {BlogArticle} = require('../components/blog-layout.tsx');
  assert.equal(typeof BlogArticle,'function');
  const draft={...post,draft:true,author:{name:'Tyler Durden',src:'/avatar.jpeg'}};
  const html=renderToStaticMarkup(React.createElement(BlogArticle,{blog:draft,locale:'fr',related:[],children:React.createElement('p',null,'Body')}));
  assert.ok(html.includes('Modèle non publié'));
  assert.ok(html.includes('Tyler Durden'));
  assert.ok(html.includes('/fr/blog'));
  assert.ok(!html.includes('application/ld+json'));
  const live=renderToStaticMarkup(React.createElement(BlogArticle,{blog:post,locale:'en',related:[{...post,slug:'related-guide'}],children:React.createElement('p',null,'Body')}));
  assert.ok(live.includes('BlogPosting'));
  assert.ok(live.includes('/en/blog/related-guide'));
  assert.ok(live.includes('/en/contact'));
});

test('share controls have labeled copy, email and safe LinkedIn links', () => {
  assert.ok(fs.existsSync('components/blog-share.tsx'),'share component exists');
  const {BlogShare} = require('../components/blog-share.tsx');
  const html=renderToStaticMarkup(React.createElement(BlogShare,{url:'https://example.org/fr/blog/guide?a=1&b=2',title:'Guide & tips',locale:'fr'}));
  assert.ok(html.includes('Copier le lien'));
  assert.ok(html.includes('aria-live="polite"'));
  assert.ok(html.includes('mailto:'));
  assert.ok(html.includes('noopener noreferrer'));
  assert.ok(html.includes('https%3A%2F%2Fexample.org'));
});

test('MDX metadata helper awaits locale params and returns an article canonical', async () => {
  const lib = require('../lib/blog.ts');
  assert.equal(typeof lib.generateBlogMetadata,'function');
  const metadata = await lib.generateBlogMetadata(post,{params:Promise.resolve({locale:'fr'})});
  assert.ok(metadata.alternates.canonical.endsWith('/en/blog/production-guide'));
  assert.deepEqual(Object.keys(metadata.alternates.languages),['en']);
  assert.equal(metadata.openGraph.type,'article');
});

test('blog index renders every public post, localized tag filters, contact and RSS', () => {
  assert.ok(fs.existsSync('components/blog-index.tsx'),'blog index component exists');
  const {BlogIndex} = require('../components/blog-index.tsx');
  const posts = Array.from({length:9},(_,i)=>({...post,slug:`post-${i}`,title:`Post ${i}`}));
  const html = renderToStaticMarkup(React.createElement(BlogIndex,{blogs:[...posts,{...post,draft:true,title:'HIDDEN DRAFT'}],locale:'fr'}));
  assert.ok(html.includes('/fr/blog/post-8'));
  assert.ok(!html.includes('HIDDEN DRAFT'));
  assert.ok(html.includes('aria-label="Filtrer par thème"'));
  assert.ok(html.includes('/fr/blog/tag/engineering'));
  assert.ok(html.includes('/fr/contact'));
  assert.ok(html.includes('/feed.xml'));
});

test('article cards expose localized URL, date, tags and reading time', () => {
  const {BlogCard} = require('../components/blog-card.tsx');
  const html = renderToStaticMarkup(React.createElement(BlogCard,{blog:post,locale:'fr'}));
  assert.ok(html.includes('href="/fr/blog/production-guide"'));
  assert.ok(html.includes('dateTime="2026-10-05"'));
  assert.ok(html.includes('4 min'));
  assert.ok(html.includes('/fr/blog/tag/engineering'));
});
