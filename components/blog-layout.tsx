import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAllBlogs, type BlogWithSlug, type BlogParams } from "@/lib/blog";
import { articleUrl, blogSchema, localePath, relatedBlogs } from "@/lib/blog-core.mjs";
import { siteUrl } from "@/lib/site-config";
import { BlogCard } from "./blog-card";
import { BlogCta } from "./blog-index";
import { BlogShare } from "./blog-share";

type ArticleProps = {blog:BlogWithSlug;children:ReactNode};
export async function BlogLayout({blog,children,params}:{params:BlogParams} & ArticleProps) {
  const {locale} = await params;
  const related = blog.draft ? [] : relatedBlogs(blog,await getAllBlogs());
  return <BlogArticle blog={blog} locale={locale} related={related} >{children}</BlogArticle>;
}

export function BlogArticle({blog,children,locale,related}:{locale:string;related:BlogWithSlug[]} & ArticleProps) {
  const fr=locale === "fr";
  const url=articleUrl(blog,locale,siteUrl);
  const schema=blogSchema({...blog,image:typeof blog.image === "string" ? blog.image : blog.image?.src},locale,siteUrl);
  return <main className="max-w-[1000px] mx-auto px-6 md:px-12 py-16 md:py-24">
    <Link href={localePath(locale,"/blog")} className="text-sm text-text-secondary hover:text-accent-indigo">← {fr ? "Tous les articles" : "All articles"}</Link>
    {blog.draft && <aside role="note" className="mt-8 rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-amber-200"><strong>{fr ? "Modèle non publié" : "Unpublished template"}</strong><p className="mt-2 text-sm">{fr ? "Cette page historique est un exemple de modèle, pas un article validé. Les attributions d’origine sont conservées et le contenu n’est pas indexé." : "This legacy page is template content, not a reviewed article. Original attribution is preserved and this page is not indexed."}</p></aside>}
    <article className="mt-10">
      <header className="max-w-3xl">
        <div className="flex flex-wrap gap-2 mb-5">{blog.tags.map(tag=><Link href={localePath(locale,`/blog/tag/${tag}`)} key={tag} className="text-accent-green font-mono text-xs rounded-md border border-white/10 px-3 py-1.5">{tag}</Link>)}</div>
        <h1 lang="en" className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">{blog.title}</h1>
        <p lang="en" className="mt-5 text-lg text-text-secondary leading-relaxed">{blog.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-text-tertiary"><span>{blog.author.name}</span><time dateTime={blog.date}>{new Intl.DateTimeFormat(fr ? "fr-FR" : "en-US",{dateStyle:"long",timeZone:"UTC"}).format(new Date(`${blog.date}T00:00:00Z`))}</time><span className="font-mono">{blog.readingTime} min {fr ? "de lecture" : "read"}</span></div>
        {fr && !blog.draft && <p className="mt-4 text-sm text-text-tertiary">Cet article est rédigé en anglais.</p>}
      </header>
      {blog.image && <Image src={blog.image} width={1200} height={675} alt={blog.title} className="my-10 aspect-video w-full rounded-2xl object-cover" priority />}
      <div lang="en" className="mt-10 prose prose-invert prose-lg max-w-none prose-headings:tracking-tight prose-p:text-text-secondary prose-li:text-text-secondary prose-a:text-indigo-300 prose-a:underline prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#111113]" data-mdx-content>{children}</div>
      {!blog.draft && <BlogShare url={url} title={blog.title} locale={locale} />}
    </article>
    {!blog.draft && <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}} />}
    {!blog.draft && related.length > 0 && <section aria-labelledby="related-heading" className="mt-16"><h2 id="related-heading" className="text-2xl font-semibold mb-6">{fr ? "Articles connexes" : "Related articles"}</h2><div className="grid md:grid-cols-3 gap-6">{related.map(post=><BlogCard key={post.slug} blog={post} locale={locale} />)}</div></section>}
    <BlogCta locale={locale} />
  </main>;
}
