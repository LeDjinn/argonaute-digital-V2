import type { Metadata } from "next";
import { getAllBlogs, type BlogParams } from "@/lib/blog";
import { BlogIndex } from "@/components/blog-index";
import { localePath } from "@/lib/blog-core.mjs";
import { siteUrl } from "@/lib/site-config";

export async function generateMetadata({params}:{params:BlogParams}):Promise<Metadata> {
  const {locale}=await params;
  const title="Blog | Argonaute Digital";
  const description=locale === "fr" ? "Notes pratiques sur Next.js, TypeScript, le cloud et l’ingénierie assistée par IA." : "Practical notes on Next.js, TypeScript, cloud architecture and AI-assisted engineering.";
  const url=new URL(localePath(locale,"/blog"),siteUrl).href;
  return {title,description,alternates:{canonical:url,languages:{en:new URL("/en/blog",siteUrl).href,fr:new URL("/fr/blog",siteUrl).href},types:{"application/rss+xml":new URL("/feed.xml",siteUrl).href}},openGraph:{title,description,url,type:"website",images:["/banner.png"]},twitter:{card:"summary_large_image",title,description,images:["/banner.png"]}};
}
export default async function ArticlesIndex({params}:{params:BlogParams}) {
  const {locale}=await params;
  return <BlogIndex blogs={await getAllBlogs()} locale={locale} />;
}
