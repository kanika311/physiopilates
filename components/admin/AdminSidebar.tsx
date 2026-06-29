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
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_4px_14px_rgb(0_0_0_/0.12)]">
            <NextImage
              src="/logo.png"
              alt="Physio Pilates"
              width={64}
              height={64}
              className="h-auto w-[34px] object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-base font-bold tracking-tight"
              style={{
                fontFamily:
                  "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                color: "var(--admin-sidebar-text)",
              }}
            >
              Admin
            </span>
            <span
              className="text-[11px] font-medium"
              style={{ color: "rgb(255 255 255 / 0.8)" }}
            >
              Management Panel
            </span>
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
          className="relative border-b p-5"
          style={{ borderColor: "rgb(255 255 255 / 0.12)" }}
          >
          <div className="flex items-center gap-4">
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_6px_20px_rgb(0_0_0_/0.12)]">
              <NextImage
                src="/logo.png"
                alt="Physio Pilates"
                width={80}
                height={80}
                className="h-auto w-[46px] object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className="font-bold leading-tight"
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "var(--admin-sidebar-text)",
                }}
              >
                Admin
              </span>
              <span
                className="leading-tight"
                style={{
                  fontFamily:
                    "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "rgb(255 255 255 / 0.85)",
                }}
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
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center gap-4 rounded-[14px] px-4 py-3.5 ${
                      isActive ? "admin-nav-link-active" : "admin-nav-link"
                    }`}
                  >
                    <span
                      className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[12px] ${
                        isActive ? "admin-nav-icon-active" : "admin-nav-icon"
                      }`}
                    >
                      <Icon size={22} strokeWidth={2.2} />
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
            borderColor: "rgb(255 255 255 / 0.12)",
            backgroundColor: "rgb(15 118 110 / 0.45)",
          }}
        >
          <div
            className="flex items-center justify-between gap-3 border p-3"
            style={{
              borderRadius: "18px",
              borderColor: "rgb(255 255 255 / 0.18)",
              backgroundColor: "rgb(255 255 255 / 0.12)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold"
                style={{
                  backgroundColor: "#ffffff",
                  color: "var(--admin-accent)",
                }}
              >
                {avatarLetter}
              </div>
              <div className="min-w-0">
                <h4
                  className="leading-tight"
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--admin-sidebar-text)",
                  }}
                >
                  Admin
                </h4>
                <p
                  className="truncate leading-tight"
                  style={{
                    fontFamily:
                      "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
                    fontSize: "13px",
                    color: "rgb(255 255 255 / 0.8)",
                  }}
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
              className="admin-focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white transition-colors duration-200 hover:bg-white/15 disabled:opacity-50"
            >
              <LogOut size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
