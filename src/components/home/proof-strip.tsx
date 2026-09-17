import { SpecRow } from "@/components/ui/spec-row";
import { Button } from "@/components/ui/button";

export type ProofStripRow = {
  label: string;
  value: string;
};

export type ProofStripProps = {
  heading: string;
  rows: ProofStripRow[];
};

/**
 * "Measured, not self-described" — the home teaser of the proof index,
 * rendered as leader-dotted SpecRow facts rather than badges or a skill
 * bar. Full classification (verified / walkable / self-reported / not
 * claimed) lives at /proof.
 */
export function ProofStrip({ heading, rows }: ProofStripProps) {
  return (
    <section aria-labelledby="proof-strip-heading" className="border-t border-(--color-border) pt-12">
      <h2 id="proof-strip-heading" className="text-2xl font-semibold text-(--color-ink)">
        {heading}
      </h2>
      <div className="mt-6 max-w-(--measure-prose) divide-y divide-(--color-border)">
        {rows.map((row) => (
          <SpecRow key={row.label} label={row.label} value={row.value} />
        ))}
      </div>
      <div className="mt-6">
        <Button href="/proof" variant="ghost">
          Read the full proof index
        </Button>
      </div>
    </section>
  );
}
