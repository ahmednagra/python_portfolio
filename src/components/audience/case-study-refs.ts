/**
 * Minimal display data for linking a case study from /hire and /problems
 * without depending on the `work` agent's in-progress MDX frontmatter.
 * Title, attribution and build state are reproduced exactly as given in
 * the gated case_studies content (attribution_line / build_state_note),
 * never softened or extended.
 */

export type CaseStudyKey =
  | "billing-correctness-under-concurrency"
  | "tenant-isolation-by-default"
  | "designing-for-a-hostile-target"
  | "shipping-a-vertical-end-to-end";

export interface CaseStudyRef {
  slug: CaseStudyKey;
  title: string;
  oneLine: string;
  attributionToken: string;
  buildState: "RUNNING" | "BUILT" | "DESIGNED";
  diagramKey: string;
}

export const caseStudyRefs: Record<CaseStudyKey, CaseStudyRef> = {
  "billing-correctness-under-concurrency": {
    slug: "billing-correctness-under-concurrency",
    title: "Getting Billing Right When Everything Arrives Twice",
    oneLine:
      "Quota consumption under real concurrency, and payment webhooks that redeliver by design.",
    attributionToken: "Contributor",
    buildState: "RUNNING",
    diagramKey: "webhook-idempotency",
  },
  "tenant-isolation-by-default": {
    slug: "tenant-isolation-by-default",
    title: "Tenant Isolation You Cannot Forget to Apply",
    oneLine:
      "Moving multi-tenant isolation into the database rather than trusting application-code discipline.",
    attributionToken: "Sole author",
    buildState: "BUILT",
    diagramKey: "tenant-isolation",
  },
  "designing-for-a-hostile-target": {
    slug: "designing-for-a-hostile-target",
    title: "Designing a Capture System for a Platform That Is Actively Trying to Stop You",
    oneLine:
      "A resilient extraction architecture for a hostile, fast-changing target — stated plainly as a prototype.",
    attributionToken: "Sole author",
    buildState: "DESIGNED",
    diagramKey: "capture-pipeline",
  },
  "shipping-a-vertical-end-to-end": {
    slug: "shipping-a-vertical-end-to-end",
    title: "Shipping a Product Vertical End to End",
    oneLine:
      "A measured account of owning a feature across the database, the API, and the interface.",
    attributionToken: "Contributor",
    buildState: "RUNNING",
    diagramKey: "vertical-ownership",
  },
};

export function getCaseStudyRef(slug: string): CaseStudyRef | undefined {
  return caseStudyRefs[slug as CaseStudyKey];
}
