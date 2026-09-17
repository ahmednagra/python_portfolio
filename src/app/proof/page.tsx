import type { Metadata } from "next";
import Link from "next/link";
import { getPageContent } from "@/content/pages";
import { proofIndex, type ProofEntry } from "@/content/proof-index";
import { Prose } from "@/components/profile/prose";

const page = getPageContent("/proof");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/proof" },
};

// The three entries CONTENT.proof_index lists as checkable directly, right
// now, without a conversation or a walkthrough (CONTENT.pages[5]'s
// "publicly-checkable" section — see the note below).
const DIRECTLY_CHECKABLE_IDS = ["linkedin-profile", "upwork-track-record", "verified-client-testimonial"];

function findSection(id: string) {
  return page?.sections.find((section) => section.id === id);
}

function ProofEntryRow({ entry }: { entry: ProofEntry }) {
  return (
    <li id={entry.id} className="scroll-mt-24 border border-(--color-border) p-4">
      <p className="font-semibold">
        {entry.url ? (
          <Link
            href={entry.url}
            className="underline decoration-(--color-border-strong) underline-offset-2 hover:decoration-(--color-ink)"
            target={entry.url.startsWith("http") ? "_blank" : undefined}
            rel={entry.url.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {entry.label}
          </Link>
        ) : (
          entry.label
        )}
      </p>
      <p className="mt-1 text-sm text-(--color-ink-muted)">{entry.whatItProves}</p>
      <p className="mono-label mt-2 text-(--color-ink-muted)">{entry.howToVerify}</p>
    </li>
  );
}

const walkableOnRequest = findSection("walkable-on-request");
const underConfidentiality = findSection("under-confidentiality");
const notClaimed = findSection("not-claimed");

const directEntries = proofIndex.filter((entry) => DIRECTLY_CHECKABLE_IDS.includes(entry.id));
const remainingEntries = proofIndex.filter((entry) => !DIRECTLY_CHECKABLE_IDS.includes(entry.id));

/**
 * Proof index: verifiable-tier facts, walkable-on-request items, the
 * confidentiality boundary, and what is explicitly not claimed.
 *
 * Note: content/pages.ts (foundation-owned) carries four of the five
 * CONTENT.pages[5] sections for this route; its "publicly-checkable"
 * section (heading "Checkable directly, right now") is not present there.
 * That heading and its framing are reproduced verbatim from the gated
 * CONTENT block below rather than invented, and content/pages.ts should be
 * reconciled to include it (see this build's return notes).
 */
export default function ProofPage() {
  return (
    <div className="mx-auto max-w-(--container-max) space-y-12 px-4 py-12 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold sm:text-4xl">{page?.title}</h1>
        {findSection("intro")?.bodyMarkdown ? (
          <div className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">
            <Prose markdown={findSection("intro")!.bodyMarkdown} />
          </div>
        ) : null}
      </header>

      <section aria-labelledby="publicly-checkable-heading">
        <h2 id="publicly-checkable-heading" className="text-2xl font-semibold">
          Checkable directly, right now
        </h2>
        <ul className="mt-4 space-y-4">
          {directEntries.map((entry) => (
            <ProofEntryRow key={entry.id} entry={entry} />
          ))}
        </ul>
      </section>

      {walkableOnRequest ? (
        <section aria-labelledby="walkable-on-request-heading">
          <h2 id="walkable-on-request-heading" className="text-2xl font-semibold">
            {walkableOnRequest.heading}
          </h2>
          <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
            <Prose markdown={walkableOnRequest.bodyMarkdown} />
          </div>
        </section>
      ) : null}

      <section aria-labelledby="proof-index-heading">
        <h2 id="proof-index-heading" className="text-2xl font-semibold">
          The engineering patterns behind each claim
        </h2>
        <p className="mt-2 max-w-(--measure-prose) text-sm text-(--color-ink-muted)">
          These are the citations behind every claim on this site — each one anchors from a{" "}
          <code className="mono-label rounded-sm bg-(--color-canvas-raised) px-1 py-0.5">proof</code> badge in the
          case studies.
        </p>
        <ul className="mt-4 space-y-4">
          {remainingEntries.map((entry) => (
            <ProofEntryRow key={entry.id} entry={entry} />
          ))}
        </ul>
      </section>

      {underConfidentiality ? (
        <section aria-labelledby="under-confidentiality-heading">
          <h2 id="under-confidentiality-heading" className="text-2xl font-semibold">
            {underConfidentiality.heading}
          </h2>
          <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
            <Prose markdown={underConfidentiality.bodyMarkdown} />
          </div>
        </section>
      ) : null}

      {notClaimed ? (
        <section aria-labelledby="not-claimed-heading">
          <h2 id="not-claimed-heading" className="text-2xl font-semibold">
            {notClaimed.heading}
          </h2>
          {notClaimed.bodyMarkdown ? (
            <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
              <Prose markdown={notClaimed.bodyMarkdown} />
            </div>
          ) : null}
          {notClaimed.items.length > 0 ? (
            <ul className="mt-3 max-w-(--measure-prose) list-disc space-y-2 pl-6 text-(--color-ink-muted)">
              {notClaimed.items.map((item) => (
                <li key={item}>
                  <Prose markdown={item} className="mt-0 inline" />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
