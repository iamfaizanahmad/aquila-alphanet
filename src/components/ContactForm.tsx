"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/content/site";
import { submitLead } from "@/lib/submitLead";
import { useMountainTime } from "@/lib/useMountainTime";
import { Box, Caption, Check, Heading, Ruled, Stamp, btnInk } from "./form";

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
      <div role="status" className="border-2 border-form p-6 sm:p-8">
        <Stamp label="RECEIVED" sub={new Date().toLocaleDateString("en-US")} rot={-6} />
        <Heading as="h3" className="mt-6">
          Thanks — message received.
        </Heading>
        <p className="mt-3 mb-0 text-[16px] text-graphite">
          Our team will get back to you shortly at <span className="font-mono text-ink">{f.email}</span>.
        </p>
        <button type="button" onClick={reset} className="mt-6 text-[15px] font-bold text-form underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="border-2 border-form">
      <div className="border-b border-form p-4 sm:p-6">
        <Heading as="h3">Send us a message</Heading>
        <p className="mt-1 mb-0 text-[15px] text-muted">Request a demo or tell us about your project.</p>
      </div>
      <div className="grid sm:grid-cols-2">
        {FIELDS.map(([key, label, type, ac], i) => (
          <label key={key} className={`block border-b border-form p-4 sm:px-6 ${i % 2 === 0 ? "sm:border-r" : ""}`}>
            <Caption>{label}</Caption>
            <input
              type={type}
              autoComplete={ac}
              value={f[key]}
              onChange={(e) => setF((s) => ({ ...s, [key]: e.target.value }))}
              placeholder={label}
              className="field mt-1"
            />
          </label>
        ))}
      </div>
      <fieldset className="m-0 border-0 border-b border-form p-4 sm:px-6">
        <legend className="caption float-left mb-3 w-full p-0 text-[12.5px]">I’m interested in</legend>
        <div className="clear-both grid gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {OPTIONS.map((label) => {
            const on = picked.includes(label);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setPicked((p) => (on ? p.filter((x) => x !== label) : p.concat(label)))}
                className="flex items-center gap-2.5 py-1 text-left text-[15px] text-ink hover:text-form"
              >
                <Check on={on} />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <label className="block border-b border-form p-4 sm:px-6">
        <Caption>How can we help?</Caption>
        <textarea
          value={f.msg}
          onChange={(e) => setF((s) => ({ ...s, msg: e.target.value }))}
          placeholder="How can we help?"
          rows={5}
          className="field mt-1 resize-y leading-[1.6]"
        />
      </label>
      {failed && (
        <p role="alert" className="m-0 border-b border-form px-4 py-3 text-[15px] font-semibold text-form sm:px-6">
          Something went wrong. Please try again or email{" "}
          <a className="underline" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          .
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6">
        <p className="m-0 text-[13.5px] text-muted">
          By submitting you agree to our{" "}
          <Link href="/privacy-policy" className="text-form underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <button type="submit" disabled={busy} className={btnInk}>
          Send message
        </button>
      </div>
    </form>
  );
}

const linkRow = "flex items-center justify-between gap-3 hover:bg-form-tint";

export function ContactDetails() {
  const mtTime = useMountainTime();
  return (
    <Ruled>
      <Box caption={<>Kalispell, MT · {mtTime || "—"} local</>}>
        <p className="mt-3 mb-0 max-w-[24ch] text-[22px] leading-[1.25] font-extrabold text-ink stretch-head">{CONTACT.address}</p>
        <a href={CONTACT.mapsUrl} className="mt-4 inline-block text-[15px] font-bold text-form underline underline-offset-4">
          Open in Maps
        </a>
      </Box>
      <a href={CONTACT.phoneHref} className={`${linkRow} p-4 sm:p-5`}>
        <span>
          <Caption>Contact #</Caption>
          <span className="mt-1 block font-mono text-[20px] text-ink">{CONTACT.phone}</span>
        </span>
      </a>
      <a href={`mailto:${CONTACT.email}`} className={`${linkRow} p-4 sm:p-5`}>
        <span className="min-w-0">
          <Caption>Email</Caption>
          <span className="mt-1 block font-mono text-[clamp(15px,1.6vw,18px)] text-ink [overflow-wrap:anywhere]">{CONTACT.email}</span>
        </span>
      </a>
      <div className="grid grid-cols-2 p-0">
        <Box caption="Fax #" className="border-r border-form">
          <div className="mt-1 font-mono text-[18px] text-ink">{CONTACT.fax}</div>
        </Box>
        <Box caption="Follow">
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[15px] font-bold">
            <a className="text-ink underline underline-offset-4 hover:text-form" href={CONTACT.linkedin}>
              LinkedIn
            </a>
            <a className="text-ink underline underline-offset-4 hover:text-form" href={CONTACT.instagram}>
              Instagram
            </a>
          </div>
        </Box>
      </div>
      <a href={CONTACT.website} className="p-4 font-mono text-[13.5px] text-muted hover:text-ink sm:px-5">
        Website: https://alphanetssolutions.com/
      </a>
    </Ruled>
  );
}
