"use client";
import { ExternalLink, GitFork, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import type { Repo } from "@/lib/github";

type Sort = "updated" | "stars" | "name";
const PAGE = 12;

export function GitHubExplorer({ repos, accounts }: { repos: Repo[]; accounts: string[] }) {
  const [account, setAccount] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState<Sort>("updated");
  const [q, setQ] = useState("");
  const [visible, setVisible] = useState(PAGE);

  const languages = useMemo(() => [...new Set(repos.map((r) => r.language).filter((l): l is string => Boolean(l)))].sort(), [repos]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    const filtered = repos.filter(
      (r) =>
        (account === "all" || r.owner === account) &&
        (language === "all" || r.language === language) &&
        (!s || `${r.name} ${r.description ?? ""} ${r.language ?? ""}`.toLowerCase().includes(s)),
    );
    return filtered.sort((a, b) => {
      if (sort === "stars") return b.stars - a.stars || Date.parse(b.updated) - Date.parse(a.updated);
      if (sort === "name") return a.name.localeCompare(b.name);
      return Date.parse(b.updated) - Date.parse(a.updated);
    });
  }, [repos, account, language, sort, q]);

  const count = (owner: string) => repos.filter((r) => r.owner === owner).length;
  const reset = () => setVisible(PAGE);
  const control = "h-10 rounded-full border border-line bg-transparent px-3 text-sm";

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" role="group" aria-label="Filter repositories by account">
        {["all", ...accounts].map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={account === a}
            onClick={() => {
              setAccount(a);
              reset();
            }}
            className={`min-h-9 border-b pb-0.5 transition-colors ${account === a ? "border-accent-fg text-fg" : "border-transparent text-muted hover:text-fg"}`}
          >
            {a === "all" ? `All (${repos.length})` : `${a} (${count(a)})`}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <span className="sr-only">Search repositories</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              reset();
            }}
            placeholder="Search repositories..."
            className={`${control} w-full pl-9`}
          />
        </label>
        <label>
          <span className="sr-only">Filter by language</span>
          <select
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              reset();
            }}
            className={`${control} w-full sm:w-44`}
          >
            <option value="all">All languages</option>
            {languages.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="sr-only">Sort repositories</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={`${control} w-full sm:w-44`}>
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
            <option value="name">Name (A to Z)</option>
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-muted" aria-live="polite">
        Showing {Math.min(visible, list.length)} of {list.length} repositories
      </p>

      {list.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-line p-8 text-center text-muted">
          No repositories match.{" "}
          <button
            type="button"
            className="underline"
            onClick={() => {
              setAccount("all");
              setLanguage("all");
              setQ("");
              reset();
            }}
          >
            Clear filters
          </button>
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, visible).map((r) => (
            <li key={`${r.owner}/${r.name}`}>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="card spot flex h-full flex-col p-5 transition-colors hover:border-accent-fg">
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-sm font-semibold">{r.name}</span>
                    <span className="block truncate font-mono text-xs text-muted">{r.owner}</span>
                  </span>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-label="opens in new tab" />
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.description ?? "No description provided."}</span>
                <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted">
                  {r.language && <span className="chip">{r.language}</span>}
                  {r.fork && <span className="chip">fork</span>}
                  {r.archived && <span className="chip">archived</span>}
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" aria-hidden /> {r.stars}
                    <span className="sr-only"> stars</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5" aria-hidden /> {r.forks}
                    <span className="sr-only"> forks</span>
                  </span>
                  <span>Updated {new Date(r.updated).toLocaleDateString("en", { month: "short", year: "numeric" })}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {visible < list.length && (
        <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-secondary mt-6">
          Show {Math.min(PAGE, list.length - visible)} more
        </button>
      )}
    </div>
  );
}
