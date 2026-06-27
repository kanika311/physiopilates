"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  DataTable,
  EmptyState,
  FormCard,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";

interface Student {
  _id: string;
  name: string;
  number: string;
  email: string;
  enrollmentNumber: string;
}

const emptyForm = {
  name: "",
  number: "",
  email: "",
  enrollmentNumber: "",
};

const PAGE_SIZE = 10;

export default function StudentsPage() {
  useAdminPage("Students");

  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(emptyForm);

  const [page, setPage] = useState(1);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/admin/students");
      setStudents(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const totalPages = Math.max(1, Math.ceil(students.length / PAGE_SIZE));

  const pageStudents = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return students.slice(start, start + PAGE_SIZE);
  }, [students, page]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openCreate = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setView("form");
  };

  const openEdit = (student: Student) => {
    setFormData({
      name: student.name,
      number: student.number,
      email: student.email,
      enrollmentNumber: student.enrollmentNumber,
    });
    setEditingId(student._id);
    setView("form");
  };

  const backToList = () => {
    setView("list");
    setEditingId(null);
  };

  const deleteStudent = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/admin/students/${id}`);
      setStudents((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete student");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      if (editingId) {
        await axios.put(`/api/admin/students/${editingId}`, formData);
      } else {
        await axios.post("/api/admin/students/create", formData);
      }
      setFormData(emptyForm);
      setEditingId(null);
      await fetchStudents();
      setView("list");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (view === "form") {
    return (
      <>
        <div className="mb-5">
          <AdminButton variant="ghost" onClick={backToList}>
            <ArrowLeft size={16} />
            Back to Students
          </AdminButton>
        </div>

        <FormCard
          title={editingId ? "Edit Student" : "Add Student"}
          description="Manage student records"
          maxWidth="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <AdminField label="Name">
              <AdminInput
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Phone Number">
              <AdminInput
                type="tel"
                required
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Email">
              <AdminInput
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Enrollment Number">
              <AdminInput
                type="text"
                required
                value={formData.enrollmentNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    enrollmentNumber: e.target.value,
                  })
                }
              />
            </AdminField>

            <div className="flex flex-col gap-3 sm:flex-row">
              <AdminButton type="submit" disabled={saving} fullWidth>
                {saving
                  ? "Please wait..."
                  : editingId
                  ? "Update Student"
                  : "Add Student"}
              </AdminButton>
              <AdminButton
                type="button"
                variant="outline"
                fullWidth
                onClick={backToList}
              >
                Cancel
              </AdminButton>
            </div>
          </form>
        </FormCard>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Manage Students"
        description=""
        action={<AdminButton onClick={openCreate}>Add New</AdminButton>}
      />

      {loading ? (
        <LoadingState message="Loading students..." />
      ) : students.length === 0 ? (
        <EmptyState
          title="No Students Found"
          description="Add your first student record"
          action={<AdminButton onClick={openCreate}>Add Student</AdminButton>}
        />
      ) : (
        <div className="mt-5 space-y-4">
          <DataTable>
            <DataTable.Table>
              <DataTable.Head>
                <DataTable.HeaderCell>#</DataTable.HeaderCell>
                <DataTable.HeaderCell>Name</DataTable.HeaderCell>
                <DataTable.HeaderCell>Number</DataTable.HeaderCell>
                <DataTable.HeaderCell>Email</DataTable.HeaderCell>
                <DataTable.HeaderCell>Enrollment No.</DataTable.HeaderCell>
                <DataTable.HeaderCell className="text-right">
                  Actions
                </DataTable.HeaderCell>
              </DataTable.Head>
              <DataTable.Body>
                {pageStudents.map((student, index) => (
                  <DataTable.Row key={student._id}>
                    <DataTable.Cell
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      {(page - 1) * PAGE_SIZE + index + 1}
                    </DataTable.Cell>
                    <DataTable.Cell className="font-semibold">
                      {student.name}
                    </DataTable.Cell>
                    <DataTable.Cell>{student.number}</DataTable.Cell>
                    <DataTable.Cell>{student.email}</DataTable.Cell>
                    <DataTable.Cell>{student.enrollmentNumber}</DataTable.Cell>
                    <DataTable.Cell>
                      <div className="flex justify-end gap-2">
                        <AdminButton
                          variant="primary"
                          onClick={() => openEdit(student)}
                        >
                          Edit
                        </AdminButton>
                        <AdminButton
                          variant="danger"
                          onClick={() => deleteStudent(student._id)}
                        >
                          Delete
                        </AdminButton>
                      </div>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable.Body>
            </DataTable.Table>
          </DataTable>

          {totalPages > 1 && (
            <div className="flex items-center justify-between gap-3">
              <p
                className="text-sm"
                style={{ color: "var(--admin-text-muted)" }}
              >
                Showing {(page - 1) * PAGE_SIZE + 1}–
                {Math.min(page * PAGE_SIZE, students.length)} of{" "}
                {students.length}
              </p>
              <div className="flex items-center gap-2">
                <AdminButton
                  variant="outline"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft size={16} />
                  Prev
                </AdminButton>
                <span
                  className="px-2 text-sm font-medium"
                  style={{ color: "var(--page-fg)" }}
                >
                  {page} / {totalPages}
                </span>
                <AdminButton
                  variant="outline"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                  <ChevronRight size={16} />
                </AdminButton>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
