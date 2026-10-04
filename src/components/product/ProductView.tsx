"use client";

import Link from "next/link";
import { useState } from "react";
import { Box, Caption, Check, Heading, Part, Ruled, btnInk, btnOutline, btnPaper } from "@/components/form";
import { PRODUCTS, PRODUCT_INK, PRODUCT_LINKS, type ProductKey } from "@/content/products";

/** One template for all five products (design: Product.dc.html), printed in the product's own form ink. */
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
    <div style={{ ["--form" as string]: ink.ink, ["--form-tint" as string]: ink.tint }}>
      {/* Hero form */}
      <section className="px-gutter pt-6 pb-16 sm:pt-8">
        <div className="sheet lg:px-14">
          <nav aria-label="Breadcrumb" className="caption flex items-center gap-2 pb-3 text-[13px]">
            <Link href="/#products" className="underline-offset-4 hover:underline">
              Our Products
            </Link>
            <span aria-hidden="true">/</span>
            <span className="font-semibold">{p.name}</span>
          </nav>
          <Ruled className="border-t-2 lg:grid-cols-12">
            <Box caption="Product" className="bg-form-tint lg:col-span-8">
              <h1 className="m-0 mt-3 text-[clamp(44px,6.4vw,96px)] leading-[.9] font-black tracking-[-.02em] text-ink uppercase stretch-display">
                {p.name}
              </h1>
              <p className="mt-5 mb-0 max-w-[38ch] text-[clamp(19px,1.9vw,24px)] leading-[1.3] font-bold text-form stretch-head">{p.tagline}</p>
            </Box>

            <Box caption="Platform map" className="lg:col-span-4 lg:row-span-3">
              <div className="mt-1 font-mono text-[12px] text-muted">{titles.length} modules</div>
              <ul className="m-0 mt-3 grid list-none gap-x-4 gap-y-1.5 p-0 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {titles.map((t) => (
                  <li key={t} className="flex items-start gap-2 text-[13px] leading-[1.35] text-ink">
                    <Check on className="mt-[1px]" />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-dashed border-form pt-4">
                {p.badges.map((b) => (
                  <span key={b} className="border border-form px-2 py-0.5 font-mono text-[12px] text-ink">
                    {b}
                  </span>
                ))}
              </div>
            </Box>

            <Box caption="Description" className="lg:col-span-8">
              {p.intro.map((para) => (
                <p key={para} className="mt-3 mb-0 max-w-[66ch] text-[16px] leading-[1.7] text-graphite">
                  {para}
                </p>
              ))}
            </Box>
            <Box caption="Next action" className="lg:col-span-8">
              <div className="mt-3 flex flex-wrap gap-3">
                <Link href="/contact" className={btnInk}>
                  Request a Demo
                </Link>
                <a href="#features" className={btnOutline}>
                  Explore features ↓
                </a>
              </div>
            </Box>
          </Ruled>
        </div>
      </section>

      {/* Capabilities */}
      <Part id="features" label="Capabilities" className="pb-16">
        <Heading>Everything inside {p.name}</Heading>

        {all.length > 1 && (
          <div
            role="tablist"
            aria-label="Capability categories"
            className="sticky top-16 z-20 mt-6 flex flex-wrap border-t-2 border-l border-form bg-paper"
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
                  className={`flex flex-1 items-center justify-center gap-2 border-r border-b border-form px-3 py-2.5 text-[15px] font-bold whitespace-nowrap stretch-head ${
                    on ? "bg-ink text-white" : "text-ink hover:bg-form-tint"
                  }`}
                >
                  {t.label}
                  <span className={`font-mono text-[11.5px] font-medium ${on ? "text-white/70" : "text-form"}`}>{t.count}</span>
                </button>
              );
            })}
          </div>
        )}

        {sections.map((s) => (
          <div key={s.cat} className="mt-10">
            <Heading as="h3" className="!text-[clamp(24px,2.6vw,34px)]">
              {s.cat}
            </Heading>
            {s.d && <p className="mt-2 mb-0 max-w-[72ch] text-[16px] leading-[1.65] text-graphite">{s.d}</p>}
            <Ruled className="mt-5 md:grid-cols-2 xl:grid-cols-3">
              {s.groups.map((g) => (
                <div key={g.t} className="flex flex-col p-4 sm:p-5">
                  <h4 className="m-0 text-[20px] leading-[1.15] font-extrabold text-ink stretch-head">{g.t}</h4>
                  {g.d && <p className="mt-2 mb-0 text-[14.5px] leading-[1.6] text-graphite">{g.d}</p>}
                  <ul className="m-0 mt-4 flex-1 list-none space-y-1.5 p-0">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 font-mono text-[13px] leading-[1.5] text-ink">
                        <Check on className="mt-[2px]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {g.note && (
                    <p className="mt-4 mb-0 border-t border-dashed border-form pt-3 text-[13.5px] leading-[1.6] text-muted">
                      {g.note}
                    </p>
                  )}
                </div>
              ))}
            </Ruled>
          </div>
        ))}
      </Part>

      {/* Closing statement */}
      <section className="px-gutter pb-16">
        <div className="sheet lg:px-14">
          <div className="bg-ink p-6 text-white sm:p-10">
            <Caption className="!text-white/70 text-[13px]">{p.closingKicker}</Caption>
            {p.closing.map((cl) => (
              <p key={cl} className="mt-4 mb-0 max-w-[60ch] text-[clamp(19px,2vw,26px)] leading-[1.4] font-semibold text-pretty stretch-head">
                {cl}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className={`${btnPaper} focus-visible:outline-white`}>
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-[3px] border-2 border-white/60 px-6 py-3 text-[16px] font-bold text-white stretch-head hover:border-white focus-visible:outline-white"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <Part label="More from AlphaNet">
        <Heading as="h3">More from AlphaNet</Heading>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {others.map((o) => {
            const oi = PRODUCT_INK[o.key];
            return (
              <Link
                key={o.key}
                href={o.href}
                className="group flex flex-col border-2 bg-paper p-4 hover:bg-[var(--form-tint)] sm:p-5"
                style={{ borderColor: oi.ink, ["--form" as string]: oi.ink, ["--form-tint" as string]: oi.tint }}
              >
                <Caption>Product</Caption>
                <span className="mt-2 text-[19px] leading-tight font-extrabold text-ink stretch-head">{PRODUCTS[o.key].name}</span>
                <span className="mt-2 text-[14px] leading-[1.55] text-graphite">{o.tag}</span>
                <span className="mt-auto pt-4 text-[14.5px] font-bold text-form underline-offset-4 group-hover:underline">View product</span>
              </Link>
            );
          })}
        </div>
      </Part>
    </div>
  );
}
