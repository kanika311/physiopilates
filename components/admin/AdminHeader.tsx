"use client";

import { Search, Menu, ChevronDown, LogOut, CornerDownLeft } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

interface AdminHeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

const SEARCH_PAGES: { label: string; href: string; keywords?: string }[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Courses", href: "/admin/courses" },
  { label: "Services", href: "/admin/services" },
  { label: "Gallery", href: "/admin/gallery", keywords: "images photos" },
  { label: "Carousel", href: "/admin/carousel", keywords: "slider banner" },
  { label: "Blog", href: "/admin/blogs", keywords: "posts articles" },
  { label: "Testimonials", href: "/admin/testimonials", keywords: "reviews" },
  { label: "Team", href: "/admin/team", keywords: "staff members" },
  { label: "Contact", href: "/admin/contact", keywords: "messages leads" },
  { label: "Contact Info", href: "/admin/contact-info", keywords: "address phone email hours" },
  { label: "Header Settings", href: "/admin/header-settings", keywords: "nav menu" },
  { label: "Page Banners", href: "/admin/pages", keywords: "banner hero" },
  { label: "Footer Settings", href: "/admin/footer-settings" },
  { label: "Students", href: "/admin/staff" },
  { label: "Quote Requests", href: "/admin/quotes", keywords: "leads enquiry" },
  { label: "Admins", href: "/admin/admins", keywords: "users accounts" },
];

export default function AdminHeader({
  title = "Dashboard",
  onMenuClick,
}: AdminHeaderProps) {
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_PAGES;
    return SEARCH_PAGES.filter((p) =>
      `${p.label} ${p.keywords ?? ""}`.toLowerCase().includes(q)
    );
  }, [query]);

  const goTo = (href: string) => {
    setSearchOpen(false);
    setQuery("");
    router.push(href);
  };

  useEffect(() => {
    fetch("/api/admin/me", { cache: "no-store", credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        const found = json?.data?.email ?? json?.email;
        if (found) setEmail(found);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

const handleLogout = async () => {
  try {
    const response = await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      sessionStorage.clear();

      window.location.href = "/admin/login";
    }
  } catch (error) {
    console.error("Logout Error:", error);
  }
}

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150"
      style={{
        backgroundColor: "rgb(255 255 255 / 0.82)",
        borderColor: "var(--admin-border)",
        boxShadow: "0 1px 0 rgb(15 118 110 / 0.06)",
      }}
    >
      <div className="flex min-h-[72px] items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="admin-focus-ring rounded-[12px] border p-2 transition-all duration-200 hover:shadow-sm lg:hidden"
            style={{
              borderColor: "var(--admin-border)",
              backgroundColor: "var(--admin-surface)",
            }}
          >
            <Menu size={22} style={{ color: "var(--page-fg)" }} />
          </button>

          {/* <div>
            <h1
              className="text-xl font-bold tracking-tight md:text-2xl"
              style={{ color: "var(--page-fg)" }}
            >
              {title}
            </h1>

            <p
              className="hidden text-sm sm:block"
              style={{ color: "var(--admin-text-muted)" }}
            >
              Welcome back, Admin
            </p>
          </div> */}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Search */}
          <div className="relative hidden md:block" ref={searchRef}>
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--admin-text-muted)" }}
            />

            <input
              type="text"
              placeholder="Search pages..."
              value={query}
              onFocus={() => setSearchOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
                setSearchOpen(true);
                setActiveIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSearchOpen(true);
                  setActiveIndex((i) => Math.min(i + 1, results.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const target = results[activeIndex];
                  if (target) goTo(target.href);
                } else if (e.key === "Escape") {
                  setSearchOpen(false);
                }
              }}
              className="admin-focus-ring h-11 w-56 rounded-[12px] border pl-10 pr-4 text-sm outline-none transition-all duration-200 lg:w-72"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
                color: "var(--page-fg)",
              }}
            />

            {searchOpen && (
              <div
                className="admin-scrollbar absolute right-0 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border p-1.5 shadow-2xl"
                style={{
                  backgroundColor: "var(--admin-surface)",
                  borderColor: "var(--admin-border)",
                }}
              >
                {results.length === 0 ? (
                  <p
                    className="px-3 py-3 text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    No matching pages.
                  </p>
                ) : (
                  results.map((p, i) => (
                    <button
                      key={p.href}
                      type="button"
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => goTo(p.href)}
                      className="flex w-full items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm transition-colors"
                      style={{
                        backgroundColor:
                          i === activeIndex
                            ? "var(--admin-accent-soft)"
                            : "transparent",
                        color:
                          i === activeIndex
                            ? "var(--admin-accent)"
                            : "var(--page-fg)",
                      }}
                    >
                      <span className="font-medium">{p.label}</span>
                      {i === activeIndex && (
                        <CornerDownLeft
                          size={14}
                          style={{ color: "var(--admin-accent)" }}
                        />
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-[12px] border px-2 py-1.5 transition-all duration-200 hover:shadow-sm md:px-3 md:py-2"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-surface)",
                boxShadow: "var(--admin-shadow-sm)",
              }}
            >
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-muted) 100%)",
                }}
              >
                {email ? email.charAt(0).toUpperCase() : "A"}
              </div>

              <div className="hidden lg:block text-left">
                <h4
                  className="text-sm font-semibold"
                  style={{ color: "var(--page-fg)" }}
                >
                  Admin
                </h4>

                <p
                  className="text-xs"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  Administrator
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  profileOpen ? "rotate-180" : ""
                }`}
                style={{ color: "var(--admin-text-muted)" }}
              />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border shadow-2xl"
                style={{
                  backgroundColor: "var(--admin-surface)",
                  borderColor: "var(--admin-border)",
                }}
              >
                {/* User Info */}
                <div className="border-b px-4 py-4">
                  <h4
                    className="font-semibold"
                    style={{ color: "var(--page-fg)" }}
                  >
                    Admin
                  </h4>

                  <p
                    className="truncate text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                    title={email}
                  >
                    {email || "Loading..."}
                  </p>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}