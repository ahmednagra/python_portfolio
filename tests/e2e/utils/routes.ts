/**
 * Every static route in the build spec, with the primary heading text each
 * one is expected to render. Kept as a single source of truth for the
 * per-route specs, rather than duplicating the list across files.
 */
export const STATIC_ROUTES: readonly { path: string; name: string }[] = [
  { path: "/", name: "home" },
  { path: "/hire", name: "hire" },
  { path: "/problems", name: "problems index" },
  { path: "/work", name: "work index" },
  { path: "/about", name: "about" },
  { path: "/proof", name: "proof" },
  { path: "/writing", name: "writing index" },
  { path: "/contact", name: "contact" },
];

export const PROBLEM_KEYS = [
  "billing-quota-correctness",
  "tenant-isolation",
  "vertical-ownership",
  "resilient-data-capture",
] as const;

export const CASE_STUDY_SLUGS = [
  "billing-correctness-under-concurrency",
  "tenant-isolation-by-default",
  "designing-for-a-hostile-target",
  "shipping-a-vertical-end-to-end",
] as const;

export const ARTICLE_SLUGS = ["what-a-play-console-release-actually-checks"] as const;
