"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, PRODUCT_LINKS } from "@/content/products";

type NavKey = "home" | "products" | "about" | "contact" | "none";

function activeKey(path: string): NavKey {
  if (path === "/") return "home";
  if (path.startsWith("/products")) return "products";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/contact")) return "contact";
  return "none";
}

const navItem =
  "rounded-[10px] px-[14px] py-[9px] text-[14px] font-medium hover:bg-[rgba(255,255,255,.06)] hover:text-ink";
const stateCls = (on: boolean) => (on ? "text-white bg-[rgba(0,240,255,.10)]" : "text-[#A9B2C4] bg-transparent");

const NAV_PRODUCTS = PRODUCT_LINKS.map((l) => ({ ...l, name: PRODUCTS[l.key].name, accent: PRODUCTS[l.key].accent }));

export function SiteHeader() {
  const pathname = usePathname();
  const active = activeKey(pathname);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    setOpen(false);
    setMobile(false);
  }, [pathname]);
  useEffect(() => () => clearTimeout(closeT.current), []);

  const openMenu = () => {
    clearTimeout(closeT.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeT.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <header className="sticky top-0 z-[60] flex items-center justify-between gap-5 border-b border-[rgba(255,255,255,.07)] bg-[rgba(5,7,14,.78)] px-gutter py-[14px] backdrop-blur-[18px]">
      <Link href="/" className="flex items-center gap-3 text-ink hover:text-white">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[11px] bg-[linear-gradient(140deg,#00F0FF,#6C4DF6)] font-display text-[17px] font-extrabold text-[#05060c] shadow-[0_0_24px_rgba(0,240,255,.35)]">
          A
        </span>
        <span className="font-display text-[17px] font-bold tracking-[-.01em]">
          AlphaNet<span className="font-medium text-[#8A94A8]"> Solutions</span>
        </span>
      </Link>

      {/* ≥940px */}
      <nav className="hidden items-center gap-1 min-[940px]:flex">
        <Link href="/" className={`${navItem} ${stateCls(active === "home")}`}>
          Home
        </Link>
        <div className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="true"
            onClick={() => setOpen((o) => !o)}
            className={`flex items-center gap-[7px] ${navItem} ${stateCls(active === "products")}`}
          >
            Our Products
            <span
              className="inline-block text-[9px] transition-transform duration-[250ms]"
              style={{ transform: open ? "rotate(180deg)" : "none" }}
            >
              ▼
            </span>
          </button>
          {open && (
            <div className="absolute top-full left-1/2 z-[80] w-[min(600px,92vw)] -translate-x-1/2 pt-3">
              <div className="grid animate-[anIn_.25s_ease-out] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-1 rounded-[20px] border border-[rgba(255,255,255,.1)] bg-[rgba(8,11,22,.94)] p-[10px] shadow-[0_30px_80px_rgba(0,0,0,.6),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-[20px]">
                {NAV_PRODUCTS.map((p) => (
                  <Link
                    key={p.key}
                    href={p.href}
                    className="flex gap-3 rounded-[14px] p-[14px] text-ink hover:bg-[rgba(255,255,255,.06)] hover:text-white"
                  >
                    <span
                      className="mt-[5px] h-[10px] w-[10px] flex-none rounded-[3px]"
                      style={{ background: p.accent, boxShadow: `0 0 12px ${p.accent}` }}
                    />
                    <span>
                      <span className="block font-display text-[14.5px] font-bold">{p.name}</span>
                      <span className="mt-1 block text-[12.5px] leading-[1.5] text-[#8A94A8]">{p.tag}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <Link href="/about" className={`${navItem} ${stateCls(active === "about")}`}>
          About Us
        </Link>
        <Link href="/contact" className={`${navItem} ${stateCls(active === "contact")}`}>
          Contact Us
        </Link>
        <Link
          href="/contact"
          className="ml-2 rounded-xl bg-[linear-gradient(120deg,#00F0FF,#69E6FF)] px-5 py-[11px] text-[14px] font-bold text-on-accent shadow-[0_8px_26px_rgba(0,240,255,.3)] hover:text-on-accent hover:shadow-[0_10px_34px_rgba(0,240,255,.55)]"
        >
          Request Demo
        </Link>
      </nav>

      {/* <940px */}
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={mobile}
        onClick={() => setMobile((m) => !m)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-[rgba(255,255,255,.14)] min-[940px]:hidden"
      >
        <span className="h-[1.5px] w-[18px] bg-ink" />
        <span className="h-[1.5px] w-[18px] bg-ink" />
        <span className="h-[1.5px] w-3 bg-cyan" />
      </button>

      {mobile && (
        <div className="absolute top-full right-0 left-0 flex animate-[anIn_.25s_ease-out] flex-col gap-1 border-b border-[rgba(255,255,255,.08)] bg-[rgba(6,8,16,.97)] px-gutter pt-[14px] pb-[22px] backdrop-blur-[18px] min-[940px]:hidden">
          <Link href="/" className="px-1 py-3 text-[16px] font-semibold text-ink">
            Home
          </Link>
          <div className="px-1 pt-3 pb-[6px] text-[12px] font-bold tracking-[.12em] text-subtle uppercase">Our Products</div>
          {NAV_PRODUCTS.map((p) => (
            <Link key={p.key} href={p.href} className="flex items-center gap-[10px] py-[10px] pr-1 pl-3 text-[15px] text-soft">
              <span className="h-2 w-2 rounded-[2px]" style={{ background: p.accent }} />
              {p.name}
            </Link>
          ))}
          <Link href="/about" className="px-1 py-3 text-[16px] font-semibold text-ink">
            About Us
          </Link>
          <Link href="/contact" className="px-1 py-3 text-[16px] font-semibold text-ink">
            Contact Us
          </Link>
          <Link
            href="/contact"
            className="mt-2 rounded-xl bg-[linear-gradient(120deg,#00F0FF,#8B7CFF)] p-[14px] text-center font-bold text-on-accent"
          >
            Request Demo
          </Link>
        </div>
      )}
    </header>
  );
}
