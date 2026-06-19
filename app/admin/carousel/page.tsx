"use client";

import axios from "axios";
import Image from "next/image";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminBadge,
  AdminButton,
  DataTable,
  EmptyState,
  LoadingState,
  PageHeader,
  SectionCard,
} from "@/components/admin/ui";

interface Carousel {
  _id: string;
  title: string;
  image: string;
  order: number;
  status?: boolean;
}

export default function CarouselList() {
  useAdminPage("Carousel");

  const [data, setData] = useState<Carousel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/carousel");
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

  const remove = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this carousel?"
    );
    if (!confirmDelete) return;
    try {
      await axios.delete(`/api/carousel/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete carousel");
    }
  };

  return (
    <>
      <PageHeader
        title="Carousel CMS"
        description="Manage homepage sliders and banners"
        action={
          <AdminButton href="/admin/carousel/create">
            <Plus size={18} />
            Add Carousel
          </AdminButton>
        }
      />

      {loading ? (
        <LoadingState />
      ) : (
        <>
          <div className="hidden lg:block">
            <DataTable>
              <DataTable.Table>
                <DataTable.Head>
                  <DataTable.HeaderCell>Image</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Title</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Order</DataTable.HeaderCell>
                  <DataTable.HeaderCell>Status</DataTable.HeaderCell>
                  <DataTable.HeaderCell className="text-center">
                    Actions
                  </DataTable.HeaderCell>
                </DataTable.Head>
                <DataTable.Body>
                  {data.length > 0 ? (
                    data.map((item) => (
                      <DataTable.Row key={item._id}>
                        <DataTable.Cell>
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={120}
                            height={70}
                            className="rounded-[10px] object-cover"
                          />
                        </DataTable.Cell>
                        <DataTable.Cell className="font-medium">
                          {item.title}
                        </DataTable.Cell>
                        <DataTable.Cell>{item.order}</DataTable.Cell>
                        <DataTable.Cell>
                          <AdminBadge
                            variant={item.status ? "success" : "warning"}
                          >
                            {item.status ? "Active" : "Inactive"}
                          </AdminBadge>
                        </DataTable.Cell>
                        <DataTable.Cell>
                          <div className="flex justify-center gap-2">
                            <AdminButton
                              href={`/admin/carousel/edit/${item._id}`}
                              variant="outline"
                            >
                              <Pencil size={16} />
                              Edit
                            </AdminButton>
                            <AdminButton
                              variant="danger"
                              onClick={() => remove(item._id)}
                            >
                              <Trash2 size={16} />
                              Delete
                            </AdminButton>
                          </div>
                        </DataTable.Cell>
                      </DataTable.Row>
                    ))
                  ) : (
                    <DataTable.Row>
                      <DataTable.Cell colSpan={5}>
                        <EmptyState
                          title="No Carousel Found"
                          description="Create your first carousel banner."
                          action={
                            <AdminButton href="/admin/carousel/create">
                              <Plus size={18} />
                              Create Carousel
                            </AdminButton>
                          }
                        />
                      </DataTable.Cell>
                    </DataTable.Row>
                  )}
                </DataTable.Body>
              </DataTable.Table>
            </DataTable>
          </div>

          <div className="space-y-4 lg:hidden">
            {data.length > 0 ? (
              data.map((item) => (
                <SectionCard key={item._id} noPadding>
                  <div className="p-4">
                    <div className="flex gap-4">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={80}
                        className="rounded-[10px] object-cover"
                      />
                      <div className="flex-1">
                        <h3
                          className="font-semibold"
                          style={{ color: "var(--page-fg)" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="mt-1 text-sm"
                          style={{ color: "var(--admin-text-muted)" }}
                        >
                          Order: {item.order}
                        </p>
                        <div className="mt-2">
                          <AdminBadge
                            variant={item.status ? "success" : "warning"}
                          >
                            {item.status ? "Active" : "Inactive"}
                          </AdminBadge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <AdminButton
                        href={`/admin/carousel/edit/${item._id}`}
                        fullWidth
                      >
                        <Pencil size={16} />
                        Edit
                      </AdminButton>
                      <AdminButton
                        variant="danger"
                        fullWidth
                        onClick={() => remove(item._id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </AdminButton>
                    </div>
                  </div>
                </SectionCard>
              ))
            ) : (
              <EmptyState
                title="No Carousel Found"
                description="Create your first carousel banner."
                action={
                  <AdminButton href="/admin/carousel/create">
                    <Plus size={18} />
                    Create Carousel
                  </AdminButton>
                }
              />
            )}
          </div>
        </>
      )}
    </>
  );
}
