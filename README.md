# Muhammad Ahmed — Portfolio

A statically-rendered portfolio site for Muhammad Ahmed, Full Stack Engineer, built to serve two audiences equally: companies evaluating a full-stack hire, and teams or founders with a specific production problem to fix.

## Stack

- **Framework:** Next.js 16.3.5 (App Router), React 19.2.8
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4.3.x via `@tailwindcss/postcss`
- **Content:** MDX (`@next/mdx`) for case studies and articles
- **Package manager:** pnpm 11, Node.js 24
- **Testing:** Vitest + Testing Library (unit), Playwright + axe-core (end-to-end accessibility)

## Scripts

| Command            | Purpose                              |
| ------------------ | ------------------------------------- |
| `pnpm dev`          | Start the development server          |
| `pnpm build`        | Production build (static export of every route) |
| `pnpm start`        | Serve the production build            |
| `pnpm lint`         | ESLint                                |
| `pnpm typecheck`    | `tsc --noEmit`                        |
| `pnpm test`         | Unit tests (Vitest)                   |
| `pnpm test:watch`   | Unit tests in watch mode              |
| `pnpm test:e2e`     | End-to-end tests (Playwright)         |

## Project structure

- `src/app/**` — routes (App Router)
- `src/components/ui/**` — shared design-system primitives (Button, Card, Badge, …)
- `src/components/layout/**` — header, footer, skip link, theme toggle, audience switch
- `src/components/diagrams/**` — the four interactive mechanism explainers
- `src/content/**` — typed site content and MDX case studies/articles
- `src/lib/**` — SEO/JSON-LD helpers and shared utilities

## Content rules

Every claim on this site is backed by a specific, verifiable piece of evidence and is worded to match how well it can actually be verified (measured fact, third-party-verifiable record, or the author's own stated recollection — never an unverifiable claim stated as fact). Employer-confidential detail (schemas, endpoints, vendor names, internal metrics) is never published; case studies describe problem shape and architecture decisions, not implementation detail that would identify a specific employer system. No GitHub repository is linked anywhere on the site.

## Accessibility and performance

The site targets WCAG 2.2 AA (semantic landmarks, visible focus, keyboard support for every interactive control, `prefers-reduced-motion` honored throughout) and a static-first, JS-light delivery model — but accessibility conformance is implemented, not advertised, in the site's own copy.
