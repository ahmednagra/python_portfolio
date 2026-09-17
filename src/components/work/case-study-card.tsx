import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { BuildStateTag } from "@/components/ui/build-state-tag";

export type CaseStudyCardProps = {
  slug: string;
  title: string;
  oneLine: string;
  attributionToken: string;
  buildState: "RUNNING" | "BUILT" | "DESIGNED";
  diagramKey: string;
};

/**
 * Static, non-interactive SVG glyphs abstracted from each diagram's shape —
 * decorative only (the card's real content is the text), so each is
 * `aria-hidden` and uses `currentColor` to follow the card's ink token in
 * both themes. These are intentionally schematic, not previews of the
 * interactive DiagramExplainer islands the diagrams agent owns.
 */
const glyphByDiagramKey: Record<string, ReactNode> = {
  "webhook-idempotency": (
    <>
      <circle cx="7" cy="9" r="3" />
      <circle cx="7" cy="23" r="3" />
      <path d="M10 9h9a5 5 0 0 1 5 5v0a5 5 0 0 1-5 5h-4" strokeDasharray="0" />
      <path d="M10 23h6" strokeDasharray="2 3" />
      <path d="M17 16l3-3-3-3" fill="none" />
    </>
  ),
  "tenant-isolation": (
    <>
      <rect x="4" y="6" width="9" height="8" rx="1" />
      <rect x="4" y="18" width="9" height="8" rx="1" />
      <path d="M17 10h11M17 22h7M24 22l4-4" />
    </>
  ),
  "capture-pipeline": (
    <>
      <rect x="3" y="13" width="6" height="6" rx="1" />
      <rect x="13" y="13" width="6" height="6" rx="1" />
      <rect x="23" y="8" width="6" height="6" rx="1" />
      <rect x="23" y="18" width="6" height="6" rx="1" />
      <path d="M9 16h4M19 16l4-5M19 16l4 5" />
    </>
  ),
  "vertical-ownership": (
    <>
      <path d="M6 4h20M6 9h20M6 14h20M6 19h20M6 24h20" strokeDasharray="0" />
      <circle cx="6" cy="4" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="9" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="14" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="19" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6" cy="24" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
};

function CaseStudyGlyph({ diagramKey }: { diagramKey: string }) {
  const paths = glyphByDiagramKey[diagramKey];

  if (!paths) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      aria-hidden="true"
      className="shrink-0 text-(--color-ink-muted)"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths}
    </svg>
  );
}

/**
 * Case-study index/preview card: single wrapping link (WCAG 2.5.8) over a
 * flat bordered `Card`, with the build-state tag always adjacent to the
 * title and a static SVG glyph abstracted from the case study's diagram.
 */
export function CaseStudyCard({ slug, title, oneLine, attributionToken, buildState, diagramKey }: CaseStudyCardProps) {
  return (
    <Card href={`/work/${slug}`} eyebrow={attributionToken}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <CaseStudyGlyph diagramKey={diagramKey} />
      </div>
      <p className="mt-2 text-sm text-(--color-ink-muted)">{oneLine}</p>
      <div className="mt-3">
        <BuildStateTag state={buildState} />
      </div>
    </Card>
  );
}
