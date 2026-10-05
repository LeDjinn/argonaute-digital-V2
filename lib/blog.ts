import { blogFilenames } from "./blog-files.mjs";
import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { articleMetadata, publicBlogs } from "./blog-core.mjs";
import { siteUrl } from "./site-config";

export interface BlogWithSlug {
  slug: string;
  title: string;
  description: string;
  author: { name: string; src: string };
  date: string;
  image?: string | StaticImageData;
  tags: string[];
  draft: boolean;
  readingTime: number;
  sources?: string[];
}
export type BlogParams = Promise<{ locale: string }>;

async function importBlog(filename: string): Promise<BlogWithSlug> {
  const { blog } = await import(`../app/[locale]/(marketing)/blog/${filename}`);
  const slug = filename.replace(/(\/page)?\.mdx$/, "");
  if (blog.slug !== slug) throw new Error(`Blog slug must match directory: ${slug}`);
  return blog;
}

// Drafts are only rendered at their preserved legacy URL, never discovered publicly.
export async function getAllBlogs(): Promise<BlogWithSlug[]> {
  const filenames = await blogFilenames("./app/[locale]/(marketing)/blog");
  return publicBlogs(await Promise.all(filenames.map(importBlog)));
}

export async function generateBlogMetadata(blog: BlogWithSlug, { params }: { params: BlogParams }): Promise<Metadata> {
  const { locale } = await params;
  return articleMetadata({...blog,image:typeof blog.image === "string" ? blog.image : blog.image?.src}, locale, siteUrl) as Metadata;
}
