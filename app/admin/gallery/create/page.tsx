"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function CreateGalleryPage() {
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    alt: "",
    categories: "",
    badge: "",
  });

  // Upload image -> base64
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

      setFormData((prev) => ({
        ...prev,
        image: base64,
      }));
    };
  };

  // Submit form
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
        badge: formData.badge,
      };

      const response = await axios.post(
        "/api/admin/gallary/create",
        payload
      );

      alert(response.data.message);

      setFormData({
        title: "",
        image: "",
        alt: "",
        categories: "",
        badge: "",
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

      {/* Content Area */}
      <div className="min-w-0 lg:ml-72">
        <AdminHeader title="Create Gallery" />

        <main className="p-4 sm:p-6 lg:p-8">
          <div
            className="
              mx-auto
              w-full
              max-w-4xl
              rounded-2xl
              sm:rounded-3xl
              bg-white
              p-4
              sm:p-6
              lg:p-8
              shadow-sm
            "
          >
            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Add Gallery Image
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Upload and manage gallery images
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-4 sm:mt-8 sm:space-y-5"
            >
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Title
                </label>

                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="
                    h-11
                    sm:h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-sm
                    sm:text-base
                    outline-none
                    transition
                    focus:border-black
                  "
                />
              </div>

              {/* Upload */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Upload Image
                </label>

                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleImageUpload}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    p-3
                    text-sm
                    file:mr-4
                    file:rounded-lg
                    file:border-0
                    file:bg-black
                    file:px-4
                    file:py-2
                    file:text-sm
                    file:font-medium
                    file:text-white
                    hover:file:opacity-90
                  "
                />
              </div>

              {/* Preview */}
              {preview && (
                <div
                  className="
                    overflow-hidden
                    rounded-xl
                    border
                    bg-gray-50
                    sm:rounded-2xl
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      items-center
                      justify-center
                      h-[220px]
                      sm:h-[300px]
                      md:h-[400px]
                      lg:h-[500px]
                      w-full
                    "
                  >
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      sizes="100vw"
                      className="object-contain p-2"
                    />
                  </div>
                </div>
              )}

              {/* Alt Text */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Alt Text
                </label>

                <input
                  type="text"
                  required
                  value={formData.alt}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      alt: e.target.value,
                    })
                  }
                  className="
                    h-11
                    sm:h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-sm
                    sm:text-base
                    outline-none
                    transition
                    focus:border-black
                  "
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  required
                  value={formData.categories}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      categories: e.target.value,
                    })
                  }
                  className="
                    h-11
                    sm:h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-sm
                    sm:text-base
                    outline-none
                    transition
                    focus:border-black
                  "
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="physiotherapy">
                    Physiotherapy
                  </option>

                  <option value="pilates">
                    Pilates
                  </option>

                  <option value="yoga">
                    Yoga
                  </option>

                  <option value="therapy">
                    Therapy
                  </option>
                </select>
              </div>

              {/* Badge */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Badge
                </label>

                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      badge: e.target.value,
                    })
                  }
                  placeholder="Featured, New, Popular..."
                  className="
                    h-11
                    sm:h-12
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    px-4
                    text-sm
                    sm:text-base
                    outline-none
                    transition
                    focus:border-black
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  h-11
                  sm:h-12
                  w-full
                  rounded-xl
                  bg-black
                  text-sm
                  sm:text-base
                  font-medium
                  text-white
                  transition
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Please wait..."
                  : "Create Gallery"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}