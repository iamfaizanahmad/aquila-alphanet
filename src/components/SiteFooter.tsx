"use client";

import Link from "next/link";
import { PRODUCTS, PRODUCT_LINKS } from "@/content/products";
import { CONTACT, FOOTER_SERVICES, USEFUL_LINKS } from "@/content/site";
import { useMountainTime } from "@/lib/useMountainTime";

const colHead = "text-[12.5px] font-bold tracking-[.12em] text-subtle uppercase";
const colLink = "text-soft hover:text-cyan";
const iconBtn =
  "flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(255,255,255,.14)] text-soft hover:border-[rgba(0,240,255,.45)] hover:text-cyan";

export function SiteFooter() {
  const mtTime = useMountainTime();

  return (
    <footer className="relative z-[1] border-t border-[rgba(255,255,255,.08)] bg-[linear-gradient(180deg,rgba(108,77,246,.08),#04050a_60%)] px-gutter pt-[clamp(56px,7vw,100px)] pb-[34px]">
      <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-11">
        <div className="col-span-full grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-end gap-8 border-b border-[rgba(255,255,255,.07)] pb-9">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[11px] bg-[linear-gradient(140deg,#00F0FF,#6C4DF6)] font-display font-extrabold text-[#05060c]">
                A
              </span>
              <span className="font-display text-[17px] font-bold">AlphaNet Solutions</span>
            </div>
            <p className="mt-[18px] mb-0 max-w-[62ch] text-[14.5px] leading-[1.75] text-[#96A0B4]">
              AlphaNet Solutions is a software and healthcare technology company specializing in custom software
              development, EHR/PM solutions, Revenue Cycle Management (RCM), cloud and DevOps services, API
              integrations, AI automation, and product modernization. We help businesses build, deploy, customize,
              integrate, and scale secure digital solutions while providing ongoing technical support and maintenance.
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="inline-flex items-center gap-[10px] rounded-[14px] border border-[rgba(255,255,255,.1)] bg-[rgba(255,255,255,.04)] px-[14px] py-[10px] text-[13.5px] text-soft">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-success shadow-[0_0_10px_#06D6A0]" />
              Kalispell, MT · <span className="font-mono text-cyan-light">{mtTime}</span> local
            </div>
            <div className="text-[14px] leading-[1.9] text-[#96A0B4]">
              <div>Address: {CONTACT.address}</div>
              <div>
                Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
              <div>
                Phone: <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> · Fax: {CONTACT.fax}
              </div>
            </div>
          </div>
        </div>

        {FOOTER_SERVICES.map((col, i) => (
          <div key={i}>
            <div className={`${colHead} ${i > 0 ? "invisible" : ""}`}>{i === 0 ? "Our Services" : "More"}</div>
            <div className="mt-4 flex flex-col gap-[10px] text-[14px]">
              {col.map((l) => (
                <Link key={l.label} href={l.href} className={colLink}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <div className={colHead}>Our Product</div>
          <div className="mt-4 flex flex-col gap-[10px] text-[14px]">
            {PRODUCT_LINKS.map((l) => (
              <Link key={l.key} href={l.href} className={colLink}>
                {PRODUCTS[l.key].name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className={colHead}>Useful Links</div>
          <div className="mt-4 flex flex-col gap-[10px] text-[14px]">
            {USEFUL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={colLink}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex gap-[10px]">
            <a href={CONTACT.linkedin} aria-label="LinkedIn" className={`${iconBtn} font-display text-[14px] font-bold`}>
              in
            </a>
            <a href={CONTACT.instagram} aria-label="Instagram" className={iconBtn}>
              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-[5px] border-[1.6px] border-current">
                <span className="h-[5px] w-[5px] rounded-full border-[1.4px] border-current" />
              </span>
            </a>
            <a href={CONTACT.website} aria-label="Website" className={iconBtn}>
              <span className="h-[15px] w-[15px] rounded-full border-[1.6px] border-current" />
            </a>
          </div>
        </div>
      </div>
      <div className="container-site mt-11 flex flex-wrap justify-between gap-4 border-t border-[rgba(255,255,255,.07)] pt-6 text-[13px] text-[#69738A]">
        <div>Alphanets Solutions 2014 – 2026 · Copyright Alphanets Solutions. All Rights Reserved.</div>
        <div>Created by Fourasol</div>
      </div>
    </footer>
  );
}
