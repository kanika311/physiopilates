"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  DataTable,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";
import { SERVICE_OVERVIEW_LIST } from "@/lib/serviceOverviews";
import { PAGE_HEROES } from "@/lib/pageHeroes";

interface DbService {
  _id: string;
  name: string;
  slug: string;
  image: string;
  order: number;
  status: boolean;
}

type Row = {
  key: string;
  kind: "builtin" | "custom";
  _id?: string;
  name: string;
  slug: string;
  image?: string;
  order: number | null;
  status: boolean;
};

const TEAL_BTN = {
  background: "linear-gradient(135deg, #0F6D6D 0%, #0c5757 100%)",
  boxShadow: "0 4px 16px rgb(15 109 109 / 0.25)",
};

export default function ServicesPage() {
  useAdminPage("Services");
  const router = useRouter();

  const [services, setServices] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) setServices(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const builtinRows: Row[] = SERVICE_OVERVIEW_LIST.map((s) => ({
    key: `builtin-${s.page}`,
    kind: "builtin",
    name: s.label,
    slug: s.page,
    image: PAGE_HEROES[s.page]?.image,
    order: null,
    status: true,
  }));

  const customRows: Row[] = services.map((s) => ({
    key: `custom-${s._id}`,
    kind: "custom",
    _id: s._id,
    name: s.name,
    slug: s.slug,
    image: s.image,
    order: s.order,
    status: s.status,
  }));

  const rows = [...builtinRows, ...customRows];

  const handleEdit = (row: Row) => {
    if (row.kind === "builtin") {
      router.push(`/admin/services/builtin/${row.slug}`);
    } else {
      router.push(`/admin/services/edit/${row._id}`);
    }
  };

  const handleDelete = async (row: Row) => {
    if (row.kind === "custom") {
      if (!confirm(`Delete service "${row.name}"?`)) return;
      const res = await fetch(`/api/services/${row._id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) fetchServices();
    } else {
      if (
        !confirm(
          `Reset "${row.name}" banner & overview to the original default?\n\nThis is a built-in page, so it can't be removed — its content just goes back to default.`
        )
      )
        return;
      await fetch(`/api/page-content/${row.slug}`, { method: "DELETE" });
      alert("Reset to default");
    }
  };

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage the services shown on your website"
        action={
          <AdminButton
            className="!text-white"
            style={TEAL_BTN}
            onClick={() => router.push("/admin/services/add")}
          >
            <Plus size={16} />
            Add Service
          </AdminButton>
        }
      />

      {loading ? (
        <LoadingState message="Loading services..." />
      ) : (
        <div className="mt-5">
          <DataTable>
            <DataTable.Table>
              <DataTable.Head>
                <DataTable.HeaderCell>Image</DataTable.HeaderCell>
                <DataTable.HeaderCell>Name</DataTable.HeaderCell>
                <DataTable.HeaderCell>Slug</DataTable.HeaderCell>
                <DataTable.HeaderCell>Order</DataTable.HeaderCell>
                <DataTable.HeaderCell>Status</DataTable.HeaderCell>
                <DataTable.HeaderCell className="text-right">
                  Action
                </DataTable.HeaderCell>
              </DataTable.Head>
              <DataTable.Body>
                {rows.map((row) => (
                  <DataTable.Row key={row.key}>
                    <DataTable.Cell>
                      <div
                        className="relative size-12 overflow-hidden rounded-[10px] border"
                        style={{ borderColor: "var(--admin-border)" }}
                      >
                        {row.image ? (
                          <Image
                            src={row.image}
                            alt={row.name}
                            fill
                            sizes="48px"
                            unoptimized
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                    </DataTable.Cell>
                    <DataTable.Cell className="font-semibold">
                      <span className="flex items-center gap-2">
                        {row.name}
                        {row.kind === "builtin" && (
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                            style={{
                              backgroundColor: "var(--admin-accent-softer)",
                              color: "var(--admin-accent)",
                            }}
                          >
                            Built-in
                          </span>
                        )}
                      </span>
                    </DataTable.Cell>
                    <DataTable.Cell style={{ color: "var(--admin-text-muted)" }}>
                      {row.slug}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {row.order === null ? "—" : row.order}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <span
                        className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                        style={{
                          backgroundColor: row.status
                            ? "rgb(34 197 94 / 0.12)"
                            : "rgb(239 68 68 / 0.12)",
                          color: row.status
                            ? "rgb(22 163 74)"
                            : "rgb(220 38 38)",
                        }}
                      >
                        {row.status ? "Active" : "Inactive"}
                      </span>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <div className="flex justify-end gap-2">
                        <AdminButton
                          variant="primary"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </AdminButton>
                        <AdminButton
                          variant="danger"
                          onClick={() => handleDelete(row)}
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
        </div>
      )}
    </>
  );
}
