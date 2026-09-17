import * as React from "react";
import Link from "next/link";

/**
 * Minimal inline-markdown renderer for `PageSection.bodyMarkdown` (see
 * src/content/pages.ts): supports **bold** and [label](href) only, exactly
 * the subset the foundation content notes describe. No block-level syntax
 * (headings, lists) is parsed — those are already modeled via `items`.
 */
export function InlineMarkdown({ text }: { text: string }): React.ReactElement {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className={paragraphIndex > 0 ? "mt-3" : undefined}>
          {renderInline(paragraph)}
        </p>
      ))}
    </>
  );
}

function renderInline(segment: string): React.ReactNode[] {
  const tokenPattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tokenPattern.exec(segment)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(segment.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-(--color-ink)">
          {match[2]}
        </strong>
      );
    } else if (match[4] !== undefined && match[5] !== undefined) {
      const href = match[5];
      nodes.push(
        <Link
          key={key++}
          href={href}
          className="text-(--color-ink) underline underline-offset-2 hover:text-(--color-tone-signal)"
        >
          {match[4]}
        </Link>
      );
    }

    lastIndex = tokenPattern.lastIndex;
  }

  if (lastIndex < segment.length) {
    nodes.push(segment.slice(lastIndex));
  }

  return nodes;
}
