"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Loader2,
  User as UserIcon,
  MapPin,
  Plus,
  Trash2,
  LogOut,
  Package,
  Camera,
} from "lucide-react";

import { brand } from "@/lib/brand";
import { useAuth, type CustomerAddress } from "@/components/providers/AuthProvider";
import { useToast } from "@/components/providers/ToastProvider";

const fieldCls =
  "h-11 w-full rounded-[10px] border bg-white px-3.5 text-sm text-[#12344D] outline-none transition focus:border-[#0F6D6D] focus:ring-2 focus:ring-[#0F6D6D]/15";

const emptyAddress: CustomerAddress = {
  label: "Home",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-[18px] border bg-white p-5 sm:p-6"
      style={{ borderColor: brand.border }}
    >
      <h3
        className="mb-4 flex items-center gap-2 !text-lg font-semibold"
        style={{ color: brand.navy }}
      >
        <span style={{ color: brand.primary }}>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ProfileClient() {
  const router = useRouter();
  const { user, loading: authLoading, refresh, logout } = useAuth();
  const toast = useToast();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [savingAddr, setSavingAddr] = useState(false);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login?redirect=/profile");
      return;
    }
    setName(user.name || "");
    setPhone(user.phone || "");
    setPhoto(user.profilePhoto || "");
    setAddresses(user.addresses || []);
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin" style={{ color: brand.primary }} />
      </div>
    );
  }

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    setSavingProfile(true);
    try {
      const res = await axios.put("/api/auth/profile", {
        name,
        phone,
        profilePhoto: photo,
      });
      if (res.data.success) {
        await refresh();
        toast.success("Profile updated");
      } else toast.error(res.data.message);
    } catch {
      toast.error("Could not update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const saveAddresses = async (next: CustomerAddress[]) => {
    setSavingAddr(true);
    try {
      const res = await axios.put("/api/auth/profile", { addresses: next });
      if (res.data.success) {
        await refresh();
        setAddresses(next);
        toast.success("Addresses updated");
      } else toast.error(res.data.message);
    } catch {
      toast.error("Could not save addresses");
    } finally {
      setSavingAddr(false);
    }
  };

  const updateAddr = (i: number, patch: Partial<CustomerAddress>) =>
    setAddresses((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, ...patch } : a))
    );
  const addAddr = () => setAddresses((prev) => [...prev, { ...emptyAddress }]);
  const removeAddr = (i: number) =>
    setAddresses((prev) => prev.filter((_, idx) => idx !== i));
  const setDefault = (i: number) =>
    setAddresses((prev) =>
      prev.map((a, idx) => ({ ...a, isDefault: idx === i }))
    );

  const doLogout = async () => {
    await logout();
    toast.success("Logged out");
    router.push("/");
    router.refresh();
  };

  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-[900px] px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-2xl font-bold text-white"
            style={{ backgroundColor: brand.primary }}
          >
            {photo ? (
              <Image
                src={photo}
                alt={user.name}
                fill
                unoptimized
                className="object-cover"
              />
            ) : (
              initial
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: brand.navy }}>
              {user.name}
            </h1>
            <p className="text-sm" style={{ color: brand.textMuted }}>
              {user.email}
            </p>
            {user.phone && (
              <p className="text-sm" style={{ color: brand.textMuted }}>
                {user.phone}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-2.5 text-sm font-semibold"
            style={{ borderColor: brand.primary, color: brand.primary }}
          >
            <Package size={16} />
            My Orders
          </Link>
          <button
            onClick={doLogout}
            className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {/* Edit profile */}
        <Card title="Edit Profile" icon={<UserIcon size={18} />}>
          <div className="mb-4 flex items-center gap-4">
            <div
              className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full text-xl font-bold text-white"
              style={{ backgroundColor: brand.primary }}
            >
              {photo ? (
                <Image src={photo} alt="" fill unoptimized className="object-cover" />
              ) : (
                initial
              )}
            </div>
            <label
              className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] border px-3 py-2 text-sm font-semibold"
              style={{ borderColor: brand.border, color: brand.navy }}
            >
              <Camera size={15} />
              Change photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPhoto}
              />
            </label>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className={fieldCls}
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={fieldCls}
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className={`${fieldCls} sm:col-span-2 opacity-70`}
              value={user.email}
              disabled
            />
          </div>
          <button
            onClick={saveProfile}
            disabled={savingProfile}
            className="mt-4 rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: brand.primary }}
          >
            {savingProfile ? "Saving..." : "Save Changes"}
          </button>
        </Card>

        {/* Addresses */}
        <Card title="Addresses" icon={<MapPin size={18} />}>
          <div className="flex flex-col gap-4">
            {addresses.length === 0 && (
              <p className="text-sm" style={{ color: brand.textMuted }}>
                No addresses saved yet.
              </p>
            )}
            {addresses.map((a, i) => (
              <div
                key={i}
                className="rounded-[12px] border p-3.5"
                style={{ borderColor: brand.border }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <label
                    className="flex cursor-pointer items-center gap-2 text-sm font-semibold"
                    style={{ color: brand.navy }}
                  >
                    <input
                      type="radio"
                      name="defaultAddr"
                      checked={!!a.isDefault}
                      onChange={() => setDefault(i)}
                      style={{ accentColor: brand.primary }}
                    />
                    Default address
                  </label>
                  <button
                    onClick={() => removeAddr(i)}
                    aria-label="Remove address"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    className={`${fieldCls} sm:col-span-2`}
                    placeholder="Address line 1"
                    value={a.line1}
                    onChange={(e) => updateAddr(i, { line1: e.target.value })}
                  />
                  <input
                    className={`${fieldCls} sm:col-span-2`}
                    placeholder="Address line 2 (optional)"
                    value={a.line2 || ""}
                    onChange={(e) => updateAddr(i, { line2: e.target.value })}
                  />
                  <input
                    className={fieldCls}
                    placeholder="City"
                    value={a.city}
                    onChange={(e) => updateAddr(i, { city: e.target.value })}
                  />
                  <input
                    className={fieldCls}
                    placeholder="State"
                    value={a.state}
                    onChange={(e) => updateAddr(i, { state: e.target.value })}
                  />
                  <input
                    className={fieldCls}
                    placeholder="Pincode"
                    value={a.pincode}
                    onChange={(e) => updateAddr(i, { pincode: e.target.value })}
                  />
                  <input
                    className={fieldCls}
                    placeholder="Country"
                    value={a.country || "India"}
                    onChange={(e) => updateAddr(i, { country: e.target.value })}
                  />
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={addAddr}
                className="inline-flex items-center gap-2 rounded-[10px] border px-4 py-2.5 text-sm font-semibold"
                style={{ borderColor: brand.border, color: brand.navy }}
              >
                <Plus size={15} />
                Add address
              </button>
              <button
                onClick={() => saveAddresses(addresses)}
                disabled={savingAddr}
                className="rounded-[10px] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
                style={{ backgroundColor: brand.primary }}
              >
                {savingAddr ? "Saving..." : "Save Addresses"}
              </button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
