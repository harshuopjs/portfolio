import Image from "next/image";
import { ArrowDown, Download, Mail } from "lucide-react";
import { asset, site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { HeroScroll } from "../HeroScroll";
import { GithubIcon, LinkedinIcon } from "../ui/icons";

const words = ["Harsh", "Kumar", "Singh"];

const nodes = [
  { id: "client", x: 46, y: 330, label: "client", anchor: "start" },
  { id: "api", x: 46, y: 120, label: "FastAPI", anchor: "start" },
  { id: "rt", x: 514, y: 150, label: "WebRTC", anchor: "end" },
  { id: "db", x: 514, y: 380, label: "PostgreSQL", anchor: "end" },
] as const;
const paths = [
  { id: "p1", d: "M46 330 L46 120", dur: 2.4, delay: 0 },
  { id: "p2", d: "M46 120 C 110 -30, 450 -30, 514 150", dur: 3.4, delay: 0.5 },
  { id: "p3", d: "M46 330 C 120 500, 440 500, 514 380", dur: 3.6, delay: 1.1 },
  { id: "p4", d: "M514 150 L514 380", dur: 2.6, delay: 1.7 },
];

function Network() {
  return (
    <svg viewBox="0 0 560 500" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden>
      {paths.map((p) => (
        <g key={p.id}>
          <path id={p.id} d={p.d} fill="none" stroke="var(--line)" strokeWidth="1.5" />
          <path d={p.d} fill="none" stroke="var(--accent-fg)" strokeWidth="1" opacity=".6" className="dash" />
          <circle r="3.5" fill="var(--accent-fg)" className="packet">
            <animateMotion dur={`${p.dur}s`} begin={`${p.delay}s`} repeatCount="indefinite">
              <mpath href={`#${p.id}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={n.id}>
          <circle cx={n.x} cy={n.y} r="10" fill="var(--accent)" className="pulse" style={{ animationDelay: `${i * 0.5}s` }} />
          <circle cx={n.x} cy={n.y} r="9" fill="var(--bg)" stroke="var(--accent-fg)" strokeWidth="1.5" />
          <circle cx={n.x} cy={n.y} r="3" fill="var(--accent-fg)" />
          <text x={n.x} y={n.y + 30} textAnchor={n.anchor === "start" ? "start" : "end"} fontSize="12" fill="var(--muted)" fontFamily="var(--font-mono)" transform={`translate(${n.anchor === "start" ? -10 : 10} 0)`}>
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  const tech = skillGroups.flatMap((g) => g.items).filter((s, i, a) => a.indexOf(s) === i && !["i3", "KDE Plasma", "Windows", "HTML", "CSS", "CI/CD deployment workflows"].includes(s));

  return (
    <section id="top" className="relative overflow-x-clip">
      <div className="hero-glow" aria-hidden />
      <HeroScroll>
      <div className="container-page grid items-center gap-10 pt-32 sm:pt-40 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Image
            src={asset("/avatar.webp")}
            alt="Portrait of Harsh Kumar Singh"
            width={96}
            height={96}
            unoptimized
            sizes="72px"
            className="fade-up mb-5 h-[72px] w-[72px] rounded-full border border-line object-cover lg:hidden"
          />
          <p className="fade-up inline-flex items-center gap-2 text-sm text-muted">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            Open to Backend &amp; Full Stack roles · {site.location}
          </p>

          <h1 className="display mt-6 text-[clamp(3.4rem,10vw,7.5rem)]" aria-label={site.name}>
            {words.map((w, i) => (
              <span key={w} className="word mr-[0.22em]" aria-hidden>
                <span style={{ animationDelay: `${0.1 + i * 0.12}s` }}>{w}</span>
              </span>
            ))}
          </h1>

          <p className="fade-up mt-6 max-w-xl font-serif text-2xl italic leading-snug text-accent-fg sm:text-3xl [animation-delay:.5s]">
            Building reliable backends, engineering real-time experiences.
          </p>
          <p className="fade-up mt-6 max-w-lg leading-relaxed text-muted [animation-delay:.65s]">
            I build the server side of real-time products in Python and FastAPI, and I like working across the stack:
            WebRTC platforms, Android apps, and encrypted peer-to-peer tools.
          </p>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:.8s]">
            <a href="#projects" className="btn btn-primary">
              Explore my work <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a href={site.resume} download={site.resumeFile} className="btn btn-secondary">
              <Download className="h-4 w-4" aria-hidden /> Download resume
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Mail className="h-4 w-4" aria-hidden /> Contact me
            </a>
          </div>

          <div className="fade-up mt-6 flex items-center gap-1 text-muted [animation-delay:.9s]">
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 hover:text-fg">
              <GithubIcon />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 hover:text-fg">
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <div className="fade-up relative mx-auto hidden aspect-[560/500] w-full max-w-lg lg:block [animation-delay:.4s]">
          <Network />
          <div className="absolute left-[23%] top-[7%] w-[54%] overflow-hidden rounded-t-[999px] rounded-b-2xl border border-line bg-surface shadow-2xl shadow-black/40">
            <Image
              src={asset("/harsh.webp")}
              alt="Portrait of Harsh Kumar Singh"
              width={880}
              height={1100}
              unoptimized
              priority
              sizes="(min-width: 1024px) 280px, 0px"
              className="h-auto w-full"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" aria-hidden />
            <div className="pointer-events-none absolute inset-0 bg-accent/10 mix-blend-soft-light" aria-hidden />
          </div>
        </div>
      </div>
      </HeroScroll>

      <div className="border-y border-line py-4" aria-hidden>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="marquee font-mono text-sm text-muted">
            {[0, 1].map((k) => (
              <ul key={k} className="flex shrink-0 items-center">
                {tech.map((t) => (
                  <li key={t} className="flex items-center">
                    <span className="px-6">{t}</span>
                    <span className="text-accent-fg">✦</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
