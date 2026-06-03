"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

type SectionType = {
  type: "paragraph" | "heading" | "subheading";
  text: string;
};

export default function CreateBlogPage() {
  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
      slug: "",
      title: "",
      excerpt: "",
      author: "",
      heroImage: "",

      sections: [
        {
          type: "paragraph",
          text: "",
        },
      ] as SectionType[],
    });

  // Upload image
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const base64 =
        reader.result as string;

      setPreview(base64);

      setFormData({
        ...formData,
        heroImage: base64,
      });
    };
  };

  // Handle section change
  const handleSectionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedSections = [
      ...formData.sections,
    ];

    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value,
    };

    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Add section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          type: "paragraph",
          text: "",
        },
      ],
    });
  };

  // Remove section
  const removeSection = (
    index: number
  ) => {
    const updatedSections =
      formData.sections.filter(
        (_, i) => i !== index
      );

    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Submit
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

        date: new Date()
          .toISOString()
          .split("T")[0],

        dateDisplay:
          new Date().toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ),

        author: formData.author,

        heroImage:
          formData.heroImage,

        cardImage:
          formData.heroImage,

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
        sections: [
          {
            type: "paragraph",
            text: "",
          },
        ],
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
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="lg:ml-72">
        <AdminHeader title="Create Blog" />

        <main className="p-4 lg:p-8">
          <div className="mx-auto max-w-5xl rounded-3xl bg-white p-5 shadow-sm lg:p-8">
            <h2 className="text-3xl font-bold">
              Create Blog
            </h2>

            <p className="mt-2 text-gray-500">
              Publish blog articles from
              admin panel
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Slug */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input
                  type="text"
                  required
                  placeholder="best-pilates-course"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug:
                        e.target.value,
                    })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none"
                />
              </div>

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Blog Title
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title:
                        e.target.value,
                    })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Excerpt
                </label>

                <textarea
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excerpt:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
                />
              </div>

              {/* Author */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Author
                </label>

                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      author:
                        e.target.value,
                    })
                  }
                  className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none"
                />
              </div>

              {/* Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Upload Hero Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={
                    handleImageUpload
                  }
                  className="w-full rounded-xl border border-gray-300 p-3"
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="relative h-72 overflow-hidden rounded-2xl">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Sections */}
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    Blog Sections
                  </h3>

                  <button
                    type="button"
                    onClick={addSection}
                    className="rounded-xl bg-black px-5 py-2 text-white"
                  >
                    Add Section
                  </button>
                </div>

                {formData.sections.map(
                  (section, index) => (
                    <div
                      key={index}
                      className="space-y-4 rounded-2xl border border-gray-200 p-5"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">
                          Section {index + 1}
                        </h4>

                        {formData.sections
                          .length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              removeSection(
                                index
                              )
                            }
                            className="text-red-500"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <select
                        value={section.type}
                        onChange={(e) =>
                          handleSectionChange(
                            index,
                            "type",
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none"
                      >
                        <option value="paragraph">
                          Paragraph
                        </option>

                        <option value="heading">
                          Heading
                        </option>

                        <option value="subheading">
                          Subheading
                        </option>
                      </select>

                      <textarea
                        rows={6}
                        required
                        value={section.text}
                        onChange={(e) =>
                          handleSectionChange(
                            index,
                            "text",
                            e.target.value
                          )
                        }
                        className="w-full rounded-2xl border border-gray-300 p-4 outline-none"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-black text-white transition hover:opacity-90"
              >
                {loading
                  ? "Please wait..."
                  : "Create Blog"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}