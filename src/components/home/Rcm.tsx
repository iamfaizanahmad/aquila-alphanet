"use client";

import { useEffect, useState } from "react";
import { RCM } from "@/content/home";

/** 16 RCM steps; a highlight travels through them every 650ms (with three idle beats at the end). */
export function Rcm() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % (RCM.length + 3)), 650);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="rcm"
      className="relative z-[1] border-t border-[rgba(255,255,255,.06)] bg-[linear-gradient(180deg,rgba(108,77,246,.07),transparent_70%)] px-gutter py-section"
    >
      <div className="container-site">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-8">
          <div>
            <div data-reveal="" className="kicker text-purple">
              02 — Revenue Cycle
            </div>
            <h2
              data-reveal="80"
              className="mt-4 mb-0 font-display text-[clamp(30px,4.2vw,52px)] leading-[1.08] font-bold tracking-[-.03em]"
            >
              End-to-End Revenue Cycle Management (RCM)
            </h2>
          </div>
          <div data-stagger="">
            <p className="m-0 text-[15.5px] leading-[1.7] text-body">
              We provide comprehensive Revenue Cycle Management services designed to optimize the complete financial
              lifecycle of healthcare organizations—from patient registration and insurance verification to claim
              submission, payment posting, denial management, and accounts receivable follow-up.
            </p>
            <p className="mt-[14px] mb-0 text-[15.5px] leading-[1.7] text-body">
              Our RCM services combine healthcare operational expertise, technology, EDI workflows, and revenue-cycle
              analytics to help practices improve collections, reduce claim delays, and maintain greater visibility into
              their financial performance.
            </p>
          </div>
        </div>
        <div data-reveal="" className="mt-11 text-[13px] font-bold tracking-[.12em] text-subtle uppercase">
          Our RCM Services Include
        </div>
        <div data-stagger="" className="mt-[18px] grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-[10px]">
          {RCM.map((r, i) => {
            const [label, code] = r.split("|");
            const on = i === idx;
            const done = i < idx;
            return (
              <div
                key={label}
                className="relative flex items-start gap-[14px] rounded-[15px] border py-4 pr-4 pl-[14px] transition-all duration-[450ms] ease-in-out"
                style={{
                  borderColor: on ? "rgba(199,125,255,.6)" : done ? "rgba(139,124,255,.22)" : "rgba(255,255,255,.07)",
                  background: on ? "rgba(199,125,255,.14)" : done ? "rgba(139,124,255,.06)" : "rgba(255,255,255,.02)",
                  boxShadow: on ? "0 0 30px rgba(199,125,255,.25)" : "none",
                }}
              >
                <span
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-[9px] font-mono text-[11.5px] font-semibold transition-all duration-[450ms]"
                  style={{
                    background: on
                      ? "linear-gradient(140deg,#C77DFF,#8B7CFF)"
                      : done
                        ? "rgba(139,124,255,.2)"
                        : "rgba(255,255,255,.06)",
                    color: on ? "#0A0614" : done ? "#CFC6FF" : "#6E7890",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div
                    className="text-[14px] leading-[1.4] font-semibold transition-colors duration-[450ms]"
                    style={{ color: on || done ? "#E8ECF4" : "#9BA5B9" }}
                  >
                    {label}
                  </div>
                  {code && <div className="mt-[7px] font-mono text-[11.5px] text-cyan-light">{code}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
