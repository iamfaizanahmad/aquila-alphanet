import Link from "next/link";
import { HOME_PRODUCTS } from "@/content/home";

const AQUILA_MODULES = [
  { t: "EHR", d: "SOAP notes, templates, e-prescribing" },
  { t: "Practice Management", d: "Scheduling, eligibility, claims" },
  { t: "Patient Portal", d: "Records, intake, telehealth" },
  { t: "AI & Automation", d: "AI Scribe, workflow automation" },
];

export function Products() {
  return (
    <section id="products" className="relative z-[1] border-t border-[rgba(255,255,255,.06)] px-gutter py-section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div data-reveal="" className="kicker text-cyan">
              03 — Our Products
            </div>
            <h2
              data-reveal="80"
              className="mt-4 mb-0 max-w-[22ch] font-display text-[clamp(30px,4.2vw,54px)] leading-[1.08] font-bold tracking-[-.03em]"
            >
              Platforms we build, own and run.
            </h2>
          </div>
          <p data-reveal="160" className="m-0 max-w-[42ch] text-[15.5px] leading-[1.7] text-muted">
            Five in-house products spanning clinical care, practice operations, credentialing and support.
          </p>
        </div>

        <div data-stagger="" className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
          <Link
            href="/products/aquila-ehr"
            data-tilt="4"
            data-spot=""
            className="relative col-span-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-7 overflow-hidden rounded-[28px] border border-[rgba(0,240,255,.26)] bg-[rgba(6,12,22,.7)] bg-[image:radial-gradient(520px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(0,240,255,.14),transparent_45%),linear-gradient(140deg,rgba(0,240,255,.10),rgba(108,77,246,.10)_60%,rgba(255,255,255,.02))] p-[clamp(26px,3.4vw,44px)] text-ink transition-transform duration-[250ms] ease-in-out hover:text-ink"
          >
            <div>
              <div className="flex items-center gap-[10px]">
                <span className="rounded-full bg-cyan px-[10px] py-[5px] text-[11.5px] font-bold tracking-[.1em] text-on-accent uppercase">
                  Flagship
                </span>
                <span className="font-mono text-[12px] text-cyan-light">EHR · PMS · RCM · AI</span>
              </div>
              <h3 className="mt-[18px] mb-0 font-display text-[clamp(30px,3.6vw,46px)] font-extrabold tracking-[-.03em]">
                Aquila EHR/PMS
              </h3>
              <p className="mt-[14px] mb-0 max-w-[54ch] text-[15.5px] leading-[1.7] text-[#B6C0D3]">
                A comprehensive healthcare technology platform designed to help medical practices manage clinical care,
                administrative workflows, patient engagement, billing, and revenue cycle operations through a single
                integrated solution.
              </p>
              <span className="mt-[22px] inline-flex text-[14.5px] font-bold text-cyan">Explore Aquila EHR/PMS →</span>
            </div>
            <div className="grid grid-cols-2 gap-[10px]">
              {AQUILA_MODULES.map((m) => (
                <div key={m.t} className="rounded-2xl border border-[rgba(255,255,255,.1)] bg-[rgba(4,6,14,.6)] p-4">
                  <div className="font-display text-[15px] font-bold">{m.t}</div>
                  <div className="mt-[6px] text-[12.5px] text-dim">{m.d}</div>
                </div>
              ))}
            </div>
          </Link>
          {HOME_PRODUCTS.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              data-tilt="5"
              data-spot=""
              className="flex flex-col gap-3 rounded-3xl border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.025)] bg-[image:radial-gradient(360px_circle_at_var(--mx,-999px)_var(--my,-999px),var(--spot),transparent_45%),linear-gradient(160deg,rgba(255,255,255,.05),rgba(255,255,255,.01))] p-7 text-ink transition-[transform,border-color] duration-[250ms,300ms] hover:border-[rgba(255,255,255,.2)] hover:text-ink"
              style={{ "--spot": p.spot } as React.CSSProperties}
            >
              <span className="h-3 w-3 rounded-[4px]" style={{ background: p.accent, boxShadow: `0 0 14px ${p.accent}` }} />
              <span className="font-display text-[20px] font-bold tracking-[-.015em]">{p.name}</span>
              <span className="text-[14px] leading-[1.6] text-muted">{p.tag}</span>
              <span className="mt-1 flex flex-wrap gap-[6px]">
                {p.mods.map((m) => (
                  <span key={m} className="rounded-full bg-[rgba(255,255,255,.06)] px-[9px] py-[5px] text-[11.5px] font-semibold text-[#B6C0D3]">
                    {m}
                  </span>
                ))}
              </span>
              <span className="mt-auto pt-2 text-[13.5px] font-bold" style={{ color: p.accent }}>
                View product →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
