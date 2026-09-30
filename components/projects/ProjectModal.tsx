"use client";
import { ExternalLink, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Project } from "@/data/projects";
import { ArchDiagram } from "./ArchDiagram";
import { SchedulerDemo } from "./SchedulerDemo";
import { Workflow } from "./Workflow";
import { GithubIcon } from "../ui/icons";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-7">
      <h3 className="text-base font-semibold">{title}</h3>
      <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted">
        {items.map((t) => (
          <li key={t} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const last = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      last.current = document.activeElement as HTMLElement | null;
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!project && d.open) d.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={() => {
        document.body.style.overflow = "";
        last.current?.focus();
        onClose();
      }}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="project-dialog-title"
      data-lenis-prevent
      className="m-auto h-[min(92dvh,56rem)] w-[min(52rem,96vw)] max-w-none rounded-xl border border-line bg-surface p-0 text-fg"
    >
      {project && (
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-line p-5 sm:p-6">
            <div>
              <p className="eyebrow">{project.category}</p>
              <h2 id="project-dialog-title" className="display mt-1 text-4xl">{project.name}</h2>
            </div>
            <button type="button" onClick={onClose} aria-label="Close project details" className="btn btn-ghost !min-h-10 !min-w-10 !p-2">
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 pb-8 sm:p-6">
            <p className="leading-relaxed text-muted">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>

            {(project.repo || project.demo) && (
              <div className="mt-4 flex gap-3">
                {project.repo && <a className="btn btn-secondary" href={project.repo} target="_blank" rel="noopener noreferrer"><GithubIcon className="h-4 w-4" /> Source</a>}
                {project.demo && <a className="btn btn-primary" href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="h-4 w-4" aria-hidden /> Live demo</a>}
              </div>
            )}

            {project.note && <p className="mt-5 rounded-lg border border-accent-fg/40 bg-accent-soft p-4 text-sm leading-relaxed">{project.note}</p>}

            <section className="mt-7">
              <h3 className="text-base font-semibold">Problem</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
            </section>
            <section className="mt-7">
              <h3 className="text-base font-semibold">My role</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.role}</p>
            </section>

            {project.workflow && (
              <section className="mt-7">
                <h3 className="mb-3 text-base font-semibold">Transfer workflow</h3>
                <Workflow steps={project.workflow} />
              </section>
            )}
            {project.diagram && (
              <section className="mt-7">
                <h3 className="text-base font-semibold">{project.diagram.title}</h3>
                <ArchDiagram diagram={project.diagram} />
              </section>
            )}
            {project.interactive === "scheduler" && (
              <section className="mt-7">
                <h3 className="mb-3 text-base font-semibold">Try a scheduling simulation</h3>
                <SchedulerDemo />
              </section>
            )}

            <List title="Engineering contributions" items={project.contributions} />
            <List title="Architectural decisions" items={project.decisions} />
            <List title="Key features" items={project.features} />
            <List title="Technical challenges" items={project.challenges} />
          </div>
        </div>
      )}
    </dialog>
  );
}
