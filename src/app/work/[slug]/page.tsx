import type { Metadata } from "next";
import { Suspense, type ComponentType } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyBySlug, getClearedCaseStudies, getAdjacentCaseStudies } from "@/components/work/case-studies";
import { BuildStateTag } from "@/components/ui/build-state-tag";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ContactPath } from "@/components/profile/contact-path";
import { proofIndex } from "@/content/proof-index";
import { problems } from "@/content/problems";
import { breadcrumbJsonLd } from "@/lib/seo";
import { WebhookIdempotencyDiagram } from "@/components/diagrams/webhook-idempotency";
import { TenantIsolationDiagram } from "@/components/diagrams/tenant-isolation";
import { CapturePipelineDiagram } from "@/components/diagrams/capture-pipeline";
import { VerticalOwnershipDiagram } from "@/components/diagrams/vertical-ownership";
import type { DiagramKey } from "@/components/work/case-study-types";

const diagramByKey: Record<DiagramKey, ComponentType<{ autoplay?: false }>> = {
  "webhook-idempotency": WebhookIdempotencyDiagram,
  "tenant-isolation": TenantIsolationDiagram,
  "capture-pipeline": CapturePipelineDiagram,
  "vertical-ownership": VerticalOwnershipDiagram,
};

export function generateStaticParams() {
  return getClearedCaseStudies().map((entry) => ({ slug: entry.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);
  const title = entry ? `${entry.title} — Case Study` : "Case Study";
  const description = entry?.summary30s;
  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title,
      description,
      url: `/work/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getCaseStudyBySlug(slug);

  if (!entry || entry.publicationStatus !== "cleared") {
    notFound();
  }

  // Dynamic MDX import per the case-study slug, per Next.js's documented
  // dynamic-MDX-import pattern (generateStaticParams + dynamicParams=false
  // above prerenders exactly the cleared slugs; any other slug 404s).
  const { default: CaseStudyBody } = await import(`@/content/case-studies/${slug}.mdx`);

  const Diagram = diagramByKey[entry.diagramKey];
  const proofRows = proofIndex.filter((row) => row.url === `/work/${slug}`);
  const relatedProblem = problems.find((problem) => problem.relatedCaseStudy === slug);
  const { previous, next } = getAdjacentCaseStudies(slug);

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Work", path: "/work" },
    { name: entry.title, path: `/work/${slug}` },
  ]);

  return (
    <div className="mx-auto max-w-(--container-max) px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <nav aria-label="Breadcrumb" className="mono-label text-(--color-ink-muted)">
        <Link href="/work" className="underline decoration-(--color-border-strong) underline-offset-2 hover:decoration-(--color-ink)">
          Work
        </Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">{entry.title}</span>
      </nav>

      <header className="mt-4 max-w-(--measure-prose)">
        <div className="flex flex-wrap items-center gap-3">
          <BuildStateTag state={entry.buildState} />
          <Badge tone="neutral">{entry.attributionToken}</Badge>
          {entry.tags.map((tag) => (
            <Badge key={tag} tone="signal">
              {tag}
            </Badge>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{entry.title}</h1>
        <p className="mt-3 text-sm text-(--color-ink-muted)">{entry.attributionLine}</p>
      </header>

      <section
        aria-labelledby="summary-heading"
        className="mt-8 max-w-(--measure-prose) border border-(--color-border) bg-(--color-canvas-raised) p-5"
      >
        <h2 id="summary-heading" className="mono-label text-(--color-ink-muted)">
          30-second summary
        </h2>
        <p className="mt-2">{entry.summary30s}</p>
        <p className="mt-3 text-sm text-(--color-ink-muted)">{entry.buildStateNote}</p>
      </section>

      <article className="prose-editorial mt-10">
        <CaseStudyBody />
      </article>

      <section aria-labelledby="mechanism-heading" className="mt-12">
        <h2 id="mechanism-heading" className="text-2xl font-semibold">
          The mechanism
        </h2>
        <p className="mt-2 max-w-(--measure-prose) text-sm text-(--color-ink-muted)">
          Reader-triggered: nothing below plays on its own. Use Play/Step to walk it, or read the
          text alternative directly.
        </p>
        <div className="mt-6">{Diagram ? <Diagram /> : null}</div>
      </section>

      {proofRows.length > 0 ? (
        <section aria-labelledby="proof-map-heading" className="mt-12 max-w-(--measure-prose)">
          <h2 id="proof-map-heading" className="text-2xl font-semibold">
            Proof map
          </h2>
          <div className="mt-4 divide-y divide-(--color-border) border border-(--color-border)">
            {proofRows.map((row) => (
              <div key={row.id} id={row.id} className="p-4">
                <p className="font-semibold">{row.label}</p>
                <p className="mt-1 text-sm text-(--color-ink-muted)">{row.whatItProves}</p>
                <p className="mt-2 text-sm">{row.howToVerify}</p>
              </div>
            ))}
          </div>
          <p className="mt-3">
            <Link href="/proof" className="underline decoration-(--color-border-strong) underline-offset-2 hover:decoration-(--color-ink)">
              See the full proof index
            </Link>
          </p>
        </section>
      ) : null}

      {relatedProblem ? (
        <section aria-labelledby="related-problem-heading" className="mt-12 max-w-(--measure-prose)">
          <h2 id="related-problem-heading" className="text-2xl font-semibold">
            Who this fits
          </h2>
          <p className="mt-2 text-sm text-(--color-ink-muted)">{entry.audienceFit}</p>
          <div className="mt-4">
            <Card href={`/problems/${relatedProblem.key}`} eyebrow="Related problem">
              <h3 className="text-lg font-semibold">{relatedProblem.title}</h3>
              <p className="mt-2 text-sm text-(--color-ink-muted)">{relatedProblem.symptomInBuyerLanguage}</p>
            </Card>
          </div>
        </section>
      ) : null}

      <div className="mt-12 max-w-(--measure-prose)">
        <Suspense fallback={null}>
          <ContactPath intent="fix" refKey={slug} />
        </Suspense>
      </div>

      <nav aria-label="Case study navigation" className="mt-12 grid gap-4 border-t border-(--color-border) pt-8 sm:grid-cols-2">
        {previous ? (
          <Link
            href={`/work/${previous.slug}`}
            className="group block border border-(--color-border) p-4 hover:border-(--color-border-strong)"
          >
            <span className="mono-label text-(--color-ink-muted)">Previous</span>
            <p className="mt-1 font-semibold">{previous.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/work/${next.slug}`}
            className="group block border border-(--color-border) p-4 text-right hover:border-(--color-border-strong) sm:col-start-2"
          >
            <span className="mono-label text-(--color-ink-muted)">Next</span>
            <p className="mt-1 font-semibold">{next.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
