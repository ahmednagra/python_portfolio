"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiagramControls } from "@/components/diagrams/_shared/diagram-controls";
import { DiagramShell } from "@/components/diagrams/_shared/diagram-shell";
import { MotionBox } from "@/components/diagrams/_shared/motion-box";
import { useDiagramMotion } from "@/components/diagrams/_shared/use-diagram-motion";
import { useStepPlayer } from "@/components/diagrams/_shared/use-step-player";

export type TenantIsolationDiagramProps = {
  autoplay?: false;
};

const NAME = "Tenant isolation";

const STEPS = [
  "Authenticated request carries a server-derived tenant id.",
  "Tenant id bound into the transaction/session context before any query runs (lock icon, edge-a, 'SET tenant context').",
  "Query executes against a multi-tenant table (4-5 rows, tenant color swatches).",
  "Row-level security passes matching-tenant rows, blocks others (greyed, X-terminated edge).",
  "'Introduce application bug' toggle removes the app-level WHERE clause and re-runs; RLS still blocks cross-tenant rows.",
];

const TEXT_ALTERNATIVE =
  "Tenant identity is bound to the database transaction before any query runs. Row-level security enforces the boundary at the data layer, so even a deliberately broken application query that forgets its own tenant filter still cannot read another tenant's rows.";

type Row = { id: string; tenant: "A" | "B" };
const ROWS: Row[] = [
  { id: "row-1", tenant: "A" },
  { id: "row-2", tenant: "B" },
  { id: "row-3", tenant: "A" },
  { id: "row-4", tenant: "B" },
  { id: "row-5", tenant: "A" },
];
const REQUESTING_TENANT: Row["tenant"] = "A";

/**
 * DiagramExplainer for the "tenant-isolation" contract. "Introduce
 * application bug" is a persistent, reader-toggled what-if (not a
 * momentary trigger): with it on, the query lane drops its own WHERE
 * clause, but the allowed/blocked row outcome is identical either way,
 * because row-level security — not the application query — is the actual
 * enforcement point.
 */
export function TenantIsolationDiagram(_props: TenantIsolationDiagramProps) {
  const { ref, animate, motionModule } = useDiagramMotion<HTMLDivElement>();
  const { stepIndex, playing, play, step, reset } = useStepPlayer(STEPS.length);
  const [bugIntroduced, setBugIntroduced] = useState(false);

  const tenantBound = stepIndex >= 1;
  const queryRan = stepIndex >= 2;
  const rlsApplied = stepIndex >= 3;

  const handleReset = () => {
    reset();
    setBugIntroduced(false);
  };

  const currentStepLabel = useMemo(() => {
    const base = `Step ${stepIndex + 1} of ${STEPS.length}: ${STEPS[stepIndex]}`;
    return bugIntroduced ? `${base} Application bug introduced: WHERE clause removed, RLS still blocks cross-tenant rows.` : base;
  }, [stepIndex, bugIntroduced]);

  const queryLabel = bugIntroduced
    ? "SELECT * FROM records;  -- WHERE clause missing"
    : "SELECT * FROM records WHERE tenant_id = current;";

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
              aria-pressed={bugIntroduced}
              onClick={() => setBugIntroduced((current) => !current)}
            >
              {bugIntroduced ? "Bug introduced" : "Introduce application bug"}
            </Button>
          }
        />
      }
    >
      <div ref={ref} className="flex flex-col gap-4 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="border border-(--color-border-strong) px-3 py-2">
            <p className="mono-label">Request</p>
            <p className="text-(--color-ink-muted)">tenant: {REQUESTING_TENANT}</p>
          </div>
          <div className="px-1 text-(--color-ink-muted)" aria-hidden="true">
            &#8594;
          </div>
          <MotionBox
            motionModule={motionModule}
            animate={animate}
            state={{ opacity: tenantBound ? 1 : 0.35 }}
            className="flex items-center gap-2 border border-(--color-border-strong) px-3 py-2"
          >
            <span aria-hidden="true">{tenantBound ? "\u{1F512}" : "—"}</span>
            <span className="mono-label">SET tenant context</span>
          </MotionBox>
          <div className="px-1 text-(--color-ink-muted)" aria-hidden="true">
            &#8594;
          </div>
          <div
            className={
              bugIntroduced
                ? "border border-dashed border-(--color-tone-warning) px-3 py-2 font-mono text-xs text-(--color-tone-warning)"
                : "border border-(--color-border-strong) px-3 py-2 font-mono text-xs"
            }
          >
            {queryLabel}
          </div>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Multi-tenant table rows">
          {ROWS.map((row) => {
            const isOwnTenant = row.tenant === REQUESTING_TENANT;
            const blocked = rlsApplied && !isOwnTenant;
            const passed = rlsApplied && isOwnTenant;
            return (
              <MotionBox
                key={row.id}
                as="li"
                motionModule={motionModule}
                animate={animate}
                state={{ opacity: blocked ? 0.3 : 1 }}
                className={
                  passed
                    ? "flex items-center gap-2 border border-(--color-tone-success) px-2 py-1"
                    : "flex items-center gap-2 border border-(--color-border-strong) px-2 py-1"
                }
              >
                <Badge tone={row.tenant === REQUESTING_TENANT ? "signal" : "neutral"}>T-{row.tenant}</Badge>
                {blocked && (
                  <span aria-hidden="true" className="text-(--color-tone-danger)">
                    &#10005;
                  </span>
                )}
              </MotionBox>
            );
          })}
        </ul>

        <p className="text-(--color-ink-muted)">
          {rlsApplied
            ? `Row-level security: ${ROWS.filter((r) => r.tenant === REQUESTING_TENANT).length} row(s) allowed, ${
                ROWS.filter((r) => r.tenant !== REQUESTING_TENANT).length
              } row(s) blocked — enforced by the database, unaffected by the application query above.`
            : "Row-level security has not run yet."}
        </p>
      </div>
    </DiagramShell>
  );
}
