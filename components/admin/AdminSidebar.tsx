"use client";

import Link from "next/link";
import NextImage from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
   Briefcase, 
  Settings,
  Shield,
  ShieldCheck,
  GraduationCap,
  Quote,
  FileSignature,
  ImageIcon,
  PanelBottom,
  Users,
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
    title: "Services",
    icon: FolderKanban,
    href: "/admin/services",
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
    href: "/admin/blogs",
  },
  {
    title: "Testimonials",
    icon: Quote,
    href: "/admin/testimonials",
  },
  {
    title: "Team",
    icon: Users,
    href: "/admin/team",
  },
  {
    title: "Contact",
    icon: Image,
    href: "/admin/contact",
  },

  
  
  {
  title: "Header Settings",
  icon: Settings,
  href: "/admin/header-settings",
},
  {
    title: "Page Banners",
    icon: ImageIcon,
    href: "/admin/pages",
  },
  {
    title: "Footer Settings",
    icon: PanelBottom,
    href: "/admin/footer-settings",
  },
  {
    title: "Students",
    icon: GraduationCap,
    href: "/admin/staff",
  },
  {
    title: "Quote Requests",
    icon: FileSignature,
    href: "/admin/quotes",
  },
  {
    title: "Admins",
    icon: ShieldCheck,
    href: "/admin/admins",
  },

];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/me", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && json?.success && json.data?.email) {
          setEmail(json.data.email);
        }
      } catch {
        /* ignore */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore */
    }
    router.replace("/admin/login");
    router.refresh();
  };

  const avatarLetter = email ? email.charAt(0).toUpperCase() : "A";

  return (
    <>
      {/* Mobile Header */}
      <div
        className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b px-4 text-white shadow-lg lg:hidden"
        style={{
          backgroundColor: "var(--admin-sidebar)",
          borderColor: "rgb(255 255 255 / 0.15)",
          boxShadow: "0 4px 24px rgb(15 118 110 / 0.25)",
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
          <div className="flex ">
            <NextImage src="/logo.png" alt="logo" width={32} height={32} />
          <h2 className="text-md font-bold tracking-tight text-tale">
            Admin
          </h2>
          </div>
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
            "linear-gradient(180deg, var(--admin-sidebar) 0%, var(--admin-sidebar-elevated) 100%)",
          boxShadow: "4px 0 32px rgb(15 118 110 / 0.18)",
        }}
      >
        {/* Subtle brand glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-48 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% -10%, rgb(255 255 255 / 0.18), transparent)",
          }}
        />

        {/* Logo */}
        <div
          className="relative border-b p-4"
          style={{ borderColor: "rgb(255 255 255 / 0.08)" }}
          >
          <div className="flex items-center gap-2.5">
            <div className="shrink-0 rounded-lg bg-white p-1 shadow-md">
              <NextImage
                src="/logo.png"
                alt="Physio Pilates"
                width={70}
                height={70}
                className="h-auto w-[52px] object-contain"
                priority
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold leading-none text-white">Admin</span>
              <span
                className="mt-1 text-[11px] font-medium"
                style={{ color: "rgb(255 255 255 / 0.45)" }}
              >
                Management Panel
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
      <div className="relative p-4 pb-52 overflow-y-auto h-[calc(100vh-120px)]">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              const isActive = pathname === item.href;

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? ""
                        : "text-white/85 hover:bg-white/10 hover:text-white"
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: "#ffffff",
                            color: "var(--admin-accent)",
                            boxShadow:
                              "0 6px 18px rgb(0 0 0 / 0.12)",
                          }
                        : undefined
                    }
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] transition-all duration-200"
                      style={
                        isActive
                          ? {
                              backgroundColor:
                                "var(--admin-accent-soft)",
                              color: "var(--admin-accent)",
                            }
                          : {
                              backgroundColor:
                                "rgb(255 255 255 / 0.12)",
                              color: "#ffffff",
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
            borderColor: "rgb(255 255 255 / 0.15)",
            backgroundColor: "rgb(15 118 110 / 0.55)",
          }}
        >
          <div
            className="flex items-center justify-between rounded-[14px] border p-3"
            style={{
              borderColor: "rgb(255 255 255 / 0.2)",
              backgroundColor: "rgb(255 255 255 / 0.12)",
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--admin-accent)",
                }}
              >
                {avatarLetter}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-semibold text-white">
                  Admin
                </h4>
                <p
                  className="truncate text-xs"
                  style={{ color: "rgb(255 255 255 / 0.45)" }}
                  title={email}
                >
                  {email || "Loading..."}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label="Log out"
              title="Log out"
              className="admin-focus-ring rounded-[10px] p-2 transition-colors duration-200 hover:bg-white/10 disabled:opacity-50"
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
