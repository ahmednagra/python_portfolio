/**
 * Shared shape for case-study MDX frontmatter (`export const frontmatter`
 * in each src/content/case-studies/*.mdx file) plus the module ambient
 * declaration in ./mdx-case-study.d.ts that types the dynamic
 * `@/content/case-studies/*.mdx` imports against it.
 */

export type DiagramKey =
  | "webhook-idempotency"
  | "tenant-isolation"
  | "capture-pipeline"
  | "vertical-ownership";

export type BuildState = "RUNNING" | "BUILT" | "DESIGNED";

export type PublicationStatus = "cleared" | "draft";

export interface CaseStudyFrontmatter {
  slug: string;
  title: string;
  variant: string;
  diagramKey: DiagramKey;
  tags: string[];
  attributionLine: string;
  attributionToken: string;
  buildState: BuildState;
  buildStateNote: string;
  publicationStatus: PublicationStatus;
  summary30s: string;
  oneLine: string;
  audienceFit: string;
}
