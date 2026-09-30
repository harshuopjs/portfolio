"use client";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export function Workflow({ steps }: { steps: { label: string; desc: string }[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <ol className="flex flex-wrap items-center gap-2" aria-label="Transfer workflow">
        {steps.map((s, k) => (
          <li key={s.label} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setI(k)}
              aria-current={i === k ? "step" : undefined}
              className={`rounded-md border px-3 py-2 text-sm font-medium ${
                i === k ? "border-accent-fg bg-accent-soft text-fg" : "border-line bg-surface text-muted hover:text-fg"
              }`}
            >
              <span className="mr-1.5 font-mono text-xs text-accent-fg">{k + 1}</span>
              {s.label}
            </button>
            {k < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted" aria-hidden />}
          </li>
        ))}
      </ol>
      <p className="mt-3 rounded-lg border border-line bg-surface p-4 text-sm text-muted" aria-live="polite">
        <strong className="text-fg">{steps[i].label}.</strong> {steps[i].desc}
      </p>
    </div>
  );
}
