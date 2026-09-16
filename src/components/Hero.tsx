import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-24 sm:py-32">
      <p className="font-mono text-sm text-emerald-600 dark:text-emerald-400">
        Hi, my name is
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {profile.name}.
      </h1>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-500 sm:text-5xl">
        {profile.role}.
      </h2>
      <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {profile.tagline}
      </p>
      <div className="flex gap-4 pt-4">
        <a
          href="#projects"
          className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          View my work
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
