import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { categoryLabel, contactCategories } from "@/data/contact";

export const runtime = "nodejs";

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60_000;
const MAX = 3;

function clean(s: unknown, max: number) {
  return typeof s === "string" ? s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim().slice(0, max) : "";
}
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const oneLine = (s: string) => s.replace(/[\r\n"<>]+/g, " ").trim();

type Mail = { to: string; subject: string; text: string; html: string; replyTo?: string; from: string; auto?: boolean };

async function deliver(mail: Mail) {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (smtpUser && smtpPass) {
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: (process.env.SMTP_SECURE ?? "true") === "true",
      auth: { user: smtpUser, pass: smtpPass },
      connectionTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transport.sendMail({
      from: mail.from,
      to: mail.to,
      replyTo: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      headers: mail.auto ? { "Auto-Submitted": "auto-replied", Precedence: "auto_reply", "X-Auto-Response-Suppress": "All" } : undefined,
    });
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: mail.from,
      to: [mail.to],
      reply_to: mail.replyTo,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      headers: mail.auto ? { "Auto-Submitted": "auto-replied" } : undefined,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(String(res.status));
}

export async function POST(req: Request) {
  const smtpUser = process.env.SMTP_USER;
  const hasSmtp = Boolean(smtpUser && process.env.SMTP_PASS);
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const owner = process.env.CONTACT_TO_EMAIL ?? smtpUser;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(body.website, 100)) return NextResponse.json({ ok: true });
  const started = Number(body.startedAt);
  if (!started || Date.now() - started < 2500) return NextResponse.json({ error: "Please wait a moment and try again." }, { status: 400 });

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const subject = clean(body.subject, 150);
  const message = clean(body.message, 5000);
  const category = clean(body.category, 20);
  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (!contactCategories.some((c) => c.id === category)) errors.category = "Please choose what this is about.";
  if (subject.length < 3) errors.subject = "Please add a subject.";
  if (message.length < 10) errors.message = "Message should be at least 10 characters.";
  if (Object.keys(errors).length) return NextResponse.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 422 });

  if (!owner || !(hasSmtp || hasResend)) {
    return NextResponse.json({ error: "The contact service is not configured yet. Please email me directly.", fallback: true }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX) return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const label = categoryLabel(category);
  const ownerFrom = hasSmtp ? `"Portfolio contact form" <${smtpUser}>` : (process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>");
  const autoFrom =
    process.env.AUTOREPLY_FROM ?? (hasSmtp ? `"Harsh Kumar Singh (no-reply)" <${smtpUser}>` : (process.env.CONTACT_FROM_EMAIL ?? "Harsh Kumar Singh <onboarding@resend.dev>"));

  try {
    await deliver({
      from: ownerFrom,
      to: owner,
      replyTo: `"${oneLine(name)}" <${email}>`,
      subject: `[Portfolio | ${label}] ${oneLine(subject)}`,
      text: `Category: ${label}\nFrom: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>${esc(label)}</strong></p><p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p><p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
  } catch {
    return NextResponse.json({ error: "Could not send your message. Please email me directly.", fallback: true }, { status: 502 });
  }

  try {
    await deliver({
      from: autoFrom,
      to: email,
      auto: true,
      subject: `Thanks for reaching out, ${oneLine(name).split(" ")[0]}`,
      text: [
        `Hi ${name},`,
        "",
        `Thanks for getting in touch about "${label}". I have received your message and will get back to you soon.`,
        "",
        "Your message:",
        `Subject: ${subject}`,
        message,
        "",
        "This is an automated message from a no-reply address, so please do not reply to it. I will write to you from my personal email.",
        "",
        "Harsh Kumar Singh",
      ].join("\n"),
      html: `<div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.6;color:#1a1a2e">
<p>Hi ${esc(name)},</p>
<p>Thanks for getting in touch about <strong>${esc(label)}</strong>. I have received your message and will get back to you soon.</p>
<blockquote style="margin:16px 0;padding:8px 16px;border-left:3px solid #7c3aed;color:#444;white-space:pre-wrap"><strong>${esc(subject)}</strong>\n${esc(message)}</blockquote>
<p style="font-size:13px;color:#666">This is an automated message from a no-reply address, so please do not reply to it. I will write to you from my personal email.</p>
<p>Harsh Kumar Singh</p></div>`,
    });
  } catch {}

  return NextResponse.json({ ok: true });
}
