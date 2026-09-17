import { Card } from "@/components/ui/card";
import { BuildStateTag } from "@/components/ui/build-state-tag";
import { ProofRef } from "@/components/ui/proof-ref";
import { getCaseStudyRef } from "@/components/audience/case-study-refs";
import type { Problem } from "@/content/problems";

const PROOF_REFS_BY_PROBLEM: Record<string, string[]> = {
  "billing-quota-correctness": ["quota-locking-pattern", "webhook-idempotency-pattern"],
  "tenant-isolation": ["tenant-isolation-pattern"],
  "vertical-ownership": ["vertical-ownership-measurement"],
  "resilient-data-capture": ["capture-pipeline-design"],
};

export type ProblemDetailProps = {
  problem: Problem;
  /** "h1" on /problems/[key] (the page's own title); "h2" inside the /problems catalog. */
  headingLevel?: "h1" | "h2";
};

/**
 * Full symptom -> diagnosis -> approach -> proof -> linked case study block
 * for one problem. Shared by the /problems catalog (one per entry) and
 * /problems/[key] (the sole detail on the page), so the two never drift.
 */
export function ProblemDetail({ problem, headingLevel = "h2" }: ProblemDetailProps) {
  const Heading = headingLevel;
  const caseStudy = getCaseStudyRef(problem.relatedCaseStudy);
  const proofRefIds = PROOF_REFS_BY_PROBLEM[problem.key] ?? [];

  return (
    <article aria-labelledby={`${problem.key}-heading`} className="border-t border-(--color-border) pt-8 first:border-t-0 first:pt-0">
      <Heading id={`${problem.key}-heading`} className="text-2xl font-semibold text-balance">
        {problem.title}
      </Heading>

      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="mono-label text-(--color-ink-muted)">The symptom</dt>
          <dd className="mt-2 max-w-(--measure-prose) text-(--color-ink)">{problem.symptomInBuyerLanguage}</dd>
        </div>
        <div>
          <dt className="mono-label text-(--color-ink-muted)">Why it happens</dt>
          <dd className="mt-2 max-w-(--measure-prose) text-(--color-ink)">{problem.whyItHappens}</dd>
        </div>
        <div>
          <dt className="mono-label text-(--color-ink-muted)">How I approach it</dt>
          <dd className="mt-2 max-w-(--measure-prose) text-(--color-ink)">{problem.howIApproachIt}</dd>
        </div>
        <div>
          <dt className="mono-label text-(--color-ink-muted)">What you get</dt>
          <dd className="mt-2 max-w-(--measure-prose) text-(--color-ink)">{problem.whatYouGet}</dd>
        </div>
      </dl>

      <div className="mt-6 border border-(--color-border) bg-(--color-canvas-raised) p-4">
        <p className="mono-label text-(--color-ink-muted)">Proof</p>
        <p className="mt-2 max-w-(--measure-prose) text-sm text-(--color-ink)">
          {problem.proofText}
          {proofRefIds.length > 0 ? (
            <span className="ml-2 inline-flex flex-wrap gap-1 align-middle">
              {proofRefIds.map((id) => (
                <ProofRef key={id} id={id} />
              ))}
            </span>
          ) : null}
        </p>
      </div>

      {caseStudy ? (
        <div className="mt-6">
          <Card href={`/work/${caseStudy.slug}`} eyebrow={caseStudy.attributionToken}>
            <h3 className="text-lg font-semibold">{caseStudy.title}</h3>
            <p className="mt-2 text-sm text-(--color-ink-muted)">{caseStudy.oneLine}</p>
            <div className="mt-3">
              <BuildStateTag state={caseStudy.buildState} />
            </div>
          </Card>
        </div>
      ) : null}

      <p className="mono-label mt-4 text-(--color-ink-muted)">Best fit: {problem.audienceFit}</p>
    </article>
  );
}
