"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reports whether the observed element has scrolled into (or near) the
 * viewport, once, then disconnects. Used to defer loading the `motion`
 * library and its animated visual until a diagram island is actually
 * visible, per the performance budget: "the 4 diagram islands hydrate only
 * on visibility/interaction, never on first paint."
 *
 * Environments without `IntersectionObserver` default to `true` (via the
 * lazy initializer, not an effect) so the diagram never silently fails to
 * render for a reader without one.
 */
export function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "200px 0px", ...options }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options is passed once by callers
  }, []);

  return { ref, inView } as const;
}
