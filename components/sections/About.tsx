import { Section } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const facts = [
  ["Studying", "B.Tech, Computer Science Engineering (expected 2027)"],
  ["Working since", "December 2022, part-time, on backend and full-stack products"],
  ["Startup track", "Selected for pre-incubation at DTU-IIF"],
  ["Daily setup", "Arch Linux (i3, KDE Plasma) and Ubuntu 24.04 LTS"],
  ["Based in", "Delhi, India"],
];

export function About() {
  return (
    <Section id="about" n="01" label="About" title={<>A bit about <em className="text-accent-fg">me</em></>}>
      <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <Reveal className="space-y-6">
          <p className="font-serif text-2xl leading-snug sm:text-[2rem]">
            I&apos;m Harsh, a backend engineer from Delhi. Most of what I&apos;ve built lives behind the screen: the
            real-time messaging, the login flow, the database that holds it together.
          </p>
          <div className="space-y-4 leading-relaxed text-muted">
            <p>
              For over three years I&apos;ve worked on backend services in Python and FastAPI, from WebSocket and WebRTC
              pipelines to JWT and OAuth sessions and PostgreSQL schema design. I also enjoy the security side of things,
              which is why HexaWave and SwiftDrop, my encrypted peer-to-peer projects, exist.
            </p>
            <p>
              I don&apos;t stay in one layer. I&apos;ve built Next.js frontends, native Android apps in Kotlin, and deployed
              containers to AWS EC2, Render and Vercel. At EtharaAI I spent an internship evaluating LLM responses, which gave me a
              close look at how AI quality pipelines work.
            </p>
            <p>I like Linux, small tools that do one thing well, and shipping software people can actually use.</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="border-t border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
