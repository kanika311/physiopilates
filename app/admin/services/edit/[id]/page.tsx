"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    getService();
  }, []);

  const getService = async () => {
    try {
      const res = await fetch(`/api/services/${id}`);
      const data = await res.json();

      setFormData({
        name: data.name || "",
        slug: data.slug || "",
        shortDescription: data.shortDescription || "",
        description: data.description || "",
        image: data.image || "",
        icon: data.icon || "",
        order: data.order || 0,
        featured: data.featured || false,
        status: data.status,
        seoTitle: data.seoTitle || "",
        seoDescription: data.seoDescription || "",
        seoKeywords: data.seoKeywords || "",
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckbox = (e: any) => {
    const { name, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const updateService = async (e: any) => {
    e.preventDefault();

    const res = await fetch(`/api/services/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data._id) {
      alert("Service Updated Successfully");
      router.push("/admin/services");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Edit Service
      </h1>

      <form
        onSubmit={updateService}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="shortDescription"
          placeholder="Short Description"
          value={formData.shortDescription}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          rows={6}
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="icon"
          placeholder="Icon"
          value={formData.icon}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="order"
          value={formData.order}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

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

        <input
          type="text"
          name="seoTitle"
          placeholder="SEO Title"
          value={formData.seoTitle}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="seoDescription"
          placeholder="SEO Description"
          value={formData.seoDescription}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="seoKeywords"
          placeholder="SEO Keywords"
          value={formData.seoKeywords}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Service
        </button>

      </form>

    </div>
  );
}