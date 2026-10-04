"use client";

import { useState } from "react";
import { Glass, Heading, Section, link } from "@/components/ui";
import { SERVICES } from "@/content/home";

export function Services() {
  const [svc, setSvc] = useState(0);
  const s = SERVICES[svc];

  return (
    <Section id="services" label="Our Services" className="pt-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading className="max-w-[16ch]">From concept to deployment.</Heading>
        <p className="m-0 max-w-[52ch] text-[16px] leading-[1.65] text-body">
          From concept to deployment, AlphaNet Solutions — HASH LLC delivers end-to-end software, healthcare technology,
          cloud, and digital transformation services designed to help businesses build, modernize, and scale.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start">
        <Glass className="p-1.5">
          <div role="tablist" aria-label="Our Services" aria-orientation="vertical" className="flex flex-col">
            {SERVICES.map((x, i) => {
              const on = i === svc;
              return (
                <button
                  key={x.title}
                  type="button"
                  role="tab"
                  id={`svc-tab-${i}`}
                  aria-selected={on}
                  aria-controls="svc-panel"
                  onClick={() => setSvc(i)}
                  className={`flex items-center justify-between gap-3 rounded-[11px] px-3.5 py-2.5 text-left text-[15px] font-medium ${
                    on ? "bg-holo/12 text-text shadow-[inset_0_0_0_1px_rgba(139,233,255,.35)]" : "text-body hover:bg-holo/5 hover:text-text"
                  }`}
                >
                  {x.title}
                  <span aria-hidden="true" className={`font-mono text-[11px] ${on ? "text-holo" : "text-transparent"}`}>
                    ●
                  </span>
                </button>
              );
            })}
          </div>
        </Glass>

        <Glass className="p-6 sm:p-8 lg:sticky lg:top-24">
          <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${svc}`} key={svc} className="animate-[rise_.3s_ease-out]">
            <Heading as="h3" className="!text-[clamp(22px,2.2vw,28px)]">
              {s.title}
            </Heading>
            {s.body.map((para) => (
              <p key={para} className="mt-4 mb-0 max-w-[68ch] text-[15.5px] leading-[1.7] text-body">
                {para}
              </p>
            ))}
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
              {s.chips.map((c) => (
                <li key={c} className="rounded-full border border-holo/20 px-3 py-1 font-mono text-[12px] text-text">
                  {c}
                </li>
              ))}
            </ul>
            {s.isRcm && (
              <a href="#rcm" className={`mt-6 inline-block text-[15px] ${link}`}>
                See the full RCM lifecycle ↓
              </a>
            )}
          </div>
        </Glass>
      </div>
    </Section>
  );
}

const TRACKS = [
  { n: "01", title: "Healthcare Software Development", body: "EHR/PMS, Patient Portal, AI, Integrations" },
  { n: "02", title: "EHR/PM Deployment & White-Labeling", body: "Existing software deployment, cloud, branding, customization" },
  { n: "03", title: "End-to-End RCM Services", body: "Billing, Coding, Claims, ERA, Denials, AR & Collections" },
];

export function Tracks() {
  return (
    <Section label="Healthcare tracks" className="pt-16">
      <div className="grid gap-4 md:grid-cols-3">
        {TRACKS.map((t) => (
          <Glass key={t.n} className="p-6">
            <div className="hud">Track {t.n}</div>
            <Heading as="h3" className="mt-3">
              {t.title}
            </Heading>
            <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-body">{t.body}</p>
          </Glass>
        ))}
      </div>
    </Section>
  );
}
