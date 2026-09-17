"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAudienceLens } from "@/components/audience/audience-lens";

export type AudienceSwitchProps = {
  current?: "hire" | "fix" | null;
};

const STORAGE_KEY = "audience-lens";

/**
 * Two contextual chips: "Hiring for a role" -> /work?for=hire,
 * "Fixing a production issue" -> /problems?for=fix. Setting the ?for=
 * param is the only requirement the home page depends on; the localStorage
 * write is a per-viewer convenience only, never required for correctness.
 *
 * Pure/presentational: `current` drives which chip (if any) renders as
 * active. Used directly as the Suspense fallback for `AudienceSwitchLens`
 * below (with `current={null}`) precisely because it does *not* call
 * `useSearchParams` itself, so it never triggers the
 * "should be wrapped in a suspense boundary" bailout on its own.
 */
export function AudienceSwitch({ current = null }: AudienceSwitchProps) {
  function remember(value: "hire" | "fix") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* localStorage unavailable — navigation via ?for= still works */
    }
  }

  const chipClasses = (active: boolean) =>
    cn(
      "mono-label inline-flex min-h-[44px] items-center rounded-full border px-4 text-center " +
        "transition-[color,background-color,transform] motion-safe:duration-(--duration-ui) motion-safe:ease-(--ease-standard)",
      active
        ? "border-(--color-signal) bg-(--color-tone-signal) text-(--color-signal-on)"
        : "border-(--color-border-strong) text-(--color-ink) hover:-translate-y-px hover:bg-(--color-canvas-raised)"
    );

  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="Choose how you'd like to read this site">
      <Link
        href="/work?for=hire"
        className={chipClasses(current === "hire")}
        aria-current={current === "hire" ? "true" : undefined}
        onClick={() => remember("hire")}
      >
        Hiring for a role
      </Link>
      <Link
        href="/problems?for=fix"
        className={chipClasses(current === "fix")}
        aria-current={current === "fix" ? "true" : undefined}
        onClick={() => remember("fix")}
      >
        Fixing a production issue
      </Link>
    </div>
  );
}

/**
 * Lens-aware wrapper: reads the visitor's already-resolved audience lens
 * (`useAudienceLens()`, which calls `useSearchParams` internally) and
 * passes it through as `current`, so a visitor who already picked a lens
 * sees that choice reflected in the chips. Callers must render this inside
 * a `<Suspense>` boundary (fallback: `<AudienceSwitch current={null} />`)
 * per Next's `useSearchParams` requirement.
 */
export function AudienceSwitchLens() {
  const lens = useAudienceLens();
  return <AudienceSwitch current={lens} />;
}
