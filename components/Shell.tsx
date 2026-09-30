"use client";
import Lenis from "lenis";
import { useCallback, useEffect, useState } from "react";
import { ScrollRail } from "./ScrollRail";
import { BackToTop } from "./BackToTop";
import { CommandPalette } from "./CommandPalette";
import { Navbar } from "./Navbar";

export function Shell() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const root = document.documentElement;
        root.style.setProperty("--mx", `${e.clientX}px`);
        root.style.setProperty("--my", `${e.clientY + window.scrollY}px`);
        const spot = (e.target as Element | null)?.closest<HTMLElement>(".spot");
        if (spot) {
          const r = spot.getBoundingClientRect();
          spot.style.setProperty("--sx", `${e.clientX - r.left}px`);
          spot.style.setProperty("--sy", `${e.clientY - r.top}px`);
        }
      });
    };
    if (fine && !calm) window.addEventListener("pointermove", onMove, { passive: true });

    let lenis: Lenis | undefined;
    let lraf = 0;
    if (!calm) {
      lenis = new Lenis({ lerp: 0.09, anchors: { offset: -72 } });
      const tick = (t: number) => {
        lenis?.raf(t);
        lraf = requestAnimationFrame(tick);
      };
      lraf = requestAnimationFrame(tick);
    }
    return () => {
      lenis?.destroy();
      cancelAnimationFrame(lraf);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onProject = useCallback((slug: string) => {
    window.dispatchEvent(new CustomEvent("open-project", { detail: slug }));
  }, []);

  return (
    <>
      <Navbar onPalette={() => setOpen(true)} />
      <CommandPalette open={open} onClose={() => setOpen(false)} onProject={onProject} />
      <BackToTop />
      <ScrollRail />
    </>
  );
}
