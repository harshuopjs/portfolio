import { site } from "@/data/site";

export type Repo = {
  name: string;
  owner: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  updated: string;
  fork: boolean;
  archived: boolean;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string | null;
  updated_at: string;
  fork: boolean;
  archived: boolean;
};

export type RepoResult = { repos: Repo[]; failed: string[] };

async function fetchAccount(user: string): Promise<Repo[] | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const all: ApiRepo[] = [];
  try {
    for (let page = 1; page <= 5; page++) {
      const res = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=100&type=owner&page=${page}`, {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) return page === 1 ? null : mapRepos(user, all);
      const batch = (await res.json()) as ApiRepo[];
      all.push(...batch);
      if (batch.length < 100) break;
    }
    return mapRepos(user, all);
  } catch {
    return all.length ? mapRepos(user, all) : null;
  }
}

function mapRepos(user: string, data: ApiRepo[]): Repo[] {
  return data
    .filter((r) => !site.hiddenRepos.includes(r.name))
    .map((r) => ({
      name: r.name,
      owner: user,
      description: r.description,
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      updated: r.pushed_at ?? r.updated_at,
      fork: r.fork,
      archived: r.archived,
    }));
}

export async function getRepos(): Promise<RepoResult | null> {
  const results = await Promise.all(site.githubAccounts.map((a) => fetchAccount(a.user)));
  if (results.every((r) => r === null)) return null;
  const failed = site.githubAccounts.filter((_, i) => results[i] === null).map((a) => a.user);
  const repos = results.flatMap((r) => r ?? []).sort((a, b) => Date.parse(b.updated) - Date.parse(a.updated));
  return { repos, failed };
}
