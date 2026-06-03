"use client";

import {
  Bell,
  Search,
  Menu,
} from "lucide-react";

interface AdminHeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function AdminHeader({
  title = "Dashboard",
  onMenuClick,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex min-h-[72px] items-center justify-between px-4 md:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">

          {/* Mobile Sidebar Button */}
          <button
            onClick={onMenuClick}
            className="rounded-xl border p-2 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">
              {title}
            </h1>

            <p className="hidden text-sm text-gray-500 sm:block">
              Welcome back, Admin
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Search */}
          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-56 lg:w-72 rounded-2xl border border-gray-300 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="rounded-xl border p-2 md:hidden">
            <Search size={20} />
          </button>

          {/* Notifications */}
          <button className="relative rounded-xl border border-gray-200 bg-white p-2.5 transition hover:bg-gray-100">
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-2 py-2 md:px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              A
            </div>

            <div className="hidden lg:block">
              <h4 className="text-sm font-semibold text-gray-900">
                Admin
              </h4>

              <p className="text-xs text-gray-500">
                Administrator
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}