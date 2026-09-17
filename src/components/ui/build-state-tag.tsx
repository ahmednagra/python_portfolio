import { Badge } from "@/components/ui/badge";

export type BuildStateTagProps = {
  state: "RUNNING" | "BUILT" | "DESIGNED";
};

const toneByState: Record<BuildStateTagProps["state"], "success" | "signal" | "neutral"> = {
  RUNNING: "success",
  BUILT: "signal",
  DESIGNED: "neutral",
};

/** Plain bordered label, always adjacent to any project or component claim. */
export function BuildStateTag({ state }: BuildStateTagProps) {
  return <Badge tone={toneByState[state]}>{state}</Badge>;
}
