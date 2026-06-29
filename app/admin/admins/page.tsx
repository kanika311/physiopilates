"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

interface AdminUser {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
}

const emptyForm = { email: "", password: "", role: "admin" };

export default function AdminsPage() {
  useAdminPage("Admins");

  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("/api/admin/admins");
      if (res.data.success) setAdmins(res.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setSaving(true);
      const res = await axios.post("/api/admin/admins/create", form);
      if (res.data.success) {
        setForm(emptyForm);
        await fetchAdmins();
      } else {
        setError(res.data.message || "Something went wrong");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const deleteAdmin = async (id: string) => {
    if (!confirm("Remove this admin? They will no longer be able to log in."))
      return;
    try {
      const res = await axios.delete(`/api/admin/admins/${id}`);
      if (res.data.success) {
        setAdmins((prev) => prev.filter((a) => a._id !== id));
      } else {
        alert(res.data.message || "Failed to delete");
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <>
      <PageHeader
        title="Admins"
        description="Create and manage admin accounts that can access this panel."
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[360px_1fr]">
        <FormCard title="Add New Admin" description="Create a new admin login">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}
            <AdminField label="Email">
              <AdminInput
                type="email"
                required
                placeholder="newadmin@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </AdminField>
            <AdminField label="Password">
              <AdminInput
                type="password"
                required
                placeholder="Set a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </AdminField>
            <AdminButton type="submit" disabled={saving} fullWidth>
              {saving ? "Creating..." : "Create Admin"}
            </AdminButton>
          </form>
        </FormCard>

        <div>
          {loading ? (
            <LoadingState message="Loading admins..." />
          ) : admins.length === 0 ? (
            <EmptyState title="No Admins" description="Add your first admin." />
          ) : (
            <DataTable>
              <DataTable.Table>
                <DataTable.Head>
                  <DataTable.HeaderCell>Email</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Role</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Created</DataTable.HeaderCell>
                  <DataTable.HeaderCell className="text-right">
                    Action
                  </DataTable.HeaderCell>
                </DataTable.Head>
                <DataTable.Body>
                  {admins.map((admin) => (
                    <DataTable.Row key={admin._id}>
                      <DataTable.Cell className="font-semibold">
                        {admin.email}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        {admin.role}
                      </DataTable.Cell>
                      <DataTable.Cell
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        {admin.createdAt
                          ? new Date(admin.createdAt).toLocaleDateString()
                          : "—"}
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <div className="flex justify-end">
                          <AdminButton
                            variant="danger"
                            onClick={() => deleteAdmin(admin._id)}
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
          )}
        </div>
      </div>
    </>
  );
}
