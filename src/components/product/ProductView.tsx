"use client";

import Link from "next/link";
import { useState } from "react";
import { Glass, Heading, Section, btnGhost, btnPrimary } from "@/components/ui";
import { PRODUCTS, PRODUCT_INK, PRODUCT_LINKS, type ProductKey } from "@/content/products";

/** One template for all five products (design: Product.dc.html); the product colour comes in via --accent. */
export function ProductView({ productKey }: { productKey: ProductKey }) {
  const p = PRODUCTS[productKey];
  const ink = PRODUCT_INK[productKey];
  const all = p.sections;
  const titles = all.flatMap((s) => s.groups.map((g) => g.t));

  const [tab, setTab] = useState("All");
  const tabs = ["All", ...all.map((s) => s.cat)].map((label) => ({
    label,
    count: label === "All" ? titles.length : all.find((s) => s.cat === label)!.groups.length,
  }));
  const sections = tab === "All" ? all : all.filter((s) => s.cat === tab);
  const others = PRODUCT_LINKS.filter((l) => l.key !== productKey);

  return (
    <div style={{ ["--accent" as string]: ink.ink }}>
      {/* soft accent glow behind the hero */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px]" style={{ background: `radial-gradient(700px 420px at 80% 0%, ${ink.tint.replace(".10", ".22")}, transparent 70%)` }} />

      <Section label={p.name} className="relative pt-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[14px] text-muted">
          <Link href="/#products" className="hover:text-text">
            Our Products
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text">{p.name}</span>
        </nav>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-start">
          <div>
            <h1 className="m-0 font-display text-[clamp(36px,4.8vw,68px)] leading-[1.02] font-semibold tracking-[-.03em] text-text">{p.name}</h1>
            <p className="mt-5 mb-0 max-w-[40ch] text-[clamp(18px,1.7vw,22px)] leading-[1.35] font-medium text-accent">{p.tagline}</p>
            {p.intro.map((para) => (
              <p key={para} className="mt-4 mb-0 max-w-[64ch] text-[16px] leading-[1.7] text-body">
                {para}
              </p>
            ))}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className={btnPrimary}>
                Request a Demo
              </Link>
              <a href="#features" className={btnGhost}>
                Explore features ↓
              </a>
            </div>
          </div>

          <Glass className="p-5 sm:p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[15.5px] font-semibold text-text">Platform map</span>
              <span className="hud">{titles.length} modules</span>
            </div>
            <ul className="m-0 mt-4 grid list-none gap-x-4 gap-y-2 p-0 sm:grid-cols-2">
              {titles.map((t) => (
                <li key={t} className="flex items-start gap-2 text-[13.5px] leading-[1.35] text-text">
                  <span aria-hidden="true" className="mt-[5px] h-1.5 w-1.5 flex-none rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-holo/10 pt-4">
              {p.badges.map((b) => (
                <span key={b} className="rounded-full border border-holo/20 px-2.5 py-1 font-mono text-[11px] text-body">
                  {b}
                </span>
              ))}
            </div>
          </Glass>
        </div>
      </Section>

      <Section id="features" label="Capabilities" className="pt-20">
        <Heading>Everything inside {p.name}</Heading>

        {all.length > 1 && (
          <div role="tablist" aria-label="Capability categories" className="glass sticky top-[72px] z-20 mt-6 flex flex-wrap gap-1 rounded-[16px] bg-void/70 p-1.5">
            {tabs.map((t) => {
              const on = t.label === tab;
              return (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setTab(t.label)}
                  className={`flex items-center gap-2 rounded-[11px] px-3.5 py-2 text-[14.5px] font-medium whitespace-nowrap ${on ? "bg-accent text-void" : "text-body hover:bg-holo/5 hover:text-text"}`}
                >
                  {t.label}
                  <span className={`font-mono text-[11px] ${on ? "text-void/70" : "text-muted"}`}>{t.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {sections.map((s) => (
          <div key={s.cat} className="mt-10">
            <Heading as="h3" className="!text-[clamp(22px,2.2vw,28px)]">
              {s.cat}
            </Heading>
            {s.d && <p className="mt-2 mb-0 max-w-[72ch] text-[16px] leading-[1.65] text-body">{s.d}</p>}
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {s.groups.map((g) => (
                <Glass key={g.t} className="flex flex-col p-5 sm:p-6">
                  <h4 className="m-0 text-[18.5px] leading-[1.25] font-semibold tracking-[-.01em] text-text">{g.t}</h4>
                  {g.d && <p className="mt-2 mb-0 text-[14.5px] leading-[1.6] text-body">{g.d}</p>}
                  <ul className="m-0 mt-4 flex-1 list-none space-y-2 p-0">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-[14px] leading-[1.45] text-text">
                        <span aria-hidden="true" className="mt-[7px] h-1 w-3 flex-none rounded-full bg-accent" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {g.note && <p className="mt-4 mb-0 border-t border-holo/10 pt-3 text-[13.5px] leading-[1.6] text-muted">{g.note}</p>}
                </Glass>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section label={p.closingKicker} className="pt-20">
        <Glass className="p-7 sm:p-10">
          {p.closing.map((cl) => (
            <p key={cl} className="m-0 max-w-[60ch] text-[clamp(18px,1.9vw,24px)] leading-[1.45] font-medium text-pretty text-text [&+p]:mt-4">
              {cl}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className={btnPrimary}>
              Request a Demo
            </Link>
            <Link href="/contact" className={btnGhost}>
              Talk to our team
            </Link>
          </div>
        </Glass>
      </Section>

      <Section label="More from AlphaNet" className="pt-20">
        <Heading as="h3">More from AlphaNet</Heading>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {others.map((o) => {
            const oi = PRODUCT_INK[o.key].ink;
            return (
              <Link key={o.key} href={o.href} className="group">
                <Glass className="flex h-full flex-col p-5 group-hover:border-holo/50">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: oi, boxShadow: `0 0 12px ${oi}` }} />
                  <span className="mt-4 text-[17.5px] leading-tight font-semibold text-text">{PRODUCTS[o.key].name}</span>
                  <span className="mt-2 text-[14px] leading-[1.55] text-body">{o.tag}</span>
                  <span className="mt-auto pt-4 text-[14.5px] font-semibold group-hover:underline" style={{ color: oi }}>
                    View product
                  </span>
                </Glass>
              </Link>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
