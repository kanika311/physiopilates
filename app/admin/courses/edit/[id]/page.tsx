
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function EditCoursePage() {
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
    if (id) {
      fetchCourse();
    }
  }, [id]);

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `/api/courses/${id}`
      );

      setFormData(response.data.data);

      setPreview(
        response.data.data.image || ""
      );
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
      const base64 =
        reader.result as string;

      setPreview(base64);

      setFormData((prev) => ({
        ...prev,
        image: base64,
      }));
    };
  };

  const updateCourse = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `/api/courses/${id}`,
        formData
      );

      alert(
        "Course updated successfully"
      );

      router.push(
        "/admin/courses"
      );
    } catch (error) {
      console.log(error);

      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow">
          Loading Course...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="min-w-0 lg:ml-72">
        <AdminHeader title="Edit Course" />

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-6 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-3xl font-bold">
                    Edit Course
                  </h1>

                  <p className="mt-2 text-blue-100">
                    Update course details
                    and image.
                  </p>
                </div>

                <button
                  onClick={() =>
                    router.push(
                      "/admin/courses"
                    )
                  }
                  className="rounded-xl bg-white px-5 py-3 font-semibold text-blue-700"
                >
                  Back To Courses
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl bg-white shadow-xl">
              <form
                onSubmit={updateCourse}
                className="grid gap-8 p-6 lg:grid-cols-2"
              >
                {/* Left */}
                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Course Title
                    </label>

                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title:
                            e.target.value,
                        })
                      }
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Description
                    </label>

                    <textarea
                      rows={8}
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
                      className="w-full rounded-xl border p-3"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Upload Course Image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageUpload
                      }
                      className="
                        w-full
                        rounded-xl
                        border
                        p-3
                        text-sm
                      "
                    />
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-5">
                  {preview && (
                    <div className="rounded-2xl border bg-slate-50 p-4">
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
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Duration
                      </label>

                      <input
                        type="text"
                        value={
                          formData.duration
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            duration:
                              e.target
                                .value,
                          })
                        }
                        className="w-full rounded-xl border p-3"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Price
                      </label>

                      <input
                        type="number"
                        value={
                          formData.price
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price:
                              e.target
                                .value,
                          })
                        }
                        className="w-full rounded-xl border p-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold">
                      Level
                    </label>

                    <select
                      value={
                        formData.level
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          level:
                            e.target
                              .value,
                        })
                      }
                      className="w-full rounded-xl border p-3"
                    >
                      <option>
                        Beginner
                      </option>
                      <option>
                        Intermediate
                      </option>
                      <option>
                        Advanced
                      </option>
                    </select>
                  </div>

                  <div className="rounded-2xl bg-blue-50 p-5">
                    <h3 className="font-bold text-blue-900">
                      Course Summary
                    </h3>

                    <div className="mt-3 space-y-2 text-sm">
                      <p>
                        <strong>
                          Duration:
                        </strong>{" "}
                        {
                          formData.duration
                        }
                      </p>

                      <p>
                        <strong>
                          Price:
                        </strong>{" "}
                        ₹
                        {
                          formData.price
                        }
                      </p>

                      <p>
                        <strong>
                          Level:
                        </strong>{" "}
                        {
                          formData.level
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 lg:col-span-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(
                        "/admin/courses"
                      )
                    }
                    className="flex-1 rounded-xl border px-5 py-3"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    {saving
                      ? "Updating..."
                      : "Update Course"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

