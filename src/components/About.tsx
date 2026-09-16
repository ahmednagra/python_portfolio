import { profile } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-16 scroll-mt-20">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold tracking-tight">
        <span className="font-mono text-emerald-600 dark:text-emerald-400">01.</span>
        About Me
      </h2>
      <p className="max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        {profile.bio}
      </p>
    </section>
  );
}
