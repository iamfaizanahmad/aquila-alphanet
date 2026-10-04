"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, PRODUCT_INK, PRODUCT_LINKS } from "@/content/products";
import { btnPrimary } from "./ui";

type NavKey = "home" | "products" | "about" | "contact" | "none";

function activeKey(path: string): NavKey {
  if (path === "/") return "home";
  if (path.startsWith("/products")) return "products";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/contact")) return "contact";
  return "none";
}

const NAV_PRODUCTS = PRODUCT_LINKS.map((l) => ({ ...l, name: PRODUCTS[l.key].name, ink: PRODUCT_INK[l.key].ink }));

const navItem = (on: boolean) => `rounded-full px-3.5 py-2 text-[14.5px] font-medium ${on ? "bg-holo/10 text-text" : "text-body hover:text-text"}`;
const mobileLink = "block rounded-[10px] px-2 py-3 text-[18px] font-semibold text-text hover:bg-holo/10";

/** Placeholder wordmark until the real AlphaNet logo exists. */
export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-[9px] border border-holo/50 font-display text-[11px] font-semibold text-holo shadow-[0_0_18px_rgba(139,233,255,.25)]">AN</span>
      <span className="text-[17px] leading-none font-semibold tracking-[-.01em] text-text">AlphaNet Solutions</span>
    </span>
  );
}

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

  return (
    <header className="sticky top-0 z-50 border-b border-holo/10 bg-void/70 backdrop-blur-[14px]">
      <div className="sheet flex h-16 items-center justify-between gap-5 px-gutter lg:px-8">
        <Link href="/" aria-label="AlphaNet Solutions home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 min-[940px]:flex" aria-label="Main">
          <Link href="/" className={navItem(active === "home")}>
            Home
          </Link>
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(closeT.current);
              setOpen(true);
            }}
            onMouseLeave={() => {
              closeT.current = setTimeout(() => setOpen(false), 140);
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              onClick={() => setOpen((o) => !o)}
              className={`flex items-center gap-1.5 ${navItem(active === "products")}`}
            >
              Our Products
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>
                <path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </button>
            {open && (
              <div className="absolute top-full left-1/2 z-50 w-[min(640px,92vw)] -translate-x-1/2 pt-2">
                <div className="glass grid gap-1 rounded-[16px] bg-deep/90 p-2 shadow-[0_24px_60px_rgba(0,0,0,.6)] sm:grid-cols-2">
                  {NAV_PRODUCTS.map((p) => (
                    <Link key={p.key} href={p.href} className="flex gap-3 rounded-[12px] p-3 hover:bg-holo/10">
                      <span className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full" style={{ background: p.ink, boxShadow: `0 0 10px ${p.ink}` }} />
                      <span>
                        <span className="block text-[15px] font-semibold text-text">{p.name}</span>
                        <span className="mt-0.5 block text-[13.5px] leading-[1.45] text-muted">{p.tag}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/about" className={navItem(active === "about")}>
            About Us
          </Link>
          <Link href="/contact" className={navItem(active === "contact")}>
            Contact Us
          </Link>
          <Link href="/contact" className={`${btnPrimary} ml-3 !px-5 !py-2.5 !text-[14.5px]`}>
            Request Demo
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobile}
          onClick={() => setMobile((m) => !m)}
          className="grid h-11 w-11 place-items-center rounded-full border border-holo/30 min-[940px]:hidden"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
            <path d={mobile ? "M3 1l14 12M17 1L3 13" : "M0 1h20M0 7h20M0 13h13"} stroke="#E9EEF6" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {mobile && (
        <nav aria-label="Main" className="border-t border-holo/10 bg-void/95 px-gutter pt-2 pb-6 min-[940px]:hidden">
          <Link href="/" className={mobileLink}>
            Home
          </Link>
          <div className="hud px-2 pt-3 pb-1">Our Products</div>
          {NAV_PRODUCTS.map((p) => (
            <Link key={p.key} href={p.href} className="flex items-center gap-3 rounded-[10px] px-2 py-2.5 text-[16px] font-medium text-text hover:bg-holo/10">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.ink }} />
              {p.name}
            </Link>
          ))}
          <Link href="/about" className={mobileLink}>
            About Us
          </Link>
          <Link href="/contact" className={mobileLink}>
            Contact Us
          </Link>
          <Link href="/contact" className={`${btnPrimary} mt-4 w-full`}>
            Request Demo
          </Link>
        </nav>
      )}
    </header>
  );
}
