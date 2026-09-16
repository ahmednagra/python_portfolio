# Muhammad Ahmed — Portfolio

Personal developer portfolio built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS**.

Live at: https://github.com/ahmednagra

## Features

- Server-rendered project grid that pulls repositories live from the [GitHub REST API](https://docs.github.com/en/rest), sorted by stars, with hourly ISR revalidation.
- A dedicated `/api/repos` route so the same data can be consumed by other clients (e.g. a future mobile app).
- Sections for About, Skills, Projects, and Contact.
- Dark-mode aware, fully responsive, accessible semantic markup.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, Turbopack)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project Structure

```
src/
├── app/
│   ├── api/repos/route.ts   # GitHub repos API route (server-side, cached)
│   ├── layout.tsx
│   └── page.tsx
├── components/               # Header, Hero, About, Skills, Projects, Contact, Footer
└── lib/data.ts                # Static profile/skills/experience content
```

## Configuration

The GitHub username used to fetch projects is set in `src/app/api/repos/route.ts` and `src/components/Projects.tsx` (`GITHUB_USERNAME`). Update the static profile info in `src/lib/data.ts`.

## Deployment

Deploy on [Vercel](https://vercel.com/new) — zero configuration required.

## License

MIT
