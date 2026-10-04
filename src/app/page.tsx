import Link from "next/link";
import { EstimateWizard } from "@/components/home/EstimateWizard";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Rcm } from "@/components/home/Rcm";
import { Services, Tracks } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { Glass, Section, btnPrimary } from "@/components/ui";
import { MARQUEE } from "@/content/home";

const STATS = [
  { v: "11+", l: "Years Exp" },
  { v: "99.8%", l: "Client Retention" },
  { v: "50+", l: "Enterprise Apps Delivered" },
  { v: "5", l: "In-house Products" },
];

/** Shipping record + the standards we build with. */
function Record() {
  return (
    <Section label="Shipping record" className="pt-20">
      <div className="grid gap-px overflow-hidden rounded-[16px] border border-holo/15 bg-holo/10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.l} className="bg-void/90 p-6">
            <div className="font-display text-[clamp(30px,3vw,42px)] leading-none font-semibold tracking-[-.03em] text-text">{s.v}</div>
            <div className="mt-2 text-[14px] text-muted">{s.l}</div>
          </div>
        ))}
      </div>
      <ul className="m-0 mt-4 flex list-none flex-wrap gap-2 p-0" aria-label="Standards and platforms">
        {MARQUEE.map((m) => (
          <li key={m} className="rounded-full border border-holo/15 px-3 py-1 font-mono text-[11.5px] text-body">
            {m}
          </li>
        ))}
      </ul>
    </Section>
  );
}

function GetStarted() {
  return (
    <Section label="Get started" className="pt-20">
      <Glass className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
        <div>
          <h2 className="m-0 font-display text-[clamp(32px,4.2vw,58px)] leading-[1.02] font-semibold tracking-[-.03em] text-text">Get Started Today!</h2>
          <p className="mt-5 mb-0 max-w-[52ch] text-[17px] leading-[1.65] text-body">
            Ready to take your business to the next level? Contact us today to discuss how AlphaNet Solutions can help you
            achieve your goals.
          </p>
        </div>
        <div className="flex flex-col items-start gap-4">
          <Link href="/contact" className={btnPrimary}>
            Contact Us
          </Link>
          <p className="m-0 text-[14.5px] leading-[1.6] text-muted">Join us on this journey of innovation and growth. Together, let’s build the future!</p>
        </div>
      </Glass>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Record />
        <Services />
        <Tracks />
        <Rcm />
        <Products />
        <WhyUs />
        <EstimateWizard />
        <GetStarted />
      </main>
      <a
        href="#estimate"
        className="glass fixed right-4 bottom-4 z-40 inline-flex items-center rounded-full bg-void/70 px-5 py-3 text-[14.5px] font-semibold text-holo hover:border-holo sm:right-6 sm:bottom-6"
      >
        Get an estimate
      </a>
    </>
  );
}
