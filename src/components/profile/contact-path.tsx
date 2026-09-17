"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { site } from "@/content/site";
import { Button } from "@/components/ui/button";

export type ContactPathProps = {
  intent?: "hire" | "fix" | "other";
  /**
   * Deviation from the literal components_contract (which names this field
   * `ref`): React reserves `ref` as a special JSX prop on every component,
   * server or client, and refuses to deliver it as a regular prop at all —
   * `<ContactPath ref="…" />` throws "Refs cannot be used in Server
   * Components" at build time, since these are Server Component pages, not
   * a lint nitpick. `refKey` preserves the exact same meaning (the ?ref=
   * query value identifying the referring problem/case-study) under a
   * name React does not intercept.
   */
  refKey?: string;
};

type Intent = NonNullable<ContactPathProps["intent"]>;

const INTENT_LABEL: Record<Intent, string> = {
  hire: "Hiring for a role",
  fix: "Have a production problem",
  other: "Something else",
};

const GREETING: Record<Intent, string> = {
  hire: "Evaluating a full-stack hire?",
  fix: "Have a production problem to describe?",
  other: "Want to get in touch?",
};

const HINT: Record<Intent, string> = {
  hire: "Useful to include: the team's stack, size, and what a full-stack owner would actually be responsible for.",
  fix: "Useful to include: the failure mode in plain terms, plus logs or a reproduction where one exists.",
  other: "Say what you're after — a role, a problem, or something else — and it goes from there.",
};

const SUBJECT_PREFIX: Record<Intent, string> = {
  hire: "Role",
  fix: "Production problem",
  other: "Hello",
};

function isIntent(value: string | null): value is Intent {
  return value === "hire" || value === "fix" || value === "other";
}

/**
 * Single intent-aware contact path. Everything here composes a `mailto:`
 * link in the browser — there is no form submission, no server endpoint,
 * and no field is ever collected or stored anywhere but the visitor's own
 * email draft. The plain email address is always visible as a fallback,
 * independent of whether JavaScript on this page runs at all.
 *
 * Reads `?intent` and `?ref` via useSearchParams (a Client Component) so
 * /contact itself can stay statically rendered — see the comment on
 * app/contact/page.tsx for why a server-side `searchParams` read was
 * rejected.
 */
export function ContactPath({ intent: intentProp, refKey: refKeyProp }: ContactPathProps) {
  const searchParams = useSearchParams();
  const queryIntent = searchParams.get("intent");
  const initialIntent = intentProp ?? (isIntent(queryIntent) ? queryIntent : "other");
  const refKey = refKeyProp ?? searchParams.get("ref") ?? undefined;

  const [intent, setIntent] = React.useState<Intent>(initialIntent);
  const [name, setName] = React.useState("");
  const [details, setDetails] = React.useState("");

  const mailtoHref = React.useMemo(() => {
    const subjectParts = [SUBJECT_PREFIX[intent]];
    if (refKey) subjectParts.push(`(${refKey})`);
    const subject = subjectParts.join(" ");

    const bodyLines: string[] = [];
    if (name.trim()) bodyLines.push(`From: ${name.trim()}`);
    if (details.trim()) bodyLines.push("", details.trim());

    const params = new URLSearchParams();
    params.set("subject", subject);
    if (bodyLines.length > 0) params.set("body", bodyLines.join("\n"));

    return `mailto:${site.email}?${params.toString().replace(/\+/g, "%20")}`;
  }, [intent, refKey, name, details]);

  return (
    <div className="border border-(--color-border) p-6">
      <fieldset>
        <legend className="mono-label text-(--color-ink-muted)">What&apos;s this about?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(INTENT_LABEL) as Intent[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={intent === value}
              onClick={() => setIntent(value)}
              className={`mono-label min-h-[44px] border px-4 transition-colors motion-safe:duration-(--duration-ui) motion-safe:ease-(--ease-standard) ${
                intent === value
                  ? "border-(--color-signal) text-(--color-tone-signal)"
                  : "border-(--color-border-strong) text-(--color-ink) hover:bg-(--color-canvas-raised)"
              }`}
            >
              {INTENT_LABEL[value]}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="mt-5 text-lg font-semibold">{GREETING[intent]}</p>
      <p className="mt-1 text-sm text-(--color-ink-muted)">{HINT[intent]}</p>

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="contact-name" className="mono-label block text-(--color-ink-muted)">
            Name (optional)
          </label>
          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            className="mt-1 min-h-[44px] w-full max-w-sm border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-(--color-ink) outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:ring-offset-2"
          />
        </div>
        <div>
          <label htmlFor="contact-details" className="mono-label block text-(--color-ink-muted)">
            {intent === "fix" ? "The failure mode, in your own words (optional)" : "What you'd like to say (optional)"}
          </label>
          <textarea
            id="contact-details"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            rows={4}
            className="mt-1 w-full border border-(--color-border-strong) bg-(--color-canvas) px-3 py-2 text-(--color-ink) outline-none focus-visible:ring-2 focus-visible:ring-(--focus-ring-color) focus-visible:ring-offset-2"
          />
        </div>
      </div>

      <p className="mt-4 text-sm text-(--color-ink-muted)">
        Nothing above is sent anywhere by this page — it only fills in the email your own mail app opens next.
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <Button href={mailtoHref}>Open email to {site.name.split(" ")[0]}</Button>
        <a
          href={`mailto:${site.email}`}
          className="mono-label text-(--color-ink-muted) underline decoration-(--color-border-strong) underline-offset-2 hover:text-(--color-ink) hover:decoration-(--color-ink)"
        >
          or email {site.email} directly
        </a>
      </div>
    </div>
  );
}
