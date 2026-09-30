"use client";
import { useState } from "react";
import { skillGroups, skillProjects } from "@/data/skills";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

export function Skills() {
  const [picked, setPicked] = useState<string | null>(null);
  const [group, setGroup] = useState("all");
  const shown = group === "all" ? skillGroups : skillGroups.filter((g) => g.id === group);

  return (
    <Section
      id="skills"
      n="02"
      label="Skills"
      title={<>What I work <em className="text-accent-fg">with</em></>}
      intro="Grouped as on my resume. Tap an underlined technology to see which of my projects use it."
    >
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm" role="group" aria-label="Filter skills by category">
        {[{ id: "all", title: "All" }, ...skillGroups].map((g) => (
          <button
            key={g.id}
            type="button"
            aria-pressed={group === g.id}
            onClick={() => {
              setGroup(g.id);
              setPicked(null);
            }}
            className={`min-h-9 border-b pb-0.5 transition-colors ${group === g.id ? "border-accent-fg text-fg" : "border-transparent text-muted hover:text-fg"}`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="mt-10 border-t border-line">
        {shown.map((g, i) => (
          <Reveal key={g.id} delay={i * 0.03}>
            <section aria-labelledby={`sk-${g.id}`} className="grid gap-3 border-b border-line py-6 md:grid-cols-[14rem_1fr] md:gap-10">
              <div>
                <h3 id={`sk-${g.id}`} className="font-medium">{g.title}</h3>
                <p className="mt-1 text-sm text-muted">{g.blurb}</p>
              </div>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 self-center font-serif text-2xl leading-tight sm:text-[1.7rem]">
                {g.items.map((s) => {
                  const linked = skillProjects[s];
                  const on = picked === s;
                  return (
                    <li key={s}>
                      {linked ? (
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setPicked(on ? null : s)}
                          className={`underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent-fg ${on ? "text-accent-fg !decoration-accent-fg" : ""}`}
                        >
                          {s}
                          <span className="sr-only"> (used in {linked.length} project{linked.length > 1 ? "s" : ""})</span>
                        </button>
                      ) : (
                        <span className="text-fg/90">{s}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 min-h-6 text-sm" aria-live="polite">
        {picked && (
          <>
            <strong className="text-accent-fg">{picked}</strong> <span className="text-muted">is used in {skillProjects[picked].join(", ")}.</span>
          </>
        )}
      </p>
    </Section>
  );
}
