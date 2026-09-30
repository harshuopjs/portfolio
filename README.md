# Harsh Kumar Singh: Portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide.
All content is derived from the resume and lives in `data/`.

## Run

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
npm run lint && npx tsc --noEmit
npm run build && npm start   # production build
```

Node.js 20.9+ is required (24 LTS used in development).

## Structure

| Path | Purpose |
| --- | --- |
| `data/` | Resume-derived content: `site.ts`, `projects.ts`, `skills.ts`, `experience.ts` |
| `components/sections/` | Hero, About, Skills, Projects, Experience, Education, GitHub, Contact |
| `components/projects/` | Case-study modal, interactive architecture diagrams, workflow, CPU scheduler demo |
| `lib/` | GitHub API fetch (server-side, cached 1h), scheduling algorithms |
| `app/api/contact/route.ts` | Contact form backend |
| `public/Harsh_Kumar_Singh_Resume.pdf` | Downloadable resume |

## Configuration

Copy `.env.example` to `.env.local`.

- **Contact form** (Gmail SMTP, no extra service): in your Google account turn on 2-Step Verification, create an
  App Password at https://myaccount.google.com/apppasswords, and put it in `.env.local` as `SMTP_PASS`
  (`SMTP_USER` and `CONTACT_TO_EMAIL` are pre-filled). Restart the server. Messages arrive in your inbox with
  Reply-To set to the visitor. The visitor also gets an automatic confirmation from a no-reply sender (`AUTOREPLY_FROM`,
  see `.env.example`). Resend is supported as an alternative (`RESEND_API_KEY`).
  Until configured, the API responds 503 and the form shows an error with an "Email me instead" link. It never fakes success.
  Protections: server-side validation, honeypot, minimum fill time, per-IP rate limit (in-memory), HTML escaping.
  On Vercel, add the same variables in Project Settings → Environment Variables.
- **`NEXT_PUBLIC_SITE_URL`**: set to your final domain to enable canonical URL, sitemap entries and correct Open Graph URLs.
- **`GITHUB_TOKEN`** (optional, server-only): raises the GitHub API rate limit. Without it, the section still works and falls back to a static project list if the API fails.

## Things to verify or complete

- **LinkedIn**: the resume gives the handle `engi-harsh`; the URL `https://www.linkedin.com/in/engi-harsh` is built from it and was not opened/verified. Edit `data/site.ts` if it differs.
- **Project links**: no repository or demo URLs were in the resume, so none are shown. Add `repo` / `demo` to an entry in `data/projects.ts` and buttons appear automatically.
- **Screenshots**: none were supplied, so case studies use architecture diagrams instead. Put images in `public/` and extend `Project` if you want them.
- **yantraworks.cloud**: linked nowhere and no DNS/hosting is touched. `legacyPortfolio` in `data/site.ts` is available if you want to surface it.
- Phone number from the resume is intentionally not published.

## Deploy (Vercel)

1. Push this folder to a GitHub repository and import it in Vercel (framework auto-detected).
2. Add the environment variables above in Project Settings → Environment Variables.
3. Deploy. Optionally attach a custom domain, then set `NEXT_PUBLIC_SITE_URL` and redeploy.

Any Node host works too: `npm run build && npm start`. Security headers (CSP, HSTS, X-Frame-Options, etc.) are set in `next.config.ts`.

## Accuracy notes

Diagrams are conceptual and based only on the resume's descriptions, not source-code internals. The CPU scheduling demo is a small re-implementation for this site, not the original AlgoVerse app. HexaWave is presented as local-Wi-Fi only.
