"use client";

import { useCallback, useEffect, useState } from "react";

export type StepPlayer = {
  stepIndex: number;
  playing: boolean;
  play: () => void;
  step: () => void;
  reset: () => void;
  goTo: (index: number) => void;
  isFinal: boolean;
};

/**
 * Drives a diagram's step timeline. Every diagram opens paused at step 0
 * (no autoplay). `play` is the only auto-advancing path, and it only runs
 * because a reader pressed a button — advancing one step every
 * `stepDurationMs` (the "explanatory tier", 400-1000ms) until the final
 * step, then stopping on its own. `step` advances exactly one step and
 * pauses. `reset` returns to step 0. All three remain fully functional
 * identically whether or not motion is animating the transition.
 */
export function useStepPlayer(stepCount: number, stepDurationMs = 700): StepPlayer {
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const isFinal = stepIndex >= stepCount - 1;
  const isPlaying = playing && !isFinal;

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timeoutId = setTimeout(() => {
      setStepIndex((current) => Math.min(current + 1, stepCount - 1));
    }, stepDurationMs);
    return () => clearTimeout(timeoutId);
  }, [isPlaying, stepCount, stepDurationMs]);

  const play = useCallback(() => {
    if (stepIndex >= stepCount - 1) {
      setStepIndex(0);
      setPlaying(true);
      return;
    }
    setPlaying((wasPlaying) => !wasPlaying);
  }, [stepIndex, stepCount]);

  const step = useCallback(() => {
    setPlaying(false);
    setStepIndex((current) => Math.min(current + 1, stepCount - 1));
  }, [stepCount]);

  const reset = useCallback(() => {
    setPlaying(false);
    setStepIndex(0);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setPlaying(false);
      setStepIndex(Math.max(0, Math.min(index, stepCount - 1)));
    },
    [stepCount]
  );

  return { stepIndex, playing: isPlaying, play, step, reset, goTo, isFinal };
}
