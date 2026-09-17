import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { problems, getProblemByKey } from "@/content/problems";
import { audiences } from "@/content/audiences";

// Read case-study slugs straight off disk rather than importing the work
// agent's temporary `_case-studies-index.ts` (explicitly marked TODO for
// deletion once real MDX frontmatter exists — depending on it here would
// break this suite the moment that cleanup lands, for a file this agent
// doesn't own).
const CASE_STUDIES_DIR = path.resolve(process.cwd(), "src/content/case-studies");
const caseStudySlugs = new Set(
  fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
);

describe("problems content shape", () => {
  it("every problem links to a case study that actually exists on disk", () => {
    for (const problem of problems) {
      expect(caseStudySlugs.has(problem.relatedCaseStudy)).toBe(true);
    }
  });

  it("every problem has non-empty symptom, diagnosis, approach, outcome and proof text", () => {
    for (const problem of problems) {
      expect(problem.symptomInBuyerLanguage.trim().length).toBeGreaterThan(0);
      expect(problem.whyItHappens.trim().length).toBeGreaterThan(0);
      expect(problem.howIApproachIt.trim().length).toBeGreaterThan(0);
      expect(problem.whatYouGet.trim().length).toBeGreaterThan(0);
      expect(problem.proofText.trim().length).toBeGreaterThan(0);
    }
  });

  it("getProblemByKey resolves a known key and returns undefined for an unknown one", () => {
    expect(getProblemByKey("billing-quota-correctness")).toBeDefined();
    expect(getProblemByKey("not-a-real-problem")).toBeUndefined();
  });

  it("has no duplicate problem keys", () => {
    const keys = problems.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe("audiences content shape", () => {
  it("defines exactly the two audiences the mission targets", () => {
    const keys = audiences.map((a) => a.key).sort();
    expect(keys).toEqual(["companies-hiring", "teams-with-production-issues"]);
  });

  it("gives every audience at least one proof point", () => {
    for (const audience of audiences) {
      expect(audience.proofPoints.length).toBeGreaterThan(0);
    }
  });
});
