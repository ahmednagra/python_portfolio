import type { Metadata } from "next";
import { HeroSplit } from "@/components/home/hero-split";
import { AudienceLens } from "@/components/home/audience-lens";
import { ProblemCatalogPreview } from "@/components/home/problem-catalog-preview";
import { CaseStudySpotlight } from "@/components/home/case-study-spotlight";
import { ProofStrip } from "@/components/home/proof-strip";
import { HowIWork } from "@/components/home/how-i-work";
import { WritingTeaser } from "@/components/home/writing-teaser";
import { ContactCta } from "@/components/home/contact-cta";
import { InlineMarkdown } from "@/components/home/inline-markdown";
import { audiences } from "@/content/audiences";
import { problems } from "@/content/problems";
import { engagementModels } from "@/content/engagement-models";
import { getPageContent } from "@/content/pages";

const page = getPageContent("/");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: page?.title,
    description: page?.metaDescription,
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page?.title,
    description: page?.metaDescription,
  },
};

function section(id: string) {
  const found = page?.sections.find((s) => s.id === id);
  if (!found) {
    throw new Error(`Missing home page section "${id}" in content/pages.ts`);
  }
  return found;
}

export default function HomePage() {
  const hire = audiences.find((a) => a.key === "companies-hiring")!;
  const fix = audiences.find((a) => a.key === "teams-with-production-issues")!;

  const heroSection = section("hero");
  const audienceSection = section("two-audiences");
  const proofSection = section("proof-strip");
  const caseStudiesSection = section("case-studies-teaser");
  const contactSection = section("final-cta");

  return (
    <div className="mx-auto max-w-(--container-max) space-y-16 px-4 py-12 sm:px-6 sm:py-16">
      <section aria-labelledby="hero-heading">
        <h1
          id="hero-heading"
          className="max-w-(--measure-prose) text-(length:--font-size-display) leading-(--line-height-display) font-semibold tracking-(--letter-spacing-display) text-balance"
        >
          {heroSection.heading}
        </h1>
        <div className="mt-4 max-w-(--measure-prose) text-lg text-(--color-ink-muted)">
          <InlineMarkdown text={heroSection.bodyMarkdown} />
        </div>

        <div className="mt-10">
          <HeroSplit
            hire={{
              eyebrow: hire.label,
              statement: hire.promise,
              facts: [
                { label: "Backend/dashboard overlap", value: "119/154 days" },
                { label: "Upwork Job Success", value: "100%" },
                { label: "Completed projects", value: "12 @ 5.0" },
              ],
              ctaLabel: "Talk about a role",
              ctaHref: "/hire",
            }}
            fix={{
              eyebrow: fix.label,
              statement: fix.promise,
              ctaLabel: "Describe the problem",
              ctaHref: "/problems",
            }}
          />
        </div>
      </section>

      <AudienceLens heading={audienceSection.heading} bodyMarkdown={audienceSection.bodyMarkdown} />

      <ProblemCatalogPreview problems={problems.slice(0, 3)} />

      <CaseStudySpotlight heading={caseStudiesSection.heading} bodyMarkdown={caseStudiesSection.bodyMarkdown} />

      <ProofStrip
        heading={proofSection.heading}
        rows={[
          { label: "Backend/dashboard commit overlap", value: "119 of 154 days" },
          { label: "Product domains with dual-side work", value: "9" },
          { label: "Upwork Job Success Score", value: "100%" },
          { label: "Upwork completed projects", value: "12 at 5.0" },
          { label: "Sole-authored platform services", value: "2" },
        ]}
      />

      <HowIWork models={engagementModels} />

      <WritingTeaser
        article={{
          slug: "what-a-play-console-release-actually-checks",
          title: "What Google Play Actually Checks Before It Blocks Your Release",
          date: "2026-09-16",
          summary:
            "Play Console review reads the merged Android manifest of the bundle you upload, not the code you wrote — notes from a real release, including a block over a permission the app's own code never requested.",
        }}
      />

      <ContactCta heading={contactSection.heading} bodyMarkdown={contactSection.bodyMarkdown} />
    </div>
  );
}
