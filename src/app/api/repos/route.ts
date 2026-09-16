import { NextResponse } from "next/server";

const GITHUB_USERNAME = "ahmednagra";

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

// Revalidate hourly so we don't hammer the GitHub API on every request.
export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch repositories" },
        { status: res.status }
      );
    }

    const repos: Repo[] = await res.json();

    const filtered = repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json(
      { error: "Unexpected error fetching repositories" },
      { status: 500 }
    );
  }
}
