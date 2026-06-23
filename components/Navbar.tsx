"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { brand } from "@/lib/brand";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const TEAL = brand.primary;
const NAVY = brand.navy;

type NavLink = {
  label: string;
  href: string;
  pathnameMatch?: string;
};

const ABOUT_LINK: NavLink = { label: "About", href: "/about", pathnameMatch: "/about" };

const SERVICE_LINKS: NavLink[] = [
  { label: "Physiotherapy", href: "/physiotherapy", pathnameMatch: "/physiotherapy" },
  { label: "Pilates", href: "/pilates", pathnameMatch: "/pilates" },
  { label: "Yoga", href: "/yoga", pathnameMatch: "/yoga" },
  { label: "Therapy", href: "/therapy", pathnameMatch: "/therapy" },
];

const OTHER_NAV_LINKS: NavLink[] = [
  { label: "Courses", href: "/courses", pathnameMatch: "/courses" },
  { label: "Gallery", href: "/gallery", pathnameMatch: "/gallery" },
  { label: "Blogs", href: "/blogs", pathnameMatch: "/blogs" },
  { label: "Contact", href: "/contact", pathnameMatch: "/contact" },
];

function routeActive(pathname: string, pathnameMatch?: string) {
  if (!pathnameMatch) return false;
  return pathname === pathnameMatch || pathname.startsWith(`${pathnameMatch}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const svcMenuCloseTimerRef = useRef<number | undefined>(undefined);
  const servicesMenuRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const railRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Array<HTMLElement | null>>([]);
  const [pill, setPill] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const movePillTo = useCallback((el: HTMLElement | null, visible: boolean) => {
    const root = railRef.current;
    if (!visible || !el || !root) {
      setPill((p) => ({ ...p, opacity: 0 }));
      return;
    }
    const rr = root.getBoundingClientRect();
    const lr = el.getBoundingClientRect();
    setPill({
      left: lr.left - rr.left + root.scrollLeft,
      width: Math.max(0, lr.width),
      opacity: 1,
    });
  }, []);

  const syncPillActive = useCallback(() => {
    if (routeActive(pathname, ABOUT_LINK.pathnameMatch)) {
      movePillTo(linkRefs.current[0] ?? null, true);
      return;
    }
    if (SERVICE_LINKS.some((s) => routeActive(pathname, s.pathnameMatch))) {
      movePillTo(linkRefs.current[1] ?? null, true);
      return;
    }
    const otherIdx = OTHER_NAV_LINKS.findIndex((n) => routeActive(pathname, n.pathnameMatch));
    if (otherIdx >= 0) {
      movePillTo(linkRefs.current[2 + otherIdx] ?? null, true);
      return;
    }
    movePillTo(null, false);
  }, [movePillTo, pathname]);

  const reducedMotion = usePrefersReducedMotion() === true;
  const servicesRouteActive = SERVICE_LINKS.some((s) => routeActive(pathname, s.pathnameMatch));

  const publishNavHeight = useCallback(() => {
    const el = headerRef.current;
    if (!el || typeof document === "undefined") return;
    const h = Math.ceil(el.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--navbar-height", `${h}px`);
  }, []);

  const clearSvcMenuCloseTimer = useCallback(() => {
    const tid = svcMenuCloseTimerRef.current;
    if (tid !== undefined) {
      window.clearTimeout(tid);
      svcMenuCloseTimerRef.current = undefined;
    }
  }, []);

  const openServicesMenuHover = useCallback(() => {
    clearSvcMenuCloseTimer();
    setServicesMenuOpen(true);
  }, [clearSvcMenuCloseTimer]);

  const scheduleCloseServicesMenu = useCallback(() => {
    clearSvcMenuCloseTimer();
    svcMenuCloseTimerRef.current = window.setTimeout(() => {
      setServicesMenuOpen(false);
      svcMenuCloseTimerRef.current = undefined;
    }, 220);
  }, [clearSvcMenuCloseTimer]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    publishNavHeight();
  }, [pathname, mobileOpen, publishNavHeight]);

  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => publishNavHeight());
    ro.observe(el);
    window.addEventListener("resize", publishNavHeight, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", publishNavHeight);
    };
  }, [publishNavHeight]);

  useEffect(() => {
    setMobileOpen(false);
    setServicesMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    syncPillActive();
  }, [pathname, mobileOpen, syncPillActive]);

  useEffect(() => {
    if (!mobileOpen) return;
    publishNavHeight();
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
  }, [mobileOpen, publishNavHeight]);

  const navFont =
    "font-[family-name:var(--font-inter),ui-sans-serif,system-ui,sans-serif] not-italic font-semibold tracking-[0.06em]";
  const navMobileSize = "text-[15px] leading-6";
  const navDesktopSize =
    "whitespace-nowrap text-[12px] leading-tight xl:text-[13px] xl:leading-snug 2xl:text-sm 2xl:leading-normal";
  const desktopLinkBase = `${navFont} ${navDesktopSize} rounded-md px-2 py-1 no-underline transition-colors duration-200 xl:px-2.5 relative z-[1]`;

  /** Fixed vertical rhythm — no scroll-based height changes */
  const headerPad = "py-2 sm:py-2.5";

  useEffect(() => {
    window.addEventListener("resize", syncPillActive, { passive: true });
    return () => window.removeEventListener("resize", syncPillActive);
  }, [syncPillActive]);

  useEffect(() => {
    return () => clearSvcMenuCloseTimer();
  }, [clearSvcMenuCloseTimer]);

  useEffect(() => {
    if (!servicesMenuOpen) return undefined;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setServicesMenuOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      const root = servicesMenuRef.current;
      if (root && !root.contains(e.target as Node)) setServicesMenuOpen(false);
    }
    window.addEventListener("keydown", onEsc);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [servicesMenuOpen]);

  function desktopRailLinkClass(active: boolean) {
    return [
      desktopLinkBase,
      active ? "" : "text-neutral-800 hover:text-neutral-950 dark:text-slate-100 dark:hover:text-white",
    ]
      .filter(Boolean)
      .join(" ");
  }

  /** Mobile drawer + overlay sit below sticky header via measured `--navbar-height` */
  const belowNavTop = `top-[calc(var(--navbar-height,3.75rem)+env(safe-area-inset-top,0px))]`;

  return (
    <header
      ref={headerRef}
      className={[
        "sticky top-0 z-[100] w-full overflow-visible border-b border-[rgb(18_52_77/0.08)] bg-white/95 shadow-sm backdrop-blur-md",
        "transition-shadow duration-200 ease-out",
        headerPad,
        mobileOpen ? "z-[520]" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-4 sm:gap-6 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:justify-items-stretch lg:px-8 xl:gap-10">
        <Link
          href="/"
          className="relative z-[2] flex min-h-0 min-w-0 shrink-0 items-center leading-none no-underline mi-hover lg:justify-self-start"
          aria-label="Physio Pilates home"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo.png"
            alt="Physio Pilatees"
            width={160}
            height={40}
            className=" min-h-[60px] max-h-[90px] w-auto max-w-[min(220px,calc(100vw-8.75rem))] object-contain object-left "
            sizes="220px"
            priority
          />
        </Link>

        <nav
          ref={railRef}
          className="relative z-[1] hidden shrink-0 lg:col-start-2 lg:row-start-1 lg:flex lg:flex-nowrap lg:items-center lg:justify-self-center lg:gap-x-2.5 lg:gap-y-0 lg:py-0.5 xl:gap-x-3 2xl:gap-x-5"
          aria-label="Main"
          onMouseLeave={() => {
            syncPillActive();
          }}
        >
          <motion.span
            aria-hidden
            className="pointer-events-none absolute bottom-[2px] z-0 h-[3px] rounded-full bg-[transparent]"
            style={{ backgroundColor: TEAL }}
            initial={false}
            animate={{
              left: pill.left,
              width: pill.width,
              opacity: pill.opacity > 0 && pill.width > 0 ? pill.opacity : 0,
            }}
            transition={{ type: reducedMotion ? "tween" : "spring", stiffness: 520, damping: 38, duration: reducedMotion ? 0.08 : undefined }}
          />

          <Link
            href={ABOUT_LINK.href}
            ref={(el) => {
              linkRefs.current[0] = el;
            }}
            className={desktopRailLinkClass(routeActive(pathname, ABOUT_LINK.pathnameMatch))}
            style={{ color: routeActive(pathname, ABOUT_LINK.pathnameMatch) ? TEAL : NAVY }}
            aria-current={routeActive(pathname, ABOUT_LINK.pathnameMatch) ? "page" : undefined}
            onMouseEnter={(e) => movePillTo(e.currentTarget, true)}
            onFocus={(e) => movePillTo(e.currentTarget, true)}
          >
            {ABOUT_LINK.label}
          </Link>

          <div
            ref={servicesMenuRef}
            className="relative flex items-center py-0.5"
            onMouseEnter={openServicesMenuHover}
            onMouseLeave={scheduleCloseServicesMenu}
          >
            <button
              type="button"
              ref={(el) => {
                linkRefs.current[1] = el;
              }}
              className={`${desktopRailLinkClass(servicesRouteActive || servicesMenuOpen)} inline-flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0`}
              style={{ color: servicesRouteActive || servicesMenuOpen ? TEAL : NAVY }}
              aria-expanded={servicesMenuOpen}
              aria-haspopup="menu"
              aria-controls="desktop-services-menu"
              data-no-ripple
              onMouseEnter={(e) => movePillTo(e.currentTarget, true)}
              onFocus={(e) => {
                movePillTo(e.currentTarget, true);
                openServicesMenuHover();
              }}
              onClick={() => setServicesMenuOpen((v) => !v)}
            >
              Services
              <FiChevronDown
                className={`size-[0.92em] shrink-0 transition-transform duration-200 ${servicesMenuOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {servicesMenuOpen ? (
              <div
                className="absolute left-1/2 top-full z-[200] min-w-[13.75rem] -translate-x-1/2 pt-2"
                onMouseEnter={openServicesMenuHover}
                onMouseLeave={scheduleCloseServicesMenu}
              >
                <div
                  id="desktop-services-menu"
                  role="menu"
                  aria-orientation="vertical"
                  className="rounded-[14px] border border-[rgb(18_52_77/0.08)] bg-white py-1.5 shadow-[var(--luxury-shadow)]"
                >
                  {SERVICE_LINKS.map(({ label, href, pathnameMatch }) => {
                    const active = routeActive(pathname, pathnameMatch);
                    return (
                      <Link
                        key={label}
                        href={href}
                        role="menuitem"
                        className={`${navFont} block rounded-lg px-4 py-2.5 text-left text-[13px] font-semibold transition-colors xl:text-[14px] ${
                          active ? "bg-[rgb(15_109_109/0.08)]" : "hover:bg-[rgb(15_109_109/0.05)]"
                        }`}
                        style={{ color: active ? TEAL : NAVY }}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setServicesMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>

          {OTHER_NAV_LINKS.map(({ label, href, pathnameMatch }, i) => {
            const idx = 2 + i;
            const active = routeActive(pathname, pathnameMatch);
            return (
              <Link
                key={label}
                href={href}
                ref={(el) => {
                  linkRefs.current[idx] = el;
                }}
                className={desktopRailLinkClass(active)}
                style={{ color: active ? TEAL : NAVY }}
                aria-current={active ? "page" : undefined}
                onMouseEnter={(e) => movePillTo(e.currentTarget, true)}
                onFocus={(e) => movePillTo(e.currentTarget, true)}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="relative z-[2] flex min-h-9 shrink-0 items-center justify-end gap-1.5 lg:col-start-3 lg:row-start-1 lg:justify-self-end">
          <button
            type="button"
            className="inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 dark:border-slate-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 lg:hidden mi-hover"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <FiX className="mi-svg size-6" aria-hidden /> : <FiMenu className="mi-svg size-6" aria-hidden />}
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer from the right */}
      {mounted
        ? createPortal(
            <AnimatePresence initial={false}>
              {mobileOpen ? (
                <div key="mob-nav-shell" className="lg:hidden" role="presentation">
                  <motion.button
                    type="button"
                    key="shade"
                    className={`fixed inset-x-0 bottom-0 z-[500] bg-black/46 ${belowNavTop}`}
                    aria-label="Close menu"
                    data-static-button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0.08 : 0.28, ease: "easeOut" }}
                    onClick={() => setMobileOpen(false)}
                  />
                  <motion.aside
                    id="mobile-nav-panel"
                    key="drawer"
                    className={`fixed bottom-0 right-0 z-[515] flex w-[min(22rem,calc(100vw-3rem))] max-w-[92vw] flex-col overflow-hidden rounded-tl-3xl border border-neutral-200/90 bg-[#fafafa] shadow-[0_18px_50px_-20px_rgba(0,0,0,0.28)] dark:border-slate-600 dark:bg-[#0f172a] ${belowNavTop}`}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Site navigation"
                    initial={{ x: "105%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "105%" }}
                    transition={{
                      type: reducedMotion ? "tween" : "spring",
                      stiffness: reducedMotion ? undefined : 360,
                      damping: reducedMotion ? undefined : 32,
                      duration: reducedMotion ? 0.2 : undefined,
                      ease: reducedMotion ? "easeOut" : undefined,
                    }}
                  >
                    <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-4 py-3 pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
                      <Link
                        href="/about"
                        onClick={() => setMobileOpen(false)}
                        className={[
                          `${navFont} ${navMobileSize} flex items-center justify-between rounded-xl px-3 py-3.5 no-underline active:bg-neutral-200/50`,
                          routeActive(pathname, "/about")
                            ? "bg-white shadow-sm ring-1 ring-black/[0.06] dark:bg-[#1e293b] dark:ring-slate-600"
                            : "text-neutral-800 hover:bg-white/90 dark:text-slate-100 dark:hover:bg-slate-800/80",
                        ].join(" ")}
                        style={routeActive(pathname, "/about") ? { color: TEAL } : undefined}
                        aria-current={routeActive(pathname, "/about") ? "page" : undefined}
                      >
                        About
                        <FiChevronDown className="size-4 rotate-[-90deg] opacity-50" aria-hidden />
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        className={`${navFont} ${navMobileSize} flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-neutral-800 no-underline active:bg-neutral-200/50 hover:bg-white/90 dark:text-slate-100 dark:active:bg-slate-700/50 dark:hover:bg-slate-800/80 ${
                          servicesRouteActive ? "bg-white shadow-sm ring-1 ring-black/[0.06] dark:bg-[#1e293b] dark:ring-slate-600" : ""
                        }`}
                        style={servicesRouteActive ? { color: TEAL } : undefined}
                        onClick={() => setMobileServicesOpen((o) => !o)}
                      >
                        Services
                        <FiChevronDown className={`size-4 opacity-55 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden />
                      </button>
                      <div className={`ml-4 flex flex-col gap-1 border-l border-neutral-200/90 pl-3 dark:border-slate-600 ${mobileServicesOpen ? "pb-1" : "hidden"}`}>
                        {SERVICE_LINKS.map(({ label, href, pathnameMatch }) => {
                          const active = routeActive(pathname, pathnameMatch);
                          return (
                            <Link
                              key={label}
                              href={href}
                              onClick={() => {
                                setMobileOpen(false);
                              }}
                              className={[
                                `${navFont} ${navMobileSize} block rounded-lg px-3 py-2.5 no-underline active:bg-neutral-200/50`,
                                active ? "bg-white font-semibold shadow-sm ring-1 ring-black/[0.05] dark:bg-[#334155] dark:ring-slate-500" : "text-neutral-800 hover:bg-white/85 dark:text-slate-100 dark:hover:bg-slate-700/50",
                              ].join(" ")}
                              style={{ color: active ? TEAL : NAVY }}
                              aria-current={active ? "page" : undefined}
                            >
                              {label}
                            </Link>
                          );
                        })}
                      </div>
                      {OTHER_NAV_LINKS.map(({ label, href, pathnameMatch }) => {
                        const active = routeActive(pathname, pathnameMatch);
                        return (
                          <Link
                            key={label}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={[
                              `${navFont} ${navMobileSize} block rounded-xl px-3 py-3.5 no-underline active:bg-neutral-200/50`,
                              active ? "bg-white shadow-sm ring-1 ring-black/[0.06] dark:bg-[#1e293b] dark:ring-slate-600" : "text-neutral-800 hover:bg-white/90 dark:text-slate-100 dark:hover:bg-slate-800/80",
                            ].join(" ")}
                            style={{ color: active ? TEAL : NAVY }}
                            aria-current={active ? "page" : undefined}
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </nav>
                  </motion.aside>
                </div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </header>
  );
}
