import { MetadataRoute } from "next";
import { siteUrl as baseUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
