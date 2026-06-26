"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddService() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    description: "",
    image: "",
    icon: "",
    order: 0,
    featured: false,
    status: true,
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = e.target;

    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert("Service Added Successfully");
      router.push("/admin/services");
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add Service
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border w-full p-3 rounded"
            required
          />

        </div>

        <div>

          <label>Slug</label>

          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="border w-full p-3 rounded"
            required
          />

        </div>

        <div>

          <label>Short Description</label>

          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div>

          <label>Description</label>

          <textarea
            rows={6}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div>

          <label>Image URL</label>

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div>

          <label>Icon</label>

          <input
            type="text"
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div>

          <label>Order</label>

          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div className="flex gap-8">

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleCheckbox}
            />

            Featured

          </label>

          <label className="flex items-center gap-2">

            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleCheckbox}
            />

            Active

          </label>

        </div>

        <div>

          <label>SEO Title</label>

          <input
            type="text"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div>

          <label>SEO Description</label>

          <textarea
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <div>

          <label>SEO Keywords</label>

          <input
            type="text"
            name="seoKeywords"
            value={formData.seoKeywords}
            onChange={handleChange}
            className="border w-full p-3 rounded"
          />

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Service
        </button>

      </form>

    </div>
  );
}