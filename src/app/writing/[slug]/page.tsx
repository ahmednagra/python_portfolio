import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/content/site";
import { ARTICLE_SLUGS, getArticleMeta, isArticleSlug } from "../_articles";

export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isArticleSlug(slug)) {
    return {};
  }
  const meta = await getArticleMeta(slug);
  return {
    title: meta.title,
    description: meta.summary,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.summary,
      type: "article",
      publishedTime: meta.date,
    },
  };
}

function articleJsonLd(meta: { title: string; date: string; summary: string; slug: string }) {
  const url = `${getSiteUrl()}/writing/${meta.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.summary,
    datePublished: meta.date,
    dateModified: meta.date,
    author: { "@type": "Person", name: site.name },
    url,
    mainEntityOfPage: url,
  };
}

/**
 * One article, MDX-rendered via the dynamic-import pattern documented in
 * the Next.js MDX guide (generateStaticParams + dynamicParams = false),
 * with Article + BreadcrumbList JSON-LD. This is the one cleared article —
 * see ../_articles.ts for how a future one gets added.
 */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isArticleSlug(slug)) {
    notFound();
  }

  const [meta, articleModule] = await Promise.all([
    getArticleMeta(slug),
    import(`@/content/articles/${slug}.mdx`),
  ]);
  const ArticleBody = articleModule.default;

  return (
    <article className="prose-editorial mx-auto px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({ ...meta, slug })) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Writing", path: "/writing" },
              { name: meta.title, path: `/writing/${slug}` },
            ])
          ),
        }}
      />

      <p className="mono-label text-(--color-ink-muted)">
        <time dateTime={meta.date}>{meta.date}</time>
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{meta.title}</h1>
      <p className="mt-4 text-(--color-ink-muted)">{meta.summary}</p>

      <div className="mt-8">
        <ArticleBody />
      </div>

      {/* No related case study is linked for this article per
          page_blueprints ("none currently linked for this article"). */}
    </article>
  );
}
