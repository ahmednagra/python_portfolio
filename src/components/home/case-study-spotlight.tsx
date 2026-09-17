import { CaseStudyCard, type CaseStudyCardProps } from "@/components/work/case-study-card";
import { Button } from "@/components/ui/button";
import { InlineMarkdown } from "@/components/home/inline-markdown";

export type CaseStudySpotlightProps = {
  heading: string;
  bodyMarkdown: string;
};

/**
 * Flagship three of the four case studies, ranked per the design system:
 * billing correctness, tenant isolation, then vertical ownership. The
 * fourth (resilient data capture) is reachable from /work and from its own
 * problem entry — this block is a spotlight, not the full index.
 */
const FLAGSHIP_CASE_STUDIES: CaseStudyCardProps[] = [
  {
    slug: "billing-correctness-under-concurrency",
    title: "Getting Billing Right When Everything Arrives Twice",
    oneLine:
      "Quota consumption under real concurrency, and payment webhooks that redeliver by design — dominant author of the webhook handler.",
    attributionToken: "Contributor",
    buildState: "RUNNING",
    diagramKey: "webhook-idempotency",
  },
  {
    slug: "tenant-isolation-by-default",
    title: "Tenant Isolation You Cannot Forget to Apply",
    oneLine:
      "Moving multi-tenant isolation into the database rather than trusting application-code discipline.",
    attributionToken: "Sole author",
    buildState: "BUILT",
    diagramKey: "tenant-isolation",
  },
  {
    slug: "shipping-a-vertical-end-to-end",
    title: "Shipping a Product Vertical End to End",
    oneLine:
      "A measured account of owning a feature across the database, the API, and the interface — not split across a hand-off.",
    attributionToken: "Contributor",
    buildState: "RUNNING",
    diagramKey: "vertical-ownership",
  },
];

export function CaseStudySpotlight({ heading, bodyMarkdown }: CaseStudySpotlightProps) {
  return (
    <section aria-labelledby="case-studies-heading" className="border-t border-(--color-border) pt-12">
      <h2 id="case-studies-heading" className="text-2xl font-semibold text-(--color-ink)">
        {heading}
      </h2>
      <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
        <InlineMarkdown text={bodyMarkdown} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {FLAGSHIP_CASE_STUDIES.map((caseStudy) => (
          <CaseStudyCard key={caseStudy.slug} {...caseStudy} />
        ))}
      </div>
      <div className="mt-6">
        <Button href="/work" variant="ghost">
          Read all four case studies
        </Button>
      </div>
    </section>
  );
}
