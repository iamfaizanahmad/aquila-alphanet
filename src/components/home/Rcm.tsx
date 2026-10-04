import { Heading, Part } from "@/components/form";
import { RCM } from "@/content/home";

/** The RCM lifecycle is a real sequence, so it's set like box 24's numbered service lines. */
export function Rcm() {
  const rows = RCM.map((r) => r.split("|") as [string, string?]);
  const half = Math.ceil(rows.length / 2);
  const cols = [rows.slice(0, half), rows.slice(half)];

  return (
    <Part id="rcm" label="Revenue Cycle" className="pb-16">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
        <Heading>End-to-End Revenue Cycle Management (RCM)</Heading>
        <div className="space-y-3 text-[16px] leading-[1.65] text-graphite">
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

      <div className="mt-8 grid border-t-2 border-l border-form lg:grid-cols-2">
        {cols.map((col, c) => (
          <table key={c} className="w-full border-collapse">
            {/* the second column repeats the header only when it sits beside the first */}
            <thead className={c === 1 ? "max-lg:hidden" : ""}>
                <tr className="caption text-left">
                  <th className="w-12 border-r border-b border-form px-3 py-2 font-normal">24.</th>
                  <th className="border-r border-b border-form px-3 py-2 font-normal">Our RCM Services Include</th>
                  <th className="w-[120px] border-r border-b border-form px-3 py-2 font-normal">EDI transaction</th>
                </tr>
            </thead>
            <tbody>
              {col.map(([label, code], i) => {
                const n = c * half + i + 1;
                return (
                  <tr key={label} className="align-top hover:bg-form-tint">
                    <td className="border-r border-b border-form px-3 py-3 font-mono text-[13px] text-form">{String(n).padStart(2, "0")}</td>
                    <td className="border-r border-b border-form px-3 py-3 text-[15px] leading-[1.4] font-semibold text-ink">{label}</td>
                    <td className="border-r border-b border-form px-3 py-3 font-mono text-[12.5px] text-ink">{code ?? ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ))}
      </div>
    </Part>
  );
}
