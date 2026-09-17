import * as React from "react";

export type SpecRowProps = {
  label: string;
  value: React.ReactNode;
};

/** Leader-dotted mono key/value fact row — replaces badges/skill bars. */
export function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="mono-label flex items-baseline gap-2 py-1.5 text-(--color-ink)">
      <span className="shrink-0 text-(--color-ink-muted)">{label}</span>
      <span
        aria-hidden="true"
        className="h-px w-full flex-1 self-center bg-[repeating-linear-gradient(to_right,var(--color-border)_0,var(--color-border)_2px,transparent_2px,transparent_6px)]"
      />
      <span className="shrink-0 text-right">{value}</span>
    </div>
  );
}
