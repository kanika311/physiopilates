"use client";

import { useState } from "react";
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
  SectionCard,
} from "@/components/admin/ui";

type SectionType = {
  type: "paragraph" | "heading" | "subheading";
  text: string;
};

export default function CreateBlogPage() {
  useAdminPage("Create Blog");

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    author: "",
    heroImage: "",
    sections: [{ type: "paragraph", text: "" }] as SectionType[],
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
      setFormData({ ...formData, heroImage: base64 });
    };
  };

  const handleSectionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value,
    };
    setFormData({ ...formData, sections: updatedSections });
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { type: "paragraph", text: "" }],
    });
  };

  const removeSection = (index: number) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        slug: formData.slug,
        title: formData.title,
        excerpt: formData.excerpt,
        date: new Date().toISOString().split("T")[0],
        dateDisplay: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        author: formData.author,
        heroImage: formData.heroImage,
        cardImage: formData.heroImage,
        sections: formData.sections,
      };
      const response = await axios.post(
        "/api/admin/blogs/create",
        payload
      );
      alert(response.data.message);
      setFormData({
        slug: "",
        title: "",
        excerpt: "",
        author: "",
        heroImage: "",
        sections: [{ type: "paragraph", text: "" }],
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
      title="Create Blog"
      description="Publish blog articles from admin panel"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AdminField label="Slug">
          <AdminInput
            type="text"
            required
            placeholder="best-pilates-course"
            value={formData.slug}
            onChange={(e) =>
              setFormData({ ...formData, slug: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Blog Title">
          <AdminInput
            type="text"
            required
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Excerpt">
          <AdminTextarea
            required
            rows={3}
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Author">
          <AdminInput
            type="text"
            required
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
          />
        </AdminField>

        <AdminField label="Upload Hero Image">
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--page-fg)" }}
            >
              Blog Sections
            </h3>
            <AdminButton type="button" variant="outline" onClick={addSection}>
              Add Section
            </AdminButton>
          </div>

          {formData.sections.map((section, index) => (
            <SectionCard key={index} noPadding>
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between">
                  <h4
                    className="font-semibold"
                    style={{ color: "var(--page-fg)" }}
                  >
                    Section {index + 1}
                  </h4>
                  {formData.sections.length > 1 && (
                    <AdminButton
                      type="button"
                      variant="ghost"
                      onClick={() => removeSection(index)}
                      className="!text-red-600"
                    >
                      Remove
                    </AdminButton>
                  )}
                </div>
                <AdminSelect
                  value={section.type}
                  onChange={(e) =>
                    handleSectionChange(index, "type", e.target.value)
                  }
                >
                  <option value="paragraph">Paragraph</option>
                  <option value="heading">Heading</option>
                  <option value="subheading">Subheading</option>
                </AdminSelect>
                <AdminTextarea
                  rows={6}
                  required
                  value={section.text}
                  onChange={(e) =>
                    handleSectionChange(index, "text", e.target.value)
                  }
                />
              </div>
            </SectionCard>
          ))}
        </div>

        <AdminButton type="submit" disabled={loading} fullWidth>
          {loading ? "Please wait..." : "Create Blog"}
        </AdminButton>
      </form>
    </FormCard>
  );
}
