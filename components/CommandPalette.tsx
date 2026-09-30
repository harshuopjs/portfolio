"use client";
import { Download, FileText, Mail, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { GithubIcon, LinkedinIcon } from "./ui/icons";
import { nav, site } from "@/data/site";
import { projects } from "@/data/projects";

type Cmd = { label: string; hint: string; icon: React.ReactNode; run: () => void };

export function CommandPalette({ open, onClose, onProject }: { open: boolean; onClose: () => void; onProject: (slug: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);

  const cmds: Cmd[] = useMemo(() => {
    const go = (id: string) => () => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    };
    return [
      ...nav.map((n) => ({ label: `Go to ${n.label}`, hint: "Section", icon: <Sparkles className="h-4 w-4" aria-hidden />, run: go(n.id) })),
      ...projects.map((p) => ({ label: `Open project: ${p.name}`, hint: p.category, icon: <FileText className="h-4 w-4" aria-hidden />, run: () => onProject(p.slug) })),
      {
        label: "Download resume",
        hint: "PDF",
        icon: <Download className="h-4 w-4" aria-hidden />,
        run: () => {
          const a = document.createElement("a");
          a.href = site.resume;
          a.download = site.resumeFile;
          a.click();
        },
      },
      {
        label: "Copy email address",
        hint: site.email,
        icon: <Mail className="h-4 w-4" aria-hidden />,
        run: () => {
          navigator.clipboard?.writeText(site.email).catch(() => {});
        },
      },
      ...site.githubAccounts.map((a) => ({
        label: `Open GitHub: ${a.user}`,
        hint: "New tab",
        icon: <GithubIcon className="h-4 w-4" />,
        run: () => window.open(a.url, "_blank", "noopener"),
      })),
      { label: "Open LinkedIn", hint: "New tab", icon: <LinkedinIcon className="h-4 w-4" />, run: () => window.open(site.linkedin, "_blank", "noopener") },
    ];
  }, [onProject]);

  const results = cmds.filter((c) => (c.label + c.hint).toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  function run(c?: Cmd) {
    if (!c) return;
    onClose();
    setQ("");
    setIdx(0);
    setTimeout(c.run, 0);
  }

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Command menu"
      data-lenis-prevent
      className="m-auto mt-[12vh] w-[min(36rem,92vw)] rounded-xl border border-line bg-surface p-0 text-fg"
    >
      <div className="flex items-center gap-2 border-b border-line px-4">
        <Search className="h-4 w-4 text-muted" aria-hidden />
        <input
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setIdx(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIdx((i) => Math.min(i + 1, results.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setIdx((i) => Math.max(i - 1, 0));
            }
            if (e.key === "Enter") {
              e.preventDefault();
              run(results[idx]);
            }
          }}
          placeholder="Type a command or search projects…"
          aria-label="Search commands"
          className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </div>
      <ul role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
        {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No matching commands.</li>}
        {results.map((c, i) => (
          <li key={c.label} role="option" aria-selected={i === idx}>
            <button
              type="button"
              onClick={() => run(c)}
              onMouseEnter={() => setIdx(i)}
              className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm ${i === idx ? "bg-accent-soft text-fg" : "text-muted"}`}
            >
              {c.icon}
              <span className="flex-1 text-fg">{c.label}</span>
              <span className="truncate text-xs">{c.hint}</span>
            </button>
          </li>
        ))}
      </ul>
    </dialog>
  );
}
