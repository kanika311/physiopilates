"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface Carousel {
  _id: string;
  title: string;
  image: string;
  order: number;
  status?: boolean;
}

export default function CarouselList() {
  const [data, setData] = useState<
    Carousel[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "/api/carousel"
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const remove = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this carousel?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/carousel/${id}`
      );

      setData((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete carousel"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="min-w-0 flex-1 lg:ml-72">
        <AdminHeader />

        <div className="mt-16 p-4 sm:p-6 lg:mt-0">
          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Carousel CMS
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage homepage
                sliders and banners
              </p>
            </div>

            <Link
              href="/admin/carousel/create"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              <Plus size={18} />
              Add Carousel
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              Loading...
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Image
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Title
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Order
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-semibold">
                          Status
                        </th>

                        <th className="px-6 py-4 text-center text-sm font-semibold">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {data.length > 0 ? (
                        data.map(
                          (item) => (
                            <tr
                              key={
                                item._id
                              }
                              className="border-b hover:bg-gray-50"
                            >
                              <td className="px-6 py-4">
                                <Image
                                  src={
                                    item.image
                                  }
                                  alt={
                                    item.title
                                  }
                                  width={
                                    120
                                  }
                                  height={
                                    70
                                  }
                                  className="rounded-lg object-cover"
                                />
                              </td>

                              <td className="px-6 py-4 font-medium">
                                {
                                  item.title
                                }
                              </td>

                              <td className="px-6 py-4">
                                {
                                  item.order
                                }
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    item.status
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {item.status
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </td>

                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <Link
                                    href={`/admin/carousel/edit/${item._id}`}
                                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                                  >
                                    <Pencil
                                      size={
                                        16
                                      }
                                    />
                                    Edit
                                  </Link>

                                  <button
                                    onClick={() =>
                                      remove(
                                        item._id
                                      )
                                    }
                                    className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                  >
                                    <Trash2
                                      size={
                                        16
                                      }
                                    />
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        )
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="p-10 text-center"
                          >
                            <h3 className="text-lg font-semibold">
                              No
                              Carousel
                              Found
                            </h3>

                            <p className="mt-2 text-gray-500">
                              Create
                              your
                              first
                              carousel
                              banner.
                            </p>

                            <Link
                              href="/admin/carousel/create"
                              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white"
                            >
                              <Plus
                                size={
                                  18
                                }
                              />
                              Create
                              Carousel
                            </Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="space-y-4 lg:hidden">
                {data.length > 0 ? (
                  data.map(
                    (item) => (
                      <div
                        key={
                          item._id
                        }
                        className="rounded-2xl bg-white p-4 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <Image
                            src={
                              item.image
                            }
                            alt={
                              item.title
                            }
                            width={
                              100
                            }
                            height={
                              80
                            }
                            className="rounded-lg object-cover"
                          />

                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {
                                item.title
                              }
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                              Order:
                              {
                                item.order
                              }
                            </p>

                            <span
                              className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
                                item.status
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {item.status
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <Link
                            href={`/admin/carousel/edit/${item._id}`}
                            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white"
                          >
                            <Pencil
                              size={
                                16
                              }
                            />
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              remove(
                                item._id
                              )
                            }
                            className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-white"
                          >
                            <Trash2
                              size={
                                16
                              }
                            />
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <h3 className="text-lg font-semibold">
                      No Carousel
                      Found
                    </h3>

                    <p className="mt-2 text-gray-500">
                      Create your
                      first
                      carousel
                      banner.
                    </p>

                    <Link
                      href="/admin/carousel/create"
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white"
                    >
                      <Plus
                        size={18}
                      />
                      Create
                      Carousel
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}