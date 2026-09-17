"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiagramControls } from "@/components/diagrams/_shared/diagram-controls";
import { DiagramShell } from "@/components/diagrams/_shared/diagram-shell";
import { MotionBox } from "@/components/diagrams/_shared/motion-box";
import { useDiagramMotion } from "@/components/diagrams/_shared/use-diagram-motion";
import { useStepPlayer } from "@/components/diagrams/_shared/use-step-player";

export type WebhookIdempotencyDiagramProps = {
  autoplay?: false;
};

const NAME = "Webhook idempotency";

const STEPS = [
  "Two deliveries (A, B) appear with the same idempotency key annotation.",
  "Delivery A claims the key (lock, edge-a) before touching state.",
  "Delivery A applies exactly one state transition (pending -> confirmed).",
  "Delivery B (fired any time via ‘Send duplicate now’) hits the claimed key and reroutes to a no-op terminal (edge-b, dashed).",
  "Final frame: 1 transition recorded, 2x 200 OK.",
];

const TEXT_ALTERNATIVE =
  "Two webhook deliveries carry the same idempotency key; whichever arrives first claims the key and advances state exactly once; the second, whenever it arrives, is safely rejected as a duplicate while still receiving 200 OK.";

/**
 * DiagramExplainer for the "webhook-idempotency" contract. The step
 * timeline models delivery A claiming the key and applying the one state
 * transition. "Send duplicate now" is a reader-triggered what-if, separate
 * from the step position, that can fire delivery B at any time — matching
 * the contract's "fired any time" framing. Reaching the timeline's own
 * step 4 shows the same outcome without the reader needing to press it.
 */
export function WebhookIdempotencyDiagram(_props: WebhookIdempotencyDiagramProps) {
  const { ref, animate, motionModule } = useDiagramMotion<HTMLDivElement>();
  const { stepIndex, playing, play, step, reset } = useStepPlayer(STEPS.length);
  const [duplicateSent, setDuplicateSent] = useState(false);

  const keyClaimed = stepIndex >= 1;
  const transitionApplied = stepIndex >= 2;
  const duplicateArrived = duplicateSent || stepIndex >= 3;
  const okCount = (transitionApplied ? 1 : 0) + (duplicateArrived ? 1 : 0);

  const handleReset = () => {
    reset();
    setDuplicateSent(false);
  };

  const currentStepLabel = useMemo(() => {
    const base = `Step ${stepIndex + 1} of ${STEPS.length}: ${STEPS[stepIndex]}`;
    return duplicateSent && stepIndex < 3 ? `${base} Duplicate sent by reader: rejected, 200 OK.` : base;
  }, [stepIndex, duplicateSent]);

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
              onClick={() => setDuplicateSent(true)}
              disabled={duplicateArrived}
            >
              Send duplicate now
            </Button>
          }
        />
      }
    >
      <div ref={ref} className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-sm">
          <div className="border border-(--color-border-strong) px-3 py-2">
            <p className="mono-label">Delivery A</p>
            <p className="text-(--color-ink-muted)">key: idem-9f2c</p>
          </div>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: keyClaimed ? 1 : 0.35 }}
            className="flex flex-col items-center gap-1 px-2 text-center"
          >
            <span aria-hidden="true">{keyClaimed ? "\u{1F512}" : "—"}</span>
            <p className="mono-label text-(--color-ink-muted)">{keyClaimed ? "claimed" : "key store"}</p>
          </MotionBox>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: transitionApplied ? 1 : 0.35, y: transitionApplied ? 0 : 4 }}
            className={
              transitionApplied
                ? "border border-(--color-tone-success) bg-(--color-canvas) px-3 py-2"
                : "border border-dashed border-(--color-border-strong) px-3 py-2"
            }
          >
            <p className="mono-label">{transitionApplied ? "confirmed" : "pending"}</p>
            <p className="text-(--color-ink-muted)">1 state transition</p>
          </MotionBox>

          <div className="border border-(--color-border-strong) px-3 py-2 opacity-80">
            <p className="mono-label">Delivery B</p>
            <p className="text-(--color-ink-muted)">key: idem-9f2c</p>
          </div>

          <div className="px-2 text-center text-(--color-ink-muted)" aria-hidden="true">
            &#8594;
          </div>

          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: duplicateArrived ? 1 : 0.35, x: duplicateArrived ? 0 : -6 }}
            className="border border-dashed border-(--color-tone-signal) px-3 py-2"
          >
            <p className="mono-label text-(--color-tone-signal)">
              {duplicateArrived ? "no-op (duplicate)" : "awaiting"}
            </p>
            <p className="text-(--color-ink-muted)">200 OK, no state change</p>
          </MotionBox>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-t border-(--color-border) pt-3 text-sm">
          <Badge tone={transitionApplied ? "success" : "neutral"}>
            {transitionApplied ? 1 : 0} state transition{transitionApplied ? "" : "s"}
          </Badge>
          <Badge tone={okCount > 0 ? "signal" : "neutral"}>{okCount}x 200 OK</Badge>
        </div>
      </div>
    </DiagramShell>
  );
}
