import { SpecRow } from "@/components/ui/spec-row";

export type DecisionRecordBlockProps = {
  considered: string;
  chosen: string;
  why: string;
};

/** Bordered aside for case-study decision entries, used inside MDX. */
export function DecisionRecordBlock({ considered, chosen, why }: DecisionRecordBlockProps) {
  return (
    <aside className="not-prose border border-(--color-border) bg-(--color-canvas-raised) p-4">
      <SpecRow label="Considered" value={considered} />
      <SpecRow label="Chosen" value={chosen} />
      <p className="mt-2 text-sm text-(--color-ink-muted)">{why}</p>
    </aside>
  );
}
