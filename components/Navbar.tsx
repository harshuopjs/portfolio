"use client";
import { Command, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ onPalette }: { onPalette: () => void }) {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div
        className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-accent"
        style={{ transform: `scaleX(${progress})` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm font-semibold" aria-label={`${site.name}, back to top`}>
          <Image src="/avatar.webp" alt="" width={32} height={32} unoptimized className="h-8 w-8 rounded-full border border-line object-cover" />
          <span className="hidden sm:inline">harsh.dev</span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? "location" : undefined}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    active === n.id ? "bg-accent-soft text-accent-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button type="button" onClick={onPalette} className="btn btn-ghost !min-h-10 !px-2.5 text-xs" aria-label="Open command menu (Ctrl+K)">
            <Command className="h-4 w-4" aria-hidden />
            <kbd className="hidden font-mono sm:inline">K</kbd>
          </button>
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-ghost !min-h-10 !min-w-10 !p-2 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-bg lg:hidden">
          <ul className="container-page grid gap-1 py-3">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === n.id ? "location" : undefined}
                  className={`block rounded-md px-3 py-3 text-base ${active === n.id ? "bg-accent-soft text-accent-fg" : "text-muted"}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
