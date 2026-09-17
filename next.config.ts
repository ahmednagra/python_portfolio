import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const isDev = process.env.NODE_ENV === "development";

/**
 * Strict, static-friendly CSP. No nonce: nonces require per-request dynamic
 * rendering (Next.js only injects them during SSR), which conflicts with
 * this site's static-first (SSG) requirement. `script-src 'self'` with no
 * 'unsafe-inline' is safe alongside the inline JSON-LD in the root layout,
 * because CSP's script-src only restricts executable script MIME types —
 * `application/ld+json` is inert data and is not subject to it. The one
 * executable inline behavior this site needs (theme restoration before
 * paint) is shipped as a same-origin file (/theme-init.js), so it is
 * already covered by 'self' without any inline allowance.
 */
// NOTE: script-src includes 'unsafe-inline' because the App Router emits
// inline <script>self.__next_f.push(...)</script> tags on every page to
// stream the RSC/flight payload to the client, with no opt-out short of
// dynamic (per-request) rendering, which conflicts with this site's
// static-first requirement. Confirmed by live-browser testing against both
// `next dev` and `next start`: without 'unsafe-inline' these were silently
// blocked, which broke client hydration entirely (a React "Minified error
// #412" hydration failure plus a Turbopack invariant error in the
// console) — the stricter policy was not narrowing real attack surface, it
// was breaking the app. object-src 'none', frame-ancestors 'none',
// base-uri 'self' and form-action 'self' remain the load-bearing
// protections here.
const cspDirectives = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // 'unsafe-inline' here covers next/font's inline @font-face declarations
  // (Tailwind itself ships as a normal external stylesheet in this build,
  // not inlined critical CSS). This is build-time, non-user content, so
  // the XSS risk a CSP style-src normally guards against does not apply
  // the way it would for script-src. Re-verify against the built output
  // (.next/static/chunks/*.css) whenever next/font's output changes.
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  typedRoutes: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: cspDirectives.join("; ") },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
          },
          // Strict-Transport-Security is added once the domain is confirmed
          // permanently HTTPS-only. Do not enable HSTS preload submission
          // without explicit owner sign-off (binding constraint).
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: ["rehype-slug", ["rehype-pretty-code", { theme: "github-light" }]],
  },
});

export default withMDX(nextConfig);
