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
  AdminTextarea,
  EmptyState,
  FormCard,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";

interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  quote: string;
  image?: string;
  rating: number;
  isActive?: boolean;
}

const emptyForm = {
  name: "",
  role: "",
  quote: "",
  image: "",
  rating: 5,
};

export default function TestimonialsPage() {
  useAdminPage("Testimonials");

  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      setTestimonials(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setPreview("");
    setView("form");
  };

  const openEdit = (t: TestimonialItem) => {
    setEditingId(t._id);
    setFormData({
      name: t.name,
      role: t.role,
      quote: t.quote,
      image: t.image || "",
      rating: t.rating || 5,
    });
    setPreview(t.image || "");
    setView("form");
  };

  const backToList = () => {
    setView("list");
    setEditingId(null);
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

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm("Delete this testimonial?")) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete testimonial");
    }
  };

  const toggleActive = async (t: TestimonialItem) => {
    const nextActive = !(t.isActive !== false);
    setTogglingId(t._id);
    try {
      await axios.put(`/api/testimonials/${t._id}`, { isActive: nextActive });
      setTestimonials((prev) =>
        prev.map((x) =>
          x._id === t._id ? { ...x, isActive: nextActive } : x
        )
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { ...formData, rating: Number(formData.rating) };

      if (editingId) {
        await axios.put(`/api/testimonials/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/testimonials/create", payload);
      }

      setFormData(emptyForm);
      setPreview("");
      await fetchTestimonials();
      setView("list");
      setEditingId(null);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (view === "form") {
    return (
      <>
        <div className="mb-5">
          <AdminButton variant="ghost" onClick={backToList}>
            <ArrowLeft size={16} />
            Back to Testimonials
          </AdminButton>
        </div>

        <FormCard
          title={editingId ? "Edit Testimonial" : "Add Testimonial"}
          description="Manage client testimonials shown on the website"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <AdminField label="Name">
              <AdminInput
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Role / Title">
              <AdminInput
                type="text"
                required
                placeholder="Patient, Athlete, etc."
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Quote">
              <AdminTextarea
                required
                rows={4}
                value={formData.quote}
                onChange={(e) =>
                  setFormData({ ...formData, quote: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Rating">
              <AdminSelect
                value={String(formData.rating)}
                onChange={(e) =>
                  setFormData({ ...formData, rating: Number(e.target.value) })
                }
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Star{n > 1 ? "s" : ""}
                  </option>
                ))}
              </AdminSelect>
            </AdminField>

            <AdminField label="Photo (optional)">
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

            {preview && (
              <div className="relative h-28 w-28 overflow-hidden rounded-full">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <AdminButton type="submit" disabled={saving} fullWidth>
                {saving
                  ? "Please wait..."
                  : editingId
                  ? "Update Testimonial"
                  : "Create Testimonial"}
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
        title="Manage Testimonials"
        description="Create, edit and delete client testimonials"
        action={<AdminButton onClick={openCreate}>Add New</AdminButton>}
      />

      {loading ? (
        <LoadingState message="Loading testimonials..." />
      ) : testimonials.length === 0 ? (
        <EmptyState
          title="No Testimonials Yet"
          description="Add your first client testimonial"
          action={
            <AdminButton onClick={openCreate}>Create Testimonial</AdminButton>
          }
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {testimonials.map((t) => {
            const active = t.isActive !== false;
            const isToggling = togglingId === t._id;
            const initials = t.name
              .split(" ")
              .map((x) => x[0])
              .join("")
              .slice(0, 2);
            return (
              <div
                key={t._id}
                className="admin-card flex flex-col gap-4 p-3 sm:flex-row sm:items-center"
                style={{ borderRadius: "var(--admin-radius-lg)" }}
              >
                <div
                  className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-bold"
                  style={{
                    backgroundColor: "var(--admin-accent-softer)",
                    color: "var(--admin-accent)",
                  }}
                >
                  {t.image ? (
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className="truncate text-base font-bold"
                      style={{ color: "var(--page-fg)" }}
                    >
                      {t.name}
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
                  <p
                    className="mt-0.5 text-[12px] font-medium"
                    style={{ color: "var(--admin-accent)" }}
                  >
                    {t.role} · {"★".repeat(t.rating || 5)}
                  </p>
                  <p
                    className="mt-1 line-clamp-2 text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {t.quote}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isToggling}
                    onClick={() => toggleActive(t)}
                    className="admin-focus-ring inline-flex items-center justify-center gap-2 rounded-[10px] px-3 py-2 text-xs font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      backgroundColor: active
                        ? "rgb(22 163 74)"
                        : "rgb(220 38 38)",
                    }}
                  >
                    {isToggling ? "..." : active ? "Deactivate" : "Activate"}
                  </button>
                  <AdminButton variant="primary" onClick={() => openEdit(t)}>
                    Edit
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    onClick={() => deleteTestimonial(t._id)}
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
