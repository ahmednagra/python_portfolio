"use client";

import { useMemo } from "react";
import { useAudienceLens, withFeaturedFirst } from "@/components/audience/audience-lens";
import { CaseStudyCard } from "@/components/work/case-study-card";
import type { CaseStudyFrontmatter } from "@/components/work/case-study-types";

export type CaseStudyGridProps = {
  caseStudies: CaseStudyFrontmatter[];
};

/** Pure grid rendering, reused as both the default (fallback) order and the lens-reordered result. */
export function CaseStudyGrid({ caseStudies }: CaseStudyGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {caseStudies.map((entry) => (
        <CaseStudyCard
          key={entry.slug}
          slug={entry.slug}
          title={entry.title}
          oneLine={entry.oneLine}
          attributionToken={entry.attributionToken}
          buildState={entry.buildState}
          diagramKey={entry.diagramKey}
        />
      ))}
    </div>
  );
}

export type CaseStudyCatalogProps = {
  caseStudies: CaseStudyFrontmatter[];
};

/**
 * Renders the /work case-study grid, re-sequenced by the audience-lens
 * contract (?for= query param, falling back to the AudienceSwitch
 * localStorage convenience) — matching the reordering already implemented
 * on the sibling /hire and /problems audience surfaces. A "hire" lens
 * leads with the end-to-end vertical-ownership case study (the strongest
 * signal for a hiring evaluator skimming case studies); a "fix" lens leads
 * with the billing-correctness-under-concurrency case study. No entry is
 * added, removed, or reworded — only reordered.
 *
 * Calls useAudienceLens (useSearchParams under the hood), so callers must
 * render this inside a <Suspense> boundary — fallback: <CaseStudyGrid /> in
 * the default order, matching ProblemsCatalog/HireEvidence's pattern.
 */
export function CaseStudyCatalog({ caseStudies }: CaseStudyCatalogProps) {
  const lens = useAudienceLens();

  const ordered = useMemo(() => {
    if (lens === "hire") {
      return withFeaturedFirst(caseStudies, (entry) => entry.slug === "shipping-a-vertical-end-to-end");
    }
    if (lens === "fix") {
      return withFeaturedFirst(caseStudies, (entry) => entry.slug === "billing-correctness-under-concurrency");
    }
    return caseStudies;
  }, [lens, caseStudies]);

  return (
    <div>
      {lens === "hire" ? (
        <p className="mono-label mb-4 border border-(--color-border-strong) px-3 py-2 text-(--color-ink-muted)">
          Reading as a hiring evaluator — leading with end-to-end vertical ownership.
        </p>
      ) : null}
      {lens === "fix" ? (
        <p className="mono-label mb-4 border border-(--color-border-strong) px-3 py-2 text-(--color-ink-muted)">
          Reading with a production problem in mind — leading with correctness under concurrency.
        </p>
      ) : null}
      <CaseStudyGrid caseStudies={ordered} />
    </div>
  );
}
