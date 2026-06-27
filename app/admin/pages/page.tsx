"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { RotateCcw, ImageIcon } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";
import { PAGE_HERO_LIST, PAGE_HEROES } from "@/lib/pageHeroes";

type Banner = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
};

function defaultsFor(page: string): Banner {
  const cfg = PAGE_HEROES[page];
  return {
    eyebrow: cfg?.eyebrow ?? "",
    title: cfg?.title ?? "",
    description: cfg?.description ?? "",
    image: cfg?.image ?? "",
  };
}

export default function PageBannersAdmin() {
  useAdminPage("Page Banners");

  const [active, setActive] = useState(PAGE_HERO_LIST[0]?.page ?? "physiotherapy");
  const [form, setForm] = useState<Banner>(() => defaultsFor(active));
  const [overrides, setOverrides] = useState<Record<string, Banner>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const activeCfg = useMemo(() => PAGE_HEROES[active], [active]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/page-content", { cache: "no-store" });
        const json = await res.json();
        if (json?.success && Array.isArray(json.data)) {
          const map: Record<string, Banner> = {};
          for (const d of json.data) {
            map[d.page] = {
              eyebrow: d.eyebrow ?? "",
              title: d.title ?? "",
              description: d.description ?? "",
              image: d.image ?? "",
            };
          }
          setOverrides(map);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load form whenever the selected page or fetched overrides change.
  useEffect(() => {
    const ov = overrides[active];
    const def = defaultsFor(active);
    setForm({
      eyebrow: ov?.eyebrow || def.eyebrow,
      title: ov?.title || def.title,
      description: ov?.description || def.description,
      image: ov?.image || def.image,
    });
  }, [active, overrides]);

  const setField = <K extends keyof Banner>(key: K, value: Banner[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setField("image", reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/page-content/${active}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setOverrides((prev) => ({ ...prev, [active]: { ...form } }));
      }
      alert(data.message || "Saved");
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Reset this page's banner to the original default? This removes your custom banner for this page."
      )
    )
      return;
    try {
      setSaving(true);
      await fetch(`/api/page-content/${active}`, { method: "DELETE" });
      setOverrides((prev) => {
        const next = { ...prev };
        delete next[active];
        return next;
      });
      setForm(defaultsFor(active));
      alert("Reset to default");
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Page Banners"
        description="Change the hero banner image, heading and text for every page"
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[260px_1fr]">
        {/* Page selector */}
        <SectionCard title="Pages">
          <div className="flex flex-col gap-1.5">
            {PAGE_HERO_LIST.map((p) => {
              const isActive = p.page === active;
              const customized = !!overrides[p.page];
              return (
                <button
                  key={p.page}
                  type="button"
                  onClick={() => setActive(p.page)}
                  className="admin-focus-ring flex items-center justify-between rounded-[10px] px-3 py-2.5 text-left text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: isActive
                      ? "var(--admin-accent)"
                      : "var(--admin-muted)",
                    color: isActive ? "#fff" : "var(--page-fg)",
                  }}
                >
                  <span>{p.label}</span>
                  {customized && (
                    <span
                      className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(15,109,109,0.12)",
                        color: isActive ? "#fff" : "var(--admin-accent)",
                      }}
                    >
                      Custom
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* Editor */}
        <div className="flex flex-col gap-5">
          <SectionCard title={`Banner — ${activeCfg?.label ?? active}`}>
            <div className="flex flex-col gap-4">
              <AdminField label="Banner Image">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
                  style={{
                    borderColor: "var(--admin-border)",
                    backgroundColor: "var(--admin-muted)",
                  }}
                />
              </AdminField>

              <AdminField label="Image URL (optional)">
                <AdminInput
                  placeholder="https://... or leave the default"
                  value={form.image.startsWith("data:") ? "" : form.image}
                  onChange={(e) => setField("image", e.target.value)}
                />
              </AdminField>

              <AdminField label="Eyebrow (small label above title)">
                <AdminInput
                  placeholder="e.g. Our service"
                  value={form.eyebrow}
                  onChange={(e) => setField("eyebrow", e.target.value)}
                />
              </AdminField>

              <AdminField label="Title">
                <AdminInput
                  placeholder="Main heading"
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                />
              </AdminField>

              <AdminField label="Description paragraph">
                <AdminTextarea
                  rows={3}
                  placeholder="Supporting paragraph under the title"
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                />
              </AdminField>
            </div>
          </SectionCard>

          {/* Live preview */}
          <SectionCard title="Live Preview">
            <div
              className="relative overflow-hidden rounded-[14px] border"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <div className="relative h-56 w-full bg-neutral-200">
                {form.image ? (
                  <Image
                    src={form.image}
                    alt="Banner preview"
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-400">
                    <ImageIcon size={32} />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/45" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
                  {form.eyebrow && (
                    <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                      {form.eyebrow}
                    </span>
                  )}
                  <h3 className="max-w-xl text-2xl font-bold text-white">
                    {form.title || "Title"}
                  </h3>
                  {form.description && (
                    <p className="mt-2 max-w-lg text-sm text-white/85">
                      {form.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </SectionCard>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <AdminButton variant="outline" onClick={handleReset} disabled={saving}>
              <RotateCcw size={15} />
              Reset to Default
            </AdminButton>
            <AdminButton onClick={handleSave} disabled={saving || loading}>
              {saving ? "Saving..." : "Save Banner"}
            </AdminButton>
          </div>
        </div>
      </div>
    </>
  );
}
