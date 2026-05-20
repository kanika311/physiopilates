"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
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
  { label: "Contact", href: "/#contact" },
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
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-[100] border-b px-6 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ease-out sm:px-10 lg:px-16 xl:px-24",
        solidNav
          ? "border-black/[0.06] bg-[#f8f8f8]/95 pb-3 pt-3 shadow-[0_12px_40px_-18px_rgba(0,0,0,0.12)] backdrop-blur-[10px]"
          : "border-transparent bg-transparent pb-2 pt-2 shadow-none backdrop-blur-none lg:pb-2 lg:pt-2",
      ].join(" ")}
    >
      <div className="mx-auto flex min-h-[4.75rem] max-w-[1480px] flex-col gap-5 sm:flex-row sm:min-h-0 sm:items-center sm:justify-between sm:gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center no-underline sm:translate-y-[1px]"
          aria-label="Physio Pilates home"
        >
          <Image
            src="/logo.png"
            alt="Physio Pilates"
            width={180}
            height={72}
            className={`h-[150px] w-[140px] object-contain sm:w-[164px] lg:w-[172px] ${
              solidNav ? "" : "drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
            }`}
            priority
          />
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pb-1 sm:flex-nowrap sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:pb-0 lg:gap-x-9">
          <Link
            href="/#about"
            className={[
              "flex items-center text-[11px] font-semibold uppercase tracking-[0.14em] no-underline sm:text-[11.5px]",
              solidNav ? "" : "drop-shadow-[0_1px_5px_rgba(0,0,0,0.45)]",
            ].join(" ")}
            style={{ color: GOLD }}
          >
            About
            <FiChevronDown className="ml-1 text-[13px] opacity-90 sm:text-sm" aria-hidden />
          </Link>
          {ROUTES.map(({ label, href, pathnameMatch }) => {
            const active = routeActive(pathname, pathnameMatch);

            const base =
              "whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.14em] no-underline transition-colors duration-200 sm:text-[11.5px]";

            const inactiveSolid = solidNav && !active;
            const inactiveTransparent = !solidNav && !active;

            const className = [
              base,
              inactiveSolid && "text-neutral-600 hover:text-neutral-900",
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
      </div>
    </header>
  );
}
