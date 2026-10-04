import Link from "next/link";
import { EstimateWizard } from "@/components/home/EstimateWizard";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Rcm } from "@/components/home/Rcm";
import { Services, Tracks } from "@/components/home/Services";
import { WhyUs } from "@/components/home/WhyUs";
import { MARQUEE } from "@/content/home";

function Marquee() {
  const items = MARQUEE.concat(MARQUEE);
  return (
    <div className="relative z-[1] overflow-hidden border-y border-[rgba(255,255,255,.06)] bg-[rgba(255,255,255,.015)] py-[22px] [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="flex w-max animate-[anMarquee_48s_linear_infinite] gap-11">
        {items.map((m, i) => (
          <span
            key={i}
            aria-hidden={i >= MARQUEE.length}
            className="flex items-center gap-11 font-mono text-[14px] tracking-[.04em] whitespace-nowrap text-[#6E7890]"
          >
            {m}
            <span className="h-[5px] w-[5px] rounded-full bg-[rgba(0,240,255,.5)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

function GetStarted() {
  return (
    <section className="relative z-[1] px-gutter pt-[clamp(40px,5vw,80px)] pb-[clamp(70px,8vw,120px)]">
      <div
        data-reveal=""
        className="relative container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-8 overflow-hidden rounded-[32px] border border-[rgba(255,255,255,.12)] bg-[linear-gradient(130deg,rgba(0,240,255,.18),rgba(108,77,246,.22)_50%,rgba(199,125,255,.14))] p-[clamp(34px,5vw,72px)] shadow-[0_40px_110px_rgba(0,0,0,.5),inset_0_1px_0_rgba(255,255,255,.16)]"
      >
        <div>
          <h2 className="m-0 font-display text-[clamp(32px,4.4vw,56px)] leading-[1.04] font-extrabold tracking-[-.035em]">
            Get Started Today!
          </h2>
          <p className="mt-[18px] mb-0 max-w-[52ch] text-[16.5px] leading-[1.7] text-[#E1E6F0]">
            Ready to take your business to the next level? Contact us today to discuss how AlphaNet Solutions can help
            you achieve your goals.
          </p>
        </div>
        <div className="flex flex-col items-start gap-[18px]">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-[18px] font-display text-[17px] font-bold text-on-accent shadow-[0_16px_44px_rgba(0,0,0,.35)] transition-transform duration-200 hover:-translate-y-[2px] hover:bg-[#E6FDFF] hover:text-on-accent"
          >
            Contact Us <span className="font-mono">→</span>
          </Link>
          <div className="text-[14.5px] leading-[1.6] text-[#D6DCE8]">
            Join us on this journey of innovation and growth. Together, let’s build the future!
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(900px_600px_at_78%_-10%,rgba(108,77,246,.22),transparent_65%),radial-gradient(700px_500px_at_5%_20%,rgba(0,240,255,.10),transparent_60%)]" />
      <main>
        <Hero />
        <Marquee />
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
        className="fixed right-[clamp(14px,3vw,30px)] bottom-[clamp(14px,3vw,30px)] z-[60] inline-flex items-center gap-[10px] rounded-full bg-[linear-gradient(120deg,#00F0FF,#8B7CFF)] px-[22px] py-[15px] font-display text-[15px] font-bold text-on-accent shadow-[0_16px_44px_rgba(0,240,255,.4)] transition-transform duration-200 hover:-translate-y-[2px] hover:text-on-accent hover:shadow-[0_20px_60px_rgba(0,240,255,.6)]"
      >
        <span className="h-2 w-2 animate-[anPulse_1.6s_ease-in-out_infinite] rounded-full bg-on-accent" />
        Get an estimate
      </a>
    </>
  );
}
