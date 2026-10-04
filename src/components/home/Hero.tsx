"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pill, btnGhost, btnPrimary } from "@/components/ui";
import type { LaunchScene } from "@/components/launch/engine";

/*
 * Homepage hero: "The Architecture Blueprint to Living Ecosystem". A 3D healthcare
 * city is mapped, designed, engineered, tested and launched as the visitor scrolls.
 * The WebGL scene lives in components/launch/engine.ts; this file pins it, feeds it
 * scroll progress, and lays the copy over it.
 */

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

// Mirrors STEPS in engine.ts (kept here so the copy can render before three.js loads).
const STEPS: [number, number][] = [
  [0.06, 0.24],
  [0.24, 0.42],
  [0.42, 0.62],
  [0.62, 0.8],
  [0.8, 1],
];

const STEP_COPY = [
  { name: "Requirement Gathering", line: "We listen & map your vision." },
  { name: "Design", line: "Crafting intuitive & stunning user experiences." },
  { name: "Development", line: "Clean, scalable, and high-performance code." },
  { name: "Quality Assurance (QA)", line: "Rigorous testing for ironclad reliability." },
  { name: "Deployment", line: "" },
];

function LandingCopy() {
  return (
    <>
      <h1 className="m-0 font-display text-[clamp(34px,4.4vw,62px)] leading-[1.04] font-semibold tracking-[-.03em] text-text">
        We Don&apos;t Just Build Software. We Build Digital Market Leaders.
      </h1>
      <p className="mt-6 mb-0 text-[clamp(18px,1.5vw,21px)] leading-snug font-medium text-holo">Your Partner in Innovative Software Solutions</p>
      <p className="mt-3 mb-0 max-w-[54ch] text-[15.5px] leading-[1.65] text-body">
        At AlphaNet Solutions, we are dedicated to transforming your ideas into reality through cutting-edge technology and
        expert craftsmanship. With over 11+ years of experience in the software and IT industry, we provide a comprehensive
        suite of services designed to meet the diverse needs of our clients.
      </p>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href="#estimate" className={btnPrimary}>
          Launch Your Project
        </a>
        <Link href="/products/aquila-ehr" className={btnGhost}>
          Explore AquilaEHR <Pill>Flagship</Pill>
        </Link>
      </div>
    </>
  );
}

export function Hero() {
  const [mode, setMode] = useState<"journey" | "static">("journey");
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setMode("static");
  }, []);
  // stable identity: Journey's effect depends on it and must not re-run (it owns the WebGL scene)
  const unsupported = useCallback(() => setMode("static"), []);
  return mode === "static" ? <StaticHero /> : <Journey onUnsupported={unsupported} />;
}

/** Reduced motion / no WebGL: one still frame of the lit city, no pinning, no camera moves. */
function StaticHero() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let scene: LaunchScene | null = null;
    let cancelled = false;
    import("@/components/launch/engine")
      .then(({ LaunchScene }) => {
        if (cancelled || !ref.current) return;
        try {
          scene = new LaunchScene(ref.current, { lowPower: true });
          const r = ref.current.getBoundingClientRect();
          scene.setSize(r.width, r.height, 0);
          scene.setProgress(0.85);
        } catch {
          /* no WebGL: the copy below still stands on its own */
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, []);
  return (
    <section className="px-gutter pt-10">
      <div className="sheet grid gap-10 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <LandingCopy />
        </div>
        <canvas ref={ref} aria-hidden="true" className="h-[380px] w-full rounded-[18px] border border-holo/15 bg-void" />
      </div>
      <ol className="sheet m-0 mt-10 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        {STEP_COPY.map((s, i) => (
          <li key={s.name} className="glass rounded-[14px] p-4">
            <div className="hud">Step {String(i + 1).padStart(2, "0")}</div>
            <div className="mt-1 text-[16px] font-semibold text-text">{s.name}</div>
            {s.line && <p className="mt-1.5 mb-0 text-[14px] leading-[1.5] text-body">{s.line}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

function Journey({ onUnsupported }: { onUnsupported: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<LaunchScene | null>(null);
  const [p, setP] = useState(0);
  const [w, setW] = useState(1280);

  useEffect(() => {
    let cancelled = false;
    let raf = 0;
    let cleanupIO = () => {};
    const desktop = () => window.innerWidth >= 1024;

    const progress = () => {
      const el = trackRef.current;
      const st = stageRef.current;
      if (!el || !st) return 0;
      const total = el.offsetHeight - st.offsetHeight;
      return total > 0 ? clamp((st.getBoundingClientRect().top - el.getBoundingClientRect().top) / total) : 0;
    };
    const update = () => {
      raf = 0;
      const v = progress();
      setP(v);
      sceneRef.current?.setProgress(v);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const resize = () => {
      const st = stageRef.current;
      if (!st) return;
      const r = st.getBoundingClientRect();
      setW(r.width);
      sceneRef.current?.setSize(r.width, r.height, desktop() ? r.width * 0.17 : 0);
    };

    import("@/components/launch/engine")
      .then(({ LaunchScene }) => {
        if (cancelled || !canvasRef.current) return;
        try {
          sceneRef.current = new LaunchScene(canvasRef.current, { lowPower: window.innerWidth < 768 });
        } catch {
          onUnsupported();
          return;
        }
        resize();
        update();
        // render only while the journey is on screen
        const io = new IntersectionObserver(([e]) => (e.isIntersecting ? sceneRef.current?.start() : sceneRef.current?.stop()));
        if (trackRef.current) io.observe(trackRef.current);
        cleanupIO = () => io.disconnect();
      })
      .catch(() => onUnsupported());

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      cleanupIO();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [onUnsupported]);

  const desktop = w >= 1024;
  const step = p < STEPS[0][0] ? -1 : STEPS.findIndex(([a, b], i) => p >= a && (p < b || i === STEPS.length - 1));
  const landing = 1 - seg(p, 0.03, 0.07);

  const jumpTo = (i: number) => {
    const el = trackRef.current;
    const st = stageRef.current;
    if (!el || !st) return;
    const total = el.offsetHeight - st.offsetHeight;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    const [a, b] = STEPS[i];
    window.scrollTo({ top: top + total * (a + (b - a) * (i === 4 ? 0.9 : 0.6)), behavior: "smooth" });
  };

  return (
    <section aria-label="Introduction">
      <div ref={trackRef} className="relative h-[780vh]">
        <div ref={stageRef} className="sticky top-16 h-[calc(100svh-64px)] overflow-hidden bg-void">
          <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
          {/* soft vignette keeps copy legible over the scene */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background: desktop
                ? "linear-gradient(90deg, rgba(4,6,11,.92) 0%, rgba(4,6,11,.55) 34%, rgba(4,6,11,0) 55%)"
                : "linear-gradient(0deg, rgba(4,6,11,.9) 0%, rgba(4,6,11,0) 45%)",
              opacity: step === 4 ? 0 : 1,
              transition: "opacity .4s",
            }}
          />

          {/* landing */}
          <div
            className="absolute inset-x-0 top-0 px-gutter pt-[clamp(28px,9vh,110px)]"
            style={{ opacity: landing, transform: `translateY(${(1 - landing) * -20}px)`, pointerEvents: landing > 0.5 ? "auto" : "none" }}
          >
            <div className="sheet lg:px-8">
              <div className={`max-w-[580px] ${desktop ? "" : "glass rounded-[16px] bg-void/60 p-5"}`}>
                <LandingCopy />
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="hud absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-300" style={{ opacity: p < 0.015 ? 0.9 : 0 }}>
            Scroll to start the build ↓
          </div>

          {/* steps 1–4: narration */}
          {STEP_COPY.slice(0, 4).map((s, i) => {
            const [a, b] = STEPS[i];
            const vis = seg(p, a, a + 0.02) * (1 - seg(p, b - 0.02, b));
            return (
              <div
                key={s.name}
                className="pointer-events-none absolute inset-x-0 px-gutter max-lg:bottom-20 lg:top-1/2 lg:-translate-y-1/2"
                style={{ opacity: vis }}
                aria-hidden={vis < 0.5}
              >
                <div className="sheet lg:px-8">
                  <div className="glass max-w-[460px] rounded-[18px] bg-void/40 p-6" style={{ transform: `translateY(${(1 - vis) * 16}px)` }}>
                    <div className="hud">Step {String(i + 1).padStart(2, "0")} / 05</div>
                    <div className="mt-2 text-[15px] font-semibold text-holo">{s.name}</div>
                    <p className="m-0 mt-3 font-display text-[clamp(22px,2.4vw,32px)] leading-[1.15] font-semibold tracking-[-.02em] text-text">{s.line}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* step 5: launch CTA, centred */}
          <div
            className="absolute inset-0 grid place-items-center px-gutter text-center"
            style={{ opacity: seg(p, 0.86, 0.92), pointerEvents: p > 0.88 ? "auto" : "none" }}
          >
            <div className="relative isolate">
              {/* dark halo so the launch copy reads over the lit city and beam */}
              <div aria-hidden="true" className="absolute -inset-x-24 -inset-y-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(4,6,11,.88),rgba(4,6,11,.6)_60%,transparent)]" />
              <div className="hud">Step 05 / 05</div>
              <div className="mt-2 font-display text-[clamp(30px,4vw,56px)] leading-[1.05] font-semibold tracking-[-.02em] text-text">Deployment</div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a href="#estimate" className={`${btnPrimary} !px-8 !py-4 !text-[17px]`}>
                  Launch Your Project With Us
                </a>
                <Link href="/products/aquila-ehr" className={btnGhost}>
                  Explore AquilaEHR
                </Link>
              </div>
            </div>
          </div>

          {/* progress rail */}
          <nav
            aria-label="Build steps"
            className="absolute px-gutter transition-opacity duration-300 max-lg:inset-x-0 max-lg:top-3 lg:top-1/2 lg:right-0 lg:-translate-y-1/2"
            style={{ opacity: step >= 0 && step < 4 ? 1 : 0, pointerEvents: step >= 0 && step < 4 ? "auto" : "none" }}
          >
            <ol className="glass m-0 flex list-none gap-1 rounded-[14px] bg-void/40 p-1.5 lg:flex-col lg:gap-0.5">
              {STEP_COPY.map((s, i) => {
                const fill = seg(p, ...STEPS[i]);
                const on = i === step;
                return (
                  <li key={s.name} className="flex-1">
                    <button
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-current={on ? "step" : undefined}
                      className={`relative flex w-full items-center gap-2 overflow-hidden rounded-[10px] px-2 py-1.5 text-left lg:px-3 lg:py-2 ${on ? "bg-holo/10" : "hover:bg-holo/5"}`}
                    >
                      <span className={`font-mono text-[11px] ${fill >= 1 ? "text-qa" : on ? "text-holo" : "text-muted"}`}>{fill >= 1 ? "✓" : String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-[12.5px] font-medium max-lg:hidden ${on ? "text-text" : "text-body"}`}>{s.name}</span>
                      <span aria-hidden="true" className="absolute bottom-0 left-0 h-[2px] bg-holo" style={{ width: `${fill * 100}%` }} />
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}
