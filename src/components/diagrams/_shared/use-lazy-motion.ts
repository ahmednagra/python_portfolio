"use client";

import { useEffect, useState } from "react";
import type * as MotionReact from "motion/react";

type MotionReactModule = typeof MotionReact;

/**
 * Loads the `motion` library's React bindings on demand, only once
 * `shouldLoad` is true (the island is in view and the reader has no
 * reduced-motion preference). Keeps `motion` out of every diagram's
 * first-paint bundle: routes that never scroll a diagram into view, or
 * readers who prefer reduced motion, never pay for it at all.
 */
export function useLazyMotion(shouldLoad: boolean): MotionReactModule | null {
  const [mod, setMod] = useState<MotionReactModule | null>(null);

  useEffect(() => {
    if (!shouldLoad || mod) return;
    let cancelled = false;
    import("motion/react").then((loaded) => {
      if (!cancelled) setMod(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, [shouldLoad, mod]);

  return mod;
}
