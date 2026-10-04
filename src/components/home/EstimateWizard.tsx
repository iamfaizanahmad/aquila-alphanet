"use client";

import { useState } from "react";
import { BUDGETS, SCOPES, TIMELINES } from "@/content/home";
import { CONTACT } from "@/content/site";
import { submitLead } from "@/lib/submitLead";

const selCls = (on: boolean) =>
  `cursor-pointer border transition-[border-color,background] duration-[250ms] hover:border-[rgba(0,240,255,.45)] ${
    on ? "border-[rgba(0,240,255,.5)] bg-[rgba(0,240,255,.10)]" : "border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.03)]"
  }`;

/** Scope weight → indicative build window (README § Estimate wizard). */
function estimateWindow(scope: string[]) {
  const total = scope.reduce((s, k) => s + (SCOPES.find((x) => x.key === k)?.w ?? 0), 0);
  if (!total) return "Pick a scope";
  if (total <= 8) return "3 – 5 weeks";
  if (total <= 16) return "6 – 10 weeks";
  if (total <= 30) return "3 – 5 months";
  return "5 – 8 months";
}

const EMPTY = { scope: [] as string[], budget: "", timeline: "", name: "", email: "", phone: "" };

export function EstimateWizard() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(EMPTY);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const estimate = estimateWindow(form.scope);
  const set = (patch: Partial<typeof EMPTY>) => setForm((f) => ({ ...f, ...patch }));
  const scopeNames = form.scope.map((k) => SCOPES.find((x) => x.key === k)!.name);

  const back = () => {
    if (sent) {
      setSent(false);
      setStep(1);
      setForm(EMPTY);
    } else if (step > 1) setStep(step - 1);
  };
  const next = async () => {
    if (sent || busy) return;
    if (step < 3) return setStep(step + 1);
    setBusy(true);
    setFailed(false);
    const ok = await submitLead("estimate-wizard", {
      name: form.name,
      email: form.email,
      phone: form.phone,
      scope: scopeNames,
      budget: form.budget,
      timeline: form.timeline,
      estimate,
    });
    setBusy(false);
    if (ok) setSent(true);
    else setFailed(true);
  };

  return (
    <section
      id="estimate"
      className="relative z-[1] border-t border-[rgba(255,255,255,.06)] bg-[linear-gradient(180deg,transparent,rgba(0,240,255,.05))] px-gutter py-section"
    >
      <div className="mx-auto max-w-[1000px]">
        <div className="text-center">
          <div data-reveal="" className="kicker text-cyan">
            05 — Project Estimate
          </div>
          <h2 data-reveal="80" className="mt-4 mb-0 font-display text-[clamp(30px,4.2vw,52px)] leading-[1.08] font-bold tracking-[-.03em]">
            Three steps to a call back.
          </h2>
        </div>
        <div
          data-reveal="160"
          className="mt-10 rounded-[28px] border border-[rgba(255,255,255,.11)] bg-[linear-gradient(150deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] p-[clamp(24px,3.2vw,44px)] shadow-[0_40px_100px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-[16px]"
        >
          <div className="flex items-center gap-[10px]">
            {["1 · Scope", "2 · Scale", "3 · Contact"].map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className="h-[5px] rounded-[3px] transition-[background] duration-[350ms]"
                  style={{ background: step > i ? "linear-gradient(90deg,#00F0FF,#8B7CFF)" : "rgba(255,255,255,.12)" }}
                />
                <div className="mt-[10px] text-[12.5px] font-semibold" style={{ color: step > i ? "#8FF6FF" : "#7E89A0" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {step === 1 && !sent && (
            <div className="mt-[34px] animate-[anIn_.35s_ease-out]">
              <div className="font-display text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-.02em]">What are we building?</div>
              <div className="mt-2 text-[14.5px] text-muted">Pick everything that applies.</div>
              <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
                {SCOPES.map((x) => {
                  const on = form.scope.includes(x.key);
                  return (
                    <button
                      key={x.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set({ scope: on ? form.scope.filter((k) => k !== x.key) : form.scope.concat(x.key) })}
                      className={`rounded-2xl p-[18px] text-left ${selCls(on)}`}
                    >
                      <div className="flex items-center justify-between gap-[10px]">
                        <span className="font-display text-[15.5px] font-semibold">{x.name}</span>
                        <span className="font-mono text-[13px]" style={{ color: on ? "#00F0FF" : "rgba(255,255,255,.14)" }}>
                          ✓
                        </span>
                      </div>
                      <div className="mt-[7px] text-[12.5px] text-dim">{x.hint}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && !sent && (
            <div className="mt-[34px] animate-[anIn_.35s_ease-out]">
              <div className="font-display text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-.02em]">Scale and timing</div>
              <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6">
                {(
                  [
                    ["Budget range", BUDGETS, "budget"],
                    ["Start window", TIMELINES, "timeline"],
                  ] as const
                ).map(([title, opts, key]) => (
                  <div key={key}>
                    <div className="text-[12.5px] font-semibold tracking-[.1em] text-subtle uppercase">{title}</div>
                    <div className="mt-3 flex flex-col gap-[10px]">
                      {opts.map((o) => (
                        <button
                          key={o}
                          type="button"
                          aria-pressed={form[key] === o}
                          onClick={() => set({ [key]: o })}
                          className={`rounded-[13px] px-4 py-[14px] text-left text-[14.5px] font-medium ${selCls(form[key] === o)}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[rgba(0,240,255,.22)] bg-[rgba(0,240,255,.06)] px-5 py-[18px]">
                <div className="text-[14px] text-[#B6C0D3]">Indicative build window for what you picked</div>
                <div className="font-display text-[24px] font-extrabold tracking-[-.02em] text-cyan-light">{estimate}</div>
              </div>
            </div>
          )}

          {step === 3 && !sent && (
            <div className="mt-[34px] animate-[anIn_.35s_ease-out]">
              <div className="font-display text-[clamp(20px,2.4vw,26px)] font-bold tracking-[-.02em]">Where do we call you?</div>
              <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[14px]">
                <input aria-label="Full name" autoComplete="name" value={form.name} onChange={(e) => set({ name: e.target.value })} placeholder="Full name" className="field" />
                <input aria-label="Work email" type="email" autoComplete="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="Work email" className="field" />
                <input aria-label="Phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} placeholder="Phone" className="field" />
              </div>
              <div className="mt-5 rounded-2xl border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.03)] p-5 text-[14px] leading-[1.8] text-[#B6C0D3]">
                <div>
                  <span className="text-subtle">Scope — </span>
                  {scopeNames.length ? scopeNames.join(", ") : "Not selected"}
                </div>
                <div>
                  <span className="text-subtle">Budget — </span>
                  {form.budget || "Not selected"}
                </div>
                <div>
                  <span className="text-subtle">Start — </span>
                  {form.timeline || "Not selected"}
                </div>
                <div>
                  <span className="text-subtle">Estimated window — </span>
                  <span className="font-bold text-cyan-light">{estimate}</span>
                </div>
              </div>
              {failed && (
                <div role="alert" className="mt-4 text-[14px] text-[#FF7A93]">
                  Something went wrong. Please try again or email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                </div>
              )}
            </div>
          )}

          {sent && (
            <div className="mt-[34px] animate-[anIn_.35s_ease-out] rounded-[20px] border border-[rgba(6,214,160,.3)] bg-[rgba(6,214,160,.08)] p-8 text-center">
              <div className="font-display text-[24px] font-bold">Request received. We&apos;ll call within one business day.</div>
              <div className="mt-[10px] text-[14.5px] text-body">
                Prefer email? Write to <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </div>
            </div>
          )}

          <div className="mt-[30px] flex flex-wrap items-center justify-between gap-[14px]">
            <button type="button" onClick={back} className="text-[14px] font-semibold text-dim hover:text-ink">
              {sent ? "Start over" : step === 1 ? "Step 1 of 3" : "← Back"}
            </button>
            <button
              type="button"
              onClick={next}
              disabled={busy}
              className="rounded-[14px] bg-[linear-gradient(120deg,#00F0FF,#8B7CFF)] px-[30px] py-4 font-display text-[16px] font-bold text-on-accent shadow-[0_12px_36px_rgba(0,240,255,.3)] transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-[0_16px_48px_rgba(0,240,255,.55)] disabled:opacity-70"
            >
              {sent ? "Submitted" : step === 3 ? "Get my call back" : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
