import type { ReactNode } from "react";

export type LegalSection = { id: string; title: string; body: ReactNode };

type Props = {
  title: string;
  intro: string;
  /** "cyan" for Privacy, "violet" for Terms. */
  tone: "cyan" | "violet";
  sections: LegalSection[];
};

const TONES = {
  cyan: {
    accent: "text-cyan",
    glow: "bg-[radial-gradient(700px_460px_at_85%_-10%,rgba(0,240,255,.14),transparent_65%)]",
    last: "border-[rgba(0,240,255,.22)] bg-[rgba(0,240,255,.05)]",
  },
  violet: {
    accent: "text-violet",
    glow: "bg-[radial-gradient(700px_460px_at_85%_-10%,rgba(139,124,255,.18),transparent_65%)]",
    last: "border-[rgba(139,124,255,.26)] bg-[rgba(139,124,255,.06)]",
  },
};

/** Hero + intro, sticky TOC, numbered section cards (design: Privacy.dc.html / Terms.dc.html). */
export function LegalPage({ title, intro, tone, sections }: Props) {
  const t = TONES[tone];
  return (
    <>
      <div className={`pointer-events-none absolute top-0 right-0 left-0 h-[700px] ${t.glow}`} />
      <main>
        <section className="relative px-gutter pt-[clamp(56px,7vw,100px)] pb-[clamp(70px,8vw,120px)]">
          <div className="mx-auto max-w-[1080px]">
            <div data-stagger="">
              <div className={`kicker ${t.accent}`}>Legal</div>
              <h1 className="mt-[18px] mb-0 font-display text-[clamp(38px,5.4vw,68px)] leading-[1.04] font-extrabold tracking-[-.035em]">
                {title}
              </h1>
              <p className="mt-[22px] mb-0 max-w-[68ch] text-[17px] leading-[1.75] text-body-2">{intro}</p>
            </div>

            <div className="mt-[52px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] items-start gap-[clamp(24px,4vw,56px)]">
              <nav
                data-reveal=""
                aria-label="Contents"
                className="sticky top-[100px] flex max-w-[280px] flex-col gap-[2px] rounded-[18px] border border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.02)] p-3"
              >
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-[10px] px-3 py-[9px] text-[13.5px] text-body-2 hover:bg-[rgba(255,255,255,.05)] hover:text-white"
                  >
                    {i + 1}. {s.title}
                  </a>
                ))}
              </nav>

              <div className="col-span-2 flex min-w-0 flex-col gap-[14px] text-[15.5px] leading-[1.75] text-[#B6C0D3] max-[548px]:col-span-1">
                {sections.map((s, i) => (
                  <div
                    key={s.id}
                    id={s.id}
                    data-reveal=""
                    className={`scroll-mt-[100px] rounded-[22px] border p-7 ${
                      i === sections.length - 1 ? t.last : "border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.025)]"
                    }`}
                  >
                    <h2 className="m-0 font-display text-[22px] font-bold text-strong">
                      <span className={`mr-[10px] font-mono text-[14px] ${t.accent}`}>{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </h2>
                    {s.body}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-col gap-2">
      {items.map((it) => (
        <div key={it} className="flex gap-3">
          <span className="mt-[11px] h-[6px] w-[6px] flex-none rounded-[2px] bg-cyan" />
          <span>{it}</span>
        </div>
      ))}
    </div>
  );
}
