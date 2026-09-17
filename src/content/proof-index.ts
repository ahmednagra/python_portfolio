/**
 * Proof index entries for /proof.
 * Source: CONTENT.proof_index (gated content). Foundation-owned.
 *
 * Note: this file records cleared, publishable verification text only.
 * It never references internal proof-tracking row identifiers.
 */

export interface ProofEntry {
  /** Stable anchor slug for this entry on /proof — used by <ProofRef id="…" />. */
  id: string;
  label: string;
  url: string;
  whatItProves: string;
  howToVerify: string;
}

export const proofIndex: ProofEntry[] = [
  {
    id: "linkedin-profile",
    label: "LinkedIn profile",
    url: "https://www.linkedin.com/in/muhammad-ahmed-126466233",
    whatItProves: "Current title, employment history, and certifications, as a live third-party-hosted record",
    howToVerify:
      "Open the profile directly; the Experience section lists Echooo.AI (Oct 2025–present) and the Upwork freelance history (Nov 2022–present).",
  },
  {
    id: "upwork-track-record",
    label: "Upwork track record",
    url: "",
    whatItProves: "Top Rated status (as of September 2026, a rolling badge), 100% Job Success Score, and 12 completed projects at a 5.0 rating",
    howToVerify:
      "Profile link shared directly on request, consistent with Upwork's own conduct rules around off-platform solicitation before a contract exists.",
  },
  {
    id: "verified-client-testimonial",
    label: "A verified client testimonial",
    url: "",
    whatItProves: "Third-party feedback on technical skill, communication, and adaptability from a completed Upwork engagement",
    howToVerify: "Quoted and attributed to a verified Upwork client; full context available on request",
  },
  {
    id: "quota-locking-pattern",
    label: "Row-level quota locking pattern (billing case study)",
    url: "/work/billing-correctness-under-concurrency",
    whatItProves: "Concurrency-correct quota consumption via database-level locking, with an audit trail per mutation",
    howToVerify:
      "The underlying source is employer-confidential; the pattern is described in full in the case study and can be walked through directly on a call",
  },
  {
    id: "webhook-idempotency-pattern",
    label: "Webhook idempotency pattern (billing case study)",
    url: "/work/billing-correctness-under-concurrency",
    whatItProves: "Duplicate payment-webhook deliveries absorbed at the database boundary rather than processed twice",
    howToVerify: "Same as above — described in the case study, walkable in a live conversation",
  },
  {
    id: "tenant-isolation-pattern",
    label: "Row-level security tenant isolation (messaging service case study)",
    url: "/work/tenant-isolation-by-default",
    whatItProves: "Sole-authored multi-tenant architecture using database-enforced isolation rather than application-level filtering",
    howToVerify: "Described in the case study with its build-state caveats stated explicitly; walkable in a call",
  },
  {
    id: "capture-pipeline-design",
    label: "Capture-pipeline design (data-capture case study)",
    url: "/work/designing-for-a-hostile-target",
    whatItProves: "Sole-authored resilient extraction architecture: raw-store-before-parse, versioned parsers, admission gate, session health",
    howToVerify: "Described in the case study with its own documented build-state labels preserved",
  },
  {
    id: "vertical-ownership-measurement",
    label: "Vertical-ownership measurement (product-platform case study)",
    url: "/work/shipping-a-vertical-end-to-end",
    whatItProves: "A commit-history-derived measurement of cross-stack ownership, not a self-description",
    howToVerify: "Methodology and basis (branch, author identities, measurement date) stated in the case study itself",
  },
  {
    id: "rhcsa-certification",
    label: "Red Hat Certified System Administrator (RHCSA)",
    url: "",
    whatItProves: "A self-reported systems administration credential from earlier in the infrastructure career",
    howToVerify: "Self-reported credential; no public verification artifact currently available",
  },
  {
    id: "cisco-cybersecurity-certification",
    label: "Cisco Cybersecurity Specialist certification",
    url: "",
    whatItProves: "A verifiable issued credential with an associated credential ID",
    howToVerify: "Credential ID and issuer verification link shared on request",
  },
];
