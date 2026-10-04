"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/content/site";
import { submitLead } from "@/lib/submitLead";
import { useMountainTime } from "@/lib/useMountainTime";
import { Glass, Heading, Tick, btnPrimary, link } from "./ui";

const OPTIONS = [
  "Aquila EHR/PMS demo",
  "Credentialing",
  "Ticketing",
  "PersonicEMR",
  "WoundWise",
  "Custom software",
  "Web & mobile app",
  "EHR/PM deployment",
  "Cloud & DevOps",
  "AI & automation",
  "RCM services",
  "UI/UX & branding",
];

const FIELDS = [
  ["name", "Full name", "text", "name"],
  ["email", "Email", "email", "email"],
  ["phone", "Phone", "tel", "tel"],
  ["company", "Organization", "text", "organization"],
] as const;

const EMPTY = { name: "", email: "", phone: "", company: "", msg: "" };
const fieldLabel = "text-[14px] font-medium text-text";

export function ContactForm() {
  const [f, setF] = useState(EMPTY);
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setFailed(false);
    const ok = await submitLead("contact-form", { ...f, interests: picked });
    setBusy(false);
    if (ok) setSent(true);
    else setFailed(true);
  };
  const reset = () => {
    setSent(false);
    setPicked([]);
    setF(EMPTY);
  };

  if (sent) {
    return (
      <Glass className="p-6 sm:p-8">
        <div role="status" className="flex items-start gap-4">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-qa bg-qa/15 text-[18px] font-bold text-qa">✓</span>
          <div>
            <Heading as="h3">Thanks — message received.</Heading>
            <p className="mt-2 mb-0 text-[16px] text-body">Our team will get back to you shortly at {f.email}.</p>
            <button type="button" onClick={reset} className={`mt-5 text-[15px] ${link}`}>
              Send another message
            </button>
          </div>
        </div>
      </Glass>
    );
  }

  return (
    <Glass className="p-5 sm:p-8">
      <form onSubmit={submit}>
        <Heading as="h3">Send us a message</Heading>
        <p className="mt-1 mb-0 text-[15px] text-muted">Request a demo or tell us about your project.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {FIELDS.map(([key, label, type, ac]) => (
            <label key={key} className="block">
              <span className={fieldLabel}>{label}</span>
              <input type={type} autoComplete={ac} value={f[key]} onChange={(e) => setF((s) => ({ ...s, [key]: e.target.value }))} placeholder={label} className="field mt-1.5" />
            </label>
          ))}
        </div>
        <fieldset className="m-0 mt-6 border-0 p-0">
          <legend className={`${fieldLabel} mb-2.5 p-0`}>I’m interested in</legend>
          <div className="flex flex-wrap gap-2">
            {OPTIONS.map((label) => {
              const on = picked.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked((p) => (on ? p.filter((x) => x !== label) : p.concat(label)))}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[14px] font-medium ${on ? "border-holo bg-holo/10 text-text" : "border-holo/20 text-body hover:border-holo/50"}`}
                >
                  <Tick on={on} className={on ? "!border-holo !bg-holo/20 !text-holo" : ""} />
                  {label}
                </button>
              );
            })}
          </div>
        </fieldset>
        <label className="mt-6 block">
          <span className={fieldLabel}>How can we help?</span>
          <textarea value={f.msg} onChange={(e) => setF((s) => ({ ...s, msg: e.target.value }))} placeholder="How can we help?" rows={5} className="field mt-1.5 resize-y leading-[1.6]" />
        </label>
        {failed && (
          <p role="alert" className="mt-4 mb-0 text-[15px] font-semibold text-amber">
            Something went wrong. Please try again or email{" "}
            <a className="underline" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            .
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="m-0 text-[14px] text-muted">
            By submitting you agree to our{" "}
            <Link href="/privacy-policy" className={link}>
              Privacy Policy
            </Link>
            .
          </p>
          <button type="submit" disabled={busy} className={btnPrimary}>
            Send message
          </button>
        </div>
      </form>
    </Glass>
  );
}

export function ContactDetails() {
  const mtTime = useMountainTime();
  return (
    <div className="grid gap-4">
      <Glass className="p-6">
        <div className="hud">Kalispell, MT · {mtTime || "—"} local</div>
        <p className="mt-2 mb-0 max-w-[24ch] text-[21px] leading-[1.3] font-semibold text-text">{CONTACT.address}</p>
        <a href={CONTACT.mapsUrl} className={`mt-4 inline-block text-[15px] ${link}`}>
          Open in Maps
        </a>
      </Glass>
      <a href={CONTACT.phoneHref} className="group">
        <Glass className="p-5 group-hover:border-holo/50">
          <div className="hud">Contact #</div>
          <div className="mt-1 text-[21px] font-semibold text-text">{CONTACT.phone}</div>
        </Glass>
      </a>
      <a href={`mailto:${CONTACT.email}`} className="group">
        <Glass className="p-5 group-hover:border-holo/50">
          <div className="hud">Email</div>
          <div className="mt-1 text-[clamp(16px,1.6vw,19px)] font-semibold text-text [overflow-wrap:anywhere]">{CONTACT.email}</div>
        </Glass>
      </a>
      <div className="grid grid-cols-2 gap-4">
        <Glass className="p-5">
          <div className="hud">Fax #</div>
          <div className="mt-1 text-[17px] font-semibold text-text">{CONTACT.fax}</div>
        </Glass>
        <Glass className="p-5">
          <div className="hud">Follow</div>
          <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
            <a className={link} href={CONTACT.linkedin}>
              LinkedIn
            </a>
            <a className={link} href={CONTACT.instagram}>
              Instagram
            </a>
          </div>
        </Glass>
      </div>
      <a href={CONTACT.website} className="px-1 text-[14px] text-muted hover:text-text">
        Website: https://alphanetssolutions.com/
      </a>
    </div>
  );
}
