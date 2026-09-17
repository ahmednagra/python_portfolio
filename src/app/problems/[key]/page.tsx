import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProblemByKey, problems } from "@/content/problems";
import { ProblemDetail } from "@/components/audience/problem-detail";
import { ContactPath } from "@/components/profile/contact-path";

export function generateStaticParams() {
  return problems.map((problem) => ({ key: problem.key }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const problem = getProblemByKey(key);
  const title = problem ? `${problem.title} — Muhammad Ahmed` : "Problem — Muhammad Ahmed";
  const description = problem?.symptomInBuyerLanguage;
  return {
    title,
    description,
    alternates: { canonical: `/problems/${key}` },
    openGraph: {
      title,
      description,
      url: `/problems/${key}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ProblemDetailPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const problem = getProblemByKey(key);

  if (!problem) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-(--container-max) space-y-10 px-4 py-12 sm:px-6 sm:py-16">
      <nav aria-label="Breadcrumb" className="mono-label text-(--color-ink-muted)">
        <Link href="/problems" className="underline underline-offset-4 hover:text-(--color-tone-signal)">
          Problems I fix
        </Link>
      </nav>

      <ProblemDetail problem={problem} headingLevel="h1" />

      <section aria-labelledby="contact-heading" className="border-t border-(--color-border) pt-10">
        <h2 id="contact-heading" className="sr-only">
          Start a conversation about this problem
        </h2>
        <Suspense fallback={null}>
          <ContactPath intent="fix" refKey={key} />
        </Suspense>
      </section>
    </div>
  );
}
