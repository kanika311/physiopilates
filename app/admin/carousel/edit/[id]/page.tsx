"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  FormCard,
  LoadingState,
} from "@/components/admin/ui";

interface CarouselForm {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  order: number;
  status: boolean;
}

export default function EditCarousel() {
  useAdminPage("Edit Carousel");

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState<CarouselForm>({
    title: "",
    subtitle: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    order: 1,
    status: true,
  });

  useEffect(() => {
    if (id) getCarousel();
  }, [id]);

  const getCarousel = async () => {
    try {
      const res = await axios.get(`/api/carousel/${id}`);
      const item = res.data?.data ?? res.data;
      setForm({
        title: item.title || "",
        subtitle: item.subtitle || "",
        image: item.image || "",
        buttonText: item.buttonText || "",
        buttonLink: item.buttonLink || "",
        order: item.order || 1,
        status: item.status ?? true,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load carousel");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/carousel/${id}`, form);
      alert("Carousel Updated Successfully");
      router.push("/admin/carousel");
    } catch (error) {
      console.error(error);
      alert("Failed to update carousel");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <LoadingState message="Loading carousel..." />;
  }

  return (
    <FormCard
      title="Edit Carousel"
      description="Update banner details"
      maxWidth="2xl"
      action={
        <AdminButton
          variant="outline"
          onClick={() => router.push("/admin/carousel")}
        >
          <ArrowLeft size={15} />
          Back to Carousel
        </AdminButton>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <AdminField label="Title">
          <AdminInput
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </AdminField>

        <AdminField label="Subtitle">
          <AdminTextarea
            rows={4}
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
          />
        </AdminField>

        <AdminField label="Upload Banner Image">
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

        {form.image && (
          <AdminField label="Preview">
            <Image
              src={form.image}
              alt="Preview"
              width={600}
              height={300}
              className="h-56 w-full rounded-[12px] border object-cover"
              style={{ borderColor: "var(--admin-border)" }}
            />
          </AdminField>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <AdminField label="Button Text">
            <AdminInput
              type="text"
              name="buttonText"
              value={form.buttonText}
              onChange={handleChange}
            />
          </AdminField>
          <AdminField label="Button Link">
            <AdminInput
              type="text"
              name="buttonLink"
              value={form.buttonLink}
              onChange={handleChange}
            />
          </AdminField>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <AdminField label="Display Order">
            <AdminInput
              type="number"
              name="order"
              value={form.order}
              onChange={handleChange}
            />
          </AdminField>
          <AdminField label="Status">
            <AdminSelect
              value={form.status ? "active" : "inactive"}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value === "active",
                })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </AdminSelect>
          </AdminField>
        </div>

        <AdminButton type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Carousel"}
        </AdminButton>
      </form>
    </FormCard>
  );
}
