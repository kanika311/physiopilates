"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Image from "next/image";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  EmptyState,
  LoadingState,
  PageHeader,
  SearchBar,
  StatCard,
} from "@/components/admin/ui";
import { BookOpen, IndianRupee, GraduationCap, Layers } from "lucide-react";

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
  useAdminPage("Courses");

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
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [courses, search]);

  const totalRevenue = courses.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0
  );

  return (
    <>
      <PageHeader
        title="Courses Dashboard"
        description="Manage your courses, pricing, levels and content from one place."
        action={
          <AdminButton href="/admin/courses/create">
            + Create Course
          </AdminButton>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Courses"
          value={courses.length}
          icon={<Layers size={22} />}
          variant="sage"
        />
        <StatCard
          title="Beginner Courses"
          value={courses.filter((c) => c.level === "Beginner").length}
          icon={<GraduationCap size={22} />}
          variant="teal"
        />
        <StatCard
          title="Advanced Courses"
          value={courses.filter((c) => c.level === "Advanced").length}
          icon={<BookOpen size={22} />}
          variant="gold"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${totalRevenue}`}
          icon={<IndianRupee size={22} />}
          variant="sageMuted"
        />
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search courses..."
      />

      {loading && <LoadingState message="Loading courses..." />}

      {!loading && filteredCourses.length === 0 && (
        <EmptyState
          title="No Courses Found"
          description="Create your first course."
          action={
            <AdminButton href="/admin/courses/create">
              Create Course
            </AdminButton>
          }
        />
      )}

      {!loading && filteredCourses.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="admin-card admin-card-hover group overflow-hidden"
              style={{ borderRadius: "var(--admin-radius-lg)" }}
            >
              <div
                className="relative h-60 overflow-hidden"
                style={{ backgroundColor: "var(--admin-muted)" }}
              >
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "var(--admin-surface)",
                    color: "var(--page-fg)",
                  }}
                >
                  {course.level}
                </span>
              </div>

              <div className="p-5">
                <h3
                  className="text-xl font-bold"
                  style={{ color: "var(--page-fg)" }}
                >
                  {course.title}
                </h3>
                <p
                  className="mt-3 line-clamp-3 text-sm"
                  style={{ color: "var(--admin-text-muted)" }}
                >
                  {course.description}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "var(--admin-accent)" }}
                  >
                    ₹{course.price}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: "var(--admin-muted)",
                      color: "var(--admin-text-muted)",
                    }}
                  >
                    {course.duration}
                  </span>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <AdminButton
                    href={`/admin/courses/edit/${course._id}`}
                    fullWidth
                  >
                    Edit
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    fullWidth
                    onClick={() => deleteCourse(course._id)}
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
