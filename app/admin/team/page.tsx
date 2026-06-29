"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminField,
  AdminInput,
  AdminTextarea,
  EmptyState,
  FormCard,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";

interface TeamMemberItem {
  _id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
  order: number;
  isActive?: boolean;
}

const emptyForm = {
  name: "",
  role: "",
  bio: "",
  image: "",
  order: 0,
};

export default function TeamPage() {
  useAdminPage("Team");

  const [view, setView] = useState<"list" | "form">("list");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [members, setMembers] = useState<TeamMemberItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState("");
  const [formData, setFormData] = useState(emptyForm);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get("/api/team");
      setMembers(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setPreview("");
    setView("form");
  };

  const openEdit = (m: TeamMemberItem) => {
    setEditingId(m._id);
    setFormData({
      name: m.name,
      role: m.role,
      bio: m.bio,
      image: m.image || "",
      order: m.order || 0,
    });
    setPreview(m.image || "");
    setView("form");
  };

  const backToList = () => {
    setView("list");
    setEditingId(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setFormData((prev) => ({ ...prev, image: base64 }));
    };
  };

  const deleteMember = async (id: string) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await axios.delete(`/api/team/${id}`);
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.log(error);
      alert("Failed to delete team member");
    }
  };

  const toggleActive = async (m: TeamMemberItem) => {
    const nextActive = !(m.isActive !== false);
    setTogglingId(m._id);
    try {
      await axios.put(`/api/team/${m._id}`, { isActive: nextActive });
      setMembers((prev) =>
        prev.map((x) => (x._id === m._id ? { ...x, isActive: nextActive } : x))
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSaving(true);
      const payload = { ...formData, order: Number(formData.order) };

      if (editingId) {
        await axios.put(`/api/team/${editingId}`, payload);
      } else {
        await axios.post("/api/admin/team/create", payload);
      }

      setFormData(emptyForm);
      setPreview("");
      await fetchMembers();
      setView("list");
      setEditingId(null);
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
        <div className="mb-5 flex justify-end">
          <AdminButton variant="ghost" onClick={backToList}>
            <ArrowLeft size={16} />
            Back to Team
          </AdminButton>
        </div>

        <FormCard
          title={editingId ? "Edit Team Member" : "Add Team Member"}
          description="Manage the experts shown in the 'Meet the Team' section"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <AdminField label="Name">
              <AdminInput
                type="text"
                required
                placeholder="Dr. Surbhi Silori"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Role / Title">
              <AdminInput
                type="text"
                required
                placeholder="Lead Physiotherapist & Founder"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Bio">
              <AdminTextarea
                required
                rows={4}
                placeholder="Short description of expertise"
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />
            </AdminField>

            <AdminField label="Display Order">
              <AdminInput
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: Number(e.target.value) })
                }
              />
            </AdminField>

            <AdminField label="Photo">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="admin-focus-ring w-full rounded-[12px] border p-3 text-sm"
                style={{
                  borderColor: "var(--admin-border)",
                  backgroundColor: "var(--admin-muted)",
                }}
              />
            </AdminField>

            {preview && (
              <div className="relative h-44 w-36 overflow-hidden rounded-[12px]">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <AdminButton type="submit" disabled={saving} fullWidth>
                {saving
                  ? "Please wait..."
                  : editingId
                  ? "Update Member"
                  : "Create Member"}
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
        title="Manage Team"
        description="Create, edit and delete the experts shown on the website"
        action={<AdminButton onClick={openCreate}>Add New</AdminButton>}
      />

      {loading ? (
        <LoadingState message="Loading team members..." />
      ) : members.length === 0 ? (
        <EmptyState
          title="No Team Members Yet"
          description="Add your first expert"
          action={<AdminButton onClick={openCreate}>Create Member</AdminButton>}
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {members.map((m) => {
            const active = m.isActive !== false;
            const isToggling = togglingId === m._id;
            const initials = m.name
              .split(" ")
              .map((x) => x[0])
              .join("")
              .slice(0, 2);
            return (
              <div
                key={m._id}
                className="admin-card flex flex-col gap-4 p-3 sm:flex-row sm:items-center"
                style={{ borderRadius: "var(--admin-radius-lg)" }}
              >
                <div
                  className="relative flex h-16 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[10px] text-base font-bold"
                  style={{
                    backgroundColor: "var(--admin-accent-softer)",
                    color: "var(--admin-accent)",
                  }}
                >
                  {m.image ? (
                    <Image
                      src={m.image}
                      alt={m.name}
                      fill
                      sizes="56px"
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className="truncate text-base font-bold"
                      style={{ color: "var(--page-fg)" }}
                    >
                      {m.name}
                    </h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                      style={{
                        backgroundColor: active
                          ? "rgb(34 197 94 / 0.12)"
                          : "rgb(239 68 68 / 0.12)",
                        color: active ? "rgb(22 163 74)" : "rgb(220 38 38)",
                      }}
                    >
                      {active ? "Live" : "Hidden"}
                    </span>
                  </div>
                  <p
                    className="mt-0.5 text-[12px] font-medium"
                    style={{ color: "var(--admin-accent)" }}
                  >
                    {m.role}
                  </p>
                  <p
                    className="mt-1 line-clamp-2 text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {m.bio}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={isToggling}
                    onClick={() => toggleActive(m)}
                    className="admin-focus-ring inline-flex items-center justify-center gap-2 rounded-[10px] px-3 py-2 text-xs font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                    style={{
                      backgroundColor: active
                        ? "rgb(22 163 74)"
                        : "rgb(220 38 38)",
                    }}
                  >
                    {isToggling ? "..." : active ? "Deactivate" : "Activate"}
                  </button>
                  <AdminButton variant="primary" onClick={() => openEdit(m)}>
                    Edit
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    onClick={() => deleteMember(m._id)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
