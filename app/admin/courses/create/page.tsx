"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  FormCard,
} from "@/components/admin/ui";

export default function CreateCoursePage() {
  useAdminPage("Create Course");

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image: "",
    duration: "",
    price: "",
    level: "",
    instructor: "",
    category: "",
    status: "Draft",
    language: "English",
  });

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
      setFormData({ ...formData, image: base64 });
    };
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/admin/courses/create",
        formData
      );
      alert(response.data.message);
      setFormData({
        title: "",
        slug: "",
        description: "",
        image: "",
        duration: "",
        price: "",
        level: "",
        instructor: "",
        category: "",
        status: "Draft",
        language: "English",
      });
      setPreview("");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard
      title="Create Course"
      description="Add new training course"
      action={
        <AdminButton
          variant="outline"
          onClick={() => router.push("/admin/courses")}
        >
          <ArrowLeft size={15} />
          Back to Courses
        </AdminButton>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AdminField label="Course Title">
          <AdminInput
            type="text"
            required
            placeholder="Course Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Slug">
          <AdminInput
            type="text"
            required
            placeholder="Slug"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Description">
          <AdminTextarea
            required
            rows={5}
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Course Image">
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleImageUpload}
            className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
            style={{
              borderColor: "var(--admin-border)",
              backgroundColor: "var(--admin-muted)",
            }}
          />
        </AdminField>

        {preview && (
          <div className="relative h-72 overflow-hidden rounded-[12px]">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
        )}

        <AdminField label="Duration">
          <AdminInput
            type="text"
            required
            placeholder="Duration"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Price">
          <AdminInput
            type="text"
            required
            placeholder="Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Level">
          <AdminSelect
            required
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </AdminSelect>
        </AdminField>

        <AdminField label="Instructor">
          <AdminInput
            type="text"
            required
            placeholder="Instructor"
            value={formData.instructor}
            onChange={(e) =>
              setFormData({ ...formData, instructor: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Category">
          <AdminSelect
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="Yoga">Yoga</option>
            <option value="Pilates">Pilates</option>
            <option value="Physiotherapy">Physiotherapy</option>
            <option value="Fitness">Fitness</option>
            <option value="Meditation">Meditation</option>
          </AdminSelect>
        </AdminField>

        <AdminField label="Language">
          <AdminSelect
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </AdminSelect>
        </AdminField>

        <AdminField label="Status">
          <AdminSelect
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </AdminSelect>
        </AdminField>

        <AdminButton type="submit" disabled={loading} fullWidth>
          {loading ? "Please wait..." : "Create Course"}
        </AdminButton>
      </form>
    </FormCard>
  );
}
