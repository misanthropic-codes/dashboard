"use client";

import { SessionProvider, useSession } from "next-auth/react";
import useSWR from "swr";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface DashboardData {
  stats: {
    totalUsers: number;
    activeUsers: number;
    dailyNewUsers: number;
    revenue: number;
  };
  recentActivity: Array<{
    id: number;
    type: string;
    user: string;
    timestamp: string;
    amount?: number;
  }>;
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DashboardContent() {
  const { data: session } = useSession();
  const { data, error, isLoading } = useSWR<DashboardData>(
    "/data.json",
    fetcher
  );

  if (!session) return <div className="text-gray-200">Access Denied</div>;
  if (error) return <div className="text-gray-200">Error loading data</div>;
  if (isLoading || !data)
    return <div className="text-gray-200">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 p-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Users",
            value: data.stats.totalUsers.toLocaleString(),
          },
          {
            label: "Active Users",
            value: data.stats.activeUsers.toLocaleString(),
          },
          { label: "New Users Today", value: data.stats.dailyNewUsers },
          {
            label: "Revenue",
            value: `$${data.stats.revenue.toLocaleString()}`,
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-500 transition-all duration-300 shadow-lg"
          >
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              {stat.label}
            </h3>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-white">User Growth</h2>
          <BarChart width={500} height={300} data={data.userGrowth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
              }}
            />
            <Bar dataKey="users" fill="#8B5CF6" />
          </BarChart>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-white">Recent Activity</h2>
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex justify-between items-center border-b border-gray-800 pb-4 hover:bg-gray-800/50 p-2 rounded-lg transition-all duration-200"
              >
                <div>
                  <p className="font-medium text-white">{activity.user}</p>
                  <p className="text-sm text-gray-400">{activity.type}</p>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className="font-medium text-emerald-400">
                      ${activity.amount}
                    </p>
                  )}
                  <p className="text-sm text-gray-400">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <SessionProvider>
      <DashboardContent />
    </SessionProvider>
  );
}
