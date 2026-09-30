"use client";
import { ArrowUpRight, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { projectFilters, projects } from "@/data/projects";
import { ProjectModal } from "../projects/ProjectModal";
import { Section } from "../ui/Section";

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>("All");
  const [q, setQ] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    const h = (e: Event) => setOpenSlug((e as CustomEvent<string>).detail);
    window.addEventListener("open-project", h);
    return () => window.removeEventListener("open-project", h);
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (filter === "All" || p.filter === filter) &&
        (!s || `${p.name} ${p.category} ${p.summary} ${p.stack.join(" ")}`.toLowerCase().includes(s)),
    );
  }, [filter, q]);

  return (
    <Section
      id="projects"
      n="03"
      label="Projects"
      title={<>Things I&apos;ve <em className="text-accent-fg">built</em></>}
      intro="Six projects from my resume. Open one for the problem, my role, the architecture and the engineering details. Everything else is on my GitHub."
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" role="group" aria-label="Filter projects by category">
          {projectFilters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`min-h-9 border-b pb-0.5 transition-colors ${filter === f ? "border-accent-fg text-fg" : "border-transparent text-muted hover:text-fg"}`}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="relative block md:w-64">
          <span className="sr-only">Search projects</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects or tech…"
            className="h-10 w-full rounded-full border border-line bg-transparent pl-9 pr-3 text-sm placeholder:text-muted"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">{list.length} projects shown</p>

      {list.length === 0 ? (
        <p className="mt-10 border-y border-dashed border-line py-12 text-center text-muted">
          Nothing matches. <button type="button" className="underline" onClick={() => { setFilter("All"); setQ(""); }}>Clear filters</button>
        </p>
      ) : (
        <ul className="mt-8 border-t border-line">
          {list.map((p, i) => (
            <li key={p.slug} className="border-b border-line">
              <button
                type="button"
                onClick={() => setOpenSlug(p.slug)}
                aria-haspopup="dialog"
                className="prow group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-1 py-7 text-left sm:grid-cols-[3.5rem_1.2fr_1fr_auto] sm:items-center sm:py-9"
              >
                <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="display block text-3xl sm:text-5xl">{p.name}</span>
                  <span className="mt-1 block text-sm text-muted">{p.category}</span>
                </span>
                <span className="col-start-2 col-end-4 text-sm leading-relaxed text-muted sm:col-auto">
                  {p.summary}
                  <span className="mt-2 block font-mono text-xs text-accent-fg">{p.stack.slice(0, 4).join(" · ")}</span>
                </span>
                <span className="col-start-3 row-start-1 grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-all group-hover:border-accent-fg group-hover:bg-accent group-hover:text-white sm:col-auto sm:row-auto">
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" aria-hidden />
                  <span className="sr-only">Open {p.name} case study</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <ProjectModal project={projects.find((p) => p.slug === openSlug) ?? null} onClose={() => setOpenSlug(null)} />
    </Section>
  );
}
