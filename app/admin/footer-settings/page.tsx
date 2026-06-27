"use client";

import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

type FooterForm = {
  tagline: string;
  address: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  copyright: string;
};

const DEFAULT_PRESET: FooterForm = {
  tagline:
    "Transform your life through mindful movement, expert care & holistic healing.",
  address:
    "LGF Left side, D–768, opp. market no-2, Block D, Chittaranjan Park, New Delhi 110019",
  phone: "+91 9717505326",
  email: "physiopilates.12082022@gmail.com",
  instagram: "https://www.instagram.com/pphysiopilates?igsh=aTN1c3VzNndrdDJ5",
  facebook: "https://www.facebook.com/pphysiopilates/",
  linkedin:
    "https://www.linkedin.com/in/dr-surbhi-silori-pt-471630b4?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  youtube: "https://youtube.com/@physiopilates6321?si=w8CytJCQKXfD-P-f",
  copyright: "Physio Pilates| Powered by JCRM Technologies",
};

const SOCIAL_FIELDS: {
  key: keyof FooterForm;
  label: string;
  Icon: typeof FaInstagram;
}[] = [
  { key: "instagram", label: "Instagram URL", Icon: FaInstagram },
  { key: "facebook", label: "Facebook URL", Icon: FaFacebookF },
  { key: "linkedin", label: "LinkedIn URL", Icon: FaLinkedinIn },
  { key: "youtube", label: "YouTube URL", Icon: FaYoutube },
];

export default function FooterSettingsPage() {
  useAdminPage("Footer Settings");

  const [form, setForm] = useState<FooterForm>(DEFAULT_PRESET);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/footer-settings", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setForm({
            tagline: d.tagline || DEFAULT_PRESET.tagline,
            address: d.address || DEFAULT_PRESET.address,
            phone: d.phone || DEFAULT_PRESET.phone,
            email: d.email || DEFAULT_PRESET.email,
            instagram: d.instagram || DEFAULT_PRESET.instagram,
            facebook: d.facebook || DEFAULT_PRESET.facebook,
            linkedin: d.linkedin || DEFAULT_PRESET.linkedin,
            youtube: d.youtube || DEFAULT_PRESET.youtube,
            copyright: d.copyright || DEFAULT_PRESET.copyright,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const setField = <K extends keyof FooterForm>(key: K, value: FooterForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resetToDefault = () => {
    if (
      window.confirm(
        "Reset footer content to the original default? You still need to Save to apply."
      )
    ) {
      setForm(DEFAULT_PRESET);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/footer-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      alert(data.message || "Saved");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Footer Settings"
        description="Edit the footer tagline, contact details, social links and copyright"
        action={
          <AdminButton variant="outline" onClick={resetToDefault}>
            <RotateCcw size={15} />
            Reset to Default
          </AdminButton>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <SectionCard title="About & Tagline">
          <AdminField label="Tagline">
            <AdminTextarea
              rows={3}
              value={form.tagline}
              onChange={(e) => setField("tagline", e.target.value)}
            />
          </AdminField>
        </SectionCard>

        <SectionCard title="Contact Details">
          <div className="flex flex-col gap-4">
            <AdminField label="Address">
              <AdminTextarea
                rows={2}
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
              />
            </AdminField>
            <AdminField label="Phone">
              <AdminInput
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />
            </AdminField>
            <AdminField label="Email">
              <AdminInput
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
              />
            </AdminField>
          </div>
        </SectionCard>
      </div>

      <div className="mt-5">
        <SectionCard title="Social Links">
          <div className="grid gap-4 sm:grid-cols-2">
            {SOCIAL_FIELDS.map(({ key, label, Icon }) => (
              <AdminField key={key} label={label}>
                <div className="flex items-center gap-2">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-[10px]"
                    style={{
                      backgroundColor: "var(--admin-muted)",
                      color: "var(--admin-accent)",
                    }}
                  >
                    <Icon />
                  </span>
                  <AdminInput
                    placeholder="https://..."
                    value={form[key]}
                    onChange={(e) => setField(key, e.target.value)}
                  />
                </div>
              </AdminField>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="mt-5">
        <SectionCard title="Copyright">
          <AdminField label="Copyright text (year is added automatically)">
            <AdminInput
              value={form.copyright}
              onChange={(e) => setField("copyright", e.target.value)}
            />
          </AdminField>
          <p className="mt-2 text-xs" style={{ color: "var(--admin-text-muted)" }}>
            Preview: © {new Date().getFullYear()} {form.copyright}
          </p>
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
