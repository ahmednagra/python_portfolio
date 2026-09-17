/**
 * How-I-work / engagement model content, used on / and /problems.
 * Source: CONTENT.engagement_models (gated content). Foundation-owned.
 */

export interface EngagementModel {
  name: string;
  when: string;
  howItWorks: string;
}

export const engagementModels: EngagementModel[] = [
  {
    name: "Fixed-scope diagnostic and fix",
    when: "One specific, well-bounded problem — a quota count that drifts under load, a webhook that double-charges, a tenant-isolation gap someone found in review.",
    howItWorks:
      "Start with the failure mode described in plain terms, plus logs or a reproduction where one exists. Scope is agreed before work starts, and the fix is delivered against that agreed scope. No timeline or cost is quoted before the scope is read.",
  },
  {
    name: "Retained or multi-month ownership",
    when: "A product vertical needs building or rebuilding end to end, or a correctness-critical subsystem — billing, quota, tenant isolation — needs a named owner rather than a rotating ticket queue.",
    howItWorks:
      "Structured as an ongoing engagement rather than a series of one-off tickets, matching the shape of the strongest prior engagement — a multi-month recurring data-infrastructure contract. Starts with a short scoping conversation about what a full vertical or subsystem actually includes.",
  },
  {
    name: "Full-time role conversation",
    when: "Lahore-based engineering teams evaluating a full-stack hire for a permanent seat.",
    howItWorks:
      "The fastest path is a direct conversation against the engineering profile and proof index — what is measured, what is self-reported, and what is explicitly not claimed. Happy to walk through any of it, including the parts of the record that are still thin.",
  },
];
