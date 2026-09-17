import Link from "next/link";
import { proofIndex } from "@/content/proof-index";

export type ProofRefProps = {
  id: string;
};

/**
 * Citation badge linking a claim to its row on /proof. Used inside MDX via
 * mdx-components.tsx. `id` is one of src/content/proof-index.ts's own
 * anchor slugs — never an internal proof-tracking identifier.
 */
export function ProofRef({ id }: ProofRefProps) {
  const entry = proofIndex.find((row) => row.id === id);

  return (
    <Link
      href={`/proof#${id}`}
      className="mono-label inline-flex items-center rounded-sm border border-(--color-border-strong) px-1.5 py-0.5 text-(--color-tone-signal) align-baseline no-underline hover:bg-(--color-canvas-raised)"
      title={entry?.whatItProves ?? "See proof index"}
    >
      proof
    </Link>
  );
}
