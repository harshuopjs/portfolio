"use client";
import { Check, CheckCircle2, Copy, Loader2, Mail, MapPin, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contactCategories } from "@/data/contact";
import { site } from "@/data/site";
import { GithubIcon, LinkedinIcon } from "../ui/icons";
import { Section } from "../ui/Section";

type Field = "name" | "email" | "category" | "subject" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "ok" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 2000;
const empty = { name: "", email: "", category: "", subject: "", message: "" };

function validate(v: typeof empty): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (!v.category) e.category = "Please choose what this is about.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters.";
  return e;
}

export function Contact() {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState<{ text: string; fallback?: boolean }>({ text: "" });
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    started.current = Date.now();
  }, []);

  function set(field: Field, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field]) setErrors((prev) => ({ ...prev, [field]: validate(next)[field] }));
  }

  function blur(field: Field) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validate(values)[field] }));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy my email address:", site.email);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      setTouched({ name: true, email: true, category: true, subject: true, message: true });
      setStatus("error");
      setNotice({ text: "Please fix the highlighted fields." });
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setStatus("sending");
    setNotice({ text: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          website: new FormData(e.currentTarget).get("website") ?? "",
          startedAt: started.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setSentTo(values.email.trim());
        setValues(empty);
        setErrors({});
        setTouched({});
        started.current = Date.now();
        setStatus("ok");
      } else {
        if (data.fields) setErrors(data.fields);
        setStatus("error");
        setNotice({ text: data.error ?? "Something went wrong.", fallback: data.fallback });
      }
    } catch {
      setStatus("error");
      setNotice({ text: "Network error. Please try again or email me directly.", fallback: true });
    }
  }

  const input = (field: Field) =>
    `mt-1.5 w-full rounded-lg border bg-bg px-3.5 py-3 text-base placeholder:text-muted/60 transition-colors sm:text-sm ${
      errors[field] ? "border-danger" : "border-line focus:border-accent-fg"
    }`;
  const aria = (field: Field) => ({
    id: `c-${field}`,
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `c-${field}-err` : undefined,
    value: values[field],
    onBlur: () => blur(field),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(field, e.target.value),
  });
  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`c-${field}-err`} className="mt-1.5 text-sm text-danger">
        {errors[field]}
      </p>
    ) : null;

  return (
    <Section
      id="contact"
      n="07"
      label="Contact"
      title={
        <>
          Let&apos;s <em className="text-accent-fg">talk</em>
        </>
      }
      intro="I am open to backend, software engineering and full-stack roles, and to interesting collaborations. Pick a topic below and I will get back to you."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div className="space-y-3">
          <div className="card spot flex items-center justify-between gap-3 p-4">
            <a href={`mailto:${site.email}`} className="flex min-w-0 items-center gap-3 hover:text-accent-fg">
              <Mail className="h-5 w-5 shrink-0 text-accent-fg" aria-hidden />
              <span className="truncate text-sm">{site.email}</span>
            </a>
            <button type="button" onClick={copy} className="btn btn-secondary !min-h-9 shrink-0 !px-3 text-xs">
              {copied ? <Check className="h-4 w-4 text-ok" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <span className="sr-only" role="status">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="card spot flex items-center gap-3 p-4 hover:border-accent-fg">
            <LinkedinIcon className="h-5 w-5 text-accent-fg" /> <span className="text-sm">LinkedIn · {site.linkedinHandle}</span>
          </a>
          {site.githubAccounts.map((a) => (
            <a key={a.user} href={a.url} target="_blank" rel="noopener noreferrer" className="card spot flex items-center gap-3 p-4 hover:border-accent-fg">
              <GithubIcon className="h-5 w-5 text-accent-fg" /> <span className="text-sm">GitHub · {a.user}</span>
            </a>
          ))}
          <div className="card flex items-center gap-3 p-4">
            <MapPin className="h-5 w-5 text-accent-fg" aria-hidden /> <span className="text-sm">{site.location}</span>
          </div>
          <p className="px-1 pt-2 text-sm leading-relaxed text-muted">
            You will get an automatic confirmation email as soon as your message is sent. I usually reply personally within a few days.
          </p>
        </div>

        {status === "ok" ? (
          <div className="card flex flex-col items-start justify-center gap-4 p-7 sm:p-10" role="status">
            <CheckCircle2 className="h-10 w-10 text-ok" aria-hidden />
            <h3 className="display text-4xl">Message sent</h3>
            <p className="max-w-md leading-relaxed text-muted">
              Thanks for reaching out. I have received your message and will get back to you soon. A confirmation was sent to{" "}
              <strong className="text-fg">{sentTo}</strong>. If you do not see it, check your spam folder.
            </p>
            <button type="button" className="btn btn-secondary mt-2" onClick={() => setStatus("idle")}>
              Send another message
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="card relative p-5 sm:p-8">
            <fieldset aria-describedby={errors.category ? "c-category-err" : undefined}>
              <legend className="text-sm font-medium">What is this about?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {contactCategories.map((c) => {
                  const on = values.category === c.id;
                  return (
                    <label
                      key={c.id}
                      className={`relative flex min-h-[3.25rem] cursor-pointer flex-col justify-center rounded-lg border px-3 py-2 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-fg ${
                        on ? "border-accent-fg bg-accent-soft" : errors.category ? "border-danger" : "border-line hover:border-accent-fg/60"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={c.id}
                        checked={on}
                        onChange={() => set("category", c.id)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium leading-tight">{c.label}</span>
                      <span className="mt-0.5 hidden text-xs leading-tight text-muted sm:block">{c.hint}</span>
                    </label>
                  );
                })}
              </div>
              {fieldError("category")}
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="c-name" className="text-sm font-medium">
                  Name
                </label>
                <input {...aria("name")} name="name" autoComplete="name" maxLength={100} required className={input("name")} />
                {fieldError("name")}
              </div>
              <div>
                <label htmlFor="c-email" className="text-sm font-medium">
                  Email
                </label>
                <input {...aria("email")} name="email" type="email" inputMode="email" autoComplete="email" maxLength={200} required className={input("email")} />
                {fieldError("email")}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="c-subject" className="text-sm font-medium">
                Subject
              </label>
              <input {...aria("subject")} name="subject" maxLength={150} required className={input("subject")} />
              {fieldError("subject")}
            </div>

            <div className="mt-5">
              <div className="flex items-baseline justify-between">
                <label htmlFor="c-message" className="text-sm font-medium">
                  Message
                </label>
                <span className={`font-mono text-xs ${values.message.length > MAX_MESSAGE - 100 ? "text-danger" : "text-muted"}`} aria-hidden>
                  {values.message.length}/{MAX_MESSAGE}
                </span>
              </div>
              <textarea {...aria("message")} name="message" rows={6} maxLength={MAX_MESSAGE} required className={`${input("message")} resize-y`} />
              {fieldError("message")}
            </div>

            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">
                {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              <div role="status" aria-live="polite" className="text-sm">
                {status === "error" && notice.text && (
                  <p className="text-danger">
                    {notice.text}{" "}
                    {notice.fallback && (
                      <a className="underline" href={`mailto:${site.email}`}>
                        Email me instead
                      </a>
                    )}
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </Section>
  );
}
