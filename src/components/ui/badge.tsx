import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = {
  tone?: "neutral" | "signal" | "success" | "warning" | "danger";
  /** "outline" (default) is the quiet chip used for proof/build-state tags
   * throughout the site. "solid" is a filled treatment for the handful of
   * places that should carry more visual weight (e.g. an eyebrow the eye
   * should land on first) — used deliberately sparingly, not as a default. */
  variant?: "outline" | "solid";
  children: React.ReactNode;
  className?: string;
};

const outlineToneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-(--color-border-strong) text-(--color-tone-neutral)",
  signal: "border-(--color-tone-signal) text-(--color-tone-signal)",
  success: "border-(--color-tone-success) text-(--color-tone-success)",
  warning: "border-(--color-tone-warning) text-(--color-tone-warning)",
  danger: "border-(--color-tone-danger) text-(--color-tone-danger)",
};

const solidToneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-(--color-ink-muted) bg-(--color-ink-muted) text-(--color-canvas)",
  signal: "border-(--color-tone-signal) bg-(--color-tone-signal) text-(--color-signal-on)",
  success: "border-(--color-tone-success) bg-(--color-tone-success) text-(--color-signal-on)",
  warning: "border-(--color-tone-warning) bg-(--color-tone-warning) text-(--color-signal-on)",
  danger: "border-(--color-tone-danger) bg-(--color-tone-danger) text-(--color-signal-on)",
};

/** Generic mono badge for proof chips, build-state tags, and eyebrows. */
export function Badge({ tone = "neutral", variant = "outline", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 uppercase tracking-wide",
        variant === "solid" ? solidToneClass[tone] : outlineToneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
