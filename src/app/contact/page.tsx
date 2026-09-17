import type { Metadata } from "next";
import { Suspense } from "react";
import { getPageContent } from "@/content/pages";
import { ContactPath } from "@/components/profile/contact-path";
import { Prose } from "@/components/profile/prose";
import { site } from "@/content/site";

const page = getPageContent("/contact");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/contact" },
};

/**
 * Single intent-aware contact path (?intent=hire|fix|other), canonical
 * email fallback, no fake urgency. ContactPath reads ?intent/?ref
 * client-side via useSearchParams (wrapped in Suspense) instead of this
 * page reading `searchParams` as a server prop, which would force dynamic
 * rendering — see the comment on ContactPath for why.
 */
export default function ContactPage() {
  const howToReachMe = page?.sections.find((section) => section.id === "how-to-reach-me");
  const whatToInclude = page?.sections.find((section) => section.id === "what-to-include");

  return (
    <div className="mx-auto max-w-(--container-max) space-y-10 px-4 py-12 sm:px-6">
      <header>
        <h1 className="text-3xl font-semibold sm:text-4xl">{howToReachMe?.heading ?? page?.title}</h1>
        {howToReachMe?.bodyMarkdown ? (
          <div className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">
            <Prose markdown={howToReachMe.bodyMarkdown} />
          </div>
        ) : null}
        <p className="mono-label mt-4 text-(--color-ink-muted)">
          {site.location} — {site.timezone}
        </p>
        <p className="mt-2 max-w-(--measure-prose) text-sm text-(--color-ink-muted)">{site.availabilityNote}</p>
      </header>

      <Suspense fallback={null}>
        <ContactPath />
      </Suspense>

      {whatToInclude ? (
        <section aria-labelledby="what-to-include-heading">
          <h2 id="what-to-include-heading" className="text-xl font-semibold">
            {whatToInclude.heading}
          </h2>
          <div className="mt-2 max-w-(--measure-prose) text-(--color-ink-muted)">
            <Prose markdown={whatToInclude.bodyMarkdown} />
          </div>
        </section>
      ) : null}
    </div>
  );
}
