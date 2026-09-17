import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { pages } from "@/content/pages";
import { problems } from "@/content/problems";
import { getClearedCaseStudies } from "@/components/work/case-studies";
import { ARTICLE_SLUGS, getArticleMeta } from "@/app/writing/_articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const caseStudySlugs = getClearedCaseStudies().map((entry) => entry.slug);
  const articles = await Promise.all(ARTICLE_SLUGS.map((slug) => getArticleMeta(slug)));

  const staticRoutes: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${siteUrl}${page.route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: page.route === "/" ? 1 : 0.7,
  }));

  const problemRoutes: MetadataRoute.Sitemap = problems.map((problem) => ({
    url: `${siteUrl}/problems/${problem.key}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${siteUrl}/work/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/writing/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...problemRoutes, ...caseStudyRoutes, ...articleRoutes];
}
