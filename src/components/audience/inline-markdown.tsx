import Link from "next/link";
import { Fragment } from "react";

type Token =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; label: string; href: string };

const INLINE_PATTERN = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  INLINE_PATTERN.lastIndex = 0;

  while ((match = INLINE_PATTERN.exec(input))) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: input.slice(lastIndex, match.index) });
    }
    if (match[1] !== undefined) {
      tokens.push({ type: "bold", value: match[1] });
    } else if (match[2] !== undefined && match[3] !== undefined) {
      tokens.push({ type: "link", label: match[2], href: match[3] });
    }
    lastIndex = INLINE_PATTERN.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push({ type: "text", value: input.slice(lastIndex) });
  }

  return tokens;
}

export type InlineMarkdownProps = {
  text: string;
  className?: string;
};

/**
 * Renders the minimal inline markdown used by src/content/pages.ts
 * (`**bold**` and `[label](href)` only) as real JSX — bold emphasis and
 * navigable Next.js links — instead of showing literal asterisks/brackets.
 * Splits on blank lines into separate paragraphs; no block-level markdown
 * (headings, lists) is expected or handled here.
 */
export function InlineMarkdown({ text, className }: InlineMarkdownProps) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean);

  return (
    <>
      {paragraphs.map((paragraph, paragraphIndex) => (
        <p key={paragraphIndex} className={className}>
          {tokenize(paragraph).map((token, tokenIndex) => {
            if (token.type === "bold") {
              return <strong key={tokenIndex}>{token.value}</strong>;
            }
            if (token.type === "link") {
              return (
                <Link
                  key={tokenIndex}
                  href={token.href}
                  className="underline decoration-(--color-border-strong) underline-offset-4 hover:text-(--color-tone-signal)"
                >
                  {token.label}
                </Link>
              );
            }
            return <Fragment key={tokenIndex}>{token.value}</Fragment>;
          })}
        </p>
      ))}
    </>
  );
}
