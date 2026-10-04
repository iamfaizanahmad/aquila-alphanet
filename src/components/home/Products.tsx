import Link from "next/link";
import { Glass, Heading, Pill, Section } from "@/components/ui";
import { HOME_PRODUCTS } from "@/content/home";
import { PRODUCT_INK, PRODUCT_LINKS } from "@/content/products";

const AQUILA_MODULES = [
  { t: "EHR", d: "SOAP notes, templates, e-prescribing" },
  { t: "Practice Management", d: "Scheduling, eligibility, claims" },
  { t: "Patient Portal", d: "Records, intake, telehealth" },
  { t: "AI & Automation", d: "AI Scribe, workflow automation" },
];

const inkFor = (href: string) => PRODUCT_INK[PRODUCT_LINKS.find((x) => x.href === href)!.key].ink;

export function Products() {
  return (
    <Section id="products" label="Our Products" className="pt-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading className="max-w-[18ch]">Platforms we build, own and run.</Heading>
        <p className="m-0 max-w-[44ch] text-[16px] leading-[1.65] text-body">
          Five in-house products spanning clinical care, practice operations, credentialing and support.
        </p>
      </div>

      <Link href="/products/aquila-ehr" className="group mt-8 block">
        <Glass className="grid overflow-hidden group-hover:border-holo/50 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Pill>Flagship</Pill>
              <span className="font-mono text-[11.5px] text-muted">EHR · PMS · RCM · AI</span>
            </div>
            <h3 className="m-0 mt-4 font-display text-[clamp(28px,3.2vw,44px)] leading-[1.05] font-semibold tracking-[-.025em] text-text">Aquila EHR/PMS</h3>
            <p className="mt-4 mb-0 max-w-[56ch] text-[16px] leading-[1.65] text-body">
              A comprehensive healthcare technology platform designed to help medical practices manage clinical care,
              administrative workflows, patient engagement, billing, and revenue cycle operations through a single
              integrated solution.
            </p>
            <span className="mt-6 inline-block text-[15.5px] font-semibold text-holo group-hover:underline">Explore Aquila EHR/PMS</span>
          </div>
          <div className="grid grid-cols-2 gap-px border-t border-holo/10 bg-holo/10 lg:border-t-0 lg:border-l">
            {AQUILA_MODULES.map((m) => (
              <div key={m.t} className="bg-void/70 p-5">
                <div className="text-[15px] font-semibold text-text">{m.t}</div>
                <div className="mt-1.5 text-[13.5px] leading-[1.5] text-muted">{m.d}</div>
              </div>
            ))}
          </div>
        </Glass>
      </Link>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {HOME_PRODUCTS.map((p) => {
          const ink = inkFor(p.href);
          return (
            <Link key={p.name} href={p.href} className="group">
              <Glass className="flex h-full flex-col p-5 group-hover:border-holo/50">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: ink, boxShadow: `0 0 12px ${ink}` }} />
                <h3 className="m-0 mt-4 text-[20px] leading-[1.15] font-semibold tracking-[-.01em] text-text">{p.name}</h3>
                <p className="mt-2.5 mb-0 text-[14.5px] leading-[1.6] text-body">{p.tag}</p>
                <ul className="m-0 mt-4 list-none space-y-1 p-0 text-[13.5px] text-text">
                  {p.mods.map((m) => (
                    <li key={m} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1 w-3 rounded-full" style={{ background: ink }} />
                      {m}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-5 text-[15px] font-semibold group-hover:underline" style={{ color: ink }}>
                  View product
                </span>
              </Glass>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
