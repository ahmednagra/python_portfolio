import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const CASE_STUDIES_DIR = path.resolve(process.cwd(), "src/content/case-studies");

// The four case studies gate-cleared for this build (see the mission's
// binding note: all four are treated as gate-cleared because they were
// supplied directly in the gated CONTENT payload — no agent re-runs
// clearance against them).
const EXPECTED_SLUGS = [
  "billing-correctness-under-concurrency",
  "tenant-isolation-by-default",
  "designing-for-a-hostile-target",
  "shipping-a-vertical-end-to-end",
];

const VALID_ATTRIBUTION_TOKENS = new Set(["Sole author", "Contributor"]);
const VALID_BUILD_STATES = new Set(["RUNNING", "BUILT", "DESIGNED"]);
const VALID_DIAGRAM_KEYS = new Set([
  "webhook-idempotency",
  "tenant-isolation",
  "capture-pipeline",
  "vertical-ownership",
]);

interface CaseStudyFrontmatter {
  slug: string;
  title: string;
  variant: string;
  diagramKey: string;
  tags: string[];
  attributionLine: string;
  attributionToken: string;
  buildState: string;
  buildStateNote: string;
  publicationStatus: string;
  summary30s: string;
  oneLine: string;
  audienceFit: string;
}

function readSource(slug: string): string {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * MDX frontmatter here is a plain `export const frontmatter = {...}` object
 * (this project has no YAML-frontmatter plugin, and vitest.config.ts has no
 * MDX transform — both are foundation-owned). Extracting the object literal
 * textually and evaluating it as JS is the only way to assert on its shape
 * without owning either of those config files; the source is first-party
 * repository content, not user input.
 */
function readFrontmatter(slug: string): CaseStudyFrontmatter {
  const source = readSource(slug);
  const match = source.match(/export const frontmatter = (\{[\s\S]*?\n\});/);
  if (!match) {
    throw new Error(`No "export const frontmatter = {...}" block found in ${slug}.mdx`);
  }
  return eval(`(${match[1]})`) as CaseStudyFrontmatter;
}

describe("case-study content integrity", () => {
  it("has exactly the four gate-cleared case studies, no more, no fewer", () => {
    const files = fs
      .readdirSync(CASE_STUDIES_DIR)
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""))
      .sort();
    expect(files).toEqual([...EXPECTED_SLUGS].sort());
  });

  it.each(EXPECTED_SLUGS)("%s: frontmatter carries every required field", (slug) => {
    const fm = readFrontmatter(slug);
    expect(fm.slug).toBe(slug);
    expect(fm.title.length).toBeGreaterThan(0);
    expect(fm.variant.length).toBeGreaterThan(0);
    expect(Array.isArray(fm.tags)).toBe(true);
    expect(fm.tags.length).toBeGreaterThan(0);
    expect(fm.summary30s.length).toBeGreaterThan(0);
    expect(fm.oneLine.length).toBeGreaterThan(0);
    expect(fm.audienceFit.length).toBeGreaterThan(0);
  });

  it.each(EXPECTED_SLUGS)("%s: carries a non-empty attribution line and token", (slug) => {
    const fm = readFrontmatter(slug);
    expect(fm.attributionLine.trim().length).toBeGreaterThan(0);
    expect(VALID_ATTRIBUTION_TOKENS.has(fm.attributionToken)).toBe(true);
  });

  it.each(EXPECTED_SLUGS)("%s: carries a build state and a matching, non-empty build-state note", (slug) => {
    const fm = readFrontmatter(slug);
    expect(VALID_BUILD_STATES.has(fm.buildState)).toBe(true);
    expect(fm.buildStateNote.trim().length).toBeGreaterThan(0);
  });

  it.each(EXPECTED_SLUGS)("%s: is publicationStatus 'cleared'", (slug) => {
    expect(readFrontmatter(slug).publicationStatus).toBe("cleared");
  });

  it.each(EXPECTED_SLUGS)("%s: diagramKey resolves to one of the four built diagram islands", (slug) => {
    const fm = readFrontmatter(slug);
    expect(VALID_DIAGRAM_KEYS.has(fm.diagramKey)).toBe(true);
  });

  it("attributes the two sole-authored, solo services correctly, never claiming sole authorship of the team platform", () => {
    // Per PROOF.md attribution rules: the billing and vertical-ownership
    // case studies sit on a team-built platform (CONTRIBUTOR), while the
    // tenant-isolation and capture-pipeline services are solely authored.
    expect(readFrontmatter("billing-correctness-under-concurrency").attributionToken).toBe(
      "Contributor"
    );
    expect(readFrontmatter("shipping-a-vertical-end-to-end").attributionToken).toBe("Contributor");
    expect(readFrontmatter("tenant-isolation-by-default").attributionToken).toBe("Sole author");
    expect(readFrontmatter("designing-for-a-hostile-target").attributionToken).toBe("Sole author");
  });

  it("never describes the tenant-isolation service's build state as fully running", () => {
    // Binding caveat: architecturally complete but functionally partial —
    // must never be rounded up to a bare "RUNNING" success story.
    const fm = readFrontmatter("tenant-isolation-by-default");
    expect(fm.buildStateNote.toLowerCase()).toContain("functionally partial");
  });

  it("never describes the capture-pipeline service as more than a prototype", () => {
    const fm = readFrontmatter("designing-for-a-hostile-target");
    expect(fm.buildState).toBe("DESIGNED");
  });
});
