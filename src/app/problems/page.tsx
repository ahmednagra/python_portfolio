import type { Metadata } from "next";
import { Suspense } from "react";
import { getPageContent } from "@/content/pages";
import { problems } from "@/content/problems";
import { engagementModels } from "@/content/engagement-models";
import { Button } from "@/components/ui/button";
import { InlineMarkdown } from "@/components/audience/inline-markdown";
import { ProblemsCatalog, ProblemsList } from "@/components/audience/problems-catalog";

const page = getPageContent("/problems");
const introSection = page?.sections.find((s) => s.id === "intro");
const engagementSection = page?.sections.find((s) => s.id === "engagement-models");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/problems" },
  openGraph: {
    title: page?.title,
    description: page?.metaDescription,
    url: "/problems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page?.title,
    description: page?.metaDescription,
  },
};

export default function ProblemsPage() {
  return (
    <div className="mx-auto max-w-(--container-max) space-y-14 px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-(--measure-prose)">
        <h1 className="text-3xl font-semibold text-balance sm:text-4xl">{introSection?.heading}</h1>
        <div className="mt-4 text-lg text-(--color-ink-muted)">
          {introSection ? <InlineMarkdown text={introSection.bodyMarkdown} /> : null}
        </div>
      </header>

      <section aria-label="The problems I fix">
        <Suspense fallback={<ProblemsList problems={problems} />}>
          <ProblemsCatalog problems={problems} />
        </Suspense>
      </section>

      <section aria-labelledby="engagement-models-heading" className="border-t border-(--color-border) pt-10">
        <h2 id="engagement-models-heading" className="text-2xl font-semibold">
          {engagementSection?.heading}
        </h2>
        <div className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">
          {engagementSection ? <InlineMarkdown text={engagementSection.bodyMarkdown} /> : null}
        </div>

        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {engagementModels
            .filter((model) => model.name !== "Full-time role conversation")
            .map((model) => (
              <div key={model.name} className="border border-(--color-border) bg-(--color-canvas-raised) p-5">
                <dt className="font-semibold">{model.name}</dt>
                <dd className="mt-2 text-sm text-(--color-ink-muted)">{model.when}</dd>
                <dd className="mt-3 text-sm text-(--color-ink)">{model.howItWorks}</dd>
              </div>
            ))}
        </dl>

        <div className="mt-8">
          <Button href="/contact?intent=fix">{engagementSection?.ctaLabel || "Start the conversation"}</Button>
        </div>
      </section>
    </div>
  );
}
