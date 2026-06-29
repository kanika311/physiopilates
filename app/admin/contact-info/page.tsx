"use client";

import { useEffect, useState } from "react";
import { RotateCcw, Plus, Trash2 } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

type OpeningHour = { label: string; value: string };

type ContactForm = {
  address: string;
  phone: string;
  email: string;
  openingHours: OpeningHour[];
};

const DEFAULT_PRESET: ContactForm = {
  address:
    "LGF Left side, D–768, opp. market no-2, Block D, Chittaranjan Park, New Delhi 110019",
  phone: "+91 9717505326",
  email: "physiopilates.12082022@gmail.com",
  openingHours: [
    { label: "Mon – Fri", value: "10:00 AM – 1:30 PM · 6:30 PM – 9:30 PM" },
    { label: "Saturday", value: "10:00 AM – 9:30 PM" },
    { label: "Sunday", value: "Closed" },
  ],
};

export default function ContactInfoAdmin() {
  useAdminPage("Contact Info");

  const [form, setForm] = useState<ContactForm>(DEFAULT_PRESET);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/contact-info", { cache: "no-store" });
        const json = await res.json();
        if (json?.success && json.data) {
          const d = json.data;
          setForm({
            address: d.address ?? DEFAULT_PRESET.address,
            phone: d.phone ?? DEFAULT_PRESET.phone,
            email: d.email ?? DEFAULT_PRESET.email,
            openingHours:
              Array.isArray(d.openingHours) && d.openingHours.length
                ? d.openingHours
                : DEFAULT_PRESET.openingHours,
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const setField = <K extends keyof ContactForm>(key: K, value: ContactForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const updateHour = (i: number, patch: Partial<OpeningHour>) =>
    setForm((prev) => ({
      ...prev,
      openingHours: prev.openingHours.map((h, idx) =>
        idx === i ? { ...h, ...patch } : h
      ),
    }));
  const addHour = () =>
    setForm((prev) => ({
      ...prev,
      openingHours: [...prev.openingHours, { label: "", value: "" }],
    }));
  const removeHour = (i: number) =>
    setForm((prev) => ({
      ...prev,
      openingHours: prev.openingHours.filter((_, idx) => idx !== i),
    }));

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/admin/contact-info", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          openingHours: form.openingHours
            .map((h) => ({ label: h.label.trim(), value: h.value.trim() }))
            .filter((h) => h.label && h.value),
        }),
      });
      const data = await res.json();
      alert(data.message || "Saved");
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!window.confirm("Reset contact info to the original defaults?")) return;
    setForm(DEFAULT_PRESET);
  };

  return (
    <>
      <PageHeader
        title="Contact Info"
        description="Edit the contact details shown on the public Contact page."
      />

      {loading ? (
        <p className="mt-6 text-sm" style={{ color: "var(--admin-text-muted)" }}>
          Loading...
        </p>
      ) : (
        <div className="mt-5 flex max-w-2xl flex-col gap-5">
          <SectionCard title="Contact Details">
            <div className="flex flex-col gap-4">
              <AdminField label="Address">
                <AdminTextarea
                  rows={3}
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                />
              </AdminField>
              <AdminField label="Phone (display)">
                <AdminInput
                  value={form.phone}
                  placeholder="+91 9717505326"
                  onChange={(e) => setField("phone", e.target.value)}
                />
              </AdminField>
              <AdminField label="Email">
                <AdminInput
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={(e) => setField("email", e.target.value)}
                />
              </AdminField>
            </div>
          </SectionCard>

          <SectionCard title="Opening Hours">
            <div className="flex flex-col gap-3">
              {form.openingHours.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="grid flex-1 gap-2 sm:grid-cols-[160px_1fr]">
                    <AdminInput
                      value={h.label}
                      placeholder="Mon – Fri"
                      onChange={(e) => updateHour(i, { label: e.target.value })}
                    />
                    <AdminInput
                      value={h.value}
                      placeholder="10:00 AM – 9:30 PM"
                      onChange={(e) => updateHour(i, { value: e.target.value })}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeHour(i)}
                    aria-label="Remove row"
                    className="admin-focus-ring mt-1 flex size-9 shrink-0 items-center justify-center rounded-[10px] text-red-600 hover:bg-red-50"
                    style={{ backgroundColor: "rgb(254 242 242)" }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              <div>
                <AdminButton variant="outline" onClick={addHour}>
                  <Plus size={14} />
                  Add Row
                </AdminButton>
              </div>
            </div>
          </SectionCard>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <AdminButton variant="outline" onClick={handleReset} disabled={saving}>
              <RotateCcw size={15} />
              Reset to Default
            </AdminButton>
            <AdminButton onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </AdminButton>
          </div>
        </div>
      )}
    </>
  );
}
