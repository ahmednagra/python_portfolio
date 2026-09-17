"use client";

import { Button } from "@/components/ui/button";

export type DiagramControlsProps = {
  playing: boolean;
  stepIndex: number;
  stepCount: number;
  onPlayPause: () => void;
  onStep: () => void;
  onReset: () => void;
  /** Extra reader-triggered what-if control(s) specific to one diagram. */
  whatIf?: React.ReactNode;
};

/**
 * Shared Play/Step/Reset row plus a live step counter. Every control is a
 * real <button> (keyboard-operable, focus-visible by the global focus
 * ring) and at least 36px tall, clearing the 24x24px touch-target minimum.
 */
export function DiagramControls({
  playing,
  stepIndex,
  stepCount,
  onPlayPause,
  onStep,
  onReset,
  whatIf,
}: DiagramControlsProps) {
  const isFinal = stepIndex >= stepCount - 1;

  return (
    <div className="flex flex-wrap items-center gap-3 border-t border-(--color-border) pt-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Diagram playback">
        <Button type="button" variant="secondary" size="sm" onClick={onPlayPause} aria-pressed={playing}>
          {playing ? "Pause" : isFinal ? "Replay" : "Play"}
        </Button>
        <Button type="button" variant="secondary" size="sm" onClick={onStep} disabled={isFinal}>
          Step
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>
      {whatIf}
      <span className="mono-label ml-auto text-(--color-ink-muted)" aria-hidden="true">
        Step {stepIndex + 1} / {stepCount}
      </span>
    </div>
  );
}
