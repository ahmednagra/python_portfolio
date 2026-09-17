import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/seo";
import { ARTICLE_SLUGS, getArticleMeta } from "@/app/writing/_articles";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const articles = await Promise.all(ARTICLE_SLUGS.map((slug) => getArticleMeta(slug)));

  const items = articles
    .map(
      (article) => `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${siteUrl}/writing/${article.slug}</link>
      <guid>${siteUrl}/writing/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.summary)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} — Writing</title>
    <link>${siteUrl}/writing</link>
    <description>${escapeXml(site.description)}</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
