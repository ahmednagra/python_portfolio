import type * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpecRow } from "@/components/ui/spec-row";

export type HeroSplitProps = {
  hire: {
    eyebrow: string;
    statement: string;
    facts: { label: string; value: string }[];
    ctaLabel: string;
    ctaHref: string;
  };
  fix: {
    eyebrow: string;
    statement: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

/**
 * Simultaneous two-register hero. HIRE and FIX read as equally weighted
 * panels (stacked on mobile, split by a static SVG ruler from sm up) rather
 * than a single narrative with an audience toggle — the split itself is the
 * message. The only motion is a guarded ~180ms opacity/transform settle on
 * first paint; the ruler and its "ONE ENGINEER / TWO LENSES" label never
 * animate.
 */
export function HeroSplit({ hire, fix }: HeroSplitProps) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes home-hero-settle {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        }
      `}</style>
      <HeroPanel
        tone="signal"
        eyebrow={hire.eyebrow}
        statement={hire.statement}
        ctaLabel={hire.ctaLabel}
        ctaHref={hire.ctaHref}
        ctaVariant="primary"
      >
        {hire.facts.length > 0 ? (
          <div className="mt-6 border-t border-(--color-border) pt-4">
            {hire.facts.map((fact) => (
              <SpecRow key={fact.label} label={fact.label} value={fact.value} />
            ))}
          </div>
        ) : null}
      </HeroPanel>

      <RulerDivider />

      <HeroPanel
        tone="neutral"
        eyebrow={fix.eyebrow}
        statement={fix.statement}
        ctaLabel={fix.ctaLabel}
        ctaHref={fix.ctaHref}
        ctaVariant="secondary"
      />
    </div>
  );
}

type HeroPanelProps = {
  tone: "signal" | "neutral";
  eyebrow: string;
  statement: string;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary";
  children?: React.ReactNode;
};

function HeroPanel({ tone, eyebrow, statement, ctaLabel, ctaHref, ctaVariant, children }: HeroPanelProps) {
  return (
    <div
      className={
        "motion-safe:[animation:home-hero-settle_var(--duration-ui-slow)_var(--ease-standard)_both] " +
        "flex flex-col border border-(--color-border) bg-(--color-canvas-raised) p-6 sm:p-7"
      }
    >
      <Badge tone={tone}>{eyebrow}</Badge>
      <p className="mt-4 text-xl leading-snug sm:text-2xl">{statement}</p>
      {children}
      <div className="mt-auto pt-6">
        <Button href={ctaHref} variant={ctaVariant}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  );
}

/**
 * Static SVG vertical ruler — the one deliberately clever visual element in
 * the hero (per the Systems Ledger design system), reading top-to-bottom as
 * "ONE ENGINEER / TWO LENSES". Given a role+label so the text it carries has
 * a real accessible name rather than being purely decorative; a matching
 * plain-text label stands in on narrow screens where the ruler is hidden.
 */
function RulerDivider() {
  return (
    <>
      <div className="hidden sm:flex sm:w-10 sm:items-stretch sm:justify-center">
        <svg
          role="img"
          aria-label="One engineer, two lenses"
          viewBox="0 0 40 320"
          preserveAspectRatio="none"
          className="h-full w-10 text-(--color-border-strong)"
        >
          <line x1="20" y1="0" x2="20" y2="320" stroke="currentColor" strokeWidth="1" />
          {Array.from({ length: 9 }, (_, i) => i * 40).map((y) => (
            <line
              key={y}
              x1="14"
              y1={y}
              x2="26"
              y2={y}
              stroke="currentColor"
              strokeWidth="1"
            />
          ))}
          <circle cx="20" cy="160" r="4" style={{ fill: "var(--color-signal)" }} />
          <text
            x="20"
            y="70"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="1"
            fill="currentColor"
            transform="rotate(-90 20 70)"
          >
            ONE ENGINEER
          </text>
          <text
            x="20"
            y="250"
            textAnchor="middle"
            fontSize="9"
            fontFamily="var(--font-mono)"
            letterSpacing="1"
            fill="currentColor"
            transform="rotate(-90 20 250)"
          >
            TWO LENSES
          </text>
        </svg>
      </div>
      <p className="mono-label text-center text-(--color-ink-muted) sm:hidden">
        ONE ENGINEER — TWO LENSES
      </p>
    </>
  );
}
