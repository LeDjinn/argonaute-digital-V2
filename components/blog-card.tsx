import Link from "next/link";
import Image from "next/image";
import type { BlogWithSlug } from "@/lib/blog";
import { localePath } from "@/lib/blog-core.mjs";

export function BlogCard({ blog, locale = "en" }: { blog: BlogWithSlug; locale?: string }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-[#111113] overflow-hidden transition-colors hover:border-indigo-400/40">
      {blog.image && <Link href={localePath(locale, `/blog/${blog.slug}`)} tabIndex={-1} aria-hidden="true"><Image src={blog.image} alt="" width={800} height={450} className="aspect-video w-full object-cover" /></Link>}
      <div className="p-6">
        <div className="font-mono text-xs text-text-tertiary mb-4 flex flex-wrap gap-3"><time dateTime={blog.date}>{new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-US", {dateStyle:"medium",timeZone:"UTC"}).format(new Date(`${blog.date}T00:00:00Z`))}</time><span>{blog.readingTime} min {locale === "fr" ? "de lecture" : "read"}</span></div>
        <h2 lang="en" className="text-xl font-semibold tracking-tight"><Link href={localePath(locale, `/blog/${blog.slug}`)} className="hover:text-accent-indigo focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400">{blog.title}</Link></h2>
        <p lang="en" className="mt-3 text-sm leading-relaxed text-text-secondary">{blog.description}</p>
        <p className="mt-5 text-xs text-text-tertiary">{blog.author.name}</p>
        <div className="mt-4 flex flex-wrap gap-2">{blog.tags.map(tag => <Link key={tag} href={localePath(locale, `/blog/tag/${tag}`)} className="font-mono text-xs text-accent-green rounded-md border border-white/10 px-2 py-1 hover:border-green-400/50">{tag}</Link>)}</div>
      </div>
    </article>
  );
}
