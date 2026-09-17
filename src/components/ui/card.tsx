import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type CardProps = {
  href?: string;
  eyebrow?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Flat bordered card shell. When `href` is given the whole card is a single
 * link target (WCAG 2.5.8) with a signal-color left edge that appears on
 * hover/focus for pointer users, guarded by prefers-reduced-motion.
 */
export function Card({ href, eyebrow, className, children }: CardProps) {
  const content = (
    <>
      {eyebrow ? <p className="mono-label mb-2 text-(--color-ink-muted)">{eyebrow}</p> : null}
      {children}
    </>
  );

  const sharedClasses = cn(
    "group relative block rounded-lg border border-(--color-border) bg-(--color-canvas-raised) p-5 shadow-(--shadow-xs)",
    "before:absolute before:inset-y-0 before:left-0 before:w-[2px] before:rounded-l-lg before:bg-(--color-signal) before:opacity-0",
    "motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-ui) motion-safe:ease-(--ease-standard)",
    "motion-safe:before:transition-opacity motion-safe:before:duration-(--duration-ui) motion-safe:before:ease-(--ease-standard)",
    href &&
      "hover:-translate-y-0.5 hover:shadow-(--shadow-md) hover:before:opacity-100 " +
        "focus-visible:-translate-y-0.5 focus-visible:shadow-(--shadow-md) focus-visible:before:opacity-100",
    className
  );

  if (href) {
    return (
      <Link href={href} className={sharedClasses}>
        {content}
      </Link>
    );
  }

  return <div className={sharedClasses}>{content}</div>;
}
