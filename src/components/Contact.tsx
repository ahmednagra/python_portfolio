import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center scroll-mt-20"
    >
      <h2 className="font-mono text-emerald-600 dark:text-emerald-400">04. What&apos;s Next?</h2>
      <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Get In Touch</h3>
      <p className="max-w-md text-zinc-600 dark:text-zinc-400">
        I&apos;m open to new opportunities and freelance projects. Feel free to reach out.
      </p>
      <a
        href={`mailto:${profile.email}`}
        className="rounded-full border border-zinc-300 px-8 py-3 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        Say Hello
      </a>
    </section>
  );
}
