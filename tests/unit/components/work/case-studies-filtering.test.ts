import { describe, expect, it, vi, beforeEach } from "vitest";
import type { CaseStudyFrontmatter } from "@/components/work/case-study-types";

// `@/components/work/case-studies` imports each case-study .mdx file
// directly for its `frontmatter` export. Vitest's config (foundation-owned;
// this agent doesn't touch vitest.config.ts) has no MDX transform, so the
// four MDX modules are mocked here with fixture frontmatter instead of
// relying on an MDX loader — this isolates the filtering/lookup logic
// itself, which is what this suite is actually responsible for.
function fixture(overrides: Partial<CaseStudyFrontmatter>): { frontmatter: CaseStudyFrontmatter } {
  return {
    frontmatter: {
      slug: "example",
      title: "Example",
      variant: "architecture",
      diagramKey: "webhook-idempotency",
      tags: ["example"],
      attributionLine: "Sole author.",
      attributionToken: "Sole author",
      buildState: "BUILT",
      buildStateNote: "Built and real.",
      publicationStatus: "cleared",
      summary30s: "Summary.",
      oneLine: "One line.",
      audienceFit: "Everyone.",
      ...overrides,
    },
  };
}

vi.mock("@/content/case-studies/billing-correctness-under-concurrency.mdx", () =>
  fixture({ slug: "billing-correctness-under-concurrency", publicationStatus: "cleared" })
);
vi.mock("@/content/case-studies/tenant-isolation-by-default.mdx", () =>
  fixture({ slug: "tenant-isolation-by-default", publicationStatus: "cleared" })
);
// Deliberately NOT cleared, to prove the filter actually excludes something.
vi.mock("@/content/case-studies/designing-for-a-hostile-target.mdx", () =>
  fixture({ slug: "designing-for-a-hostile-target", publicationStatus: "draft" })
);
vi.mock("@/content/case-studies/shipping-a-vertical-end-to-end.mdx", () =>
  fixture({ slug: "shipping-a-vertical-end-to-end", publicationStatus: "cleared" })
);

describe("case-study registry filtering by publicationStatus", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("getClearedCaseStudies returns only publicationStatus === 'cleared' entries", async () => {
    const { getClearedCaseStudies } = await import("@/components/work/case-studies");
    const cleared = getClearedCaseStudies();
    const slugs = cleared.map((c) => c.slug).sort();

    expect(slugs).toEqual(
      [
        "billing-correctness-under-concurrency",
        "tenant-isolation-by-default",
        "shipping-a-vertical-end-to-end",
      ].sort()
    );
    expect(slugs).not.toContain("designing-for-a-hostile-target");
    expect(cleared.every((c) => c.publicationStatus === "cleared")).toBe(true);
  });

  it("getCaseStudyBySlug resolves both cleared and draft entries (lookup isn't gated)", async () => {
    const { getCaseStudyBySlug } = await import("@/components/work/case-studies");
    expect(getCaseStudyBySlug("designing-for-a-hostile-target")?.publicationStatus).toBe("draft");
    expect(getCaseStudyBySlug("billing-correctness-under-concurrency")?.publicationStatus).toBe(
      "cleared"
    );
    expect(getCaseStudyBySlug("not-a-real-slug")).toBeUndefined();
  });

  it("getAdjacentCaseStudies walks only the cleared, ranked list, never a draft neighbor", async () => {
    const { getAdjacentCaseStudies } = await import("@/components/work/case-studies");
    // Ranked order per the module: billing, tenant-isolation, (hostile
    // target is filtered out as draft), vertical-ownership — so
    // tenant-isolation's "next" must skip straight to vertical-ownership.
    const { previous, next } = getAdjacentCaseStudies("tenant-isolation-by-default");
    expect(previous?.slug).toBe("billing-correctness-under-concurrency");
    expect(next?.slug).toBe("shipping-a-vertical-end-to-end");
  });

  it("getAdjacentCaseStudies returns nulls for a slug outside the cleared list", async () => {
    const { getAdjacentCaseStudies } = await import("@/components/work/case-studies");
    const { previous, next } = getAdjacentCaseStudies("designing-for-a-hostile-target");
    expect(previous).toBeNull();
    expect(next).toBeNull();
  });

  it("returns null at both ends of the cleared list rather than wrapping around", async () => {
    const { getAdjacentCaseStudies } = await import("@/components/work/case-studies");
    expect(getAdjacentCaseStudies("billing-correctness-under-concurrency").previous).toBeNull();
    expect(getAdjacentCaseStudies("shipping-a-vertical-end-to-end").next).toBeNull();
  });
});
