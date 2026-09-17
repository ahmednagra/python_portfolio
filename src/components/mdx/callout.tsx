import * as React from "react";
import { cn } from "@/lib/utils";

export type CalloutProps = {
  tone?: "info" | "warning" | "danger";
  children: React.ReactNode;
};

const toneClass: Record<NonNullable<CalloutProps["tone"]>, string> = {
  info: "border-(--color-border-strong)",
  warning: "border-(--color-tone-warning)",
  danger: "border-(--color-tone-danger)",
};

/** Generic MDX callout block. */
export function Callout({ tone = "info", children }: CalloutProps) {
  return (
    <aside className={cn("border-l-2 bg-(--color-canvas-raised) px-4 py-3", toneClass[tone])}>
      {children}
    </aside>
  );
}
