"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { experience } from "@/data/experience";
import { Section } from "../ui/Section";

export function Experience() {
  const [open, setOpen] = useState<number>(3);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="experience"
      n="04"
      label="Experience"
      title={<>Where I&apos;ve <em className="text-accent-fg">worked</em></>}
      intro="Dates are as listed on my resume. Kridavista and SaiMadad were part-time, so several roles overlap."
    >
      <ol ref={ref} className="relative">
        <span className="absolute bottom-0 left-[5px] top-0 w-px bg-line sm:left-[9.75rem]" aria-hidden />
        <motion.span className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-accent-fg sm:left-[9.75rem]" style={{ scaleY }} aria-hidden />
        {experience.map((r, i) => {
          const isOpen = open === i;
          return (
            <li key={r.org + r.start} className="relative grid gap-x-10 pb-12 pl-8 last:pb-0 sm:grid-cols-[9rem_1fr] sm:pl-0">
              <span className="absolute left-0 top-[0.55rem] h-[11px] w-[11px] rounded-full border-2 border-accent-fg bg-bg sm:left-[9.75rem] sm:-translate-x-[5px]" aria-hidden />
              <p className="font-mono text-xs text-muted sm:pt-2 sm:text-right">
                {r.start}
                <span className="sm:hidden"> to </span>
                <br className="hidden sm:block" />
                <span className="hidden sm:inline">to </span>
                {r.end}
              </p>
              <div className="sm:pl-10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`exp-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-start justify-between gap-4 text-left"
                >
                  <span>
                    <span className="display block text-3xl sm:text-4xl">
                      {r.role}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {r.org}
                      {r.type && ` · ${r.type}`}
                      {r.location && ` · ${r.location}`}
                    </span>
                  </span>
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent-fg">
                    <Plus className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} aria-hidden />
                  </span>
                </button>
                <div id={`exp-${i}`} hidden={!isOpen} className="mt-5 max-w-2xl">
                  <ul className="grid gap-3 text-[0.95rem] leading-relaxed text-muted">
                    {r.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-[0.7rem] h-px w-3 shrink-0 bg-accent-fg" aria-hidden />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 font-mono text-xs text-accent-fg">{r.tags.join(" · ")}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
