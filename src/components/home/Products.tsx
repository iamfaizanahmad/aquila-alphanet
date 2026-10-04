import Link from "next/link";
import { Box, Caption, Flag, Heading, Part } from "@/components/form";
import { HOME_PRODUCTS } from "@/content/home";
import { PRODUCT_INK, PRODUCT_LINKS } from "@/content/products";

const AQUILA_MODULES = [
  { t: "EHR", d: "SOAP notes, templates, e-prescribing" },
  { t: "Practice Management", d: "Scheduling, eligibility, claims" },
  { t: "Patient Portal", d: "Records, intake, telehealth" },
  { t: "AI & Automation", d: "AI Scribe, workflow automation" },
];

const inkFor = (href: string) => {
  const l = PRODUCT_LINKS.find((x) => x.href === href)!;
  return PRODUCT_INK[l.key];
};

/** Each product is printed in its own form ink, like the copies of a multi-part form. */
export function Products() {
  return (
    <Part id="products" label="Our Products" className="pb-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading className="max-w-[18ch]">Platforms we build, own and run.</Heading>
        <p className="m-0 max-w-[44ch] text-[16px] leading-[1.65] text-graphite">
          Five in-house products spanning clinical care, practice operations, credentialing and support.
        </p>
      </div>

      <Link
        href="/products/aquila-ehr"
        className="group mt-8 grid border-2 border-form bg-form-tint lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
      >
        <div className="p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            <Flag>Flagship</Flag>
            <span className="font-mono text-[12.5px] text-ink">EHR · PMS · RCM · AI</span>
          </div>
          <h3 className="m-0 mt-4 text-[clamp(34px,4vw,56px)] leading-[.95] font-black text-ink uppercase stretch-display">Aquila EHR/PMS</h3>
          <p className="mt-4 mb-0 max-w-[56ch] text-[16px] leading-[1.65] text-graphite">
            A comprehensive healthcare technology platform designed to help medical practices manage clinical care,
            administrative workflows, patient engagement, billing, and revenue cycle operations through a single
            integrated solution.
          </p>
          <span className="mt-6 inline-block text-[16px] font-bold text-form underline-offset-4 group-hover:underline">Explore Aquila EHR/PMS</span>
        </div>
        <div className="grid grid-cols-2 border-t border-form lg:border-t-0 lg:border-l">
          {AQUILA_MODULES.map((m, i) => (
            <div key={m.t} className={`bg-paper p-4 sm:p-5 ${i % 2 === 0 ? "border-r border-form" : ""} ${i < 2 ? "border-b border-form" : ""}`}>
              <Caption>{m.t}</Caption>
              <div className="mt-2 font-mono text-[13px] leading-[1.55] text-ink">{m.d}</div>
            </div>
          ))}
        </div>
      </Link>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {HOME_PRODUCTS.map((p) => {
          const ink = inkFor(p.href);
          return (
            <Link
              key={p.name}
              href={p.href}
              className="group flex flex-col border-2 bg-paper hover:bg-[var(--form-tint)]"
              style={{ borderColor: ink.ink, ["--form" as string]: ink.ink, ["--form-tint" as string]: ink.tint }}
            >
              <Box caption="Product" className="flex flex-1 flex-col">
                <h3 className="m-0 mt-2 text-[22px] leading-[1.05] font-extrabold text-ink stretch-head">{p.name}</h3>
                <p className="mt-3 mb-0 text-[14.5px] leading-[1.6] text-graphite">{p.tag}</p>
                <ul className="m-0 mt-4 list-none space-y-1 p-0 font-mono text-[12.5px] text-ink">
                  {p.mods.map((m) => (
                    <li key={m} className="flex items-center gap-2">
                      <span aria-hidden="true" className="h-1.5 w-1.5 bg-form" />
                      {m}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto pt-5 text-[15px] font-bold text-form underline-offset-4 group-hover:underline">View product</span>
              </Box>
            </Link>
          );
        })}
      </div>
    </Part>
  );
}
