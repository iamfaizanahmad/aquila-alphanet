"use client";

import { useEffect, useState } from "react";
import { SERVICES } from "@/content/home";

const pad = (n: number) => String(n).padStart(2, "0");

export function Services() {
  const [svc, setSvc] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setSvc((s) => (s + 1) % SERVICES.length), 7000);
    return () => clearInterval(t);
  }, [auto]);

  const s = SERVICES[svc];

  return (
    <section id="services" className="relative z-[1] px-gutter py-section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div data-reveal="" className="kicker text-cyan">
              01 — Our Services
            </div>
            <h2
              data-reveal="80"
              className="mt-4 mb-0 max-w-[20ch] font-display text-[clamp(30px,4.2vw,54px)] leading-[1.08] font-bold tracking-[-.03em]"
            >
              From concept to deployment.
            </h2>
          </div>
          <p data-reveal="160" className="m-0 max-w-[46ch] text-[15.5px] leading-[1.7] text-muted">
            From concept to deployment, AlphaNet Solutions — HASH LLC delivers end-to-end software, healthcare
            technology, cloud, and digital transformation services designed to help businesses build, modernize, and
            scale.
          </p>
        </div>

        <div
          data-reveal="120"
          className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[18px]"
        >
          <div className="flex flex-col gap-[6px]" role="tablist" aria-label="Our Services">
            {SERVICES.map((x, i) => {
              const on = i === svc;
              return (
                <button
                  key={x.title}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => {
                    setSvc(i);
                    setAuto(false);
                  }}
                  className={`relative flex items-center gap-4 overflow-hidden rounded-[15px] border px-[18px] py-[15px] text-left transition-[background,border-color] duration-300 hover:[background:rgba(255,255,255,.05)] ${
                    on
                      ? "border-[rgba(0,240,255,.4)] [background:linear-gradient(100deg,rgba(0,240,255,.10),rgba(108,77,246,.06))]"
                      : "border-[rgba(255,255,255,.06)] [background:rgba(255,255,255,.02)]"
                  }`}
                >
                  <span className={`font-mono text-[12px] transition-colors duration-300 ${on ? "text-cyan" : "text-faint"}`}>
                    {pad(i + 1)}
                  </span>
                  <span
                    className={`font-display text-[16px] font-semibold transition-colors duration-300 ${on ? "text-white" : "text-body-2"}`}
                  >
                    {x.title}
                  </span>
                  <span
                    className={`ml-auto font-mono text-[13px] transition-[transform,color] duration-300 ${
                      on ? "translate-x-0 text-cyan" : "-translate-x-[6px] text-faint"
                    }`}
                  >
                    →
                  </span>
                  {on && auto && (
                    <span className="absolute right-0 bottom-0 left-0 h-[2px] origin-[0_50%] animate-[anFill_7s_linear_forwards] bg-[linear-gradient(90deg,#00F0FF,#8B7CFF)]" />
                  )}
                </button>
              );
            })}
          </div>

          <div
            data-spot=""
            role="tabpanel"
            className="sticky top-24 min-h-[440px] rounded-[26px] border border-[rgba(255,255,255,.11)] bg-[rgba(8,11,22,.6)] bg-[image:radial-gradient(460px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(0,240,255,.10),transparent_45%),linear-gradient(150deg,rgba(0,240,255,.08),rgba(108,77,246,.08)_60%,rgba(255,255,255,.02))] p-[clamp(24px,3vw,38px)] shadow-[0_30px_80px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.1)] backdrop-blur-[16px]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[12.5px] tracking-[.14em] text-cyan-light">SERVICE {pad(svc + 1)} / 10</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(0,240,255,.3)] bg-[rgba(0,240,255,.1)] font-mono text-[13px] text-cyan">
                {s.glyph}
              </span>
            </div>
            <div key={svc} className="animate-[anIn_.45s_ease-out]">
              <h3 className="mt-5 mb-0 font-display text-[clamp(24px,2.6vw,32px)] leading-[1.15] font-bold tracking-[-.02em]">
                {s.title}
              </h3>
              {s.body.map((para) => (
                <p key={para} className="mt-[14px] mb-0 text-[15px] leading-[1.72] text-body-2">
                  {para}
                </p>
              ))}
              <div className="mt-[22px] flex flex-wrap gap-2">
                {s.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.06)] px-3 py-[7px] text-[12.5px] font-semibold text-[#C9D0DD]"
                  >
                    {c}
                  </span>
                ))}
              </div>
              {s.isRcm && (
                <a href="#rcm" className="mt-[22px] inline-flex text-[14px] font-bold">
                  See the full RCM lifecycle ↓
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TRACKS = [
  {
    n: "01",
    title: "Healthcare Software Development",
    body: "EHR/PMS, Patient Portal, AI, Integrations",
    cls: "border-[rgba(0,240,255,.22)] bg-[rgba(0,240,255,.04)] bg-[image:radial-gradient(380px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(0,240,255,.14),transparent_45%)]",
    label: "text-cyan",
  },
  {
    n: "02",
    title: "EHR/PM Deployment & White-Labeling",
    body: "Existing software deployment, cloud, branding, customization",
    cls: "border-[rgba(139,124,255,.26)] bg-[rgba(139,124,255,.05)] bg-[image:radial-gradient(380px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(139,124,255,.16),transparent_45%)]",
    label: "text-[#B4A8FF]",
  },
  {
    n: "03",
    title: "End-to-End RCM Services",
    body: "Billing, Coding, Claims, ERA, Denials, AR & Collections",
    cls: "border-[rgba(199,125,255,.26)] bg-[rgba(199,125,255,.05)] bg-[image:radial-gradient(380px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(199,125,255,.16),transparent_45%)]",
    label: "text-[#DDB3FF]",
  },
];

export function Tracks() {
  return (
    <section className="relative z-[1] px-gutter pt-0 pb-[clamp(64px,8vw,110px)]">
      <div data-stagger="" className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
        {TRACKS.map((t) => (
          <div
            key={t.n}
            data-tilt="5"
            data-spot=""
            className={`rounded-3xl border p-[30px] transition-transform duration-[250ms] ease-in-out ${t.cls}`}
          >
            <div className={`font-mono text-[12px] ${t.label}`}>→ Track {t.n}</div>
            <h3 className="mt-[14px] mb-0 font-display text-[22px] font-bold tracking-[-.02em]">{t.title}</h3>
            <p className="mt-3 mb-0 text-[14.5px] leading-[1.6] text-body-2">{t.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
