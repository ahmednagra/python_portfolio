import { ProblemCard } from "@/components/audience/problem-card";
import { Button } from "@/components/ui/button";
import type { Problem } from "@/content/problems";

export type ProblemCatalogPreviewProps = {
  problems: Problem[];
};

/**
 * Three-card preview of the problem catalog (CONTENT.problems[0..2]).
 * The full catalog, all four entries plus engagement models, lives at
 * /problems (audience-owned) — this block only teases it.
 */
export function ProblemCatalogPreview({ problems }: ProblemCatalogPreviewProps) {
  return (
    <section aria-labelledby="problems-preview-heading" className="border-t border-(--color-border) pt-12">
      <h2 id="problems-preview-heading" className="text-2xl font-semibold text-(--color-ink)">
        Problems I fix
      </h2>
      <p className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
        Each entry maps to something already built and evidenced, not a generic services list.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {problems.map((problem) => (
          <ProblemCard
            key={problem.key}
            problemKey={problem.key}
            title={problem.title}
            symptom={problem.symptomInBuyerLanguage}
            relatedCaseStudy={problem.relatedCaseStudy}
          />
        ))}
      </div>
      <div className="mt-6">
        <Button href="/problems" variant="ghost">
          See the full problem catalog
        </Button>
      </div>
    </section>
  );
}
