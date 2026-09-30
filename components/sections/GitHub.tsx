import { Suspense } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { getRepos } from "@/lib/github";
import { GitHubExplorer } from "./GitHubExplorer";
import { Section } from "../ui/Section";
import { GithubIcon } from "../ui/icons";

function Skeleton() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading repositories">
      {[0, 1, 2].map((i) => (
        <li key={i} className="card h-36 animate-pulse bg-surface-2" />
      ))}
    </ul>
  );
}

async function Repos() {
  const result = await getRepos();

  if (result === null) {
    return (
      <div>
        <p role="status" className="rounded-lg border border-line bg-surface p-4 text-sm text-muted">
          Live repository data couldn&apos;t be loaded right now. Here are the projects from my resume; all repositories are on{" "}
          my GitHub accounts, {site.githubAccounts.map((a, i) => (
            <span key={a.user}>
              {i > 0 && " and "}
              <a className="text-accent-fg underline" href={a.url} target="_blank" rel="noopener noreferrer">{a.user}</a>
            </span>
          ))}.
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug} className="card p-5">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.category}</p>
              <p className="mt-3 text-xs text-muted">{p.stack.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (result.repos.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-line p-8 text-center text-muted">
        No public repositories to show yet. Visit my{" "}
        <a className="text-accent-fg underline" href={site.github} target="_blank" rel="noopener noreferrer">GitHub profile</a>.
      </p>
    );
  }

  return (
    <>
      {result.failed.length > 0 && (
        <p role="status" className="mb-4 rounded-lg border border-line bg-surface p-4 text-sm text-muted">
          Could not load repositories for {result.failed.join(" and ")} right now. The rest are shown below.
        </p>
      )}
      <GitHubExplorer repos={result.repos} accounts={site.githubAccounts.map((a) => a.user)} />
    </>
  );
}

export function GitHub() {
  return (
    <Section
      id="github"
      n="06"
      label="Open source"
      title={<>On <em className="text-accent-fg">GitHub</em></>}
      intro="Every public repository from both of my GitHub accounts, pulled live from the GitHub API. Filter, search and sort below."
    >
      <Suspense fallback={<Skeleton />}>
        <Repos />
      </Suspense>
      <div className="mt-8 flex flex-wrap gap-3">
        {site.githubAccounts.map((a) => (
          <a key={a.user} href={a.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <GithubIcon className="h-4 w-4" /> {a.user}
          </a>
        ))}
      </div>
    </Section>
  );
}
