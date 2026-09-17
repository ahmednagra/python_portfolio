import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/content/pages";
import { ARTICLE_SLUGS, getArticleMeta } from "./_articles";

const page = getPageContent("/writing");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/writing" },
};

/**
 * Index of cleared long-form posts, dated, permanent URLs. Metadata comes
 * from each MDX file's own `meta` export (src/content/articles/*.mdx) —
 * this route reads that export directly rather than a hand-maintained
 * index, so a new article only needs its slug added to ARTICLE_SLUGS in
 * ./_articles.ts.
 */
export default async function WritingIndexPage() {
  const intro = page?.sections.find((section) => section.id === "intro");
  const articles = (await Promise.all(ARTICLE_SLUGS.map((slug) => getArticleMeta(slug)))).sort(
    (a, b) => (a.date < b.date ? 1 : -1)
  );

  return (
    <div className="mx-auto max-w-(--container-max) space-y-10 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold sm:text-4xl">{intro?.heading}</h1>
        <p className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">{intro?.bodyMarkdown}</p>
      </div>

      <ul className="space-y-6">
        {articles.map((article) => (
          <li key={article.slug} className="border border-(--color-border) p-5">
            <time dateTime={article.date} className="mono-label text-(--color-ink-muted)">
              {article.date}
            </time>
            <h2 className="mt-1 text-lg font-semibold">
              <Link href={`/writing/${article.slug}`}>{article.title}</Link>
            </h2>
            <p className="mt-2 text-sm text-(--color-ink-muted)">{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
