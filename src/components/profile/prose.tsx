import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Token =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

const INLINE_TOKEN_RE = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  INLINE_TOKEN_RE.lastIndex = 0;
  while ((match = INLINE_TOKEN_RE.exec(input))) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: input.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      tokens.push({ type: "bold", value: match[1] });
    } else if (match[2] !== undefined && match[3] !== undefined) {
      tokens.push({ type: "link", label: match[2], href: match[3] });
    }
    lastIndex = INLINE_TOKEN_RE.lastIndex;
  }
  if (lastIndex < input.length) {
    tokens.push({ type: "text", value: input.slice(lastIndex) });
  }
  return tokens;
}

function renderInline(input: string, keyPrefix: string): React.ReactNode[] {
  return tokenize(input).map((token, index) => {
    const key = `${keyPrefix}-${index}`;
    if (token.type === "bold") {
      return <strong key={key}>{token.value}</strong>;
    }
    if (token.type === "link") {
      const isExternal = token.href.startsWith("http");
      return (
        <Link
          key={key}
          href={token.href}
          className="underline decoration-(--color-border-strong) underline-offset-2 hover:decoration-(--color-ink)"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {token.label}
        </Link>
      );
    }
    return <React.Fragment key={key}>{token.value}</React.Fragment>;
  });
}

export type ProseProps = {
  markdown: string;
  className?: string;
};

/**
 * Minimal inline-markdown renderer for the `bodyMarkdown` fields on
 * `src/content/pages.ts` (see the comment on `PageSection` there: bold and
 * links only, no block-level syntax). Splits on blank lines into
 * paragraphs and renders `**bold**` / `[text](href)` as real elements —
 * no `dangerouslySetInnerHTML`.
 */
export function Prose({ markdown, className }: ProseProps) {
  const paragraphs = markdown.split(/\n\n+/).filter((paragraph) => paragraph.trim().length > 0);

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={cn("mt-4 first:mt-0", className)}>
          {renderInline(paragraph, `p${index}`)}
        </p>
      ))}
    </>
  );
}
