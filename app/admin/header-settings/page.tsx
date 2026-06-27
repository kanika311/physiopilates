"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Plus, Trash2, RotateCcw } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

type NavLink = {
  label: string;
  href: string;
  pathnameMatch: string;
  type: "about" | "service" | "other";
};

type HeaderForm = {
  siteLogo: string;
  headerBgColor: string;
  menuTextColor: string;
  menuHoverColor: string;
  activeMenuColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  navLinks: NavLink[];
};

/** The original premium navbar design — used as the reset-to-default preset. */
const DEFAULT_PRESET: HeaderForm = {
  siteLogo: "",
  headerBgColor: "#ffffff",
  menuTextColor: "#12344D",
  menuHoverColor: "#0F6D6D",
  activeMenuColor: "#0F6D6D",
  buttonBgColor: "#0F6D6D",
  buttonTextColor: "#ffffff",
  navLinks: [
    { label: "About", href: "/about", pathnameMatch: "/about", type: "about" },
    { label: "Physiotherapy", href: "/physiotherapy", pathnameMatch: "/physiotherapy", type: "service" },
    { label: "Pilates", href: "/pilates", pathnameMatch: "/pilates", type: "service" },
    { label: "Yoga", href: "/yoga", pathnameMatch: "/yoga", type: "service" },
    { label: "Therapy", href: "/therapy", pathnameMatch: "/therapy", type: "service" },
    { label: "Courses", href: "/courses", pathnameMatch: "/courses", type: "other" },
    { label: "Gallery", href: "/gallery", pathnameMatch: "/gallery", type: "other" },
    { label: "Blogs", href: "/blogs", pathnameMatch: "/blogs", type: "other" },
    { label: "Contact", href: "/contact", pathnameMatch: "/contact", type: "other" },
  ],
};

const COLOR_FIELDS: { key: keyof HeaderForm; label: string }[] = [
  { key: "headerBgColor", label: "Header Background" },
  { key: "menuTextColor", label: "Menu Text" },
  { key: "menuHoverColor", label: "Menu Hover" },
  { key: "activeMenuColor", label: "Active Menu" },
  { key: "buttonBgColor", label: "Button Background" },
  { key: "buttonTextColor", label: "Button Text" },
];

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[13px] font-semibold"
        style={{ color: "var(--page-fg)" }}
      >
        {label}
      </label>
      <div
        className="flex items-center gap-2 rounded-[12px] border p-1.5"
        style={{
          borderColor: "var(--admin-border)",
          backgroundColor: "var(--admin-muted)",
        }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-10 shrink-0 cursor-pointer rounded-md border-0 bg-transparent p-0"
          aria-label={`${label} color picker`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-focus-ring w-full rounded-md bg-transparent px-2 py-1 text-sm uppercase"
          style={{ color: "var(--page-fg)" }}
        />
      </div>
    </div>
  );
}

export default function HeaderSettingsPage() {
  useAdminPage("Header Settings");

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<HeaderForm>(DEFAULT_PRESET);

  useEffect(() => {
    getSettings();
  }, []);

  const getSettings = async () => {
    try {
      const res = await fetch("/api/header-settings");
      const data = await res.json();
      if (data.success && data.data) {
        setForm({
          siteLogo: data.data.siteLogo || "",
          headerBgColor: data.data.headerBgColor || DEFAULT_PRESET.headerBgColor,
          menuTextColor: data.data.menuTextColor || DEFAULT_PRESET.menuTextColor,
          menuHoverColor:
            data.data.menuHoverColor || DEFAULT_PRESET.menuHoverColor,
          activeMenuColor:
            data.data.activeMenuColor || DEFAULT_PRESET.activeMenuColor,
          buttonBgColor: data.data.buttonBgColor || DEFAULT_PRESET.buttonBgColor,
          buttonTextColor:
            data.data.buttonTextColor || DEFAULT_PRESET.buttonTextColor,
          navLinks: data.data.navLinks?.length
            ? data.data.navLinks
            : DEFAULT_PRESET.navLinks,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setField = <K extends keyof HeaderForm>(key: K, value: HeaderForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setField("siteLogo", reader.result as string);
    reader.readAsDataURL(file);
  };

  const addNavLink = () =>
    setForm((prev) => ({
      ...prev,
      navLinks: [
        ...prev.navLinks,
        { label: "", href: "", pathnameMatch: "", type: "other" },
      ],
    }));

  const updateNavLink = (index: number, field: keyof NavLink, value: string) =>
    setForm((prev) => {
      const updated = [...prev.navLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, navLinks: updated };
    });

  const removeNavLink = (index: number) =>
    setForm((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== index),
    }));

  const resetToDefault = () => {
    if (
      window.confirm(
        "Reset the header to the original default design? Unsaved changes will be lost (you still need to Save to apply)."
      )
    ) {
      setForm(DEFAULT_PRESET);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/header-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message || "Saved");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Header Settings"
        description="Customize the website navbar — logo, colors, and menu links"
        action={
          <AdminButton variant="outline" onClick={resetToDefault}>
            <RotateCcw size={15} />
            Reset to Default
          </AdminButton>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Branding */}
        <SectionCard title="Branding">
          <AdminField label="Site Logo">
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
              }}
            />
          </AdminField>

          {form.siteLogo ? (
            <div className="mt-4 flex items-center gap-4">
              <div
                className="rounded-[12px] border bg-white p-2"
                style={{ borderColor: "var(--admin-border)" }}
              >
                <Image
                  src={form.siteLogo}
                  alt="Logo preview"
                  width={140}
                  height={60}
                  unoptimized
                  className="h-12 w-auto object-contain"
                />
              </div>
              <AdminButton
                variant="ghost"
                onClick={() => setField("siteLogo", "")}
                className="!text-red-600"
              >
                <Trash2 size={15} />
                Remove Logo
              </AdminButton>
            </div>
          ) : (
            <p
              className="mt-3 text-xs"
              style={{ color: "var(--admin-text-muted)" }}
            >
              No logo uploaded — the default logo will be used.
            </p>
          )}
        </SectionCard>

        {/* Colors */}
        <SectionCard title="Colors">
          <div className="grid gap-4 sm:grid-cols-2">
            {COLOR_FIELDS.map(({ key, label }) => (
              <ColorField
                key={key}
                label={label}
                value={form[key] as string}
                onChange={(v) => setField(key, v as HeaderForm[typeof key])}
              />
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Navigation */}
      <div className="mt-5">
        <SectionCard
          title="Navigation Menu"
          action={
            <AdminButton variant="outline" onClick={addNavLink}>
              <Plus size={15} />
              Add Link
            </AdminButton>
          }
        >
          <div className="flex flex-col gap-3">
            {form.navLinks.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 gap-3 rounded-[12px] border p-3 sm:grid-cols-12"
                style={{
                  borderColor: "var(--admin-border)",
                  backgroundColor: "var(--admin-muted)",
                }}
              >
                <div className="sm:col-span-3">
                  <AdminInput
                    placeholder="Label (e.g. About)"
                    value={item.label}
                    onChange={(e) =>
                      updateNavLink(index, "label", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <AdminInput
                    placeholder="URL (e.g. /about)"
                    value={item.href}
                    onChange={(e) =>
                      updateNavLink(index, "href", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-3">
                  <AdminInput
                    placeholder="Path match (e.g. /about)"
                    value={item.pathnameMatch}
                    onChange={(e) =>
                      updateNavLink(index, "pathnameMatch", e.target.value)
                    }
                  />
                </div>
                <div className="sm:col-span-2">
                  <AdminSelect
                    value={item.type}
                    onChange={(e) =>
                      updateNavLink(index, "type", e.target.value)
                    }
                  >
                    <option value="about">About</option>
                    <option value="service">Service</option>
                    <option value="other">Other</option>
                  </AdminSelect>
                </div>
                <div className="flex items-center sm:col-span-1">
                  <button
                    type="button"
                    onClick={() => removeNavLink(index)}
                    aria-label="Remove link"
                    className="admin-focus-ring flex h-10 w-full items-center justify-center rounded-[10px] text-red-600 transition-colors hover:bg-red-50"
                    style={{ backgroundColor: "rgb(254 242 242)" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {form.navLinks.length === 0 && (
              <p
                className="py-6 text-center text-sm"
                style={{ color: "var(--admin-text-muted)" }}
              >
                No menu links. Click &ldquo;Add Link&rdquo; to create one.
              </p>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Live Preview */}
      <div className="mt-5">
        <SectionCard title="Live Preview">
          <div
            className="overflow-hidden rounded-[12px] border"
            style={{ borderColor: "var(--admin-border)" }}
          >
            <div
              className="flex flex-wrap items-center justify-between gap-4 px-6 py-4"
              style={{ background: form.headerBgColor }}
            >
              <div className="flex flex-wrap items-center gap-6">
                {form.siteLogo ? (
                  <Image
                    src={form.siteLogo}
                    alt="Logo"
                    width={120}
                    height={48}
                    unoptimized
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span
                    className="text-xl font-bold"
                    style={{ color: form.menuTextColor }}
                  >
                    Physio Pilates
                  </span>
                )}

                <div className="flex flex-wrap gap-4 text-sm font-medium">
                  {form.navLinks.map((item, index) => (
                    <span
                      key={index}
                      style={{
                        color:
                          index === 0
                            ? form.activeMenuColor
                            : form.menuTextColor,
                      }}
                    >
                      {item.label || "Link"}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="rounded-full px-5 py-2 text-sm font-semibold"
                style={{
                  background: form.buttonBgColor,
                  color: form.buttonTextColor,
                }}
              >
                Contact Us
              </button>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <AdminButton variant="outline" onClick={resetToDefault}>
          <RotateCcw size={15} />
          Reset to Default
        </AdminButton>
        <AdminButton onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </AdminButton>
      </div>
    </>
  );
}
