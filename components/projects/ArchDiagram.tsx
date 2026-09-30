"use client";
import { useState } from "react";
import type { Diagram } from "@/data/projects";

const H = 60;

export function ArchDiagram({ diagram }: { diagram: Diagram }) {
  const [sel, setSel] = useState<string>(diagram.nodes[0].id);
  const node = diagram.nodes.find((n) => n.id === sel)!;
  const byId = Object.fromEntries(diagram.nodes.map((n) => [n.id, n]));
  const center = (id: string) => {
    const n = byId[id];
    return { x: n.x + (n.w ?? 160) / 2, y: n.y + H / 2 };
  };

  return (
    <figure className="mt-2">
      <figcaption className="mb-3 text-sm text-muted">{diagram.caption}</figcaption>
      <div className="overflow-x-auto rounded-lg border border-line bg-bg p-2">
        <svg
          viewBox={`0 0 ${diagram.width} ${diagram.height}`}
          role="group"
          aria-label={diagram.title}
          className="mx-auto block h-auto w-full min-w-[560px]"
        >
          {diagram.zone && (
            <g>
              <rect x={diagram.zone.x} y={diagram.zone.y} width={diagram.zone.w} height={diagram.zone.h} rx="12" fill="none" stroke="var(--accent-fg)" strokeDasharray="6 5" opacity="0.6" />
              <text x={diagram.zone.x + 14} y={diagram.zone.y + 22} fontSize="12" fill="var(--accent-fg)" fontFamily="var(--font-mono)">
                {diagram.zone.label}
              </text>
            </g>
          )}
          {diagram.edges.map((e, i) => {
            const a = center(e.from);
            const b = center(e.to);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="var(--line)" strokeWidth="2" />;
          })}
          {diagram.nodes.map((n) => {
            const w = n.w ?? 160;
            const active = n.id === sel;
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`${n.label}: ${n.sub}`}
                onClick={() => setSel(n.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSel(n.id);
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <rect x={n.x} y={n.y} width={w} height={H} rx="8" fill={active ? "var(--accent-soft)" : "var(--surface)"} stroke={active ? "var(--accent-fg)" : "var(--line)"} strokeWidth={active ? 2 : 1.5} />
                <text x={n.x + w / 2} y={n.y + 26} textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--fg)">
                  {n.label}
                </text>
                <text x={n.x + w / 2} y={n.y + 44} textAnchor="middle" fontSize="10.5" fill="var(--muted)" fontFamily="var(--font-mono)">
                  {n.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="mt-3 rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed" aria-live="polite">
        <strong className="text-accent-fg">{node.label}.</strong> <span className="text-muted">{node.desc}</span>
      </p>
    </figure>
  );
}
