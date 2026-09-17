"use client";

import { useMemo } from "react";
import { useAudienceLens, withFeaturedFirst } from "@/components/audience/audience-lens";
import { ProblemDetail } from "@/components/audience/problem-detail";
import type { Problem } from "@/content/problems";

export type ProblemsListProps = {
  problems: Problem[];
};

/** Pure row rendering, reused as both the default (fallback) order and the lens-reordered result. */
export function ProblemsList({ problems }: ProblemsListProps) {
  return (
    <div className="space-y-8">
      {problems.map((problem) => (
        <ProblemDetail key={problem.key} problem={problem} headingLevel="h2" />
      ))}
    </div>
  );
}

export type ProblemsCatalogProps = {
  problems: Problem[];
};

/**
 * Renders the full problem catalog, re-sequenced by the audience-lens
 * contract (?for= query param, falling back to the AudienceSwitch
 * localStorage convenience): a "hire" lens surfaces vertical-ownership
 * first (the strongest signal for a hiring evaluator skimming this page
 * out of curiosity), leaving every other entry in place. No content is
 * duplicated or forked — only the existing four entries are re-ordered.
 */
export function ProblemsCatalog({ problems }: ProblemsCatalogProps) {
  const lens = useAudienceLens();

  const ordered = useMemo(() => {
    if (lens === "hire") {
      return withFeaturedFirst(problems, (problem) => problem.key === "vertical-ownership");
    }
    return problems;
  }, [lens, problems]);

  return (
    <div>
      {lens === "hire" ? (
        <p className="mono-label mb-6 border border-(--color-border-strong) px-3 py-2 text-(--color-ink-muted)">
          Reading as a hiring evaluator — leading with vertical ownership.
        </p>
      ) : null}
      <ProblemsList problems={ordered} />
    </div>
  );
}
