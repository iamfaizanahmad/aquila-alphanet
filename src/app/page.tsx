import Link from "next/link";
import { Part, btnPaper } from "@/components/form";
import { EstimateWizard } from "@/components/home/EstimateWizard";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Rcm } from "@/components/home/Rcm";
import { Services, Tracks } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { MARQUEE } from "@/content/home";

/** Standards we work in, written as one EDI-style string: "~" is the X12 segment terminator. */
function Standards() {
  return (
    <Part label="Interoperability" className="pb-16">
      <p className="m-0 border-y-2 border-form py-4 font-mono text-[clamp(14px,1.4vw,17px)] leading-[1.9] break-words text-ink">
        {MARQUEE.map((m, i) => (
          <span key={m}>
            <span className="whitespace-nowrap">{m}</span>
            {i < MARQUEE.length - 1 && <span className="text-form">~ </span>}
          </span>
        ))}
        <span className="text-form">~</span>
      </p>
    </Part>
  );
}

function GetStarted() {
  return (
    <section className="px-gutter">
      <div className="sheet lg:px-14">
        <div className="grid gap-8 bg-ink p-6 text-white sm:p-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <div>
            <h2 className="m-0 text-[clamp(40px,5.4vw,76px)] leading-[.92] font-black uppercase stretch-display">Get Started Today!</h2>
            <p className="mt-5 mb-0 max-w-[52ch] text-[17px] leading-[1.65] text-white/85">
              Ready to take your business to the next level? Contact us today to discuss how AlphaNet Solutions can help
              you achieve your goals.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4">
            <Link href="/contact" className={`${btnPaper} focus-visible:outline-white`}>
              Contact Us
            </Link>
            <p className="m-0 font-mono text-[13.5px] leading-[1.6] text-white/75">
              Join us on this journey of innovation and growth. Together, let’s build the future!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Standards />
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
        className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-[3px] border-2 border-paper bg-ink px-5 py-3 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(23,35,63,.28)] stretch-head hover:bg-ink-deep sm:right-6 sm:bottom-6"
      >
        Get an estimate
      </a>
    </>
  );
}
