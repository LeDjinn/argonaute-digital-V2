import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllBlogs } from "@/lib/blog";
import { blogTags, localePath } from "@/lib/blog-core.mjs";
import { BlogIndex } from "@/components/blog-index";
import { siteUrl } from "@/lib/site-config";

type Params = Promise<{locale:string;tag:string}>;
export async function generateStaticParams() {
  return blogTags(await getAllBlogs()).map((tag:string)=>({tag}));
}
export async function generateMetadata({params}:{params:Params}):Promise<Metadata> {
  const {locale,tag}=await params;
  if(!blogTags(await getAllBlogs()).includes(tag)) notFound();
  const title=`${tag} | Blog | Argonaute Digital`;
  const description=locale === "fr" ? `Articles sur ${tag} : notes pratiques d’ingénierie.` : `Articles about ${tag}: practical engineering notes.`;
  const url=new URL(localePath(locale,`/blog/tag/${tag}`),siteUrl).href;
  return {title,description,alternates:{canonical:url,languages:{en:new URL(`/en/blog/tag/${tag}`,siteUrl).href,fr:new URL(`/fr/blog/tag/${tag}`,siteUrl).href}},openGraph:{title,description,url,type:"website",images:["/banner.png"]},twitter:{card:"summary_large_image",title,description,images:["/banner.png"]}};
}
export default async function TagArchive({params}:{params:Params}) {
  const {locale,tag}=await params;
  const blogs=await getAllBlogs();
  if(!blogTags(blogs).includes(tag)) notFound();
  return <BlogIndex blogs={blogs} locale={locale} tag={tag} />;
}
