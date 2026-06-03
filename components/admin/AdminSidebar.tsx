"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Image,
  Bell,
  LogOut,
  Images,
  FolderKanban,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Services",
    icon: FolderKanban,
    href: "/admin/services",
  },
  {
    title: "Courses",
    icon: FolderKanban,
    href: "/admin/courses",
  },
  {
    title: "Gallery",
    icon: Images,
    href: "/admin/gallery",
  },

  {
  title: "Carousel",
  icon: Images,
  href: "/admin/carousel",
},

  {
    title: "Blog",
    icon: FileText,
    href: "/admin/blogs/create",
  },
  {
    title: "Banner",
    icon: Images,
    href: "/admin/banner",
  },
  {
    title: "Create Gallery",
    icon: Images,
    href: "/admin/gallery/create",
  },
  {
    title: "Contact",
    icon: Image,
    href: "/admin/contact",
  },
  {
    title: "Messages",
    icon: MessageSquare,
    href: "/admin/messages",
  },
  {
    title: "Create Message",
    icon: MessageSquare,
    href: "/admin/messages/create",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/admin/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] =
    useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-black px-4 text-white lg:hidden">
        <h2 className="text-xl font-bold">
          Admin CMS
        </h2>

        <button
          onClick={() =>
            setIsOpen(!isOpen)
          }
        >
          {isOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() =>
            setIsOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50
        h-screen w-72
        overflow-y-auto
        bg-black text-white
        transition-transform duration-300

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
      `}
      >
        {/* Logo */}
        <div className="border-b border-white/10 p-6">
          <h1 className="text-3xl font-bold">
            Admin CMS
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            Management Panel
          </p>
        </div>

        {/* Menu */}
        <div className="p-4 pb-32">
          <ul className="space-y-2">
            {menuItems.map(
              (item, index) => {
                const Icon = item.icon;

                const isActive =
                  pathname === item.href;

                return (
                  <li key={index}>
                    <Link
                      href={item.href}
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className={`flex items-center gap-4 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-white text-black"
                          : "text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={20} />

                      {item.title}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-white/10 bg-black p-4">
          <div className="flex items-center justify-between rounded-2xl bg-white/5 p-3">
            <div>
              <h4 className="text-sm font-semibold">
                Admin
              </h4>

              <p className="text-xs text-gray-400">
                admin@gmail.com
              </p>
            </div>

            <button className="rounded-xl p-2 transition hover:bg-white/10">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}