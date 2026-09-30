import { ArrowUp, Download, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { nav, site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "./ui/icons";

const link = "ulink inline-block py-1 text-muted hover:text-fg";

export function Footer() {
  return (
    <footer className="border-t border-line pt-16">
      <div className="container-page">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label={`${site.name}, back to top`}>
              <Image src="/avatar.webp" alt="" width={44} height={44} unoptimized className="h-11 w-11 rounded-full border border-line object-cover" />
              <span className="display text-3xl">{site.name}</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Backend engineer and full stack developer building real-time systems, secure authentication and encrypted peer-to-peer software.
            </p>
            <div className="mt-5 flex items-center gap-1 text-muted">
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 hover:text-fg">
                <GithubIcon />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 hover:text-fg">
                <LinkedinIcon />
              </a>
              <a href={`mailto:${site.email}`} aria-label="Send an email" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2 hover:text-fg">
                <Mail className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow !text-fg">Explore</h2>
            <ul className="mt-4 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className={link}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow !text-fg">Elsewhere</h2>
            <ul className="mt-4 text-sm">
              {site.githubAccounts.map((a) => (
                <li key={a.user}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className={link}>
                    GitHub · {a.user}
                  </a>
                </li>
              ))}
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={site.resume} download={site.resumeFile} className={`${link} inline-flex items-center gap-1.5`}>
                  <Download className="h-3.5 w-3.5" aria-hidden /> Resume (PDF)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow !text-fg">Get in touch</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="ulink break-all hover:text-fg">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden /> {site.location}
              </li>
              <li>
                <a href="#contact" className="ulink text-accent-fg">
                  Send a message
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="max-w-md sm:text-center">
            Messages sent through the contact form are used only to reply to you. This site sets no tracking cookies.
          </p>
          <div className="flex items-center gap-4">
            <span>Built with Next.js and Tailwind CSS</span>
            <a href="#top" className="btn btn-secondary !min-h-9 !px-3 text-xs">
              <ArrowUp className="h-3.5 w-3.5" aria-hidden /> Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
