"use client";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";

export function ScrollRail() {
  const [fill, setFill] = useState(0);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      const tops = ids.map((id) => document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
      let idx = -1;
      tops.forEach((t, i) => {
        if (t <= probe) idx = i;
      });
      setActive(idx);
      if (idx < 0) return setFill(0);
      const next = tops[idx + 1];
      const frac = next === undefined || !isFinite(next) ? 1 : Math.min(1, Math.max(0, (probe - tops[idx]) / (next - tops[idx])));
      setFill((idx + frac) / (ids.length - 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav aria-label="Section progress" className="fixed right-6 top-1/2 z-30 hidden h-[46vh] -translate-y-1/2 xl:block">
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line" aria-hidden />
      <div
        className="absolute inset-y-0 left-1/2 w-px origin-top bg-accent-fg"
        style={{ transform: `translateX(-50%) scaleY(${Math.min(1, fill)})` }}
        aria-hidden
      />
      <ul className="relative flex h-full flex-col justify-between">
        {nav.map((n, i) => (
          <li key={n.id} className="group relative flex justify-center">
            <a href={`#${n.id}`} aria-label={n.label} aria-current={active === i ? "location" : undefined} className="grid h-5 w-5 place-items-center">
              <span
                className={`block rounded-full border transition-all duration-300 ${
                  active === i
                    ? "h-3 w-3 border-accent-fg bg-accent-fg shadow-[0_0_12px_var(--accent)]"
                    : i < active
                      ? "h-2 w-2 border-accent-fg bg-accent-fg"
                      : "h-2 w-2 border-line bg-bg group-hover:border-accent-fg"
                }`}
              />
            </a>
            <span className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-fg opacity-0 transition-opacity group-hover:opacity-100">
              {n.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
