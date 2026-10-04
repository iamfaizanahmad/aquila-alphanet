import type { ReactNode } from "react";

/* Launch-theme primitives: sections over space, glass panels, HUD labels. */

export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id?: string;
  /** small HUD label naming the section */
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-gutter ${className}`}>
      <div className="sheet lg:px-8">
        <div className="hud mb-4 flex items-center gap-3" aria-hidden="true">
          <span className="h-px w-8 bg-holo/60" />
          {label}
        </div>
        {children}
      </div>
    </section>
  );
}

export function Heading({ children, as: Tag = "h2", className = "" }: { children: ReactNode; as?: "h1" | "h2" | "h3"; className?: string }) {
  const size =
    Tag === "h1"
      ? "font-display text-[clamp(34px,4.6vw,64px)] leading-[1.02] font-semibold tracking-[-.025em]"
      : Tag === "h2"
        ? "font-display text-[clamp(26px,3vw,40px)] leading-[1.08] font-semibold tracking-[-.02em]"
        : "text-[clamp(19px,1.8vw,22px)] leading-[1.2] font-semibold tracking-[-.01em]";
  return <Tag className={`m-0 text-text ${size} ${className}`}>{children}</Tag>;
}

export function Glass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass rounded-[16px] ${className}`}>{children}</div>;
}

export function Tick({ on, className = "" }: { on?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid h-[18px] w-[18px] flex-none place-items-center rounded-[5px] border text-[11px] leading-none font-bold ${
        on ? "border-qa bg-qa/15 text-qa" : "border-holo/30 text-transparent"
      } ${className}`}
    >
      ✓
    </span>
  );
}

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`inline-flex items-center rounded-full border border-amber/50 bg-amber/10 px-2.5 py-0.5 font-mono text-[11px] text-amber ${className}`}>{children}</span>;
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-holo px-6 py-3.5 text-[15.5px] font-semibold text-void shadow-[0_0_0_1px_rgba(139,233,255,.4),0_10px_40px_rgba(139,233,255,.25)] hover:bg-white disabled:opacity-60";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-holo/35 px-6 py-[13px] text-[15.5px] font-semibold text-text hover:border-holo hover:bg-holo/10";
export const link = "font-semibold text-holo underline decoration-holo/40 underline-offset-4 hover:decoration-holo";
