/**
 * Two-audience content (companies hiring / teams with a production problem).
 * Source: CONTENT.audiences (gated content). Foundation-owned.
 */

export type AudienceKey = "companies-hiring" | "teams-with-production-issues";

export interface Audience {
  key: AudienceKey;
  label: string;
  who: string;
  promise: string;
  proofPoints: string[];
  whatTheyNeedIn30Seconds: string;
  primaryCta: string;
}

export const audiences: Audience[] = [
  {
    key: "companies-hiring",
    label: "Companies Hiring",
    who: "Engineering leads and CTOs — Lahore-based teams considering a full-time seat, and remote-first teams anywhere evaluating a contract or full-stack hire.",
    promise:
      "A full-stack engineer who owns a product vertical end to end — PostgreSQL schema through the API to the React interface — with a measured record of doing exactly that, not a self-description.",
    proofPoints: [
      "119 of 154 backend-active days also carry dashboard commits (77% of backend days, 81% of dashboard days), across nine product domains built on both sides of the stack",
      "Sole author of two standalone platform services — a messaging platform that is architecturally complete but functionally partial, and a capture service that is a prototype with most components designed — with architecture decisions documented at the time they were made",
      "Upwork Top Rated (as of September 2026) with a 100% Job Success Score across 12 completed projects, all rated 5.0 — third-party verifiable",
      "A long infrastructure career (Windows Server administration, a self-reported Red Hat certification) before backend and full-stack work, which shows up as better failure-mode instincts than the backend tenure alone would predict",
    ],
    whatTheyNeedIn30Seconds:
      "One engineer who ships whole features rather than half of one and waiting on a hand-off — with a checkable delivery record on top of the current-role evidence.",
    primaryCta: "Read the engineering profile and proof index, then start a conversation",
  },
  {
    key: "teams-with-production-issues",
    label: "Teams With a Production Problem",
    who: "Founders and engineering leads — local or global — with a specific, proof-backed problem: billing or quota behaving wrong under concurrency, duplicate webhook charges, a tenant-isolation gap, or a product vertical that needs building end to end.",
    promise:
      "A named engineer who has already built and shipped the exact class of fix you need, and says plainly what is proven versus what is not.",
    proofPoints: [
      "Row-level database locking on quota consumption, with every mutation writing a durable audit record so the counter and the event log cannot silently diverge",
      "Webhook idempotency enforced at the database boundary — a unique delivery id absorbs duplicate gateway callbacks, with handlers underneath separately idempotent",
      "Sole-authored, schema-isolated multi-tenant service using row-level security with tenant bound at transaction start, rather than a WHERE-clause discipline every query has to remember",
      "Honest build-state labeling carried into every write-up — a component described as designed is never described as running",
    ],
    whatTheyNeedIn30Seconds:
      "The correctness problems that get expensive later — billing, quota, webhooks, tenant isolation — described from someone who has actually built the fix, with the trade-offs stated rather than hidden.",
    primaryCta: "Describe the failure mode and start a scoped fix engagement",
  },
];
