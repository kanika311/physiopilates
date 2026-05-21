"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { brand } from "@/lib/brand";

const GOLD = brand.gold;

type NavLink = {
  label: string;
  href: string;
  pathnameMatch?: string;
};

/** `pathnameMatch` enables gold + underline treatment for the active service route */
const ROUTES: NavLink[] = [
  { label: "Physiotherapy", href: "/physiotherapy", pathnameMatch: "/physiotherapy" },
  { label: "Pilates", href: "/pilates", pathnameMatch: "/pilates" },
  { label: "Yoga", href: "/yoga", pathnameMatch: "/yoga" },
  { label: "Therapy", href: "/therapy", pathnameMatch: "/therapy" },
  { label: "Courses", href: "/courses", pathnameMatch: "/courses" },
  { label: "Gallery", href: "/gallery", pathnameMatch: "/gallery" },
  { label: "Blogs", href: "/blogs", pathnameMatch: "/blogs" },
  { label: "Contact", href: "/contact", pathnameMatch: "/contact" },
];

function navScrollSolid(y: number, innerH: number, prevSolid: boolean) {
  const vh = Math.max(innerH, 520);
  const on = vh * 0.21;
  const off = vh * 0.15;
  return prevSolid ? y > off : y > on;
}

function routeActive(pathname: string, pathnameMatch?: string) {
  if (!pathnameMatch) return false;
  return pathname === pathnameMatch || pathname.startsWith(`${pathnameMatch}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [solidNav, setSolidNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Avoid SSR/portal mismatch — portal attaches after mount */
  const [mounted, setMounted] = useState(false);
  const aboutActive = routeActive(pathname, "/about");

  const barSolid = solidNav || mobileOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setSolidNav((prev) => navScrollSolid(window.scrollY, window.innerHeight, prev));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  /** Montserrat stack — uppercase nav; desktop scales 13→15→16px so one row fits most laptops */
  const navFont =
    "font-[family-name:var(--font-montserrat),ui-sans-serif,system-ui,sans-serif] not-italic font-semibold uppercase tracking-[0.06em]";
  const navMobileSize = "text-[15px] leading-6";
  const navDesktopSize =
    "whitespace-nowrap text-[13px] leading-[1.15rem] xl:text-[15px] xl:leading-[1.4rem] 2xl:text-base 2xl:leading-6";
  const desktopLinkBase = `${navFont} ${navDesktopSize} rounded-md px-1.5 py-1.5 no-underline transition-colors duration-200 xl:px-2 xl:py-2`;

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 border-b px-4 transition-[background-color,border-color,backdrop-filter,box-shadow,z-index] duration-500 ease-out sm:px-6 lg:px-10 xl:px-14 2xl:px-20",
        /* Above FAB (z-110) + full-screen drawer so toggle stays usable */
        mobileOpen ? "z-[520]" : "z-[100]",
        barSolid
          ? "border-black/[0.06] bg-[#f8f8f8]/95 pb-2.5 pt-2.5 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12)] backdrop-blur-[10px] sm:pb-3 sm:pt-3"
          : "border-transparent bg-transparent pb-2 pt-2 shadow-none backdrop-blur-none",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-3 sm:gap-5">
        <Link
          href="/"
          className="flex shrink-0 items-center no-underline"
          aria-label="Physio Pilates home"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Physio Pilates"
            width={122}
            height={49}
            className={`h-auto w-[68px] object-contain sm:w-[98px] md:w-[102px] lg:w-[128px] xl:w-[140px] ${
              barSolid ? "" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            }`}
            priority
          />
        </Link>

        <nav
          className="max-lg:hidden lg:flex lg:flex-nowrap lg:items-center lg:justify-end lg:gap-x-2 lg:gap-y-0 xl:gap-x-3 2xl:gap-x-5"
          aria-label="Main"
        >
          <Link
            href="/about"
            aria-current={aboutActive ? "page" : undefined}
            className={[
              `${navFont} ${navDesktopSize} flex items-center rounded-md px-1.5 py-1.5 no-underline xl:px-2 xl:py-2`,
              !aboutActive && !solidNav && "text-white/95 drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)] hover:text-white",
              !aboutActive && solidNav && "text-[black] hover:text-neutral-900",
              aboutActive && "underline decoration-2 underline-offset-[10px]",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ color: aboutActive ? GOLD : undefined }}
          >
            About
           
          </Link>
          {ROUTES.map(({ label, href, pathnameMatch }) => {
            const active = routeActive(pathname, pathnameMatch);
            const inactiveSolid = solidNav && !active;
            const inactiveTransparent = !solidNav && !active;

            const className = [
              desktopLinkBase,
              inactiveSolid && "text-[black] hover:text-neutral-900",
              inactiveTransparent && "text-white/95 drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)] hover:text-white",
              active && "underline decoration-2 underline-offset-[10px]",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <Link
                key={label}
                href={href}
                className={className}
                style={active ? { color: GOLD } : undefined}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className={[
            "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border transition-colors lg:hidden",
            barSolid
              ? "border-neutral-200/90 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50"
              : "border-white/45 bg-black/25 text-white backdrop-blur-sm hover:bg-black/35",
          ].join(" ")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <FiX className="size-6" aria-hidden /> : <FiMenu className="size-6" aria-hidden />}
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {/* Mobile drawer — portal avoids header stacking/overflow clipping; z above FAB */}
      {mounted && mobileOpen
        ? createPortal(
            <div className="lg:hidden" role="presentation">
              {/*
               * Dim page below fixed navbar — light overlay + no heavy blur so hero stays readable.
               * Drawer starts UNDER header so first link (“About”) is not hidden behind logo bar.
               */}
              <button
                type="button"
                className="fixed inset-x-0 bottom-0 top-[calc(4.85rem+env(safe-area-inset-top,0px))] z-[500] bg-black/40 sm:top-[calc(6.75rem+env(safe-area-inset-top,0px))]"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              />
              <div
                id="mobile-nav-panel"
                className="fixed inset-x-0 bottom-0 top-[calc(4.85rem+env(safe-area-inset-top,0px))] z-[510] flex w-full max-w-none flex-col overflow-hidden border-t border-black/[0.08] bg-[#f8f8f8] shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.12)] sm:top-[calc(6.75rem+env(safe-area-inset-top,0px))]"
                role="dialog"
                aria-modal="true"
                aria-label="Site navigation"
              >
                {/* Single compact row — main close control stays in navbar */}
                {/* <div className="shrink-0 border-b border-black/[0.06] px-4 pb-2 pt-2">
                  <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                    Navigate
                  </p>
                </div> */}
                <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-2 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className={[
                      `${navFont} ${navMobileSize} flex items-center justify-between rounded-xl px-3 py-3.5 no-underline active:bg-neutral-200/50`,
                      aboutActive ? "bg-white shadow-sm ring-1 ring-black/[0.06]" : "text-neutral-800 hover:bg-white/80",
                    ].join(" ")}
                    style={aboutActive ? { color: GOLD } : undefined}
                    aria-current={aboutActive ? "page" : undefined}
                  >
                    About
                    <FiChevronDown className="size-4 rotate-[-90deg] opacity-50" aria-hidden />
                  </Link>
                  {ROUTES.map(({ label, href, pathnameMatch }) => {
                    const active = routeActive(pathname, pathnameMatch);
                    return (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={[
                          `${navFont} ${navMobileSize} block rounded-xl px-3 py-3.5 no-underline active:bg-neutral-200/50`,
                          active
                            ? "bg-white shadow-sm ring-1 ring-black/[0.06]"
                            : "text-neutral-800 hover:bg-white/80",
                        ].join(" ")}
                        style={active ? { color: GOLD } : undefined}
                        aria-current={active ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
