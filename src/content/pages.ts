/**
 * Block-level section copy for every static route.
 * Source: CONTENT.pages (gated content). Foundation-owned.
 *
 * `bodyMarkdown` fields contain simple inline markdown (bold, links) that
 * consuming components may render with a minimal inline-markdown renderer
 * or treat as plain text — no block-level markdown (headings, lists as
 * markdown syntax) is required beyond what is already modeled in `items`.
 */

export interface PageSection {
  id: string;
  heading: string;
  bodyMarkdown: string;
  items: string[];
  ctaLabel: string;
  ctaHref: string;
}

export interface PageContent {
  route: string;
  title: string;
  metaDescription: string;
  sections: PageSection[];
}

export const pages: PageContent[] = [
  {
    route: "/",
    title: "Muhammad Ahmed — Full Stack Engineer",
    metaDescription:
      "Full-stack engineer shipping complete product verticals in multi-tenant SaaS, specialising in billing, quota, payments and tenant isolation. Upwork Top Rated (as of September 2026), 100% JSS.",
    sections: [
      {
        id: "hero",
        heading: "I ship the whole feature, not half of it",
        bodyMarkdown:
          "Full Stack Engineer working on both sides of the seam that usually gets split across two people and a hand-off — the PostgreSQL schema and migration, the service and the route, then the typed client, the cache layer and the interface that consumes it.\n\nThe parts I specialise in are the ones where approximately right is the same as wrong: billing, quota, payments, and tenant isolation.",
        items: [],
        ctaLabel: "See how the work is proven",
        ctaHref: "/proof",
      },
      {
        id: "two-audiences",
        heading: "Two ways to work with me",
        bodyMarkdown:
          "**Hiring a full-stack engineer** — Lahore-based or fully remote. Read the [engineering profile](/about) and the [proof index](/proof), then start a conversation.\n\n**Have a specific production problem** — billing wrong under concurrency, duplicate webhook charges, a tenant-isolation gap, or a vertical that needs shipping end to end. See the [problems catalog](/problems) and start with the failure mode, not a job description.",
        items: [],
        ctaLabel: "Talk about a role",
        ctaHref: "/hire",
      },
      {
        id: "proof-strip",
        heading: "Measured, not self-described",
        bodyMarkdown: "",
        items: [
          "119 of 154 backend-active days also carry commits to the same product's dashboard",
          "Nine product domains with substantial work on both the backend and the frontend",
          "Upwork Top Rated (as of September 2026), 100% Job Success Score, 12 completed projects, all rated 5.0",
          "Sole author of two standalone platform services — one architecturally complete but functionally partial, the other a prototype with most components designed",
        ],
        ctaLabel: "Read the full proof index",
        ctaHref: "/proof",
      },
      {
        id: "case-studies-teaser",
        heading: "Case studies",
        bodyMarkdown:
          "Four write-ups, each standing on its own: a billing subsystem that survives duplicate webhooks and concurrent quota access, a multi-tenant messaging service isolated at the database layer, a capture pipeline designed for a platform that resists it, and a measured account of shipping product verticals end to end.",
        items: [
          "Getting Billing Right When Everything Arrives Twice",
          "Tenant Isolation You Cannot Forget to Apply",
          "Designing a Capture System for a Platform That Is Actively Trying to Stop You",
          "Shipping a Product Vertical End to End, Not Split Across a Hand-Off",
        ],
        ctaLabel: "Read the case studies",
        ctaHref: "/work",
      },
      {
        id: "final-cta",
        heading: "Start a conversation",
        bodyMarkdown: "Whether it's a role or a specific problem, the fastest way in is to describe it directly.",
        items: [],
        ctaLabel: "Contact",
        ctaHref: "/contact",
      },
    ],
  },
  {
    route: "/work",
    title: "Case Studies — Muhammad Ahmed",
    metaDescription:
      "Four sanitized case studies: billing correctness under concurrency, tenant isolation by database design, resilient data capture, and full-stack vertical ownership — each measured or attributed precisely.",
    sections: [
      {
        id: "intro",
        heading: "Case studies",
        bodyMarkdown:
          "Each of these stands alone — sent as an individual link, read without the rest of the site. Every one states its attribution precisely (sole author versus contributor on a team platform) and its build state exactly as the underlying project documents it, including where a component is designed but not yet running.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "list",
        heading: "The four",
        bodyMarkdown:
          "**[Getting Billing Right When Everything Arrives Twice](/work/billing-correctness-under-concurrency)** — quota consumption under real concurrency, and payment webhooks that redeliver by design. Contributor, dominant author of the webhook handler.\n\n**[Tenant Isolation You Cannot Forget to Apply](/work/tenant-isolation-by-default)** — moving multi-tenant isolation into the database rather than trusting application-code discipline. Sole author — architecturally complete, functionally partial (the outbound integration isn't wired up yet).\n\n**[Designing a Capture System for a Platform That Is Actively Trying to Stop You](/work/designing-for-a-hostile-target)** — a resilient extraction architecture for a hostile, fast-changing target. Sole author, stated plainly as a prototype.\n\n**[Shipping a Product Vertical End to End](/work/shipping-a-vertical-end-to-end)** — a measured account of owning a feature across the database, the API, and the interface, rather than splitting it across a hand-off. Contributor, major, on both halves.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
    ],
  },
  {
    route: "/hire",
    title: "Hiring — Muhammad Ahmed, Full Stack Engineer",
    metaDescription:
      "Considering a full-stack engineer for a permanent role or a long-term contract, Lahore-based or fully remote. Measured cross-stack ownership plus a third-party verified delivery record.",
    sections: [
      {
        id: "who-this-is-for",
        heading: "For engineering leads evaluating a full-stack hire",
        bodyMarkdown:
          "Lahore-based teams considering a permanent seat, and remote-first teams anywhere evaluating a full-stack contract or hire — this page is for you.\n\nThe pitch is simple: one engineer who owns a product vertical end to end, with a measured record of doing exactly that, plus a third-party verifiable delivery history from four years of freelance client work.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "what-you-get",
        heading: "What the evidence actually supports",
        bodyMarkdown:
          "What is **not** claimed: frontend specialization (no design-system authorship, no accessibility audit artifact, no frontend test suite), architecture ownership of an entire team-built platform, or any metric — revenue, users, uptime, latency — that was never actually measured.",
        items: [
          "Substantial work on both the backend and the frontend across nine product domains of a production SaaS platform, measured by commit-day overlap, not self-described",
          "Sole authorship of two standalone platform services, including the architecture decisions behind them — a messaging platform that is architecturally complete but functionally partial, and a capture service that is a prototype with most components designed",
          "A specialisation in correctness under concurrency — row-locked quota consumption, database-enforced webhook idempotency, row-level tenant isolation",
          "A third-party verifiable delivery record: Upwork Top Rated (as of September 2026), 100% Job Success Score, 12 completed projects, all rated 5.0",
          "An infrastructure decade before backend work — Windows Server administration and a self-reported Red Hat certification — which shows up as sound failure-mode instincts",
        ],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "how-it-starts",
        heading: "How a role conversation starts",
        bodyMarkdown:
          "The fastest way in is a direct conversation against the [engineering profile](/about) and the [proof index](/proof) — including the parts of the record that are honestly thin. No résumé keyword game; the evidence is either there or it is named as not there.",
        items: [],
        ctaLabel: "Contact",
        ctaHref: "/contact",
      },
    ],
  },
  {
    route: "/problems",
    title: "Problems I Fix — Muhammad Ahmed",
    metaDescription:
      "A proof-backed catalog of the production problems I fix: billing and quota drift under concurrency, tenant isolation, vertical feature ownership, and resilient data capture.",
    sections: [
      {
        id: "intro",
        heading: "What I actually fix",
        bodyMarkdown:
          "Every entry here maps to something already built and evidenced — not a generic services list. If your problem isn't shaped like one of these, it is probably not a good fit, and that is worth knowing before we talk.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "engagement-models",
        heading: "How this starts",
        bodyMarkdown:
          "Describe the failure mode in your own words, with logs or a reproduction where one exists, and we'll go from there.",
        items: [],
        ctaLabel: "Start the conversation",
        ctaHref: "/contact",
      },
    ],
  },
  {
    route: "/about",
    title: "About — Muhammad Ahmed, Engineering Profile",
    metaDescription:
      "A long infrastructure career, then backend and full-stack product engineering since late 2022. What is proven, what is measured, and what is deliberately not claimed.",
    sections: [
      {
        id: "identity",
        heading: "Muhammad Ahmed",
        bodyMarkdown: "Full Stack Engineer based in Lahore, Pakistan, working with teams locally and remotely worldwide.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "career-shape",
        heading: "The shape of the career, not one number",
        bodyMarkdown:
          "Roughly **11.5 years** in IT overall, starting as a Windows Server administrator in 2015 — networking, security, systems administration, seven and a half years of it. Roughly **3.9 years** in backend and full-stack product engineering, starting November 2022, split between full-time employment and freelance client work running in parallel.\n\nThat infrastructure decade is not background noise — it is why the failure-mode instincts on distributed and concurrent systems are better than 3.9 years of backend work alone would predict.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "what-i-do-now",
        heading: "What the work actually is",
        bodyMarkdown:
          "Currently working across a FastAPI backend and a Next.js dashboard on a team-built, multi-tenant SaaS product — schema and migration, service and route, then the API client, cache layer, and interface. Substantial work on both sides of nine product domains, including subscription billing, quota enforcement, messaging, and payments.\n\nSeparately, sole author of two standalone platform services: a schema-isolated multi-tenant messaging platform and a resilient multi-platform data-capture service — a messaging platform that is architecturally complete but functionally partial, and a capture service that is a prototype with most components designed.\n\nAlongside that: four years of freelance client work in data extraction, anti-bot capture, ETL, and AI-integrated pipelines — Upwork Top Rated (as of September 2026), 100% Job Success Score, 12 completed projects at 5.0.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "what-i-dont-claim",
        heading: "What I don't claim",
        bodyMarkdown: "",
        items: [
          "Not a frontend specialist — no design-system authorship, no accessibility audit artifact, no frontend test suite",
          "Not the sole architect of the team-built platform — a major contributor, not the sole author",
          "No multi-instance scheduler-safety claim — that guarantee does not exist in the code, and I can describe the failure mode precisely because I went looking for it and found it",
          "No revenue, user-count, uptime, or latency figures — none of these were ever measured, so none are stated",
        ],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "credibility",
        heading: "Why this is checkable",
        bodyMarkdown:
          "A third-party-verified delivery record (Upwork), a measured — not self-described — cross-stack ownership pattern, sole authorship of two documented platform services, and a habit of stating build state exactly as the underlying project states it. See the full breakdown on the [proof index](/proof).",
        items: [],
        ctaLabel: "See the proof",
        ctaHref: "/proof",
      },
    ],
  },
  {
    route: "/proof",
    title: "Proof Index — Muhammad Ahmed",
    metaDescription:
      "What can be independently verified, what is checkable on request, and what sits under employer confidentiality — stated plainly rather than asserted.",
    sections: [
      {
        id: "intro",
        heading: "What can actually be checked",
        bodyMarkdown:
          "Every claim on this site maps to a specific piece of evidence, classified honestly: independently verifiable, verifiable on request, self-reported, or explicitly not claimed. Nothing here is asserted without a basis.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "walkable-on-request",
        heading: "Verifiable in a conversation",
        bodyMarkdown:
          "The engineering substance behind every case study — the locking pattern, the idempotency design, the row-level security approach, the capture pipeline's boundary — lives in employer-confidential source code that cannot be linked or excerpted publicly. It can be walked through directly, in detail, on a call. That is a more honest offer than a screenshot that proves nothing.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "under-confidentiality",
        heading: "What stays under confidentiality, and why",
        bodyMarkdown:
          "Employer table names, column names, endpoint paths, payment-gateway vendor names, client and customer names, internal business metrics, and deployment configuration are never published, regardless of employment-agreement permission to discuss the work in general. The transformation applied everywhere on this site is from implementation detail to problem shape: a competent engineer should learn something from reading it; a competitor should learn nothing specific.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
      {
        id: "not-claimed",
        heading: "Explicitly not claimed",
        bodyMarkdown:
          "No GitHub repository is linked from this site. No revenue, user-count, uptime, or latency figure appears anywhere, because none was ever measured. No claim of \"architecting\" a team platform, and no claim that any scheduled job here is safe across multiple running instances — the opposite is true, and it's stated that way.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
    ],
  },
  {
    route: "/writing",
    title: "Writing — Muhammad Ahmed",
    metaDescription: "Short, specific write-ups from real engineering work — no invented lessons, no manufactured takes.",
    sections: [
      {
        id: "intro",
        heading: "Writing",
        bodyMarkdown: "Every piece here starts from something that actually happened. If there's no real event behind it, it doesn't get written.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
    ],
  },
  {
    route: "/contact",
    title: "Contact — Muhammad Ahmed",
    metaDescription: "Start a conversation about a full-stack role or a specific production problem — billing, quota, tenant isolation, or a vertical that needs shipping.",
    sections: [
      {
        id: "how-to-reach-me",
        heading: "Get in touch",
        bodyMarkdown:
          "Email is the most direct path: **ahmednagra9@gmail.com**\n\nAlso reachable on [LinkedIn](https://www.linkedin.com/in/muhammad-ahmed-126466233). Upwork profile (Top Rated as of September 2026, 100% Job Success Score) shared directly on request.\n\nBased in Lahore, Pakistan (UTC+5). Selectively taking scoped fix engagements alongside full-time work, and open to a full-time role conversation for the right team.",
        items: [],
        ctaLabel: "Email me",
        ctaHref: "mailto:ahmednagra9@gmail.com",
      },
      {
        id: "what-to-include",
        heading: "What's useful to include",
        bodyMarkdown:
          "For a production problem: the failure mode in plain terms, and logs or a reproduction where one exists. For a role: the team's stack, size, and what a full-stack owner would actually be responsible for.",
        items: [],
        ctaLabel: "",
        ctaHref: "",
      },
    ],
  },
];

export function getPageContent(route: string): PageContent | undefined {
  return pages.find((page) => page.route === route);
}
