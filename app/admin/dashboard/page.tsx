"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { MessageSquare, FileSignature, BellRing, ArrowRight } from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import { StatCard } from "@/components/admin/ui";

interface ContactItem {
  _id: string;
  name: string;
  email: string;
  service?: string;
  message: string;
  createdAt: string;
}

interface QuoteItem {
  _id: string;
  name: string;
  service: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

type ActivityItem = {
  id: string;
  kind: "contact" | "quote";
  title: string;
  subtitle: string;
  createdAt: string;
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString();
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export default function DashboardPage() {
  useAdminPage("Dashboard");

  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [quotes, setQuotes] = useState<QuoteItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [c, q] = await Promise.all([
          axios.get("/api/contact").catch(() => null),
          axios.get("/api/quotes").catch(() => null),
        ]);
        if (c?.data?.success) setContacts(c.data.data || []);
        if (q?.data?.success) setQuotes(q.data.data || []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const newQuotes = quotes.filter((q) => q.status === "new").length;
  const newToday =
    contacts.filter((c) => isToday(c.createdAt)).length +
    quotes.filter((q) => isToday(q.createdAt)).length;

  const activity = useMemo<ActivityItem[]>(() => {
    const merged: ActivityItem[] = [
      ...contacts.map((c) => ({
        id: c._id,
        kind: "contact" as const,
        title: `Message from ${c.name}`,
        subtitle: c.service ? `${c.service} · ${c.email}` : c.email,
        createdAt: c.createdAt,
      })),
      ...quotes.map((q) => ({
        id: q._id,
        kind: "quote" as const,
        title: `Quote request from ${q.name}`,
        subtitle: q.service,
        createdAt: q.createdAt,
      })),
    ];
    return merged
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
      .slice(0, 8);
  }, [contacts, quotes]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Contact Messages"
          value={loading ? "…" : contacts.length}
          icon={<MessageSquare size={22} />}
          description="Total messages from clients"
          variant="sage"
        />
        <StatCard
          title="Quote Requests"
          value={loading ? "…" : quotes.length}
          icon={<FileSignature size={22} />}
          description="Total quote requests received"
          variant="teal"
        />
        <StatCard
          title="New Quote Requests"
          value={loading ? "…" : newQuotes}
          icon={<BellRing size={22} />}
          description={`${newToday} new submission${newToday === 1 ? "" : "s"} today`}
          variant="gold"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 xl:gap-6">
        <div
          className="admin-card p-6 xl:col-span-2"
          style={{ borderRadius: "var(--admin-radius-lg)" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2
                className="text-lg font-bold tracking-tight"
                style={{ color: "var(--page-fg)" }}
              >
                Recent Activity
              </h2>
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--admin-text-muted)" }}
              >
                Latest messages and quote requests from clients
              </p>
            </div>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: "var(--admin-accent-softer)",
                color: "var(--admin-accent)",
              }}
            >
              <span
                className="admin-live-dot h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--admin-accent)" }}
              />
              Live
            </span>
          </div>

          {loading ? (
            <div className="space-y-3" aria-hidden>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-14 rounded-[12px]" />
              ))}
            </div>
          ) : activity.length === 0 ? (
            <p
              className="py-10 text-center text-sm"
              style={{ color: "var(--admin-text-muted)" }}
            >
              No messages or quote requests yet.
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {activity.map((item) => {
                const isQuote = item.kind === "quote";
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-[12px] px-1 py-3 transition-colors duration-200 hover:bg-[var(--admin-muted)]"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]"
                      style={{
                        backgroundColor: isQuote
                          ? "var(--admin-gold-soft)"
                          : "var(--admin-accent-soft)",
                        color: isQuote
                          ? "var(--admin-gold)"
                          : "var(--admin-accent)",
                      }}
                    >
                      {isQuote ? (
                        <FileSignature size={17} />
                      ) : (
                        <MessageSquare size={17} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className="truncate text-sm font-medium"
                        style={{ color: "var(--page-fg)" }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="mt-0.5 truncate text-xs"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        {item.subtitle}
                      </p>
                    </div>
                    <time
                      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        backgroundColor: "var(--admin-muted)",
                        color: "var(--admin-text-muted)",
                      }}
                    >
                      {timeAgo(item.createdAt)}
                    </time>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div
          className="admin-card flex flex-col gap-4 p-6"
          style={{ borderRadius: "var(--admin-radius-lg)" }}
        >
          <div>
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--page-fg)" }}
            >
              Quick Links
            </h2>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--admin-text-muted)" }}
            >
              Manage client submissions
            </p>
          </div>

          <QuickLink
            href="/admin/contact"
            label="Contact Messages"
            count={contacts.length}
            icon={<MessageSquare size={18} />}
          />
          <QuickLink
            href="/admin/quotes"
            label="Quote Requests"
            count={quotes.length}
            badge={newQuotes > 0 ? `${newQuotes} new` : undefined}
            icon={<FileSignature size={18} />}
          />
        </div>
      </div>
    </>
  );
}

function QuickLink({
  href,
  label,
  count,
  badge,
  icon,
}: {
  href: string;
  label: string;
  count: number;
  badge?: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-[12px] border p-4 transition-colors duration-200 hover:bg-[var(--admin-muted)]"
      style={{
        borderColor: "var(--admin-border)",
        backgroundColor: "var(--admin-surface)",
      }}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]"
        style={{
          backgroundColor: "var(--admin-accent-soft)",
          color: "var(--admin-accent)",
        }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--page-fg)" }}
          >
            {label}
          </p>
          {badge && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{
                backgroundColor: "var(--admin-gold-soft)",
                color: "var(--admin-gold)",
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
          {count} total
        </p>
      </div>
      <ArrowRight
        size={16}
        className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
        style={{ color: "var(--admin-text-muted)" }}
      />
    </Link>
  );
}
