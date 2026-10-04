"use client";

import { useEffect, useRef } from "react";

/**
 * Port of design_handoff_alphanet_website/motion.js.
 * - [data-reveal="delayMs"] and children of [data-stagger] (70ms step, max 560ms) fade/rise/unblur in once at 8% visibility.
 * - [data-count] counts the number in its text up from 0 over 1500ms (ease-out cubic).
 * - [data-tilt="deg"] follows the pointer; [data-spot] exposes --mx/--my for a radial spotlight.
 * - 2px scroll progress bar.
 * Reveal, count-up and tilt are disabled under prefers-reduced-motion.
 */
const EASE = "cubic-bezier(.2,.7,.2,1)";


function show(el: HTMLElement) {
  const d = parseInt(el.getAttribute("data-delay") || "0", 10);
  el.setAttribute("data-shown", "");
  el.animate?.(
    [
      { opacity: 0, transform: "translateY(28px)", filter: "blur(6px)" },
      { opacity: 1, transform: "none", filter: "blur(0px)" },
    ],
    { duration: 850, delay: d, easing: EASE, fill: "backwards" },
  );
}

function count(el: HTMLElement) {
  const txt = el.textContent || "";
  const m = txt.match(/(\d+(?:\.\d+)?)/);
  if (!m || m.index === undefined) return;
  const target = parseFloat(m[1]);
  const dec = (m[1].split(".")[1] || "").length;
  const pre = txt.slice(0, m.index);
  const post = txt.slice(m.index + m[1].length);
  const t0 = performance.now();
  const dur = 1500;
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = pre + (target * e).toFixed(dec) + post;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = txt;
  };
  step(t0);
}

export function Motion() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) document.documentElement.classList.remove("an-js");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const t = e.target as HTMLElement;
          if (counters.has(t)) count(t);
          else show(t);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    // Per-run bookkeeping (not element expandos) so a StrictMode remount re-observes everything.
    const seen = { r: new WeakSet<Element>(), c: new WeakSet<Element>() };
    const counters = new WeakSet<Element>();
    const prep = (el: HTMLElement, kind: "r" | "c") => {
      if (seen[kind].has(el)) return;
      seen[kind].add(el);
      if (kind === "r" && el.hasAttribute("data-shown")) return;
      if (reduce) {
        el.setAttribute("data-shown", "");
        return;
      }
      if (kind === "c") counters.add(el);
      io.observe(el);
    };

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (!el.hasAttribute("data-delay")) el.setAttribute("data-delay", el.getAttribute("data-reveal") || "0");
        prep(el, "r");
      });
      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((p) => {
        Array.from(p.children).forEach((c, i) => {
          const child = c as HTMLElement;
          if (!seen.r.has(child)) {
            child.setAttribute("data-delay", String(Math.min(i * 70, 560)));
            prep(child, "r");
          }
        });
      });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => prep(el, "c"));
    };

    let queued = false;
    let raf = 0;
    const queue = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    };
    const mo = new MutationObserver(queue);
    mo.observe(document.documentElement, { childList: true, subtree: true });
    queue();

    // Tilt + spotlight
    let cur: HTMLElement | null = null;
    const reset = (t: HTMLElement) => {
      if (t.hasAttribute("data-tilt")) t.style.transform = "";
      t.style.setProperty("--mx", "-999px");
      t.style.setProperty("--my", "-999px");
    };
    const onMove = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const t = (target?.closest?.("[data-tilt],[data-spot]") as HTMLElement | null) ?? null;
      if (cur && cur !== t) reset(cur);
      cur = t;
      if (!t) return;
      const r = t.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      t.style.setProperty("--mx", e.clientX - r.left + "px");
      t.style.setProperty("--my", e.clientY - r.top + "px");
      if (t.hasAttribute("data-tilt") && !reduce) {
        const a = parseFloat(t.getAttribute("data-tilt") || "") || 6;
        t.style.transform = `perspective(1000px) rotateX(${((0.5 - y) * a).toFixed(2)}deg) rotateY(${((x - 0.5) * a).toFixed(2)}deg) translateY(-4px)`;
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });

    // Scroll progress bar
    const upd = () => {
      const b = barRef.current;
      if (!b) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      b.style.transform = `scaleX(${h > 0 ? Math.min(1, window.scrollY / h) : 0})`;
    };
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    upd();

    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
      document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[200] h-[2px] w-full origin-[0_50%] scale-x-0 bg-[linear-gradient(90deg,#00F0FF,#8B7CFF,#C77DFF)] shadow-[0_0_12px_rgba(0,240,255,.6)]"
    />
  );
}

/** Runs before first paint so reveal targets start hidden (no flash). */
export const motionInitScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('an-js')}catch(e){}`;
