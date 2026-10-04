import type { ReactNode } from "react";
import { Glass, Section } from "./ui";

export type LegalSection = { id: string; title: string; body: ReactNode };

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

/** Hero + intro, sticky contents, numbered clauses (design: Privacy.dc.html / Terms.dc.html). */
export function LegalPage({ title, intro, sections }: Props) {
  return (
    <main>
      <Section label="Legal" className="pt-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h1 className="m-0 font-display text-[clamp(34px,4.6vw,64px)] leading-[1.04] font-semibold tracking-[-.03em] text-text">{title}</h1>
          <p className="m-0 max-w-[62ch] text-[17px] leading-[1.7] text-body">{intro}</p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <nav aria-label="Contents" className="lg:sticky lg:top-24">
            <Glass className="p-2">
              <ol className="m-0 list-none p-0">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-2.5 rounded-[10px] px-3 py-2 text-[14.5px] text-body hover:bg-holo/5 hover:text-text">
                      <span className="w-5 font-mono text-[11.5px] leading-[1.9] text-holo/70">{i + 1}.</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </Glass>
          </nav>

          <div className="grid gap-4">
            {sections.map((s, i) => (
              <Glass key={s.id}>
                <section id={s.id} className="scroll-mt-24 p-6 text-[16px] leading-[1.7] text-body sm:p-7">
                  <h2 className="m-0 flex gap-3 text-[21px] leading-tight font-semibold tracking-[-.01em] text-text">
                    <span className="font-mono text-[13px] leading-[2] text-holo/70">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </h2>
                  <div className="max-w-[70ch] [&_a]:font-semibold [&_a]:text-holo [&_a]:underline [&_a]:decoration-holo/40 [&_a]:underline-offset-4 [&_strong]:text-text">
                    {s.body}
                  </div>
                </section>
              </Glass>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mt-3 list-none space-y-2 p-0">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden="true" className="mt-[11px] h-1 w-3 flex-none rounded-full bg-holo" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
