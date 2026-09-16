import ProjectCard from "./ProjectCard";
import type { Repo } from "@/app/api/repos/route";
import { profile } from "@/lib/data";

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/ahmednagra/repos?per_page=100&sort=updated`,
      { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const repos: Repo[] = await res.json();
    return repos.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch {
    return [];
  }
}

export default async function Projects() {
  const repos = await getRepos();

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16 scroll-mt-20">
      <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold tracking-tight">
        <span className="font-mono text-emerald-600 dark:text-emerald-400">03.</span>
        Projects
      </h2>
      {repos.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">
          Unable to load projects right now — check out my{" "}
          <a href={profile.github} className="underline">
            GitHub profile
          </a>{" "}
          directly.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.slice(0, 9).map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </section>
  );
}
