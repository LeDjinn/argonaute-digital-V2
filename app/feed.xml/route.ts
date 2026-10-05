import {getAllBlogs} from "@/lib/blog";
import {rssFeed} from "@/lib/blog-core.mjs";
import {siteUrl} from "@/lib/site-config";
export const dynamic="force-static";
export async function GET() {
  return new Response(rssFeed(await getAllBlogs(),siteUrl),{headers:{"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}});
}
