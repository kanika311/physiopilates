"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function CreateCoursePage() {
  const [loading, setLoading] =
    useState(false);

  const [preview, setPreview] =
    useState("");

  const [formData, setFormData] =
    useState({
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
        image: base64,
      });
    };
  };

  // Submit
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
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="ml-72">
        <AdminHeader title="Create Course" />

        <main className="p-8">
          <div className="max-w-4xl rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold">
              Create Course
            </h2>

            <p className="mt-2 text-gray-500">
              Add new training course
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Course Title */}
              <input
                type="text"
                required
                placeholder="Course Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4"
              />

              {/* Slug */}
              <input
                type="text"
                required
                placeholder="Slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4"
              />

              {/* Description */}
              <textarea
                required
                rows={5}
                placeholder="Description"
                value={
                  formData.description
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description:
                      e.target.value,
                  })
                }
                className="w-full rounded-2xl border p-4"
              />

              {/* Upload */}
              <input
                type="file"
                accept="image/*"
                required
                onChange={
                  handleImageUpload
                }
                className="w-full rounded-xl border p-3"
              />

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

              {/* Duration */}
              <input
                type="text"
                required
                placeholder="Duration"
                value={
                  formData.duration
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4"
              />

              {/* Price */}
              <input
                type="text"
                required
                placeholder="Price"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4"
              />

              {/* Level Dropdown */}
              <select
                required
                value={formData.level}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    level:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4 bg-white"
              >
                <option value="">
                  Select Level
                </option>

                <option value="Beginner">
                  Beginner
                </option>

                <option value="Intermediate">
                  Intermediate
                </option>

                <option value="Advanced">
                  Advanced
                </option>
              </select>

              {/* Instructor */}
              <input
                type="text"
                required
                placeholder="Instructor"
                value={
                  formData.instructor
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    instructor:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4"
              />

              {/* Category Dropdown */}
              <select
                required
                value={
                  formData.category
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4 bg-white"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Yoga">
                  Yoga
                </option>

                <option value="Pilates">
                  Pilates
                </option>

                <option value="Physiotherapy">
                  Physiotherapy
                </option>

                <option value="Fitness">
                  Fitness
                </option>

                <option value="Meditation">
                  Meditation
                </option>
              </select>

              {/* Language Dropdown */}
              <select
                value={
                  formData.language
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    language:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4 bg-white"
              >
                <option value="English">
                  English
                </option>

                <option value="Hindi">
                  Hindi
                </option>
              </select>

              {/* Status Dropdown */}
              <select
                value={
                  formData.status
                }
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status:
                      e.target.value,
                  })
                }
                className="h-12 w-full rounded-xl border px-4 bg-white"
              >
                <option value="Draft">
                  Draft
                </option>

                <option value="Published">
                  Published
                </option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-black text-white"
              >
                {loading
                  ? "Please wait..."
                  : "Create Course"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}