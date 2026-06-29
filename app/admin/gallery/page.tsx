"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  EmptyState,
  FormCard,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  alt: string;
  categories: string[];
  TitleOverImage?: string;
  isActive?: boolean;
}

const emptyForm = {
  title: "",
  image: "",
  categories: "",
};

export default function GalleryPage() {
  useAdminPage("Gallery");

  const [view, setView] = useState<"list" | "create">("list");

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([
    { value: "physiotherapy", label: "Physiotherapy" },
    { value: "pilates", label: "Pilates" },
    { value: "yoga", label: "Yoga" },
    { value: "therapy", label: "Therapy" },
  ]);

  const fetchGallery = async () => {
    try {
      const response = await axios.get("/api/admin/gallary");
      setGallery(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/services");
      const services = res.data?.data || [];
      const base = [
        { value: "physiotherapy", label: "Physiotherapy" },
        { value: "pilates", label: "Pilates" },
        { value: "yoga", label: "Yoga" },
        { value: "therapy", label: "Therapy" },
      ];
      const seen = new Set(base.map((b) => b.value));
      for (const s of services) {
        if (s.slug && !seen.has(s.slug)) {
          base.push({ value: s.slug, label: s.name || s.slug });
          seen.add(s.slug);
        }
      }
      setCategoryOptions(base);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchCategories();
  }, []);

  const deleteGallery = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/gallary/${id}`);
      setGallery((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete gallery image");
    }
  };

  const toggleActive = async (item: GalleryItem) => {
    const nextActive = !(item.isActive !== false);
    setTogglingId(item._id);
    try {
      await axios.put(`/api/admin/gallary/${item._id}`, {
        isActive: nextActive,
      });
      setGallery((prev) =>
        prev.map((g) =>
          g._id === item._id ? { ...g, isActive: nextActive } : g
        )
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  const openCreate = () => {
    setFormData(emptyForm);
    setPreview("");
    setView("create");
  };

  const backToList = () => {
    setView("list");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setFormData((prev) => ({ ...prev, image: base64 }));
    };
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = {
        title: formData.title,
        image: formData.image,
        alt: formData.title,
        categories: [formData.categories],
        TitleOverImage: formData.title,
      };
      const response = await axios.post("/api/admin/gallary/create", payload);
      alert(response.data.message);
      setFormData(emptyForm);
      setPreview("");
      await fetchGallery();
      setView("list");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (view === "create") {
    return (
      <>
        <div className="mb-5">
          <AdminButton variant="ghost" onClick={backToList}>
            <ArrowLeft size={16} />
            Back to Gallery
          </AdminButton>
        </div>

        <FormCard
          title="Add Gallery Image"
          description="Upload and manage gallery images"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <AdminField label="Title">
              <AdminInput
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Upload Image">
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleImageUpload}
                className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white"
                style={{
                  borderColor: "var(--admin-border)",
                  backgroundColor: "var(--admin-muted)",
                }}
              />
            </AdminField>

            {preview && (
              <div
                className="relative h-[220px] overflow-hidden rounded-[12px] border sm:h-[300px] md:h-[400px]"
                style={{
                  borderColor: "var(--admin-border)",
                  backgroundColor: "var(--admin-muted)",
                }}
              >
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  sizes="100vw"
                  className="object-contain p-2"
                />
              </div>
            )}

            <AdminField label="Category">
              <AdminSelect
                required
                value={formData.categories}
                onChange={(e) =>
                  setFormData({ ...formData, categories: e.target.value })
                }
              >
                <option value="">Select Category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>

            <div className="flex flex-col gap-3 sm:flex-row">
              <AdminButton type="submit" disabled={saving} fullWidth>
                {saving ? "Please wait..." : "Create Gallery"}
              </AdminButton>
              <AdminButton
                type="button"
                variant="outline"
                fullWidth
                onClick={backToList}
              >
                Cancel
              </AdminButton>
            </div>
          </form>
        </FormCard>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title=" Manage Gallery Images"
        description=""
        action={<AdminButton onClick={openCreate}>Add New</AdminButton>}
      />

      {loading ? (
        <LoadingState message="Loading gallery..." />
      ) : gallery.length === 0 ? (
        <EmptyState
          title="No Gallery Images"
          description="Add your first gallery image"
          action={<AdminButton onClick={openCreate}>Create Gallery</AdminButton>}
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {gallery.map((item) => {
            const active = item.isActive !== false;
            const isToggling = togglingId === item._id;
            return (
              <div
                key={item._id}
                className="admin-card flex flex-col gap-4 p-3 sm:flex-row sm:items-center"
                style={{ borderRadius: "var(--admin-radius-lg)" }}
              >
                <div
                  className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[10px]"
                  style={{ backgroundColor: "var(--admin-muted)" }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className="truncate text-base font-bold"
                      style={{ color: "var(--page-fg)" }}
                    >
                      {item.title}
                    </h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: active
                          ? "rgb(34 197 94 / 0.12)"
                          : "rgb(239 68 68 / 0.12)",
                        color: active ? "rgb(22 163 74)" : "rgb(220 38 38)",
                      }}
                    >
                      {active ? "Live" : "Hidden"}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.categories.map((category, index) => (
                      <span
                        key={index}
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize"
                        style={{
                          backgroundColor: "var(--admin-accent-softer)",
                          color: "var(--admin-accent)",
                        }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isToggling}
                    onClick={() => toggleActive(item)}
                    className="admin-focus-ring inline-flex items-center justify-center gap-2 rounded-[10px] px-3 py-2 text-xs font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      backgroundColor: active
                        ? "rgb(22 163 74)"
                        : "rgb(220 38 38)",
                    }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                    />
                    {isToggling
                      ? "..."
                      : active
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                  <AdminButton
                    href={`/admin/gallery/edit/${item._id}`}
                    variant="primary"
                  >
                    Edit
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    onClick={() => deleteGallery(item._id)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
