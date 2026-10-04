"use client";

import { useState } from "react";
import { Box, Caption, Check, Heading, Part, Ruled, Stamp, btnInk } from "@/components/form";
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

function Radio({ on }: { on: boolean }) {
  return (
    <span aria-hidden="true" className="grid h-[15px] w-[15px] flex-none place-items-center rounded-full border border-form">
      {on && <span className="h-[7px] w-[7px] rounded-full bg-ink" />}
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
    <Part id="estimate" label="Project Estimate" className="pb-16">
      <Heading>Three steps to a call back.</Heading>

      <div className="mt-8 border-2 border-form">
        <ol className="m-0 grid list-none grid-cols-3 p-0">
          {STEPS.map((label, i) => {
            const done = step > i + 1 || sent;
            const on = step === i + 1 && !sent;
            return (
              <li
                key={label}
                aria-current={on ? "step" : undefined}
                className={`flex items-center gap-2 border-b border-form px-3 py-3 text-[14px] font-bold stretch-head sm:px-5 ${i < 2 ? "border-r" : ""} ${
                  on ? "bg-ink text-white" : done ? "bg-form-tint text-ink" : "text-muted"
                }`}
              >
                {done && <Check on />}
                {label}
              </li>
            );
          })}
        </ol>

        <div className="p-4 sm:p-7">
          {step === 1 && !sent && (
            <fieldset className="m-0 border-0 p-0">
              <legend className="p-0">
                <Heading as="h3">What are we building?</Heading>
                <p className="mt-1 mb-0 text-[15px] text-muted">Pick everything that applies.</p>
              </legend>
              <Ruled className="mt-5 sm:grid-cols-2 lg:grid-cols-4">
                {SCOPES.map((x) => {
                  const on = form.scope.includes(x.key);
                  return (
                    <button
                      key={x.key}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set({ scope: on ? form.scope.filter((k) => k !== x.key) : form.scope.concat(x.key) })}
                      className={`flex gap-3 p-4 text-left ${on ? "bg-form-tint" : "bg-paper hover:bg-form-tint/60"}`}
                    >
                      <Check on={on} className="mt-0.5" />
                      <span>
                        <span className="block text-[16.5px] leading-tight font-bold text-ink stretch-head">{x.name}</span>
                        <span className="mt-1 block text-[13.5px] leading-[1.45] text-muted">{x.hint}</span>
                      </span>
                    </button>
                  );
                })}
              </Ruled>
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
                    <Caption className="text-[12.5px]">{title}</Caption>
                    <div className="mt-2 border-t border-form">
                      {opts.map((o) => {
                        const on = form[key] === o;
                        return (
                          <button
                            key={o}
                            type="button"
                            role="radio"
                            aria-checked={on}
                            onClick={() => set({ [key]: o })}
                            className={`flex w-full items-center gap-3 border-b border-form px-2 py-3 text-left font-mono text-[14.5px] text-ink ${on ? "bg-form-tint" : "hover:bg-form-tint/60"}`}
                          >
                            <Radio on={on} />
                            {o}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-2 border-dashed border-form bg-form-tint px-4 py-4">
                <span className="text-[15px] text-graphite">Indicative build window for what you picked</span>
                <span aria-live="polite" className="font-mono text-[26px] font-semibold text-ink">
                  {estimate}
                </span>
              </div>
            </div>
          )}

          {step === 3 && !sent && (
            <div>
              <Heading as="h3">Where do we call you?</Heading>
              <Ruled className="mt-5 md:grid-cols-3">
                {(
                  [
                    ["name", "Full name", "text", "name"],
                    ["email", "Work email", "email", "email"],
                    ["phone", "Phone", "tel", "tel"],
                  ] as const
                ).map(([key, label, type, ac]) => (
                  <label key={key} className="block p-4">
                    <Caption>{label}</Caption>
                    <input
                      type={type}
                      autoComplete={ac}
                      value={form[key]}
                      onChange={(e) => set({ [key]: e.target.value })}
                      placeholder={label}
                      className="field mt-1"
                    />
                  </label>
                ))}
              </Ruled>
              <Ruled className="mt-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Scope", scopeNames.length ? scopeNames.join(", ") : "Not selected"],
                  ["Budget", form.budget || "Not selected"],
                  ["Start", form.timeline || "Not selected"],
                  ["Estimated window", estimate],
                ].map(([k, v]) => (
                  <Box key={k} caption={k}>
                    <div className="mt-1 font-mono text-[14px] leading-[1.55] text-ink">{v}</div>
                  </Box>
                ))}
              </Ruled>
              {failed && (
                <p role="alert" className="mt-4 mb-0 text-[15px] font-semibold text-form">
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
            <div role="status" className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
              <div>
                <Heading as="h3">Request received. We&apos;ll call within one business day.</Heading>
                <p className="mt-3 mb-0 text-[15.5px] text-graphite">
                  Prefer email? Write to{" "}
                  <a className="font-semibold text-form underline" href={`mailto:${CONTACT.email}`}>
                    {CONTACT.email}
                  </a>
                  .
                </p>
              </div>
              <Stamp label="RECEIVED" sub={new Date().toLocaleDateString("en-US")} rot={-6} />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-form px-4 py-4 sm:px-7">
          <button type="button" onClick={back} className="text-[15px] font-semibold text-muted hover:text-ink disabled:hover:text-muted" disabled={!sent && step === 1}>
            {sent ? "Start over" : step === 1 ? "Step 1 of 3" : "Back"}
          </button>
          <button type="button" onClick={next} disabled={busy || sent} className={btnInk}>
            {sent ? "Submitted" : step === 3 ? "Get my call back" : "Continue"}
          </button>
        </div>
      </div>
    </Part>
  );
}
