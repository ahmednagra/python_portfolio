import * as billingCorrectness from "@/content/case-studies/billing-correctness-under-concurrency.mdx";
import * as tenantIsolation from "@/content/case-studies/tenant-isolation-by-default.mdx";
import * as hostileTarget from "@/content/case-studies/designing-for-a-hostile-target.mdx";
import * as verticalOwnership from "@/content/case-studies/shipping-a-vertical-end-to-end.mdx";
import type { CaseStudyFrontmatter } from "./case-study-types";

/**
 * Registry of case-study frontmatter, read directly from each MDX module's
 * `export const frontmatter` rather than duplicated by hand. Ordered per
 * the design system's ranking (matches CONTENT.pages["/work"] and the
 * home page's flagship selection). Replaces the foundation's temporary
 * `src/app/work/_case-studies-index.ts` now that real MDX frontmatter
 * exists — that file has been removed.
 */
const modules: { frontmatter: CaseStudyFrontmatter }[] = [
  billingCorrectness,
  tenantIsolation,
  hostileTarget,
  verticalOwnership,
];

export const allCaseStudies: CaseStudyFrontmatter[] = modules.map((m) => m.frontmatter);

/** Case studies cleared for public listing on /work and elsewhere. */
export function getClearedCaseStudies(): CaseStudyFrontmatter[] {
  return allCaseStudies.filter((entry) => entry.publicationStatus === "cleared");
}

export function getCaseStudyBySlug(slug: string): CaseStudyFrontmatter | undefined {
  return allCaseStudies.find((entry) => entry.slug === slug);
}

/** Previous/next entry within the cleared, ranked list — for reading-spine navigation. */
export function getAdjacentCaseStudies(slug: string): {
  previous: CaseStudyFrontmatter | null;
  next: CaseStudyFrontmatter | null;
} {
  const cleared = getClearedCaseStudies();
  const index = cleared.findIndex((entry) => entry.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: index > 0 ? cleared[index - 1]! : null,
    next: index < cleared.length - 1 ? cleared[index + 1]! : null,
  };
}
