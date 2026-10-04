import { Glass, Heading, Section } from "@/components/ui";
import { RCM } from "@/content/home";

/** The RCM lifecycle is a real sequence: a numbered list with its EDI transactions. */
export function Rcm() {
  const rows = RCM.map((r) => r.split("|") as [string, string?]);

  return (
    <Section id="rcm" label="Revenue Cycle" className="pt-20">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <Heading>End-to-End Revenue Cycle Management (RCM)</Heading>
        <div className="flex flex-col gap-3 text-[16px] leading-[1.65] text-body">
          <p className="m-0">
            We provide comprehensive Revenue Cycle Management services designed to optimize the complete financial
            lifecycle of healthcare organizations—from patient registration and insurance verification to claim
            submission, payment posting, denial management, and accounts receivable follow-up.
          </p>
          <p className="m-0">
            Our RCM services combine healthcare operational expertise, technology, EDI workflows, and revenue-cycle
            analytics to help practices improve collections, reduce claim delays, and maintain greater visibility into
            their financial performance.
          </p>
        </div>
      </div>

      <Glass className="mt-8 p-2 sm:p-3">
        <div className="px-3 pt-2 pb-3 text-[14px] font-semibold text-text">Our RCM Services Include</div>
        <ol className="m-0 grid list-none gap-x-6 p-0 lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-8">
          {rows.map(([label, code], i) => (
            <li key={label} className="flex items-baseline gap-3 border-t border-holo/10 px-3 py-2.5">
              <span className="w-6 flex-none font-mono text-[11.5px] text-holo/70">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] leading-[1.35] text-text">{label}</span>
              {code && <span className="ml-auto flex-none rounded-full border border-amber/40 px-2 py-0.5 font-mono text-[11px] text-amber">{code}</span>}
            </li>
          ))}
        </ol>
      </Glass>
    </Section>
  );
}
