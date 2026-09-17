"use client";

import { useInView } from "@/components/diagrams/_shared/use-in-view";
import { usePrefersReducedMotion } from "@/components/diagrams/_shared/use-prefers-reduced-motion";
import { useLazyMotion } from "@/components/diagrams/_shared/use-lazy-motion";

/**
 * Composes the three pieces every diagram island needs: visibility
 * (defer loading `motion` until scrolled near), the reader's
 * reduced-motion preference (never load or use `motion` if set), and the
 * lazily-loaded module itself. `animate` is the single flag a diagram's
 * visual needs to decide between the animated and static-instant render
 * paths.
 */
export function useDiagramMotion<T extends Element>() {
  const { ref, inView } = useInView<T>();
  const reducedMotion = usePrefersReducedMotion();
  const shouldLoad = inView && !reducedMotion;
  const motionModule = useLazyMotion(shouldLoad);
  const animate = shouldLoad && Boolean(motionModule);

  return { ref, animate, motionModule, reducedMotion, inView };
}
