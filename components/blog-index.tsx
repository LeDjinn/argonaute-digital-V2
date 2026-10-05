import Link from "next/link";
import type { BlogWithSlug } from "@/lib/blog";
import { BlogCard } from "./blog-card";
import { blogTags, localePath, publicBlogs } from "@/lib/blog-core.mjs";

export function BlogIndex({ blogs, locale, tag }: { blogs: BlogWithSlug[]; locale: string; tag?: string }) {
  const fr = locale === "fr";
  const tags: string[] = blogTags(blogs);
  const published: BlogWithSlug[] = publicBlogs(blogs);
  const filtered = tag ? published.filter(blog => blog.tags.includes(tag)) : published;
  return <main className="max-w-[1160px] mx-auto px-6 md:px-12 py-20 md:py-28">
    <header className="max-w-2xl mb-12">
      <p className="font-mono text-xs tracking-widest text-accent-indigo mb-4">ARGONAUTE DIGITAL / {fr ? "NOTES TECHNIQUES" : "ENGINEERING NOTES"}</p>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{tag ? `${fr ? "Thème" : "Topic"} : ${tag}` : "Blog"}</h1>
      <p className="mt-5 text-lg text-text-secondary leading-relaxed">{fr ? "Des retours concrets sur Next.js, TypeScript, le cloud et l’ingénierie assistée par IA." : "Practical notes on Next.js, TypeScript, cloud architecture and AI-assisted engineering."}</p>
      {fr && <p className="mt-3 text-sm text-text-tertiary">Les articles sont actuellement rédigés en anglais.</p>}
    </header>
    <nav aria-label={fr ? "Filtrer par thème" : "Filter by topic"} className="flex flex-wrap gap-2 mb-10">
      <Link href={localePath(locale,"/blog")} aria-current={!tag ? "page" : undefined} className="font-mono text-sm rounded-lg px-4 py-2 border border-white/15 hover:border-indigo-400 aria-[current=page]:bg-indigo-500/20">{fr ? "Tous les articles" : "All articles"}</Link>
      {tags.map(topic => <Link key={topic} href={localePath(locale,`/blog/tag/${topic}`)} aria-current={tag === topic ? "page" : undefined} className="font-mono text-sm rounded-lg px-4 py-2 border border-white/15 text-accent-green hover:border-green-400 aria-[current=page]:bg-green-500/10">{topic}</Link>)}
    </nav>
    {filtered.length ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filtered.map(blog => <BlogCard key={blog.slug} blog={blog} locale={locale} />)}</div> : <p className="rounded-xl border border-white/10 bg-[#111113] p-8 text-text-secondary">{fr ? "Les premiers articles arrivent bientôt. Retrouvez-les dans le flux RSS." : "The first articles are coming soon. Follow the RSS feed for updates."}</p>}
    <BlogCta locale={locale} />
  </main>;
}

export function BlogCta({locale}:{locale:string}) {
  const fr = locale === "fr";
  return <aside className="mt-16 rounded-2xl border border-white/10 bg-[#111113] p-8 md:p-10">
    <h2 className="text-2xl font-semibold">{fr ? "Un projet à fiabiliser ?" : "Need a reliable production system?"}</h2>
    <p className="mt-3 text-text-secondary">{fr ? "Parlons de vos enjeux techniques. Pour suivre les prochains articles, ajoutez notre flux RSS à votre lecteur." : "Let’s talk about your engineering challenges. To follow new articles, add our RSS feed to your reader."}</p>
    <div className="mt-6 flex flex-wrap gap-4"><Link className="rounded-lg bg-indigo-500 px-5 py-3 text-white font-medium hover:bg-indigo-400" href={localePath(locale,"/contact")}>{fr ? "Parlons de votre projet" : "Discuss your project"}</Link><a className="rounded-lg border border-white/20 px-5 py-3 text-accent-green hover:border-green-400" href="/feed.xml" type="application/rss+xml">{fr ? "S’abonner via RSS" : "Subscribe via RSS"}</a></div>
  </aside>;
}
