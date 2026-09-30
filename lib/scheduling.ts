export type Proc = { id: string; arrival: number; burst: number; priority: number };
export type Algo = "FCFS" | "SJF" | "Priority" | "RR";
export type Slice = { id: string; start: number; end: number };
export type Metric = { id: string; waiting: number; turnaround: number; completion: number };

export function schedule(procs: Proc[], algo: Algo, quantum = 2): { slices: Slice[]; metrics: Metric[] } {
  const ps = procs.map((p) => ({ ...p, left: p.burst }));
  const slices: Slice[] = [];
  const done: Record<string, number> = {};
  let t = 0;
  const push = (id: string, s: number, e: number) => {
    const last = slices[slices.length - 1];
    if (last && last.id === id && last.end === s) last.end = e;
    else slices.push({ id, start: s, end: e });
  };

  if (algo === "RR") {
    const q = Math.max(1, quantum);
    const queue: typeof ps = [];
    const pending = [...ps].sort((a, b) => a.arrival - b.arrival);
    const admit = () => {
      while (pending.length && pending[0].arrival <= t) queue.push(pending.shift()!);
    };
    admit();
    while (queue.length || pending.length) {
      if (!queue.length) {
        t = pending[0].arrival;
        admit();
        continue;
      }
      const p = queue.shift()!;
      const run = Math.min(q, p.left);
      push(p.id, t, t + run);
      t += run;
      p.left -= run;
      admit();
      if (p.left > 0) queue.push(p);
      else done[p.id] = t;
    }
  } else {
    const remaining = [...ps];
    while (remaining.length) {
      let ready = remaining.filter((p) => p.arrival <= t);
      if (!ready.length) {
        t = Math.min(...remaining.map((p) => p.arrival));
        ready = remaining.filter((p) => p.arrival <= t);
      }
      ready.sort((a, b) => {
        if (algo === "SJF") return a.burst - b.burst || a.arrival - b.arrival;
        if (algo === "Priority") return a.priority - b.priority || a.arrival - b.arrival;
        return a.arrival - b.arrival;
      });
      const p = ready[0];
      push(p.id, t, t + p.burst);
      t += p.burst;
      done[p.id] = t;
      remaining.splice(remaining.indexOf(p), 1);
    }
  }

  const metrics = procs.map((p) => {
    const completion = done[p.id];
    const turnaround = completion - p.arrival;
    return { id: p.id, completion, turnaround, waiting: turnaround - p.burst };
  });
  return { slices, metrics };
}
