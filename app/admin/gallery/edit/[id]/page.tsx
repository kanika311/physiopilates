"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  FormCard,
  LoadingState,
} from "@/components/admin/ui";

export default function EditGalleryPage() {
  useAdminPage("Edit Gallery");

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    alt: "",
    categories: "",
    TitleOverImage: "",
  });
  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([
    { value: "physiotherapy", label: "Physiotherapy" },
    { value: "pilates", label: "Pilates" },
    { value: "yoga", label: "Yoga" },
    { value: "therapy", label: "Therapy" },
  ]);

  useEffect(() => {
    if (id) fetchGallery();
    fetchCategories();
  }, [id]);

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

  const fetchGallery = async () => {
    try {
      const response = await axios.get(`/api/admin/gallary/${id}`);
      const item = response.data.data;
      setFormData({
        title: item.title || "",
        image: item.image || "",
        alt: item.alt || "",
        categories: item.categories?.[0] || "",
        TitleOverImage: item.TitleOverImage || "",
      });
      setPreview(item.image || "");
    } catch (error) {
      console.log(error);
      alert("Failed to load gallery item");
    } finally {
      setFetching(false);
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        title: formData.title,
        image: formData.image,
        alt: formData.alt,
        categories: [formData.categories],
        TitleOverImage: formData.TitleOverImage,
      };
      const response = await axios.put(
        `/api/admin/gallary/${id}`,
        payload
      );
      alert(response.data.message);
      router.push("/admin/gallery");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <LoadingState message="Loading gallery item..." />;
  }

  return (
    <FormCard
      title="Edit Gallery Image"
      description="Update gallery image details"
      action={
        <AdminButton
          variant="outline"
          onClick={() => router.push("/admin/gallery")}
        >
          <ArrowLeft size={15} />
          Back to Gallery
        </AdminButton>
      }
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
            onChange={handleImageUpload}
            className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
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

        <AdminField label="Alt Text">
          <AdminInput
            type="text"
            required
            value={formData.alt}
            onChange={(e) =>
              setFormData({ ...formData, alt: e.target.value })
            }
          />
        </AdminField>

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

        <AdminField label="TitleOverImage">
          <AdminInput
            type="text"
            value={formData.TitleOverImage}
            onChange={(e) =>
              setFormData({ ...formData, TitleOverImage: e.target.value })
            }
            placeholder="Featured, New, Popular..."
          />
        </AdminField>

        <div className="flex flex-col gap-3 sm:flex-row">
          <AdminButton
            type="button"
            variant="outline"
            fullWidth
            onClick={() => router.push("/admin/gallery")}
          >
            Cancel
          </AdminButton>
          <AdminButton type="submit" disabled={loading} fullWidth>
            {loading ? "Please wait..." : "Update Gallery"}
          </AdminButton>
        </div>
      </form>
    </FormCard>
  );
}
