"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  FormCard,
  LoadingState,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

export default function EditCoursePage() {
  useAdminPage("Edit Course");

  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    duration: "",
    price: "",
    level: "Beginner",
  });

  useEffect(() => {
    if (id) fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      setFormData(response.data.data);
      setPreview(response.data.data.image || "");
    } catch (error) {
      console.log(error);
      alert("Course not found");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const updateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`/api/courses/${id}`, formData);
      alert("Course updated successfully");
      router.push("/admin/courses");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading course..." />;
  }

  return (
    <>
      <PageHeader
        title="Edit Course"
        description="Update course details and image."
        action={
          <AdminButton
            variant="outline"
            onClick={() => router.push("/admin/courses")}
          >
            Back To Courses
          </AdminButton>
        }
      />

      <FormCard title="Course Details" maxWidth="2xl">
        <form
          onSubmit={updateCourse}
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="space-y-5">
            <AdminField label="Course Title">
              <AdminInput
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Description">
              <AdminTextarea
                rows={8}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Upload Course Image">
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
          </div>

          <div className="space-y-5">
            {preview && (
              <div
                className="rounded-[12px] border p-4"
                style={{
                  borderColor: "var(--admin-border)",
                  backgroundColor: "var(--admin-muted)",
                }}
              >
                <div className="relative h-64">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Duration">
                <AdminInput
                  type="text"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                />
              </AdminField>
              <AdminField label="Price">
                <AdminInput
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </AdminField>
            </div>

            <AdminField label="Level">
              <AdminSelect
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </AdminSelect>
            </AdminField>

            <SectionCard title="Course Summary" noPadding>
              <div
                className="space-y-2 p-5 text-sm"
                style={{ color: "var(--page-fg)" }}
              >
                <p>
                  <strong>Duration:</strong> {formData.duration}
                </p>
                <p>
                  <strong>Price:</strong> ₹{formData.price}
                </p>
                <p>
                  <strong>Level:</strong> {formData.level}
                </p>
              </div>
            </SectionCard>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2 sm:flex-row">
            <AdminButton
              type="button"
              variant="outline"
              fullWidth
              onClick={() => router.push("/admin/courses")}
            >
              Cancel
            </AdminButton>
            <AdminButton type="submit" disabled={saving} fullWidth>
              {saving ? "Updating..." : "Update Course"}
            </AdminButton>
          </div>
        </form>
      </FormCard>
    </>
  );
}
