import type { ReactNode } from "react";
import { Box, Ruled } from "./form";

export type LegalSection = { id: string; title: string; body: ReactNode };

type Props = {
  title: string;
  intro: string;
  /** Privacy is printed in the default red; Terms in blue, like a second form copy. */
  tone: "red" | "blue";
  sections: LegalSection[];
};

const TONES = {
  red: { "--form": "#D3343B", "--form-tint": "#FDF3F2" },
  blue: { "--form": "#2F5D9E", "--form-tint": "#F1F5FB" },
};

/** Hero + intro, sticky contents, numbered clauses (design: Privacy.dc.html / Terms.dc.html). */
export function LegalPage({ title, intro, tone, sections }: Props) {
  return (
    <main className="px-gutter pt-6 sm:pt-8" style={TONES[tone] as React.CSSProperties}>
      <div className="sheet lg:px-14">
        <Ruled className="border-t-2 lg:grid-cols-12">
          <Box caption="Legal" className="bg-form-tint lg:col-span-6">
            <h1 className="m-0 mt-3 text-[clamp(42px,5.6vw,84px)] leading-[.92] font-black tracking-[-.02em] text-ink uppercase stretch-display">
              {title}
            </h1>
          </Box>
          <Box caption="Description" className="flex flex-col justify-end lg:col-span-6">
            <p className="mt-3 mb-0 max-w-[62ch] text-[17px] leading-[1.7] text-graphite">{intro}</p>
          </Box>
        </Ruled>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label="Contents" className="border-2 border-form lg:sticky lg:top-24">
            <div className="caption border-b border-form px-4 py-2">Contents</div>
            <ol className="m-0 list-none p-0">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 border-b border-dashed border-form px-4 py-2.5 text-[14.5px] text-ink last:border-b-0 hover:bg-form-tint">
                    <span className="font-mono text-[13px] text-form">{i + 1}.</span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Ruled>
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 p-4 text-[16px] leading-[1.7] text-graphite sm:p-6">
                <h2 className="m-0 flex gap-3 text-[24px] leading-tight font-extrabold text-ink stretch-head">
                  <span className="font-mono text-[15px] leading-[1.9] font-medium text-form">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="max-w-[70ch] [&_a]:text-form [&_a]:underline [&_a]:underline-offset-2">{s.body}</div>
              </section>
            ))}
          </Ruled>
        </div>
      </div>
    </main>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mt-3 list-none space-y-2 p-0">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden="true" className="mt-[10px] h-1.5 w-1.5 flex-none bg-form" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
