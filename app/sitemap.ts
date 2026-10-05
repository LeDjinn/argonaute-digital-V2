import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blog";
import { discoveryEntries } from "@/lib/blog-core.mjs";
import enText from "@/app/messages/en.json";
import { siteUrl as baseUrl } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["en", "fr"];
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/our-workflow", priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return [...entries, ...discoveryEntries(await getAllBlogs(), enText.caseStudies.map(study => study.slug), baseUrl)] as MetadataRoute.Sitemap;
}
