import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  description,
}: DashboardCardProps) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-6">
      <div className="flex items-start justify-between gap-3">

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 md:text-sm">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl lg:text-4xl">
            {value}
          </h3>

          {description && (
            <p className="mt-2 line-clamp-2 text-xs text-slate-400 md:text-sm">
              {description}
            </p>
          )}
        </div>

        {/* Icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white transition-all duration-300 group-hover:scale-105 md:h-14 md:w-14">
          {icon}
        </div>

      </div>
    </div>
  );
}