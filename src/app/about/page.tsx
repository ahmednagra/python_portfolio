import type { Metadata } from "next";
import { getPageContent } from "@/content/pages";
import { site } from "@/content/site";
import { Prose } from "@/components/profile/prose";

const page = getPageContent("/about");

export const metadata: Metadata = {
  title: page?.title,
  description: page?.metaDescription,
  alternates: { canonical: "/about" },
};

/**
 * Engineering profile: career shape, what is/isn't claimed, how to verify.
 * Content is entirely sourced from content/pages.ts (route "/about"), which
 * is itself the gated CONTENT.pages[4] block — no wording is added here.
 */
export default function AboutPage() {
  const identity = page?.sections.find((section) => section.id === "identity");
  const rest = page?.sections.filter((section) => section.id !== "identity") ?? [];

  return (
    <div className="mx-auto max-w-(--container-max) px-4 py-12 sm:px-6">
      <header>
        <p className="mono-label text-(--color-ink-muted)">{site.location}</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{identity?.heading ?? site.name}</h1>
        {identity?.bodyMarkdown ? (
          <div className="mt-4 max-w-(--measure-prose) text-(--color-ink-muted)">
            <Prose markdown={identity.bodyMarkdown} />
          </div>
        ) : null}
      </header>

      <div className="mt-12 space-y-12">
        {rest.map((section) => (
          <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2 id={`${section.id}-heading`} className="text-2xl font-semibold">
              {section.heading}
            </h2>
            {section.bodyMarkdown ? (
              <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
                <Prose markdown={section.bodyMarkdown} />
              </div>
            ) : null}
            {section.items.length > 0 ? (
              <ul className="mt-3 max-w-(--measure-prose) list-disc space-y-2 pl-6 text-(--color-ink-muted)">
                {section.items.map((item) => (
                  <li key={item}>
                    <Prose markdown={item} className="mt-0 inline" />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>
    </div>
  );
}
