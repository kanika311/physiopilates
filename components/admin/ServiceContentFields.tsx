"use client";

import Image from "next/image";
import { ImageIcon, Plus, Trash2 } from "lucide-react";

import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
  SectionCard,
} from "@/components/admin/ui";

export type ServiceContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroImage: string;
  overviewTitle: string;
  overviewDescription: string;
  overviewImage: string;
  overviewBullets: string[];
  overviewLevels: string[];
};

export const EMPTY_SERVICE_CONTENT: ServiceContent = {
  heroEyebrow: "",
  heroTitle: "",
  heroDescription: "",
  heroImage: "",
  overviewTitle: "",
  overviewDescription: "",
  overviewImage: "",
  overviewBullets: [],
  overviewLevels: [],
};

type Props = {
  value: ServiceContent;
  onChange: (next: ServiceContent) => void;
  /** When true, shows a live banner preview card. */
  showPreview?: boolean;
};

export default function ServiceContentFields({
  value,
  onChange,
  showPreview = true,
}: Props) {
  const set = <K extends keyof ServiceContent>(key: K, v: ServiceContent[K]) =>
    onChange({ ...value, [key]: v });

  const fileToField = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "heroImage" | "overviewImage"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => set(field, reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const updateBullet = (i: number, v: string) => {
    const next = [...value.overviewBullets];
    next[i] = v;
    set("overviewBullets", next);
  };
  const addBullet = () => set("overviewBullets", [...value.overviewBullets, ""]);
  const removeBullet = (i: number) =>
    set(
      "overviewBullets",
      value.overviewBullets.filter((_, idx) => idx !== i)
    );

  const updateLevel = (i: number, v: string) => {
    const next = [...value.overviewLevels];
    next[i] = v;
    set("overviewLevels", next);
  };
  const addLevel = () => set("overviewLevels", [...value.overviewLevels, ""]);
  const removeLevel = (i: number) =>
    set(
      "overviewLevels",
      value.overviewLevels.filter((_, idx) => idx !== i)
    );

  return (
    <>
      <SectionCard title="Hero Banner">
        <p className="mb-4 text-xs" style={{ color: "var(--admin-text-muted)" }}>
          The big image and text at the very top of the service page.
        </p>
        <div className="flex flex-col gap-4">
          <AdminField label="Banner Image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => fileToField(e, "heroImage")}
              className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
              }}
            />
          </AdminField>

          <AdminField label="Banner Image URL (optional)">
            <AdminInput
              placeholder="https://... or leave blank to use the service image"
              value={value.heroImage.startsWith("data:") ? "" : value.heroImage}
              onChange={(e) => set("heroImage", e.target.value)}
            />
          </AdminField>

          <AdminField label="Eyebrow (small label above title)">
            <AdminInput
              placeholder="e.g. Our service"
              value={value.heroEyebrow}
              onChange={(e) => set("heroEyebrow", e.target.value)}
            />
          </AdminField>

          <AdminField label="Banner Title">
            <AdminInput
              placeholder="Defaults to the service name if left blank"
              value={value.heroTitle}
              onChange={(e) => set("heroTitle", e.target.value)}
            />
          </AdminField>

          <AdminField label="Banner Description">
            <AdminTextarea
              rows={3}
              placeholder="Supporting paragraph under the banner title"
              value={value.heroDescription}
              onChange={(e) => set("heroDescription", e.target.value)}
            />
          </AdminField>

          {showPreview && (
            <div
              className="relative overflow-hidden rounded-[14px] border"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <div className="relative h-52 w-full bg-neutral-200">
                {value.heroImage ? (
                  <Image
                    src={value.heroImage}
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
                  {value.heroEyebrow && (
                    <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
                      {value.heroEyebrow}
                    </span>
                  )}
                  <h3 className="max-w-xl text-2xl font-bold text-white">
                    {value.heroTitle || "Banner Title"}
                  </h3>
                  {value.heroDescription && (
                    <p className="mt-2 max-w-lg text-sm text-white/85">
                      {value.heroDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Overview Section">
        <p className="mb-4 text-xs" style={{ color: "var(--admin-text-muted)" }}>
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

          {value.overviewImage && (
            <div
              className="relative h-40 w-32 overflow-hidden rounded-[12px] border"
              style={{ borderColor: "var(--admin-border)" }}
            >
              <Image
                src={value.overviewImage}
                alt="Overview preview"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          )}

          <AdminField label="Overview Image URL (optional)">
            <AdminInput
              placeholder="https://... or leave blank to use the service image"
              value={
                value.overviewImage.startsWith("data:")
                  ? ""
                  : value.overviewImage
              }
              onChange={(e) => set("overviewImage", e.target.value)}
            />
          </AdminField>

          <AdminField label="Overview Title">
            <AdminInput
              placeholder="Defaults to the service name if left blank"
              value={value.overviewTitle}
              onChange={(e) => set("overviewTitle", e.target.value)}
            />
          </AdminField>

          <AdminField label="Overview Description">
            <AdminTextarea
              rows={4}
              value={value.overviewDescription}
              onChange={(e) => set("overviewDescription", e.target.value)}
            />
          </AdminField>

          {/* Bullet points */}
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
              {value.overviewBullets.map((b, i) => (
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
                    className="admin-focus-ring mt-1 flex size-9 shrink-0 items-center justify-center rounded-[10px] text-red-600"
                    style={{ backgroundColor: "rgb(254 242 242)" }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {value.overviewBullets.length === 0 && (
                <p
                  className="text-xs"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  No bullet points yet.
                </p>
              )}
            </div>
          </div>

          {/* Level tags */}
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
              {value.overviewLevels.map((l, i) => (
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
                    className="admin-focus-ring flex size-9 shrink-0 items-center justify-center rounded-[10px] text-red-600"
                    style={{ backgroundColor: "rgb(254 242 242)" }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
              {value.overviewLevels.length === 0 && (
                <p
                  className="text-xs"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  No level tags yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>
    </>
  );
}
