// Shared pure blog publishing helpers.
export function wordCount(body) {
  // Publishing length measures prose, not headings or the bibliography.
  const prose = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^ {0,3}#{1,6}\s+Sources\s*#*\s*$[\s\S]*/im, '')
    .replace(/^ {0,3}#{1,6}\s+.*$/gm, '')
    .replace(/^ {0,3}\[[^\]]+\]:[^\n]*(?:\n[ \t]+[^\n]+)*/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\d+\]/g, '')
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, '$1')
    .replace(/https?:\/\/[^\s<>]+/g, '')
    .replace(/<[^>]+>/g, '');
  return prose.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}
export function validateBlog(blog, body, context = {}) {
  const errors = [];
  if (typeof blog.draft !== 'boolean') errors.push('draft must be an explicit boolean');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(blog.slug ?? '')) errors.push('invalid slug');
  if (blog.draft === true) return errors;
  if (!blog.title?.trim() || !blog.description?.trim()) errors.push('title and description required');
  if (!blog.author?.name?.trim() || !blog.author?.src || /john doe|jane doe|tyler durden|manu arora|placeholder|your name|example author|aceternity/i.test(blog.author.name)) errors.push('real author and author image required; no placeholder authors');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(blog.date ?? '') || !Number.isFinite(Date.parse(blog.date)) || new Date(blog.date).toISOString().slice(0,10) !== blog.date) errors.push('invalid date');
  if (!Array.isArray(blog.tags) || !blog.tags.length || blog.tags.some(tag => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag)) || new Set(blog.tags).size !== blog.tags.length) errors.push('valid unique tags required');
  if (!Number.isInteger(blog.readingTime) || blog.readingTime < 1) errors.push('positive integer readingTime required');
  if (!Array.isArray(blog.sources) || !blog.sources.length || blog.sources.some(source => {try { return new URL(source).protocol !== 'https:'; } catch { return true; }})) errors.push('HTTPS sources required');
  const count = wordCount(body);
  if (count < 600 || count > 900) errors.push(`body must contain 600–900 words (found ${count})`);
  for (const match of body.matchAll(/(?:\]\(|href=["'])(\/[^\s)"']+)/g)) {
    const path = match[1].split(/[?#]/)[0];
    if (path.startsWith('//')) { errors.push(`invalid internal link: ${path}`); continue; }
    const article = path.match(/^\/(?:en|fr)\/blog\/([^/]+)$/);
    if (article && context.slugs && !context.slugs.includes(article[1])) errors.push(`broken article link: ${path}`);
    else if (!article && context.paths && !context.paths.includes(path)) errors.push(`broken internal link: ${path}`);
    if (!/^\/(en|fr)(\/|$)/.test(path) && !/\.[a-z0-9]+$/i.test(path)) errors.push(`internal link must include locale: ${path}`);
  }
  return errors;
}
export function publicBlogs(blogs) {
  return blogs.filter(blog => blog.draft === false).sort((a, b) => b.date.localeCompare(a.date));
}

export async function copyArticleLink(url, browser = globalThis.navigator) {
  try {
    if (!browser?.clipboard?.writeText) return false;
    await browser.clipboard.writeText(url);
    return true;
  } catch { return false; }
}
export function localePath(locale, path = '') {
  return `/${locale === 'fr' ? 'fr' : 'en'}${path}`;
}
export function articleUrl(blog, locale, base) {
  return new URL(localePath(blog.draft === false ? 'en' : locale, `/blog/${blog.slug}`), base).href;
}
export function articleMetadata(blog, locale, base) {
  const url = articleUrl(blog, locale, base);
  const image = new URL(blog.image || '/banner.png', base).href;
  return {
    title: `${blog.title} | Argonaute Digital`, description: blog.description,
    alternates: {canonical: url, ...(blog.draft === false ? {languages: {en: url}} : {})},
    robots: {index: blog.draft === false, follow: true},
    openGraph: {title: blog.title, description: blog.description, url, type: 'article', publishedTime: blog.date, authors: [blog.author.name], tags: blog.tags, images: [image], locale: blog.draft === false || locale !== 'fr' ? 'en_US' : 'fr_FR'},
    twitter: {card: 'summary_large_image', title: blog.title, description: blog.description, images: [image]},
  };
}
export function blogSchema(blog, locale, base) {
  return {'@context':'https://schema.org', '@type':'BlogPosting', headline:blog.title, description:blog.description,
    datePublished:blog.date, dateModified:blog.date, author:{'@type':'Person',name:blog.author.name},
    publisher:{'@type':'Organization',name:'Argonaute Digital',url:base},
    image:new URL(blog.image || '/banner.png',base).href, mainEntityOfPage:articleUrl(blog,locale,base),
    url:articleUrl(blog,locale,base), keywords:blog.tags.join(', '), inLanguage:'en'};
}
export function blogTags(blogs) { return [...new Set(publicBlogs(blogs).flatMap(blog => blog.tags))].sort(); }
export function relatedBlogs(blog, blogs, limit = 3) {
  const score = post => post.tags.filter(tag => blog.tags.includes(tag)).length;
  return publicBlogs(blogs).filter(post => post.slug !== blog.slug).sort((a,b) => score(b)-score(a)).slice(0,limit);
}
export function discoveryEntries(blogs, caseSlugs, base) {
  return [
    ...publicBlogs(blogs).map(blog => ({url:articleUrl(blog,'en',base),lastModified:blog.date,changeFrequency:'monthly',priority:0.7})),
    ...['en','fr'].flatMap(locale => [
    ...blogTags(blogs).map(tag=>({url:new URL(localePath(locale,`/blog/tag/${tag}`),base).href,changeFrequency:'weekly',priority:0.5})),
    ...caseSlugs.map(slug=>({url:new URL(localePath(locale,`/case-studies/${slug}`),base).href,changeFrequency:'monthly',priority:0.8})),
    ]),
  ];
}
export function escapeXml(value) {
  return String(value).replace(/[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd\u{10000}-\u{10ffff}]/gu, '').replace(/[<>&"']/g, character => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[character]));
}
export function rssFeed(blogs, base, locale = 'en') {
  const url = new URL('/feed.xml',base).href;
  const items = publicBlogs(blogs).map(blog => `<item><title>${escapeXml(blog.title)}</title><link>${escapeXml(articleUrl(blog,locale,base))}</link><guid isPermaLink="true">${escapeXml(articleUrl(blog,locale,base))}</guid><description>${escapeXml(blog.description)}</description><pubDate>${new Date(`${blog.date}T00:00:00Z`).toUTCString()}</pubDate>${blog.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}</item>`).join('');
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Argonaute Digital Blog</title><link>${escapeXml(new URL(localePath(locale,'/blog'),base).href)}</link><description>Production engineering notes from Argonaute Digital</description><language>en</language><atom:link href="${escapeXml(url)}" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
}
