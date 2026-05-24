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

const GOLD = brand.gold;

type NavLink = {
  label: string;
  href: string;
  pathnameMatch?: string;
};

const ABOUT_LINK: NavLink = { label: "About", href: "/about", pathnameMatch: "/about" };

/** Services flyout targets (shown under desktop “Services” + mobile submenu) */
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

/** Full-bleed hero under fixed nav → transparent bar at scroll 0 until scrolled */
const TRANSPARENT_NAV_ROUTE_PREFIXES = [
  "/about",
  "/physiotherapy",
  "/pilates",
  "/yoga",
  "/therapy",
  "/courses",
  "/gallery",
  "/contact",
  "/blogs",
] as const;

function normalizedPathname(pathname: string | null): string {
  if (pathname == null || pathname === "" || pathname === "/") return "/";
  const trimmed = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  return trimmed === "" ? "/" : trimmed;
}

function pathAllowsTransparentNavHero(pathname: string | null): boolean {
  const p = normalizedPathname(pathname);
  if (p === "/") return true;
  return TRANSPARENT_NAV_ROUTE_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`));
}

function navScrollSolid(y: number, innerH: number, prevSolid: boolean) {
  const vh = Math.max(innerH, 520);
  const on = vh * 0.21;
  const off = vh * 0.15;
  return prevSolid ? y > off : y > on;
}

/**
 * Hero-route entry: hysteresis can carry `solidNav` across navigations (`prevSolid` from the prior page).
 * Recompute baseline without hysteresis when landing on any transparent-hero route so scroll 0 = transparent bar again.
 */
function navScrollSolidHeroRouteBaseline(y: number, innerH: number) {
  return navScrollSolid(y, innerH, false);
}

function routeActive(pathname: string, pathnameMatch?: string) {
  if (!pathnameMatch) return false;
  return pathname === pathnameMatch || pathname.startsWith(`${pathnameMatch}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [solidNav, setSolidNav] = useState(false);
  const [compactNav, setCompactNav] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const svcMenuCloseTimerRef = useRef<number | undefined>(undefined);

  /** Hover / focus sliding pill underline for desktop rail */
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

  const heroTransparentEligible = pathAllowsTransparentNavHero(pathname);
  /** Transparent over full-bleed heroes at scroll 0; otherwise always use readable chrome */
  const showGlassChrome = mobileOpen || !heroTransparentEligible || solidNav;
  const reducedMotion = usePrefersReducedMotion() === true;

  const servicesRouteActive = SERVICE_LINKS.some((s) => routeActive(pathname, s.pathnameMatch));
  const transparentOverHeroRail = heroTransparentEligible && !solidNav && !mobileOpen;

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
    if (typeof window === "undefined") return;
    if (!pathAllowsTransparentNavHero(pathname)) return;
    const y = window.scrollY;
    const h = window.innerHeight;
    setSolidNav(navScrollSolidHeroRouteBaseline(y, h));
    setCompactNav(y > 36);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setSolidNav((prev) => navScrollSolid(window.scrollY, window.innerHeight, prev));
      setCompactNav(window.scrollY > 36);
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
    setServicesMenuOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    syncPillActive();
  }, [pathname, mobileOpen, solidNav, syncPillActive]);

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

  const navFont =
    "font-[family-name:var(--font-montserrat),ui-sans-serif,system-ui,sans-serif] not-italic font-semibold  tracking-[0.06em]";
  const navMobileSize = "text-[15px] leading-6";
  const navDesktopSize =
    "whitespace-nowrap text-[16px] leading-[1.15rem] xl:text-[15px] xl:leading-[1.4rem] 2xl:text-base 2xl:leading-6";
  const desktopLinkBase = `${navFont} ${navDesktopSize} rounded-md px-2  no-underline transition-colors duration-200 xl:px-2.5 xl:py-[0.625rem] relative z-[1]`;

  const headerPad =
    compactNav || mobileOpen
      ? "pb-3 pt-3 sm:pb-3.5 sm:pt-3.5"
      : "pb-[1.5rem] pt-[1.65rem] sm:pb-[1.75rem] sm:pt-[1.85rem]";
  const backdrop =
    showGlassChrome &&
    `border-black/[0.06] shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12)] backdrop-blur-[12px] supports-[backdrop-filter]:bg-[#f8f8f8]/84 bg-[#f8f8f8]/93`;
  const transparentStrip = [
    showGlassChrome ? "" : "border-transparent bg-transparent shadow-none backdrop-blur-none",
    !showGlassChrome
      ? compactNav
        ? "py-5 sm:py-[1.375rem]"
        : "pb-7 pt-[1.85rem] sm:pb-8 sm:pt-[2rem]"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    window.addEventListener("resize", syncPillActive, { passive: true });
    return () => window.removeEventListener("resize", syncPillActive);
  }, [syncPillActive]);

  useEffect(() => {
    return () => clearSvcMenuCloseTimer();
  }, [clearSvcMenuCloseTimer]);

  useEffect(() => {
    if (!servicesMenuOpen) return undefined;
    function close() {
      setServicesMenuOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onEsc);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("scroll", close);
    };
  }, [servicesMenuOpen]);

  function desktopRailLinkClass(active: boolean) {
    const inactiveOnLightHeader = !active && !transparentOverHeroRail;
    const inactiveOverHero = !active && transparentOverHeroRail;
    return [
      desktopLinkBase,
      inactiveOnLightHeader && "text-[black] hover:text-neutral-900",
      inactiveOverHero && "text-white/95 drop-shadow-[0_1px_5px_rgba(0,0,0,0.4)] hover:text-white",
      active && "text-[black]",
    ]
      .filter(Boolean)
      .join(" ");
  }

  // const headerShellMin =
  //   compactNav || mobileOpen
  //     ? "min-h-[5.5rem] sm:min-h-[5.625rem]"
  //     : "min-h-[8rem] sm:min-h-[8.25rem] lg:min-h-[8.5rem]";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 border-b px-4 sm:px-6 lg:px-8 transition-[background-color,border-color,backdrop-filter,box-shadow,padding,z-index,min-height] duration-500 ease-out",
        // headerShellMin,
        mobileOpen ? "z-[520]" : "z-[100]",
        showGlassChrome ? [backdrop, headerPad].filter(Boolean).join(" ") : transparentStrip.trim(),
      ].join(" ")}
    >
        <div className="relative mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center lg:justify-items-stretch xl:gap-10">
          <Link
            href="/"
            className="relative z-[2] flex min-w-0 shrink-0 items-center  no-underline mi-hover lg:justify-self-start"
            aria-label="Physio Pilates home"
            onClick={() => setMobileOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Physio Pilates"
              width={122}
              height={49}
              className={[
                " w-auto max-w-[min(240px,calc(100vw-8.5rem))] object-contain object-left transition-[filter] duration-500 ease-out",
                compactNav || mobileOpen
                  ? "min-h-[58px] min-w-[136px] w-full sm:min-h-[60px]"
                  : "min-h-[58px] sm:min-h-[65px] lg:max-w-[196px]",
                showGlassChrome ? "" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]",
              ].join(" ")}
              priority
            />
          </Link>

          <nav
            ref={railRef}
            className="relative z-[1] hidden shrink-0 lg:col-start-2 lg:row-start-1 lg:flex lg:flex-nowrap lg:items-center lg:justify-self-center lg:gap-x-3 lg:gap-y-0 lg:py-1.5 lg:pb-2 xl:gap-x-4 2xl:gap-x-6"
            aria-label="Main"
            onMouseLeave={() => {
              syncPillActive();
            }}
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute bottom-[2px] z-0 h-[3px] rounded-full bg-[transparent]"
              style={{ backgroundColor: GOLD }}
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
              style={routeActive(pathname, ABOUT_LINK.pathnameMatch) ? { color: GOLD } : undefined}
              aria-current={routeActive(pathname, ABOUT_LINK.pathnameMatch) ? "page" : undefined}
              onMouseEnter={(e) => movePillTo(e.currentTarget, true)}
              onFocus={(e) => movePillTo(e.currentTarget, true)}
            >
              {ABOUT_LINK.label}
            </Link>

            <div
              className="relative flex items-center py-1"
              onMouseEnter={openServicesMenuHover}
              onMouseLeave={scheduleCloseServicesMenu}
            >
              <button
                type="button"
                ref={(el) => {
                  linkRefs.current[1] = el;
                }}
                className={`${desktopRailLinkClass(servicesRouteActive || servicesMenuOpen)} inline-flex cursor-pointer items-center gap-0.5 border-0 bg-transparent p-0`}
                style={servicesRouteActive ? { color: GOLD } : undefined}
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
                  id="desktop-services-menu"
                  role="menu"
                  aria-orientation="vertical"
                  className="absolute left-1/2 top-full z-[60] mt-2 w-max min-w-[13.75rem] -translate-x-1/2 rounded-xl border border-black/[0.08] bg-white py-1.5 shadow-[0_20px_52px_-24px_rgba(0,0,0,0.32)]"
                  onMouseEnter={openServicesMenuHover}
                >
                  {SERVICE_LINKS.map(({ label, href, pathnameMatch }) => {
                    const active = routeActive(pathname, pathnameMatch);
                    return (
                      <Link
                        key={label}
                        href={href}
                        role="menuitem"
                        className={`${navFont} block rounded-lg px-4 py-2.5 text-left text-[13px] font-semibold transition-colors xl:text-[14px] ${
                          active ? "bg-[rgba(192,158,107,0.12)]" : "text-neutral-800 hover:bg-neutral-100"
                        }`}
                        style={active ? { color: GOLD } : undefined}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setServicesMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    );
                  })}
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
                  style={active ? { color: GOLD } : undefined}
                  aria-current={active ? "page" : undefined}
                  onMouseEnter={(e) => movePillTo(e.currentTarget, true)}
                  onFocus={(e) => movePillTo(e.currentTarget, true)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-[2] flex min-h-11 shrink-0 items-center justify-end lg:col-start-3 lg:row-start-1 lg:min-h-0 lg:justify-self-end">
            <button
              type="button"
              className={[
                "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border transition-colors lg:hidden mi-hover",
                showGlassChrome
                  ? "border-neutral-200/90 bg-white text-neutral-800 shadow-sm hover:bg-neutral-50"
                  : "border-white/45 bg-black/25 text-white backdrop-blur-sm hover:bg-black/35",
              ].join(" ")}
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
                    className="fixed inset-x-0 bottom-0 top-[calc(8rem+env(safe-area-inset-top,0px))] z-[500] bg-black/46 sm:top-[calc(8.5rem+env(safe-area-inset-top,0px))]"
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
                    className="fixed bottom-0 right-0 top-[calc(8rem+env(safe-area-inset-top,0px))] z-[515] flex w-[min(22rem,calc(100vw-3rem))] max-w-[92vw] flex-col overflow-hidden rounded-tl-3xl border-l border-t border-black/[0.08] bg-[#f8f8f8]/98 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.28)] supports-[backdrop-filter]:backdrop-blur-[18px]"
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
                            ? "bg-white shadow-sm ring-1 ring-black/[0.06]"
                            : "text-neutral-800 hover:bg-white/80",
                        ].join(" ")}
                        style={routeActive(pathname, "/about") ? { color: GOLD } : undefined}
                        aria-current={routeActive(pathname, "/about") ? "page" : undefined}
                      >
                        About
                        <FiChevronDown className="size-4 rotate-[-90deg] opacity-50" aria-hidden />
                      </Link>
                      <button
                        type="button"
                        aria-expanded={mobileServicesOpen}
                        className={`${navFont} ${navMobileSize} flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-neutral-800 no-underline active:bg-neutral-200/50 hover:bg-white/80 ${
                          servicesRouteActive ? "bg-white shadow-sm ring-1 ring-black/[0.06]" : ""
                        }`}
                        style={servicesRouteActive ? { color: GOLD } : undefined}
                        onClick={() => setMobileServicesOpen((o) => !o)}
                      >
                        Services
                        <FiChevronDown className={`size-4 opacity-55 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} aria-hidden />
                      </button>
                      <div className={`ml-4 flex flex-col gap-1 border-l border-neutral-200/90 pl-3 ${mobileServicesOpen ? "pb-1" : "hidden"}`}>
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
                                active ? "bg-white font-semibold shadow-sm ring-1 ring-black/[0.05]" : "text-neutral-800 hover:bg-white/70",
                              ].join(" ")}
                              style={active ? { color: GOLD } : undefined}
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
                              active ? "bg-white shadow-sm ring-1 ring-black/[0.06]" : "text-neutral-800 hover:bg-white/80",
                            ].join(" ")}
                            style={active ? { color: GOLD } : undefined}
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
