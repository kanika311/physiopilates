"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface CourseItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  price: string;
  level: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/courses");

      setCourses(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.log(error);
      alert("Failed to delete course");
    }
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [courses, search]);

  const totalRevenue = courses.reduce(
    (sum, course) =>
      sum + Number(course.price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="min-w-0 lg:ml-72">
        <AdminHeader title="Courses" />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* HERO */}
          <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold lg:text-4xl">
                  Courses Dashboard
                </h1>

                <p className="mt-3 text-blue-100">
                  Manage your courses, pricing,
                  levels and content from one
                  place.
                </p>
              </div>

              <Link
                href="/admin/courses/create"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white
                  px-6
                  py-3
                  font-semibold
                  text-blue-700
                  shadow-lg
                  transition
                  hover:scale-105
                "
              >
                + Create Course
              </Link>
            </div>
          </div>

          {/* STATS */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Courses
              </p>

              <h3 className="mt-2 text-3xl font-bold text-slate-900">
                {courses.length}
              </h3>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Beginner Courses
              </p>

              <h3 className="mt-2 text-3xl font-bold text-green-600">
                {
                  courses.filter(
                    (c) =>
                      c.level ===
                      "Beginner"
                  ).length
                }
              </h3>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Advanced Courses
              </p>

              <h3 className="mt-2 text-3xl font-bold text-red-600">
                {
                  courses.filter(
                    (c) =>
                      c.level ===
                      "Advanced"
                  ).length
                }
              </h3>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">
                Total Revenue
              </p>

              <h3 className="mt-2 text-3xl font-bold text-blue-600">
                ₹{totalRevenue}
              </h3>
            </div>
          </div>

          {/* SEARCH */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-5
                py-4
                outline-none
                transition
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
              "
            />
          </div>

          {/* LOADING */}
          {loading && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
              Loading courses...
            </div>
          )}

          {/* EMPTY */}
          {!loading &&
            filteredCourses.length ===
              0 && (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
                <h3 className="text-2xl font-bold">
                  No Courses Found
                </h3>

                <p className="mt-2 text-slate-500">
                  Create your first
                  course.
                </p>

                <Link
                  href="/admin/courses/create"
                  className="
                    mt-5
                    inline-flex
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                  "
                >
                  Create Course
                </Link>
              </div>
            )}

          {/* COURSES */}
          {!loading &&
            filteredCourses.length >
              0 && (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map(
                  (course) => (
                    <div
                      key={
                        course._id
                      }
                      className="
                        group
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        shadow-sm
                        transition-all
                        duration-300
                        hover:-translate-y-2
                        hover:shadow-2xl
                      "
                    >
                      {/* IMAGE */}
                      <div className="relative h-60 overflow-hidden">
                     <div className="relative h-60 bg-slate-50">
  <Image
    src={course.image}
    alt={course.title}
    fill
    className="
      object-contain
      p-5
      transition-all
      duration-500
      group-hover:scale-105
    "
  />
</div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        <span
                          className="
                          absolute
                          left-4
                          top-4
                          rounded-full
                          bg-white
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          text-slate-800
                        "
                        >
                          {
                            course.level
                          }
                        </span>
                      </div>

                      {/* CONTENT */}
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-slate-900">
                          {
                            course.title
                          }
                        </h3>

                        <p className="mt-3 line-clamp-3 text-sm text-slate-500">
                          {
                            course.description
                          }
                        </p>

                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-2xl font-bold text-blue-600">
                            ₹
                            {
                              course.price
                            }
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                            {
                              course.duration
                            }
                          </span>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                          <Link
                            href={`/admin/courses/edit/${course._id}`}
                            className="
                              flex-1
                              rounded-xl
                              bg-green-600
                              px-4
                              py-2.5
                              text-center
                              text-sm
                              font-semibold
                              text-white
                              transition
                              hover:bg-green-700
                            "
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() =>
                              deleteCourse(
                                course._id
                              )
                            }
                            className="
                              flex-1
                              rounded-xl
                              bg-red-600
                              px-4
                              py-2.5
                              text-sm
                              font-semibold
                              text-white
                              transition
                              hover:bg-red-700
                            "
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
        </main>
      </div>
    </div>
  );
}