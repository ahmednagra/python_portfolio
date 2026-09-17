import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-medium transition-[color,background-color,transform,box-shadow] motion-safe:duration-(--duration-ui) motion-safe:ease-(--ease-standard) disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-(--color-signal) bg-(--color-signal) text-(--color-signal-on) " +
          "hover:-translate-y-px hover:shadow-(--shadow-signal) active:translate-y-0",
        secondary:
          "border-(--color-border-strong) bg-transparent text-(--color-ink) " +
          "hover:-translate-y-px hover:border-(--color-ink) hover:shadow-(--shadow-sm) active:translate-y-0",
        ghost: "border-transparent bg-transparent text-(--color-ink) hover:bg-(--color-canvas-raised)",
      },
      size: {
        sm: "min-h-[36px] px-4 text-sm",
        md: "min-h-[44px] px-5 text-base",
        lg: "min-h-[48px] px-7 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"button">, "className"> &
  Omit<React.ComponentPropsWithoutRef<"a">, "className">;

/**
 * Shared button/link primitive. Renders an anchor when `href` is given so
 * navigational actions are real links (crawlable, openable in a new tab).
 */
export function Button({
  variant,
  size,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link href={href} className={classes} {...(props as React.ComponentPropsWithoutRef<"a">)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as React.ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
