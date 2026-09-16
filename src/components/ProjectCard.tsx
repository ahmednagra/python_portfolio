import type { Repo } from "@/app/api/repos/route";

export default function ProjectCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.homepage || repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col justify-between rounded-xl border border-zinc-200 p-6 transition-colors hover:border-emerald-500 dark:border-zinc-800"
    >
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-lg group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
            {repo.name}
          </h3>
          {repo.language && (
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {repo.language}
            </span>
          )}
        </div>
        <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          {repo.description || "No description provided."}
        </p>
      </div>
      <div className="flex items-center gap-4 text-xs text-zinc-500">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
      </div>
    </a>
  );
}
