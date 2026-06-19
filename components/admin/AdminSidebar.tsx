"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  LayoutDashboard,
  FileText,
  Image,
  LogOut,
  Images,
  FolderKanban,
  MessageSquare,
  Menu,
  X,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
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
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div
        className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 text-white shadow-lg lg:hidden"
        style={{
          backgroundColor: "var(--admin-sidebar)",
          borderColor: "rgb(107 143 113 / 0.15)",
          boxShadow: "0 4px 24px rgb(0 0 0 / 0.2)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--admin-accent)",
              color: "#fff",
            }}
          >
            <Shield size={18} />
          </div>
          <h2 className="text-lg font-bold tracking-tight">
            Admin CMS
          </h2>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="admin-focus-ring rounded-xl p-2 transition-colors duration-200 hover:bg-white/10"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        admin-scrollbar
        fixed top-0 left-0 z-50
        h-screen w-72
        overflow-y-auto
        text-white
        transition-transform duration-300 ease-out

        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0
      `}
        style={{
          background:
            "linear-gradient(180deg, var(--admin-sidebar) 0%, var(--admin-sidebar-elevated) 55%, rgb(23 23 23) 100%)",
          boxShadow: "4px 0 32px rgb(0 0 0 / 0.15)",
        }}
      >
        {/* Subtle brand glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(107 143 113 / 0.35), transparent)",
          }}
        />

        {/* Logo */}
        <div
          className="relative border-b p-6"
          style={{ borderColor: "rgb(255 255 255 / 0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-[14px] shadow-lg"
              style={{
                backgroundColor: "var(--admin-accent)",
                boxShadow: "0 8px 24px rgb(107 143 113 / 0.35)",
              }}
            >
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Admin CMS
              </h1>
              <p
                className="text-xs font-medium"
                style={{ color: "rgb(255 255 255 / 0.45)" }}
              >
                Management Panel
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="relative p-4 pb-32">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? ""
                        : "hover:bg-white/[0.06] hover:text-white/90"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor:
                              "var(--admin-accent)",
                            color: "#ffffff",
                            boxShadow:
                              "0 4px 16px rgb(107 143 113 / 0.35)",
                          }
                        : {
                            color: "rgb(255 255 255 / 0.55)",
                          }
                    }
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-all duration-200"
                      style={
                        isActive
                          ? {
                              backgroundColor:
                                "rgb(255 255 255 / 0.2)",
                              color: "#ffffff",
                            }
                          : {
                              backgroundColor:
                                "rgb(255 255 255 / 0.05)",
                              color: "rgb(255 255 255 / 0.5)",
                            }
                      }
                    >
                      <Icon size={17} />
                    </span>
                    <span className="truncate">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-0 w-full border-t p-4 backdrop-blur-md"
          style={{
            borderColor: "rgb(255 255 255 / 0.08)",
            backgroundColor: "rgb(23 23 23 / 0.85)",
          }}
        >
          <div
            className="flex items-center justify-between rounded-[14px] border p-3"
            style={{
              borderColor: "rgb(107 143 113 / 0.2)",
              backgroundColor: "rgb(107 143 113 / 0.08)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-muted) 100%)",
                }}
              >
                A
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Admin
                </h4>
                <p
                  className="text-xs"
                  style={{ color: "rgb(255 255 255 / 0.45)" }}
                >
                  admin@gmail.com
                </p>
              </div>
            </div>

            <button
              className="admin-focus-ring rounded-[10px] p-2 transition-colors duration-200 hover:bg-white/10"
              style={{ color: "rgb(255 255 255 / 0.5)" }}
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
