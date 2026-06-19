"use client";

import {
  Users,
  FileText,
  DollarSign,
  Activity,
  UserPlus,
  PenLine,
  CreditCard,
  TrendingUp,
  ShoppingBag,
  Percent,
} from "lucide-react";

import { useAdminPage } from "@/components/admin/AdminPageContext";
import { StatCard } from "@/components/admin/ui";

const recentActivity = [
  {
    label: "New User Registered",
    time: "5 min ago",
    icon: UserPlus,
    tint: "var(--admin-accent)",
    soft: "var(--admin-accent-soft)",
  },
  {
    label: "New Blog Post Published",
    time: "20 min ago",
    icon: PenLine,
    tint: "var(--admin-teal)",
    soft: "var(--admin-teal-soft)",
  },
  {
    label: "Payment Received",
    time: "1 hour ago",
    icon: CreditCard,
    tint: "var(--admin-gold)",
    soft: "var(--admin-gold-soft)",
  },
];

const quickStats = [
  {
    label: "Todays Users",
    value: "56",
    icon: TrendingUp,
    tint: "var(--admin-accent)",
    progress: 56,
  },
  {
    label: "New Orders",
    value: "12",
    icon: ShoppingBag,
    tint: "var(--admin-teal)",
    progress: 24,
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    icon: Percent,
    tint: "var(--admin-gold)",
    progress: 48,
  },
];

export default function DashboardPage() {
  useAdminPage("Dashboard");

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Users"
          value="1,245"
          icon={<Users size={22} />}
          description="Active platform users"
          variant="sage"
          trend="+8.2%"
        />
        <StatCard
          title="Posts"
          value="320"
          icon={<FileText size={22} />}
          description="Published posts"
          variant="teal"
          trend="+3.1%"
        />
        <StatCard
          title="Revenue"
          value="₹45,000"
          icon={<DollarSign size={22} />}
          description="Monthly earnings"
          variant="gold"
          trend="+12.4%"
        />
        <StatCard
          title="Visitors"
          value="8,950"
          icon={<Activity size={22} />}
          description="Website traffic"
          variant="sageMuted"
          trend="+5.7%"
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
                Latest updates across your platform
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

          <div className="relative">
            <div
              className="absolute bottom-4 left-[19px] top-4 w-px"
              style={{
                background:
                  "linear-gradient(180deg, var(--admin-accent) 0%, var(--admin-teal) 50%, var(--admin-gold) 100%)",
                opacity: 0.25,
              }}
            />
            {recentActivity.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === recentActivity.length - 1;
              return (
                <div
                  key={index}
                  className="relative flex gap-4 rounded-[12px] px-1 py-3 transition-colors duration-200 hover:bg-[var(--admin-muted)]"
                >
                  <div className="relative z-10 flex shrink-0">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-[12px] ring-4 ring-[var(--admin-surface)]"
                      style={{
                        backgroundColor: item.soft,
                        color: item.tint,
                      }}
                    >
                      <Icon size={17} />
                    </div>
                  </div>
                  <div
                    className="flex min-w-0 flex-1 items-center justify-between gap-4 pb-3"
                    style={{
                      borderBottom: isLast
                        ? "none"
                        : "1px solid var(--admin-border)",
                    }}
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--page-fg)" }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        System event
                      </p>
                    </div>
                    <time
                      className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{
                        backgroundColor: "var(--admin-muted)",
                        color: "var(--admin-text-muted)",
                      }}
                    >
                      {item.time}
                    </time>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="admin-card p-6"
          style={{ borderRadius: "var(--admin-radius-lg)" }}
        >
          <div className="mb-6">
            <h2
              className="text-lg font-bold tracking-tight"
              style={{ color: "var(--page-fg)" }}
            >
              Quick Stats
            </h2>
            <p
              className="mt-0.5 text-xs"
              style={{ color: "var(--admin-text-muted)" }}
            >
              Performance at a glance
            </p>
          </div>
          <div className="space-y-4">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="rounded-[12px] border p-4"
                  style={{
                    borderColor: "var(--admin-border)",
                    backgroundColor: "var(--admin-muted)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--admin-text-muted)" }}
                      >
                        {stat.label}
                      </p>
                      <p
                        className="mt-1 text-2xl font-bold tracking-tight"
                        style={{ color: "var(--page-fg)" }}
                      >
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                      style={{
                        backgroundColor: "var(--admin-surface)",
                        color: stat.tint,
                        boxShadow: "var(--admin-shadow-sm)",
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full"
                      style={{ backgroundColor: "rgb(23 23 23 / 0.06)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${stat.progress}%`,
                          background: `linear-gradient(90deg, ${stat.tint} 0%, ${stat.tint}cc 100%)`,
                        }}
                      />
                    </div>
                    <p
                      className="mt-1.5 text-right text-[10px] font-medium"
                      style={{ color: "var(--admin-text-muted)" }}
                    >
                      {stat.progress}% of target
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
