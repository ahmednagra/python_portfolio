import { Suspense } from "react";
import { InlineMarkdown } from "@/components/home/inline-markdown";
import { ContactPath } from "@/components/profile/contact-path";

export type ContactCtaProps = {
  heading: string;
  bodyMarkdown: string;
};

/**
 * Final "start a conversation" block. ContactPath reads ?intent=/?ref= in
 * the browser (see its own contract note), so it is wrapped in Suspense
 * here to keep this route statically rendered end to end.
 */
export function ContactCta({ heading, bodyMarkdown }: ContactCtaProps) {
  return (
    <section aria-labelledby="contact-cta-heading" className="border-t border-(--color-border) pt-12 pb-4">
      <h2 id="contact-cta-heading" className="text-2xl font-semibold text-(--color-ink)">
        {heading}
      </h2>
      <div className="mt-3 max-w-(--measure-prose) text-(--color-ink-muted)">
        <InlineMarkdown text={bodyMarkdown} />
      </div>
      <div className="mt-6">
        <Suspense fallback={null}>
          <ContactPath />
        </Suspense>
      </div>
    </section>
  );
}
