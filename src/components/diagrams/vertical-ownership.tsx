"use client";

import { useMemo } from "react";
import { DiagramControls } from "@/components/diagrams/_shared/diagram-controls";
import { DiagramShell } from "@/components/diagrams/_shared/diagram-shell";
import { MotionBox } from "@/components/diagrams/_shared/motion-box";
import { useDiagramMotion } from "@/components/diagrams/_shared/use-diagram-motion";
import { useStepPlayer } from "@/components/diagrams/_shared/use-step-player";

export type VerticalOwnershipDiagramProps = {
  autoplay?: false;
};

const NAME = "Vertical ownership";

const LAYERS = ["Schema", "Migration", "Service", "Route", "Client", "Cache", "UI"] as const;

const STEPS = [
  "Schema: new table/column designed.",
  "Migration: reviewed, reversible migration ships.",
  "Service: business logic added, annotated with its correctness concern.",
  "Route: API route exposes the service with its contract.",
  "Client: typed client method matches the contract.",
  "Cache: query cache wired with explicit key/invalidation rule.",
  "UI: interface renders from the cache, completing the chain.",
];

const TEXT_ALTERNATIVE =
  "One person designed the schema, wrote the migration, implemented the service logic, exposed the API route, consumed it from a typed client with an explicit cache, and built the UI — one continuous ownership chain with no hand-off.";

/**
 * DiagramExplainer for the "vertical-ownership" contract. Each of the
 * seven layers is itself a button: clicking any layer jumps the step
 * position straight to it (the contract's "clicking a layer scrolls it
 * into focus instantly" what-if), in addition to the ordinary Play/Step
 * sequence through the chain.
 */
export function VerticalOwnershipDiagram(_props: VerticalOwnershipDiagramProps) {
  const { ref, animate, motionModule } = useDiagramMotion<HTMLDivElement>();
  const { stepIndex, playing, play, step, reset, goTo } = useStepPlayer(STEPS.length);

  const currentStepLabel = useMemo(
    () => `Step ${stepIndex + 1} of ${STEPS.length}: ${STEPS[stepIndex]}`,
    [stepIndex]
  );

  return (
    <DiagramShell
      name={NAME}
      currentStepLabel={currentStepLabel}
      textAlternative={TEXT_ALTERNATIVE}
      steps={STEPS}
      controls={
        <DiagramControls
          playing={playing}
          stepIndex={stepIndex}
          stepCount={STEPS.length}
          onPlayPause={play}
          onStep={step}
          onReset={reset}
        />
      }
    >
      <div ref={ref} className="flex flex-col gap-4">
        <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch" aria-label="Ownership chain, schema to UI">
          {LAYERS.map((layer, index) => {
            const reached = index <= stepIndex;
            const isCurrent = index === stepIndex;
            return (
              <li key={layer} className="flex-1">
                <MotionBox
                  as="div"
                  motionModule={motionModule}
                  animate={animate}
                  state={{ opacity: reached ? 1 : 0.4 }}
                  className="h-full"
                >
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={isCurrent ? "step" : undefined}
                    className={
                      isCurrent
                        ? "min-h-[44px] w-full border border-(--color-signal) bg-(--color-canvas) px-3 py-2 text-left"
                        : "min-h-[44px] w-full border border-(--color-border-strong) px-3 py-2 text-left hover:bg-(--color-canvas)"
                    }
                  >
                    <span className="mono-label block text-(--color-ink-muted)">{`0${index + 1}`}</span>
                    <span className="text-sm font-medium">{layer}</span>
                  </button>
                </MotionBox>
              </li>
            );
          })}
        </ol>
        <p className="text-sm text-(--color-ink-muted)">{STEPS[stepIndex]}</p>
      </div>
    </DiagramShell>
  );
}
