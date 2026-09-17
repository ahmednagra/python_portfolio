import { Suspense } from "react";
import { InlineMarkdown } from "@/components/home/inline-markdown";
import { AudienceSwitch, AudienceSwitchLens } from "@/components/layout/audience-switch";

export type AudienceLensProps = {
  heading: string;
  bodyMarkdown: string;
};

/**
 * The audience lens strip: the "two-audiences" page-content block, plus the
 * foundation AudienceSwitch chips that carry the ?for= reordering signal
 * onto /work and /problems. Wrapped in Suspense because the lens-aware
 * variant (AudienceSwitchLens) reads useSearchParams internally; the
 * fallback is the plain, hook-free AudienceSwitch with neither chip active,
 * so there's no layout shift once the resolved lens is available.
 */
export function AudienceLens({ heading, bodyMarkdown }: AudienceLensProps) {
  return (
    <section aria-labelledby="audience-lens-heading" className="border-t border-(--color-border) pt-12">
      <h2 id="audience-lens-heading" className="text-2xl font-semibold text-(--color-ink)">
        {heading}
      </h2>
      <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
        <InlineMarkdown text={bodyMarkdown} />
      </div>
      <div className="mt-6">
        <Suspense fallback={<AudienceSwitch current={null} />}>
          <AudienceSwitchLens />
        </Suspense>
      </div>
    </section>
  );
}
