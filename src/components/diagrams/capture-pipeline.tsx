"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiagramControls } from "@/components/diagrams/_shared/diagram-controls";
import { DiagramShell } from "@/components/diagrams/_shared/diagram-shell";
import { MotionBox } from "@/components/diagrams/_shared/motion-box";
import { useDiagramMotion } from "@/components/diagrams/_shared/use-diagram-motion";
import { useStepPlayer } from "@/components/diagrams/_shared/use-step-player";

export type CapturePipelineDiagramProps = {
  autoplay?: false;
};

const NAME = "Capture pipeline";

const STEPS = [
  "Capture request admitted through a bounded queue (admission control, rate-limit annotation).",
  "One lease checked out from a fixed pool of egress sessions before any external call.",
  "Leased session performs the fetch (edge-a, 'may 403 / may change markup').",
  "Raw response bytes stored durably before any parsing.",
  "A versioned parser (v3, v2 greyed out) reads from stored raw bytes to produce structured output.",
];

const TEXT_ALTERNATIVE =
  "A capture request is admitted under a bounded rate limit and a limited egress-session pool before any outbound call. Raw response bytes are stored before parsing. A versioned parser reads from that stored copy, so a parser bug or source-format change is a reprocessing job, not a data-loss event.";

/**
 * DiagramExplainer for the "capture-pipeline" contract. "Fail the parser"
 * is a reader-triggered what-if reachable at any point once raw bytes are
 * stored (step 4): it swaps the parser stage to a failed state while
 * leaving the raw store intact, matching the contract's reduced-motion
 * fallback description ("raw bytes intact, output pending") — and that end
 * state, like the success end state, is reachable without ever pressing
 * Play.
 */
export function CapturePipelineDiagram(_props: CapturePipelineDiagramProps) {
  const { ref, animate, motionModule } = useDiagramMotion<HTMLDivElement>();
  const { stepIndex, playing, play, step, reset } = useStepPlayer(STEPS.length);
  const [parserFailed, setParserFailed] = useState(false);

  const admitted = stepIndex >= 0;
  const leased = stepIndex >= 1;
  const fetched = stepIndex >= 2;
  const rawStored = stepIndex >= 3;
  const parsed = stepIndex >= 4 && !parserFailed;

  const handleReset = () => {
    reset();
    setParserFailed(false);
  };

  const currentStepLabel = useMemo(() => {
    const base = `Step ${stepIndex + 1} of ${STEPS.length}: ${STEPS[stepIndex]}`;
    return parserFailed && rawStored ? `${base} Parser failed by reader: raw bytes intact, output pending.` : base;
  }, [stepIndex, parserFailed, rawStored]);

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
          onReset={handleReset}
          whatIf={
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={!rawStored || parserFailed}
              onClick={() => setParserFailed(true)}
            >
              Fail the parser
            </Button>
          }
        />
      }
    >
      <div ref={ref} className="flex flex-col gap-3 text-sm">
        <div className="grid grid-cols-5 items-stretch gap-2 text-center">
          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: admitted ? 1 : 0.35 }}
            className="border border-(--color-border-strong) px-2 py-3"
          >
            <p className="mono-label">Admission</p>
            <p className="text-(--color-ink-muted)">rate-limited</p>
          </MotionBox>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: leased ? 1 : 0.35 }}
            className="border border-(--color-border-strong) px-2 py-3"
          >
            <p className="mono-label">Session lease</p>
            <p className="text-(--color-ink-muted)">fixed pool</p>
          </MotionBox>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: fetched ? 1 : 0.35 }}
            className="border border-(--color-border-strong) px-2 py-3"
          >
            <p className="mono-label">Fetch</p>
            <p className="text-(--color-ink-muted)">may 403</p>
          </MotionBox>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: rawStored ? 1 : 0.35, y: rawStored ? 0 : 4 }}
            className={
              rawStored
                ? "border border-(--color-tone-success) bg-(--color-canvas) px-2 py-3"
                : "border border-dashed border-(--color-border-strong) px-2 py-3"
            }
          >
            <p className="mono-label">Raw store</p>
            <p className="text-(--color-ink-muted)">{rawStored ? "durable" : "pending"}</p>
          </MotionBox>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: stepIndex >= 4 ? 1 : 0.35 }}
            className={
              parserFailed
                ? "border border-dashed border-(--color-tone-danger) px-2 py-3"
                : parsed
                  ? "border border-(--color-tone-success) bg-(--color-canvas) px-2 py-3"
                  : "border border-(--color-border-strong) px-2 py-3"
            }
          >
            <p className="mono-label">Parser v3</p>
            <p className="text-(--color-ink-muted)">v2 retired</p>
          </MotionBox>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-(--color-border) pt-3">
          <Badge tone={rawStored ? "success" : "neutral"}>raw bytes: {rawStored ? "intact" : "not yet captured"}</Badge>
          <Badge tone={parserFailed ? "danger" : parsed ? "success" : "neutral"}>
            output: {parserFailed ? "pending (reprocess from raw store)" : parsed ? "structured record" : "not yet parsed"}
          </Badge>
        </div>
      </div>
    </DiagramShell>
  );
}
