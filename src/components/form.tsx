import type { ReactNode } from "react";

/*
 * Claim-form primitives. Boxes don't draw their own borders: a <Ruled> grid draws
 * the outer top/left rule and every child draws right/bottom, so adjacent boxes
 * share one hairline exactly like a printed form.
 */

export const ruled = "grid border-t border-l border-form [&>*]:border-r [&>*]:border-b [&>*]:border-form";

export function Ruled({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`${ruled} ${className}`}>{children}</div>;
}

export function Caption({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`caption ${className}`}>
      {n && <span className="mr-1 font-bold">{n}.</span>}
      {children}
    </div>
  );
}

export function Box({
  n,
  caption,
  className = "",
  children,
}: {
  n?: string;
  caption?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative min-w-0 p-4 sm:p-5 ${className}`}>
      {caption && <Caption n={n}>{caption}</Caption>}
      {children}
    </div>
  );
}

/** Typed data: monospace navy, like a field filled on a typewriter. */
export function Typed({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-ink ${className}`}>{children}</span>;
}

/** Form checkbox. `on` prints the typed × mark. */
export function Check({ on, className = "" }: { on?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid h-[14px] w-[14px] flex-none place-items-center border border-form font-mono text-[12px] leading-none text-ink ${className}`}
    >
      {on ? "×" : ""}
    </span>
  );
}

/**
 * A form part: the CMS-1500 prints a vertical label down the side of each part
 * ("Patient and insured information"). Here it labels each page section.
 */
export function Part({
  label,
  id,
  children,
  className = "",
}: {
  label: string;
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-gutter ${className}`}>
      {/* the side label sits in the sheet's left margin so content edges align with every other section */}
      <div className="sheet relative lg:px-14">
        <div className="caption flex items-center border-form pb-2 text-[12px] font-semibold lg:absolute lg:inset-y-0 lg:left-0 lg:w-[40px] lg:items-start lg:justify-center lg:border-r lg:pb-0">
          <span className="lg:rotate-180 lg:[writing-mode:vertical-rl]">{label}</span>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Section heading: condensed navy, no eyebrow, no gradient. */
export function Heading({ children, as: Tag = "h2", className = "" }: { children: ReactNode; as?: "h1" | "h2" | "h3"; className?: string }) {
  const size =
    Tag === "h1"
      ? "text-[clamp(40px,6vw,88px)] leading-[.92] font-black stretch-display uppercase"
      : Tag === "h2"
        ? "text-[clamp(30px,3.8vw,52px)] leading-[.98] font-extrabold stretch-head tracking-[-.01em]"
        : "text-[clamp(21px,2vw,26px)] leading-[1.1] font-bold stretch-head";
  return <Tag className={`m-0 text-ink ${size} ${className}`}>{children}</Tag>;
}

/** Rubber stamp. Animates in once when mounted. */
export function Stamp({
  label,
  sub,
  color = "#1B7A4B",
  rot = -9,
  className = "",
}: {
  label: string;
  sub?: string;
  color?: string;
  rot?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-fit animate-[stamp_.42s_cubic-bezier(.2,1.4,.4,1)_both] rounded-[6px] border-[5px] px-4 py-1 text-center text-[46px] leading-none font-black tracking-[.04em] mix-blend-multiply stretch-caption ${className}`}
      style={{ color, borderColor: color, ["--rot" as string]: `${rot}deg`, transform: `rotate(${rot}deg)` }}
    >
      {label}
      {sub && <span className="block font-mono text-[11px] font-semibold tracking-normal">{sub}</span>}
    </div>
  );
}

export const btnInk =
  "inline-flex items-center justify-center gap-2 rounded-[3px] bg-ink px-6 py-[14px] text-[16px] font-bold text-white stretch-head hover:bg-ink-deep disabled:opacity-60";
export const btnOutline =
  "inline-flex items-center justify-center gap-2 rounded-[3px] border-2 border-form px-6 py-3 text-[16px] font-bold text-form stretch-head hover:bg-form-tint";
export const btnPaper =
  "inline-flex items-center justify-center gap-2 rounded-[3px] bg-paper px-6 py-[14px] text-[16px] font-bold text-ink stretch-head hover:bg-white";

export function Flag({ children }: { children: ReactNode }) {
  return <span className="rounded-[2px] bg-form px-1.5 py-0.5 font-mono text-[11px] font-semibold text-white">{children}</span>;
}
