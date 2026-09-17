export type SkipLinkProps = Record<string, never>;

/**
 * Visually-hidden-until-focused skip-to-content link. Must be the first
 * focusable element in the DOM (rendered first inside <body> by layout.tsx).
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:border focus:border-(--color-border-strong) focus:bg-(--color-canvas-raised) focus:px-4 focus:py-2 focus:text-(--color-ink)"
    >
      Skip to content
    </a>
  );
}
