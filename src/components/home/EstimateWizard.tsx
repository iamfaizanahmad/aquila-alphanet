"use client";

import { useState } from "react";
import { Glass, Heading, Section, Tick, btnPrimary, link } from "@/components/ui";
import { BUDGETS, SCOPES, TIMELINES } from "@/content/home";
import { CONTACT } from "@/content/site";
import { submitLead } from "@/lib/submitLead";

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
const STEPS = ["1 · Scope", "2 · Scale", "3 · Contact"];

const option = (on: boolean) =>
  `flex w-full items-start gap-3 rounded-[12px] border p-4 text-left transition-colors ${
    on ? "border-holo bg-holo/10" : "border-holo/15 bg-void/40 hover:border-holo/50"
  }`;

function Radio({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true" className={`grid h-[18px] w-[18px] flex-none place-items-center rounded-full border ${on ? "border-holo" : "border-holo/30"}`}>
      {on && <span className="h-2 w-2 rounded-full bg-holo" />}
    </span>
  );
}

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
    <Section id="estimate" label="Project Estimate" className="pt-20">
      <Heading>Three steps to a call back.</Heading>

      <Glass className="mt-8 overflow-hidden">
        <ol className="m-0 grid list-none grid-cols-3 border-b border-holo/10 p-0">
          {STEPS.map((label, i) => {
            const done = step > i + 1 || sent;
            const on = step === i + 1 && !sent;
            return (
              <li key={label} aria-current={on ? "step" : undefined} className="relative px-4 py-3.5 sm:px-6">
                <span className={`text-[14px] font-semibold ${on ? "text-text" : done ? "text-qa" : "text-muted"}`}>
                  {done && <span className="mr-1.5">✓</span>}
                  {label}
                </span>
                <span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-[2px] ${on ? "bg-holo" : done ? "bg-qa" : "bg-transparent"}`} />
              </li>
            );
          })}
        </ol>

        <div className="p-5 sm:p-8">
          {step === 1 && !sent && (
            <fieldset className="m-0 border-0 p-0">
              <legend className="p-0">
                <Heading as="h3">What are we building?</Heading>
                <p className="mt-1 mb-0 text-[15px] text-muted">Pick everything that applies.</p>
              </legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {SCOPES.map((x) => {
                  const on = form.scope.includes(x.key);
                  return (
                    <button
                      key={x.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set({ scope: on ? form.scope.filter((k) => k !== x.key) : form.scope.concat(x.key) })}
                      className={option(on)}
                    >
                      <Tick on={on} className={`mt-0.5 ${on ? "!border-holo !bg-holo/20 !text-holo" : ""}`} />
                      <span>
                        <span className="block text-[16px] leading-tight font-semibold text-text">{x.name}</span>
                        <span className="mt-1 block text-[13.5px] leading-[1.45] text-muted">{x.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && !sent && (
            <div>
              <Heading as="h3">Scale and timing</Heading>
              <div className="mt-5 grid gap-8 md:grid-cols-2">
                {(
                  [
                    ["Budget range", BUDGETS, "budget"],
                    ["Start window", TIMELINES, "timeline"],
                  ] as const
                ).map(([title, opts, key]) => (
                  <div key={key} role="radiogroup" aria-label={title}>
                    <div className="hud">{title}</div>
                    <div className="mt-2.5 space-y-2">
                      {opts.map((o) => {
                        const on = form[key] === o;
                        return (
                          <button key={o} type="button" role="radio" aria-checked={on} onClick={() => set({ [key]: o })} className={`${option(on)} items-center !py-3`}>
                            <Radio on={on} />
                            <span className="text-[15px] font-medium text-text">{o}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 rounded-[12px] border border-holo/20 bg-holo/5 px-5 py-4">
                <span className="text-[15px] text-body">Indicative build window for what you picked</span>
                <span aria-live="polite" className="font-display text-[26px] font-semibold tracking-[-.02em] text-holo">
                  {estimate}
                </span>
              </div>
            </div>
          )}

          {step === 3 && !sent && (
            <div>
              <Heading as="h3">Where do we call you?</Heading>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {(
                  [
                    ["name", "Full name", "text", "name"],
                    ["email", "Work email", "email", "email"],
                    ["phone", "Phone", "tel", "tel"],
                  ] as const
                ).map(([key, label, type, ac]) => (
                  <label key={key} className="block">
                    <span className="text-[14px] font-medium text-text">{label}</span>
                    <input type={type} autoComplete={ac} value={form[key]} onChange={(e) => set({ [key]: e.target.value })} placeholder={label} className="field mt-1.5" />
                  </label>
                ))}
              </div>
              <dl className="m-0 mt-6 grid gap-x-6 gap-y-3 rounded-[12px] border border-holo/15 bg-void/40 p-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Scope", scopeNames.length ? scopeNames.join(", ") : "Not selected"],
                  ["Budget", form.budget || "Not selected"],
                  ["Start", form.timeline || "Not selected"],
                  ["Estimated window", estimate],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="hud">{k}</dt>
                    <dd className="m-0 mt-1 text-[15px] leading-[1.45] font-medium text-text">{v}</dd>
                  </div>
                ))}
              </dl>
              {failed && (
                <p role="alert" className="mt-4 mb-0 text-[15px] font-semibold text-amber">
                  Something went wrong. Please try again or email{" "}
                  <a className="underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                  .
                </p>
              )}
            </div>
          )}

          {sent && (
            <div role="status" className="flex items-start gap-4">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-qa bg-qa/15 text-[18px] font-bold text-qa">✓</span>
              <div>
                <Heading as="h3">Request received. We&apos;ll call within one business day.</Heading>
                <p className="mt-2 mb-0 text-[15.5px] text-body">
                  Prefer email? Write to{" "}
                  <a className={link} href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-holo/10 px-5 py-4 sm:px-8">
          <button type="button" onClick={back} disabled={!sent && step === 1} className="text-[15px] font-medium text-muted hover:text-text disabled:hover:text-muted">
            {sent ? "Start over" : step === 1 ? "Step 1 of 3" : "Back"}
          </button>
          <button type="button" onClick={next} disabled={busy || sent} className={btnPrimary}>
            {sent ? "Submitted" : step === 3 ? "Get my call back" : "Continue"}
          </button>
        </div>
      </Glass>
    </Section>
  );
}
