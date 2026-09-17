import { site } from "@/content/site";

/**
 * Resolves the site's canonical absolute origin. Every absolute
 * OG/canonical/JSON-LD/sitemap URL resolves through this function at build
 * time (this is a static-first/SSG site), so a wrong value would otherwise
 * be silently baked into the deployed HTML, sitemap, robots.txt and JSON-LD.
 *
 * Resolution order:
 * 1. NEXT_PUBLIC_SITE_URL, if explicitly set — always wins, so a custom
 *    domain overrides everything else once one is attached.
 * 2. On Vercel, VERCEL_PROJECT_PRODUCTION_URL (the project's stable
 *    production domain, present on every build — preview or production)
 *    or, failing that, VERCEL_URL (this specific deployment's own domain).
 *    Vercel sets these automatically; neither is ever localhost, which is
 *    the actual failure mode this function guards against, so trusting
 *    them here is safe without any extra configuration on a fresh project.
 * 3. In a production build (`NODE_ENV === "production"`) on a platform
 *    that sets none of the above, fail the build loudly instead of
 *    guessing — this is the real guard: a bare `next build` with no
 *    platform and no explicit URL has no correct answer to fall back to.
 *    SITE_URL_FALLBACK_OK explicitly opts out for CI/local-verification
 *    builds that don't care about the exact baked-in URL.
 * 4. Local dev falls back to localhost so it never needs configuration.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && configured.length > 0) {
    return configured;
  }

  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  if (process.env.NODE_ENV === "production" && process.env.SITE_URL_FALLBACK_OK !== "true") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set and no Vercel deployment URL was detected " +
        "(VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL). Production builds are static-first (SSG): " +
        "every canonical URL, OG tag, sitemap entry and JSON-LD block is baked in at build time, so a " +
        "missing value would silently ship with localhost URLs. Set NEXT_PUBLIC_SITE_URL explicitly " +
        "(recommended once a custom domain is attached), deploy on Vercel, or set " +
        "SITE_URL_FALLBACK_OK=true to explicitly allow the localhost fallback for this build."
    );
  }

  return "http://localhost:3000";
}

/** Person JSON-LD, rendered once in the root layout. */
export function personJsonLd() {
  const sameAs = [site.linkedinUrl, site.upworkUrl].filter((url): url is string => url.length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.title,
    url: getSiteUrl(),
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

/** WebSite JSON-LD, rendered once in the root layout alongside Person. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: getSiteUrl(),
  };
}

/** BreadcrumbList JSON-LD for a two-level route (index -> detail page). */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.path}`,
    })),
  };
}
