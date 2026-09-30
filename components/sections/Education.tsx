import { achievements, certifications, education } from "@/data/experience";
import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

function Col({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <Reveal delay={delay}>
      <section aria-label={title}>
        <h3 className="display border-b border-line pb-4 text-3xl">{title}</h3>
        <ul className="divide-y divide-line">{children}</ul>
      </section>
    </Reveal>
  );
}

export function Education() {
  return (
    <Section id="education" n="05" label="Background" title={<>Learning &amp; <em className="text-accent-fg">recognition</em></>}>
      <div className="grid gap-12 lg:grid-cols-3">
        <Col title="Education" delay={0}>
          {education.map((e) => (
            <li key={e.school} className="py-4">
              <p className="font-mono text-xs text-accent-fg">{e.period}</p>
              <p className="mt-1 font-medium">{e.degree}</p>
              <p className="text-sm text-muted">{e.school}, {e.place}</p>
            </li>
          ))}
        </Col>
        <Col title="Certifications" delay={0.08}>
          {certifications.map((c) => (
            <li key={c.name} className="py-4">
              <p className="font-medium">{c.name}</p>
              {c.issuer && <p className="text-sm text-muted">{c.issuer}</p>}
            </li>
          ))}
        </Col>
        <Col title="Achievements" delay={0.16}>
          {achievements.map((a) => (
            <li key={a.title} className="py-4">
              <p className="font-medium">{a.title}</p>
              {a.detail && <p className="text-sm text-muted">{a.detail}</p>}
            </li>
          ))}
        </Col>
      </div>
    </Section>
  );
}
