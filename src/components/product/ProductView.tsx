"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, PRODUCT_LINKS, type ProductKey } from "@/content/products";

const pad = (n: number) => String(n).padStart(2, "0");

/** Single template for all five product pages (design: Product.dc.html). Accent colors come in via CSS vars. */
export function ProductView({ productKey }: { productKey: ProductKey }) {
  const p = PRODUCTS[productKey];
  const all = p.sections;
  const titles = useMemo(() => all.flatMap((s) => s.groups.map((g) => g.t)), [all]);

  const [tab, setTab] = useState("All");
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((h) => h + 1), 1300);
    return () => clearInterval(t);
  }, []);
  const hi = tick % titles.length;

  const tabs = ["All", ...all.map((s) => s.cat)].map((label) => ({
    label,
    count: label === "All" ? titles.length : all.find((s) => s.cat === label)!.groups.length,
  }));
  const sections = all.map((s, i) => ({ s, i })).filter((x) => tab === "All" || x.s.cat === tab);
  const others = PRODUCT_LINKS.filter((l) => l.key !== productKey);

  const vars = { "--accent": p.accent, "--glow": p.glow, "--spot": p.spot } as React.CSSProperties;

  return (
    <div className="relative" style={vars}>
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-[900px] bg-[radial-gradient(800px_520px_at_82%_-8%,var(--glow),transparent_65%),radial-gradient(600px_420px_at_0%_10%,rgba(108,77,246,.14),transparent_60%)]" />

      <section className="relative px-gutter pt-[clamp(48px,6vw,96px)] pb-[clamp(48px,6vw,88px)]">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-[clamp(32px,4.5vw,72px)]">
          <div data-stagger="">
            <div className="flex items-center gap-[10px] text-[13px] text-subtle">
              <Link href="/#products" className="text-subtle hover:text-ink">
                Our Products
              </Link>
              <span className="opacity-50">/</span>
              <span className="font-semibold text-[var(--accent)]">{p.name}</span>
            </div>
            <h1 className="mt-[22px] mb-0 font-display text-[clamp(40px,5.6vw,76px)] leading-[1.02] font-extrabold tracking-[-.035em]">
              {p.name}
            </h1>
            <p className="mt-[18px] mb-0 max-w-[34ch] font-display text-[clamp(18px,1.9vw,23px)] leading-[1.4] font-medium tracking-[-.01em] text-[var(--accent)]">
              {p.tagline}
            </p>
            {p.intro.map((para) => (
              <p key={para} className="mt-[18px] mb-0 max-w-[62ch] text-[16px] leading-[1.72] text-body">
                {para}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="relative inline-flex items-center overflow-hidden rounded-[14px] bg-[linear-gradient(120deg,var(--accent),#8B7CFF)] px-7 py-4 font-display text-[16px] font-bold text-on-accent shadow-[0_14px_40px_var(--glow)] hover:-translate-y-[2px] hover:text-on-accent"
              >
                Request a Demo
                <span className="absolute top-0 bottom-0 left-0 w-[38%] animate-[anSweep_3.6s_ease-in-out_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.5),transparent)]" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-[10px] rounded-[14px] border border-[rgba(255,255,255,.16)] bg-[rgba(255,255,255,.04)] px-6 py-4 font-display text-[16px] font-semibold text-ink hover:border-[rgba(255,255,255,.35)] hover:text-white"
              >
                Explore features <span className="font-mono">↓</span>
              </a>
            </div>
          </div>

          <div data-reveal="200" className="relative">
            <div className="absolute -inset-x-[4%] -inset-y-[6%] rounded-[36px] bg-[radial-gradient(circle_at_70%_20%,var(--glow),transparent_60%),radial-gradient(circle_at_15%_85%,rgba(108,77,246,.25),transparent_60%)] blur-[36px]" />
            <div className="relative overflow-hidden rounded-[26px] border border-[rgba(255,255,255,.12)] bg-[rgba(7,10,20,.82)] shadow-[0_40px_100px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-[16px]">
              <div className="flex items-center justify-between gap-3 border-b border-[rgba(255,255,255,.08)] px-5 py-4">
                <div className="flex items-center gap-[10px]">
                  <span className="h-[10px] w-[10px] rounded-[3px] bg-[var(--accent)] shadow-[0_0_14px_var(--accent)]" />
                  <span className="font-display text-[14.5px] font-bold">Platform map</span>
                </div>
                <span className="font-mono text-[12px] text-subtle">{titles.length} modules</span>
              </div>
              <div className="flex flex-wrap gap-2 p-5">
                {titles.map((t, i) => {
                  const on = i === hi;
                  const near = i === (hi + titles.length - 1) % titles.length;
                  return (
                    <span
                      key={t}
                      className="rounded-[10px] border px-3 py-2 text-[12.5px] font-semibold transition-all duration-500 ease-in-out"
                      style={{
                        borderColor: on ? p.accent : "rgba(255,255,255,.09)",
                        background: on ? p.spot : near ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.025)",
                        color: on ? "#FFFFFF" : "#9BA5B9",
                        boxShadow: on ? "0 0 22px " + p.glow : "none",
                      }}
                    >
                      {t}
                    </span>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-2 border-t border-[rgba(255,255,255,.08)] px-5 py-[14px]">
                {p.badges.map((bd) => (
                  <span key={bd} className="rounded-full bg-[rgba(255,255,255,.05)] px-[10px] py-[6px] font-mono text-[11.5px] text-[#B6C0D3]">
                    {bd}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative border-t border-[rgba(255,255,255,.06)] px-gutter py-[clamp(48px,6vw,96px)]">
        <div className="container-site">
          <div data-reveal="" className="kicker text-[var(--accent)]">
            Capabilities
          </div>
          <h2 data-reveal="80" className="mt-4 mb-0 font-display text-[clamp(30px,4vw,50px)] leading-[1.08] font-bold tracking-[-.03em]">
            Everything inside {p.name}
          </h2>

          {all.length > 1 && (
            <div
              role="tablist"
              aria-label="Capability categories"
              className="sticky top-[84px] z-20 mt-[30px] flex flex-wrap gap-1 rounded-2xl border border-[rgba(255,255,255,.08)] bg-[rgba(6,8,16,.86)] p-[7px] shadow-[0_16px_40px_rgba(0,0,0,.4)] backdrop-blur-[14px]"
            >
              {tabs.map((t) => {
                const on = t.label === tab;
                return (
                  <button
                    key={t.label}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(t.label)}
                    className={`flex items-center gap-2 rounded-[11px] px-[15px] py-[10px] text-[14px] font-semibold transition-[background,color] duration-[250ms] hover:text-white ${
                      on ? "bg-[var(--accent)] text-on-accent" : "bg-transparent text-body-2"
                    }`}
                  >
                    {t.label}
                    <span className="font-mono text-[11px] opacity-65">{t.count}</span>
                  </button>
                );
              })}
            </div>
          )}

          {sections.map(({ s, i }) => (
            <div key={s.cat} className="mt-14">
              <div data-reveal="" className="flex flex-wrap items-baseline gap-[14px]">
                <span className="font-mono text-[13px] text-[var(--accent)]">{pad(i + 1)}</span>
                <h3 className="m-0 font-display text-[clamp(22px,2.6vw,30px)] font-bold tracking-[-.02em]">{s.cat}</h3>
              </div>
              {s.d && (
                <p data-reveal="60" className="mt-3 mb-0 max-w-[72ch] text-[15.5px] leading-[1.7] text-muted">
                  {s.d}
                </p>
              )}
              <div data-stagger="" className="mt-6 grid grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] gap-4">
                {s.groups.map((g) => (
                  <div
                    key={g.t}
                    data-spot=""
                    data-tilt="3"
                    className="flex flex-col rounded-[22px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.02)] bg-[image:radial-gradient(380px_circle_at_var(--mx,-999px)_var(--my,-999px),var(--spot),transparent_45%),linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.012))] p-[26px] transition-[transform,border-color] duration-[250ms,300ms] hover:border-[rgba(255,255,255,.2)]"
                  >
                    <h4 className="m-0 font-display text-[19px] leading-[1.25] font-bold tracking-[-.015em]">{g.t}</h4>
                    {g.d && <p className="mt-[10px] mb-0 text-[14px] leading-[1.65] text-muted">{g.d}</p>}
                    <div className="mt-4 flex flex-col gap-[9px]">
                      {g.items.map((it) => (
                        <div key={it} className="flex items-start gap-[11px] text-[14px] leading-[1.5] text-[#C9D0DD]">
                          <span className="mt-[7px] h-[6px] w-[6px] flex-none rounded-[2px] bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                          <span>{it}</span>
                        </div>
                      ))}
                    </div>
                    {g.note && (
                      <p className="mt-[18px] mb-0 border-t border-[rgba(255,255,255,.08)] pt-4 text-[13.5px] leading-[1.65] text-dim">
                        {g.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-gutter py-[clamp(48px,6vw,96px)]">
        <div
          data-reveal=""
          className="relative container-site overflow-hidden rounded-[30px] border border-[rgba(255,255,255,.12)] bg-[linear-gradient(140deg,var(--glow),rgba(108,77,246,.16)_55%,rgba(255,255,255,.02))] p-[clamp(30px,4.5vw,64px)] shadow-[0_40px_100px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.14)]"
        >
          <div className="kicker text-ink opacity-80">{p.closingKicker}</div>
          {p.closing.map((cl) => (
            <p
              key={cl}
              className="mt-[18px] mb-0 max-w-[60ch] font-display text-[clamp(19px,2.2vw,27px)] leading-[1.45] font-medium tracking-[-.015em] text-pretty text-strong"
            >
              {cl}
            </p>
          ))}
          <div className="mt-[30px] flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-[14px] bg-white px-7 py-4 font-display text-[16px] font-bold text-on-accent shadow-[0_14px_40px_rgba(0,0,0,.35)] hover:bg-[#E6FDFF] hover:text-on-accent"
            >
              Request a Demo
            </Link>
            <Link
              href="/contact"
              className="rounded-[14px] border border-[rgba(255,255,255,.3)] px-6 py-4 font-display text-[16px] font-semibold text-white hover:border-white hover:text-white"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </section>

      <section className="relative px-gutter pt-0 pb-[clamp(60px,7vw,110px)]">
        <div className="container-site">
          <div data-reveal="" className="font-display text-[22px] font-bold tracking-[-.02em]">
            More from AlphaNet
          </div>
          <div data-stagger="" className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[14px]">
            {others.map((o) => {
              const op = PRODUCTS[o.key];
              return (
                <Link
                  key={o.key}
                  href={o.href}
                  data-spot=""
                  className="flex flex-col gap-[10px] rounded-[20px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.025)] bg-[image:radial-gradient(300px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(255,255,255,.07),transparent_50%)] p-[22px] text-ink transition-[border-color,transform] duration-300 hover:-translate-y-[3px] hover:border-[rgba(255,255,255,.22)] hover:text-white"
                >
                  <span className="h-[10px] w-[10px] rounded-[3px]" style={{ background: op.accent, boxShadow: `0 0 12px ${op.accent}` }} />
                  <span className="font-display text-[16.5px] font-bold">{op.name}</span>
                  <span className="text-[13px] leading-[1.55] text-dim">{o.tag}</span>
                  <span className="mt-auto pt-[6px] text-[13px] font-bold" style={{ color: op.accent }}>
                    View product →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
