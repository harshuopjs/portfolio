"use client";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { type Algo, type Proc, schedule } from "@/lib/scheduling";

const COLORS = ["#8b5cf6", "#22d3ee", "#f59e0b", "#34d399", "#f472b6", "#60a5fa", "#fb923c"];
const ALGOS: { id: Algo; label: string }[] = [
  { id: "FCFS", label: "FCFS" },
  { id: "SJF", label: "SJF" },
  { id: "Priority", label: "Priority" },
  { id: "RR", label: "Round Robin" },
];

const initial: Proc[] = [
  { id: "P1", arrival: 0, burst: 5, priority: 2 },
  { id: "P2", arrival: 1, burst: 3, priority: 1 },
  { id: "P3", arrival: 2, burst: 8, priority: 4 },
  { id: "P4", arrival: 3, burst: 2, priority: 3 },
];

export function SchedulerDemo() {
  const [procs, setProcs] = useState<Proc[]>(initial);
  const [algo, setAlgo] = useState<Algo>("FCFS");
  const [quantum, setQuantum] = useState(2);
  const [drag, setDrag] = useState<number | null>(null);

  const { slices, metrics } = useMemo(() => schedule(procs, algo, quantum), [procs, algo, quantum]);
  const total = Math.max(1, ...slices.map((s) => s.end));
  const color = (id: string) => COLORS[procs.findIndex((p) => p.id === id) % COLORS.length];
  const avg = (k: "waiting" | "turnaround") => (metrics.reduce((a, m) => a + m[k], 0) / Math.max(1, metrics.length)).toFixed(2);

  const update = (i: number, key: keyof Proc, v: number) =>
    setProcs((ps) => ps.map((p, k) => (k === i ? { ...p, [key]: Math.max(key === "burst" ? 1 : 0, Math.floor(v) || 0) } : p)));
  const move = (from: number, to: number) => {
    if (to < 0 || to >= procs.length || from === to) return;
    setProcs((ps) => {
      const c = [...ps];
      c.splice(to, 0, c.splice(from, 1)[0]);
      return c;
    });
  };
  const add = () =>
    setProcs((ps) => {
      if (ps.length >= 7) return ps;
      let n = ps.length + 1;
      while (ps.some((p) => p.id === `P${n}`)) n++;
      return [...ps, { id: `P${n}`, arrival: 0, burst: 3, priority: ps.length + 1 }];
    });

  const num = "h-9 w-16 rounded-md border border-line bg-bg px-2 text-center font-mono text-sm";

  return (
    <div className="rounded-lg border border-line bg-bg p-4">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Scheduling algorithm">
        {ALGOS.map((a) => (
          <button
            key={a.id}
            type="button"
            aria-pressed={algo === a.id}
            onClick={() => setAlgo(a.id)}
            className={`rounded-md border px-3 py-1.5 text-sm ${algo === a.id ? "border-accent-fg bg-accent-soft" : "border-line text-muted hover:text-fg"}`}
          >
            {a.label}
          </button>
        ))}
        {algo === "RR" && (
          <label className="ml-2 flex items-center gap-2 text-sm text-muted">
            Quantum
            <input type="number" min={1} value={quantum} onChange={(e) => setQuantum(Math.max(1, Number(e.target.value) || 1))} className={num} />
          </label>
        )}
      </div>

      <p className="mt-3 text-xs text-muted">
        Drag rows (or use the arrow buttons) to reorder processes. Ties in FCFS/SJF/Priority break on arrival time. Lower priority number = higher priority.
      </p>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[420px] text-left text-sm">
          <thead className="text-xs text-muted">
            <tr>
              <th className="py-1 pr-2 font-medium">Process</th>
              <th className="pr-2 font-medium">Arrival</th>
              <th className="pr-2 font-medium">Burst</th>
              <th className="pr-2 font-medium">Priority</th>
              <th className="font-medium"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {procs.map((p, i) => (
              <tr
                key={p.id}
                draggable
                onDragStart={() => setDrag(i)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (drag !== null) move(drag, i);
                  setDrag(null);
                }}
                className="cursor-grab border-t border-line"
              >
                <td className="py-1.5 pr-2 font-mono">
                  <span className="mr-2 inline-block h-3 w-3 rounded-sm align-middle" style={{ background: color(p.id) }} aria-hidden />
                  {p.id}
                </td>
                {(["arrival", "burst", "priority"] as const).map((k) => (
                  <td key={k} className="pr-2">
                    <input aria-label={`${p.id} ${k}`} type="number" min={k === "burst" ? 1 : 0} value={p[k]} onChange={(e) => update(i, k, Number(e.target.value))} className={num} />
                  </td>
                ))}
                <td className="whitespace-nowrap">
                  <button type="button" aria-label={`Move ${p.id} up`} onClick={() => move(i, i - 1)} className="btn btn-ghost !min-h-8 !p-1.5"><ArrowUp className="h-4 w-4" aria-hidden /></button>
                  <button type="button" aria-label={`Move ${p.id} down`} onClick={() => move(i, i + 1)} className="btn btn-ghost !min-h-8 !p-1.5"><ArrowDown className="h-4 w-4" aria-hidden /></button>
                  <button type="button" aria-label={`Remove ${p.id}`} disabled={procs.length <= 1} onClick={() => setProcs((ps) => ps.filter((_, k) => k !== i))} className="btn btn-ghost !min-h-8 !p-1.5 disabled:opacity-40"><Trash2 className="h-4 w-4" aria-hidden /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={add} disabled={procs.length >= 7} className="btn btn-secondary mt-2 !min-h-9 text-xs disabled:opacity-40">
          <Plus className="h-4 w-4" aria-hidden /> Add process
        </button>
      </div>

      <h4 className="mt-5 text-sm font-semibold">Gantt chart</h4>
      <div className="mt-2 overflow-x-auto pb-1">
        <div className="min-w-[420px]">
          <div className="relative h-10 overflow-hidden rounded-md border border-line" role="img" aria-label={`Gantt chart: ${slices.map((s) => `${s.id} from ${s.start} to ${s.end}`).join(", ")}`}>
            {slices.map((s, i) => (
              <div key={i} className="absolute inset-y-0 grid place-items-center overflow-hidden font-mono text-xs font-semibold text-black" style={{ left: `${(s.start / total) * 100}%`, width: `${((s.end - s.start) / total) * 100}%`, background: color(s.id) }}>
                {s.id}
              </div>
            ))}
          </div>
          <div className="relative mt-1 h-4 font-mono text-[10px] text-muted" aria-hidden>
            {[...new Set([0, ...slices.map((s) => s.end)])].map((t) => (
              <span key={t} className="absolute -translate-x-1/2" style={{ left: `${(t / total) * 100}%` }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <caption className="sr-only">Scheduling metrics</caption>
          <thead className="text-xs text-muted">
            <tr><th className="py-1 font-medium">Process</th><th className="font-medium">Completion</th><th className="font-medium">Turnaround</th><th className="font-medium">Waiting</th></tr>
          </thead>
          <tbody className="font-mono">
            {metrics.map((m) => (
              <tr key={m.id} className="border-t border-line"><td className="py-1">{m.id}</td><td>{m.completion}</td><td>{m.turnaround}</td><td>{m.waiting}</td></tr>
            ))}
            <tr className="border-t border-line font-semibold text-accent-fg"><td className="py-1">Average</td><td>n/a</td><td>{avg("turnaround")}</td><td>{avg("waiting")}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
