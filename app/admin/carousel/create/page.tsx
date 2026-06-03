"use client";

import { useState } from "react";
import axios from "axios";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import Image from "next/image";

interface CarouselForm {
  title: string;
  subtitle: string;
  image: string; // Base64 Image
  buttonText: string;
  buttonLink: string;
  order: number;
  status: boolean;
}

export default function CreateCarousel() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CarouselForm>({
    title: "",
    subtitle: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    order: 1,
    status: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "order"
          ? Number(value)
          : value,
    }));
  };

  // Convert Image to Base64
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

  const submit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        "/api/carousel",
        form
      );

      alert(
        "Carousel Created Successfully"
      );

      setForm({
        title: "",
        subtitle: "",
        image: "",
        buttonText: "",
        buttonLink: "",
        order: 1,
        status: true,
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create carousel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="min-w-0 flex-1 lg:ml-72">
        <AdminHeader />

        <div className="mt-16 p-4 sm:p-6 lg:mt-0">
          <div className="mx-auto max-w-5xl">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold md:text-3xl">
                Create Carousel
              </h1>

              <p className="mt-1 text-gray-500">
                Add a new banner slider
              </p>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm md:p-8">
              <form
                onSubmit={submit}
                className="space-y-6"
              >
                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                    placeholder="Enter title"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Subtitle
                  </label>

                  <textarea
                    rows={4}
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                    placeholder="Enter subtitle"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Upload Banner Image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full rounded-xl border border-gray-300 p-3"
                  />
                </div>

                {/* Preview */}
                {form.image && (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Preview
                    </label>

                    <Image
                      src={form.image}
                      alt="Preview"
                      width={600}
                      height={300}
                      className="h-56 w-full rounded-xl border object-cover"
                    />
                  </div>
                )}

                {/* Button Text & Link */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Button Text
                    </label>

                    <input
                      type="text"
                      name="buttonText"
                      value={
                        form.buttonText
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                      placeholder="Learn More"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Button Link
                    </label>

                    <input
                      type="text"
                      name="buttonLink"
                      value={
                        form.buttonLink
                      }
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                      placeholder="/about-us"
                    />
                  </div>
                </div>

                {/* Order & Status */}
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Display Order
                    </label>

                    <input
                      type="number"
                      name="order"
                      value={form.order}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Status
                    </label>

                    <select
                      value={
                        form.status
                          ? "active"
                          : "inactive"
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          status:
                            e.target.value ===
                            "active",
                        })
                      }
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-black focus:outline-none"
                    >
                      <option value="active">
                        Active
                      </option>

                      <option value="inactive">
                        Inactive
                      </option>
                    </select>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-black px-6 py-4 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                  >
                    {loading
                      ? "Saving..."
                      : "Save Carousel"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}