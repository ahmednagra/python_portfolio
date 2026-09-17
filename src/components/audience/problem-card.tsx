import { Card } from "@/components/ui/card";
import { getCaseStudyRef } from "@/components/audience/case-study-refs";

export type ProblemCardProps = {
  problemKey: string;
  title: string;
  symptom: string;
  relatedCaseStudy: string;
};

/**
 * Problem-catalog card: links to /problems/[key] (the full symptom ->
 * diagnosis -> approach -> proof detail) and names its backing case study
 * as plain text, never a second link, so the card keeps a single wrapping
 * link target (WCAG 2.5.8) — the case study itself is reachable from the
 * detail page via ProblemDetail's own Card.
 */
export function ProblemCard({ problemKey, title, symptom, relatedCaseStudy }: ProblemCardProps) {
  const caseStudy = getCaseStudyRef(relatedCaseStudy);

  return (
    <Card href={`/problems/${problemKey}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-(--color-ink-muted)">{symptom}</p>
      {caseStudy ? (
        <p className="mono-label mt-3 text-(--color-ink-muted)">Case study: {caseStudy.title}</p>
      ) : null}
    </Card>
  );
}
