"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  User as UserIcon,
  Package,
  LogOut,
  ChevronDown,
  UserCircle,
} from "lucide-react";

import { brand } from "@/lib/brand";
import { useAuth } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";

/** Desktop account control: shows Login/Register when logged out,
 *  and an avatar dropdown (Profile, Orders, Logout) when logged in. */
export default function AccountMenu() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const doLogout = async () => {
    await logout();
    toast.success("Logged out");
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (loading) return null;

  if (!user) {
    return (
      <div className="hidden items-center gap-2 lg:flex">
        <Link
          href="/login"
          className="rounded-full px-4 py-2 text-[14px] font-semibold transition-colors"
          style={{ color: brand.primary }}
        >
          Login
        </Link>
        <Link
          href="/register"
          className="rounded-full px-4 py-2 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: brand.primary }}
        >
          Register
        </Link>
      </div>
    );
  }

  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="relative hidden lg:block" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-2.5 shadow-sm transition-colors hover:bg-neutral-50"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span
          className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: brand.primary }}
        >
          {user.profilePhoto ? (
            <Image
              src={user.profilePhoto}
              alt={user.name}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            initial
          )}
        </span>
        <span className="max-w-[110px] truncate text-[14px] font-semibold text-[#12344D]">
          {user.name?.split(" ")[0] || "Account"}
        </span>
        <ChevronDown
          size={15}
          className={`text-[#9aa6ad] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border bg-white shadow-2xl"
          style={{ borderColor: brand.border }}
          role="menu"
        >
          <div className="border-b px-4 py-3" style={{ borderColor: brand.border }}>
            <p className="truncate font-semibold" style={{ color: brand.navy }}>
              {user.name}
            </p>
            <p className="truncate text-sm" style={{ color: brand.textMuted }}>
              {user.email}
            </p>
          </div>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#12344D] hover:bg-[#F0F7F7]"
            role="menuitem"
          >
            <UserCircle size={18} style={{ color: brand.primary }} />
            My Profile
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#12344D] hover:bg-[#F0F7F7]"
            role="menuitem"
          >
            <Package size={18} style={{ color: brand.primary }} />
            My Orders
          </Link>
          <button
            type="button"
            onClick={doLogout}
            className="flex w-full items-center gap-3 border-t px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
            style={{ borderColor: brand.border }}
            role="menuitem"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

/** Mobile account links rendered at the bottom of the mobile drawer. */
export function MobileAccountLinks({ onNavigate }: { onNavigate: () => void }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  if (loading) return null;

  const linkCls =
    "flex items-center gap-3 rounded-xl px-3 py-3.5 text-[17px] font-semibold leading-7 text-neutral-800 no-underline hover:bg-white/90";

  const doLogout = async () => {
    await logout();
    toast.success("Logged out");
    onNavigate();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mt-2 border-t pt-2" style={{ borderColor: brand.border }}>
      {!user ? (
        <>
          <Link href="/login" onClick={onNavigate} className={linkCls}>
            <UserIcon size={20} style={{ color: brand.primary }} />
            Login
          </Link>
          <Link href="/register" onClick={onNavigate} className={linkCls}>
            <UserCircle size={20} style={{ color: brand.primary }} />
            Register
          </Link>
        </>
      ) : (
        <>
          <Link href="/profile" onClick={onNavigate} className={linkCls}>
            <UserCircle size={20} style={{ color: brand.primary }} />
            My Profile
          </Link>
          <Link href="/orders" onClick={onNavigate} className={linkCls}>
            <Package size={20} style={{ color: brand.primary }} />
            My Orders
          </Link>
          <button
            type="button"
            onClick={doLogout}
            className={`${linkCls} w-full text-left !text-red-600`}
          >
            <LogOut size={20} />
            Logout
          </button>
        </>
      )}
    </div>
  );
}
