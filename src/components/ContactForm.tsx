"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/content/site";
import { submitLead } from "@/lib/submitLead";
import { useMountainTime } from "@/lib/useMountainTime";

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

const EMPTY = { name: "", email: "", phone: "", company: "", msg: "" };

export function ContactForm() {
  const [f, setF] = useState(EMPTY);
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((s) => ({ ...s, [k]: e.target.value }));

  const submit = async () => {
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

  return (
    <div
      data-reveal=""
      className="rounded-[28px] border border-[rgba(255,255,255,.11)] bg-[linear-gradient(150deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-[clamp(24px,3.2vw,40px)] shadow-[0_40px_100px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-[16px]"
    >
      {!sent ? (
        <>
          <div className="font-display text-[24px] font-bold tracking-[-.02em]">Send us a message</div>
          <div className="mt-2 text-[14px] text-dim">Request a demo or tell us about your project.</div>
          <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
            <input aria-label="Full name" autoComplete="name" value={f.name} onChange={set("name")} placeholder="Full name" className="field" />
            <input aria-label="Email" type="email" autoComplete="email" value={f.email} onChange={set("email")} placeholder="Email" className="field" />
            <input aria-label="Phone" type="tel" autoComplete="tel" value={f.phone} onChange={set("phone")} placeholder="Phone" className="field" />
            <input aria-label="Organization" autoComplete="organization" value={f.company} onChange={set("company")} placeholder="Organization" className="field" />
          </div>
          <div className="mt-5 text-[12.5px] font-bold tracking-[.1em] text-subtle uppercase">I’m interested in</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {OPTIONS.map((label) => {
              const on = picked.includes(label);
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked((p) => (on ? p.filter((x) => x !== label) : p.concat(label)))}
                  className={`rounded-full border px-[14px] py-[9px] text-[13.5px] font-semibold transition-all duration-200 hover:border-[rgba(0,240,255,.45)] ${
                    on
                      ? "border-[rgba(0,240,255,.55)] bg-[rgba(0,240,255,.12)] text-white"
                      : "border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.03)] text-body-2"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <textarea
            aria-label="Message"
            value={f.msg}
            onChange={set("msg")}
            placeholder="How can we help?"
            rows={5}
            className="field mt-5 w-full resize-y leading-[1.6]"
          />
          {failed && (
            <div role="alert" className="mt-4 text-[14px] text-[#FF7A93]">
              Something went wrong. Please try again or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </div>
          )}
          <div className="mt-[22px] flex flex-wrap items-center justify-between gap-[14px]">
            <div className="text-[12.5px] text-[#6E7890]">
              By submitting you agree to our <Link href="/privacy-policy">Privacy Policy</Link>.
            </div>
            <button
              type="button"
              onClick={submit}
              disabled={busy}
              className="rounded-[14px] bg-[linear-gradient(120deg,#00F0FF,#8B7CFF)] px-[30px] py-4 font-display text-[16px] font-bold text-on-accent shadow-[0_12px_36px_rgba(0,240,255,.3)] transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_16px_48px_rgba(0,240,255,.55)] disabled:opacity-70"
            >
              Send message
            </button>
          </div>
        </>
      ) : (
        <div className="animate-[anIn_.4s_ease-out] px-[10px] py-[30px] text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-success text-[26px] text-success shadow-[0_0_30px_rgba(6,214,160,.35)]">
            ✓
          </div>
          <div className="mt-[22px] font-display text-[26px] font-bold">Thanks — message received.</div>
          <div className="mt-[10px] text-[15px] text-body">Our team will get back to you shortly at {f.email}.</div>
          <button type="button" onClick={reset} className="mt-[22px] inline-block text-[14px] font-semibold text-cyan">
            Send another message
          </button>
        </div>
      )}
    </div>
  );
}

export function KalispellCard() {
  const mtTime = useMountainTime();
  const pin = "absolute top-1/2 right-10 -mt-[7px] h-[14px] w-[14px] rounded-full";
  return (
    <div className="relative min-h-[200px] overflow-hidden rounded-3xl border border-[rgba(0,240,255,.24)] bg-[linear-gradient(150deg,rgba(0,240,255,.10),rgba(108,77,246,.08))] p-7">
      <div className={`${pin} bg-cyan shadow-[0_0_20px_#00F0FF]`} />
      <div className={`${pin} animate-[anRing_2.4s_ease-out_infinite] border-[1.5px] border-cyan`} />
      <div className={`${pin} animate-[anRing_2.4s_ease-out_infinite] border-[1.5px] border-cyan [animation-delay:1.2s]`} />
      <div className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[.1em] text-cyan-light uppercase">
        Kalispell, MT · {mtTime} local
      </div>
      <div className="mt-[14px] max-w-[24ch] font-display text-[22px] leading-[1.35] font-bold">{CONTACT.address}</div>
      <a href={CONTACT.mapsUrl} className="mt-4 inline-flex text-[14px] font-bold">
        Open in Maps →
      </a>
    </div>
  );
}
