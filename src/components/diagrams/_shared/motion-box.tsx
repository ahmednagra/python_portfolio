"use client";

import type { ReactNode } from "react";
import type * as MotionReact from "motion/react";

type MotionReactModule = typeof MotionReact;

export type BoxAnimateState = {
  opacity?: number;
  x?: number;
  y?: number;
  scale?: number;
};

/**
 * The one animated primitive every diagram visual is built from. When the
 * `motion` module is loaded and the reader has no reduced-motion
 * preference, it animates opacity/transform only, via LazyMotion's `m`
 * component (the feature bundle is loaded once, by the diagram island
 * itself, in `use-lazy-motion`). Otherwise it renders a plain `div` with
 * the same end state applied instantly — same information, no animation
 * library, no motion. Every diagram stays fully functional either way.
 */
export function MotionBox({
  motionModule,
  animate,
  state,
  className,
  children,
  durationMs = 400,
  as: Tag = "div",
}: {
  motionModule: MotionReactModule | null;
  animate: boolean;
  state: BoxAnimateState;
  className?: string;
  children?: ReactNode;
  durationMs?: number;
  as?: "div" | "li";
}) {
  if (motionModule && animate) {
    const { m } = motionModule;
    const MotionTag = Tag === "li" ? m.li : m.div;
    return (
      <MotionTag
        className={className}
        initial={false}
        animate={state}
        transition={{ duration: durationMs / 1000, ease: [0.2, 0, 0, 1] }}
      >
        {children}
      </MotionTag>
    );
  }

  const transform =
    [
      state.x !== undefined ? `translateX(${state.x}px)` : "",
      state.y !== undefined ? `translateY(${state.y}px)` : "",
      state.scale !== undefined ? `scale(${state.scale})` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <Tag className={className} style={{ opacity: state.opacity, transform }}>
      {children}
    </Tag>
  );
}
