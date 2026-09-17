"use client";

import type { ReactNode } from "react";

export type DiagramShellProps = {
  name: string;
  currentStepLabel: string;
  textAlternative: string;
  steps: string[];
  children: ReactNode;
  controls: ReactNode;
};

/**
 * Shared outer frame for all four diagram islands: a labeled figure, an
 * aria-live region announcing the current step for screen-reader and
 * switch-access users (the visual motion itself is not perceivable to
 * them), and a text-alternative <details> that stays in the DOM at all
 * times — never display:none — matching the diagram's story exactly.
 */
export function DiagramShell({
  name,
  currentStepLabel,
  textAlternative,
  steps,
  children,
  controls,
}: DiagramShellProps) {
  return (
    <figure className="border border-(--color-border) bg-(--color-canvas-raised) p-6">
      <figcaption className="mb-4 flex items-center justify-between gap-4">
        <p className="mono-label text-(--color-ink-muted)">{name} — interactive diagram</p>
      </figcaption>

      <div className="min-h-[220px]">{children}</div>

      <p aria-live="polite" className="sr-only">
        {currentStepLabel}
      </p>

      <div className="mt-4">{controls}</div>

      <details className="mt-6 border-t border-(--color-border) pt-4">
        <summary className="mono-label cursor-pointer text-(--color-ink-muted)">Text alternative</summary>
        <p className="mt-2 text-sm">{textAlternative}</p>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-(--color-ink-muted)">
          {steps.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ol>
      </details>
    </figure>
  );
}
