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
  SectionCard,
} from "@/components/admin/ui";

type SectionType = {
  type: "paragraph" | "heading" | "subheading";
  text: string;
};

interface BlogItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  heroImage: string;
  cardImage?: string;
  dateDisplay?: string;
  sections?: SectionType[];
}

const emptyForm = {
  slug: "",
  title: "",
  excerpt: "",
  author: "",
  heroImage: "",
  sections: [{ type: "paragraph", text: "" }] as SectionType[],
};

export default function BlogsPage() {
  useAdminPage("Blog");

  const [view, setView] = useState<"list" | "form">("list");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState(emptyForm);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openCreate = () => {
    setEditingSlug(null);
    setFormData(emptyForm);
    setPreview("");
    setView("form");
  };

  const openEdit = (blog: BlogItem) => {
    setEditingSlug(blog.slug);
    setFormData({
      slug: blog.slug,
      title: blog.title,
      excerpt: blog.excerpt,
      author: blog.author,
      heroImage: blog.heroImage,
      sections:
        blog.sections && blog.sections.length
          ? blog.sections
          : [{ type: "paragraph", text: "" }],
    });
    setPreview(blog.heroImage || "");
    setView("form");
  };

  const backToList = () => {
    setView("list");
    setEditingSlug(null);
  };

  const deleteBlog = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/api/blogs/${slug}`);
      setBlogs((prev) => prev.filter((item) => item.slug !== slug));
    } catch (error) {
      console.log(error);
      alert("Failed to delete blog");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setFormData((prev) => ({ ...prev, heroImage: base64 }));
    };
  };

  const handleSectionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
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

      if (editingSlug) {
        await axios.put(`/api/blogs/${editingSlug}`, payload);
      } else {
        await axios.post("/api/admin/blogs/create", payload);
      }

      setFormData(emptyForm);
      setPreview("");
      await fetchBlogs();
      setView("list");
      setEditingSlug(null);
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
            Back to Blogs
          </AdminButton>
        </div>

        <FormCard
          title={editingSlug ? "Edit Blog" : "Create Blog"}
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

            <AdminField label="Hero Image">
              <input
                type="file"
                accept="image/*"
                required={!editingSlug}
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
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
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
                <AdminButton
                  type="button"
                  variant="outline"
                  onClick={addSection}
                >
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

            <div className="flex flex-col gap-3 sm:flex-row">
              <AdminButton type="submit" disabled={saving} fullWidth>
                {saving
                  ? "Please wait..."
                  : editingSlug
                  ? "Update Blog"
                  : "Create Blog"}
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
        title="Manage Blogs"
        description="Create, edit and delete blog articles"
        action={<AdminButton onClick={openCreate}>Add New</AdminButton>}
      />

      {loading ? (
        <LoadingState message="Loading blogs..." />
      ) : blogs.length === 0 ? (
        <EmptyState
          title="No Blogs Yet"
          description="Publish your first blog article"
          action={<AdminButton onClick={openCreate}>Create Blog</AdminButton>}
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="admin-card flex flex-col gap-4 p-3 sm:flex-row sm:items-center"
              style={{ borderRadius: "var(--admin-radius-lg)" }}
            >
              <div
                className="relative h-20 w-28 shrink-0 overflow-hidden rounded-[10px]"
                style={{ backgroundColor: "var(--admin-muted)" }}
              >
                {blog.heroImage ? (
                  <Image
                    src={blog.heroImage}
                    alt={blog.title}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className="truncate text-base font-bold"
                  style={{ color: "var(--page-fg)" }}
                >
                  {blog.title}
                </h3>
                <p
                  className="mt-1 line-clamp-2 text-sm"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  {blog.excerpt}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-medium"
                    style={{
                      backgroundColor: "var(--admin-accent-softer)",
                      color: "var(--admin-accent)",
                    }}
                  >
                    {blog.author}
                  </span>
                  {blog.dateDisplay ? (
                    <span style={{ color: "var(--admin-text-muted)" }}>
                      {blog.dateDisplay}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <AdminButton href={`/blogs/${blog.slug}`} variant="outline">
                  View
                </AdminButton>
                <AdminButton variant="primary" onClick={() => openEdit(blog)}>
                  Edit
                </AdminButton>
                <AdminButton
                  variant="danger"
                  onClick={() => deleteBlog(blog.slug)}
                >
                  Delete
                </AdminButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
