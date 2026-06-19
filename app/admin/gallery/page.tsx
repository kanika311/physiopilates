"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  EmptyState,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  alt: string;
  categories: string[];
  badge?: string;
}

export default function GalleryPage() {
  useAdminPage("Gallery");

  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const response = await axios.get("/api/admin/gallary");
      setGallery(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const deleteGallery = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/gallary/${id}`);
      setGallery((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete gallery image");
    }
  };

  return (
    <>
      <PageHeader
        title="Gallery Images"
        description="Manage all gallery images"
        action={
          <AdminButton href="/admin/gallery/create">
            Add New
          </AdminButton>
        }
      />

      {loading ? (
        <LoadingState message="Loading gallery..." />
      ) : gallery.length === 0 ? (
        <EmptyState
          title="No Gallery Images"
          description="Add your first gallery image"
          action={
            <AdminButton href="/admin/gallery/create">
              Create Gallery
            </AdminButton>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {gallery.map((item) => (
            <div
              key={item._id}
              className="admin-card admin-card-hover overflow-hidden"
              style={{ borderRadius: "var(--admin-radius-lg)" }}
            >
              <div
                className="relative flex min-h-[250px] items-center justify-center p-2 sm:min-h-[280px] md:min-h-[320px]"
                style={{ backgroundColor: "var(--admin-muted)" }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  sizes="100vw"
                  className="max-h-[320px] w-full object-contain"
                />
                {item.badge && (
                  <div
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white sm:text-sm"
                    style={{ backgroundColor: "var(--admin-accent)" }}
                  >
                    {item.badge}
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5">
                <h3
                  className="text-lg font-bold sm:text-xl"
                  style={{ color: "var(--page-fg)" }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 line-clamp-2 text-xs sm:text-sm"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  {item.alt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.categories.map((category, index) => (
                    <span
                      key={index}
                      className="rounded-full px-3 py-1 text-[11px] font-medium capitalize sm:text-xs"
                      style={{
                        backgroundColor: "var(--admin-accent-softer)",
                        color: "var(--admin-accent)",
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <AdminButton
                    href={`/admin/gallery/edit/${item._id}`}
                    variant="primary"
                    fullWidth
                  >
                    Edit
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    fullWidth
                    onClick={() => deleteGallery(item._id)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
