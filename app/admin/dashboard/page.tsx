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
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 min-w-0">
        <AdminHeader title="Dashboard" />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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

          {/* Additional Sections */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
            {/* Recent Activity */}
            <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Recent Activity
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <span>New User Registered</span>
                  <span className="text-sm text-gray-500">
                    5 min ago
                  </span>
                </div>

                <div className="flex items-center justify-between border-b pb-3">
                  <span>New Blog Post Published</span>
                  <span className="text-sm text-gray-500">
                    20 min ago
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Payment Received</span>
                  <span className="text-sm text-gray-500">
                    1 hour ago
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-4">
                Quick Stats
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Todays Users
                  </p>
                  <p className="text-2xl font-bold">56</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    New Orders
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Conversion Rate
                  </p>
                  <p className="text-2xl font-bold">4.8%</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}