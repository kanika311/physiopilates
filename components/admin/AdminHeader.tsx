"use client";

import { Search, Menu, ChevronDown, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface AdminHeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function AdminHeader({
  title = "Dashboard",
  onMenuClick,
}: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [email, setEmail] = useState("");
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/admin/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.email) setEmail(data.email);
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
          <div className="relative hidden md:block">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--admin-text-muted)" }}
            />

            <input
              type="text"
              placeholder="Search..."
              className="admin-focus-ring h-11 w-56 rounded-[12px] border pl-10 pr-4 text-sm outline-none transition-all duration-200 lg:w-72"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
                color: "var(--page-fg)",
              }}
            />
          </div>

          {/* Mobile Search */}
          <button
            className="admin-focus-ring rounded-[12px] border p-2.5 transition-all duration-200 hover:shadow-sm md:hidden"
            style={{
              borderColor: "var(--admin-border)",
              backgroundColor: "var(--admin-surface)",
            }}
          >
            <Search size={18} style={{ color: "var(--admin-text-muted)" }} />
          </button>

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
                A
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
                    Admin User
                  </h4>

                  <p
                    className="text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {email || "admin@example.com"}
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