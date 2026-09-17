import type { Metadata } from "next";
import { Suspense } from "react";
import { getPageContent } from "@/content/pages";
import { CaseStudyCatalog, CaseStudyGrid } from "@/components/work/case-study-catalog";
import { getClearedCaseStudies } from "@/components/work/case-studies";

const page = getPageContent("/work");
const caseStudies = getClearedCaseStudies();

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/work" },
  openGraph: {
    title: page?.title,
    description: page?.metaDescription,
    url: "/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: page?.title,
    description: page?.metaDescription,
  },
};

export default function WorkIndexPage() {
  return (
    <div className="mx-auto max-w-(--container-max) space-y-10 px-4 py-12 sm:px-6">
      <div>
        <h1 className="text-3xl font-semibold">{page?.sections[0]?.heading}</h1>
        <p className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">
          {page?.sections[0]?.bodyMarkdown}
        </p>
      </div>

      <Suspense fallback={<CaseStudyGrid caseStudies={caseStudies} />}>
        <CaseStudyCatalog caseStudies={caseStudies} />
      </Suspense>
    </div>
  );
}
