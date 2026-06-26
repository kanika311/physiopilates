"use client";

import { Bell, Search, Menu } from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function AdminHeader({
  title = "Dashboard",
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150"
      style={{
        backgroundColor: "rgb(255 255 255 / 0.82)",
        borderColor: "var(--admin-border)",
        boxShadow: "0 1px 0 rgb(23 23 23 / 0.04)",
      }}
    >
      <div className="flex min-h-[72px] items-center justify-between px-4 md:px-6 lg:px-8">
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

        <div className="flex items-center gap-2 md:gap-3">
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

          <button
            className="admin-focus-ring rounded-[12px] border p-2.5 transition-all duration-200 hover:shadow-sm md:hidden"
            style={{
              borderColor: "var(--admin-border)",
              backgroundColor: "var(--admin-surface)",
            }}
          >
            <Search size={18} style={{ color: "var(--admin-text-muted)" }} />
          </button>

          <button
            className="admin-focus-ring relative rounded-[12px] border p-2.5 transition-all duration-200 hover:shadow-sm"
            style={{
              borderColor: "var(--admin-border)",
              backgroundColor: "var(--admin-surface)",
            }}
          >
            <Bell size={18} style={{ color: "var(--page-fg)" }} />
            <span
              className="absolute right-2 top-2 h-2 w-2 rounded-full ring-2 ring-white"
              style={{ backgroundColor: "var(--admin-accent)" }}
            />
          </button>

          <div
            className="flex items-center gap-2.5 rounded-[12px] border px-2 py-1.5 md:gap-3 md:px-3 md:py-2"
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

            <div className="hidden lg:block">
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
          </div>
        </div>
      </div>
    </header>
  );
}
