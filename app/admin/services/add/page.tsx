"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

export default function AddService() {
  useAdminPage("Add Service");
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    image: "",
    icon: "",
    order: 0,
    featured: false,
    status: true,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "image" | "icon"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setFormData((prev) => ({ ...prev, [field]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        alert("Service Added Successfully");
        router.push("/admin/services");
      } else {
        alert("Something went wrong");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Add Service"
        description="Create a new service for your website"
        action={
          <AdminButton
            variant="outline"
            onClick={() => router.push("/admin/services")}
          >
            <ArrowLeft size={15} />
            Back
          </AdminButton>
        }
      />

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
        {/* Basic details */}
        <SectionCard title="Service Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Name">
              <AdminInput
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Physiotherapy"
                required
              />
            </AdminField>
            <AdminField label="Slug">
              <AdminInput
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="e.g. physiotherapy"
                required
              />
            </AdminField>
          </div>

          <div className="mt-4">
            <AdminField label="Short Description">
              <AdminTextarea
                name="shortDescription"
                rows={2}
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="One-line summary shown in cards"
              />
            </AdminField>
          </div>

          <div className="mt-4">
            <AdminField label="Description">
              <AdminTextarea
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Full description of the service"
              />
            </AdminField>
          </div>

          <div className="mt-4 max-w-[200px]">
            <AdminField label="Order">
              <AdminInput
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
              />
            </AdminField>
          </div>

          <div className="mt-5 flex flex-wrap gap-8">
            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--page-fg)" }}>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckbox}
                className="size-4 accent-[#0F6D6D]"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--page-fg)" }}>
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleCheckbox}
                className="size-4 accent-[#0F6D6D]"
              />
              Active
            </label>
          </div>
        </SectionCard>

        {/* Media */}
        <SectionCard title="Media">
          <div className="grid gap-6 sm:grid-cols-2">
            <MediaUploader
              label="Service Image"
              value={formData.image}
              onUpload={(e) => handleFileUpload(e, "image")}
              onUrlChange={(v) => setFormData((p) => ({ ...p, image: v }))}
              onClear={() => setFormData((p) => ({ ...p, image: "" }))}
              previewClass="h-40 w-full object-cover"
            />
            <MediaUploader
              label="Icon"
              value={formData.icon}
              onUpload={(e) => handleFileUpload(e, "icon")}
              onUrlChange={(v) => setFormData((p) => ({ ...p, icon: v }))}
              onClear={() => setFormData((p) => ({ ...p, icon: "" }))}
              previewClass="h-20 w-20 object-contain"
            />
          </div>
        </SectionCard>

        {/* SEO */}
        <SectionCard title="SEO">
          <div className="flex flex-col gap-4">
            <AdminField label="SEO Title">
              <AdminInput
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleChange}
              />
            </AdminField>
            <AdminField label="SEO Description">
              <AdminTextarea
                name="seoDescription"
                rows={2}
                value={formData.seoDescription}
                onChange={handleChange}
              />
            </AdminField>
            <AdminField label="SEO Keywords">
              <AdminInput
                name="seoKeywords"
                value={formData.seoKeywords}
                onChange={handleChange}
                placeholder="comma, separated, keywords"
              />
            </AdminField>
          </div>
        </SectionCard>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <AdminButton
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/services")}
          >
            Cancel
          </AdminButton>
          <AdminButton
            type="submit"
            disabled={saving}
            className="!text-white"
            style={{
              background: "linear-gradient(135deg, #0F6D6D 0%, #0c5757 100%)",
              boxShadow: "0 4px 16px rgb(15 109 109 / 0.25)",
            }}
          >
            {saving ? "Saving..." : "Save Service"}
          </AdminButton>
        </div>
      </form>
    </>
  );
}

function MediaUploader({
  label,
  value,
  onUpload,
  onUrlChange,
  onClear,
  previewClass,
}: {
  label: string;
  value: string;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlChange: (v: string) => void;
  onClear: () => void;
  previewClass: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-black">{label}</label>

      <label
        className="admin-focus-ring flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-dashed p-4 text-sm font-medium transition-colors hover:bg-[rgba(15,109,109,0.04)]"
        style={{ borderColor: "var(--admin-border)", color: "var(--admin-accent)" }}
      >
        <Upload size={16} />
        Upload from device
        <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
      </label>

      <div className="mt-2">
        <AdminInput
          placeholder="...or paste an image URL"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onUrlChange(e.target.value)}
        />
      </div>

      {value && (
        <div className="mt-3 flex items-center gap-3">
          <div
            className="overflow-hidden rounded-[12px] border bg-white p-1"
            style={{ borderColor: "var(--admin-border)" }}
          >
            <Image
              src={value}
              alt={`${label} preview`}
              width={200}
              height={160}
              unoptimized
              className={`rounded-[8px] ${previewClass}`}
            />
          </div>
          <AdminButton variant="ghost" onClick={onClear} className="!text-red-600">
            <Trash2 size={15} />
            Remove
          </AdminButton>
        </div>
      )}
    </div>
  );
}
