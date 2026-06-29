"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { RotateCcw, ImageIcon, Plus, Trash2 } from "lucide-react";

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
import { SERVICE_OVERVIEWS } from "@/lib/serviceOverviews";

// Service pages (Physiotherapy, Pilates, Yoga, Therapy) are managed in the
// Services tab now, so they're excluded from this Page Banners admin.
const PAGES = PAGE_HERO_LIST.filter((p) => !SERVICE_OVERVIEWS[p.page]);

type Banner = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewImage: string;
  overviewBullets: string[];
  overviewLevels: string[];
};

function defaultsFor(page: string): Banner {
  const cfg = PAGE_HEROES[page];
  const ov = SERVICE_OVERVIEWS[page];
  return {
    eyebrow: cfg?.eyebrow ?? "",
    title: cfg?.title ?? "",
    description: cfg?.description ?? "",
    image: cfg?.image ?? "",
    overviewTitle: ov?.title ?? "",
    overviewDescription: ov?.description ?? "",
    overviewImage: ov?.image ?? "",
    overviewBullets: ov?.bullets ?? [],
    overviewLevels: ov?.levels ?? [],
  };
}

export default function PageBannersAdmin() {
  useAdminPage("Page Banners");

  const [active, setActive] = useState(PAGES[0]?.page ?? "gallery");
  const [form, setForm] = useState<Banner>(() => defaultsFor(active));
  const [overrides, setOverrides] = useState<Record<string, Banner>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const activeCfg = useMemo(() => PAGE_HEROES[active], [active]);
  const hasOverview = !!SERVICE_OVERVIEWS[active];

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
              overviewTitle: d.overviewTitle ?? "",
              overviewDescription: d.overviewDescription ?? "",
              overviewImage: d.overviewImage ?? "",
              overviewBullets: Array.isArray(d.overviewBullets)
                ? d.overviewBullets
                : [],
              overviewLevels: Array.isArray(d.overviewLevels)
                ? d.overviewLevels
                : [],
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
      overviewTitle: ov?.overviewTitle || def.overviewTitle,
      overviewDescription: ov?.overviewDescription || def.overviewDescription,
      overviewImage: ov?.overviewImage || def.overviewImage,
      overviewBullets:
        ov?.overviewBullets && ov.overviewBullets.length
          ? ov.overviewBullets
          : def.overviewBullets,
      overviewLevels:
        ov?.overviewLevels && ov.overviewLevels.length
          ? ov.overviewLevels
          : def.overviewLevels,
    });
  }, [active, overrides]);

  const setField = <K extends keyof Banner>(key: K, value: Banner[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const fileToField = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "overviewImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setField(field, reader.result as string);
    reader.readAsDataURL(file);
  };

  // Bullet helpers
  const updateBullet = (i: number, value: string) =>
    setForm((prev) => {
      const next = [...prev.overviewBullets];
      next[i] = value;
      return { ...prev, overviewBullets: next };
    });
  const addBullet = () =>
    setForm((prev) => ({
      ...prev,
      overviewBullets: [...prev.overviewBullets, ""],
    }));
  const removeBullet = (i: number) =>
    setForm((prev) => ({
      ...prev,
      overviewBullets: prev.overviewBullets.filter((_, idx) => idx !== i),
    }));

  // Level helpers
  const updateLevel = (i: number, value: string) =>
    setForm((prev) => {
      const next = [...prev.overviewLevels];
      next[i] = value;
      return { ...prev, overviewLevels: next };
    });
  const addLevel = () =>
    setForm((prev) => ({
      ...prev,
      overviewLevels: [...prev.overviewLevels, ""],
    }));
  const removeLevel = (i: number) =>
    setForm((prev) => ({
      ...prev,
      overviewLevels: prev.overviewLevels.filter((_, idx) => idx !== i),
    }));

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload = {
        ...form,
        overviewBullets: form.overviewBullets
          .map((b) => b.trim())
          .filter(Boolean),
        overviewLevels: form.overviewLevels.map((l) => l.trim()).filter(Boolean),
      };
      const res = await fetch(`/api/page-content/${active}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        "Reset this page's content to the original default? This removes your custom banner and overview for this page."
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
        title="Page Content"
        description="Change the hero banner for these pages. Service pages are edited in the Services tab."
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[260px_1fr]">
        {/* Page selector */}
        <SectionCard title="Pages">
          <div className="flex flex-col gap-1.5">
            {PAGES.map((p) => {
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
                  onChange={(e) => fileToField(e, "image")}
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

          {/* Banner live preview */}
          <SectionCard title="Banner Preview">
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

          {/* Overview section editor (service pages only) */}
          {hasOverview && (
            <SectionCard title="Overview Section">
              <p
                className="mb-4 text-xs"
                style={{ color: "var(--admin-text-muted)" }}
              >
                The detailed section below the banner — image, heading, paragraph,
                bullet points and level tags.
              </p>

              <div className="flex flex-col gap-4">
                <AdminField label="Overview Image">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => fileToField(e, "overviewImage")}
                    className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
                    style={{
                      borderColor: "var(--admin-border)",
                      backgroundColor: "var(--admin-muted)",
                    }}
                  />
                </AdminField>

                {form.overviewImage && (
                  <div
                    className="relative h-40 w-32 overflow-hidden rounded-[12px] border"
                    style={{ borderColor: "var(--admin-border)" }}
                  >
                    <Image
                      src={form.overviewImage}
                      alt="Overview preview"
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                )}

                <AdminField label="Overview Image URL (optional)">
                  <AdminInput
                    placeholder="https://... or leave the default"
                    value={
                      form.overviewImage.startsWith("data:")
                        ? ""
                        : form.overviewImage
                    }
                    onChange={(e) => setField("overviewImage", e.target.value)}
                  />
                </AdminField>

                <AdminField label="Overview Title">
                  <AdminInput
                    value={form.overviewTitle}
                    onChange={(e) => setField("overviewTitle", e.target.value)}
                  />
                </AdminField>

                <AdminField label="Overview Description">
                  <AdminTextarea
                    rows={4}
                    value={form.overviewDescription}
                    onChange={(e) =>
                      setField("overviewDescription", e.target.value)
                    }
                  />
                </AdminField>

                {/* Bullets */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-black">
                      Bullet Points
                    </label>
                    <AdminButton variant="outline" onClick={addBullet}>
                      <Plus size={14} />
                      Add
                    </AdminButton>
                  </div>
                  <div className="flex flex-col gap-2">
                    {form.overviewBullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AdminTextarea
                          rows={2}
                          value={b}
                          onChange={(e) => updateBullet(i, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeBullet(i)}
                          aria-label="Remove bullet"
                          className="admin-focus-ring mt-1 flex size-9 shrink-0 items-center justify-center rounded-[10px] text-red-600 hover:bg-red-50"
                          style={{ backgroundColor: "rgb(254 242 242)" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    {form.overviewBullets.length === 0 && (
                      <p
                        className="text-xs"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        No bullet points.
                      </p>
                    )}
                  </div>
                </div>

                {/* Levels */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-medium text-black">
                      Level Tags
                    </label>
                    <AdminButton variant="outline" onClick={addLevel}>
                      <Plus size={14} />
                      Add
                    </AdminButton>
                  </div>
                  <div className="flex flex-col gap-2">
                    {form.overviewLevels.map((l, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <AdminInput
                          value={l}
                          placeholder="e.g. Beginner"
                          onChange={(e) => updateLevel(i, e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => removeLevel(i)}
                          aria-label="Remove level"
                          className="admin-focus-ring flex size-9 shrink-0 items-center justify-center rounded-[10px] text-red-600 hover:bg-red-50"
                          style={{ backgroundColor: "rgb(254 242 242)" }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                    {form.overviewLevels.length === 0 && (
                      <p
                        className="text-xs"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        No level tags.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <AdminButton variant="outline" onClick={handleReset} disabled={saving}>
              <RotateCcw size={15} />
              Reset to Default
            </AdminButton>
            <AdminButton onClick={handleSave} disabled={saving || loading}>
              {saving ? "Saving..." : "Save Changes"}
            </AdminButton>
          </div>
        </div>
      </div>
    </>
  );
}
