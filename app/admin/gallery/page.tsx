"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface GalleryItem {
  _id: string;
  title: string;
  image: string;
  alt: string;
  categories: string[];
  badge?: string;
}

export default function GalleryPage() {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="min-w-0 lg:ml-72">
        <AdminHeader title="Gallery" />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Gallery Images
              </h2>

              <p className="mt-1 text-sm text-gray-500 sm:text-base">
                Manage all gallery images
              </p>
            </div>

            <Link
              href="/admin/gallery/create"
              className="inline-flex w-full items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
            >
              Add New
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex h-48 items-center justify-center">
              <div className="text-base font-medium text-gray-600 sm:text-lg">
                Loading...
              </div>
            </div>
          ) : gallery.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm sm:rounded-3xl sm:p-10">
              <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">
                No Gallery Images
              </h3>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Add your first gallery image
              </p>

              <Link
                href="/admin/gallery/create"
                className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
              >
                Create Gallery
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
              {gallery.map((item) => (
                <div
                  key={item._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative flex min-h-[250px] items-center justify-center bg-gray-100 p-2 sm:min-h-[280px] md:min-h-[320px]">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      width={1200}
                      height={800}
                      sizes="100vw"
                      className="max-h-[320px] w-full object-contain"
                    />

                    {item.badge && (
                      <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-medium text-white sm:text-sm">
                        {item.badge}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5">
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-xs text-gray-500 sm:text-sm">
                      {item.alt}
                    </p>

                    {/* Categories */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.categories.map((category, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-medium capitalize text-gray-700 sm:text-xs"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button className="flex-1 rounded-xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                        Edit
                      </button>

                      <button className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}