"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Box, Caption, Check, Flag, Ruled, Stamp, btnInk, btnOutline } from "@/components/form";

/*
 * The page's one orchestrated moment: the headline types into box 19, the claim is
 * transmitted as an 837P, the 999 / 277CA / 835 acknowledgements tick, then PAID.
 */
const H1A = "We Don't Just Build Software.";
const H1B = "We Build Digital Market Leaders.";
const HEADLINE = `${H1A} ${H1B}`;
const TYPE_MS = 26;

const EDI = [
  "ST*837*0001*005010X222A1~",
  "BHT*0019*00*AN0001*20261004*1015*CH~",
  "NM1*85*2*ALPHANET SOLUTIONS*****XX*1234567893~",
  "CLM*AN-2014*250***11:B:1*Y*A*Y*Y~",
  "SV1*HC:99213*250*UN*1***1~",
  "SE*6*0001~",
];
const ACKS = [
  ["999", "Batch accepted"],
  ["277CA", "Claim accepted"],
  ["835", "Payment posted"],
];
const STATS = [
  { v: "11+", l: "Years Exp" },
  { v: "99.8%", l: "Client Retention" },
  { v: "50+", l: "Enterprise Apps Delivered" },
  { v: "5", l: "In-house Products" },
];

export function Hero() {
  const [typed, setTyped] = useState(0);
  const [edi, setEdi] = useState(0);
  const [acks, setAcks] = useState(0);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setTyped(HEADLINE.length);
      setEdi(EDI.length);
      setAcks(ACKS.length);
      setStamped(true);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const start = 450;
    for (let i = 1; i <= HEADLINE.length; i++) at(start + i * TYPE_MS, () => setTyped(i));
    const t1 = start + HEADLINE.length * TYPE_MS + 250;
    EDI.forEach((_, i) => at(t1 + i * 170, () => setEdi(i + 1)));
    const t2 = t1 + EDI.length * 170 + 200;
    ACKS.forEach((_, i) => at(t2 + i * 380, () => setAcks(i + 1)));
    at(t2 + ACKS.length * 380 + 150, () => setStamped(true));
    return () => timers.forEach(clearTimeout);
  }, []);

  const typing = typed < HEADLINE.length;
  const lineA = HEADLINE.slice(0, Math.min(typed, H1A.length));
  const lineB = typed > H1A.length + 1 ? HEADLINE.slice(H1A.length + 1, typed) : "";

  return (
    <section className="px-gutter pt-6 pb-16 sm:pt-8">
      <div className="sheet lg:px-14">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-3">
          <div>
            <div className="text-[26px] leading-none font-extrabold text-form stretch-display sm:text-[30px]">Health insurance claim form</div>
            <Caption className="mt-1.5">Approved by National Uniform Claim Committee (NUCC) 02/12</Caption>
          </div>
          <div className="caption flex flex-wrap gap-x-4 gap-y-1" aria-hidden="true">
            {["Medicare", "Medicaid", "Tricare", "Group health plan", "Other"].map((l) => (
              <span key={l} className="inline-flex items-center gap-1.5">
                <Check on={l === "Group health plan"} />
                {l}
              </span>
            ))}
          </div>
        </div>

        <Ruled className="border-t-2 lg:grid-cols-12">
          <Box n="1a" caption="Insured's ID number" className="lg:col-span-4">
            <div className="mt-1 font-mono text-[15px]">AN-2014-0001</div>
          </Box>
          <Box n="2" caption="Patient's name" className="lg:col-span-4">
            <div className="mt-1 font-mono text-[15px]">Your practice</div>
          </Box>
          <Box n="33" caption="Billing provider info & ph #" className="lg:col-span-4">
            <div className="mt-1 font-mono text-[13px] leading-snug">AlphaNet Solutions – HASH LLC, Kalispell MT 59901 (914)898-9007</div>
          </Box>

          <Box n="19" caption="Additional claim information" className="bg-form-tint lg:col-span-8">
            <h1
              aria-label={HEADLINE}
              className="m-0 mt-3 text-[clamp(42px,6.2vw,92px)] leading-[.9] font-black tracking-[-.02em] text-ink uppercase stretch-display"
            >
              <span aria-hidden="true" className="block">
                {lineA}
                {typing && typed <= H1A.length && <Caret />}
              </span>
              <span aria-hidden="true" className="block">
                {lineB}
                {typing && typed > H1A.length && <Caret />}
                {!lineB && <span className="invisible">W</span>}
              </span>
            </h1>
          </Box>

          <Box n="837P" caption="Electronic claim transmission" className="lg:col-span-4">
            <div aria-hidden="true" className="mt-3 min-h-[132px] font-mono text-[11.5px] leading-[1.75] break-all">
              {EDI.slice(0, edi).map((l) => (
                <div key={l} className="animate-[typeIn_.25s_ease-out]">
                  {l}
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="mt-4 space-y-1.5 border-t border-dashed border-form pt-3 font-mono text-[12.5px]">
              {ACKS.map(([code, text], i) => (
                <div key={code} className="flex items-center gap-3">
                  <span
                    className="grid h-4 w-4 place-items-center border border-form text-[11px] text-white transition-colors"
                    style={{ background: i < acks ? "#1B7A4B" : "transparent" }}
                  >
                    {i < acks ? "✓" : ""}
                  </span>
                  <span className="w-12 font-semibold">{code}</span>
                  <span className={i < acks ? "" : "opacity-35"}>{text}</span>
                </div>
              ))}
            </div>
            {stamped && <Stamp label="PAID" sub="835 ERA" className="mt-6 ml-auto" />}
          </Box>

          <Box n="21" caption="Nature of the engagement" className="lg:col-span-7 xl:col-span-6">
            <p className="mt-2 mb-0 text-[22px] leading-tight font-bold stretch-head">Your Partner in Innovative Software Solutions</p>
            <p className="mt-3 mb-0 max-w-[62ch] text-[15.5px] leading-[1.65] text-graphite">
              At AlphaNet Solutions, we are dedicated to transforming your ideas into reality through cutting-edge
              technology and expert craftsmanship. With over 11+ years of experience in the software and IT industry, we
              provide a comprehensive suite of services designed to meet the diverse needs of our clients.
            </p>
          </Box>
          <Box n="24" caption="Next action" className="flex flex-col lg:col-span-5 xl:col-span-6">
            <div className="mt-4 flex flex-1 flex-wrap content-end items-end gap-3 [&>*]:whitespace-nowrap">
              <a href="#estimate" className={btnInk}>
                Launch Your Project
              </a>
              <Link href="/products/aquila-ehr" className={btnOutline}>
                Explore AquilaEHR <Flag>Flagship</Flag>
              </Link>
            </div>
          </Box>

          {STATS.map((s) => (
            <Box key={s.l} caption={s.l} className="lg:col-span-3">
              <div className="mt-1 font-mono text-[clamp(26px,2.6vw,36px)] font-semibold">{s.v}</div>
            </Box>
          ))}
        </Ruled>
        <div className="caption mt-2 flex justify-between gap-4 text-[10.5px]">
          <span>NUCC instruction manual available at: www.nucc.org</span>
          <span>Form CMS-1500 (02-12)</span>
        </div>
      </div>
    </section>
  );
}

function Caret() {
  return <span className="ml-1 inline-block h-[.8em] w-[.08em] translate-y-[.06em] animate-[caret_.9s_steps(1)_infinite] bg-form" />;
}
