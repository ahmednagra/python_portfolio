import type { Metadata } from "next";
import { Suspense } from "react";
import { getPageContent } from "@/content/pages";
import { audiences } from "@/content/audiences";
import { engagementModels } from "@/content/engagement-models";
import { site } from "@/content/site";
import { ContactPath } from "@/components/profile/contact-path";
import { Badge } from "@/components/ui/badge";
import { InlineMarkdown } from "@/components/audience/inline-markdown";
import { HireEvidence, EvidenceList } from "@/components/audience/hire-evidence";

const page = getPageContent("/hire");
const audience = audiences.find((a) => a.key === "companies-hiring")!;
const fullTimeModel = engagementModels.find((m) => m.name === "Full-time role conversation");

const whoSection = page?.sections.find((s) => s.id === "who-this-is-for");
const whatSection = page?.sections.find((s) => s.id === "what-you-get");
const howSection = page?.sections.find((s) => s.id === "how-it-starts");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/hire" },
  openGraph: {
    title: page?.title,
    description: page?.metaDescription,
    url: "/hire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page?.title,
    description: page?.metaDescription,
  },
};

export default function HirePage() {
  return (
    <div className="mx-auto max-w-(--container-max) space-y-14 px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-(--measure-prose)">
        <Badge tone="signal">{audience.label}</Badge>
        <h1 className="mt-4 text-3xl font-semibold text-balance sm:text-4xl">
          {whoSection?.heading}
        </h1>
        <p className="mono-label mt-2 text-(--color-tone-signal)">
          Lahore-based or fully remote — {site.timezone}
        </p>
        <div className="mt-4 space-y-4 text-lg text-(--color-ink-muted)">
          {whoSection ? <InlineMarkdown text={whoSection.bodyMarkdown} /> : null}
        </div>
        <p className="mono-label mt-6 text-(--color-ink-muted)">
          {audience.who}
        </p>
      </header>

      <section aria-labelledby="what-you-get-heading">
        <h2 id="what-you-get-heading" className="text-2xl font-semibold">
          {whatSection?.heading}
        </h2>

        <div className="mt-6">
          <Suspense fallback={<EvidenceList items={whatSection?.items ?? []} />}>
            <HireEvidence items={whatSection?.items ?? []} />
          </Suspense>
        </div>

        {whatSection ? (
          <div className="mt-8 border border-(--color-border) bg-(--color-canvas-raised) p-5">
            <p className="mono-label text-(--color-ink-muted)">Also worth reading before a call</p>
            <div className="mt-2 text-sm text-(--color-ink)">
              <InlineMarkdown text={whatSection.bodyMarkdown} />
            </div>
          </div>
        ) : null}
      </section>

      <section aria-labelledby="how-it-starts-heading" className="border-t border-(--color-border) pt-10">
        <h2 id="how-it-starts-heading" className="text-2xl font-semibold">
          {howSection?.heading}
        </h2>
        <div className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">
          {howSection ? <InlineMarkdown text={howSection.bodyMarkdown} /> : null}
        </div>

        {fullTimeModel ? (
          <p className="mono-label mt-4 text-(--color-ink-muted)">{fullTimeModel.howItWorks}</p>
        ) : null}

        <p className="mt-4 max-w-(--measure-prose) text-sm text-(--color-ink-muted)">{site.availabilityNote}</p>

        <div className="mt-8">
          <Suspense fallback={null}>
            <ContactPath intent="hire" />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
