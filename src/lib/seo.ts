import { site } from "@/content/site";

/**
 * Resolves the site's canonical absolute origin. Set NEXT_PUBLIC_SITE_URL
 * in the deployment environment for correct absolute OG/canonical/JSON-LD
 * URLs — every one of those resolves through this function at build time
 * (this is a static-first/SSG site), so a missing var would otherwise be
 * silently baked into the deployed HTML, sitemap, robots.txt and JSON-LD.
 *
 * In a production build (`NODE_ENV === "production"`) with no CI escape
 * hatch set, a missing var fails the build loudly instead. Local dev and
 * preview builds (and CI runs that explicitly opt out via
 * SITE_URL_FALLBACK_OK) fall back to localhost so they never crash.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured && configured.length > 0) {
    return configured;
  }

  if (process.env.NODE_ENV === "production" && process.env.SITE_URL_FALLBACK_OK !== "true") {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL is not set. Production builds are static-first (SSG): every canonical URL, " +
        "OG tag, sitemap entry and JSON-LD block is baked in at build time, so a missing value would " +
        "silently ship with localhost URLs. Set NEXT_PUBLIC_SITE_URL, or set SITE_URL_FALLBACK_OK=true " +
        "to explicitly allow the localhost fallback for this build."
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
