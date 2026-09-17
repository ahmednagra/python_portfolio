"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";

export type AudienceLens = "hire" | "fix";

const STORAGE_KEY = "audience-lens";

function parseLens(value: string | null): AudienceLens | null {
  return value === "hire" || value === "fix" ? value : null;
}

function readStoredLens(): AudienceLens | null {
  try {
    return parseLens(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function subscribeToStorage(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getServerLensSnapshot(): AudienceLens | null {
  return null;
}

/**
 * Resolves the audience lens ("hire" | "fix" | null) from the `?for=`
 * query param, falling back to a per-viewer localStorage convenience set
 * by AudienceSwitch on a prior visit. Never required for correctness —
 * every page renders complete, unreordered content when this returns null.
 *
 * A Client Component hook (not a server-side `searchParams` read) so pages
 * that use it stay statically rendered (SSG), matching the pattern already
 * established by ContactPath.
 */
export function useAudienceLens(): AudienceLens | null {
  const searchParams = useSearchParams();
  const queryLens = parseLens(searchParams.get("for"));

  // Reads the localStorage fallback as an external store: `getSnapshot` runs
  // during render (safe, since it only reads), and the null server snapshot
  // means the first client render always matches SSR — no hydration
  // mismatch, no setState-in-effect.
  const storedLens = useSyncExternalStore(subscribeToStorage, readStoredLens, getServerLensSnapshot);

  useEffect(() => {
    // Persisting the query param to localStorage is writing React's state
    // out to an external system, which is exactly what effects are for —
    // unlike mirroring it back into a piece of component state.
    if (queryLens) {
      try {
        window.localStorage.setItem(STORAGE_KEY, queryLens);
      } catch {
        /* localStorage unavailable — the query param still drives this render */
      }
    }
  }, [queryLens]);

  return queryLens ?? storedLens;
}

/**
 * Moves the item matching `matchKey` to the front of `items`, leaving every
 * other item in its original relative order. Used to re-sequence existing
 * content by audience lens without forking or duplicating it.
 */
export function withFeaturedFirst<T>(items: T[], matchKey: (item: T) => boolean): T[] {
  const index = items.findIndex(matchKey);
  if (index <= 0) {
    return items;
  }
  const copy = items.slice();
  const featured = copy.splice(index, 1)[0]!;
  copy.unshift(featured);
  return copy;
}
