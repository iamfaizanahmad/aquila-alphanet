"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS, PRODUCT_INK, PRODUCT_LINKS } from "@/content/products";
import { btnInk } from "./form";

type NavKey = "home" | "products" | "about" | "contact" | "none";

function activeKey(path: string): NavKey {
  if (path === "/") return "home";
  if (path.startsWith("/products")) return "products";
  if (path.startsWith("/about")) return "about";
  if (path.startsWith("/contact")) return "contact";
  return "none";
}

const NAV_PRODUCTS = PRODUCT_LINKS.map((l) => ({ ...l, name: PRODUCTS[l.key].name, ink: PRODUCT_INK[l.key].ink }));

const navItem = (on: boolean) =>
  `relative px-3 py-2 text-[15px] font-semibold stretch-head text-ink hover:text-form ${
    on ? "after:absolute after:inset-x-3 after:-bottom-[1px] after:h-[2px] after:bg-form" : ""
  }`;

const mobileLink = "block border-b border-dashed border-form py-3 text-[18px] font-bold text-ink stretch-head";

/** Placeholder wordmark until the real AlphaNet logo exists. */
export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center border-2 border-form font-mono text-[14px] font-semibold text-ink">AN</span>
      <span className="text-[19px] leading-none font-extrabold tracking-[-.01em] text-ink stretch-head">AlphaNet Solutions</span>
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
    <header className="sticky top-0 z-50 border-b-2 border-form bg-paper/95 backdrop-blur-[6px]">
      <div className="sheet flex items-center justify-between gap-5 px-gutter py-3 lg:px-14">
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
              <div className="absolute top-full left-1/2 z-50 w-[min(640px,92vw)] -translate-x-1/2 pt-3">
                <div className="border-2 border-form bg-paper shadow-[0_18px_40px_rgba(23,35,63,.14)]">
                  <div className="caption border-b border-form px-4 py-2">Our products</div>
                  <div className="grid sm:grid-cols-2">
                    {NAV_PRODUCTS.map((p, i) => (
                      <Link
                        key={p.key}
                        href={p.href}
                        className={`flex gap-3 border-form p-4 hover:bg-form-tint ${i % 2 === 0 ? "sm:border-r" : ""} ${i < NAV_PRODUCTS.length - 1 ? "border-b" : ""}`}
                      >
                        <span className="mt-1 h-3 w-3 flex-none" style={{ background: p.ink }} />
                        <span>
                          <span className="block text-[16px] font-bold text-ink stretch-head">{p.name}</span>
                          <span className="mt-1 block text-[13.5px] leading-[1.45] text-muted">{p.tag}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
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
          <Link href="/contact" className={`${btnInk} ml-3 !px-5 !py-2.5 !text-[15px]`}>
            Request Demo
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={mobile}
          onClick={() => setMobile((m) => !m)}
          className="grid h-11 w-11 place-items-center border-2 border-form min-[940px]:hidden"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
            <path d={mobile ? "M3 1l14 12M17 1L3 13" : "M0 1h20M0 7h20M0 13h13"} stroke="#17233F" strokeWidth="2" />
          </svg>
        </button>
      </div>

      {mobile && (
        <nav aria-label="Main" className="border-t border-form bg-paper px-gutter pt-2 pb-6 min-[940px]:hidden">
          <Link href="/" className={mobileLink}>
            Home
          </Link>
          <div className="border-b border-dashed border-form pb-2">
            <div className="caption pt-4 pb-1">Our Products</div>
            {NAV_PRODUCTS.map((p) => (
              <Link key={p.key} href={p.href} className="flex items-center gap-3 py-2.5 text-[16px] font-semibold text-ink">
                <span className="h-2.5 w-2.5" style={{ background: p.ink }} />
                {p.name}
              </Link>
            ))}
          </div>
          <Link href="/about" className={mobileLink}>
            About Us
          </Link>
          <Link href="/contact" className={mobileLink}>
            Contact Us
          </Link>
          <Link href="/contact" className={`${btnInk} mt-4 w-full`}>
            Request Demo
          </Link>
        </nav>
      )}
    </header>
  );
}
