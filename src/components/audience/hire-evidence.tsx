"use client";

import { useMemo } from "react";
import { useAudienceLens, withFeaturedFirst } from "@/components/audience/audience-lens";

export type EvidenceListProps = {
  items: string[];
};

/** Pure row rendering, reused as both the default (fallback) order and the lens-reordered result. */
export function EvidenceList({ items }: EvidenceListProps) {
  return (
    <ol className="space-y-4">
      {items.map((item, index) => (
        <li key={item} className="flex gap-4 border-t border-(--color-border) pt-4 first:border-t-0 first:pt-0">
          <span className="mono-label shrink-0 text-(--color-ink-muted)">{String(index + 1).padStart(2, "0")}</span>
          <p className="max-w-(--measure-prose) text-(--color-ink)">{item}</p>
        </li>
      ))}
    </ol>
  );
}

export type HireEvidenceProps = {
  items: string[];
};

/**
 * Renders the "what the evidence supports" list, re-sequenced by the
 * audience-lens contract: a "fix" lens (a founder/team-with-a-problem
 * reader who followed a cross-link into /hire) surfaces the concurrency-
 * correctness specialisation first, since that is what they came in
 * caring about. No item is added, removed, or reworded — only reordered.
 */
export function HireEvidence({ items }: HireEvidenceProps) {
  const lens = useAudienceLens();

  const ordered = useMemo(() => {
    if (lens === "fix") {
      return withFeaturedFirst(items, (item) => item.toLowerCase().includes("correctness under concurrency"));
    }
    return items;
  }, [lens, items]);

  return (
    <div>
      {lens === "fix" ? (
        <p className="mono-label mb-4 border border-(--color-border-strong) px-3 py-2 text-(--color-ink-muted)">
          Reading with a production problem in mind — leading with correctness under concurrency.
        </p>
      ) : null}
      <EvidenceList items={ordered} />
    </div>
  );
}
