/**
 * Problem catalog content for /problems and /problems/[key].
 * Source: CONTENT.problems (gated content). Foundation-owned.
 */

export type ProblemKey =
  | "billing-quota-correctness"
  | "tenant-isolation"
  | "vertical-ownership"
  | "resilient-data-capture";

export interface Problem {
  key: ProblemKey;
  title: string;
  symptomInBuyerLanguage: string;
  whyItHappens: string;
  howIApproachIt: string;
  whatYouGet: string;
  proofText: string;
  relatedCaseStudy: string;
  audienceFit: string;
}

export const problems: Problem[] = [
  {
    key: "billing-quota-correctness",
    title: "Billing and quota that drift under concurrency",
    symptomInBuyerLanguage:
      "Two requests hit the same usage counter at the same moment and one unit of billable usage disappears. Or a payment webhook fires twice and a customer gets charged twice. Nobody can reconstruct which happened until support escalates it.",
    whyItHappens:
      "Read-modify-write quota logic in application code loses updates under real concurrency — two requests both read the same value, both increment it, and one increment is silently lost. Payment gateways retry by design, and any webhook handler that assumes a callback arrives exactly once is already wrong; it is only a question of when it shows.",
    howIApproachIt:
      "Move quota consumption to a database row lock (`SELECT ... FOR UPDATE`) rather than an application-level lock, so the guarantee survives multiple instances. Write every counter mutation and its immutable audit event in the same transaction, so a disagreement between the counter and the log becomes the alarm rather than a mystery. Enforce webhook idempotency at the database boundary with a unique constraint on the provider's delivery id, with individual handlers separately idempotent underneath that as a second layer.",
    whatYouGet:
      "A quota and billing path that is provably correct under concurrent access, with duplicate deliveries absorbed rather than double-processed, and an audit trail that answers a billing dispute without guesswork.",
    proofText:
      "Built and shipped in a production multi-tenant SaaS billing subsystem — dominant author of the webhook handler and top author of the quota-locking work, on a team-built platform with contributors beyond myself.",
    relatedCaseStudy: "billing-correctness-under-concurrency",
    audienceFit: "Founders and engineering leads at post-revenue SaaS products, especially plan-based or usage-metered pricing",
  },
  {
    key: "tenant-isolation",
    title: "Multi-tenant isolation that depends on developers remembering a WHERE clause",
    symptomInBuyerLanguage:
      "Tenant isolation currently lives in application code discipline — every query has to remember to filter by tenant. One missed filter, one new engineer, one refactor, and it is a data leak rather than a bug.",
    whyItHappens:
      "Application-level filtering scales with the number of queries and the number of engineers touching them. It is correct until exactly one of them is not, and by the time that shows up it is a security incident rather than a code review comment.",
    howIApproachIt:
      "Move the isolation boundary into the database with row-level security, binding tenant identity at transaction start rather than trusting it to be re-applied per query. Pair it with per-partner authenticated webhooks and secrets held by reference rather than by value, so rotating a credential never touches code or data.",
    whatYouGet:
      "Isolation that survives a bug in application code, because the database enforces it rather than trusting every query to. The stated cost is real and worth knowing upfront: every connection has to bind tenant context at transaction start, which constrains connection pooling.",
    proofText:
      "Sole author of a standalone multi-tenant service built this way end to end — schema-isolated tenancy, row-level security, tenant bound at transaction start, and per-partner HMAC-verified inbound webhooks. Stated plainly: this service is architecturally complete but functionally partial — not every downstream integration is wired to a live provider yet, and that build state is not hidden.",
    relatedCaseStudy: "tenant-isolation-by-default",
    audienceFit: "Teams building or retrofitting multi-tenant SaaS, especially ahead of a security review or an enterprise customer's due diligence",
  },
  {
    key: "vertical-ownership",
    title: "A product vertical that needs shipping end to end, not split across a hand-off",
    symptomInBuyerLanguage:
      "A feature request touches the database schema, the API, and the interface. It usually becomes a backend ticket, a frontend ticket, a contract mismatch discovered late, and two sprints instead of one.",
    whyItHappens:
      "Specialization is efficient at scale and expensive at the size where one person owning the whole vertical would be faster and cheaper — the coordination overhead between two specialists on one feature often costs more than the specialization saves.",
    howIApproachIt:
      "Design the endpoint and the client that consumes it together rather than in sequence — the schema and migration, the service and route, then the typed API client, the shared query cache, and the interface, as one continuous piece of work rather than a hand-off at the network boundary.",
    whatYouGet:
      "One person who can be asked about the whole feature, not the half of it they touched. No contract mismatch discovered after the frontend is already built against a guess.",
    proofText:
      "Measured, not self-described: 119 of 154 backend-active days also carried commits to the same product's dashboard, across nine product domains with substantial work on both sides — a count taken directly from commit history, with its basis stated.",
    relatedCaseStudy: "shipping-a-vertical-end-to-end",
    audienceFit: "Small teams (roughly 5–40 people) where one full-stack owner is worth more than two specialists coordinating",
  },
  {
    key: "resilient-data-capture",
    title: "A data extraction or capture pipeline that keeps breaking",
    symptomInBuyerLanguage:
      "The target site changes and the scraper breaks. A parsing bug means the whole capture run has to be redone from scratch, because nothing was kept from the failed attempt.",
    whyItHappens:
      "Extraction pipelines that parse a response and discard the original bytes in the same step lose everything when a parser has a bug — there is no way to reprocess without re-fetching, which is slower, riskier, and sometimes impossible if the page has already changed again.",
    howIApproachIt:
      "Separate capture from parsing: store the raw response before any parsing happens, then run a versioned parser against it. A parser bug becomes a reprocessing job against stored data rather than a lost capture run. Layer an admission gate that fails closed, session pools with identity health and recovery, and per-address token budgets underneath the fetch layer itself.",
    whatYouGet:
      "A capture system that survives a hostile or fast-changing target and a buggy parser without losing the underlying data either way.",
    proofText:
      "Sole author of a capture-service prototype built on this design. Separately, a third-party-verifiable Upwork record: Top Rated (as of September 2026), 100% Job Success Score, 12 completed projects at 5.0, plus his own stated history of data-extraction and ETL client work.",
    relatedCaseStudy: "designing-for-a-hostile-target",
    audienceFit: "Data-driven businesses running lead generation, price intelligence, or listings aggregation",
  },
];

export function getProblemByKey(key: string): Problem | undefined {
  return problems.find((problem) => problem.key === key);
}
