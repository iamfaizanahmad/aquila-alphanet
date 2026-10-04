"use client";

import Link from "next/link";
import { PRODUCTS, PRODUCT_LINKS } from "@/content/products";
import { CONTACT, FOOTER_SERVICES, USEFUL_LINKS } from "@/content/site";
import { useMountainTime } from "@/lib/useMountainTime";
import { Wordmark } from "./SiteHeader";

const flink = "text-body hover:text-holo";
const colHead = "hud";
const social = "grid h-10 w-10 place-items-center rounded-full border border-holo/25 text-text hover:border-holo hover:text-holo";

export function SiteFooter() {
  const mtTime = useMountainTime();

  return (
    <footer className="mt-28 border-t border-holo/10 bg-deep/60 px-gutter pt-14 pb-8">
      <div className="sheet lg:px-8">
        <div className="grid gap-10 border-b border-holo/10 pb-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            <Wordmark />
            <p className="mt-5 mb-0 max-w-[66ch] text-[15px] leading-[1.65] text-body">
              AlphaNet Solutions is a software and healthcare technology company specializing in custom software
              development, EHR/PM solutions, Revenue Cycle Management (RCM), cloud and DevOps services, API integrations,
              AI automation, and product modernization. We help businesses build, deploy, customize, integrate, and scale
              secure digital solutions while providing ongoing technical support and maintenance.
            </p>
          </div>
          <div className="text-[14.5px] leading-[1.8] text-body">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-holo/20 px-3 py-1 text-[13.5px] text-text">
              Kalispell, MT · <span className="font-mono text-[12.5px] text-holo">{mtTime || "—"}</span> local
            </div>
            <div>Address: {CONTACT.address}</div>
            <div>
              Email:{" "}
              <a className={flink} href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
            <div>
              Phone:{" "}
              <a className={flink} href={CONTACT.phoneHref}>
                {CONTACT.phone}
              </a>{" "}
              · Fax: {CONTACT.fax}
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)]">
          <div>
            <div className={colHead}>Our Services</div>
            <div className="mt-4 grid gap-x-6 gap-y-2.5 text-[14.5px] sm:grid-cols-2">
              {FOOTER_SERVICES.flat().map((l) => (
                <Link key={l.label} href={l.href} className={flink}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className={colHead}>Our Product</div>
            <div className="mt-4 flex flex-col gap-2.5 text-[14.5px]">
              {PRODUCT_LINKS.map((l) => (
                <Link key={l.key} href={l.href} className={flink}>
                  {PRODUCTS[l.key].name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className={colHead}>Useful Links</div>
            <div className="mt-4 flex flex-col gap-2.5 text-[14.5px]">
              {USEFUL_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={flink}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <a href={CONTACT.linkedin} aria-label="LinkedIn" className={`${social} text-[14px] font-bold`}>
                in
              </a>
              <a href={CONTACT.instagram} aria-label="Instagram" className={social}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" />
                  <circle cx="8" cy="8" r="3" />
                </svg>
              </a>
              <a href={CONTACT.website} aria-label="Website" className={social}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="6.5" />
                  <path d="M1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2 border-t border-holo/10 pt-6 text-[13px] text-muted">
          <span>Alphanets Solutions 2014 – 2026 · Copyright Alphanets Solutions. All Rights Reserved.</span>
          <span>Created by Fourasol</span>
        </div>
      </div>
    </footer>
  );
}
