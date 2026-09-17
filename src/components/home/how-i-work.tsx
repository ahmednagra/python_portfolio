import type { EngagementModel } from "@/content/engagement-models";

export type HowIWorkProps = {
  models: EngagementModel[];
};

/**
 * "How I work" as a plain two-row list per engagement model (name + when,
 * then how it works) — deliberately not another row of cards.
 */
export function HowIWork({ models }: HowIWorkProps) {
  return (
    <section aria-labelledby="how-i-work-heading" className="border-t border-(--color-border) pt-12">
      <h2 id="how-i-work-heading" className="text-2xl font-semibold text-(--color-ink)">
        How I work
      </h2>
      <dl className="mt-6 space-y-6">
        {models.map((model) => (
          <div key={model.name} className="grid gap-x-8 gap-y-1 sm:grid-cols-[minmax(0,220px)_1fr]">
            <dt className="font-semibold text-(--color-ink)">{model.name}</dt>
            <dd className="text-(--color-ink-muted)">
              <p>{model.when}</p>
              <p className="mt-2">{model.howItWorks}</p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
