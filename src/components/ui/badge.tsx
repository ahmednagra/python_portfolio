import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeProps = {
  tone?: "neutral" | "signal" | "success" | "warning" | "danger";
  children: React.ReactNode;
  className?: string;
};

const toneClass: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral: "border-(--color-border-strong) text-(--color-tone-neutral)",
  signal: "border-(--color-tone-signal) text-(--color-tone-signal)",
  success: "border-(--color-tone-success) text-(--color-tone-success)",
  warning: "border-(--color-tone-warning) text-(--color-tone-warning)",
  danger: "border-(--color-tone-danger) text-(--color-tone-danger)",
};

/** Generic mono badge for proof chips and build-state tags. */
export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center gap-1 rounded-sm border px-2 py-0.5 uppercase tracking-wide",
        toneClass[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
