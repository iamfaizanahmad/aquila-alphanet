"use client";

import Link from "next/link";
import { PRODUCTS, PRODUCT_LINKS } from "@/content/products";
import { CONTACT, FOOTER_SERVICES, USEFUL_LINKS } from "@/content/site";
import { useMountainTime } from "@/lib/useMountainTime";
import { Box, Ruled, Typed } from "./form";
import { Wordmark } from "./SiteHeader";

const link = "text-ink underline-offset-4 hover:text-form hover:underline";
const social =
  "grid h-10 w-10 place-items-center border border-form text-ink hover:bg-form-tint focus-visible:outline-2";

export function SiteFooter() {
  const mtTime = useMountainTime();

  return (
    <footer className="mt-24 border-t-2 border-form bg-paper px-gutter pt-10 pb-8">
      <div className="sheet lg:px-14">
        <Ruled className="lg:grid-cols-12">
          <Box caption="AlphaNet Solutions – HASH LLC" className="lg:col-span-7">
            <div className="mt-3">
              <Wordmark />
            </div>
            <p className="mt-4 mb-0 max-w-[68ch] text-[15px] leading-[1.65] text-graphite">
              AlphaNet Solutions is a software and healthcare technology company specializing in custom software
              development, EHR/PM solutions, Revenue Cycle Management (RCM), cloud and DevOps services, API integrations,
              AI automation, and product modernization. We help businesses build, deploy, customize, integrate, and scale
              secure digital solutions while providing ongoing technical support and maintenance.
            </p>
          </Box>
          <Box caption="Billing provider info & ph #" className="lg:col-span-5">
            <div className="mt-3 flex items-center gap-2 text-[14px] text-graphite">
              <span className="h-2 w-2 bg-paid" aria-hidden="true" />
              Kalispell, MT · <Typed className="text-[14px]">{mtTime || "—"}</Typed> local
            </div>
            <div className="mt-3 space-y-1 font-mono text-[13.5px] leading-[1.6] text-ink">
              <div>Address: {CONTACT.address}</div>
              <div>
                Email:{" "}
                <a className={link} href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </div>
              <div>
                Phone:{" "}
                <a className={link} href={CONTACT.phoneHref}>
                  {CONTACT.phone}
                </a>{" "}
                · Fax: {CONTACT.fax}
              </div>
            </div>
          </Box>

          <Box caption="Our Services" className="lg:col-span-5">
            <div className="mt-3 grid gap-x-6 gap-y-2 text-[14.5px] sm:grid-cols-2">
              {FOOTER_SERVICES.flat().map((l) => (
                <Link key={l.label} href={l.href} className={link}>
                  {l.label}
                </Link>
              ))}
            </div>
          </Box>
          <Box caption="Our Product" className="lg:col-span-4">
            <div className="mt-3 flex flex-col gap-2 text-[14.5px]">
              {PRODUCT_LINKS.map((l) => (
                <Link key={l.key} href={l.href} className={link}>
                  {PRODUCTS[l.key].name}
                </Link>
              ))}
            </div>
          </Box>
          <Box caption="Useful Links" className="lg:col-span-3">
            <div className="mt-3 flex flex-col gap-2 text-[14.5px]">
              {USEFUL_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={link}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
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
          </Box>
        </Ruled>
        <div className="caption mt-2 flex flex-wrap justify-between gap-2 text-[12px]">
          <span>Alphanets Solutions 2014 – 2026 · Copyright Alphanets Solutions. All Rights Reserved.</span>
          <span>Created by Fourasol</span>
        </div>
      </div>
    </footer>
  );
}
