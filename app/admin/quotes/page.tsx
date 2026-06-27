"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import {
  AdminButton,
  AdminModal,
  EmptyState,
  LoadingState,
  PageHeader,
} from "@/components/admin/ui";

interface QuoteItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  message?: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

const STATUS_STYLES: Record<
  QuoteItem["status"],
  { label: string; bg: string; color: string }
> = {
  new: { label: "New", bg: "rgb(15 109 109 / 0.12)", color: "rgb(15 109 109)" },
  contacted: {
    label: "Contacted",
    bg: "rgb(234 179 8 / 0.15)",
    color: "rgb(161 98 7)",
  },
  closed: {
    label: "Closed",
    bg: "rgb(107 114 128 / 0.15)",
    color: "rgb(75 85 99)",
  },
};

export default function QuotesPage() {
  useAdminPage("Quote Requests");

  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<QuoteItem | null>(null);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get("/api/quotes");
      setQuotes(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, status: QuoteItem["status"]) => {
    try {
      await axios.put(`/api/quotes/${id}`, { status });
      setQuotes((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status } : q))
      );
      setSelected((prev) =>
        prev && prev._id === id ? { ...prev, status } : prev
      );
    } catch (error) {
      console.log(error);
      alert("Failed to update status");
    }
  };

  const deleteQuote = async (id: string) => {
    if (!window.confirm("Delete this quote request?")) return;
    try {
      await axios.delete(`/api/quotes/${id}`);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      setSelected(null);
    } catch (error) {
      console.log(error);
      alert("Failed to delete quote");
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <>
      <PageHeader
        title="Quote Requests"
        description="Quote requests submitted from service pages"
      />

      {loading ? (
        <LoadingState message="Loading quote requests..." />
      ) : quotes.length === 0 ? (
        <EmptyState
          title="No Quote Requests"
          description="Quote requests from the website will appear here"
        />
      ) : (
        <div className="mt-5 flex flex-col gap-3">
          {quotes.map((q) => {
            const st = STATUS_STYLES[q.status] || STATUS_STYLES.new;
            return (
              <div
                key={q._id}
                className="admin-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
                style={{ borderRadius: "var(--admin-radius-lg)" }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className="truncate text-base font-bold"
                      style={{ color: "var(--page-fg)" }}
                    >
                      {q.name}
                    </h3>
                    <span
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold"
                      style={{ backgroundColor: st.bg, color: st.color }}
                    >
                      {st.label}
                    </span>
                  </div>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    <span className="font-medium">{q.service}</span> · {q.email}{" "}
                    · {q.phone}
                  </p>
                  <p
                    className="mt-0.5 text-[12px]"
                    style={{ color: "var(--admin-text-muted)" }}
                  >
                    {formatDate(q.createdAt)}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  <AdminButton variant="outline" onClick={() => setSelected(q)}>
                    View
                  </AdminButton>
                  <AdminButton
                    variant="danger"
                    onClick={() => deleteQuote(q._id)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selected && (
        <AdminModal
          title={selected.name}
          subtitle={`Quote request · ${selected.service}`}
          badge={
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
              style={{
                backgroundColor: (STATUS_STYLES[selected.status] || STATUS_STYLES.new).bg,
                color: (STATUS_STYLES[selected.status] || STATUS_STYLES.new).color,
              }}
            >
              {(STATUS_STYLES[selected.status] || STATUS_STYLES.new).label}
            </span>
          }
          onClose={() => setSelected(null)}
          footer={
            <>
              <AdminButton
                variant="danger"
                onClick={() => deleteQuote(selected._id)}
              >
                Delete
              </AdminButton>
              {selected.status !== "contacted" && (
                <AdminButton
                  variant="outline"
                  onClick={() => updateStatus(selected._id, "contacted")}
                >
                  Mark Contacted
                </AdminButton>
              )}
              {selected.status !== "closed" && (
                <AdminButton
                  variant="outline"
                  onClick={() => updateStatus(selected._id, "closed")}
                >
                  Mark Closed
                </AdminButton>
              )}
              <AdminButton variant="primary" onClick={() => setSelected(null)}>
                Close
              </AdminButton>
            </>
          }
        >
          <div
            className="grid grid-cols-1 overflow-hidden rounded-[12px] border sm:grid-cols-2"
            style={{ borderColor: "var(--admin-border)" }}
          >
            <Detail label="Email" value={selected.email} href={`mailto:${selected.email}`} />
            <Detail label="Phone" value={selected.phone} href={`tel:${selected.phone}`} />
            <Detail label="Service" value={selected.service} />
            <Detail
              label="Preferred Date"
              value={selected.preferredDate || "—"}
            />
            <Detail
              label="Submitted"
              value={formatDate(selected.createdAt)}
              full
            />
          </div>

          {selected.message ? (
            <div
              className="mt-4 rounded-[12px] border p-4"
              style={{
                borderColor: "var(--admin-border)",
                backgroundColor: "var(--admin-muted)",
              }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--admin-text-muted)" }}
              >
                Requirements
              </p>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed">
                {selected.message}
              </p>
            </div>
          ) : null}
        </AdminModal>
      )}
    </>
  );
}

function Detail({
  label,
  value,
  href,
  full,
}: {
  label: string;
  value: string;
  href?: string;
  full?: boolean;
}) {
  return (
    <div
      className={`border-b px-4 py-3 sm:[&:nth-last-child(-n+1)]:border-b-0 ${
        full ? "sm:col-span-2" : "sm:odd:border-r"
      }`}
      style={{ borderColor: "var(--admin-border)" }}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-wide"
        style={{ color: "var(--admin-text-muted)" }}
      >
        {label}
      </p>
      {href ? (
        <a
          href={href}
          className="mt-0.5 block truncate text-sm font-medium hover:underline"
          style={{ color: "var(--admin-accent)" }}
        >
          {value}
        </a>
      ) : (
        <p className="mt-0.5 text-sm font-medium" style={{ color: "var(--page-fg)" }}>
          {value}
        </p>
      )}
    </div>
  );
}
