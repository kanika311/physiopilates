import {
  Users,
  FileText,
  DollarSign,
  Activity,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import DashboardCard from "@/components/admin/DashboardCard";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="ml-72">
        <AdminHeader title="Dashboard" />

        <main className="p-8">
          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Total Users"
              value="1,245"
              icon={<Users size={26} />}
              description="Active platform users"
            />

            <DashboardCard
              title="Posts"
              value="320"
              icon={<FileText size={26} />}
              description="Published posts"
            />

            <DashboardCard
              title="Revenue"
              value="₹45,000"
              icon={<DollarSign size={26} />}
              description="Monthly earnings"
            />

            <DashboardCard
              title="Visitors"
              value="8,950"
              icon={<Activity size={26} />}
              description="Website traffic"
            />
          </div>
        </main>
      </div>
    </div>
  );
}