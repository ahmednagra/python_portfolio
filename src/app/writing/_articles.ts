/**
 * Registry of cleared article slugs — the only place a new article needs to
 * be added once its MDX file exists under src/content/articles/. Metadata
 * is read from each file's own `meta` export (see the MDX "Frontmatter"
 * pattern in the Next.js MDX guide) rather than hand-duplicated here.
 */
export const ARTICLE_SLUGS = ["what-a-play-console-release-actually-checks"] as const;

export type ArticleSlug = (typeof ARTICLE_SLUGS)[number];

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export async function getArticleMeta(slug: ArticleSlug): Promise<ArticleMeta> {
  const mod = (await import(`@/content/articles/${slug}.mdx`)) as { meta: ArticleMeta };
  return mod.meta;
}

export function isArticleSlug(value: string): value is ArticleSlug {
  return (ARTICLE_SLUGS as readonly string[]).includes(value);
}
