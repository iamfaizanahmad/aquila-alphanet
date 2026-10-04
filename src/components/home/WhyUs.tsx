"use client";

import { useEffect, useState } from "react";
import { PIPELINE } from "@/content/home";

const REASONS = [
  {
    n: "01",
    c: "text-cyan",
    t: "Expert Team",
    d: "Our skilled professionals bring extensive industry experience and technical knowledge to every project.",
  },
  {
    n: "02",
    c: "text-violet",
    t: "Client-Centric Approach",
    d: "We collaborate closely with you to ensure your vision is realized, delivering solutions that exceed expectations.",
  },
  {
    n: "03",
    c: "text-purple",
    t: "Cutting-Edge Technology",
    d: "We leverage the latest tools and technologies to provide modern, efficient solutions tailored to your needs.",
  },
];

export function WhyUs() {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setStage((s) => (s + 1) % PIPELINE.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const cur = PIPELINE[stage];

  return (
    <section id="why" className="relative z-[1] border-t border-[rgba(255,255,255,.06)] px-gutter py-section">
      <div className="container-site">
        <div data-reveal="" className="kicker text-cyan">
          04 — Why Choose Us?
        </div>
        <h2
          data-reveal="80"
          className="mt-4 mb-0 max-w-[24ch] font-display text-[clamp(30px,4.2vw,54px)] leading-[1.08] font-bold tracking-[-.03em]"
        >
          Eleven years of shipping, measured.
        </h2>

        <div data-stagger="" className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          {REASONS.map((r) => (
            <div
              key={r.n}
              data-tilt="4"
              className="rounded-[22px] border border-[rgba(255,255,255,.09)] bg-[linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.015))] p-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,.1)] transition-transform duration-[250ms] ease-in-out"
            >
              <div className={`font-mono text-[12px] ${r.c}`}>{r.n}</div>
              <h3 className="mt-[14px] mb-0 font-display text-[21px] font-bold">{r.t}</h3>
              <p className="mt-[10px] mb-0 text-[14.5px] leading-[1.65] text-muted">{r.d}</p>
            </div>
          ))}
        </div>

        <div
          data-reveal=""
          className="mt-7 rounded-[26px] border border-[rgba(255,255,255,.09)] bg-[linear-gradient(150deg,rgba(108,77,246,.10),rgba(255,255,255,.02))] p-[clamp(24px,3vw,40px)] backdrop-blur-[14px]"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="m-0 font-display text-[clamp(22px,2.6vw,30px)] font-bold tracking-[-.02em]">How we work</h3>
            <div className="text-[13.5px] text-muted">Click a stage to see what you get.</div>
          </div>
          <div className="relative mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-[14px]">
            {PIPELINE.map((p, i) => {
              const on = i === stage;
              return (
                <button
                  key={p.n}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setStage(i);
                    setAuto(false);
                  }}
                  className={`relative overflow-hidden rounded-[18px] border px-[18px] py-5 text-left transition-[border-color,background] duration-[350ms] hover:border-[rgba(0,240,255,.4)] ${
                    on ? "border-[rgba(0,240,255,.5)] bg-[rgba(0,240,255,.09)]" : "border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.03)]"
                  }`}
                >
                  <div className="flex items-center gap-[10px]">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-[9px] font-mono text-[12px] font-semibold transition-all duration-[350ms]"
                      style={{
                        background: on
                          ? "linear-gradient(140deg,#00F0FF,#8B7CFF)"
                          : i < stage
                            ? "rgba(0,240,255,.2)"
                            : "rgba(255,255,255,.1)",
                        color: on ? "#04070e" : "#B6C0D3",
                      }}
                    >
                      {p.n}
                    </span>
                    <span className="font-display text-[16px] font-bold">{p.name}</span>
                  </div>
                  <div className="mt-3 text-[13px] leading-[1.6] text-[#96A0B4]">{p.note}</div>
                  {on && auto && (
                    <span className="absolute right-0 bottom-0 left-0 h-[2px] origin-[0_50%] animate-[anFill_5s_linear_forwards] bg-[linear-gradient(90deg,#00F0FF,#8B7CFF)]" />
                  )}
                </button>
              );
            })}
          </div>
          <div
            key={cur.n}
            className="mt-[18px] animate-[anIn_.4s_ease-out] rounded-[18px] border border-[rgba(0,240,255,.22)] bg-[rgba(0,240,255,.06)] px-6 py-[22px]"
          >
            <div className="font-mono text-[11.5px] tracking-[.14em] text-cyan-light uppercase">Deliverable — {cur.name}</div>
            <div className="mt-3 max-w-[72ch] text-[16px] leading-[1.7] text-[#D6DCE8]">{cur.detail}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
