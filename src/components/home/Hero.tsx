"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FEED } from "@/content/home";

/** Interactive node network: particles drift, link within 150px, repel from the cursor within 130px. */
function NodeNetwork() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const sec = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !sec || !ctx) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const seed = () => {
      const r = cv.getBoundingClientRect();
      w = r.width;
      h = r.height;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(28, Math.min(100, Math.round((w * h) / 15000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.7 + 0.8,
      }));
    };
    seed();
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("resize", seed);
    sec.addEventListener("pointermove", onMove);
    sec.addEventListener("pointerleave", onLeave);

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const md = Math.sqrt(dx * dx + dy * dy);
        if (md < 130 && md > 0) {
          p.x += (dx / md) * 0.8;
          p.y += (dy / md) * 0.8;
        }
      }
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 150) {
            const t = 1 - d / 150;
            ctx.strokeStyle = "rgba(0,240,255," + (t * 0.24).toFixed(3) + ")";
            ctx.lineWidth = t * 1.1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      for (const p of pts) {
        const near = Math.hypot(p.x - mouse.x, p.y - mouse.y) < 150;
        ctx.beginPath();
        ctx.fillStyle = near ? "rgba(0,240,255,.95)" : "rgba(150,170,255,.5)";
        ctx.arc(p.x, p.y, near ? p.r * 1.7 : p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", seed);
      sec.removeEventListener("pointermove", onMove);
      sec.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 z-0 h-full w-full" />;
}

/** "Revenue cycle · claim lifecycle" panel — advances every 1.5s, holding two extra beats at 100%. */
function ClaimFeed() {
  const [feed, setFeed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setFeed((f) => (f + 1) % (FEED.length + 2)), 1500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative animate-[anFloat_8s_ease-in-out_infinite] overflow-hidden rounded-3xl border border-[rgba(255,255,255,.12)] bg-[rgba(7,10,20,.78)] shadow-[0_40px_100px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-[18px]">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,.08)] px-[18px] py-[15px]">
        <div className="flex items-center gap-[10px]">
          <span className="h-[22px] w-[22px] rounded-[7px] bg-[linear-gradient(140deg,#00F0FF,#6C4DF6)]" />
          <span className="font-display text-[14px] font-bold">Revenue cycle · claim lifecycle</span>
        </div>
        <span className="animate-[anPulse_1.6s_ease-in-out_infinite] font-mono text-[11px] text-success">● live</span>
      </div>
      <div className="flex flex-col gap-2 px-[18px] py-4">
        {FEED.map((f, i) => {
          const done = i < feed;
          const on = i === feed;
          const lit = done || on;
          return (
            <div
              key={f.code}
              className="flex items-center gap-3 rounded-[13px] border px-[14px] py-3 transition-all duration-500 ease-in-out"
              style={{
                borderColor: on ? "rgba(0,240,255,.45)" : "rgba(255,255,255,.07)",
                background: on ? "rgba(0,240,255,.09)" : "rgba(255,255,255,.025)",
              }}
            >
              <span
                className="w-11 flex-none rounded-[7px] py-1 text-center font-mono text-[11.5px] font-semibold transition-all duration-500"
                style={{ background: lit ? "rgba(0,240,255,.16)" : "rgba(255,255,255,.06)", color: lit ? "#8FF6FF" : "#6E7890" }}
              >
                {f.code}
              </span>
              <span className="text-[13.5px] transition-colors duration-500" style={{ color: lit ? "#E8ECF4" : "#7E89A0" }}>
                {f.label}
              </span>
              <span className="ml-auto text-[12px] transition-colors duration-500" style={{ color: done ? "#06D6A0" : "#8FF6FF" }}>
                {done ? "✓" : on ? "…" : ""}
              </span>
            </div>
          );
        })}
      </div>
      <div className="px-[18px] pb-[18px]">
        <div className="h-1 overflow-hidden rounded-[3px] bg-[rgba(255,255,255,.07)]">
          <div
            className="h-full bg-[linear-gradient(90deg,#00F0FF,#8B7CFF)] transition-[width] duration-[600ms] ease-in-out"
            style={{ width: Math.min(100, (feed / FEED.length) * 100) + "%" }}
          />
        </div>
      </div>
    </div>
  );
}

const STATS = [
  { v: "11+", l: "Years Exp" },
  { v: "99.8%", l: "Client Retention" },
  { v: "50+", l: "Enterprise Apps Delivered" },
  { v: "5", l: "In-house Products" },
];

export function Hero() {
  return (
    <section className="relative z-[1] flex min-h-[min(900px,94vh)] items-center px-gutter pt-[clamp(56px,7vw,110px)] pb-[clamp(40px,5vw,70px)]">
      <NodeNetwork />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(4,5,10,.1),rgba(4,5,10,.5)_70%,#04050a)]" />
      <div className="pointer-events-none relative z-[2] container-site w-full">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-[clamp(36px,5vw,72px)]">
          <div data-stagger="" className="pointer-events-auto">
            <div className="inline-flex items-center gap-[10px] rounded-full border border-[rgba(0,240,255,.28)] bg-[rgba(0,240,255,.06)] py-[7px] pr-[14px] pl-[10px] text-[12.5px] font-semibold tracking-[.06em] text-cyan-light uppercase">
              <span className="h-[7px] w-[7px] animate-pulse-dot rounded-full bg-cyan shadow-[0_0_10px_#00F0FF]" />
              Welcome to AlphaNet Solutions
            </div>
            <h1 className="mt-6 mb-0 font-display text-[clamp(38px,5.8vw,80px)] leading-[1.03] font-extrabold tracking-[-.035em] text-balance">
              We Don&apos;t Just Build Software. <span className="text-gradient">We Build Digital Market Leaders.</span>
            </h1>
            <p className="mt-[22px] mb-0 font-display text-[clamp(17px,1.6vw,21px)] font-medium text-ink">
              Your Partner in Innovative Software Solutions
            </p>
            <p className="mt-3 mb-0 max-w-[60ch] text-[clamp(15px,1.25vw,17.5px)] leading-[1.7] text-body">
              At AlphaNet Solutions, we are dedicated to transforming your ideas into reality through cutting-edge
              technology and expert craftsmanship. With over 11+ years of experience in the software and IT industry, we
              provide a comprehensive suite of services designed to meet the diverse needs of our clients.
            </p>
            <div className="mt-[34px] flex flex-wrap gap-[14px]">
              <a
                href="#estimate"
                className="relative inline-flex items-center gap-3 overflow-hidden rounded-[15px] bg-[linear-gradient(120deg,#00F0FF,#5EE0FF_60%,#8B7CFF)] px-[30px] py-[17px] font-display text-[16.5px] font-bold text-on-accent shadow-[0_14px_44px_rgba(0,240,255,.34),inset_0_1px_0_rgba(255,255,255,.6)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:text-on-accent hover:shadow-[0_18px_60px_rgba(0,240,255,.55),inset_0_1px_0_rgba(255,255,255,.8)]"
              >
                Launch Your Project
                <span className="font-mono">→</span>
                <span className="absolute top-0 bottom-0 left-0 w-[38%] animate-[anSweep_3.4s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.55),transparent)]" />
              </a>
              <Link
                href="/products/aquila-ehr"
                className="inline-flex items-center gap-[10px] rounded-[15px] border border-[rgba(255,255,255,.16)] [background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.02))] px-[26px] py-[17px] font-display text-[16.5px] font-semibold text-ink backdrop-blur-[12px] transition-transform duration-[250ms] hover:-translate-y-[2px] hover:border-[rgba(0,240,255,.45)] hover:text-white hover:[background:linear-gradient(160deg,rgba(0,240,255,.12),rgba(108,77,246,.10))]"
              >
                Explore AquilaEHR
                <span className="rounded-full bg-[rgba(0,240,255,.14)] px-2 py-[3px] font-sans text-[11.5px] font-bold text-cyan-light">
                  Flagship
                </span>
              </Link>
            </div>
          </div>

          <div data-reveal="250" className="pointer-events-auto relative">
            <ClaimFeed />
            <div className="absolute -bottom-[22px] -left-[18px] animate-[anFloat_6s_ease-in-out_infinite] rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(10,14,28,.85)] px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-[14px] [animation-delay:-2s]">
              <div className="font-mono text-[11px] text-subtle">interoperability</div>
              <div className="mt-1 font-display text-[15px] font-bold text-cyan-light">HL7 · FHIR · EDI</div>
            </div>
            <div className="absolute -top-5 -right-[14px] flex animate-[anFloat_7s_ease-in-out_infinite] items-center gap-2 rounded-[14px] border border-[rgba(199,125,255,.3)] bg-[rgba(28,16,44,.85)] px-[14px] py-[10px] shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-[14px] [animation-delay:-4s]">
              <span className="h-[14px] w-[14px] animate-[anSpin_1.4s_linear_infinite] rounded-full border-2 border-purple border-t-transparent" />
              <span className="font-display text-[13.5px] font-semibold text-[#E6D3FF]">AI Scribe drafting SOAP note</span>
            </div>
          </div>
        </div>

        <div
          data-reveal="400"
          className="pointer-events-auto mt-[clamp(52px,6vw,84px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-px overflow-hidden rounded-[22px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.06)] shadow-[0_30px_80px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-[16px]"
        >
          {STATS.map((s) => (
            <div key={s.l} className="bg-[rgba(6,8,16,.6)] px-7 py-6">
              <div data-count="" className="font-display text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-.03em] text-white">
                {s.v}
              </div>
              <div className="mt-[6px] text-[12.5px] font-semibold tracking-[.09em] text-subtle uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
