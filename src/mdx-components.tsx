import type { MDXComponents } from "mdx/types";
import { ProofRef } from "@/components/ui/proof-ref";
import { Callout } from "@/components/mdx/callout";
import { DecisionRecordBlock } from "@/components/mdx/decision-record-block";

/**
 * Global MDX component map, required by @next/mdx under the App Router.
 * Applies the editorial prose scale and wires ProofRef/Callout/
 * DecisionRecordBlock for use inside case-study and article MDX bodies.
 */
const components: MDXComponents = {
  h1: (props) => <h1 className="mt-0 text-3xl font-semibold" {...props} />,
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold" {...props} />,
  p: (props) => <p className="mt-4" {...props} />,
  a: (props) => <a className="underline decoration-(--color-border-strong) underline-offset-2 hover:decoration-(--color-ink)" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc pl-6" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal pl-6" {...props} />,
  code: (props) => <code className="mono-label rounded-sm bg-(--color-canvas-raised) px-1 py-0.5" {...props} />,
  pre: (props) => <pre className="mono-label mt-4 overflow-x-auto border border-(--color-border) bg-(--color-canvas-raised) p-4" {...props} />,
  ProofRef,
  Callout,
  DecisionRecordBlock,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
