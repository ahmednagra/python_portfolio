import { Card } from "@/components/ui/card";

export type WritingTeaserItem = {
  slug: string;
  title: string;
  date: string;
  summary: string;
};

export type WritingTeaserProps = {
  article: WritingTeaserItem;
};

/**
 * Single-item writing preview, styled like the case-study cards per the
 * page_blueprint ("CaseStudyCard-style list, 1 item") without importing a
 * work/-owned component — it reuses the shared Card primitive directly.
 */
export function WritingTeaser({ article }: WritingTeaserProps) {
  return (
    <section aria-labelledby="writing-teaser-heading" className="border-t border-(--color-border) pt-12">
      <h2 id="writing-teaser-heading" className="text-2xl font-semibold text-(--color-ink)">
        Writing
      </h2>
      <div className="mt-6">
        <Card href={`/writing/${article.slug}`} eyebrow={article.date}>
          <h3 className="text-lg font-semibold text-(--color-ink)">{article.title}</h3>
          <p className="mt-2 text-sm text-(--color-ink-muted)">{article.summary}</p>
        </Card>
      </div>
    </section>
  );
}
