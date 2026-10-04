"use client";

import { useState } from "react";
import { Box, Check, Heading, Part, Ruled } from "@/components/form";
import { SERVICES } from "@/content/home";

export function Services() {
  const [svc, setSvc] = useState(0);
  const s = SERVICES[svc];

  return (
    <Part id="services" label="Our Services" className="pt-8 pb-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading className="max-w-[16ch]">From concept to deployment.</Heading>
        <p className="m-0 max-w-[52ch] text-[16px] leading-[1.65] text-graphite">
          From concept to deployment, AlphaNet Solutions — HASH LLC delivers end-to-end software, healthcare technology,
          cloud, and digital transformation services designed to help businesses build, modernize, and scale.
        </p>
      </div>

      <Ruled className="mt-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div role="tablist" aria-label="Our Services" aria-orientation="vertical" className="flex flex-col p-0">
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
                className={`flex items-center gap-3 border-b border-dashed border-form px-4 py-3 text-left text-[16px] font-semibold stretch-head last:border-b-0 sm:px-5 ${
                  on ? "bg-form-tint text-ink" : "text-graphite hover:bg-form-tint/60 hover:text-ink"
                }`}
              >
                <Check on={on} />
                {x.title}
              </button>
            );
          })}
        </div>

        <Box className="lg:sticky lg:top-24 lg:self-start" caption="Service detail">
          <div id="svc-panel" role="tabpanel" aria-labelledby={`svc-tab-${svc}`}>
            <Heading as="h3" className="mt-3">
              {s.title}
            </Heading>
            {s.body.map((para) => (
              <p key={para} className="mt-4 mb-0 max-w-[68ch] text-[15.5px] leading-[1.7] text-graphite">
                {para}
              </p>
            ))}
            <ul className="m-0 mt-6 flex list-none flex-wrap gap-2 p-0">
              {s.chips.map((c) => (
                <li key={c} className="border border-dashed border-form px-2.5 py-1 font-mono text-[12.5px] text-ink">
                  {c}
                </li>
              ))}
            </ul>
            {s.isRcm && (
              <a href="#rcm" className="mt-6 inline-block text-[15px] font-bold text-form underline underline-offset-4">
                See the full RCM lifecycle ↓
              </a>
            )}
          </div>
        </Box>
      </Ruled>
    </Part>
  );
}

const TRACKS = [
  { n: "01", title: "Healthcare Software Development", body: "EHR/PMS, Patient Portal, AI, Integrations" },
  { n: "02", title: "EHR/PM Deployment & White-Labeling", body: "Existing software deployment, cloud, branding, customization" },
  { n: "03", title: "End-to-End RCM Services", body: "Billing, Coding, Claims, ERA, Denials, AR & Collections" },
];

export function Tracks() {
  return (
    <Part label="Healthcare tracks" className="pb-16">
      <Ruled className="md:grid-cols-3">
        {TRACKS.map((t) => (
          <Box key={t.n} caption={`Track ${t.n}`}>
            <Heading as="h3" className="mt-3">
              {t.title}
            </Heading>
            <p className="mt-2 mb-0 font-mono text-[13.5px] leading-[1.6] text-ink">{t.body}</p>
          </Box>
        ))}
      </Ruled>
    </Part>
  );
}
