"use client";

import { useState } from "react";
import { Box, Heading, Part, Ruled } from "@/components/form";
import { PIPELINE } from "@/content/home";

const REASONS = [
  { t: "Expert Team", d: "Our skilled professionals bring extensive industry experience and technical knowledge to every project." },
  {
    t: "Client-Centric Approach",
    d: "We collaborate closely with you to ensure your vision is realized, delivering solutions that exceed expectations.",
  },
  {
    t: "Cutting-Edge Technology",
    d: "We leverage the latest tools and technologies to provide modern, efficient solutions tailored to your needs.",
  },
];

export function WhyUs() {
  const [stage, setStage] = useState(0);
  const cur = PIPELINE[stage];

  return (
    <Part id="why" label="Why Choose Us?" className="pb-16">
      <Heading className="max-w-[20ch]">Eleven years of shipping, measured.</Heading>

      <Ruled className="mt-8 md:grid-cols-3">
        {REASONS.map((r) => (
          <Box key={r.t}>
            <Heading as="h3">{r.t}</Heading>
            <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-graphite">{r.d}</p>
          </Box>
        ))}
      </Ruled>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <Heading as="h3" className="!text-[clamp(24px,2.6vw,32px)]">
          How we work
        </Heading>
        <p className="m-0 text-[14.5px] text-muted">Click a stage to see what you get.</p>
      </div>
      <div role="tablist" aria-label="How we work" className="mt-4 grid border-t-2 border-l border-form sm:grid-cols-2 lg:grid-cols-4">
        {PIPELINE.map((p, i) => {
          const on = i === stage;
          return (
            <button
              key={p.n}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls="stage-panel"
              onClick={() => setStage(i)}
              className={`border-r border-b border-form p-4 text-left sm:p-5 ${on ? "bg-ink text-white" : "bg-paper hover:bg-form-tint"}`}
            >
              <span className={`font-mono text-[13px] ${on ? "text-white/70" : "text-form"}`}>Stage {p.n}</span>
              <span className={`mt-2 block text-[20px] leading-tight font-extrabold stretch-head ${on ? "text-white" : "text-ink"}`}>{p.name}</span>
              <span className={`mt-2 block text-[14px] leading-[1.5] ${on ? "text-white/80" : "text-graphite"}`}>{p.note}</span>
            </button>
          );
        })}
      </div>
      <div id="stage-panel" role="tabpanel" className="border-x border-b border-form p-5 sm:p-6">
        <div className="caption">Deliverable — {cur.name}</div>
        <p className="mt-2 mb-0 max-w-[72ch] font-mono text-[14.5px] leading-[1.7] text-ink">{cur.detail}</p>
      </div>
    </Part>
  );
}
